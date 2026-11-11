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

### Partial-source exclusions

- AA-Briefcase v1.1: 28 of 245 models published in a partial top-10 snapshot. Excluded from Index calculations until a complete official leaderboard is available.
- GDP.pdf: 15 of 56 configurations imported from a secondary mirror. Excluded from Index calculations until a complete primary-source dataset is available.

Both remain in the benchmark data as separately identified source records; neither contributes to QBench Index 1.8.

## Model catalog and identity

The catalog now includes every distinct model name found in benchmark result tables, not just the small set with complete API documentation. The catalog distinguishes:

- **Verified:** model identity and available metadata are supported by official provider documentation.
- **Source-reported:** a benchmark publisher reports the model name/provider, but official API ID or specifications have not been verified.
- **Unresolved:** a result name exists but provider/model identity is not sufficiently established.

Unknown API IDs, context windows, output limits, release dates, pricing, and modalities remain null. A benchmark result is not treated as proof that a model has a public API. Historical models are retained rather than silently deleted; lifecycle is only changed when supported by an official source.

New official model records added in this audit include Kimi K3.1 Pro and Highspeed, Muse Wonder and Wonder Full, Gemini Omni 1.2 Flash, and GPT-6 Rosalind.

## Benchmark data refresh — 2026-11-11

The following complete publisher tables were refreshed from their current 2026-11-09 pages:

- Terminal-Bench 4.0 — 63 models; 66 tasks; Mini-SWE-agent; avg@3 across three runs.
- Terminal-Bench-Science 0.1 — 45 rows; 70 tasks; harness kept per row, including the one Terminus 2 run.
- ProgramBench — 66 models; strict fully-resolved metric; 200 public tasks.
- Code Migration v1.1 — 30 models; Pi agent harness.
- BioMysteryBench — 31 models; publisher-reported accuracy.
- Finance Agent v2.1 — 39 models; the displayed Accuracy leaderboard metric is retained separately from the methodology's primary Partial Credit metric.
- Legal Research Bench — full 90-row table synchronized to the 2026-11-09 publisher update.
- HLE-Diamond — 20 entries from the current Scale AI Performance Comparison. The publisher does not display an explicit update date on that page, so 2026-11-11 is the retrieval date, not a claimed evaluation date.

Other benchmarks retain their actual publisher snapshot dates. A later audit/check date does not rewrite an older evaluation date. In particular, MCP Atlas retains its 2026-04-08 result snapshot unless the publisher publishes a new evaluation.

## Data integrity rules

- Keep raw scores, metric names, units, harnesses, configuration, effort, provider-reported names, source URLs, and publisher snapshot dates.
- Do not merge results from different harnesses, benchmark versions, or metric definitions.
- Do not turn a retrieval date into a benchmark evaluation date.
- Do not replace missing data with guesses or provider-wide defaults.
- Do not treat a partial leaderboard or a secondary mirror as a complete comparison cohort.
- Do not infer API model IDs from display names.
- Do not flatten region/tier/cached-token pricing into a single price.
- Keep zero scores when the publisher reports zero; never remove them to improve rankings.
- Keep benchmark-only models in the catalog with unverified metadata clearly marked.

## Sources

Primary sources used for this update:

- OpenAI model list: https://developers.openai.com/api/docs/models
- OpenAI pricing: https://developers.openai.com/api/docs/pricing
- OpenAI model release notes: https://help-lb.openai.com/en/articles/9624314-model-release-notes
- Google Gemini model lifecycle: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions
- Meta Muse Wonder launch: https://about.fb.com/news/2026/10/introducing-muse-wonder-models/
- Kimi K3.1 Pro API guide: https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart
- Kimi model pricing: https://platform.kimi.ai/docs/pricing/chat
- Vals AI benchmark leaderboards: https://www.vals.ai/benchmarks
- Scale AI HLE-Diamond: https://labs.scale.com/leaderboard/hle-diamond
- Artificial Analysis methodology: https://artificialanalysis.ai/methodology/intelligence-benchmarking

## Technical

The site is a static HTML application. Benchmark data is loaded from `data/external-benchmarks.json`; charts use the vendored ECharts build. Production is deployed through Cloudflare Pages from `main`.
