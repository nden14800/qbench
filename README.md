# QBench

Evidence-first AI model benchmark explorer.

**Live site:** https://qbench.pages.dev/  
**Repository:** https://github.com/nden14800/qbench  
**Deployment:** Cloudflare Pages, production branch `main`.

QBench keeps every result attached to its publisher, model variant, reasoning effort, harness, configuration, metric and snapshot. **QBench Index 1.6** is a source-audited composite of eighteen evaluations across eight capability families. It does not import Artificial Analysis' composite scores or private results.

## QBench Index 1.6

### Current coverage — 2026-11-01

| Metric | Result |
|---|---:|
| Eligible evaluations | 18 |
| Capability families | 8 |
| Distinct model display names with at least one eligible result | 142 |
| Exact model/effort variants with at least one eligible result | 200 |
| Ranked variants (3+ evaluations across 3+ families) | 73 |
| Full evidence (all 8 families) | 0 |
| Broad evidence (4–7 families) | 48 |
| Limited evidence (3 families) | 25 |
| Unranked variants | 127 |

Counts come from the Index 1.6 runtime in the browser (2026-11-01, after the spelling merge below).

**Spelling merge (2026-11-01):** 92 model-name spellings (for example `GPT 5.5` and `gpt-5.5`, `claude-opus-4-8`, `Gemini 3.1 Pro Preview` and `gemini-3.1-pro-preview`) were merged to one display name. This reduced base model names from 157 to 142 and variants from 209 to 200. Original spellings are kept in `originalModelName`. Nine same-model, same-effort duplicates inside one benchmark (FrontierMath v2, BFCL v4, HealthBench Professional) have different scores; they are kept and flagged `duplicateConflict` until the source is checked. None of these benchmarks is in the Index.

**Model provenance (checked 2026-11-01):** Ember-1 is listed with provider Fireworks. Vercel's changelog (27 Sep 2026) describes it as "Ember-1 from Fireworks" and says it is "built on Kimi K3", so Fireworks is the brand and Moonshot AI's Kimi K3 is the base model. The provider field stays Fireworks. Sources: https://vercel.com/changelog/ember-1-from-fireworks-now-available-on-ai-gateway and https://openrouter.ai/models/fireworks/ember-1 A base model can appear as several effort variants, so the leaderboard ranks model variants, not base model names.

### What changed from the previous index

- **Index 1.6:** six Vals AI evaluations are added: Excel Modeling v1.1 and HLAB-Vals-1.1 (Professional knowledge work), Code Migration v1.1, Vibe Code Bench 1-100 and SWE-bench Multimodal (Software engineering), and BioMysteryBench (Scientific workflows). Ranked variants were 74 right after this addition in an earlier run. In the 2026-11-01 build the count is 73 with the current code and data; the spelling merge did not change it. The source of the earlier 74 was not reproduced. Voice Code Bench (raw audio, not comparable to text tasks) and Immigration Bench (search and no-search conditions mixed, rows unlabeled) are excluded.
- **Index 1.6:** ProgramBench (Software engineering, 64 variants) and CyberBench v1.1 (Cybersecurity, 44 variants) were added after the six Vals AI evaluations above. The current eight-family composite has 18 eligible evaluations. The ranking gate remains at least three evaluations across three distinct families.
- **Excluded from 1.5:** TaxEval v2, CorpFin v2 and MMMU Pro (archived; Vals AI reports them as saturated). IOI v2 (top 100%, at the ceiling). Public Benefits Bench v1.1 (a custom judge pipeline that uses one of the scored models as judge). LegalBench (151 rows, active, but no harness is stated).
- **CyberBench exclusions:** Claude Opus 5.5 (CVP) and Claude Sonnet 5 (Cyber Range) are special-access configurations, and Daybreak Blue has no stated provider.
- **Coverage:** Index 1.6 now uses 18 eligible evaluations across eight capability families. Six Vals AI datasets were added in the October 2026 update, followed by ProgramBench and CyberBench v1.1.
- **No shrinkage toward 50:** incomplete family coverage is averaged over observed families only. The square-root evidence factor from Index 1.3 is removed.
- **Stricter ranking:** a variant is ranked only with at least three evaluations across three families.
- **Standalone Mystery Game Puzzles:** the imported table holds 20 of the 140 models Epoch AI tested, so it is not a complete publisher table.

