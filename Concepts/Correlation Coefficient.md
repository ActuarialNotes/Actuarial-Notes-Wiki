---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:1beb2067de93ca91d7ed38997018c52b322aded43e92ba8c4c1bf682b6da92ec
  sources:
    - "Covariance | Correlation | Variance of a sum | Correlation Coefficient:, §5.3.1, rho = Cov/(sigma_X sigma_Y), -1<=rho<=1, rho=+-1 linear, rho(aX+b,cY+d)=rho for a,c>0, independent implies uncorrelated, sha256:5c6e480937de94c3d9a36dd838e39f249b0a7aab4845c6f3fc539526fae31625 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Covariance and Correlation, 4.5, cor(a+bX, c+dY) = +-cor(X,Y) by sign of bd; cor=+-1 iff linear with that slope sign; X uniform, Y=X^2 uncorrelated, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, Ex. 6.3.17(c) V(X+Y)=V(X)+V(Y)+2cov(X,Y) and 6.3.18 rho definition and bound, printed p.281 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Sample Correlation and Regression, 6.7 Sample Correlation and Regression: definitions of s(x,y) and r(x,y); r=+-1 iff points on a line; ssr = r^2 sst, sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlation Coefficient.md
---

![[Media/Figures/Correlation_Coefficient.svg|340]]

The **Correlation Coefficient** $\rho(X, Y)$ of two [[Random Variable|random variables]] $X$ and $Y$ is a measure of the strength and direction of the linear relationship between them, on a scale from $-1$ to 1. It is the [[Covariance|covariance]] divided by the product of the [[Standard Deviation|standard deviations]]:

> $$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X\,\sigma_Y}$$

- $\sigma_X = \sqrt{\text{Var}(X)}$ and $\sigma_Y = \sqrt{\text{Var}(Y)}$ are the standard deviations.
- $-1 \le \rho(X, Y) \le 1$, with $\rho = \pm 1$ exactly when $Y = a + bX$ for constants $a$ and $b \ne 0$.

[[Independent Random Variables|Independent random variables]] have covariance 0, so their correlation coefficient is 0.

> [!example]- A policyholder's numbers of auto claims $X$ and home claims $Y$ in a year have $\text{Var}(X) = 0.24$, $\text{Var}(Y) = 0.53$ and $\text{Cov}(X, Y) = 0.12$. What is $\rho(X, Y)$? {Example}
> - The standard deviations are $\sigma_X = \sqrt{0.24} = 0.490$ and $\sigma_Y = \sqrt{0.53} = 0.728$.
> - $\rho(X, Y) = \frac{0.12}{(0.490)(0.728)}$, which is 0.336.
> - The two counts have a moderate positive linear relationship.

## Covariance from the correlation coefficient

Solving the definition for the covariance gives

> $$\text{Cov}(X, Y) = \rho(X, Y)\,\sigma_X\,\sigma_Y$$

> [!example]- Two losses have standard deviations 30 and 40 and correlation coefficient 0.25. What is the standard deviation of their total? {Example}
> - The covariance is $(0.25)(30)(40) = 300$.
> - By the [[Covariance#Variance of a sum|variance of a sum]], the variance of the total is $900 + 1{,}600 + 600$, which is 3,100.
> - The standard deviation is $\sqrt{3{,}100} = 55.68$.

> [!trap] Variances in the denominator
> The denominator is the product of the standard deviations, not of the variances. For the auto and home claims, $\frac{0.12}{(0.24)(0.53)} = 0.943$, which overstates the relationship almost threefold.

## Correlation of linear functions

For constants $a$, $b$, $c$ and $d$ with $a$ and $c$ not 0, changing the units or the origin of $X$ or $Y$ changes the correlation coefficient at most in sign:

> $$\rho(aX + b,\ cY + d) = \pm\,\rho(X, Y)$$

- The sign is $+$ when $a$ and $c$ have the same sign, and $-$ when they differ.

> [!example]- Each auto claim costs 10 and each home claim costs 5. What is the correlation coefficient of the auto cost $10X$ and the home cost $5Y$? {Example}
> - The covariance becomes $(10)(5)(0.12) = 6$.
> - The standard deviations become $10(0.490) = 4.90$ and $5(0.728) = 3.64$.
> - $\rho = \frac{6}{(4.90)(3.64)} = 0.336$, the same as for the counts.

## The sample correlation coefficient

For $n$ observed pairs $(x_i, y_i)$ with means $\bar{x}$ and $\bar{y}$, the sample correlation coefficient is

> $$
> r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}
> $$

$|r|$ is close to 1 only when the points lie close to a straight line. Points on a tight curve can still have $r$ near 0.

> [!example]- The points $(-1, 1)$, $(0, 0)$ and $(1, 1)$ lie exactly on $y = x^2$. What is their sample correlation coefficient? {Example}
> - The means are $\bar{x} = 0$ and $\bar{y} = \frac{2}{3}$.
> - The products of deviations are $(-1)(\frac{1}{3})$, $(0)(-\frac{2}{3})$ and $(1)(\frac{1}{3})$, which add to 0.
> - $r = 0$, although $y$ is determined by $x$.
