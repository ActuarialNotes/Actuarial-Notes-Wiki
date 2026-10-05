---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:589495aeb9ffb5d560f1d1948fe85320b2aa007dfecc29ecf4d9fcb5728afa4a
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.5.1.3 (temporal variable as a control, PDF p.56); sec.2.6 and sec.9.2 (separately priced territory/class as an offset, PDF pp.27, 100); sec.2.9 (GLM separates each variable's effect from correlated ones, PDF p.37)"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), task C6, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Control Variable.md
---

A **Control Variable** is a predictor included in an insurance [[Generalized Linear Model]] to account for a real, known effect on the response — preventing that effect from being incorrectly absorbed into the coefficients of the rating variables — even though the control variable itself will not be used to set the final rate.

> $$\hat{\beta}_{\text{rating}}\big|_{\text{control omitted}} \;\neq\; \hat{\beta}_{\text{rating}}\big|_{\text{control included}} \quad \text{if the rating and control variables are correlated}$$

- Common control variables in ratemaking include accident year or calendar year (to absorb trend) and a territory or class variable that is priced separately outside the model
- Omitting a relevant control variable causes **omitted variable bias**: correlated rating variables' coefficients absorb some of the missing variable's true effect, distorting the indicated rate relativities
- A control variable's coefficient is **estimated from the data**, unlike an **[[Offset Variable]]**, whose coefficient is fixed at $1$
- Control variables are still checked for statistical significance and reasonableness in the [[Parameter Estimate Tables|parameter estimate table]], even though they will not appear in the final rating plan

![[Media/Figures/Control_Variable.svg|340]]

> [!example]- Including a Control Variable to Avoid Bias {Example}
> An actuary fits a Poisson frequency GLM with vehicle age as the only rating variable. Calendar year is known to affect frequency (due to changing claim-reporting patterns) and is correlated with the vehicle-age mix of the book, but calendar year will not be used to set rates. Should calendar year be included in the model?
>
> > [!answer]-
> > Yes — calendar year should be included as a **control variable**. Because it is correlated with vehicle age and has a real effect on frequency, omitting it would let part of the calendar-year effect leak into the vehicle-age coefficient, biasing the indicated vehicle-age relativities. Including it (without using its coefficient for rating) isolates the true vehicle-age effect.
