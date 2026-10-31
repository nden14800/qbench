# QBench

Independent AI benchmark leaderboards and model-performance analysis.

- Production: https://qbench.pages.dev
- Repository: https://github.com/nden14800/qbench
- Data snapshot: 2026-10-31

## Current coverage

| Measure | Count |
|---|---:|
| Unique model names | 165 |
| Model configurations | 330 |
| Published result rows | 507 |
| Datasets with model-level results | 20 |
| Providers | 31 |
| Benchmark directory entries | 44 |
| Models eligible for the composite score | 10 |

The main leaderboard lets users select any of the 20 datasets with published model results. It starts with ARC-AGI-2 (80 model entries) and displays each benchmark's native score, provider, configuration, source, and snapshot date. Search and provider filters apply to the selected leaderboard.

The benchmark directory also lists evaluations that are being tracked but do not yet have imported model-level results. Those entries are not counted as scored datasets.

## QBench Composite Index

The composite score is a separate QBench calculation using six source datasets. Four domains contribute equally (25% each):

| Domain | Weight | Input |
|---|---:|---|
| Coding & Agentic | 25% | LiveBench 2.0 |
| Scientific Reasoning | 25% | GPQA Diamond |
| Mathematics & Proof | 25% | Mean of FrontierMath family and ProofBench |
| Practical Execution | 25% | Furniture Assembly Benchmark |

The FrontierMath family is the arithmetic mean of FrontierMath Tiers 1–3 v2 and FrontierMath Tier 4 v2. Within Mathematics & Proof, the FrontierMath family and ProofBench each contribute 12.5% of the total index. The overall score is the arithmetic mean of the four domain scores.

Eligibility requires an exact model-name match across all six underlying result tables: LiveBench 2.0, GPQA Diamond, FrontierMath Tiers 1–3 v2, FrontierMath Tier 4 v2, ProofBench, and Furniture Assembly Benchmark. The current complete intersection contains 10 models. Missing values are not imputed and model aliases are not guessed.

## Benchmark data

Every result table retains its source-published score scale. Elo, accuracy, pass rate, cost, confidence intervals, configurations, and harness details are not converted into a shared score unless a documented methodology supports that conversion.

The statistical analysis section is generated from the imported data and includes:
- Unique model coverage per benchmark.
- Model/provider coverage.
- The selected benchmark's score ranking.
- Unique model counts compared with raw result-row counts.

Benchmark directory descriptions are written to explain what each test measures. Each entry links to its source. A status distinguishes complete result tables, leader summaries, public summaries, and evaluations still being tracked.

## Data policy

- Keep source URLs and snapshot dates with every dataset.
- Preserve the source's score unit and model configuration.
- Distinguish model names from configuration variants.
- Do not fill missing results or infer aliases.
- Do not combine unrelated benchmark scales into an aggregate.
- Update the visible coverage counts from the data file rather than hardcoding them.

## Development

The site is a self-contained static `index.html` with benchmark data in `data/external-benchmarks.json`. It uses ECharts for charts and Bootstrap Icons for interface icons.

Cloudflare Pages deploys the `main` branch to https://qbench.pages.dev.
