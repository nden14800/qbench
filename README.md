# QBench

Independent AI model benchmark explorer and performance analytics platform.

**公開URL:** https://qbench.pages.dev/ （Cloudflare Pages、`main` ブランチから自動デプロイ）

QBench presents source-traceable model results from public evaluations. It supports benchmark-level inspection, model comparison, coverage analysis and an independent composite percentile index. The four-domain taxonomy is inspired by the structure of Artificial Analysis Intelligence Index v5, but QBench is not an AA score, reproduction or official ranking.

## Data policy

- No Artificial Analysis (AA) scores, Elo values, rankings or native Index values are stored or displayed.
- QBench does not copy AA's internal benchmark weights.
- Publisher results, third-party evaluator runs and secondary leaderboard mirrors are distinguished in each row.
- Missing results are not converted to zero; uncertain rows are excluded from composite calculations.
- Model aliases are not merged without evidence. The highest published configuration for an exact model name is used within each eligible evaluation; configurations and harnesses remain visible.

## QBench Composite Index 1.1

The Index 1.1 uses four equal-weight domains: **Knowledge Work, Coding, Science and General**. This is a taxonomy reference to AA v5 only. QBench uses its own normalization and weighting rules.

### Calculation

1. An evaluation contributes only when it is marked `indexEligible: true` and contains at least **8 unique model names** with valid, non-uncertain scores.
2. For each exact model name in an evaluation, QBench selects its highest published score.
3. Each selected score is converted to a midrank percentile within that evaluation's observed cohort:
   `100 × (count(scores below) + (count(ties) − 1) / 2) / (cohort size − 1)`.
4. A domain score is the equal-weighted average of the eligible evaluation percentiles available in that domain.
5. A provisional Index is the equal-weighted average of the domain scores that are available for that model. Missing results are never imputed.
6. A **rank** requires at least **3 eligible evaluations across at least 2 of the 4 domains**. Ranks with fewer than 4 evaluations or fewer than 3 domains are marked **limited coverage**. Models with 2 eligible results have a provisional value but no rank. Models with one eligible result are visible in Models and Benchmarks but do not receive a composite Index.

A provisional value is coverage-limited: it is not directly equivalent to a score with all four domains represented. Different model configurations, effort settings, tools and harnesses are not controlled head-to-head comparisons.

### Eligible evaluations in 1.0

| Domain | Evaluation | Valid unique models | Source / caveat |
|---|---|---:|---|
| Knowledge Work | GDPval (wins or ties) | 8 | OpenAI-published headline values; exactly meets the 8-model minimum |
| Coding | Terminal-Bench 4.0 | 59 | Vals AI third-party evaluation using Mini-SWE-agent; snapshot 2026-10-29 |
| Coding | SWE-Bench Pro (public set) | 20 | Scale AI public set; 5 uncertain rows are excluded |
| Science | Terminal-Bench-Science 0.1 | 43 | Vals AI third-party evaluation using Mini-SWE-agent; snapshot 2026-10-25 |
| Science | ProofBench 1.1 | 52 | Vals AI; full 54-row leaderboard minus two specialist formal-proof systems |
| General | HLE-Diamond | 19 | Scale AI publisher leaderboard; snapshot 2026-10-31 |
| General | ARC-AGI-3 | 24 | BenchLM mirror of ARC Prize semi-private scores; not an official public leaderboard extract |
| General | LiveBench 2.0 | 31 | 6 publisher-reported rows and secondary-mirror rows explicitly labelled |

Knowledge Work has one eligible evaluation; Science has two. Knowledge Work is therefore the least broad domain. Provisional scores and limited-coverage ranks that omit domains should be interpreted cautiously.

### Coverage snapshot — 2026-10-31

- **48 ranked models**
- **10 provisional Index values** (2+ eligible evaluations, but rank-coverage requirements not met)
- **41 single-evaluation models** (shown without a composite Index)
- **99 models** with at least one result in an Index-eligible evaluation
- **8 eligible evaluations** across the four domains

### Excluded or tracked separately

- **OSWorld 2.0:** 16 LLM Stats secondary aggregate rows are retained for reference but excluded because the metric does not identify binary completion versus partial reward.
- **ProofBench 1.1:** 54 Vals AI rows added to Science; four entries tie at 100%. AlephProver and Aristotle remain visible but are excluded as specialist formal-proof systems.
- **GPQA Diamond:** the stored 42-row OpenRouter extract is partial against the 167-row leaderboard, so it stays standalone. **FrontierMath Tiers 1–3:** 60 of 120 published configurations are stored, so this partial extract stays standalone.
- **FrontierMath Tiers 1–3:** retained separately as ceiling-watch; it is not in the current composite.
- **GPQA Diamond, SWE-bench Verified, SWE-Bench Pro V2 Full and ARC-AGI-2:** retained in the benchmark directory and excluded from the composite under the current ceiling-watch policy.
- AA-only evaluations without non-AA model values remain in the directory as definitions/source references, not as fabricated model scores.

