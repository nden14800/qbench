# QBench

Evidence-first AI model and benchmark explorer.

- Live site: https://qbench.pages.dev/
- Repository: https://github.com/nden14800/qbench
- Deployment: Cloudflare Pages, production branch \`main\`
- Data audit: 2026-11-11
- Current composite: **QBench Index 2.0**

## QBench Index 2.0

Index 2.0 uses weighted midrank percentiles within each eligible evaluation, then applies an explicit neutral-evidence prior to prevent sparse cohort-relative results from reading like absolute capability percentages. Publisher raw results, native units, evaluation versions, harnesses and sources remain unchanged and visible.

```
EvaluationPercentile = 100 × (weight_below + 0.5 × weight_tied) / total_reference_weight
FamilyScore = mean(available evaluation percentiles in that family)
RawComposite = mean(observed family scores)\nIndex = (RawComposite × observed_families + 50 × total_families) / (observed_families + total_families)
```

Each base model contributes total reference weight 1 within an evaluation across its distinct effort variants. Ties receive the same midrank percentile. Metrics are ordered in their declared direction; existing Index-compatible score records retain the higher-is-better convention unless a benchmark explicitly declares a lower-is-better direction.

A model/effort variant must have at least four eligible evaluations across at least three capability families to be ranked. Each included evaluation must have at least 12 distinct model/effort variants after condition and duplicate checks. Families are equally weighted when observed. Missing families remain unobserved in the raw composite. The final displayed Index combines that raw composite with one neutral 50th-percentile prior equivalent to a complete family suite; coverage is displayed separately. This is a QBench-relative evidence-adjusted score, not an absolute percentage and not comparable to Artificial Analysis's Index.

**Interpretation:** Index 2.0 is a cohort-relative percentile composite, not an absolute capability percentage, probability, or Artificial Analysis score. Scores can move when the evaluated cohort changes. It is designed for current model comparisons; historical trend analysis requires a separately calibrated, task-level longitudinal model such as IRT and is not claimed by this release.


## Model catalog and lifecycle

The catalog includes distinct benchmark-reported names plus current official provider models. On 2026-11-11 it contains 847 catalog entries. Official API IDs and specifications are populated only when confirmed by primary provider documentation; benchmark-only identities remain explicitly source-reported and unknown metadata stays null. A benchmark result is not proof that a model has a public API.

The latest official-source audit covers OpenAI, Anthropic, Google, xAI, DeepSeek, Alibaba/Qwen, Mistral, Meta, Kimi and MiniMax. New verified entries include Qwen4 Max Preview, Qwen3.7 Plus and GPT-6 Sol. Qwen4 Max Preview is a temporary Token Plan-only preview, scheduled to end on 2026-11-25; it has no per-token API price in the catalog. Retired models remain visible with their retirement dates rather than being deleted.

## Benchmark data refresh — 2026-11-11

The dataset contains 147 benchmark and model-card result collections. CyberBench v1.1 was refreshed to its complete 48-row 2026-11-05 publisher table; two special-access configurations remain visible but are excluded from the Index. The current Index calculation uses only complete, condition-compatible publisher evaluations that pass the quality gate.

- Terminal-Bench 4.0 — 63 models; 66 tasks; Mini-SWE-agent; avg@3 across three runs.
- Terminal-Bench-Science 0.1 — 45 publisher rows; 70 tasks; harness retained per row; only Mini-SWE-agent rows enter the current Index.
- ProgramBench — 66 models; strict fully-resolved metric; 200 public tasks.
- Code Migration v1.1 — 30 models; Pi agent harness.
- BioMysteryBench — 31 models.
- Finance Agent v2.1 — retained for reference, but excluded from Index because the visible Accuracy metric differs from the methodology's primary Partial Credit metric.
- Legal Research Bench — 90 rows.
- Tax Agent Bench — 84 rows.
- Excel Modeling Benchmark v1.1 — 41 rows.
- HLAB-Vals-1.1 — 37 rows.
- SWE-bench Multimodal — 22 rows.
- HLE-Diamond — 20 entries from Scale AI's Performance Comparison; retrieval date is not represented as an evaluation date.
- MCP Atlas — 37 entries from Scale AI's Performance Comparison; 1,000-task pass rate. The publisher footer's methodology date is distinct from the captured score snapshot date.

## New independent evaluations — 2026-11-11

- Artificial Analysis Multimodal Knowledge Agent (MKA): 200 private tasks across 10 verticals; 21 models on the publisher page. Three headline Climb WSR scores are captured; the leaderboard extraction is partial and is not Index-eligible.
- Artificial Analysis Decision Index v2: separate calibrated Decision Score metric. Five headline scores from the launch article are captured; this is not an accuracy leaderboard and is not Index-eligible.

## Current Index coverage

The last documented data audit (2026-11-11) used 17 eligible evaluations across 8 capability families, 232 model/effort variants, and 70 ranked variants. This count must be revalidated against the live dataset before being treated as current. A ranked variant needs at least 4 evaluations across at least 3 families. Partial AA-Briefcase results, the GDP.pdf secondary partial mirror, and Finance Agent v2.1's mismatched metric are not included. Index 2.0 recomputes the ranking at runtime; the old Index 1.9 median, leader score and ranked-count figures are not comparable and are intentionally not carried forward.

## Data integrity rules

- Keep raw scores, metric names, units, harnesses, configuration, effort, provider-reported names, source URLs, and publisher snapshot dates.
- Do not merge results from different harnesses, benchmark versions, or metric definitions.
- Do not turn a retrieval date into a benchmark evaluation date.
- Do not replace missing data with guesses or provider-wide defaults.
- Do not treat a partial leaderboard or secondary mirror as a complete comparison cohort.
- Do not infer API model IDs from display names.
- Do not flatten region/tier/cached-token pricing into a single price.
- Keep publisher-reported zero scores.
- Keep benchmark-only models in the catalog with unverified metadata clearly marked.
- Missing benchmark observations stay missing; the Index's family baseline is a transparent composite rule, not fabricated raw data.

## Sources

- OpenAI models, GPT-6 Sol, lifecycle and pricing: https://developers.openai.com/api/docs/models and https://developers.openai.com/api/docs/models/gpt-6-sol and https://developers.openai.com/api/docs/pricing
- Google Gemini model cards and lifecycle: https://deepmind.google/models/model-cards/ and https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions
- Anthropic Claude Fable/Mythos 5.2 and lifecycle: https://platform.claude.com/docs/en/models/fable-5-2/overview and https://platform.claude.com/docs/en/models/mythos-5-2/overview
- Meta Muse Wonder launch: https://about.fb.com/news/2026/10/introducing-muse-wonder-models/
- Kimi K3.1 Pro API guide: https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart
- Mistral Large 4: https://docs.mistral.ai/models/mistral-large-4-0
- DeepSeek model list/pricing: https://api-docs.deepseek.com/api/list-models/ and https://api-docs.deepseek.com/quick_start/pricing/
- xAI Grok 4.7: https://docs.x.ai/developers/models/grok-4.7
- Alibaba Qwen4 Max Preview, model list and pricing: https://help.aliyun.com/zh/model-studio/qwen4-max-preview and https://help.aliyun.com/en/model-studio/models and https://help.aliyun.com/en/model-studio/model-pricing
- MiniMax M3.1 Flash (Alibaba Cloud Model Studio): https://help.aliyun.com/en/model-studio/minimax-m3-1-flash
- Vals AI leaderboards: https://www.vals.ai/benchmarks
- Scale AI HLE-Diamond: https://labs.scale.com/leaderboard/hle-diamond
- Artificial Analysis methodology v5.0.1: https://artificialanalysis.ai/methodology/intelligence-benchmarking
- Artificial Analysis Progress Index IRT methodology: https://artificialanalysis.ai/methodology/progress-index

## Technical

The site is a static HTML application. Benchmark data is loaded from \`data/external-benchmarks.json\`; charts use the vendored ECharts build. Production deploys from \`main\` through Cloudflare Pages.
