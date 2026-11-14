---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:b4c71000082334042c497b32456837e3b6528c322d28fc527fc0400fbfbbc7df
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ex. 6.3.17(a)-(c) and 6.3.18(a)-(c) printed p.281 (PDF p.289); Def. 7.1 p.286 (PDF p.294); Thm 7.1 and sum of two exponentials (PDF pp.299-301); Examples 7.5-7.6 (PDF p.302); Thms 9.4 and 9.6 (PDF pp.351, 365); continuity correction (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Lemma 5.3 covariance properties incl. bilinearity; eq. 5.21 Var(aX+bY); correlation definition, -1<=rho<=1, rho=+-1 linear, rho(-X,Y)=-rho(X,Y), rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse fails; pairwise uncorrelated sums, sha256:10ac40b763d78b0fa19a116594da71769bf417b59a1714be707c7c410991a7fb — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: Events (cov and cor of indicators), var(X+Y), var(X-Y), cor = +-1 iff linear with that slope sign, uniform X and Y = X^2 uncorrelated, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "SOA Exam P Sample Solutions, Q80 (PDF p.24), Q301 (PDF p.82), Q388 (PDF p.107), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, Fall 2026 content outline: C. FRM (Cummins Capital), D.5 'Select models to manage diverse risks and evaluate correlations of risks', sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.2-3: Cov(r_E, r_M) expanded over a weighted sum, divided by Var(r_M) to give beta, sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Covariance.md
---

![[Media/Figures/Covariance.svg|340]]

The **Covariance** of two [[Random Variable|random variables]] $X$ and $Y$ is a measure of how they move together. With means $\mu_X = E[X]$ and $\mu_Y = E[Y]$, the covariance is

> $$\text{Cov}(X, Y) = E\big[(X - \mu_X)(Y - \mu_Y)\big]$$

The covariance is positive when $X$ and $Y$ tend to lie on the same side of their means, and negative when they tend to lie on opposite sides. When $X + Y$ is a constant, such as the numbers of successes and failures in $n$ trials, $\text{Cov}(X, Y) = -\text{Var}(X)$ and their [[Covariance and Correlation Coefficient|correlation]] is $-1$. Expanding the product gives the form used to calculate it:

> $$\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$

> [!example]- A policyholder's numbers of auto claims $X$ and home claims $Y$ in a year have the joint probabilities below. What is $\text{Cov}(X, Y)$? {Example}
> | $X$ \ $Y$ | 0 | 1 | 2 |
> | --- | --- | --- | --- |
> | 0 | 0.36 | 0.18 | 0.06 |
> | 1 | 0.10 | 0.20 | 0.10 |
>
> - The row totals give $E[X] = 0.40$, and the column totals give $E[Y] = 0.70$.
> - Only the cells $(1, 1)$ and $(1, 2)$ have a nonzero product $xy$, so $E[XY]$ is $0.20 + 2(0.10) = 0.40$.
> - Subtracting $E[X]\,E[Y] = 0.28$ gives $\text{Cov}(X, Y) = 0.12$.
> - The covariance is positive, so a policyholder with an auto claim tends to have more home claims.

## Covariance of independent random variables

If $X$ and $Y$ are [[Independent Random Variables|independent]], then $E[XY] = E[X]\,E[Y]$, so

> $$\text{Cov}(X, Y) = 0$$

Random variables with covariance 0 are called **uncorrelated**. Uncorrelated random variables need not be independent.

> [!example]- $X$ is $-1$, 0 or 1 with equal probability, and $Y = X^2$. Are $X$ and $Y$ uncorrelated? Are they independent? {Example}
> - $XY = X^3$, which is $-1$, 0 or 1 with equal probability, so $E[XY] = 0$.
> - $E[X] = 0$, so $\text{Cov}(X, Y) = 0 - 0 = 0$, and $X$ and $Y$ are uncorrelated.
> - $Y$ is determined by $X$. For example, $P(Y = 0 \mid X = 0) = 1$, but $P(Y = 0) = \frac{1}{3}$.
> - $X$ and $Y$ are not independent.

## Covariance of linear combinations

For constants $a$, $b$, $c$ and $d$, the covariance of two linear functions is

> $$\text{Cov}(aX + b,\ cY + d) = ac\,\text{Cov}(X, Y)$$

The covariance of a sum with a third random variable $Z$ is

> $$
> \begin{aligned}
> \text{Cov}(X + Y,\ Z) &= \text{Cov}(X, Z) \\
> &\quad + \text{Cov}(Y, Z)
> \end{aligned}
> $$

The covariance of a random variable with itself is its [[Variance|variance]], $\text{Cov}(X, X) = \text{Var}(X)$.

> [!example]- A claim has a surgical part $X$ and a hospital part $Y$, with $\text{Var}(X) = 4$, $\text{Var}(Y) = 9$ and $\text{Cov}(X, Y) = 1$. A 20% surcharge applies to the hospital part. What is the covariance of the claim before the surcharge, $X + Y$, and after it, $X + 1.2Y$? {Example}
> - Split the covariance into one term for each pair of parts:
>
> > $$
> > \begin{aligned}
> > \text{Cov} &= \text{Cov}(X, X) \\
> > &\quad + 1.2\,\text{Cov}(X, Y) \\
> > &\quad + \text{Cov}(Y, X) \\
> > &\quad + 1.2\,\text{Cov}(Y, Y) \\
> > &= 4 + 1.2 + 1 + 10.8 \\
> > &= 17
> > \end{aligned}
> > $$
>
> - The covariance is 17.

## Variance of a sum

The variance of a sum is the covariance of the sum with itself, which splits into

> $$
> \begin{aligned}
> \text{Var}(X + Y) &= \text{Var}(X) + \text{Var}(Y) \\
> &\quad + 2\,\text{Cov}(X, Y)
> \end{aligned}
> $$

> [!example]- Losses $X$ and $Y$ have $\text{Var}(X + Y) = 20$ and $\text{Var}(X - Y) = 12$. What is $\text{Cov}(X, Y)$? {Example}
> - $\text{Var}(X - Y)$ has the same two variances, with $-2\,\text{Cov}(X, Y)$ in place of $+2\,\text{Cov}(X, Y)$.
> - Subtracting the two variances leaves $4\,\text{Cov}(X, Y)$, which is $20 - 12 = 8$.
> - $\text{Cov}(X, Y) = 2$.

> [!trap] Dropping the covariance term
> $\text{Var}(X + Y)$ is $\text{Var}(X) + \text{Var}(Y)$ only when the covariance is 0. For the auto and home claims, $\text{Var}(X) = 0.24$ and $\text{Var}(Y) = 0.53$, so the shortcut gives 0.77. With the covariance, the variance of the total is $0.77 + 2(0.12) = 1.01$.
