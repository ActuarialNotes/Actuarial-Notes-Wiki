---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:97587dad5b2dc1905c4e8144ca1b8b70c91421c4c0444ffc365d6e4357162523
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.4 §5 'Covariance and Correlation' (definition; properties incl. -1<=cor<=1 and cor=±1 iff linear w.p.1; independent => uncorrelated, converse fails; indicator variables), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.5 'The Multivariate Normal Distribution' (jointly normal: independent iff rho = 0), sha256:829c923637c9907efbf36b40d66f9abfdf79b2374e04193e99705ae10df83a7f — https://www.randomservices.org/random/special/MultiNormal.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §7 'Sample Correlation and Regression' (sample correlation r; r^2 = coefficient of determination), sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.1.3 eq. (3.18) and footnote 5, R^2 = r^2, printed pp.70-71 (PDF pp.80-81), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Correlation.md
---

**Correlation** $\rho(X, Y)$ measures the strength and direction of the linear relationship between two [[Random Variable|random variables]] $X$ and $Y$. The Pearson correlation coefficient standardizes the [[Covariance]] by the product of the standard deviations, forcing it into the range $[-1, 1]$.

> $$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma_Y}$$

- $\rho = 1$ is a perfect positive linear relationship, $\rho = -1$ a perfect negative one, and $\rho = 0$ no linear association.
- Zero correlation does **not** imply [[Independent Random Variables|independence]] unless $X$ and $Y$ are jointly normal.
- Being unit-free, $\rho$ is comparable across variables on different scales, unlike the raw covariance.

![[Media/Figures/Correlation.svg|340]]

> [!example]- Correlation Between Insurance Loss and Expense {Example}
> Two random variables $X$ and $Y$ have $\text{Var}(X) = 25$, $\text{Var}(Y) = 36$, and $\text{Cov}(X, Y) = -18$. Find the correlation coefficient and interpret it.
>
> > [!answer]-
> > The standard deviations are $\sigma_X = \sqrt{25} = 5$ and $\sigma_Y = \sqrt{36} = 6$:
> > $$\rho(X, Y) = \frac{-18}{5 \times 6} = \frac{-18}{30} = -0.6$$
> > A correlation of $-0.6$ indicates a moderately strong negative linear relationship: as $X$ increases, $Y$ tends to decrease.
