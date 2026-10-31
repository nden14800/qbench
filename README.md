# QBench

Independent AI model benchmark explorer and performance analytics platform.

QBench collects model-level results from public benchmark publishers and source-traceable leaderboard mirrors. It keeps native benchmark units, run configurations, harnesses, snapshot dates and source notes visible. It does not manufacture missing scores or claim to reproduce Artificial Analysis' native Intelligence Index.

## Data snapshot — 2026-10-31

| Metric | Current snapshot |
|---|---:|
| Result datasets | 37 |
| Model-result / configuration rows | 900 |
| Exact model names | 191 |
| Model + configuration + harness combinations | 683 |
| Provider labels | 37 |
| Benchmark directory entries | 74 |

Counts are based on the checked-in data/external-benchmarks.json. A model may have multiple configurations or result rows; model names are not configuration counts.

## QBench Composite Index 3.5

QBench 3.5 is an independent six-domain percentile index. It combines eligible AA v5 core components, eligible AA standalone evaluations, and traceable external frontier benchmarks. **It is not Artificial Analysis' native Intelligence Index score.**

### Method

1. For each eligible benchmark, select the highest published score for each exact model name. Configuration and harness details remain visible in the underlying result rows.
2. Convert each benchmark's model scores to midrank percentiles within that benchmark's available cohort. This avoids pretending that an Elo score, a percentage, a task-completion rate and an accuracy score share the same raw scale.
3. Give each benchmark one primary domain. Average benchmark percentiles equally inside each domain.
4. Average the available domain scores equally to produce the QBench index. Missing domain scores are not imputed.
5. An evaluation needs at least **8 unique model names** to contribute. A model is ranked only when it has results in at least **4 eligible evaluations** across at least **3 of 6 domains**.

### Six domains

- Knowledge & Professional Work
- Coding & Engineering
- Science & Mathematics
- Reasoning & Generalization
- Agents & Tool Use
- Multimodal & Interaction

### Current coverage

- **18 evaluations** currently meet the eight-model minimum and are included in the composite.
- **42 models** meet the model-level ranking threshold.
- **118 models** have results in at least two eligible evaluations but do not meet the full ranking threshold; they remain coverage-only.
- Other models with only one eligible evaluation remain discoverable in Model Explorer.
- Only **6 of the 9 AA v5 core components** currently meet the minimum model coverage. The remaining AA components remain visible in the benchmark directory and are not assigned invented composite values.

Eligible evaluations and current unique-model coverage:

| Primary domain | Evaluation | Unique models |
|---|---|---:|
| Knowledge & Professional Work | AA-Briefcase v1.1 | 38 |
| Knowledge & Professional Work | Harvey LAB-AA v1.1 | 21 |
| Knowledge & Professional Work | GDP.pdf | 11 |
| Knowledge & Professional Work | AA-Omniscience v1.1 | 11 |
| Knowledge & Professional Work | MLCR-AA | 16 |
| Coding & Engineering | Terminal-Bench 4.0 | 23 |
| Coding & Engineering | SWE-Bench Pro (public set) | 24 |
| Science & Mathematics | Terminal-Bench-Science 0.1 | 43 |
| Science & Mathematics | FrontierMath Tiers 1–3 v2 | 58 |
| Reasoning & Generalization | HLE-Diamond | 19 |
| Reasoning & Generalization | ARC-AGI-2 | 49 |
| Reasoning & Generalization | LiveBench 2.0 | 31 |
| Agents & Tool Use | OSWorld 2.0 | 9 |
| Agents & Tool Use | AA-AnalystAgent | 29 |
| Agents & Tool Use | APEX-Agents-AA | 31 |
| Agents & Tool Use | EnterpriseOps-Gym-AA | 28 |
| Multimodal & Interaction | AA-3D v1.0 | 23 |
| Multimodal & Interaction | Code2Video-AA | 27 |

This is a broad comparative percentile index, not a controlled head-to-head test. Some sources use different scaffolds, effort settings, tools, or run protocols. The model table shows coverage alongside the score so partial evidence is not mistaken for complete evaluation.

