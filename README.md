# QBench

Evidence-first AI model benchmark explorer.

**Live site:** https://qbench.pages.dev/  
**Repository:** https://github.com/nden14800/qbench  
**Deployment:** Cloudflare Pages, production branch `main`.

QBench keeps every result attached to its publisher, model variant, reasoning effort, harness, configuration, metric and snapshot. **QBench Index 1.3** is a source-audited composite of eight evaluations across seven capability families. It does not import Artificial Analysis' composite scores or private results.

## QBench Index 1.3

### Current coverage — 2026-10-31

| Metric | Result |
|---|---:|
| Eligible evaluations | 8 |
| Capability families | 7 |
| Base model names with at least one eligible result | 98 |
| Exact model/effort variants | 162 |
| Ranked variants | 54 |
| Full evidence (7 families) | 0 |
| Broad evidence (4–6 families) | 7 |
| Limited evidence (2–3 families) | 47 |
| Unranked variants | 108 |

A base model may appear as several independent effort variants. The leaderboard is therefore a model-variant ranking, not a single best-effort score per model family.

### Eligible evaluations and source snapshots

| Capability family | Evaluation | Variants | Source / snapshot |
|---|---|---:|---|
| Software engineering | Terminal-Bench 4.0 | 59 | Vals AI · 2026-10-29 |
| Scientific workflows | Terminal-Bench-Science 0.1 | 42 | Artificial Analysis · 2026-10-31 |
| Scientific workflows | DrugDiscoveryBench | 14 | Scale Labs · 2026-10-31 |
| Expert knowledge | HLE-Diamond | 19 | Scale Labs · 2026-10-31 |
| Strategic reasoning | Mystery Game Puzzles | 20 | Epoch AI · 2026-10-14 |
| Tool use | MCP Atlas — Pass Rate (All 1,000 tasks) | 20 | Scale Labs · 2026-04-08 |
| Help-seeking judgment | HiL-Bench | 30 | Scale Labs · 2026-10-31 |
| Adaptive interactive reasoning | ARC-AGI-3 Standard harness | 40 | ARC Prize · 2026-10-31 |

MCP Atlas contains 1,000 human-authored tasks across 36 MCP servers and 220 tools, including 500 held-out tasks. QBench uses only the source's explicitly labeled All 1,000 Pass Rate table (20 rows) and preserves Public 500 companion scores separately. The page headline (83.6%) does not match the displayed All 1,000 table maximum (82.2%), so the discrepancy is documented; a separate 34-row Performance Comparison table with an unclear metric label remains standalone. HiL-Bench contains 300 tasks, 1,131 human-validated blockers and 100 private held-out tasks; QBench uses Pass@3 only, not ASK-F1. DrugDiscoveryBench uses the common mini-SWE-agent harness, three-run averages and a 120-minute timeout. Mystery Game Puzzles is a 100-position hidden-identity evaluation; the imported snapshot contains 20 exact model/effort rows from Epoch AI's larger 140-model leaderboard.

ARC-AGI-3 uses 40 official Standard-harness model/effort variants from ten base models. The Provider Adapter results are stored as a separate standalone evaluation because the harness materially changes scores. For example, GPT-6 Astra's max-effort result is 62.7% on Standard and 98.6% on Provider Adapter; high effort is 54.8% vs 99.9%. These are not mixed in the Index.

### Calculation

1. **Source gate:** each eligible evaluation needs at least 12 distinct model/effort variants with usable publisher-reported results.
2. **Native score:** retain the source's 0–100 task-success or accuracy percentage. Do not convert within-cohort rank into a percentile.
3. **Family aggregation:** average multiple evaluations within the same capability family. Average the seven observed family scores equally.
4. **Evidence adjustment:** require at least two eligible evaluations across two distinct families for a rank. Incomplete seven-family coverage is adjusted toward 50.

`Index = 50 + (Raw family mean − 50) × sqrt(Observed families / 7)`

The adjustment is an evidence-coverage convention, not a confidence interval, human-equivalence score or IQ score. Missing values are not imputed. Benchmark metrics remain distinct in the detail view even though the composite uses their reported percentage-point scores; task formats, graders, chance levels and harnesses are not psychometrically interchangeable.

