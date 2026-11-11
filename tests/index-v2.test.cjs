const test = require('node:test');
const assert = require('node:assert/strict');
const { compute, weightedMidrankPercentiles } = require('../assets/js/qbench-index-v2.js');

test('weighted midrank percentiles handle ties and split a base model weight across effort variants', () => {
  const result = weightedMidrankPercentiles([
    { key: 'A', value: 1, weight: 1 },
    { key: 'B-high', value: 3, weight: 0.5 },
    { key: 'B-low', value: 2, weight: 0.5 },
    { key: 'C', value: 2, weight: 1 }
  ]);
  const values = Object.fromEntries(result.map(x => [x.key, x.percentile]));
  assert.ok(Math.abs(values.A - 16.6666666667) < 1e-8);
  assert.ok(Math.abs(values['B-low'] - 58.3333333333) < 1e-8);
  assert.equal(values['B-low'], values.C);
  assert.ok(Math.abs(values['B-high'] - 91.6666666667) < 1e-8);
});

test('Index 2.0 leaves missing families unscored and requires four evaluations across three families', () => {
  const models = Array.from({ length: 12 }, (_, i) => ({ model: 'Model ' + i, provider: 'Lab', effort: 'high', score: i }));
  const domains = [
    { name: 'Knowledge', benchmarks: ['a', 'b'] },
    { name: 'Coding', benchmarks: ['c'] },
    { name: 'Science', benchmarks: ['d'] },
    { name: 'Multimodal', benchmarks: ['missing'] }
  ];
  const data = {
    composite: { extendedIndex: { domains, minimumModelsPerEvaluation: 12, minimumEvaluationsPerModel: 4, minimumDomainsPerModel: 3 } },
    benchmarks: ['a', 'b', 'c', 'd'].map(id => ({ id, name: id, indexEligible: true, models, higherIsBetter: true })),
    modelNameAudit: { modelKinds: [] }, apiPricing: { models: [] }
  };
  const result = compute(data);
  const leader = result.rows.find(row => row.model === 'Model 11');
  assert.equal(data.composite.version, '2.0');
  assert.equal(result.evals.length, 4);
  assert.equal(leader.ranked, true);
  assert.equal(leader.domainCount, 3);
  assert.equal(leader.familyShare, 0.75);
  assert.ok(Math.abs(leader.index - 95.8333333333) < 1e-8);
  assert.equal(leader.index, leader.rawIndex);
});

test('conflicting duplicate model/effort rows are excluded instead of silently taking the first row', () => {
  const models = Array.from({ length: 12 }, (_, i) => ({ model: 'Model ' + i, provider: 'Lab', effort: 'high', score: i }));
  models.push({ model: 'Model 0', provider: 'Lab', effort: 'high', score: 99, configuration: 'different' });
  const data = {
    composite: { extendedIndex: { domains: [{ name: 'Knowledge', benchmarks: ['a'] }, { name: 'Coding', benchmarks: ['b'] }, { name: 'Science', benchmarks: ['c'] }], minimumModelsPerEvaluation: 12, minimumEvaluationsPerModel: 4, minimumDomainsPerModel: 3 } },
    benchmarks: ['a','b','c'].map(id => ({ id, name:id, indexEligible:true, models })),
    modelNameAudit:{modelKinds:[]},apiPricing:{models:[]}
  };
  const result = compute(data);
  assert.equal(result.evals.length, 0);
});