## Artificial Analysis evaluation directory

QBench's directory captures the **38 entries** listed on the Artificial Analysis AI Model Evaluations page, including the Intelligence Index page itself. They are grouped into:

- 10 AA v5 core entries (the index page plus nine component evaluations)
- 13 AA standalone evaluations
- 15 AA legacy evaluations

The directory distinguishes current core evaluations, standalone evaluations, and legacy versions. It does not merge retired benchmark versions with their replacements. Examples of AA standalone evaluations include AA-3D, APEX-Agents-AA, AA-AnalystAgent, Harvey LAB-AA v1.1, EnterpriseOps-Gym-AA, ITBench-AA, IFBench, MMMU-Pro, MLCR-AA, Code2Video-AA and HealthBench. Some pages expose only a small top-of-leaderboard summary; those rows are labelled as summaries and are excluded from the composite when they do not meet the minimum.

## Additional benchmark imports and source quality

### Included in QBench 3.5

- **AA-3D v1.0:** 23 official Artificial Analysis model configurations; 55 interactive 3D scene tasks; Elo ratings from blind pairwise human votes, with publisher-reported 95% confidence intervals.
- **Harvey LAB-AA v1.1:** 25 published configuration rows, including repeated Claude Haiku effort settings; 120 private legal tasks with hallucination-gated all-pass scoring and a three-judge panel.
- **ARC-AGI-2:** 49 source-cited model rows from an evals.report snapshot. Rows are marked Official by that source, but this is a dated secondary snapshot rather than the live ARC Prize team leaderboard. The top score is close enough to the ceiling to be marked ceiling-watch.
- **FrontierMath Tiers 1–3 v2:** 60 visible configuration rows from BenchLeader's 2026-10-30 mirror; 58 unique model names. BenchLeader attributes the results to Epoch AI's Benchmarking Hub. This is a partial mirror of 120 configurations, not the full leaderboard. The benchmark is private, expert-authored mathematics with automatically checked answers; high scores are marked ceiling-watch.
- **LiveBench 2.0:** six leading rows and seven suite scores/cost fields imported from the publisher; other rows are retained from a source-traceable mirror. The publisher's weighted overall score uses suite-specific weights and the publisher discloses Abacus AI sponsorship. The leaderboard is marked ceiling-watch.
- **OSWorld 2.0:** nine model results attributed to Epoch AI's original board and transcribed from LLMBenchmark.ai. This is a secondary mirror, not a direct Epoch data export.
- **SWE-Bench Pro public set:** 24 configurations from Scale AI SEAL's public-set leaderboard, mirrored by BenchLeader. The latest public result date in the snapshot is 2026-07-09. This is distinct from SWE-bench Verified and from the V2 Full/HARD boards.
- **AA-AnalystAgent:** 30 visible configurations from a 50-configuration leaderboard mirror.
- **APEX-Agents-AA:** 31 visible configurations from a 33-configuration leaderboard mirror.
- **EnterpriseOps-Gym-AA:** 30 visible configurations from a 50-configuration leaderboard mirror.
- **MLCR-AA:** 29 visible configurations from a 174-configuration leaderboard mirror; long-context medical reasoning.
- **Code2Video-AA:** all 27 published model configurations; Elo-based video-generation benchmark.

### Tracked separately, not included in the composite

- **SWE-Bench Pro V2 Full (official):** 16 Scale AI configurations with 95% confidence intervals. The top score is 99.40%, creating severe ceiling compression; it is tracked but excluded from the index.
- **SWE-Bench Pro V2 (third-party snapshot):** retained for audit, but its exact Full/HARD selection is unclear and its values differ from the publisher's Full tab. It is not treated as the official Full table.
- **BFCL V4:** seven visible rows from UC Berkeley's official leaderboard. The page snapshot is dated 2026-04-12; it is below the eight-model threshold.
- **HealthBench Professional:** 40 source-cited provider/system-card results compiled by a third party. It is not a single controlled independent rerun and is excluded pending primary-source verification of each row.
- **METR Time Horizons:** 18 Official-status rows mirrored by evals.report, expressed in human-expert minutes to 50% task-completion success. METR says its public leaderboard is no longer actively updated; it is retained as historical reference only.
- **AA top-three-only / limited snapshots:** ITBench-AA and Global-MMLU-Lite still lack enough verifiable model-level rows for QBench 3.5. IFBench is retained as a limited, near-saturated reference rather than a composite input.
- **GDP.pdf:** 28 visible configuration rows from a 235-configuration AA leaderboard mirror; partial snapshot, not a complete leaderboard.
- **AA-Omniscience v1.1:** 28 visible full-score configurations from a 105-configuration AA leaderboard mirror; partial snapshot. The separate 40-row Atlas accuracy-only table lacks the paired hallucination-rate component and remains excluded.

