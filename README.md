# QBench

Independent AI model benchmark explorer and performance analytics platform.

**公開URL:** https://qbench.pages.dev/ （Cloudflare Pages、`main` ブランチから自動デプロイ）

QBench は、公開されているベンチマーク結果を元に、モデルごとの成績・実行条件・出典・取得日を一覧し、比較・分析できる独立した閲覧ツールです。Artificial Analysis（AA）の画面構成と評価基準を参考にしていますが、AA の数値は使用せず、AA の指数（Intelligence Index）を再現・公式化するものではありません。

QBench collects model-level results from public benchmark publishers and source-traceable leaderboard mirrors. It keeps native benchmark units, run configurations, harnesses, snapshot dates and source notes visible. It does not manufacture missing scores.

## Policy: no Artificial Analysis values

- AA's published values (scores, Elo, rankings, index numbers) are **not** stored or displayed.
- AA's evaluation names and definitions may be used as evaluation criteria.
- Benchmarks whose values exist only from AA have their model values removed (2026-10-31). Their definitions and source links remain in the benchmark directory.

## QBench Composite Index 4.0

QBench Composite Index 4.0 is an independent, percentile-based index with the four-category structure of the AA Intelligence Index v5 (Knowledge Work, Coding, Science, General), equal weight per category. Where an AA evaluation has no non-AA values, QBench uses a current, non-saturated public benchmark instead. **It is not Artificial Analysis' native Intelligence Index score.**

### Method

1. For each eligible benchmark, select the highest published score for each exact model name. Configuration and harness details remain visible in the underlying rows.
2. Convert each benchmark's model scores to midrank percentiles within that benchmark's cohort, so Elo, percentages and accuracy do not share a raw scale.
3. Category score = equal average of the percentiles of its eligible benchmarks.
4. Index = equal average of the available category scores. Missing categories are not imputed.
5. A benchmark needs **at least 8 unique model names** and `indexEligible: true` in the data.
6. A model is ranked only with results in **at least 4 eligible evaluations** across **at least 3 of 4 categories**. Models with 2+ results are shown as coverage-only.

### Categories and evaluations (4.0)

| Category | Evaluation(s) in index | Note |
|---|---|---|
| Knowledge Work | OSWorld 2.0 | Gap: AA-Briefcase v1.1, AutomationBench-AA and GDP.pdf have no non-AA values yet. |
| Coding | Terminal-Bench 4.0, SWE-Bench Pro (public set) | SWE-Bench Pro substitutes for AA FrontierCode 2.0 (no non-AA values yet). |
| Science | Terminal-Bench-Science 0.1, FrontierMath Tiers 1–3 (v2) | FrontierMath substitutes for AA CritPt v2 (no non-AA values yet). |
| General | HLE-Diamond, ARC-AGI-3, LiveBench 2.0 | ARC-AGI-3 and LiveBench substitute for AA-Omniscience v1.1 (no non-AA values yet). |

### Excluded as saturated

- GPQA Diamond
- SWE-bench Verified
- SWE-Bench Pro V2 Full (official; top 99.4%)
- ARC-AGI-2 (top 95%)

### Current coverage (as rendered on 2026-10-31)

- **8 evaluations** are included in the index.
- **16 models** are ranked; **32 models** are coverage-only.
- Knowledge Work rests on a single evaluation (OSWorld 2.0), so that category is less stable than the others.

## Data snapshot — 2026-10-31

| Metric | Current snapshot |
|---|---:|
| Benchmark datasets with model values | 21 |
| Model-result / configuration rows | 604 |
| Exact model names | 147 |
| Model + configuration + harness combinations | 508 |
| Provider labels | 30 |
| Benchmark directory entries | 74 |

Counts come from the checked-in `data/external-benchmarks.json`. A model may have several configurations or rows; model names are not configuration counts.

## Sources

Primary sources are preferred: publisher leaderboards and pages, Epoch AI, Scale AI, LiveBench, UC Berkeley BFCL, METR, ARC Prize. Several rows come from secondary mirrors, which are labelled per row:

- **ARC-AGI-3:** 69 configuration rows mirrored from BenchLM (semi-private scores, snapshot 2026-10-28). Verify against the ARC Prize leaderboard before citing as official.
- **ARC-AGI-2 (excluded):** evals.report snapshot.
- **FrontierMath Tiers 1–3:** BenchLeader mirror (2026-10-30) of Epoch AI's Benchmarking Hub; a partial mirror.
- **OSWorld 2.0:** nine results attributed to Epoch AI's board, via LLMBenchmark.ai.
- **SWE-Bench Pro public set:** Scale AI SEAL public-set leaderboard, via BenchLeader.

A source URL alone does not mean QBench independently reproduced a result.

## Model Explorer, comparison and charts

- Index leaderboard with search, provider filter, sortable category columns and ranked-only switch.
- QBench Index vs. API price proxy (scatter, Pareto frontier, "most attractive quadrant").
- Category breakdown for the top ranked models.
- Benchmark directory with status per benchmark and a bar chart of model scores.
- Models view with CSV export and up to five-model comparison.

## API token-price proxy

The price axis uses first-party list prices (standard uncached input and output) for each exact model-name match: (input + output) / 2 per 1 million tokens, assuming equal token volumes. The snapshot records 10 mappings from OpenAI, Anthropic and Google pricing pages (2026-10-31).

This is **not cost per task, not observed workload expenditure, and not a score component**. It excludes caching, batch discounts, tool charges, regional uplifts, negotiated prices, taxes and tokenization differences. Models without a verified exact-name mapping are omitted rather than estimated.

## Limitations

QBench stores the publisher's reported value and unit. Percentile normalization is used only for the composite. It does not convert missing scores to zero, infer missing configurations, merge benchmark versions, or treat an unreported value as a failed run. Scores from different harnesses and configurations are not controlled head-to-head comparisons.

## Technical

- Static single-file application: `index.html` (no build step, no Artificial Analysis dependency)
- Benchmark data: `data/external-benchmarks.json`
- Main branch deploys to Cloudflare Pages (https://qbench.pages.dev/)
