# QBench

Evidence-first AI model benchmark explorer.

**Live site:** https://qbench.pages.dev/  
**Default branch:** `main` (Cloudflare Pages deployment)

QBench preserves the original evaluation, metric, model/effort variant, configuration, harness, source and snapshot for every imported result. The composite is **QBench Index 1.3**.

## Current snapshot — 2026-10-31

| Measure | Snapshot |
|---|---:|
| Eligible evaluations | 8 |
| Capability families | 7 |
| Ranked model/effort variants | 54 |
| Distinct base model names with eligible results | 114 |
| Ranked base models | 47 |
| Full-evidence variants | 0 |
| Broad-evidence variants (4–6 families) | 8 |
| Limited-evidence variants (2–3 families) | 46 |
| Unranked variants (less than 2 families) | 121 |
| Benchmark datasets with model values | 48 |
| Model-result/configuration rows across all datasets | 813 |
| Exact model names across all datasets | 188 |
| Model/configuration/harness combinations | 615 |
| Provider labels | 31 |
| API price entries | 61 |
| Benchmark directory entries | 79 |

Counts are generated from `data/external-benchmarks.json`. A base model may appear as multiple reasoning-effort variants. Ranked-variant counts are therefore not the same as base-model counts.

## QBench Index 1.3

Index 1.3 replaces the previous composite. Its inputs are eight source-audited evaluations grouped into seven capability families. The Index uses the publishers' reported 0–100 task-success or accuracy values directly; it does not convert a model's position within a benchmark cohort into a percentile.

### Eligible evaluations

| Capability family | Evaluation | Imported variants | Source snapshot |
|---|---|---:|---|
| Software engineering | Terminal-Bench 4.0 | 59 | Vals AI, 2026-10-29 |
| Scientific workflows | Terminal-Bench-Science 0.1 | 42 | Vals AI / Artificial Analysis, 2026-10-31 |
| Scientific workflows | DrugDiscoveryBench | 14 | Scale Labs, 2026-10-31 |
| Expert knowledge | HLE-Diamond | 19 | Scale Labs, 2026-10-31 |
| Strategic reasoning | Mystery Game Puzzles | 20 | Epoch AI, 2026-10-14 |
| Tool use | MCP Atlas | 34 | Scale Labs, 2026-04-08 |
| Help-seeking judgment | HiL-Bench | 30 | Scale Labs, 2026-10-31 |
| Adaptive interactive reasoning | ARC-AGI-3 — Standard harness | 40 | ARC Prize verified model pages, 2026-10-31 |

**Important dataset boundaries**

- Terminal-Bench-Science contributes Mini-SWE-agent rows only. Other harnesses are not pooled into its Index component.
- DrugDiscoveryBench contributes mini-SWE-agent results only: 82 expert-authored tasks, three runs averaged per setting and a 120-minute agent timeout.
- Mystery Game Puzzles has 140 tested models on Epoch AI's page; this snapshot imports 20 exact model/effort variants surfaced in the official result extract, not all 140.
- MCP Atlas contains 1,000 human-authored tasks across 36 MCP servers and 220 tools, with 500 public and 500 held-out tasks. The current leaderboard snapshot is dated April 8, 2026.
- HiL-Bench contains 300 tasks across software engineering and text-to-SQL, 1,131 human-validated blockers, 200 public tasks and 100 private held-out tasks. QBench uses **Pass@3** as the task-outcome metric. ASK-F1 is a separate selective-escalation metric and is not mixed into the Index.
- ARC-AGI-3 contributes only official **Standard-harness** semi-private results. Provider Adapter is stored separately because it is a different execution harness. Forty exact effort variants are imported from eight verified model pages.

### Calculation

1. **Evaluation eligibility:** a benchmark needs at least 12 distinct model/effort variants with usable source-reported scores. A model and each explicitly reported effort setting are separate variants.
2. **Keep the native score:** retain the publisher-reported percentage-point result on its 0–100 scale. No cohort percentile conversion is applied.
3. **Within-family aggregation:** if a family contains multiple evaluations, average those evaluation results for each exact model/effort variant.
4. **Across-family aggregation:** average the observed family scores equally across the seven capability families.
5. **Evidence adjustment:** incomplete family coverage is pulled toward the neutral midpoint of 50:

   `Raw family mean = average of observed family scores`

   `Index = 50 + (Raw family mean − 50) × sqrt(Observed families / 7)`

6. **Ranking gate:** a variant needs at least **2 eligible evaluations across 2 distinct families**. Rows below the gate remain visible in Models and benchmark details, but receive no Index score.

The evidence adjustment is not a statistical confidence interval, an IQ score, or a percentage of human intelligence. Equal family weighting is a transparent design choice; the underlying benchmarks still differ in task difficulty, graders, task formats and guessing opportunities.

### Evidence tiers

- **Full:** all 7 capability families.
- **Broad:** 4–6 families.
- **Limited:** 2–3 families; the evidence adjustment is stronger.
- **Insufficient:** fewer than 2 families; shown without an Index score.

### Model and effort policy

- Every exact model name and reported reasoning-effort setting (none, low, medium, high, xhigh, max) is a separate variant.
- Effort is recorded only when the publisher identifies it. Otherwise QBench displays **Not reported**; it does not infer effort from a harness or choose the highest result for a base model.
- Harness, configuration, routing, fallback, release date and provider metadata are retained where available.
- Mixed or materially different harnesses are not silently combined.
- Missing scores are never imputed. Aliases are not merged without explicit source evidence.
- Publisher-reported uncertainty is displayed at the benchmark level. QBench does not pool different publishers' ± values into a composite confidence interval because their definitions may differ.

