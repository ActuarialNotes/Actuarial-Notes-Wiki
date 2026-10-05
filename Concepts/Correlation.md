---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:b7b22f0803bd2e9426790835481e69f4077763071dee4dbf7979e4ed5e990b5a
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.1.3 eq. (3.18) sample correlation, footnote 5, and 'in the simple linear regression setting, R^2 = r^2 … correlation quantifies the association between a single pair of variables … R^2 fills this role', printed pp.70-71 (PDF pp.80-81), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.4 §5 'Covariance and Correlation' (independent => uncorrelated, 'the converse fails'; X uniform on [-1,1], Y = X^2 uncorrelated; events independent iff their indicator variables are uncorrelated), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.5 'The Multivariate Normal Distribution' (bivariate normal: X and Y independent iff rho = 0), sha256:829c923637c9907efbf36b40d66f9abfdf79b2374e04193e99705ae10df83a7f — https://www.randomservices.org/random/special/MultiNormal.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §7 'Sample Correlation and Regression' (sample correlation r = s(x,y)/(s(x)s(y)); r^2 = SSR/SST, the coefficient of determination), sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlation.md
---

**Correlation** $\rho(X, Y)$ measures the strength and direction of the linear relationship between two [[Random Variable|random variables]] $X$ and $Y$. The Pearson correlation coefficient standardizes the [[Covariance]] by the product of the standard deviations, forcing it into the range $[-1, 1]$.

> $$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma_Y}$$

- $\rho = 1$ is a perfect positive linear relationship, $\rho = -1$ a perfect negative one, and $\rho = 0$ no linear association.
- Zero correlation does **not** in general imply [[Independent Random Variables|independence]]: with $X$ uniform on $[-1, 1]$, $Y = X^2$ is uncorrelated with $X$ yet a function of it. It does for jointly normal $X$ and $Y$, and for two indicator variables — events $A$ and $B$ are independent exactly when their indicators are uncorrelated.
- Being unit-free, $\rho$ is comparable across variables on different scales, unlike the raw covariance.

From data, the **sample correlation** $r$ replaces each moment with its sample counterpart — this is the $r$ read off a [[Scatter Plot]]:

> $$r = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2}\,\sqrt{\sum_{i=1}^n (y_i - \bar{y})^2}}$$

- In simple linear regression the [[R-Squared]] of the fitted line equals $r^2$. With several predictors the idea does not carry over — correlation describes one pair of variables at a time — and $R^2$ fills that role.

![[Media/Figures/Correlation.svg|340]]

> [!example]- Correlation Between Insurance Loss and Expense {Example}
> Two random variables $X$ and $Y$ have $\text{Var}(X) = 25$, $\text{Var}(Y) = 36$, and $\text{Cov}(X, Y) = -18$. Find the correlation coefficient and interpret it.
>
> > [!answer]-
> > The standard deviations are $\sigma_X = \sqrt{25} = 5$ and $\sigma_Y = \sqrt{36} = 6$:
> > $$\rho(X, Y) = \frac{-18}{5 \times 6} = \frac{-18}{30} = -0.6$$
> > A correlation of $-0.6$ indicates a moderately strong negative linear relationship: as $X$ increases, $Y$ tends to decrease.
