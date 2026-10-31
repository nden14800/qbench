# QBench

Evidence-first AI model benchmark explorer.

**公開URL:** https://qbench.pages.dev/ （Cloudflare Pages、`main` ブランチから自動デプロイ）

QBench keeps model results tied to the original evaluation, metric, model configuration, harness and source. Its composite is **QBench Index 1.2**, rebuilt from five source-audited evaluations grouped into four task families.

## Index 1.2 data policy

- Only the five evaluations listed below contribute to Index 1.2.
- Every eligible evaluation must contain at least **12 distinct model names** with valid results.
- Publisher and independent-evaluator results are used; mixed-source extracts, incomplete exports, near-ceiling sets and incompatible harness mixtures stay outside the composite.
- Missing results are never converted to zero or imputed.
- Model aliases are not merged without explicit source evidence.
- A model receives a rank only when it has at least **2 eligible evaluation results across 2 or more task families**.
- The raw benchmark result, source, snapshot, harness and configuration remain available in the benchmark directory.

## QBench Index 1.2

### Task families and eligible evaluations

| Task family | Evaluation | Valid model results | Source snapshot |
|---|---|---:|---|
| Software & terminal execution | Terminal-Bench 4.0 | 59 | Vals AI, 2026-10-29 |
| Formal mathematics | ProofBench 1.1 | 52 | Vals AI, 2026-10-29 |
| Scientific workflows | Terminal-Bench-Science 0.1 | 43 | Vals AI, 2026-10-25 |
| Scientific workflows | DrugDiscoveryBench | 14 | Scale Labs, 2026-10-31 |
| Expert knowledge & reasoning | HLE-Diamond | 19 | Scale Labs, 2026-10-31 |

ProofBench's 54 leaderboard rows include two specialist formal-proof systems; those remain visible in the benchmark detail but are excluded from the general-purpose composite. DrugDiscoveryBench contributes only mini-SWE-agent runs, using the highest listed effort setting per model. Effort levels differ across model families, so this is best-reported capability rather than equal-compute head-to-head; other native-harness configurations are not mixed into Index 1.2.

### Calculation

1. **Eligibility gate:** an evaluation needs at least 12 distinct model names, a current publisher or independent-evaluator source, and a usable score for each included model.
2. **Normalize within each benchmark:** each exact model's score is converted to a midrank percentile within that evaluation's observed cohort:

   `100 × (count(scores below) + (count(ties) − 1) / 2) / (cohort size − 1)`

3. **Average within task family:** eligible benchmark percentiles are averaged inside each of the four task families. The two Scientific workflows evaluations therefore form one family score, rather than receiving twice the weight of the other families.
4. **Calculate the raw mean:** average the observed task-family percentiles equally.
5. **Adjust for evidence:** pull scores toward the neutral midpoint of 50 when fewer than four task families are represented:

   `Index = 50 + (Raw mean − 50) × sqrt(Observed task families / 4)`

A model with four task families has an adjustment factor of 1.00; three families, approximately 0.87; two families, approximately 0.71. This is an evidence adjustment, not a statistical confidence interval.

### Evidence labels

- **Full evidence:** all four task families are represented.
- **Broad evidence:** three task families are represented.
- **Limited evidence:** two task families are represented; the score is adjusted more strongly toward 50.
- **Insufficient evidence:** fewer than two task families. The model remains visible in Models and benchmark details but receives no Index score.

### Recalculated coverage — 2026-10-31

- **54 ranked models**
- **14 full-evidence models**
- **29 broad-evidence models**
- **11 limited-evidence models**
- **16 models with insufficient evidence**
- **70 models** have at least one result in an eligible evaluation
- **5 eligible evaluations** across four task families

All Index scores are recalculated from the five selected evaluations. The previous composite's eligibility rules and computed scores are no longer used.

## Tracked separately — not in Index 1.2

These datasets remain available for inspection but do not contribute to the composite.

- **SWE-Bench Pro V2 Hard:** Scale Labs' 51-task high-difficulty split. Its current leaderboard mixes Claude Code, Codex and mini-SWE-agent configurations, so it is retained as a standalone benchmark rather than pooled into the Index.
- **SWE-Bench Pro V2 Full:** near-ceiling public-set results and mixed harnesses make it unsuitable for the current cross-model composite.
- **GPQA Diamond:** ceiling/saturation watch; not used in Index 1.2.
- **FrontierMath Tiers 1–3 (v2):** the checked-in extract is partial and is not a complete, source-exported leaderboard snapshot. It stays excluded until the full publisher data and settings can be verified.
- **LiveBench 2.0:** the stored snapshot mixes publisher-reported and secondary-mirror values, so source uniformity is insufficient for the composite.
- **ARC-AGI-3:** the stored extract comes from a secondary mirror and combines multiple settings.
- **GDPval:** only eight model entries are available in the current checked-in snapshot, below the 12-model source gate.
- **Older SWE-Bench Pro public results:** replaced for tracking by the refreshed V2 benchmark family.

