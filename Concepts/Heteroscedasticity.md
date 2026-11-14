---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:7bcb45d1413fa5e42010b98fa3f89391516455b228cd1051058b6f50cc3b39f5
  sources:
    - "Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph 4, 2016), §4.6 eqs (4.8)-(4.13) printed pp.25-27 (PDF 33-35); §5.1-5.2 incl. 9 hetero groups P-value 14.3% printed pp.32-35 (PDF 40-43), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), assumption 3, Results (Mack), Extension, PDF pp.3-5; weighted least squares PDF p.16, sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §3.3.3 item 3 Non-constant Variance of Error Terms, Fig. 3.11, pp.96-97 (PDF 106-107), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Rodriguez, Lecture Notes on GLMs, ch.2 §2.10.1-2.10.2 Transforming the Response / Box-Cox, pp.59-60, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Heteroscedasticity.md
---

**Heteroscedasticity** is non-constant variance among a model's [[Residual|residuals]]. Its opposite, constant variance, is homoscedasticity. In a reserving model, heteroscedasticity usually means that the residuals of some development periods are more variable than those of others.

The [[ODP Bootstrap Model|ODP bootstrap]] assumes that the standardized [[Pearson Residual|Pearson residuals]] are independent and identically distributed, which is what allows a residual from one cell to be applied to any other. Heteroscedastic residuals break that assumption. Sampled freely from anywhere in the triangle, they overstate some simulated incremental losses and understate others, and the variability of the unpaid claims is misstated. [[Using the ODP Bootstrap Model (Shapland - 2016)|Shapland (2016)]] gives three ways to adjust for it, each starting from groups of development periods whose residuals have similar variances: stratified sampling, hetero-adjustment factors and non-constant scale parameters.

## Detecting heteroscedasticity

A [[Residual Plot|residual graph]] by development period shows it: the residuals in some periods spread wider around zero than in others. The same graphs by accident year and calendar period are read for differing spread and for systematic trends, such as residuals drifting away from zero. Pearson residuals are already scaled for the expected variance, so the larger incremental values at early ages do not justify larger residuals there. Shapland adds graphs of the standard deviation and range relativities by period to suggest the groups, then tests the groups with the normality statistics and the [[AIC]] and [[BIC]].

There are fewer residuals in the later development periods, so the credibility of an apparent difference in variance has to be weighed, especially near the tail.

## Stratified sampling

Stratified sampling draws each cell's residual only from the residuals of the cell's own group. It is simple, but a small group limits the variability of the outcomes.

## Hetero-adjustment factors

The hetero-adjustment factor of group $i$, for development periods split into groups $1, \dots, j$, is

> $$h_i = \frac{\mathrm{stdev}\left(\bigcup_{1}^{j} r^{H}_{w,d}\right)}{\mathrm{stdev}\left(\bigcup_{i} r^{H}_{w,d}\right)}$$

- $r^{H}_{w,d}$ is the standardized residual of accident year $w$ in development period $d$.
- The numerator is the standard deviation of all the residuals, and the denominator that of group $i$'s residuals.

Each group's residuals are multiplied by its factor, so the adjusted residual is

> $$r^{iH}_{w,d} = r^{H}_{w,d} \times h_i$$

After the multiplication every group has the same standard deviation, so the adjusted residuals can be sampled as one pool. A residual sampled for a cell in group $i$ is divided by that group's $h_i$, which puts the group's variance back. The pseudo incremental value of the cell is

> $$q^{i*}(w,d) = \frac{r^{*}}{h_i}\sqrt{m_{w,d}} + m_{w,d}$$

- $r^{*}$ is the adjusted residual sampled from the pool.
- $m_{w,d}$ is the fitted incremental value of the cell.

The factors also scale the future process variance by development period.

