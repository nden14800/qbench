# QBench Index 2.0

**Independent frontier benchmark intelligence, aligned to Artificial Analysis Intelligence Index v5.**

- Production: https://qbench.pages.dev
- Repository: https://github.com/nden14800/qbench
- Latest source snapshot: 2026-10-31

## Current coverage

- **165 unique base-model names**
- **330 distinct model / configuration / harness keys** (a source-aware catalog count, not directly comparable to another provider's model-configuration denominator)
- **507 model-result observations**
- **20 datasets with imported model-level results**
- **44 benchmark families catalogued**
- **9/9 AA v5 components have at least some published result data**
- **152 AA v5 component result rows**; 4/9 components have full model-level leaderboard extracts, while the remaining components currently contain only AA-published leader summaries.

QBench does **not** calculate an AA-equivalent total score yet. No model configuration currently has a complete, comparable score across all nine AA v5 components. Missing component scores are not imputed, and model aliases are not guessed.

## AA v5-aligned methodology

QBench registers the exact nine evaluations used by Artificial Analysis Intelligence Index v5:

| Category | Weight | Evaluation | Component weight |
|---|---:|---|---:|
| Knowledge Work | 25% | AA-Briefcase v1.1 | 15% |
| Knowledge Work | 25% | AutomationBench-AA | 5% |
| Knowledge Work | 25% | GDP.pdf | 5% |
| Coding | 25% | FrontierCode 2.0 | 15% |
| Coding | 25% | Terminal-Bench 4.0 | 10% |
| Science | 25% | Terminal-Bench-Science 0.1 | 15% |
| Science | 25% | CritPt v2 (Hard Subset) | 10% |
| General | 25% | AA-Omniscience v1.1 | 15% |
| General | 25% | HLE-Diamond | 10% |

The official weights are reproduced as published. Scores remain in their native units: for example, AA-Briefcase Elo, HLE accuracy, Terminal-Bench resolution rate, and AA-Omniscience net score are not interchangeable. QBench will only compute a nine-component score for an exact model configuration when every component is available.

AA v5 reports that 60% of its Index is based on private test sets or held-out answers. QBench distinguishes full public leaderboard extracts from AA-published leader summaries and does not claim to reproduce private task sets or Artificial Analysis's private evaluation harness.

## Public result imports

Four AA v5 component datasets currently have full model-level leaderboard extracts:

- [AA-Briefcase v1.1](https://artificialanalysis.ai/evaluations/aa-briefcase) — official AA leaderboard; Elo and confidence intervals.
- [HLE-Diamond](https://labs.scale.com/leaderboard/hle-diamond) — Scale AI / CAIS; overall accuracy, reasoning and knowledge partitions, calibration error.
- [Terminal-Bench 4.0](https://www.tbench.ai/?version=4.0) — official leaderboard; task resolution, harness, token usage and cost.
- [Terminal-Bench-Science 0.1](https://vals-ai.com/benchmarks/terminal-bench-science) — Vals AI; 70 expert-authored research tasks, Mini-SWE-agent, cost and runtime.

The other five AA components currently have published leader-summary values only. They are included with that limitation explicitly marked; no missing leaderboard rows are fabricated.

The official AA Index overall scores for a small number of configurations are displayed separately as source references, not as QBench-calculated results.

## Frontier extensions

The benchmark registry expands beyond the nine AA components. It includes result datasets for ARC-AGI-2, FrontierMath Tiers 1–3, FrontierMath Tier 4, FrontierMath Erdős, Mystery Game Puzzles, GPQA Diamond, ProofBench, Furniture Assembly, SWE-bench Verified and SWE-bench Pro V2, among others.

The research queue also tracks harder or broader evaluations such as SpireClimb, Earthborne Rangers, MirrorCode, Mock AIME, Chess Puzzles, OSWorld 2.0, DeepSWE, The Agent Company, Remote Labor Index, and additional Artificial Analysis evaluations. These are not counted as imported result datasets until a source-backed model-level extract is available.

Epoch AI's benchmark hub reported 95 benchmarks and 418 models as of 2026-10-31. Its data is used as a discovery source for frontier extensions; individual entries retain their own provenance and licensing.

## Dashboard

17 interactive chart panels:

1. AA v5 component weights
2. AA-Briefcase Elo confidence-interval forest plot
3. HLE reasoning vs. knowledge scatter
4. HLE accuracy vs. calibration-error scatter
5. Agent benchmark cost vs. performance
6. Score distributions by percentage-based evaluation
7. AA component coverage heatmap
8. Provider coverage by evaluation
9. Cross-benchmark score slope graph
10. Selected source leaderboard
11. Provider share donut
12. Result depth by benchmark
13. Two-model comparison
14. Model-configuration treemap
15. Provider-to-benchmark Sankey
16. AA evidence-coverage funnel
17. Benchmark registry sunburst

Features include benchmark and provider filters, model search, source-level comparison, per-chart SVG export, filtered CSV export, complete JSON export, source links, dark mode and responsive layouts. Typography uses Geist, Newsreader, Noto Sans JP / Noto Serif JP, and Geist Mono.

## Data interpretation

This is a source-backed collection and comparison of third-party results, not a QBench-run evaluation. Benchmarks differ in prompts, harnesses, number of trials, scoring rules and task difficulty. A score from one benchmark must not be treated as directly equivalent to a score from another. Confidence intervals and source notes are retained where published.

## Primary sources

- [Artificial Analysis Intelligence Index v5 announcement](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5)
- [Artificial Analysis Intelligence Index v5 evaluation page](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index)
- [Artificial Analysis Intelligence Index methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)
- [Epoch AI benchmark hub](https://epoch.ai/benchmarks)
- [Epoch AI benchmark data and licensing](https://epoch.ai/benchmarks/use-this-data)
- [FrontierMath program](https://epoch.ai/frontiermath)
- [ARC-AGI-2](https://epoch.ai/benchmarks/arc-agi-2)
- [FrontierMath Erdős](https://epoch.ai/benchmarks/frontiermath-erdos)
- [Mystery Game Puzzles](https://epoch.ai/benchmarks/mystery-game-puzzles)
- [SpireClimb](https://epoch.ai/benchmarks/spireclimb)
- [Earthborne Rangers](https://epoch.ai/benchmarks/ebr-bench)
- [AA-Briefcase v1.1](https://artificialanalysis.ai/evaluations/aa-briefcase)
- [HLE-Diamond](https://labs.scale.com/leaderboard/hle-diamond)
- [Terminal-Bench 4.0](https://www.tbench.ai/?version=4.0)
- [Terminal-Bench-Science](https://vals-ai.com/benchmarks/terminal-bench-science)

## Cloudflare Pages

- Project: `qbench`
- Production URL: https://qbench.pages.dev
- Repository: `nden14800/qbench`
- Production branch: `main`
- Root directory and output directory: repository root
- Build command: none
- Deployments are triggered automatically by pushes to `main`.