The exclusions are deliberate: a larger leaderboard is not automatically a better composite if its results are incomplete, stale, saturated or not comparable.

## Evaluation-specific costs and API pricing

- Benchmark-native **Cost / Test**, **Tokens / Test**, **Duration / Test** and **cost per successful task** remain attached to the benchmark that measured them. They are not pooled into a universal cost-per-task figure.
- The API price catalog lists **61 model entries** with input and output rates per 1M tokens where available.
- First-party provider prices and hosted-route prices are labelled separately. The Index price chart uses first-party API prices only.
- API token prices are not a substitute for benchmark-specific task costs.

## Data snapshot — 2026-10-31

| Metric | Current snapshot |
|---|---:|
| Benchmark datasets with model values | 24 |
| Model-result / configuration rows | 694 |
| Exact model names across all datasets | 149 |
| Model + configuration + harness combinations | 583 |
| Provider labels | 28 |
| API price entries | 61 |
| Benchmark directory entries | 43 |

Counts come from `data/external-benchmarks.json`. A model may appear in several evaluations or configurations.

## UI and features

- QBench Index 1.2 leaderboard with provider filter, model search, sortable metrics, evidence labels and CSV export.
- Charts: task-family composition, first-party API price vs. Index with Pareto frontier, benchmark percentile heatmap, Index distribution, evaluation coverage and cross-benchmark consistency.
- Models view includes every model with at least one eligible result; unranked models are clearly labelled and cannot be selected for composite comparison.
- Compare up to five ranked models with a task-family radar chart and per-evaluation result table.
- Benchmark directory with raw scores, model configurations, harnesses, source links, snapshots and evaluation-specific cost metrics.
- Searchable API price catalog and light/dark themes.
- ECharts charts inherit the dashboard's DM Sans / Zen Kaku Gothic New font stack, including SVG-rendered labels and tooltips.

Built with Bootstrap 5.3.3, Bootstrap Icons 1.13.1 and ECharts 6.1.0 (`vendor/echarts.min.js`). Fonts: DM Sans and Zen Kaku Gothic New for body text, Zen Old Mincho for Japanese display headings, and IBM Plex Mono for numeric data.

## Sources and verification

- [Vals AI — Terminal-Bench 4.0](https://www.vals.ai/benchmarks/terminal-bench-4)
- [Vals AI — ProofBench 1.1](https://www.vals.ai/benchmarks/proof_bench)
- [Vals AI — Terminal-Bench-Science 0.1](https://vals-ai.com/benchmarks/terminal-bench-science)
- [Scale Labs — HLE-Diamond](https://labs.scale.com/leaderboard/hle-diamond)
- [Scale Labs — DrugDiscoveryBench](https://labs.scale.com/leaderboard/drugdiscoverybench)
- [Scale Labs — SWE-Bench Pro V2 and V2 Hard](https://labs.scale.com/leaderboard/swe_bench_pro_public_v2)
- [Epoch AI — FrontierMath Tiers 1–3 (v2)](https://epoch.ai/benchmarks/frontiermath-tiers-1-3-v2)
- API pricing: [OpenAI](https://developers.openai.com/api/docs/pricing), [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), [Google](https://ai.google.dev/gemini-api/docs/pricing), [xAI](https://docs.x.ai/developers/pricing), [Alibaba](https://www.alibabacloud.com/help/en/model-studio/model-pricing), [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing/), [Mistral](https://docs.mistral.ai/inference/pricing), [OpenRouter](https://openrouter.ai/api/v1/models)

A source URL does not mean QBench independently reproduced the result. The publisher/evaluator, harness, configuration and snapshot caveats are retained with each dataset or row.

## Technical

- Static single-file application: `index.html` (no build step)
- Chart library: `vendor/echarts.min.js` (ECharts 6.1.0, Apache-2.0; see `vendor/ECHARTS-LICENSE.txt`)
- Benchmark data: `data/external-benchmarks.json`
- Main branch deploys to Cloudflare Pages: https://qbench.pages.dev/
