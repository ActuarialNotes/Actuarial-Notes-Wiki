---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:1beb2067de93ca91d7ed38997018c52b322aded43e92ba8c4c1bf682b6da92ec
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Lemma 5.3 covariance properties incl. bilinearity; eq. 5.21 Var(aX+bY); correlation definition, -1<=rho<=1, rho=+-1 linear, rho(-X,Y)=-rho(X,Y), rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse fails; pairwise uncorrelated sums, sha256:10ac40b763d78b0fa19a116594da71769bf417b59a1714be707c7c410991a7fb — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: Events (cov and cor of indicators), var(X+Y), var(X-Y), cor = +-1 iff linear with that slope sign, uniform X and Y = X^2 uncorrelated, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ex. 6.3.17(a)-(c) and 6.3.18(a)-(c) printed p.281 (PDF p.289); Def. 7.1 p.286 (PDF p.294); Thm 7.1 and sum of two exponentials (PDF pp.299-301); Examples 7.5-7.6 (PDF p.302); Thms 9.4 and 9.6 (PDF pp.351, 365); continuity correction (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, Fall 2026 content outline: C. FRM (Cummins Capital), D.5 'Select models to manage diverse risks and evaluate correlations of risks', sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Exam 7 Content Outline, Fall 2026, Fall 2026 content outline: task 'Test assumptions underlying reserving models'; reading Mack - Chain Ladder (Mack 1994), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
    - "Mack, Measuring the Variability of Chain Ladder Reserve Estimates (1994), Appendix G, Testing for Correlations between Subsequent Development Factors, PDF p.55, sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
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
