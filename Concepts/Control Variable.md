---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:749c0a8e823912cf7bf2608e42e818a38321a1ab14924ebd1fba68e1998b728c
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.6 (PDF p.27), sec.2.9 (PDF p.37), sec.5.1.3 (PDF p.56), sec.9.2 (PDF p.100), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 6 (PDF p.5), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Control Variable.md
---

![[Media/Figures/Control_Variable.svg|340]]

A **Control Variable** is a [[Predictor Variable|predictor variable]] included in a [[Generalized Linear Model]] so that the other predictors' coefficients are estimated net of its effect, but that is not used in the rating plan. A variable is included as a control variable when

1. it has a real effect on the response,
2. it is correlated with the [[Rating Variable|rating variables]],
3. it will not be used to set rates.

The coefficients of a control variable are estimated from the data like any other predictor's. When the relativities are extracted, the control variable is dropped, or the rates are set at one chosen level of it. The most common control variable in ratemaking is a time variable, such as accident year or calendar year, which picks up trend and other changes over time.

> [!example]- A frequency GLM uses vehicle age as a rating variable. Reported frequency has changed from year to year, and the vehicle-age mix of the book has shifted over the same years. Calendar year will not be used in the rates. Should calendar year be in the model? {Example}
> - Calendar year has a real effect on frequency.
> - Calendar year is correlated with vehicle age through the shift in the mix of the book.
> - Without calendar year, part of its effect would be absorbed by the vehicle-age coefficients, and the vehicle-age relativities would be biased.
> - Calendar year should be included as a control variable and left out of the rates.

## Omitted variable bias

When a variable that affects the response and is correlated with an included predictor is left out of the model, the included predictor's coefficients absorb part of the omitted variable's effect. This is omitted variable bias. A model without the control variable has fewer parameters, but fewer parameters do not justify a model whose coefficients for the rating variables are biased. The choice between the two models weighs bias and fit, not the number of parameters alone.

## Control variables and offsets

A control variable and an [[Offset Variable|offset]] both enter the linear predictor without being rating variables, but their coefficients are treated differently:

| | Control variable | Offset |
| --- | --- | --- |
| Coefficient | Estimated from the data | Fixed at 1 |
| Purpose | Remove an effect from the other coefficients | Impose a known effect, such as exposure |
| In the rates | Dropped, or fixed at one level | Used at its known value |
