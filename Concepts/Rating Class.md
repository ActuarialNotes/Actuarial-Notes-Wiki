---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:925f6454487ef8cfee474c779d88ed69366254251b2c2ed85f86d704145b86a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Class.md
---

**Rating Class** (rate class) is a group of risks that share the same values of the rating variables used to price them and are charged the same rate, on the premise that their expected loss per exposure is similar. A class is valid when it is internally homogeneous, distinct from the other classes, and large enough for its loss cost to be estimated credibly.

> $$\hat{\mu}_j = Z_j\,\bar{X}_j + (1 - Z_j)\,\bar{X}$$

> $$\chi^2 = \sum_{j=1}^{m} \frac{(O_j - E_j)^2}{E_j}$$

- $\bar X_j$ is class $j$'s observed loss cost or frequency and $\bar X$ the overall (or parent-group) value. $Z_j = n_j/(n_j + k)$ is the [[Bühlmann-Straub Credibility|Bühlmann–Straub]] credibility. In the test, $O_j$ is the claims observed in class $j$ and $E_j$ the claims expected if every class had the overall frequency. If the classes really do not differ, $\chi^2$ is approximately chi-square with $m - 1$ degrees of freedom.
- **Validity.** Actuarially, a class should be [[Homogeneity|homogeneous]] within, separated from the others, [[Credibility|credible]] and stable over time. ASOP No. 12 adds considerations for the characteristics that define classes: a demonstrated relationship to expected outcomes (causality is not required), objectivity, practicality, applicable law, and industry and business practice. See the criteria under [[Classification Ratemaking]].
- **[[Statistical Significance|Statistical significance]].** Use a chi-square test on counts; Mahler used chi-square tests to show that risks' results differ and that their means shift over time. In a [[Generalized Linear Model|GLM]], use each class coefficient's standard error, [[p-Value|p-value]] and [[Confidence Interval|confidence interval]]. Significance depends on volume: with enough data a trivial difference becomes significant, so significance is necessary but not sufficient.
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