### Eligible evaluations and source snapshots

| Capability family | Evaluation | Variants | Source · snapshot |
|---|---|---:|---|
| Software engineering | Terminal-Bench 4.0 | 59 | Vals AI · 2026-10-29 |
| Software engineering | ProgramBench (mini-SWE-agent, Valkyrie) | 64 | Vals AI · 2026-10-20 |
| Cybersecurity | CyberBench v1.1 (mini-swe-agent; 44 rows after exclusions) | 44 | Vals AI · 2026-10-20 |
| Scientific workflows | Terminal-Bench-Science 0.1 | 43 | Vals AI · 2026-10-25 (42 Mini-SWE-agent rows and 1 Terminus 2 row; see open items) |
| Scientific workflows | DrugDiscoveryBench | 14 | Scale Labs · 2026-10-31 (mini-SWE-agent) |
| Expert knowledge | HLE-Diamond | 19 | Scale Labs · 2026-10-31 |
| Tool use | MCP Atlas — Pass Rate (All 1,000 tasks) | 20 | Scale Labs · 2026-04-08 |
| Adaptive interactive reasoning | ARC-AGI-3 Standard harness (Semi-Private) | 40 | ARC Prize · 2026-10-31 |
| Professional knowledge work | Legal Research Bench | 89 | Vals AI · 2026-10-29 (shared agent harness) |
| Professional knowledge work | Tax Agent Bench | 80 | Vals AI · 2026-10-29 (shared agent harness) |
| Professional knowledge work | Finance Agent v2.1 | 34 | Vals AI · 2026-10-29 (shared agent harness) |
| Healthcare | MedCode | 107 | Vals AI · 2026-10-29 (direct model call, no agent harness) |
| Software engineering | Code Migration v1.1 (Pi agent harness) | 29 | Vals AI · 2026-10-28 |
| Software engineering | Vibe Code Bench 1-100 (Modified OpenHands) | 26 | Vals AI · 2026-10-29 |
| Software engineering | SWE-bench Multimodal (mini-SWE-agent, no internet) | 20 | Vals AI · 2026-10-29 |
| Scientific workflows | BioMysteryBench (Terminus 2) | 29 | Vals AI · 2026-10-29 |
| Professional knowledge work | Excel Modeling Benchmark v1.1 | 37 | Vals AI · 2026-10-29 |
| Professional knowledge work | HLAB-Vals-1.1 (Harvey) | 33 | Vals AI · 2026-10-30 |

The Vals AI rows for Legal Research Bench, Tax Agent Bench, Finance Agent v2.1 and MedCode were extracted from the public leaderboard pages with an AI-assisted reader. The top rows of each table were re-extracted in a second call and matched. Provider labels are present for these rows.

### Index 1.6 gates

1. **Complete publisher table:** the evaluation must be a full publisher-reported table. Partial mirrors and visible-row extracts stay standalone.
2. **Variant count:** at least 12 distinct model/effort variants.
3. **One stated harness or configuration:** a single shared harness, or one stated direct-call configuration, per evaluation. Mixed-harness sets stay standalone.
4. **Not ceiling-saturated:** a top score in the ceiling range keeps the evaluation standalone. Vibe Code Bench v1.1 (top 92.4%) and MedScribe (top 91.4%) are excluded on this basis.
5. **Explicit metric:** the score metric must be explicitly labeled. Ambiguous comparison tables stay standalone.

### Calculation

1. **Native score:** retain each evaluation's publisher-reported 0–100 percentage. Do not convert within-cohort rank into a percentile.
2. **Family mean:** average the evaluations inside each capability family.
3. **Index:** average the observed family means with equal weight.
4. **Ranking rule:** a variant is ranked only with at least three evaluations across three families.

