(function(root){
'use strict';
function scoreOf(row){var value=row&&row.score;if(value==null||value==='')return null;value=Number(value);return Number.isFinite(value)?value:null;}
function effortOf(row){
 var effort=String(row&&row.effort||'').trim().toLowerCase();
 if(effort&&effort!=='not-reported'&&effort!=='not reported'&&effort!=='unreported')return effort;
 var config=String(row&&row.configuration||'').toLowerCase();
 var match=config.match(/\b(max|xhigh|extra[- ]?high|high|medium|low|none|non[- ]?reasoning)\b/);
 return match?match[1].replace('extra-high','xhigh').replace('extra high','xhigh').replace('non-reasoning','none'):'not-reported';
}
function variantId(model,effort){return model+'\u241f'+effort;}
function variantLabel(row){return row.model+(row.effort&&row.effort!=='not-reported'?' ('+row.effort+')':' (effort not reported)');}
function isHigherBetter(benchmark){
 if(benchmark.higherIsBetter===false)return false;
 var direction=String(benchmark.scoreDirection||benchmark.direction||'').toLowerCase();
 return direction!=='lower'&&direction!=='lower-is-better'&&direction!=='minimize';
}
function weightedMidrankPercentiles(entries){
 var total=entries.reduce(function(sum,e){return sum+e.weight;},0);
 return entries.map(function(entry){
  var below=0,equal=0;
  entries.forEach(function(other){
   if(other.value<entry.value)below+=other.weight;
   else if(other.value===entry.value)equal+=other.weight;
  });
  return {key:entry.key,percentile:total?100*(below+equal/2)/total:0};
 });
}
function compute(data){
 if(!data||!data.composite||!data.composite.extendedIndex||!Array.isArray(data.benchmarks))throw new Error('Invalid QBench benchmark dataset');
 var spec=data.composite.extendedIndex;
 spec.version='2.0';spec.minimumModelsPerEvaluation=12;spec.minimumEvaluationsPerModel=4;spec.minimumDomainsPerModel=3;
 spec.normalization='Within each eligible evaluation, compute a weighted midrank percentile (0–100). Each base model contributes total weight 1 across its distinct effort variants. Average evaluation percentiles within each observed capability family, then average observed family scores equally. Missing families remain unscored and are not imputed. Ranking requires at least 4 eligible evaluations across at least 3 families.';
 data.composite.version='2.0';
 var byId={},kinds={};
 data.benchmarks.forEach(function(benchmark){byId[benchmark.id]=benchmark;});
 (data.modelNameAudit&&data.modelNameAudit.modelKinds||[]).forEach(function(item){kinds[item.name]=item;});
 var evals=[],scores={};
 spec.domains.forEach(function(domain){
  (domain.benchmarks||[]).forEach(function(id){
   var benchmark=byId[id];
   if(!benchmark||benchmark.indexEligible!==true)return;
   var evidenceText=[benchmark.quality,benchmark.valueNote,benchmark.coverageLevel,benchmark.note].join(' ').toLowerCase();
   if(/partial|secondary mirror|incomplete|top[- ]?\d+\s+(?:rows|models|configurations)/i.test(evidenceText))return;
   var candidates=new Map();
   (benchmark.models||[]).forEach(function(row){
    var raw=scoreOf(row),kind=kinds[row.model]||{};
    if(!row.model||raw===null||row.uncertain===true||row.excludeFromIndex===true||kind.excludeFromIndex===true)return;
    if(id==='terminal-bench-science-0-1'&&String(row.harness||'').toLowerCase().indexOf('mini-swe-agent')<0)return;
    var effort=effortOf(row),key=variantId(row.model,effort);
    if(!candidates.has(key))candidates.set(key,[]);
    candidates.get(key).push({value:isHigherBetter(benchmark)?raw:-raw,rawValue:raw,row:row,model:row.model,effort:effort,provider:row.provider||'Unknown'});
   });
   var rows=new Map();
   candidates.forEach(function(items,key){
    if(items.length===1){rows.set(key,items[0]);return;}
    var first=items[0],same=items.every(function(item){
     return item.value===first.value&&String(item.row.harness||'')===String(first.row.harness||'')&&String(item.row.configuration||'')===String(first.row.configuration||'');
    });
    if(same)rows.set(key,first);
   });
   var harnesses=new Set();
   rows.forEach(function(item){if(item.row.harness)harnesses.add(String(item.row.harness));});
   if(harnesses.size>1){
    if(benchmark.indexHarness){
     rows.forEach(function(item,key){if(String(item.row.harness||'')!==String(benchmark.indexHarness))rows.delete(key);});
    }else return;
   }
   if(rows.size<spec.minimumModelsPerEvaluation)return;
   var modelCounts=new Map(),entries=[];
   rows.forEach(function(item){modelCounts.set(item.model,(modelCounts.get(item.model)||0)+1);});
   rows.forEach(function(item,key){entries.push({key:key,value:item.value,weight:1/modelCounts.get(item.model),item:item});});
   var percentiles=weightedMidrankPercentiles(entries),percentileByKey=new Map();
   percentiles.forEach(function(result){percentileByKey.set(result.key,result.percentile);});
   var map=new Map();
   entries.forEach(function(entry){
    var item=entry.item,pct=percentileByKey.get(entry.key);
    map.set(entry.key,{pct:pct,value:pct,rawValue:item.rawValue,config:item.row.configuration||'',harness:item.row.harness||'',provider:item.provider,model:item.model,effort:item.effort,row:item.row});
   });
   scores[id]=map;
   evals.push({id:id,name:benchmark.name,domain:domain.name,unique:rows.size,baseModels:new Set(Array.from(rows.values()).map(function(item){return item.model;})).size,snapshot:benchmark.snapshotDate,source:benchmark.source,taskCount:benchmark.taskCount||null,normalization:'weighted-midrank-percentile',direction:isHigherBetter(benchmark)?'higher':'lower'});
  });
 });
 var variants=new Map();
 Object.keys(scores).forEach(function(id){scores[id].forEach(function(item,key){if(!variants.has(key))variants.set(key,{model:item.model,effort:item.effort,provider:item.provider});});});
 var priceMap={};
 ((data.apiPricing&&data.apiPricing.models)||[]).forEach(function(price){
  var old=priceMap[price.model];
  if(!old||(price.sourceType==='official-provider'&&old.sourceType!=='official-provider'))priceMap[price.model]=price;
 });
 var rows=[];
 variants.forEach(function(identity,key){
  var domainScores={},coverage=0,domainCount=0,detail={},allValues=[];
  spec.domains.forEach(function(domain){
   var values=[];
   (domain.benchmarks||[]).forEach(function(id){
    if(scores[id]&&scores[id].has(key)){
     var point=scores[id].get(key);
     values.push(point.value);allValues.push(point.value);coverage++;detail[id]=point;
    }
   });
   domainScores[domain.name]=values.length?values.reduce(function(a,b){return a+b;},0)/values.length:null;
   if(domainScores[domain.name]!==null)domainCount++;
  });
  var observed=Object.keys(domainScores).map(function(name){return domainScores[name];}).filter(function(value){return value!==null;});
  var index=observed.length?observed.reduce(function(a,b){return a+b;},0)/observed.length:null;
  var ranked=coverage>=spec.minimumEvaluationsPerModel&&domainCount>=spec.minimumDomainsPerModel,spread=null;
  if(allValues.length){
   var mean=allValues.reduce(function(a,b){return a+b;},0)/allValues.length;
   spread=Math.sqrt(allValues.reduce(function(sum,value){return sum+Math.pow(value-mean,2);},0)/allValues.length);
  }
  var price=priceMap[identity.model]||{},currency=price.currency||'USD';
  var input=currency==='USD'?price.inputUSDPerMillion:price.inputLocalPerMillion,output=currency==='USD'?price.outputUSDPerMillion:price.outputLocalPerMillion;
  var sourceType=price.sourceType||'',priceLabel=sourceType==='official-provider'?'Official API':sourceType==='openrouter-route'?'OpenRouter route':'Hosted API';
  var averagePrice=sourceType==='official-provider'&&currency==='USD'&&input!=null&&output!=null?(Number(input)+Number(output))/2:null;
  var kind=kinds[identity.model]||{};
  rows.push({variantId:key,model:identity.model,effort:identity.effort,variantLabel:variantLabel(identity),provider:identity.provider||'Unknown',
   modelKind:kind.kind||'foundation-model',modelKindLabel:kind.label||'',domains:domainScores,coverage:coverage,domainCount:domainCount,ranked:ranked,
   rankTier:domainCount===spec.domains.length?'full':domainCount>=4&&domainCount<spec.domains.length?'broad':domainCount>=spec.minimumDomainsPerModel?'limited':'insufficient',
   index:ranked?index:null,rawIndex:index,familyShare:domainCount/spec.domains.length,spread:spread,price:averagePrice,
   priceInput:input==null?null:Number(input),priceOutput:output==null?null:Number(output),priceCurrency:currency,priceSource:price.source||null,
   priceSourceType:sourceType,priceSourceLabel:priceLabel,priceNote:price.note||'',detail:detail});
 });
 rows.sort(function(a,b){return(Number(b.ranked)-Number(a.ranked))||((b.index==null?-1:b.index)-(a.index==null?-1:a.index))||a.model.localeCompare(b.model)||a.effort.localeCompare(b.effort);});
 rows.filter(function(row){return row.ranked;}).forEach(function(row,index){row.rank=index+1;});
 return {evals:evals,rows:rows,domains:spec.domains.map(function(domain){return domain.name;}),spec:spec,byId:byId,scores:scores,method:'weighted-midrank-percentile'};
}
var api={compute:compute,weightedMidrankPercentiles:weightedMidrankPercentiles,variantId:variantId};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.QBenchIndexV2=api;
})(typeof window!=='undefined'?window:globalThis);
