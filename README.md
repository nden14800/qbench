# QBench

Independent AI benchmark leaderboards and model-performance analysis.

- Production: https://qbench.pages.dev
- Repository: https://github.com/nden14800/qbench
- Data snapshot: 2026-10-31

## Current coverage

| Measure | Count |
|---|---:|
| Unique model names across imported datasets | 165 |
| Model configurations (model + configuration + harness) | 325 |
| Published result rows | 505 |
| Datasets with model-level results | 20 |
| Providers | 31 |
| Benchmark directory entries | 46 |

Counts are derived from data/external-benchmarks.json. A result row is not necessarily a unique model: a source may publish several reasoning efforts, harnesses, or routing configurations for one model. Individual benchmark leaderboards retain the source rows; the main leaderboard groups each model once and shows its best reported configuration. CSV export retains the raw rows.

## QBench Composite Index 3.0

QBench Index 3.0 is aligned to the **nine evaluations, four categories, and official per-evaluation weights** published for Artificial Analysis Intelligence Index v5. The index does not claim to reproduce AA's native 0–100 score: QBench independently normalizes eligible source results to within-evaluation percentiles.

### Core evaluation suite and official weights

| Category | Evaluation | Weight |
|---|---|---:|
| Knowledge Work (25%) | AA-Briefcase v1.1 | 15% |
| Knowledge Work (25%) | AutomationBench-AA | 5% |
| Knowledge Work (25%) | GDP.pdf | 5% |
| Coding (25%) | FrontierCode 2.0 | 15% |
| Coding (25%) | Terminal-Bench 4.0 | 10% |
| Science (25%) | Terminal-Bench-Science 0.1 | 15% |
| Science (25%) | CritPt v2 (Hard Subset) | 10% |
| General (25%) | AA-Omniscience v1.1 | 15% |
| General (25%) | HLE-Diamond | 10% |
| **Total** | **9 evaluations** | **100%** |

The category weights and component weights mirror the AA v5 methodology. QBench's scoring procedure is intentionally separate:

1. For each evaluation, retain the highest published score for each exact model name. Preserve its configuration and harness as provenance.
2. Do not calculate percentiles for an evaluation with fewer than **8 unique model names**. Small leader summaries are not a reliable comparison pool.
3. Convert eligible model scores to a 0–100 midrank percentile within that evaluation. Tied scores receive average ranks.
4. Within each category, combine available evaluation percentiles using the official relative component weights, renormalized over eligible components in that category.
5. Give the four category scores equal 25% weight.
6. Rank a model only if all four categories are represented and at least 50% of the official total evaluation weight is available. Other models with results in at least two categories remain visible as coverage-only; no missing score is imputed.

This is a best-reported-configuration index, not a controlled same-effort or same-harness experiment. Different source protocols and configurations remain visible in the source details.

### Data adequacy on 2026-10-31

Four of the nine AA v5 evaluations currently meet the minimum eight-model threshold in QBench's imported data: AA-Briefcase v1.1, Terminal-Bench 4.0, Terminal-Bench-Science 0.1, and HLE-Diamond. The other five remain in the directory but do not affect the composite until sufficient model-level coverage is available. In the current eligible data, 29 models have results in at least two categories; 5 satisfy the strict rank rule and 24 are displayed as coverage-only. The Terminal-Bench-Science source currently uses a third-party leaderboard/harness and is not the same run configuration as AA's own Stirrup evaluation; this limitation is disclosed rather than hidden.

### Frontier extensions (monitored separately)

These are candidates for future inclusion, not fabricated or backfilled composite inputs:

- **FrontierMath Erdős** — Epoch AI's initial run covered 68 open Erdős problems. GPT-6 Astra solved 2/68 (3%); GPT-5.6 Sol, GPT-5.5, Claude Fable 5.1, and Claude Fable 5 each scored 0%. Only five models were tested in the published initial run, so the dataset is too small for a stable percentile ranking. The QBench records have been corrected to these official results.
- **MirrorCode** — Epoch AI and METR's long-horizon coding benchmark uses 15 medium/large target programs, two implementation languages, private held-out tests, and three runs per task. Full official model-level coverage is required before inclusion.
- **Earthborne Rangers (EBR-bench)** — useful long-horizon learning monitor, but its game content and harness changed in v4; versioned results must be separated.
- **ARC-AGI-3** — highly difficult interactive reasoning environments, but public standings are team/system submissions rather than comparable base-model results, so it is tracked outside the composite.
- **DeepSWE v1.1** — excluded from the index while Epoch AI labels it **Flawed**.

ARC-AGI-3 public competition standings are team/system submissions, not a comparable base-model leaderboard, so they are not mixed into this model index.

### Sources

- AA v5 announcement: https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5
- AA v5 official methodology and weights: https://artificialanalysis.ai/methodology/intelligence-benchmarking
- Epoch AI FrontierMath Erdős: https://epoch.ai/latest/announcing-frontiermath-erdos
- Epoch AI MirrorCode: https://epoch.ai/benchmarks/mirrorcode
- Epoch AI EBR-bench: https://epoch.ai/benchmarks/ebr-bench
- Epoch AI DeepSWE review status: https://epoch.ai/benchmarks/deepswe

## Benchmark data and interpretation

Every source table retains its native score, unit, snapshot date, and available configuration/harness metadata. Percentiles are used only for QBench Index 3.0. They are relative to the models included in each eligible imported dataset and can change when source coverage changes. They are not source-native benchmark scores.

Saturated, contaminated, version-incompatible, or insufficiently covered benchmarks can remain available as standalone references, but are not automatically admitted to the composite.

## Statistical analysis

Charts and counts are generated from the imported data at runtime. The dashboard distinguishes:
- Unique model names from raw result rows.
- Model configurations from model names.
- Unique model coverage per benchmark from result-row counts.
- Provider representation from model/configuration counts.
- Index-eligible evaluations from evaluations below the minimum coverage threshold.

## Data policy

- Keep source URLs, snapshot dates, score units, configurations, and harnesses with each dataset.
- Never invent missing model scores or infer aliases.
- Never average native scores across unrelated scales.
- Do not silently combine benchmark versions or harnesses.
- Require at least eight unique model names before a dataset contributes percentiles to the composite.
- Show incomplete coverage explicitly; do not impute missing scores.
- Keep frontier benchmarks in a separately identified monitoring set until comparable data coverage is sufficient.

## Development

The site is a self-contained static index.html with benchmark data in data/external-benchmarks.json. It uses ECharts for charts and Bootstrap Icons for interface icons.

Cloudflare Pages deploys the main branch to https://qbench.pages.dev.