$$
\mathrm{Index}_{1.6} = \frac{1}{F_{\text{obs}}} \sum_{f \in \text{observed}} \left( \frac{1}{n_f} \sum_{i=1}^{n_f} s_{f,i} \right)
$$

where $s_{f,i}$ is the native score of evaluation $i$ in family $f$, $n_f$ is the number of evaluations in that family, and $F_{\text{obs}}$ is the number of observed families. Missing families are not imputed.

The composite is an average of benchmark percentages. It is not a confidence interval, a human-equivalence score or an IQ score. Task formats, graders, chance levels and harnesses are not interchangeable, so the detail view keeps each metric distinct.

### Model identity and reasoning effort

- The exact model name plus the explicitly reported reasoning effort is the identity used for comparison.
- `none`, `low`, `medium`, `high`, `xhigh` and `max` remain separate variants.
- `Not reported` is not interpreted as low, default or high effort, and it is never inferred from a harness.
- QBench never selects the highest effort result to represent a base model.
- Harnesses, routes, fallback settings and other configurations remain visible.

### Artificial Analysis reference (checked 2026-10-31)

Artificial Analysis Intelligence Index v5.0 averages nine evaluations in four categories (Knowledge Work, Coding, Science and General), each weighted 25% ([methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)). Three of its nine evaluations (Terminal-Bench 4.0, HLE-Diamond and Terminal-Bench-Science 0.1) also appear in QBench. QBench Index 1.6 does not import the AA composite, its private evaluations, or any partial AA leaderboard mirror.

### Standalone evaluations and exclusions

These stay visible in the benchmark directory but do not contribute to the Index. The reasons are the ones recorded in `data/external-benchmarks.json`:

- **Mystery Game Puzzles:** 20 of the 140 tested models are in the imported table, so it is incomplete.
- **ProofBench:** several leading general-purpose models tie at 100%, which adds ceiling bias.
- **GPQA Diamond:** top scores are near the ceiling, and the checked-in snapshot is partial.
- **FrontierMath Tiers 1–3 v2 and Tier 4 v2:** partial extracts, or a source mismatch under reconciliation.
- **SWE-Bench Pro v2 (full and hard subset):** mixed harnesses (Claude Code, Codex and mini-SWE-agent), or a saturated, variant-unclear source.
- **LiveBench 2.0:** the snapshot mixes official rows with secondary-mirror values.
- **GDPval:** only eight model entries.
- **OSWorld 2.0:** self-reported aggregates without a common verified harness.
- **METR Time Horizons:** METR says the page is no longer actively updated (last updated 2026-09-08).
- **HealthBench Professional:** a third-party board compiles vendor-selected published scores, not a controlled head-to-head evaluation.
- **ARC-AGI-1 and ARC-AGI-2 semi-private:** ceiling-watch series; leading verified scores exceed or approach 95%.
- **ARC-AGI-3 Provider Adapter:** a different execution harness; only the Standard harness contributes.
- **MCP Atlas Performance Comparison (34 rows):** the metric (Pass Rate or claim coverage) is not labeled. The Index uses only the explicitly labeled All 1,000-task Pass Rate table.
- **HiL-Bench (comparison table and paper results):** the comparison table does not label its metric, and the paper's labeled Pass@3 results cover only four models.
- **Furniture Assembly:** the official leaderboard exposes no tabular results; three values are retained.

A larger leaderboard is not automatically a better composite. Incomplete exports, stale data, saturated tests and mixed harnesses stay standalone until a comparable publisher dataset is available.

### Candidates reviewed and not yet added

- **Vibe Code Bench v1.1 (Vals AI):** top score 92.4%, in the ceiling range; rows also mix harnesses.
- **MedScribe (Vals AI, 109 rows):** top score 91.4%, in the ceiling range.
- **FrontierSWE v2 (Proximal):** only a partial view of the table is available. A mirror lists 23 models, which is not confirmed against the official page, so it stays out until the full table is verified.
- **Other Vals AI leaderboards not yet reviewed row by row:** IOI v2, Public Benefits Bench and SRE Bench. ProgramBench, CyberBench v1.1 and Excel Modeling Benchmark v1.1 are now included as separately identified datasets.

