# QBench

Evidence-first AI model and benchmark explorer.

- Live site: https://qbench.pages.dev/
- Repository: https://github.com/nden14800/qbench
- Deployment: Cloudflare Pages, production branch `main`
- Data audit: 2026-11-11
- Current composite: **QBench Index 1.8**

## QBench Index 1.8

QBench Index 1.8 standardizes each eligible publisher score within its own evaluation using a model-weighted z-score, then averages benchmark scores within capability families and weights observed families equally.

```
T = clamp(50 + 10 × (score − weighted_mean) / weighted_SD, 0, 100)
Index = mean(observed capability-family means)
```

Each base model has total weight 1 across its distinct reasoning-effort variants. Missing families are not imputed. A model/effort variant must have at least four eligible evaluations across at least three capability families to be ranked. Each included evaluation must have at least 12 distinct model/effort variants.

**Interpretation:** 50 is the model-weighted mean of the evaluated cohort for an evaluation. The Index is relative to the models and evidence available in the current dataset; it is not an absolute capability percentage, probability, or Artificial Analysis score. Raw publisher scores remain intact and are displayed separately.

## Model catalog and lifecycle

The catalog includes every distinct model name found in benchmark result tables, plus current official provider catalog entries. On 2026-11-11 it contains 839 catalog entries: 49 official-source verified identities and 790 benchmark-source-only identities whose API IDs/specs remain unverified. It distinguishes verified official model identities from source-reported benchmark-only names and unresolved identities. Unknown API IDs, context windows, output limits, release dates, pricing, and modalities remain null. A benchmark result is not proof that a model has a public API.

The 2026-11-11 official-source audit added/promoted current models across Google Gemini, OpenAI GPT, Anthropic Claude, Mistral, DeepSeek, xAI Grok, Alibaba Qwen, MiniMax, Kimi, and Meta Muse. Google lifecycle data now explicitly marks Gemini 2.5 Pro/Flash/Flash Lite as retired (2026-10-20), and Gemini 3.6 Flash as scheduled for retirement (2026-11-19). Keep retired models visible with their retirement dates rather than deleting history.

## Benchmark data refresh — 2026-11-11

Complete publisher tables refreshed from their 2026-11-09 pages:

- Terminal-Bench 4.0 — 63 models; 66 tasks; Mini-SWE-agent; avg@3 across three runs.
- Terminal-Bench-Science 0.1 — 45 rows; 70 tasks; harness retained per row.
- ProgramBench — 66 models; strict fully-resolved metric; 200 public tasks.
- Code Migration v1.1 — 30 models; Pi agent harness.
- BioMysteryBench — 31 models.
- Finance Agent v2.1 — 39 models refreshed for standalone reference, but excluded from Index because the leaderboard's displayed Accuracy differs from the methodology's primary Partial Credit metric.
- Legal Research Bench — 90 rows.
- Tax Agent Bench — 84 rows.
- Excel Modeling Benchmark v1.1 — 41 rows.
- HLAB-Vals-1.1 — 37 rows.
- SWE-bench Multimodal — 22 rows.
- HLE-Diamond — 20 entries from Scale AI's current Performance Comparison. The publisher does not display an explicit update date, so 2026-11-11 is the retrieval date, not a claimed evaluation date.

## Current Index coverage

The current 1.8 calculation uses 17 eligible evaluations across 8 capability families, 225 model/effort variants, and 72 ranked variants. A ranked variant needs at least 4 evaluations across at least 3 families. Finance Agent v2.1, AA-Briefcase partial results, and the GDP.pdf secondary partial mirror are not included in the composite.

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

## Sources

- OpenAI models and pricing: https://developers.openai.com/api/docs/models and https://developers.openai.com/api/docs/pricing
- Google Gemini model lifecycle: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions
- Meta Muse Wonder launch: https://about.fb.com/news/2026/10/introducing-muse-wonder-models/
- Kimi K3.1 Pro API guide: https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart
- Mistral Large 4: https://docs.mistral.ai/models/mistral-large-4-0
- DeepSeek model list/pricing: https://api-docs.deepseek.com/api/list-models/ and https://api-docs.deepseek.com/quick_start/pricing/
- xAI Grok 4.7: https://docs.x.ai/developers/models/grok-4.7
- Alibaba Qwen 3.8 Max: https://help.aliyun.com/en/model-studio/qwen3-8-max
- MiniMax M3.1 Flash (Alibaba Cloud Model Studio): https://help.aliyun.com/en/model-studio/minimax-m3-1-flash
- Vals AI leaderboards: https://www.vals.ai/benchmarks
- Scale AI HLE-Diamond: https://labs.scale.com/leaderboard/hle-diamond
- Artificial Analysis methodology: https://artificialanalysis.ai/methodology/intelligence-benchmarking

## Technical

The site is a static HTML application. Benchmark data is loaded from `data/external-benchmarks.json`; charts use the vendored ECharts build. Production deploys from `main` through Cloudflare Pages.
