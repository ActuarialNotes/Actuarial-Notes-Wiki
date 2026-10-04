---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:4b7f6128d5ecbef8cc54ebdbeb1d3262ef605b9dbcb54d5f3405c200baaaa4ee
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (p.7), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain B tasks 3-4 (interpret LMM output; LMM diagnostics and summary statistics, p.2), Domain C tasks 6 and 8 (PCA and clustering outputs, p.3), Domain D task 4 (time series output, p.3), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy): t = beta-hat/SE eq.3.14 p.67; RSE eq.3.15/3.25 and R^2 = (TSS-RSS)/TSS eq.3.17 pp.69-70, 80; F = [(TSS-RSS)/p]/[RSS/(n-p-1)] eq.3.23 p.76; dummy coding against a baseline level §3.3.1 pp.83-86; §12.2 PCA loading vectors, sdev, PVE, scree-plot elbow pp.499-509 and lab p.534; §12.4.2 dendrogram fusion height = dissimilarity, linkage pp.521-528, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "R Core, stats::summary.glm documentation (R-devel): third column labelled t if the dispersion is estimated, z if known/fixed by the family; dispersion 1 for binomial and Poisson, otherwise the residual (Pearson) Chi-squared statistic divided by the residual df; cov.scaled = covariance scaled by dispersion, sha256:c7cf5a73225bd54cad2584cf31b1155884c4d359a14de4048b6e11a7acfe9e2d — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.glm.html"
    - "R Core, stats::glm documentation (R-devel), Value: null.deviance, df.residual, df.null, aic, sha256:6b9a6fad58fad62386050ceba47abe28e40241544dd71d20df000fc40563d6c3 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/glm.html"
    - "Bates et al., R package 'lme4' 2.0-6 reference manual (2026), anova.merMod argument 'refit': REML-fitted models with different fixed effects have likelihoods that are not directly comparable, so they are refitted by ML, sha256:4e4faf83522214402c69a6ed3cfa2b6c8ee96e034fddbce079b2513672a1985c — https://cran.r-project.org/web/packages/lme4/lme4.pdf"
    - "Bolker et al., GLMM FAQ, 'Testing hypotheses': LRT of a variance whose null value (sigma^2 = 0) is on the boundary is conservative; with a single random-effect variance the p-value is about twice what it should be (Self & Liang 1987; Stram & Lee 1994; Pinheiro & Bates 2000), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html"
    - "UVA Library StatLab, 'Understanding ICC': ICC = between-group variance divided by the sum of between- and within-group variances, read off a random-intercept fit, sha256:2a9c5ed75761ebff743b725a1fcb9c9ff929e6ec684bbc9b50e9bffaf10feab4 — https://library.virginia.edu/data/articles/understanding-icc"
    - "R Core, stats::arima documentation (coef, var.coef, sigma2 = MLE of the innovations variance, aic), sha256:e88d24e3126483e56d0672d7459e714401a97d19676764ef00dc0b2fb151ef85 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/arima.html"
    - "R Core, stats::predict.Arima documentation (se.fit: standard errors of prediction), sha256:8c2d3e820dd8e2217dddb40d7bf182fb36025d7d62ccf3d174b3ec49d4663787 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/predict.arima.html"
    - "Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph 4, 2016): §3.2 ODP model identical to the volume-weighted chain ladder (PDF p.16); §5.5.1 'Estimated-Unpaid Results' pp.41-43 (PDF 49-51): SE rises from oldest to most recent years and the total SE exceeds any year; CV falls and the total CV is below any year; CV may rise again in the most recent years from parameter uncertainty, and a large rise suggests overstated uncertainty and a Bornhuetter-Ferguson or Cape Cod model; implausible minima/maxima (e.g. negative incrementals) send you back to the assumptions, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Meyers, Stochastic Loss Reserving Using Bayesian MCMC Models, 2nd ed. (CAS Monograph 8, 2019), §3 (PDF pp.17-19): for a good model the predicted percentiles of outcomes are uniformly distributed (histogram, p-p plot, KS test); a predictive distribution too light in the tails gives more high and low percentiles than expected, sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf"
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
> > \text{MS}_{\text{Reg}} &= 1{,}200/3 \\
> > &= 400 \\
> > \text{MS}_{\text{Res}} &= 1{,}840/46 \\
> > &= 40 \\
> > F &= 400/40 \\
> > &= 10.0 \\
> > R^2 &= 1{,}200/3{,}040 \\
> > &= 0.395 \\
> > t &= 0.182/0.046 \\
> > &= 3.96
> > \end{align*}
> > $$
> > The residual standard error is $\sqrt{40} = 6.32$. With $t = 3.96$ on $46$ df, the coefficient is clearly significant. Under a log link, $e^{0.182} = 1.20$: a one-unit increase in that predictor raises expected severity by about $20\%$.

> [!example]- Reading Mixed-Model Output {Example}
> A random-intercept model of loss ratio by agency reports an agency variance of $0.018$ and a residual variance of $0.054$. Refitting without the random intercept raises $-2\ell_R$ from $412.8$ to $425.1$. Find the ICC and test whether the agency effect is needed.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{ICC} &= \frac{0.018}{0.018 + 0.054} \\
> > &= 0.25 \\
> > \text{LRT} &= 425.1 - 412.8 \\
> > &= 12.3
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