## Model and benchmark analysis features

- Index bars: ranked variants sorted by Index 1.6 in a leaderboard-style bar chart.
- PNG export on every chart from the toolbar icon, on a theme-aware background.
- Model detail view: release date, provider, API token pricing, family scores, all available effort variants and source-level benchmark results.
- Provider landscape: distinct model names, eligible variants, ranked variants, mean Index and priced-model coverage by canonical provider label.
- Measured task economics: select one benchmark and compare only its published cost/test, cost/successful-task, duration and token metrics; no cross-benchmark cost aggregation or imputed values.
- Effort filter and separate model/effort leaderboard rows.
- Comparison radar and per-evaluation comparison table.
- ARC-AGI-3 Standard vs Provider Adapter harness comparison by effort.
- Benchmark result bars, uncertainty values, reasoning/knowledge splits and calibration error where published.
- Six top-level views: Index, Models, Benchmarks, Providers, Efficiency and Methodology.
- Benchmark-specific cost-per-test, cost-per-successful-test, output tokens per test and duration per test where source data exists.
- Efficiency scatter charts and benchmark-specific Pareto frontier. Index-level scatter labels show the model name, with the effort level only when it is reported.
- Score vs model release-date chart when a source reports the release date.
- Reasoning-effort vs score chart when a model has multiple published effort settings.
- Task-design examples where the publisher provides enough public information.
- Eight-family composition, API token-price proxy, Pareto, score heatmap, distribution, coverage and consistency charts.
- Search, provider and effort filters, sortable tables, CSV export, light/dark themes and responsive layout.

**Data boundary:** API price per 1M tokens is not task cost. Cross-benchmark cost per task, model size, context window, open-weight/proprietary classification, modality and release-date trends are not inferred when source-level fields are missing. QBench only renders these when verifiable inputs exist. An IRT-based long-run Progress Index is not published yet: 54 model/effort variants currently have results in four or more eligible evaluations, but these are aggregate benchmark scores rather than task-level response matrices. A stable longitudinal calibration needs a larger connected overlap set. See [Artificial Analysis Progress Index v1 methodology](https://artificialanalysis.ai/methodology/progress-index/).

## Data snapshot — 2026-11-01

| Metric | Result |
|---|---:|
| Benchmark datasets | 62 |
| Benchmark datasets with at least one model row | 43 |
| Benchmark catalog metadata records | 85 |
| Model-result rows across all datasets | 1,429 |
| Distinct model display names across all datasets | 208 |
| Model + effort + harness combinations | 1,329 |
| Canonical provider labels after alias normalization | 33 |
| API price entries | 71 |

Counts are recomputed from `data/external-benchmarks.json`. A model may appear in multiple datasets and effort settings. Display names are not assumed to be canonical API model IDs.


### Data-quality audit — 2026-11-01

| Metadata field | Available | Total |
|---|---:|---:|
| Source URL | 1,429 | 1,429 |
| Source type | 1,429 | 1,429 |
| Snapshot date | 1,429 | 1,429 |
| Evaluation harness | 1,429 | 1,429 |
| Release date | 174 | 1,429 |
| Explicit reasoning effort | 1,036 | 1,429 |
| API pricing entries | 71 | 208 distinct display names |
| Cache read / write prices | 0 | 71 |
| Context-window / maximum-output metadata | 0 | 1,429 |

The data audit intentionally leaves unavailable fields blank. Five source rows had provider labels normalized for grouping: `Mistral` → `Mistral AI` and `Zhipu` → `Z.ai`. The original labels remain in `providerReported`; see `modelNameAudit.providerAliases` for the source references. The 208 display names are not a verified canonical model-ID catalogue.

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
