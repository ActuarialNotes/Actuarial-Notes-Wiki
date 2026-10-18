---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:3e5aaab84519b7c8b5ac04df7bdbc9a1882a8ba81e2c85f38f80f8595fc8b02d
  sources:
    - "ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §2.9, §3.2, PDF pp.8-10, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf"
    - "Mahler, An Example of Credibility and Shifting Risk Parameters (PCAS LXXVII, 1990), §4.2 and Table 4, PDF pp.10-12, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf"
    - "Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), conclusions (2)-(3), PDF p.3, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf"
    - "Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), §1-2, Table C, PDF pp.1-3, 7-11, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.3-2.4.3, PDF pp.18-20, 25-26, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Class.md
---

**Rating Class** (rate class) is a group of risks that share the same values of the rating variables used to price them and are charged the same rate, on the premise that their expected loss per exposure is similar. A class is valid when it is internally homogeneous, distinct from the other classes, and large enough for its loss cost to be estimated credibly.

> $$\hat{\mu}_j = Z_j\,\bar{X}_j + (1 - Z_j)\,\bar{X}$$

> $$\chi^2 = \sum_{j=1}^{m} \frac{(O_j - E_j)^2}{E_j}$$

- $\bar X_j$ is class $j$'s observed loss cost or frequency and $\bar X$ the overall (or parent-group) value. $Z_j = n_j/(n_j + k)$ is the [[Bühlmann-Straub Credibility|Bühlmann–Straub]] credibility. In the test, $O_j$ is the claims observed in class $j$ and $E_j$ the claims expected if every class had the overall frequency. If the classes really do not differ, $\chi^2$ is approximately chi-square with $m - 1$ degrees of freedom.
- **Validity.** Actuarially, a class should be [[Homogeneity|homogeneous]] within, separated from the others, [[Credibility|credible]] and stable over time. ASOP No. 12 adds considerations for the characteristics that define classes: a demonstrated relationship to expected outcomes (causality is not required), objectivity, practicality, applicable law, and industry and business practice. See the criteria under [[Classification Ratemaking]], and how a class is tested under [[Rate Class Validity]].
- **[[Statistical Significance|Statistical significance]].** Use a chi-square test on counts; Mahler applied the same test to each risk's results by period to show that risk means shift over time. In a [[Generalized Linear Model|GLM]], use each class coefficient's standard error, [[p-Value|p-value]] and [[Confidence Interval|confidence interval]]. Significance depends on volume: with enough data a trivial difference becomes significant, so significance is necessary but not sufficient.
- **Estimating class loss costs.** Raw class averages over-react, because next period regresses toward the mean. Group averages ignore real differences. Credibility-weighting sits between the two. Couret and Venter extend this to *multi-dimensional* credibility: a workers compensation class's rare serious-injury frequencies are estimated with the help of its correlated, more common injury types. They validated the estimates on a holdout period with a quintiles test.
- **Link to individual risk rating.** [[Experience Rating|Experience rating]] measures how a risk differs from others *in its class*. Bailey and Simon showed that the more refined the classes, the less credibility individual experience deserves.

> [!example]- Are the Class Differences Significant? {Example}
> Three classes: A has $10{,}000$ exposures and $480$ claims, B $6{,}000$ and $330$, C $4{,}000$ and $190$. Test at $5\%$ whether the frequencies differ. Then repeat with four times the data at the same frequencies.
>
> > [!answer]-
> > The overall frequency is $1{,}000/20{,}000 = 0.05$, so the expected counts are $500$, $300$ and $200$.
> >
> > $$
> > \begin{align*}
> > \chi^2 &= \frac{(-20)^2}{500} + \frac{30^2}{300} + \frac{(-10)^2}{200} \\
> > &= 0.8 + 3.0 + 0.5 \\
> > &= 4.3
> > \end{align*}
> > $$
> >
> > With $2$ degrees of freedom the $5\%$ critical value is $5.99$ ($p \approx 0.12$), so these data do not justify separate class rates. The frequencies of $4.8\%$, $5.5\%$ and $4.75\%$ are within noise.
> >
> > Every squared deviation scales by $16$ and every expected count by $4$, so with four times the data $\chi^2 = 4 \times 4.3 = 17.2$ ($p \approx 0.0002$). The *same* differences are now highly significant. Volume, not just the size of the gap, decides whether a class split is statistically supported. Whether the split is *material* is a separate question.

> [!example]- Testing Class Estimates on a Holdout Period {Example}
> Classes in one hazard group are ranked by estimated relativity from the even years and grouped into quintiles. Three estimators are compared on the odd years (the holdout): the group average ($1.00$ everywhere), the raw even-year relativity, and a credibility blend with $Z = 0.60$.
>
> | Quintile | Odd-year actual | Raw even-year |
> |---|---|---|
> | 1 | $0.62$ | $0.35$ |
> | 2 | $0.86$ | $0.70$ |
> | 3 | $1.00$ | $0.98$ |
> | 4 | $1.13$ | $1.30$ |
> | 5 | $1.39$ | $1.67$ |
>
> Which estimator should set the class loss costs?
>
> > [!answer]-
> > The credibility predictions are $1 + 0.6(\text{raw} - 1)$: $0.610$, $0.820$, $0.988$, $1.180$ and $1.402$. The sums of squared errors against the holdout are:
> >
> > $$
> > \begin{align*}
> > \text{SSE}_{\text{group}} &= 0.1444 + 0.0196 + 0 + 0.0169 + 0.1521 \\
> > &= 0.3330 \\[4pt]
> > \text{SSE}_{\text{raw}} &= 0.0729 + 0.0256 + 0.0004 + 0.0289 + 0.0784 \\
> > &= 0.2062 \\[4pt]
> > \text{SSE}_{\text{cred}} &= 0.0045
> > \end{align*}
> > $$
> >
> > The actuals rise across the quintiles, so the classes really do differ, which rules out the flat group average. The raw estimates are too steep, because the holdout regresses toward the mean. The credibility blend fits almost exactly. This is the pattern Couret and Venter found for workers compensation classes.