### Model identity and reasoning effort

- Exact model name plus explicitly reported reasoning effort is the identity used for comparison.
- `none`, `low`, `medium`, `high`, `xhigh` and `max` remain separate variants.
- `Not reported` is not interpreted as low, default or high effort.
- QBench never selects the highest effort result to represent a base model.
- Harnesses, routes, fallback settings and other configurations remain visible.
- Duplicate model/effort rows were audited in the eight eligible datasets; no duplicates were found within an evaluation.

### Standalone evaluations and exclusions

These remain visible in the benchmark directory but do not contribute to the composite:

- **ARC-AGI-1 and ARC-AGI-2 semi-private:** retained as ceiling-watch series; high-end results approach saturation.
- **ARC-AGI-3 Provider Adapter:** separate harness from Standard; never pooled into the Index.
- **MCP Atlas Performance Comparison:** the publisher's 34-row score ± table does not explicitly label the metric; retained separately. The Index uses only the clearly labeled All 1,000-task Pass Rate table.
- **ProofBench 1.1:** upper-end tie at 100% creates ceiling risk.
- **GPQA Diamond:** near-ceiling and incomplete checked-in snapshot.
- **FrontierMath Tiers 1–3 v2:** the checked-in extract is partial, not a complete publisher export.
- **FrontierMath Tier 4 v2:** source audit found a mismatch between checked-in values and Epoch AI's currently visible official results; six visible rows remain standalone pending complete export reconciliation.
- **Furniture Assembly:** only three values could be independently confirmed from the official launch analysis; below the 12-variant gate.
- **SWE-Bench Pro V2 / Hard:** mixed Claude Code, Codex and mini-SWE-agent harnesses.
- **LiveBench 2.0:** imported snapshot mixes official and secondary-mirror rows; official-only subset is below the source gate.
- **GDPval:** eight current model entries, below the source gate.
- **OSWorld 2.0:** available rows are self-reported and do not yet provide a common verified harness snapshot.
- **METR Time Horizons:** METR states that its page is no longer actively updated; last update 2026-09-08.

A larger leaderboard is not automatically a better composite. Incomplete exports, stale data, saturated tests and mixed harnesses remain standalone until a comparable publisher dataset is available.

## Model and benchmark analysis features

- Model detail view: release date, provider, API token pricing, family scores, all available effort variants and source-level benchmark results.
- Effort filter and separate model/effort leaderboard rows.
- Comparison radar and per-evaluation comparison table.
- ARC-AGI-3 Standard vs Provider Adapter harness comparison by effort.
- Benchmark result bars, uncertainty values, reasoning/knowledge splits and calibration error where published.
- Benchmark-specific cost-per-test, cost-per-successful-test, output tokens per test and duration per test where source data exists.
- Efficiency scatter charts and benchmark-specific Pareto frontier.
- Score vs model release-date chart when a source reports the release date.
- Reasoning-effort vs score chart when a model has multiple published effort settings.
- Task-design examples where the publisher provides enough public information.
- Seven-family composition, API token-price proxy, Pareto, score heatmap, distribution, coverage and consistency charts.
- Search, provider and effort filters, sortable tables, CSV export, light/dark themes and responsive layout.

**Data boundary:** API price per 1M tokens is not task cost. Cross-benchmark cost per task, model size, context window, open-weight/proprietary classification, modality and release-date trends are not inferred when source-level fields are missing. QBench only renders these when verifiable inputs exist. An IRT-based long-run Progress Index is not published yet: only seven model/effort variants currently have results across four or more eligible evaluations, and most inputs are aggregate benchmark scores rather than task-level response matrices. A stable longitudinal calibration needs a larger connected overlap set. See [Artificial Analysis Progress Index v1 methodology](https://artificialanalysis.ai/methodology/progress-index/).

## Data snapshot — 2026-10-31

| Metric | Result |
|---|---:|
| Benchmark datasets with model values | 49 |
| Benchmark directory dataset cards | 49 |
| Benchmark catalog metadata records | 80 |
| Model-result rows across all datasets | 833 |
| Exact model names across all datasets | 192 |
| Model + effort + harness combinations | 701 |
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
