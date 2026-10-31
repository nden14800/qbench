# QBench

Evidence-first AI model benchmark explorer.

**Live site:** https://qbench.pages.dev/  
**Repository:** https://github.com/nden14800/qbench  
**Deployment:** Cloudflare Pages, production branch `main`.

QBench keeps every result attached to its publisher, model variant, reasoning effort, harness, configuration, metric and snapshot. **QBench Index 1.4** is a source-audited composite of six evaluations across five capability families. It does not import Artificial Analysis' composite scores or private results.

## QBench Index 1.4

### Current coverage — 2026-10-31

| Metric | Result |
|---|---:|
| Eligible evaluations | 6 |
| Capability families | 5 |
| Base model names with at least one eligible result | 84 |
| Exact model/effort variants with at least one eligible result | 134 |
| Ranked variants (3+ evaluations across 3+ families) | 14 |
| Full evidence (5 families) | 0 |
| Broad evidence (4 families) | 0 |
| Limited evidence (3 families) | 14 |
| Unranked variants | 120 |

A base model may appear as several independent effort variants. The leaderboard is therefore a model-variant ranking, not a single best-effort score per model family.

### What changed from 1.3

- **Family count:** five families. Strategic reasoning (Mystery Game Puzzles) is removed from the Index.
- **Mystery Game Puzzles is standalone:** the imported table holds 20 of the 140 models Epoch AI tested, so it is not a complete publisher table.
- **No shrinkage toward 50:** Index 1.3 pulled incomplete results toward 50 with a square-root factor. Index 1.4 averages only the observed families. Missing families are left out, not imputed.
- **Stricter ranking:** a variant is ranked only with at least three evaluations across three families. Index 1.3 required two evaluations across two families.
- **Removed:** the Index 1.3 evidence factor (`√(observed families ÷ 6)`), the 1.3 extended-index methodology text, and the 1.3 evidence-factor columns and CSV field. The CSV field is now `family_share`.

### Eligible evaluations and source snapshots

| Capability family | Evaluation | Variants | Source / snapshot |
|---|---|---:|---|
| Software engineering | Terminal-Bench 4.0 | 59 | Vals AI · 2026-10-29 |
| Scientific workflows | Terminal-Bench-Science 0.1 | 42 | Vals AI (Mini-SWE-agent rows only) · 2026-10-25 |
| Scientific workflows | DrugDiscoveryBench | 14 | Scale Labs · 2026-10-31 |
| Expert knowledge | HLE-Diamond | 19 | Scale Labs · 2026-10-31 |
| Tool use | MCP Atlas — Pass Rate (All 1,000 tasks) | 20 | Scale Labs · 2026-04-08 |
| Adaptive interactive reasoning | ARC-AGI-3 Standard harness | 40 | ARC Prize · 2026-10-31 |

### Index 1.4 gates

1. **Complete publisher table:** the evaluation must be a full publisher-reported table. Partial mirrors and visible-row extracts stay standalone.
2. **Variant count:** at least 12 distinct model/effort variants.
3. **One stated harness:** a single harness or configuration per evaluation. Mixed-harness sets stay standalone.
4. **Not ceiling-saturated:** the top score must be below the saturation threshold recorded in the dataset.
5. **Explicit metric:** the score metric is explicitly labeled. Ambiguous comparison tables stay standalone.

### Calculation

1. **Native score:** retain each evaluation's publisher-reported 0–100 percentage. Do not convert within-cohort rank into a percentile.
2. **Family mean:** average the evaluations inside each capability family.
3. **Index:** average the observed family means with equal weight.
4. **Ranking rule:** a variant is ranked only with at least three evaluations across three families.

$$
\mathrm{Index}_{1.4} = \frac{1}{F_{\text{obs}}} \sum_{f \in \text{observed}} \left( \frac{1}{n_f} \sum_{i=1}^{n_f} s_{f,i} \right)
$$

where $s_{f,i}$ is the native score of evaluation $i$ in family $f$, $n_f$ is the number of evaluations in that family, and $F_{\text{obs}}$ is the number of observed families. Missing families are not imputed.

