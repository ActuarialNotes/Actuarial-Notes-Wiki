---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:18d27ecc53ea0d77df1bddca59c8ed04f11af35dee5b1a85c3fefd4d4782b2ad
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Exercise 6.2.23 p.267 (PDF p.275) and Exercise 6.3.17(a)-(b) p.281 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random: Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), Expected Value > Covariance and Correlation (definitions; cov = E(XY)-E(X)E(Y); independent implies uncorrelated, converse fails; correlation dimensionless), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov definition and E[XY]-EXEY form; rho = Cov/(sigma_X sigma_Y); -1<=rho<=1; rho=+-1 iff Y=aX+b; rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse not necessarily true), sha256:b6bc17d7f786f7ac8d2836f42d6524c99e8909254d473f1edef7909f1da9620e — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Covariance.md
---

**Covariance** measures the linear association between two random variables $X$ and $Y$. Positive covariance indicates the variables tend to move together; negative covariance indicates they tend to move in opposite directions.

> $$\text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y]$$

> $$= E[(X - \mu_X)(Y - \mu_Y)]$$

- If $X$ and $Y$ are [[Independent Random Variables|independent]], $\text{Cov}(X, Y) = 0$ (but the converse is not necessarily true)

![[Media/Figures/Covariance.svg|340]]

> [!example]- Computing Covariance from Expectations {Example}
> Given $E[X] = 2$, $E[Y] = 4$, and $E[XY] = 10$, what is $\text{Cov}(X, Y)$?
>
> > [!answer]-
> > $$\text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y] = 10 - 2 \times 4 = 10 - 8 = 2$$
> > The positive covariance suggests $X$ and $Y$ tend to increase together.
