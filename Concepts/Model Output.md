---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:c9b60d3e7366239cfd7813ca41520606738e2acfcd845eca6efefcab92583b2b
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

**Model Output** is the set of tables and statistics that [[Statistical Software|statistical software]] reports about a fitted model. The output of a regression or a [[Generalized Linear Model|generalized linear model]] has three parts:

1. The [[Parameter Estimate Tables|parameter estimate table]]: each coefficient's estimate, standard error, test statistic and [[p-Value|p-value]].
2. The [[ANOVA|ANOVA table]], or for a GLM the analysis of deviance: degrees of freedom, sums of squares or [[Deviance|deviances]], and the test statistic for each source.
3. The fit statistics: the residual standard error, [[R-Squared|$R^2$]], the [[Dispersion Parameter|dispersion]] estimate, the null and residual deviance, and [[AIC]].

## Output of a linear regression

A [[Linear Regression|linear regression]] with an intercept and $p$ predictors, fitted to $n$ observations, leaves $n - p - 1$ residual degrees of freedom. The estimate of the error variance $\sigma^2$ is

> $$\hat{\sigma}^2 = \frac{\text{RSS}}{n - p - 1}$$

- $\text{RSS}$ is the [[Residual Sum of Squares|residual sum of squares]].

The residual standard error in the output is $\hat{\sigma}$, so squaring it gives $\hat{\sigma}^2$. The $F$ statistic for the regression as a whole is

> $$F = \frac{(\text{TSS} - \text{RSS})/p}{\text{RSS}/(n - p - 1)}$$

- $\text{TSS}$ is the total sum of squares of the response about its mean.

The output also reports $R^2 = 1 - \text{RSS}/\text{TSS}$.

> [!example]- A regression with 3 predictors is fitted to 50 claims, with $\text{TSS} = 3{,}040$ and $\text{RSS} = 1{,}840$. One coefficient is 0.182 with standard error 0.046. What are $\hat{\sigma}$, $F$, $R^2$ and that coefficient's $t$ statistic? {Example}
> - The residual degrees of freedom are $50 - 3 - 1 = 46$, so $\hat{\sigma}^2 = 1{,}840/46 = 40$ and $\hat{\sigma} = 6.32$.
> - The regression sum of squares is $3{,}040 - 1{,}840 = 1{,}200$, so $F = (1{,}200/3)/40 = 10.0$.
> - $R^2 = 1 - 1{,}840/3{,}040 = 0.395$.
> - The $t$ statistic is $0.182/0.046 = 3.96$.

## Output of a generalized linear model

With a log link, the fitted mean is $\mu_i = e^{\eta_i}$, so the output's coefficients act multiplicatively. A one-unit increase in predictor $x_j$, or a move from the base level to another level, multiplies the expected response by

> $$e^{\hat{\beta}_j}$$

- $\hat{\beta}_j$ is the estimated coefficient, with the other predictors held fixed.

The dispersion parameter $\phi$ of a Gamma or normal GLM measures the spread of the response around its mean. It scales the standard errors, but it does not enter the prediction of the mean.

> [!example]- A Gamma severity GLM with a log link reports an intercept of 7.00, a coefficient of 0.18 for territory B (territory A is the base level) and a dispersion estimate of 1.4. What is the predicted mean severity in territory B? {Example}
> - The linear predictor for territory B is $7.00 + 0.18 = 7.18$.
> - The predicted mean severity is $e^{7.18} = 1{,}312.9$.
> - Territory B's severity is $e^{0.18} = 1.197$ times territory A's, which is $e^{7.00} = 1{,}096.6$.
> - The dispersion estimate does not enter the predicted mean.

## Output of a linear mixed model

A [[Linear Mixed Model|linear mixed model]] reports a table of fixed effects, read like a parameter estimate table, and the [[Variance Components|variance components]] of the random effects and the residual. It also reports $-2$ times the maximized log-likelihood. For two nested models, the [[Likelihood Ratio Test|likelihood ratio test]] statistic is

> $$\text{LRT} = (-2l_0) - (-2l_1)$$

- $l_0$ is the maximized log-likelihood of the restricted (null) model.
- $l_1$ is the maximized log-likelihood of the larger model.

The statistic is compared with a chi-squared distribution whose degrees of freedom are the number of added parameters, when the null value of each tested parameter lies inside its range. To test whether a random effect is needed, the null hypothesis is that its variance is zero. Zero is on the boundary of the range of a variance, so the reference distribution is an equal mixture of $\chi^2_0$ and $\chi^2_1$, and the p-value is half the $\chi^2_1$ p-value.

> [!example]- A model of loss ratios with a random intercept for each agency has $-2l = 412.8$. The same model without the random intercept has $-2l = 425.1$. Is the random intercept needed? {Example}
> - The likelihood ratio test statistic is $425.1 - 412.8 = 12.3$.
> - The null hypothesis is that the agency variance is zero, which is on the boundary.
> - The $\chi^2_1$ p-value of 12.3 is 0.00045, so the p-value is $0.5 \times 0.00045 = 0.00023$.
> - The random intercept is needed.

## Output of a stochastic reserving model

A [[Stochastic Reserving|stochastic reserving]] model, such as the [[ODP Bootstrap Model|ODP bootstrap model]], reports a simulated [[Unpaid Claim Distribution|unpaid claim distribution]]: by accident year and in total, the mean unpaid, its standard error, its percentiles and its [[Coefficient of Variation|coefficient of variation]]. The coefficient of variation is

> $$\text{CV} = \frac{\text{standard error of unpaid}}{\text{mean unpaid}}$$

Before the distribution is used, its output is checked for reasonableness:

1. The standard error should increase from the oldest to the most recent accident year, because the more recent years have larger mean unpaid amounts.
2. The standard error of the total should be larger than that of any single accident year.
3. The CV should generally decrease from the oldest to the most recent accident year, because the variability is measured against a larger mean.
4. The CV of the total should be smaller than that of any single accident year, because of diversification across years.
5. The CV of the most recent year or two may rise again, when parameter uncertainty outweighs process uncertainty. A large rise, or a year with a CV below the total's, is a problem to investigate.

> [!example]- An ODP bootstrap reports the mean unpaid and its standard error by accident year, in thousands. Does the output pass the reasonableness checks? {Example}
>
> | Accident year | Mean unpaid | Standard error | CV |
> | --- | --- | --- | --- |
> | 2019 | 180 | 95 | 0.53 |
> | 2020 | 520 | 190 | 0.37 |
> | 2021 | 1,150 | 310 | 0.27 |
> | 2022 | 2,400 | 520 | 0.22 |
> | 2023 | 3,900 | 1,400 | 0.36 |
> | Total | 8,150 | 1,650 | 0.20 |
>
> - The standard error rises from 95 to 1,400, and the total's 1,650 is larger than every single year's.
> - The CV falls from 0.53 to 0.22 through 2022, and the total's 0.20 is smaller than every single year's.
> - The CV of 2023 rises from 0.22 to 0.36, which is a large rise for the most recent year.
> - The output passes the first four checks, and the 2023 projection should be investigated before the distribution is used.
