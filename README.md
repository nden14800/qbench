# QBench

Independent AI benchmark leaderboards and model-performance analysis.

- Production: https://qbench.pages.dev
- Repository: https://github.com/nden14800/qbench
- Data snapshot: 2026-10-31

## Current coverage

| Measure | Count |
|---|---:|
| Unique model names across imported datasets | 165 |
| Model configurations (model + configuration + harness) | 330 |
| Published result rows | 507 |
| Datasets with model-level results | 20 |
| Providers | 31 |
| Benchmark directory entries | 44 |
| Models with at least 3 of 4 QBench Composite domains | 29 |
| Fully covered models with a comparable composite score | 12 |
| Partial-coverage models shown without a rank | 17 |

Counts are derived from `data/external-benchmarks.json`. A result row is not necessarily a unique model: some benchmarks publish several reasoning efforts, harnesses, or routing configurations for one model. The main leaderboard now groups each model into one row, shows its best reported configuration, and lists the other reported configurations in the details column. CSV export retains the raw source rows.

The main leaderboard lets users select any of the 20 datasets with published model-level results. It starts with ARC-AGI-2 and displays the source-native score, provider, configuration, source, and snapshot date.

## QBench Composite Index v2

The composite was redesigned on 2026-10-31. Version 1 required an exact model-name intersection across every source table and directly averaged native scores. That left only 10 models and mixed unlike score scales. Version 2 normalizes each dataset independently to a 0–100 percentile rank before combining results.

### Domains and weights

| Domain | Weight | Inputs |
|---|---:|---|
| Reasoning & Agentic | 25% | LiveBench 2.0 |
| Science | 25% | GPQA Diamond |
| Math & Proof | 25% | FrontierMath Tiers 1–3 v2, FrontierMath Tier 4 v2, ProofBench |
| Practical Execution | 25% | Furniture Assembly Benchmark |

Within each source dataset, the best published score for each exact model name is converted to a percentile among unique model names in that dataset. Ties receive average ranks. Each domain is the mean of its available input percentiles; the Math & Proof domain averages the available percentiles from its three input datasets. The four domains have equal 25% weights.

### Coverage and ranking policy

- A model appears in the coverage explorer when at least 3 of 4 domains are available.
- Only 4/4 models receive a QBench score and a ranked position.
- 3/4 models remain visible for coverage, but show no composite score and are not ranked. Missing domains are never imputed.
- Model names are matched exactly; aliases are not inferred.
- If a model has multiple configurations in one source dataset, the highest published score is used. The selected configuration is retained in the row's source details.
- This is a best-reported-configuration index, not a controlled same-effort, same-harness comparison. Configuration differences can affect results.

The current source tables contain 89 distinct model names across the six composite inputs. 29 have at least 3 of 4 domains: 12 have full coverage and are ranked; 17 have partial coverage and are displayed separately without a score.

### Source snapshots

| Dataset | Snapshot | Source |
|---|---|---|
| LiveBench 2.0 | 2026-10-30 | https://livebench.ai/ |
| GPQA Diamond | 2026-10-30 | https://openrouter.ai/benchmarks/gpqa-diamond/ |
| FrontierMath Tiers 1–3 v2 | 2026-10-30 | https://epoch.ai/benchmarks/frontiermath-tiers-1-3-v2 |
| FrontierMath Tier 4 v2 | 2026-10-29 | https://epoch.ai/benchmarks/frontiermath-tier-4-v2 |
| ProofBench | 2026-10-29 | https://epoch.ai/benchmarks/proofbench |
| Furniture Assembly Benchmark | 2026-10-30 | https://epoch.ai/benchmarks/furniture-assembly |

Artificial Analysis Intelligence Index v5 is a separate nine-evaluation composite with its own methodology and weights. It is not blended into QBench's formula.

## Benchmark data and interpretation

Every source table retains its native score and unit. Percentiles are used only inside QBench Composite Index v2 to make unlike source scales aggregatable; they are not a replacement for the source score. Percentiles are relative to the models included in each imported dataset and may change when coverage changes.

Epoch AI notes that prompt and evaluation settings can materially affect scores, and that results from different evaluation settings may not be directly comparable. Review each source leaderboard, configuration, harness, and snapshot before drawing fine-grained conclusions.

## Statistical analysis

The analysis section is generated from imported data and includes:
- Unique model coverage per benchmark.
- Model/provider coverage.
- The selected benchmark's score ranking.
- Unique model counts compared with raw result-row counts.

## Data policy

- Keep source URLs and snapshot dates with every dataset.
- Preserve each source's score unit and configuration.
- Distinguish model names from configuration variants.
- Do not fill missing results or infer aliases.
- Never average raw scores from unrelated scales.
- Show partial coverage explicitly and never assign partial models a comparable composite score.
- Derive visible counts from data rather than hardcoding them.

## Development

The site is a self-contained static `index.html` with benchmark data in `data/external-benchmarks.json`. It uses ECharts for charts and Bootstrap Icons for interface icons.

Cloudflare Pages deploys the `main` branch to https://qbench.pages.dev.
