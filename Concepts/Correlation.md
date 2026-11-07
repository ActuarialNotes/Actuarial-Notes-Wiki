---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:886a0d6a0f338e3d947714716d07fedc97a744dfd6361dc2c16e837d19fbb6b7
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.1.3 eq. (3.18) sample correlation, footnote 5, and 'in the simple linear regression setting, R^2 = r^2 … correlation quantifies the association between a single pair of variables … R^2 fills this role', printed pp.70-71 (PDF pp.80-81), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.4 §5 'Covariance and Correlation' (independent => uncorrelated, 'the converse fails'; X uniform on [-1,1], Y = X^2 uncorrelated; events independent iff their indicator variables are uncorrelated), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.5 'The Multivariate Normal Distribution' (bivariate normal: X and Y independent iff rho = 0), sha256:829c923637c9907efbf36b40d66f9abfdf79b2374e04193e99705ae10df83a7f — https://www.randomservices.org/random/special/MultiNormal.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §7 'Sample Correlation and Regression' (sample correlation r = s(x,y)/(s(x)s(y)); r^2 = SSR/SST, the coefficient of determination), sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html"
    - "Foster et al., An Introduction to Psychological Statistics (CC BY-NC-SA 4.0), §12.7 Correlation versus Causation: \"Correlations DO NOT prove causation\"; lurking/confound third variables; spurious correlation by random chance; \"The ONLY way to demonstrate a causal relation is with a properly designed and controlled experiment\", random assignment — https://stats.libretexts.org/Bookshelves/Applied_Statistics/An_Introduction_to_Psychological_Statistics_(Foster_et_al.)/12%3A_Correlations/12.07%3A_Correlation_versus_Causation"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlation.md
---

![[Media/Figures/Correlation.svg|340]]

**Correlation** is a measure of the strength and direction of the linear relationship between two [[Random Variable|random variables]] $X$ and $Y$. The correlation coefficient is

> $$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sqrt{\text{Var}(X)\,\text{Var}(Y)}}$$

- $\text{Cov}(X, Y) = E[XY] - E[X]E[Y]$ is the [[Covariance|covariance]] of $X$ and $Y$.

The correlation lies between $-1$ and $1$. It is $1$ or $-1$ only when $Y$ is an exact linear function of $X$ with positive or negative slope, and $0$ when there is no linear association. Unlike the covariance, it has no units, so it can be compared across variables measured on different scales.

> [!example]- Random variables $X$ and $Y$ have $\text{Var}(X) = 25$, $\text{Var}(Y) = 36$ and $\text{Cov}(X, Y) = -18$. What is their correlation? {Example}
> - The product of the standard deviations is $\sqrt{25 \times 36} = 30$.
> - The correlation is $\rho(X, Y) = -18/30 = -0.6$, a moderate negative linear relationship.

## Sample correlation coefficient

From $n$ pairs of observations $(x_i, y_i)$, the sample (Pearson) correlation coefficient is

> $$r = \frac{\sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^{n} (x_i - \bar{x})^2 \sum_{i=1}^{n} (y_i - \bar{y})^2}}$$

- $\bar{x}$ and $\bar{y}$ are the sample means.

Dividing the top and the bottom by $n$ gives the same value as $(\overline{xy} - \bar{x}\,\bar{y})/(s_x s_y)$, where $\overline{xy}$ is the mean of the products and $s_x$ and $s_y$ are the standard deviations computed with divisor $n$. In [[Linear Regression|simple linear regression]], the [[R-Squared|$R^2$]] of the fitted line is $r^2$.

> [!example]- What is the sample correlation of the pairs $(1, 2)$, $(2, 4)$, $(3, 5)$, $(4, 4)$ and $(5, 5)$? {Example}
> - The means are $\bar{x} = 3$ and $\bar{y} = 4$.
> - The sum of products of deviations is $(-2)(-2) + (-1)(0) + 0 + (1)(0) + (2)(1) = 6$.
> - The sums of squared deviations are $10$ for $x$ and $4 + 0 + 1 + 0 + 1 = 6$ for $y$.
> - $r = 6/\sqrt{10 \times 6} = 0.7746$, and a regression line through these points has $R^2 = 0.7746^2 = 0.60$.

## Correlation and independence

If $X$ and $Y$ are [[Independent Random Variables|independent]], their covariance is zero, so their correlation is zero. The converse does not hold: two variables can be strongly dependent, one even a function of the other, and still have zero correlation, because correlation measures only linear association.

> [!example]- $X$ is uniform on $[-1, 1]$ and $Y = X^2$. What is their correlation? {Example}
> - $E[X] = 0$, and $E[XY] = E[X^3] = 0$ because $X^3$ is symmetric about zero.
> - $\text{Cov}(X, Y) = E[XY] - E[X]E[Y] = 0$, so $\rho(X, Y) = 0$.
> - $Y$ is completely determined by $X$, so the two are dependent even though they are uncorrelated.

## Limitations of the Pearson correlation coefficient

1. It measures only linear association. A tight curved pattern can have $r$ near zero, and $|r|$ is near 1 only when the points lie close to a straight line.
2. It summarizes the dependence over the whole data set in one number, so it hides how the dependence differs between the tails and the middle of the distribution.
3. It uses the values of the observations, not their ranks, so a single outlier or high-leverage point can drive it. Rank correlations such as Spearman's are less affected.
4. It is not unchanged by a nonlinear increasing transformation of a variable, such as taking logs.
5. A strong correlation does not show that one variable causes the other.

> [!example]- The pairs $(1, 3)$, $(2, 1)$, $(3, 4)$ and $(4, 2)$ are joined by $(10, 10)$. What is the sample correlation with and without the last pair? {Example}
> - With all five pairs, $r = 0.90$.
> - Without $(10, 10)$, $r = 0$.
> - The single point far from the others creates the whole correlation, so $r$ should be read together with a [[Scatter Plot|scatter plot]] of the data.
