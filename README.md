# QBench

**Independent AI model benchmark comparison, built around traceable public evidence.**

Production: https://qbench.pages.dev  
Repository: https://github.com/nden14800/qbench

QBench brings together published results from benchmark providers and presents a transparent cross-benchmark reference view. The current snapshot covers 92 unique model names across source datasets, with 10 models in the exact-name five-family composite cohort. Its interface includes a comparable-model leaderboard, model analysis, source-level rankings, coverage mapping, and multiple interactive visualizations.

## What is included

The external composite uses the exact model-name intersection across five benchmark families:

- LiveBench 2.0
- GPQA Diamond
- FrontierMath family (Tiers 1–3 v2 and Tier 4 v2 averaged as one family)
- ProofBench
- Furniture Assembly Benchmark

Each family contributes 20%. Source-published 0–100 values are retained. The composite is the arithmetic mean of those five family scores. Missing results are not imputed and model aliases are not inferred.

The GPQA Pareto chart uses only source-reported GPQA accuracy and cost-per-question values. The benchmark explorer preserves each dataset's full available source cohort; the composite remains restricted to exact-name matches. SWE-bench Pro V2 and SWE-bench Verified are displayed as separate coding references because their model coverage does not match the composite cohort.

## Data provenance and interpretation

All source snapshots, model-level values, units, dates and source URLs are stored in `data/external-benchmarks.json`.

This composite is a descriptive aggregation of third-party public benchmark snapshots. It is not a QBench-run evaluation, not a universal capability measure, and not an official ranking. Benchmarks differ in task design, difficulty, tools, reasoning effort and harness; small gaps should be interpreted cautiously.

No evaluation used by Artificial Analysis Intelligence Index v5 is included in the composite. QBench does not copy AA's scores, weights, methodology or branding. AA is referenced only as an interface-quality benchmark.

## Interface

- Responsive, data-first layout with leaderboard, model profile, benchmark score matrix, source explorer and an expanded visual analytics gallery.
- Inter for interface text, Source Serif 4 for editorial headings, Noto Sans JP / Noto Serif JP for Japanese, and IBM Plex Mono for aligned numeric values.
- Apache ECharts SVG renderer for vector-sharp labels and geometry at any zoom level.
- 11 interactive chart panels: model profile bars, radar comparison, parallel coordinates, score-distribution box plots, rank trajectory, GPQA cost/accuracy Pareto scatter, source-specific leaderboard, benchmark coverage heatmap, benchmark leaders, provider model coverage, and provider score profile.
- Per-chart SVG export, interactive tooltips, responsive resizing and side-by-side model comparison.
- Light/dark theme.
- Static HTML; no build command or package installation.

## Cloudflare Pages

- Project: `qbench`
- Production URL: https://qbench.pages.dev
- Git repository: `nden14800/qbench`
- Production branch: `main`
- Root directory and output directory: repository root
- Build command: none
- Production deployments: automatic on pushes to `main`
- Preview deployments: disabled

## Sources

- [LiveBench](https://livebench.ai/)
- [GPQA Diamond / OpenRouter](https://openrouter.ai/benchmarks/gpqa-diamond/)
- [Epoch AI FrontierMath Tiers 1–3 v2](https://epoch.ai/benchmarks/frontiermath-tiers-1-3-v2)
- [Epoch AI FrontierMath Tier 4 v2](https://epoch.ai/benchmarks/frontiermath-tier-4-v2)
- [Epoch AI ProofBench](https://epoch.ai/benchmarks/proofbench)
- [Epoch AI Furniture Assembly](https://epoch.ai/benchmarks/furniture-assembly)
- [BenchLeader LiveBench 2.0 snapshot](https://www.benchleader.com/benchmarks/livebench2_global)
- [BenchLeader FrontierMath Tiers 1–3 snapshot](https://www.benchleader.com/benchmarks/frontiermath_t1_3)
- [BenchLeader ProofBench snapshot](https://www.benchleader.com/benchmarks/proofbench)
- [BenchLM FrontierMath Tier 4 snapshot](https://benchlm.ai/benchmarks/frontiermathv2tier4)
- [LLMBenchmark Furniture Assembly snapshot](https://llmbenchmark.ai/benchmarks/epoch-furniture-assembly)
- [SWE-bench Pro V2](https://llmbenchmark.ai/benchmarks/swe-bench-pro)
- [SWE-bench Verified](https://evals.report/benchmarks/swe-bench-verified?tab=scores)
- [Artificial Analysis Intelligence Index v5](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index?stream=top) — reference for interface quality only; its evaluations are excluded.
