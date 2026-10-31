# QBench

Independent AI model benchmark explorer and performance analytics platform.

**公開URL:** https://qbench.pages.dev/ （Cloudflare Pages、`main` ブランチから自動デプロイ）

QBench は、公開されているベンチマーク結果を元に、モデルごとの成績・実行条件・出典・取得日を一覧し、比較・分析できる独立した閲覧ツールです。Artificial Analysis（AA）の画面構成と評価基準を参考にしていますが、AA の数値は使用せず、AA の指数（Intelligence Index）を再現・公式化するものではありません。

QBench collects model-level results from public benchmark publishers and source-traceable leaderboard mirrors. It keeps native benchmark units, run configurations, harnesses, snapshot dates and source notes visible. It does not manufacture missing scores.

## Policy: no Artificial Analysis values

- AA's published values (scores, Elo, rankings, index numbers) are **not** stored or displayed.
- AA's evaluation names and definitions may be used as evaluation criteria.
- Benchmarks whose values exist only from AA have their model values removed. Their definitions and source links remain in the benchmark directory.

## QBench Composite Index 1.0

An independent, percentile-based index with four categories at equal weight (Knowledge Work, Coding, Science, General), following the AA Intelligence Index v5 category structure. Where an AA evaluation has no non-AA values, QBench uses a current, non-saturated public benchmark instead. **It is not Artificial Analysis' native Intelligence Index score.**

### Method

1. For each eligible benchmark, the highest published score per exact model name is used. Configuration and harness stay visible in the underlying rows.
2. Each benchmark is converted to midrank percentiles within its cohort, so Elo, percentages and accuracy do not share a raw scale.
3. Category score = equal average of its eligible benchmarks' percentiles.
4. Index = equal average of the available category scores. Missing values are never imputed.
5. A benchmark needs at least **8 unique models** and `indexEligible: true`.
6. A model is ranked with results in at least **4 eligible evaluations** across at least **3 of 4 categories**. Other models with 2+ results are coverage-only.

### Evaluations in 1.0

| Category | Evaluations | Note |
|---|---|---|
| Knowledge Work | OSWorld 2.0, GDPval (wins or ties) | OSWorld is a self-reported aggregate. GDPval has exactly 8 models. AA-Briefcase, AutomationBench-AA and GDP.pdf have no non-AA values. |
| Coding | Terminal-Bench 4.0, SWE-Bench Pro (public set) | Terminal-Bench 4.0 comes from vals.ai (Mini-SWE-agent), not the official table. SWE-Bench Pro substitutes for AA FrontierCode 2.0. |
| Science | Terminal-Bench-Science 0.1 | One evaluation only. FrontierMath is excluded as saturated. CritPt has no non-AA values. |
| General | HLE-Diamond, ARC-AGI-3, LiveBench 2.0 | ARC-AGI-3 and LiveBench substitute for AA-Omniscience v1.1 (no non-AA values). |

### Excluded as saturated (as of 2026-10-31)

- GPQA Diamond
- SWE-bench Verified
- SWE-Bench Pro V2 Full (official; top 99.4%)
- ARC-AGI-2 (top 95%)
- FrontierMath Tiers 1–3 (top 93.7%)

### Current coverage (rendered on 2026-10-31)

- **8 evaluations** are included in the index.
- **18 models** are ranked; **35 models** are coverage-only.
- Science rests on a single evaluation, so the Science category is the least stable.

## Data snapshot — 2026-10-31

| Metric | Current snapshot |
|---|---:|
| Benchmark datasets with model values | 22 |
| Model-result / configuration rows | 654 |
| Exact model names | 157 |
| Model + configuration + harness combinations | 518 |
| Provider labels | 27 |
| Benchmark directory entries | 74 |

Counts come from the checked-in `data/external-benchmarks.json`. A model may have several configurations or rows.

## Sources and caveats

Primary sources are preferred. Several rows come from third-party evaluators or mirrors, labelled per row:

- **Terminal-Bench 4.0 / Terminal-Bench-Science 0.1:** vals.ai runs (Mini-SWE-agent harness, 2026-10-25 and 2026-10-29). The official tbench.ai tables were not readable.
- **SWE-Bench Pro (public):** Scale AI SEAL public-set leaderboard. Snapshot date not shown; harness not stated for most rows.
- **OSWorld 2.0:** self-reported aggregate mirrored by llm-stats.com (2026-10-26), converted from 0–1 to %.
- **GDPval:** OpenAI's headline metric as shown on OpenAI pages; Claude Opus 4.7 and Gemini 3.1 Pro values appear in OpenAI's chart.
- **ARC-AGI-3:** BenchLM mirror of ARC Prize semi-private scores (2026-10-28). Verify against the ARC Prize leaderboard before citing as official.
- **LiveBench 2.0:** publisher and mirror rows with inconsistent snapshot dates on mirror pages.

A source URL alone does not mean QBench independently reproduced a result.

## Charts and features

Built with ECharts 6.1.0 (`vendor/echarts.min.js`, the same library as the omikuji-bench project). Index leaderboard with search, provider filter and sortable category columns; index vs. API price scatter with Pareto frontier and "most attractive quadrant"; category stacked bars; benchmark directory with per-benchmark bar charts; models view with CSV export and up to five-model comparison.

## API token-price proxy

The price axis is (standard input + standard output) / 2 per 1M tokens, from first-party list prices for each exact model-name match, assuming equal token volumes. It is **not cost per task** and not a score component. It excludes caching, batch discounts, tool charges and negotiated prices.

## Limitations

QBench stores the publisher's reported value and unit. Percentile normalization is used only for the composite. It does not convert missing scores to zero, infer missing configurations, merge benchmark versions, or treat an unreported value as a failed run. Scores from different harnesses and configurations are not controlled head-to-head comparisons.

## Technical

- Static single-file application: `index.html` (no build step)
- Chart library: `vendor/echarts.min.js` (ECharts 6.1.0, Apache-2.0; see `vendor/ECHARTS-LICENSE.txt`)
- Benchmark data: `data/external-benchmarks.json`
- Main branch deploys to Cloudflare Pages (https://qbench.pages.dev/)
