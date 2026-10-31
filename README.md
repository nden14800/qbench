# QBench

Independent AI model benchmark explorer and performance analytics platform.

**公開URL:** https://qbench.pages.dev/ （Cloudflare Pages、`main` ブランチから自動デプロイ）

QBench は、公開されているベンチマーク結果を元に、モデルごとの成績・実行条件・出典・取得日を一覧し、比較・分析できる独立した閲覧ツールです。Artificial Analysis の画面や評価項目を参考にしていますが、同社の数値は使用せず、同社の指数（Intelligence Index）を再現・公式化するものではありません。

QBench collects model-level results from public benchmark publishers and source-traceable leaderboard mirrors. It keeps native benchmark units, run configurations, harnesses, snapshot dates and source notes visible. It does not manufacture missing scores.

## Policy: no Artificial Analysis values

Artificial Analysis (AA) published values are **not** stored or displayed. AA evaluation names, definitions and source links are kept in the benchmark directory as reference only, with their model values removed (2026-10-31). Benchmarks whose values come only from AA are therefore empty and cannot contribute to the composite.

## Data snapshot — 2026-10-31

| Metric | Current snapshot |
|---|---:|
| Benchmark datasets with model values | 20 |
| Model-result / configuration rows | 535 |
| Exact model names | 147 |
| Model + configuration + harness combinations | 439 |
| Provider labels | 30 |
| Benchmark directory entries | 74 |

Counts are based on the checked-in `data/external-benchmarks.json`. A model may have multiple configurations or result rows; model names are not configuration counts.

## QBench Composite Index 3.5

QBench 3.5 is an independent percentile index over six domains. It uses only non-AA benchmark values. **It is not Artificial Analysis' native Intelligence Index score.**

### Method

1. For each eligible benchmark, select the highest published score for each exact model name. Configuration and harness details remain visible in the underlying result rows.
2. Convert each benchmark's model scores to midrank percentiles within that benchmark's available cohort. Elo scores, percentages, task-completion rates and accuracy scores are not placed on one raw scale.
3. Give each benchmark one primary domain. Average benchmark percentiles equally inside each domain.
4. Average the available domain scores equally to produce the QBench index. Missing domain scores are not imputed.
5. A benchmark needs at least **8 unique model names** (and `indexEligible: true` in the data) to contribute. A model is ranked only when it has results in at least **4 eligible evaluations** across at least **3 of 6 domains**.

### Six domains

- Knowledge & Professional Work
- Coding & Engineering
- Science & Mathematics
- Reasoning & Generalization
- Agents & Tool Use
- Multimodal & Interaction

### Current coverage (as rendered on 2026-10-31)

- **8 evaluations** currently meet the eight-model minimum and are included in the composite.
- **18 models** meet the model-level ranking threshold.
- **42 models** have results in at least two eligible evaluations but do not meet the full ranking threshold; they are shown as coverage only.
- **Knowledge & Professional Work** and **Multimodal & Interaction** currently have **no eligible evaluation**. Until non-AA evaluations are added there, the index covers four of six domains.

Eligible evaluations (non-AA values only):

| Primary domain | Evaluation | Unique models |
|---|---|---:|
| Coding & Engineering | Terminal-Bench 4.0 | 23 |
| Coding & Engineering | SWE-Bench Pro (public set) | 24 |
| Science & Mathematics | Terminal-Bench-Science 0.1 | 43 |
| Science & Mathematics | FrontierMath Tiers 1–3 v2 | 58 |
| Reasoning & Generalization | HLE-Diamond | 19 |
| Reasoning & Generalization | ARC-AGI-2 | 49 |
| Reasoning & Generalization | LiveBench 2.0 | 31 |
| Agents & Tool Use | OSWorld 2.0 | 9 |

This is a broad comparative percentile index, not a controlled head-to-head test. Some sources use different scaffolds, effort settings, tools, or run protocols. The model table shows coverage alongside the score so partial evidence is not mistaken for complete evaluation.

## Artificial Analysis evaluation directory

