# QBench Index 2.0

**Independent frontier benchmark intelligence, aligned to Artificial Analysis Intelligence Index v5.**

- Production: https://qbench.pages.dev
- Repository: https://github.com/nden14800/qbench
- Latest source snapshot: 2026-10-31

## QBench Original Index 2.0 — existing score retained

QBench keeps its original scored index instead of replacing it with Artificial Analysis. The existing score formula and eligible cohort are preserved:

| Domain | Weight | Input |
|---|---:|---|
| Coding & Agentic | 25% | LiveBench 2.0 |
| Scientific Reasoning | 25% | GPQA Diamond |
| Mathematics & Proof | 25% | Mean of FrontierMath family and ProofBench |
| Practical Execution | 25% | Furniture Assembly Benchmark |

The FrontierMath family is the arithmetic mean of FrontierMath Tiers 1–3 v2 and FrontierMath Tier 4 v2. Within Mathematics & Proof, FrontierMath family and ProofBench each contribute 12.5% of the total index. The overall index is the arithmetic mean of the four domain scores. Eligibility requires an exact model-name intersection across all six underlying source tables. Missing values are not imputed and aliases are not inferred. The historical Original Index remains separately visible in the leaderboard.

## QBench Expanded Index — AA v5 + QBench frontier extensions

The expanded evaluation set contains all nine evaluations used by Artificial Analysis Intelligence Index v5, with the official component weights and four 25%-weighted domains:

| Category | Evaluation | Total Index weight |
|---|---|---:|
| Knowledge Work | AA-Briefcase v1.1 | 15% |
| Knowledge Work | AutomationBench-AA | 5% |
| Knowledge Work | GDP.pdf | 5% |
| Coding | FrontierCode 2.0 | 15% |
| Coding | Terminal-Bench 4.0 | 10% |
| Science | Terminal-Bench-Science 0.1 | 15% |
| Science | CritPt v2 (Hard Subset) | 10% |
| General | AA-Omniscience v1.1 | 15% |
| General | HLE-Diamond | 10% |

QBench then adds independent evaluations that are not part of AA v5:

- **FrontierMath Erdős** — 68 research-level Erdős problems with Lean proof verification. Epoch AI's official benchmark page reports a highest score of 3% in its current public snapshot; the QBench data snapshot includes the published 2.9% rows. This remains a low-scoring, research-mathematics stress test.
- **Mystery Game Puzzles** — 100 game-state puzzles with the game identity hidden to reduce benchmark-specific preparation. Epoch AI reports a top score of 84% across 140 tested models.
- **SpireClimb** — maximum-difficulty, long-horizon computer-use gameplay across Slay the Spire 1 and 2. Epoch AI reports a current top score of 26%; QBench is tracking it pending a comparable model-level result import.
- **FrontierMath: Open Problems** — research-level open problems with programmatically verified solutions. Solved items are removed to limit contamination; this remains a research watchlist because comparable model-level results are not yet imported.

The expanded index is **not assigned a fabricated total score**. AA v5 includes private/held-out data and some components do not have public model-level leaderboards. QBench shows the official AA methodology and source-backed rows separately from the additional frontier tests. A scored Expanded Index requires a published normalization/weighting protocol and complete model/configuration-matched coverage for every included component. The Original Index score remains available while that expanded coverage is built.

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
