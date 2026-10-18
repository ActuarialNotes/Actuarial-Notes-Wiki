---
target: Concepts/Time Series Decomposition.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: 1150-1000 = +150, 1150/1000 = 1.15 (agree). Centred quarterly MA weights match fpp3 §3.3 exactly; seasonal estimation and re-centring per §3.4 (multiplicative indexes sum to m, i.e. average 1); end loss of m/2 observations per §3.4; log equivalence per §3.2; seasonal adjustment per §3.2. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §3.2 components, additive/multiplicative and log equivalence; §3.3 2x4-MA weights [1/8,1/4,1/4,1/4,1/8]; §3.4 classical decomposition (seasonal averaged per season and adjusted to add to zero / m; no trend estimate for the first and last m/2 observations); seasonally adjusted series, read 2026-10-18, sha256:c11e3a143a4e52c5365ce641b76b17dd41e682b285de613906a5a661dab3e00f — https://otexts.com/fpp3/decomposition.html
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
