# QBench

**Independent AI model benchmark comparison, built around traceable public evidence.**

Production: https://qbench.pages.dev  
Repository: https://github.com/nden14800/qbench

QBench Index 2.0 combines published model results from independent benchmark providers. The current snapshot contains **129 unique model names**, **335 model-result entries**, and **10 benchmark datasets**. The core composite currently has a **10-model exact-name cohort**; additional frontier stress tests remain separate until coverage supports a fair comparison.

## Index 2.0 core composite

The core composite uses exact model-name intersection across five benchmark families:

- LiveBench 2.0
- GPQA Diamond
- FrontierMath family (Tiers 1–3 v2 and Tier 4 v2 averaged as one family)
- ProofBench
- Furniture Assembly Benchmark

Each family contributes 20%. Published source scores are retained on their original 0–100 scale. The composite is the arithmetic mean of the five family scores. Missing results are not imputed, model aliases are not inferred, and the cohort is not padded to inflate model count.

## Frontier stress tests and specialist datasets

Two additional high-difficulty datasets are tracked separately:

- **ARC-AGI-2** — 80 published catalog rows in the 26 October 2026 snapshot; original benchmark results attributed to Epoch AI. This tests abstract visual reasoning and remains separate from the core index until cross-family coverage is adequate.
- **FrontierMath Erdős** — 7 official Epoch AI evaluation rows on 68 research-level open problems, snapshot 29 October 2026. The top published score is 2.9% (±2.1%), making it a useful frontier stress test rather than a conventional broad leaderboard.

SWE-bench Pro V2 and SWE-bench Verified remain separate coding references because their model coverage does not match the core cohort.

## Evaluation discipline

QBench adopts useful principles from high-quality evaluation systems without copying Artificial Analysis scores or branding:

- Balanced domain-level weighting for the core composite.
- Preserve model configuration / reasoning-effort labels when published.
- Keep cost, latency, uncertainty and provider routing as separate evidence fields.
- Keep frontier stress tests outside the composite until coverage and comparability justify inclusion.
- Display source snapshots and model-level evidence.
- Do not silently treat all benchmarks as equally reliable. Benchmark review findings and scoring defects should be surfaced as quality warnings.

The ARC-AGI-2 snapshot is a curated extract of a third-party catalog that attributes its source results to Epoch AI. The FrontierMath Erdős rows are from Epoch AI's official leaderboard. Each stored row includes provenance metadata. The core composite remains independent of Artificial Analysis Intelligence Index v5: AA v5 evaluation scores are not imported into QBench.

## Data interpretation

This is a descriptive aggregation of third-party public benchmark snapshots, not a QBench-run evaluation, not an official ranking, and not a universal measure of intelligence. Benchmarks differ in task design, difficulty, tool access, reasoning effort, harness and sample size. Small gaps should be interpreted cautiously. A high score on one benchmark does not imply broad capability.

## Interface and analysis

- 17 interactive chart panels: model profile, radar comparison, parallel coordinates, score-distribution box plots, rank trajectory, cost/accuracy Pareto frontier, source leaderboard, benchmark coverage heatmap, benchmark leaders, provider model coverage, provider score profile, source score histogram, benchmark correlation matrix, provider coverage by source, index-vs-weakest-domain scatter, index score histogram, and benchmark frontier map.
- DM Sans interface typography, Instrument Serif editorial headings, Noto Sans JP / Noto Serif JP Japanese typography, and IBM Plex Mono numeric values.
- Apache ECharts SVG renderer, per-chart SVG export, interactive tooltips and responsive resizing.
- Search, provider filters, model comparison, benchmark explorer, light/dark theme.
- Static HTML; no build command or package installation.

## Sources

- [LiveBench 2.0](https://livebench.ai/)
- [GPQA Diamond / OpenRouter](https://openrouter.ai/benchmarks/gpqa-diamond/)
- [Epoch AI FrontierMath Tiers 1–3 v2](https://epoch.ai/benchmarks/frontiermath-tiers-1-3-v2)
- [Epoch AI FrontierMath Tier 4 v2](https://epoch.ai/benchmarks/frontiermath-tier-4-v2)
- [Epoch AI FrontierMath Erdős](https://epoch.ai/benchmarks/frontiermath-erdos)
- [Epoch AI ProofBench](https://epoch.ai/benchmarks/proofbench)
- [Epoch AI Furniture Assembly](https://epoch.ai/benchmarks/furniture-assembly)
- [ARC-AGI-2 catalog snapshot](https://llmbenchmark.ai/benchmarks/epoch-arc-agi-2)
- [BenchLeader LiveBench 2.0 snapshot](https://www.benchleader.com/benchmarks/livebench2_global)
- [BenchLeader FrontierMath Tiers 1–3 snapshot](https://www.benchleader.com/benchmarks/frontiermath_t1_3)
- [BenchLeader ProofBench snapshot](https://www.benchleader.com/benchmarks/proofbench)
- [BenchLM FrontierMath Tier 4 snapshot](https://benchlm.ai/benchmarks/frontiermathv2tier4)
- [LLMBenchmark Furniture Assembly snapshot](https://llmbenchmark.ai/benchmarks/epoch-furniture-assembly)
- [SWE-bench Pro V2](https://llmbenchmark.ai/benchmarks/swe-bench-pro)
- [SWE-bench Verified](https://evals.report/benchmarks/swe-bench-verified?tab=scores)
- [Artificial Analysis Intelligence Index v5](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5) — methodology reference only; AA v5 scores are excluded.

## Cloudflare Pages

- Project: `qbench`
- Production URL: https://qbench.pages.dev
- Repository: `nden14800/qbench`
- Production branch: `main`
- Root directory and output directory: repository root
- Build command: none
- Production deployments: automatic on pushes to `main`
- Preview deployments: disabled