> [!example]- What are the hetero-adjustment factors, and the pseudo value when the largest adjusted residual is sampled for this period-4 cell? {Example}
> An ODP bootstrap's standardized residuals, grouped by development period, are:
>
> | Group | Residuals |
> | :--- | :--- |
> | Periods 1–2 | $1.9$, $-2.3$, $0.8$, $-1.6$, $2.5$, $-0.5$, $-1.2$ |
> | Periods 3–5 | $0.5$, $-0.4$, $0.7$, $-0.6$, $0.3$ |
>
> The period-4 cell has fitted value $m = 150$. Standard deviations use an $n - 1$ divisor.
>
> > [!answer]-
> > - The standard deviations are $1.8265$ for periods 1–2, $0.5701$ for periods 3–5 and $1.3944$ for all twelve residuals together.
> > - The factors are $h_1 = 1.3944/1.8265 = 0.7634$ and $h_2 = 1.3944/0.5701 = 2.4460$.
> > - The early residuals are shrunk and the late ones stretched: $2.5 \times 0.7634 = 1.909$ and $0.7 \times 2.4460 = 1.712$. Each group now has a standard deviation of $1.3944$.
> > - The largest adjusted residual is $1.909$. For a period-4 cell it is divided by that group's factor, $1.909/2.4460 = 0.780$.
> > - The pseudo value is $0.780\sqrt{150} + 150 = 0.780 \times 12.247 + 150 = 159.6$.

The factors are parameters. They reduce the degrees of freedom, which changes the scale parameter $\phi$ and the degrees-of-freedom factor, and a model that is already over-parameterized gets worse. For the Taylor and Ashe data, nine groups gave a normality P-value of $14.3\%$, worse than no groups, while the AIC and BIC rose significantly. A [[Generalized Linear Model|GLM]] bootstrap, with fewer parameters, calendar trends and a choice of error distribution, may remove the problem instead.

> [!trap] Dividing by the factor of the residual's own group
> A sampled residual is divided by the $h_i$ of the cell it is placed in, not of the group it was drawn from. Dividing by its own group's factor gives back the raw residual: in the example, the raw $2.5$ in the period-4 cell gives $2.5\sqrt{150} + 150 = 180.6$, a period-4 value more volatile than any period-4 residual in the data supports.

## Non-constant scale parameters

The third option estimates a scale parameter for each group. Group $i$'s scale parameter is

> $$\phi_i = \frac{\sum_{i} \left(\sqrt{\frac{N}{N-p}}\; r_{w,d}\right)^2}{n_i}$$

- The sum runs over the $n_i$ residuals of group $i$.
- $r_{w,d}$ is the unscaled Pearson residual of the cell.
- $N$ is the number of incremental values in the triangle and $p$ the number of parameters.

The hetero-adjustment factor of group $i$ is then

> $$h_i = \frac{\sqrt{\phi}}{\sqrt{\phi_i}}$$

- $\phi$ is the scale parameter of the whole triangle.

This option is a bit more theoretically sound, but in practice the two sets of factors are very close.

## In least-squares regression

The same word names a failed assumption of the [[Linear Regression|linear regression]] model, whose errors are assumed to have constant variance, $\mathrm{Var}(\epsilon_i) = \sigma^2$. The standard errors, confidence intervals and hypothesis tests of the fit rely on it (James et al., §3.3.3, item 3). A funnel shape in the [[Residual Plot|plot of residuals against fitted values]] shows it: the residuals spread wider as the fitted values grow, which happens when the error variance increases with the response.

One remedy is to replace $Y$ with a concave function of it, such as $\log Y$ or $\sqrt{Y}$. A power transformation $Y^{\lambda}$ with $0 < \lambda < 1$ is concave in the same way. Such a transformation shrinks the larger responses more than the smaller ones, which reduces the heteroscedasticity. The model is then refitted and its residual plot read again.

When the variance of each response is known up to a constant, the fit is weighted instead. Weighted least squares uses weights inversely proportional to the variances: for an average of $n_i$ raw observations, with variance $\sigma^2/n_i$, the weight is $w_i = n_i$.

[[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] makes the variance of the next increment, $\mathrm{Var}[q(w,d+1)] = a[d, c(w,d)]$ given the data to date, an explicit [[Chain Ladder Assumptions|chain ladder assumption]]. Its form decides which factor is the least-squares optimum. Variance proportional to $c(w,d)$ gives the volume-weighted average, proportional to $c(w,d)^2$ the simple average of the ratios, and constant variance an unweighted regression. Residual variances that are not constant over the triangle call for weighted least squares.
