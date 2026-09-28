---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:80e66e52cd4277315cbfb149bb9df12d0729e555904822e5a9dcd2c66c3cf011
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Exercise 6.3.18(a)-(c) p.281 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov definition and E[XY]-EXEY form; rho = Cov/(sigma_X sigma_Y); -1<=rho<=1; rho=+-1 iff Y=aX+b; rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse not necessarily true), sha256:b6bc17d7f786f7ac8d2836f42d6524c99e8909254d473f1edef7909f1da9620e — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Siegrist, Random: Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), Expected Value > Covariance and Correlation (definitions; cov = E(XY)-E(X)E(Y); independent implies uncorrelated, converse fails; correlation dimensionless), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlation Coefficient.md
---

The **Correlation Coefficient** (Pearson's $\rho$) is the standardized measure of linear association between two random variables, obtained by dividing the [[Covariance]] by the product of the standard deviations.

> $$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y}$$

- It satisfies $-1 \leq \rho \leq 1$
- $\rho = \pm 1$ indicates a perfect linear relationship; $\rho = 0$ indicates no linear association

![[Media/Figures/Correlation_Coefficient.svg|340]]

> [!example]- Computing the Correlation Coefficient from Variances {Example}
> If $\text{Cov}(X,Y) = 6$, $\text{Var}(X) = 9$, and $\text{Var}(Y) = 16$, what is $\rho$?
>
> > [!answer]-
> > $$\rho = \frac{6}{\sqrt{9} \cdot \sqrt{16}} = \frac{6}{3 \times 4} = \frac{6}{12} = 0.5$$
> > This indicates a moderate positive linear relationship between $X$ and $Y$.