The composite is a benchmark-percentage average. It is not a confidence interval, a human-equivalence score or an IQ score. Task formats, graders, chance levels and harnesses are not psychometrically interchangeable, so the benchmark metrics remain distinct in the detail view.

### Model identity and reasoning effort

- Exact model name plus explicitly reported reasoning effort is the identity used for comparison.
- `none`, `low`, `medium`, `high`, `xhigh` and `max` remain separate variants.
- `Not reported` is not interpreted as low, default or high effort.
- QBench never selects the highest effort result to represent a base model.
- Harnesses, routes, fallback settings and other configurations remain visible.

### Artificial Analysis reference (checked 2026-10-31)

Artificial Analysis Intelligence Index v5.0 weights nine evaluations in four categories at 25% each: Knowledge Work, Coding, Science and General ([methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)). QBench 1.4 does not import that composite, its private evaluations, or any partial AA leaderboard mirror. The AA composite is used only as a reference for how a composite can be structured.

### Candidates reviewed and not yet added

- **FrontierSWE v2 (Proximal):** the official page at [frontierswe.com](https://www.frontierswe.com/) lists 34 tasks and Mean@5 scores under a single proximus harness. Only ten rows were visible in the page's default view, and the total model count (23) comes from a mirror. It stays out of Index 1.4 until the full table is confirmed.

### Standalone evaluations and exclusions

These remain visible in the benchmark directory but do not contribute to the Index:

- **Mystery Game Puzzles:** 20 of 140 tested models are visible, so the table is incomplete.
- **ARC-AGI-1 and ARC-AGI-2 semi-private:** ceiling-watch series; high-end results approach saturation.
- **ARC-AGI-3 Provider Adapter:** separate harness from Standard; never pooled into the Index.
- **HiL-Bench:** the official 30-row table does not explicitly label its score metric, and the paper's Pass@3 results cover four models only.
- **MCP Atlas Performance Comparison:** the 34-row table does not label its metric; the Index uses only the All 1,000-task Pass Rate table.
- **ProofBench 1.1:** several top models tie at 100%, creating ceiling risk.
- **GPQA Diamond:** near-ceiling and incomplete checked-in snapshot.
- **FrontierMath Tiers 1–3 v2 and Tier 4 v2:** incomplete extracts, or a source mismatch under reconciliation.
- **SWE-Bench Pro (public and V2) and V2 Hard:** mixed harnesses, saturation, or variant ambiguity.
- **LiveBench 2.0:** the snapshot mixes official rows with secondary-mirror rows.
- **Partial Artificial Analysis mirrors (GDP.pdf, AA-Omniscience, AA-Analyst, APEX, EnterpriseOps, MLCR, Code2Video and others):** visible-row extracts, below the source gate.
- **METR Time Horizons:** METR says the page is no longer actively updated.

A larger leaderboard is not automatically a better composite. Incomplete exports, stale data, saturated tests and mixed harnesses remain standalone until a comparable publisher dataset is available.

## Model and benchmark analysis features

- Index bars: ranked variants sorted by Index 1.4 in a leaderboard-style bar chart.
- PNG export on every chart from the toolbar icon, on a theme-aware background.
- Model detail view: release date, provider, API token pricing, family scores, all available effort variants and source-level benchmark results.
- Effort filter and separate model/effort leaderboard rows.
- Comparison radar and per-evaluation comparison table.
- ARC-AGI-3 Standard vs Provider Adapter harness comparison by effort.
- Benchmark result bars, uncertainty values, reasoning/knowledge splits and calibration error where published.
- Benchmark-specific cost-per-test, cost-per-successful-test, output tokens per test and duration per test where source data exists.
- Efficiency scatter charts and benchmark-specific Pareto frontier. Index-level scatter labels show the model name, with the effort level only when it is reported.
- Score vs model release-date chart when a source reports the release date.
- Reasoning-effort vs score chart when a model has multiple published effort settings.
- Task-design examples where the publisher provides enough public information.
- Seven-family composition, API token-price proxy, Pareto, score heatmap, distribution, coverage and consistency charts.
- Search, provider and effort filters, sortable tables, CSV export, light/dark themes and responsive layout.

**Data boundary:** API price per 1M tokens is not task cost. Cross-benchmark cost per task, model size, context window, open-weight/proprietary classification, modality and release-date trends are not inferred when source-level fields are missing. QBench only renders these when verifiable inputs exist. An IRT-based long-run Progress Index is not published yet: only seven model/effort variants currently have results across four or more eligible evaluations, and most inputs are aggregate benchmark scores rather than task-level response matrices. A stable longitudinal calibration needs a larger connected overlap set. See [Artificial Analysis Progress Index v1 methodology](https://artificialanalysis.ai/methodology/progress-index/).

## Data snapshot — 2026-10-31

| Metric | Result |
|---|---:|
| Benchmark datasets with model values | 50 |
| Benchmark directory dataset cards | 50 |
| Benchmark catalog metadata records | 81 |
| Model-result rows across all datasets | 837 |
| Exact model names across all datasets | 193 |
| Model + effort + harness combinations | 705 |
| Provider labels | 32 |
| API price entries | 61 |

Counts are from `data/external-benchmarks.json`. A model may appear in multiple datasets and effort settings.

## Sources and verification

- [Vals AI — Terminal-Bench 4.0](https://www.vals.ai/benchmarks/terminal-bench-4)
- [Artificial Analysis — Terminal-Bench-Science 0.1](https://artificialanalysis.ai/evaluations/terminal-bench-science)
- [Scale Labs — HLE-Diamond](https://labs.scale.com/leaderboard/hle-diamond)
- [Scale Labs — DrugDiscoveryBench](https://labs.scale.com/leaderboard/drugdiscoverybench)
- [Epoch AI — Mystery Game Puzzles](https://epoch.ai/benchmarks/mystery-game-puzzles)
- [Scale Labs — MCP Atlas](https://labs.scale.com/leaderboard/mcp_atlas)
- [Scale Labs — HiL-Bench](https://labs.scale.com/leaderboard/hil)
- [ARC Prize — Verified results](https://arcprize.org/results)
- [ARC Prize — GPT-6 series](https://arcprize.org/results/openai-gpt-6)
- [ARC Prize — GPT-6.1 Sol](https://arcprize.org/results/openai-gpt-6-1-sol)
- [ARC Prize — Claude Sonnet 5.5](https://arcprize.org/results/anthropic-claude-sonnet-5-5)
- [ARC Prize — Grok 4.7](https://arcprize.org/results/xai-grok-4-7)
- [ARC Prize — Gemini 3.8 Flash](https://arcprize.org/results/google-gemini-3-8-flash)
- [ARC Prize — DeepSeek V4.1 Flash](https://arcprize.org/results/deepseek-v4-1-flash)
- [ARC Prize — Muse Spark Open](https://arcprize.org/results/meta-muse-spark-open)
- [ARC Prize — Claude Haiku 5.5](https://arcprize.org/results/anthropic-claude-haiku-5-5)

API pricing sources: [OpenAI](https://developers.openai.com/api/docs/pricing), [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), [Google](https://ai.google.dev/gemini-api/docs/pricing), [xAI](https://docs.x.ai/developers/pricing), [Alibaba](https://www.alibabacloud.com/help/en/model-studio/model-pricing), [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing/), [Mistral](https://docs.mistral.ai/inference/pricing), [OpenRouter](https://openrouter.ai/api/v1/models).

A source URL does not mean QBench independently reproduced a result. Publisher, metric, harness, configuration and snapshot caveats remain attached to the relevant dataset or row.

## Technical

- Static single-file application: `index.html` (no build step)
- Data: `data/external-benchmarks.json`
- Charts: ECharts 6.1.0 (`vendor/echarts.min.js`)
- UI: Bootstrap 5.3.3 and Bootstrap Icons 1.13.1
- Fonts: DM Sans, Zen Kaku Gothic New, Zen Old Mincho and IBM Plex Mono
- Production: https://qbench.pages.dev/