## Model Explorer and comparison

- Search and filter the complete imported model set by model name, provider and benchmark coverage.
- Inspect native scores, configuration, harness, source classification, evidence note, snapshot date and source link.
- Compare up to five models in a benchmark-by-benchmark matrix. Missing results remain blank.
- Export model-result rows as CSV.
- Distinguish a full model-level leaderboard from a top-three summary or a secondary mirror.

## Analytics and charts

The interface includes the QBench composite ranking and six-domain radar, plus:

- Horizontal bar ranking, rank curve, area curve, score histogram, provider box plot, metric scatter, subscore radar and subscore stacked bars
- Provider-by-domain heatmap
- Benchmark percentile distribution box plots
- Cross-benchmark correlation heatmap (shared model names only)
- Six-domain score decomposition
- Provider capability radar
- Benchmark coverage treemap
- AA-3D confidence-interval forest plot
- QBench Index vs. API token-price Pareto frontier using source-verified standard input/output API list prices; equal-volume proxy only, not measured task cost or Cost per Task
- Benchmark snapshot freshness chart
- Six-axis model parallel-coordinates plot

Every visualization is derived from imported records. A chart that needs data not published by a source is left unavailable rather than filled with synthetic values.

## API token-price Pareto view

The Pareto chart pairs the QBench Composite Index 3.5 score with a separate **equal-token API price proxy**. For each exact model-name match with a first-party published price, the proxy is (standard uncached input price + standard output price) / 2, expressed in USD per 1 million tokens and assuming equal input and output token volumes. The current snapshot records 10 exact model mappings from OpenAI, Anthropic and Google first-party pricing pages (2026-10-31).

This is a unit-price comparison, **not Cost per Task, not observed workload expenditure, and not a QBench score component**. It excludes cache hits/writes, batch discounts, tool/search charges, regional uplifts, negotiated prices, taxes and provider-specific tokenization differences. Models without a verified exact-name price mapping are omitted rather than estimated. The frontier is recalculated from the plotted model set: a point is non-dominated when no other plotted model is both no more expensive and at least as high-scoring.

The AA standalone/legacy directory keeps partial public leaderboard snapshots distinct from full result tables. IFBench, MMMU-Pro and AA-LCR v1.1 currently expose only official top-three summaries in this repository; they are marked summary-only and excluded from Composite Index 3.5 until a sufficiently complete, comparable result table is available. The public AA page reports 27/451 IFBench models, 27/298 MMMU-Pro models and 28/589 AA-LCR v1.1 models, so the three-row snapshots must not be mistaken for complete leaderboards.

## Data sources and limitations

Primary sources are preferred: Artificial Analysis evaluation pages, Epoch AI benchmark pages, Scale AI leaderboards, LiveBench, UC Berkeley BFCL, METR and the originating benchmark publishers. Secondary mirrors are explicitly labelled in row-level metadata. A source URL alone does not mean a result was independently reproduced by QBench.

QBench stores the publisher's reported value and unit. Percentile normalization is only used for the composite. It does not convert missing scores to zero, infer missing configurations, merge benchmark versions, or treat an unreported value as a failed run. Scores from different harnesses and model configurations are not controlled head-to-head comparisons.

## Technical

- Static single-file application: index.html
- Benchmark data: data/external-benchmarks.json
- Main branch deploys to Cloudflare Pages
