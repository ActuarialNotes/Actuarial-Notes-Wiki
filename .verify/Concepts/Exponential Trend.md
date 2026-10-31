---
target: Concepts/Exponential Trend.md
created: 2026-10-31
---

## [F-001] Exponential model called 'the standard model' — Werner names linear and exponential as the two most common
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- severity: minor
- status: open
- locus: definition, line 14
- claim: Page: the exponential trend 'is the standard model for loss, premium and exposure trend.'
- evidence: Werner & Modlin Ch. 6 p. 110 (PDF p. 122): 'Linear and exponential regression models are the most common methods used to measure the trend in the data ... Both types of models may be appropriate when measuring increasing trends.' Ch. 5 p. 84 (PDF p. 96) on premium trend: 'Sometimes the actuary fits an exponential or linear trend to the data ... curve-fitting is usually not necessary.' Nothing in Ch. 4-6 calls the exponential model the standard for premium or exposure trend.
- source_rank: 2
- proposed_action: Restate as one of the two most common models (Werner), preferred for decreasing series because a linear fit eventually projects negative values; drop 'the standard model' for premium and exposure trend.
- applied: false
- fingerprint: 1b3e392122ad

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/275d
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both worked examples before reading their answers (logs, Σt·ln y = 0.46538 with 5-dp logs, b = 0.04654, T = 4.76%, 1.048^2.5 = 1.12435, $13,267.38 → $13,268; end-point 4.752%; quarterly Σ(t−t̄)ln y = −0.130662, b = −0.0074664, annual −2.942%, 0.971×1.048 = 1.017608, ^4.5 = 1.08171); formulas against Werner's exponential fit and trend-factor text; trend-period convention (average accident date 7/1 to 12/31 of the year after the effective year) against Werner p. 113; fit windows 20/16/12/8/6/4 against Table 6.14; R² as the most common diagnostic; catastrophe/rolling-year and benefit-change bullets against p. 112; wiki-links and math delimiters
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 110-116 (PDF pp. 122-128: linear vs exponential, Table 6.14 windows, R², pure premium trend combination, catastrophes/rolling years fn. 22, benefit changes, trend period 4.5 years); Ch. 5 p. 84 (PDF p. 96), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Formulas and both examples check; one minor overstatement ('the standard model') left open for an editor.