QBench's directory lists the AA evaluation entries (names, definitions, source links) for reference. Model values for AA-published results are not included. The directory distinguishes current core evaluations, standalone evaluations and legacy versions, and does not merge retired versions with their replacements.

## Benchmark sources

Included in the composite (non-AA values):

- **LiveBench 2.0:** publisher's official leaderboard rows; the publisher discloses Abacus AI sponsorship and the leaderboard is marked ceiling-watch.
- **ARC-AGI-2:** 49 model rows from an evals.report snapshot, marked Official by that source. This is a dated secondary snapshot, not the live ARC Prize leaderboard; top scores are marked ceiling-watch.
- **FrontierMath Tiers 1–3 v2:** 60 visible configurations from BenchLeader's 2026-10-30 mirror of Epoch AI's Benchmarking Hub; a partial mirror, not the full leaderboard. High scores are marked ceiling-watch.
- **HLE-Diamond, Terminal-Bench 4.0, Terminal-Bench-Science 0.1:** publisher or aggregator rows as recorded in the data file.
- **SWE-Bench Pro public set:** 24 configurations from Scale AI SEAL's public-set leaderboard, via BenchLeader.
- **OSWorld 2.0:** nine model results attributed to Epoch AI's board, transcribed from LLMBenchmark.ai; a secondary mirror.

Tracked separately, not in the composite (examples): SWE-Bench Pro V2 Full (ceiling compression), BFCL V4 (below threshold), HealthBench Professional (third-party compilation pending primary-source verification), METR Time Horizons (historical reference only), GPQA Diamond and the Epoch benchmarks listed in the data file.

## Model Explorer and comparison

- Search and filter the imported model set by model name, provider and benchmark coverage.
- Inspect native scores, configuration, harness, source classification, evidence note, snapshot date and source link.
- Compare up to five models in a benchmark-by-benchmark matrix. Missing results remain blank.
- Export model-result rows as CSV.
- Distinguish a full model-level leaderboard from a top-three summary or a secondary mirror.

## Analytics and charts

The interface includes the QBench composite ranking and six-domain radar, plus horizontal bar ranking, rank and area curves, score histogram, provider box plot, metric scatter, subscore radar and stacked bars, provider-by-domain heatmap, benchmark percentile box plots, cross-benchmark correlation heatmap (shared model names only), six-domain score decomposition, provider capability radar, benchmark coverage treemap, confidence-interval forest plot, API token-price Pareto frontier, benchmark snapshot freshness chart and six-axis parallel-coordinates plot.

Every visualization is derived from imported records. A chart that needs data a source does not publish is left unavailable rather than filled with synthetic values.

## API token-price Pareto view

The Pareto chart pairs the QBench Composite Index 3.5 score with an **equal-token API price proxy**. For each exact model-name match with a first-party published price, the proxy is (standard uncached input price + standard output price) / 2, in USD per 1 million tokens, assuming equal input and output token volumes. The current snapshot records 10 exact model mappings from OpenAI, Anthropic and Google first-party pricing pages (2026-10-31).

This is a unit-price comparison, **not Cost per Task, not observed workload expenditure, and not a QBench score component**. It excludes cache hits/writes, batch discounts, tool/search charges, regional uplifts, negotiated prices, taxes and tokenization differences. Models without a verified exact-name price mapping are omitted rather than estimated.

## Data sources and limitations

Primary sources are preferred: publisher leaderboards and pages, Epoch AI, Scale AI, LiveBench, UC Berkeley BFCL, METR. Secondary mirrors are labelled in row-level metadata. A source URL alone does not mean QBench independently reproduced a result.

QBench stores the publisher's reported value and unit. Percentile normalization is used only for the composite. It does not convert missing scores to zero, infer missing configurations, merge benchmark versions, or treat an unreported value as a failed run. Scores from different harnesses and configurations are not controlled head-to-head comparisons.

## Technical

- Static single-file application: `index.html` (no build step)
- Benchmark data: `data/external-benchmarks.json`
- Main branch deploys to Cloudflare Pages (https://qbench.pages.dev/)
