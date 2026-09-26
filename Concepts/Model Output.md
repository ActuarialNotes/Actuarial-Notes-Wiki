---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6431b1fc4f44a90b5550d42665acb3085b59637553dfa25dc3c3a7a615872edf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Output.md
---

**Model output** is what fitting software reports about a fitted model: coefficient tables, variance decompositions, fit statistics and, for a simulation model, the simulated distribution itself. Reading it is examined as a skill in its own right. That means knowing what each number means, recovering a missing entry from the others, and judging whether the results are reasonable before relying on them.

> $$t_j = \frac{\hat{\beta}_j}{\mathrm{SE}(\hat{\beta}_j)}$$
>
> $$F = \frac{\text{MS}_{\text{Reg}}}{\text{MS}_{\text{Res}}}$$
>
> $$\mathrm{CV} = \frac{\mathrm{SE}(\text{unpaid})}{\text{Mean}(\text{unpaid})}$$

**Regression and GLM output (MAS-I).**

- The [[Parameter Estimate Tables|parameter estimate table]] gives the estimate, its standard error, the $t$ or $z$ statistic and the [[p-Value|p-value]]. Level estimates are relative to the base level. With a log link, $e^{\hat{\beta}}$ is a multiplicative relativity. When the [[Dispersion Parameter|dispersion]] is estimated, standard errors are scaled by $\sqrt{\hat{\phi}}$.
- The [[ANOVA|ANOVA table]] gives degrees of freedom, sums of squares and mean squares ($\text{SS}/\text{df}$), and $F$. From it, $R^2 = \text{SS}_{\text{Reg}}/\text{SS}_{\text{Tot}}$ ([[R-Squared]]), and the residual standard error is $\sqrt{\text{MS}_{\text{Res}}}$. For a [[Generalized Linear Model|GLM]] the analogue is the null and residual [[Deviance|deviance]] with their df, plus AIC.

**Mixed-model and other output (MAS-II).**

- A [[Linear Mixed Model|mixed model]] prints a fixed-effects table, read like a regression table. It adds the [[Variance Components|variance components]]: the variance and SD of each random effect and of the residual. The [[Intraclass Correlation|ICC]] follows directly from them.
- Fit statistics are $-2$ log-likelihood (REML or ML: check which), [[AIC]] and [[BIC]]. A [[Likelihood Ratio Test|likelihood ratio test]] is the difference in $-2\ell$. Compare [[Restricted Maximum Likelihood|REML]] fits for changes to the random part and ML fits for changes to the fixed part. A test that a single variance component is zero sits on the boundary of its range: the reference distribution is a 50:50 mixture of $\chi^2_0$ and $\chi^2_1$, so halve the $\chi^2_1$ p-value.
- [[Principal Components Analysis|PCA]] output: the loading vectors, each component's SD and [[Proportion of Variance Explained|PVE]]. The [[Scree Plot|scree plot]] is read for its elbow.
- [[Hierarchical Clustering|Clustering]] output: the [[Dendrogram|dendrogram]], where fusion height is dissimilarity and the shape depends on the [[Linkage|linkage]].
- Time-series output: coefficients with standard errors, $\hat{\sigma}^2$ and AIC. Forecast standard errors turn into [[Prediction Interval|prediction intervals]].

**Simulated unpaid-claim distributions (Exam 7).** A [[Stochastic Reserving|stochastic reserving]] model such as the ODP bootstrap reports, by accident year and in total, the mean unpaid, its standard error, CV and percentiles, and the minimum and maximum simulated values. Test that [[Unpaid Claim Distribution|distribution]] for [[Reasonableness Testing|reasonableness]] before using it:

