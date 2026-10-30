# QBench

**Independent model evaluation, built around traceable evidence.**

QBench is an original, early-stage model-evaluation dashboard. It takes visual and interaction inspiration from the information density and chart-led exploration patterns of Artificial Analysis, while maintaining its own identity, data model and evaluation methodology.

- Repository: https://github.com/nden14800/qbench
- Live data file: `data/results.json`
- Entry point: `index.html`

## Current status

This repository is the foundation of the project, not a published benchmark leaderboard.

- No Artificial Analysis scores, rankings, datasets, or benchmark results are included.
- No invented model scores or sample records are included.
- The initial dataset is intentionally empty.
- No universal composite score or weighting system has been defined.
- Imported records remain unreviewed unless explicitly marked otherwise in the source dataset and verified through a documented process.

## Design and implementation

- Self-contained `index.html` with inline CSS and JavaScript; no build step.
- Custom select controls using the `tenmei-choice` structure and keyboard/accessibility behavior established in the current tenmei-mori site.
- Input styling follows the same restrained surface, border, focus and spacing language used by tenmei-mori controls.
- Bootstrap Icons 1.13.1 and Google Fonts (DM Sans / IBM Plex Mono).
- Original QBench SVG favicon and wordmark.
- Responsive layout, light/dark theme, searchable results table, filters, chart-type switching, JSON import and export.
- Task library with 12 original Japanese-first prompts, task-specific criteria, and a shared 0–4 scoring anchor.
- Charts are drawn with native SVG; no charting dependency is required for the foundation.

The UI references Artificial Analysis as a design benchmark only. QBench does not copy its brand, data, scoring system, methodology or results.

## Data format

The results explorer reads `data/results.json`. Original task definitions are stored separately in `data/benchmark-suite.json`; task definitions are not model results.

The results file starts as:

```json
{
  "schemaVersion": "0.1",
  "records": []
}
```

Each observation must include:

| Field | Meaning |
| --- | --- |
| `model` | Exact model name / evaluated configuration |
| `provider` | Model provider |
| `evaluation` | Evaluation name |
| `evaluationVersion` | Evaluation version |
| `metric` | Native metric name |
| `unit` | Native measurement unit |
| `score` | Finite numeric result |
| `direction` | `higher` or `lower` |
| `date` | Run or publication date, `YYYY-MM-DD` |
| `source` | Direct source URL |
| `configuration` | Relevant run settings / configuration identifier |
| `review` | `unreviewed`, `verified`, or `disputed` |

Optional source-reported fields: `sampleSize`, `ciLow`, `ciHigh`, `latencyMs`.

## Comparability rules

QBench groups observations by evaluation name, evaluation version, metric, unit, direction and configuration. It does not silently combine incompatible cohorts or convert different metrics into a universal score.

A composite index may be considered only after the benchmark suite, aggregation, weighting, missing-data policy, uncertainty treatment and sensitivity analysis have been documented and checked.

## Run locally

Open `index.html` through a static web server so the browser can load `data/results.json`. For example:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

No package installation or build process is required.

## References

- Artificial Analysis — [Intelligence Index v5 announcement](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5)
- Artificial Analysis — [Intelligence benchmarking methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking)
- tenmei-mori — [source repository](https://github.com/nden14800/tenmei-mori)

These references inform interface and research practices only. QBench's scores and evaluation methodology are independent.


## QBench Core JP v0.1.0

The first task bank is a Japanese-first general-purpose draft containing 12 original tasks across instruction following, reasoning, quantitative work, summarization, coding, debugging, factual calibration, structured extraction, translation, planning, safety judgment, and multi-step planning.

Each task has three task-specific criteria. Each criterion is scored independently from 0 to 4 using the shared anchors in the suite file. Keep criterion-level scores and evaluator notes; do not collapse them into a cross-task model score until aggregation, weighting, missing-data treatment, and uncertainty have been specified and tested.

Execution defaults are three repetitions, fresh context per task, randomized model order, and explicit recording of sampling/tool settings.

Task definitions are not model evaluation results. `data/results.json` remains empty until model responses have actually been collected and reviewed. No third-party benchmark scores are imported.


## External benchmark snapshots

The application includes a separate external evidence view backed by `data/external-benchmarks.json`. This file is deliberately separate from `data/results.json` and the QBench Core JP task bank.

Included snapshots:
- LiveBench 2.0 (2026-10-25)
- GPQA Diamond via OpenRouter (2026-10-30)
- SWE-bench Verified snapshot tracked by evals.report (2026-09-24)

The External Reference Index is a descriptive, equal-weight average of within-cohort percentile ranks from LiveBench 2.0 Overall and GPQA Diamond. It is calculated only for exact model-name matches in the six-model intersection. Ties use average rank. It is not a universal model score and must not be presented as a QBench-native result. SWE-bench Verified remains a separate coding-specialist reference because its model coverage does not match the two-source cohort.

No Artificial Analysis or AA Intelligence Index scores are included. Source values, snapshot dates, URLs, and status labels are retained in the external data file.
