---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:1d7af73d56e9a995cf24a309039f28ff049883b1cf78a2bdf0eaa8974350c76d
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.5.1.3 (temporal variable as a control, PDF p.56); sec.2.6 and sec.9.2 (separately priced territory/class as an offset, PDF pp.27, 100); sec.2.9 (GLM separates each variable's effect from correlated ones, PDF p.37)"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), task C6, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Control Variable.md
---

A **Control Variable** is a predictor included in an insurance [[Generalized Linear Model]] to account for a real, known effect on the response — preventing that effect from being incorrectly absorbed into the coefficients of the rating variables — even though the control variable itself will not be used to set the final rate.

> $$\hat{\beta}_{\text{rating}}\big|_{\text{control omitted}} \;\neq\; \hat{\beta}_{\text{rating}}\big|_{\text{control included}} \quad \text{if the rating and control variables are correlated}$$

- The common control variable in ratemaking is a temporal variable such as accident year or calendar year, which picks up trend, loss development and rate changes the target has not been adjusted for
- A territory or class that is priced separately outside the model is **not** a control variable: it enters as an [[Offset Variable|offset]], with its coefficient fixed, so the other variables are fitted in its presence
- Omitting a relevant control variable causes **omitted variable bias**: correlated rating variables' coefficients absorb some of the missing variable's true effect, distorting the indicated rate relativities
- A control variable's coefficient is **estimated from the data**, unlike an **[[Offset Variable]]**, whose coefficient is fixed at $1$

![[Media/Figures/Control_Variable.svg|340]]

> [!example]- Including a Control Variable to Avoid Bias {Example}
> An actuary fits a Poisson frequency GLM with vehicle age as the only rating variable. Calendar year is known to affect frequency (due to changing claim-reporting patterns) and is correlated with the vehicle-age mix of the book, but calendar year will not be used to set rates. Should calendar year be included in the model?
>
> > [!answer]-
> > Yes — calendar year should be included as a **control variable**. Because it is correlated with vehicle age and has a real effect on frequency, omitting it would let part of the calendar-year effect leak into the vehicle-age coefficient, biasing the indicated vehicle-age relativities. Including it (without using its coefficient for rating) isolates the true vehicle-age effect.