## Evaluation-specific cost data

QBench keeps benchmark costs separate because they measure different things.

- **Terminal-Bench 4.0 — Cost / Test:** all 59 Vals AI model rows include publisher-listed Cost / Test, Tokens / Test and Duration / Test where available. This is the cost of a full benchmark test, not a universal task cost.
- **ProofBench 1.1 — Cost / Test:** the 54 Vals AI third-party evaluation rows include the same evaluation-specific metrics where reported.
- **LiveBench 2.0 — Cost per successful task:** the first six model rows and costs come from the publisher's leaderboard. The remaining 25 model scores are explicitly attributed to the BenchLeader mirror; no publisher cost is invented for them.
- **API token prices:** a separate searchable catalog lists input/output rates per 1M tokens for 44 model entries. First-party provider prices and OpenRouter route prices are separately labelled; the scatter uses first-party rates only and is not a task-cost metric.

The benchmark detail view labels the native metric, displays all stored model/configuration rows, and plots cost against score only within the relevant evaluation. Cost metrics from different benchmarks are never pooled.

## Data snapshot — 2026-10-31

| Metric | Current snapshot |
|---|---:|
| Benchmark datasets with model values | 22 |
| Model-result / configuration rows | 664 |
| Exact model names across all datasets | 148 |
| Model + configuration + harness combinations | 553 |
| Provider labels | 28 |
| API price entries | 44 |
| Benchmark directory entries | 74 |

Counts come from the checked-in `data/external-benchmarks.json`. A model may have multiple configurations, harnesses or benchmark results.

## UI and features

- Index leaderboard with provider filter, search, sortable metrics, ranked, limited-coverage and provisional distinctions and responsive columns.
- Charts: domain composition, first-party API token-price vs Index scatter with Pareto frontier, percentile heatmap, Index distribution and evaluation coverage.
- Models view includes every model with at least one eligible result; single-result models are labelled and do not receive a composite score. Compare up to five multi-evaluation models with a category radar and result table. A searchable API price catalog also lists priced models outside the composite.
- Benchmark directory with per-evaluation score charts, all stored result rows, configuration, harness, snapshot, source/evidence and evaluation-specific cost data.
- CSV export and light/dark themes.
- Responsive dashboard without horizontal overflow in the main Index table.

Built with Bootstrap 5.3.3, Bootstrap Icons 1.13.1 and ECharts 6.1.0 (`vendor/echarts.min.js`). Fonts: DM Sans and Zen Kaku Gothic New for body text, Zen Old Mincho for Japanese display headings, and IBM Plex Mono for numeric data.

## Sources and verification

- [Vals AI — Terminal-Bench 4.0](https://www.vals.ai/benchmarks/terminal-bench-4)
- [Vals AI — ProofBench 1.1](https://www.vals.ai/benchmarks/proof_bench)
- [LiveBench 2.0](https://livebench.ai/)
- API pricing: [OpenAI](https://developers.openai.com/api/docs/pricing), [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), [Google](https://ai.google.dev/gemini-api/docs/pricing), [xAI](https://docs.x.ai/developers/pricing), [Alibaba](https://www.alibabacloud.com/help/en/model-studio/model-pricing), [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing/), [Mistral](https://docs.mistral.ai/inference/pricing), [OpenRouter](https://openrouter.ai/api/v1/models)
- [BenchLeader — LiveBench 2.0 global mirror](https://www.benchleader.com/benchmarks/livebench2_global)
- [Scale AI — HLE-Diamond](https://labs.scale.com/leaderboard/hle-diamond)
- [Epoch AI — OSWorld 2.0 methodology](https://epoch.ai/benchmarks/osworld-2) — documents binary accuracy separately from partial reward; the secondary aggregate is excluded until its metric is verified.
- [ARC Prize — ARC-AGI-3](https://arcprize.org/arc-agi-3)
- [Artificial Analysis methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking) — taxonomy reference only; AA values and internal weights are not copied.

A source URL alone does not mean QBench independently reproduced a result. Data provenance, harness and snapshot caveats are retained per benchmark or row where available.

## Technical

- Static single-file application: `index.html` (no build step)
- Chart library: `vendor/echarts.min.js` (ECharts 6.1.0, Apache-2.0; see `vendor/ECHARTS-LICENSE.txt`)
- Benchmark data: `data/external-benchmarks.json`
- Main branch deploys to Cloudflare Pages: https://qbench.pages.dev/