- Standard errors should **rise** from older to more recent accident years, and the total SE should exceed that of any single year.
- CVs should **fall** from older to more recent years, and the total CV should be below that of any single year.
- The CV of the most recent year or two may rise again. Those estimates lean on the largest, least certain development factors, so [[Parameter Risk|parameter uncertainty]] dominates. A large rise suggests the model overstates the uncertainty there, and a [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] or [[Cape Cod Method|Cape Cod]] model for those years is worth testing.
- The mean should sit close to the deterministic [[Chain Ladder Method|chain-ladder]] estimate the model is built on. Implausible minima or maxima point to outliers, negative incremental values or a residual problem.
- Once outcomes are known, check calibration: across many triangles, the percentiles at which actual outcomes land in their predicted distributions should be uniform. Percentiles bunched in both tails mean the distribution is too narrow.

> [!example]- Completing a Regression Output {Example}
> A severity regression on $n = 50$ claims with $3$ predictors has $\text{SS}_{\text{Reg}} = 1{,}200$ and $\text{SS}_{\text{Res}} = 1{,}840$. One coefficient is $0.182$ with standard error $0.046$. Complete the ANOVA table and find $R^2$ and the coefficient's $t$ statistic. If the model had a log link, what would the coefficient mean?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{MS}_{\text{Reg}} &= 1{,}200/3 = 400 \\
> > \text{MS}_{\text{Res}} &= 1{,}840/46 = 40 \\
> > F &= 400/40 = 10.0 \\
> > R^2 &= 1{,}200/3{,}040 = 0.395 \\
> > t &= 0.182/0.046 = 3.96
> > \end{align*}
> > $$
> > The residual standard error is $\sqrt{40} = 6.32$. With $t = 3.96$ on $46$ df, the coefficient is clearly significant. Under a log link, $e^{0.182} = 1.20$: a one-unit increase in that predictor raises expected severity by about $20\%$.

> [!example]- Reading Mixed-Model Output {Example}
> A random-intercept model of loss ratio by agency reports an agency variance of $0.018$ and a residual variance of $0.054$. Refitting without the random intercept raises $-2\ell_R$ from $412.8$ to $425.1$. Find the ICC and test whether the agency effect is needed.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{ICC} &= \frac{0.018}{0.018 + 0.054} = 0.25 \\
> > \text{LRT} &= 425.1 - 412.8 = 12.3
> > \end{align*}
> > $$
> > The null value $\sigma^2_{\text{agency}} = 0$ is on the boundary, so the p-value is half the $\chi^2_1$ tail: $0.5 \times 0.00045 = 0.0002$. **Keep the random intercept.** A quarter of the variation in loss ratios is between agencies. Both fits share their fixed effects, so comparing REML likelihoods is valid.

> [!example]- Reasonableness Checks on a Bootstrap Unpaid Distribution {Example}
> An ODP bootstrap reports, by accident year (in $\$000$):
>
> | AY | Mean unpaid | SE | CV |
> |---|---|---|---|
> | 2017 | $45$ | $40$ | $0.89$ |
> | 2018 | $180$ | $95$ | $0.53$ |
> | 2019 | $520$ | $190$ | $0.37$ |
> | 2020 | $1{,}150$ | $310$ | $0.27$ |
> | 2021 | $2{,}400$ | $520$ | $0.22$ |
> | 2022 | $3{,}900$ | $1{,}400$ | $0.36$ |
> | Total | $8{,}195$ | $1{,}650$ | $0.20$ |
>
> Test the output for reasonableness.
>
> > [!answer]-
> > - **SE by year:** it rises steadily from $40$ to $1{,}400$, and the total ($1{,}650$) exceeds the largest single year. Pass.
> > - **CV by year:** it falls from $0.89$ to $0.22$ through 2021, and the total ($0.20$) is below every single year. Pass.
> > - **2022:** the CV jumps back to $0.36$. Some rise is expected in the latest year, where the largest development factors carry the most parameter uncertainty. But a rise from $0.22$ to $0.36$ is large, and 2022 alone carries most of the total's uncertainty (SE $1{,}400$ of $1{,}650$).
> >
> > Before accepting the distribution, look at what drives the 2022 projection: a single observed value multiplied by every development factor, the largest of which is the least stable. Then compare with a Bornhuetter-Ferguson or Cape Cod estimate for 2022, which leans less on that one value.