## Standalone evaluations and exclusions

These remain available in the benchmark directory but do not contribute to Index 1.3:

- **FrontierMath Tier 4 v2:** excluded pending full row-by-row reconciliation with Epoch AI's official export. The previous checked-in values conflicted with the currently visible leaderboard; only six independently visible rows are retained for inspection.
- **Furniture Assembly:** only three values independently confirmed in Epoch AI's launch analysis are retained. The official leaderboard currently has no tabular result set, so it is not used in the composite.
- **LiveBench 2.0:** the stored snapshot combines six official-publisher rows with secondary-mirror values. The official-only subset is below the 12-variant source gate.
- **ARC-AGI-3 Provider Adapter:** a different harness from Standard; shown separately and excluded from the Index.
- **ARC-AGI-1 and ARC-AGI-2 semi-private:** retained as ceiling-watch evaluations rather than composite inputs.
- **ProofBench:** standalone because several leading general-purpose models tie at 100%.
- **GPQA Diamond:** ceiling/saturation watch; the stored snapshot is partial.
- **SWE-Bench Pro V2 Full and Hard:** standalone because current rows combine materially different agent clients and harnesses.
- **GDPval:** the stored comparable snapshot is below the 12-variant source gate.
- **METR Time Horizons:** standalone; METR's page is no longer actively updated.
- **HealthBench Professional:** third-party aggregation of vendor-selected results, not a controlled head-to-head evaluation.

A larger leaderboard is not automatically a better composite. Incomplete exports, mixed sources, ceiling effects and incompatible harnesses are kept out of the Index rather than being filled with guessed values.

## Cost, tokens, duration and API prices

- **Cost / Test**, **Tokens / Test** and **Duration / Test** remain attached to the benchmark that measured them.
- **Cost / successful test** is shown as publisher-reported when available; otherwise it is derived from measured benchmark cost per test divided by the reported success rate. The UI labels reported and derived values separately.
- The benchmark detail view includes cost-versus-score Pareto analysis, output-token-versus-score and duration-versus-score plots where at least three usable source rows exist.
- Model release-date and reasoning-effort comparisons appear only when the source supplies enough matching data.
- The API price catalog keeps input and output rates per 1M tokens and identifies official provider prices separately from hosted routes. API token prices are not benchmark task costs.

## UI and analysis features

- Index leaderboard with provider and reasoning-effort filters, model search, sortable columns, evidence tiers and CSV export.
- Seven-family composition chart, API token-price versus Index scatter with Pareto frontier, benchmark-score heatmap, Index distribution, evaluation coverage and descriptive cross-benchmark spread.
- Cross-benchmark spread is explicitly descriptive; it is not presented as a model-stability score or confidence interval.
- Model directory retains ranked and unranked models with their available metadata.
- Compare view for multiple ranked model/effort variants, with family radar and per-evaluation results.
- Benchmark directory with raw scores, uncertainty, exact effort, configuration, harness, task count, source links, snapshots, cost, tokens, duration, release date and model API prices where available.
- Benchmark-specific efficiency plots and reasoning-effort comparisons when the source contains enough rows.
- Searchable API price catalog and light/dark themes.
- ECharts charts use the dashboard font stack and resize after web fonts load.

## Sources

- [Vals AI — Terminal-Bench 4.0](https://www.vals.ai/benchmarks/terminal-bench-4)
- [Vals AI — Terminal-Bench-Science 0.1](https://vals-ai.com/benchmarks/terminal-bench-science)
- [Scale Labs — HLE-Diamond](https://labs.scale.com/leaderboard/hle-diamond)
- [Scale Labs — DrugDiscoveryBench](https://labs.scale.com/leaderboard/drugdiscoverybench)
- [Scale Labs — MCP Atlas](https://labs.scale.com/leaderboard/mcp_atlas)
- [Scale Labs — HiL-Bench](https://labs.scale.com/leaderboard/hil)
- [Epoch AI — Mystery Game Puzzles](https://epoch.ai/benchmarks/mystery-game-puzzles)
- [Epoch AI — FrontierMath Tier 4 v2](https://epoch.ai/benchmarks/frontiermath-tier-4-v2)
- [Epoch AI — Furniture Assembly launch analysis](https://epoch.ai/publications/furniture-assembly)
- [ARC Prize — verified model results](https://arcprize.org/results)
- [Artificial Analysis — Intelligence Index v5](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5) (methodology and feature reference only)
- API pricing: [OpenAI](https://developers.openai.com/api/docs/pricing), [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), [Google](https://ai.google.dev/gemini-api/docs/pricing), [xAI](https://docs.x.ai/developers/pricing), [Alibaba](https://www.alibabacloud.com/help/en/model-studio/model-pricing), [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing/), [Mistral](https://docs.mistral.ai/inference/pricing), [OpenRouter](https://openrouter.ai/api/v1/models)

A source URL does not mean QBench independently reproduced the result. Publisher/evaluator, metric, harness, configuration and snapshot caveats remain attached to the data.

## Technical

- Static single-file application: `index.html` (no build step)
- Data: `data/external-benchmarks.json`
- Chart library: ECharts 6.1.0 (`vendor/echarts.min.js`)
- UI: Bootstrap 5.3.3 and Bootstrap Icons 1.13.1
- Fonts: DM Sans and Zen Kaku Gothic New for interface text, Zen Old Mincho for Japanese display headings, IBM Plex Mono for numeric data
- Hosting: Cloudflare Pages, deployed from `main`
