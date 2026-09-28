---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:fa4a33e090c57baec7fb08d3b8c1344734cc23c843119de579b13a99ab5f2d0b
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.3 and Ex. 4.12-4.13 (joint distribution function, marginal distributions, independence) pp.142-143 (PDF pp.150-151); §4.2 Def. 4.6, eq. (4.4), Def. 4.7, Thm 4.2 p.165 (PDF p.173); conditional density f_X|Y = f_X,Y/f_Y, PDF p.290; §7.2 Sum of Two Independent Exponential Random Variables (PDF p.300), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7b: Covariance and Correlation — covariance measures the linear relationship and Ex. 3 continuous covariance by double integral p.4, correlation property 3 p.5, sha256:71f8a7b5f3b2233de2e8722ec1372f5704195efc2a6fb72c50c8ef505f92c4dc — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-b.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multivariate Distribution.md
---

A **multivariate distribution** describes the joint probabilistic behavior of two or more [[Random Variable]]s. For random variables $X_1, X_2, \ldots, X_n$, the joint distribution is characterized by the [[Joint Probability Function]] (discrete) or joint density function (continuous).
- **[[Marginal Probability Function]]s**: distributions of individual variables after integrating/summing out the others
- **[[Conditional Probability Function]]s**: distributions of one variable given fixed values of the others
- **[[Covariance]] and [[Correlation Coefficient]]**: measures of linear dependence between pairs of variables
- If all variables are [[Independent Random Variables]], the joint distribution factors as the product of the marginals

![[Media/Figures/Multivariate_Distribution.svg|340]]

> [!example]- Joint vs. Marginal Distribution {Example}
> $X$ and $Y$ each take values $\{0, 1\}$ with joint PMF: $P(0,0)=0.1$, $P(0,1)=0.4$, $P(1,0)=0.3$, $P(1,1)=0.2$.
>
> > [!answer]-
> > Marginal of $X$: $P(X=0) = 0.1+0.4 = 0.5$, $P(X=1) = 0.3+0.2 = 0.5$.
> > Marginal of $Y$: $P(Y=0) = 0.1+0.3 = 0.4$, $P(Y=1) = 0.4+0.2 = 0.6$.
> > Since $P(0,0) = 0.1 \neq P(X=0)P(Y=0) = 0.20$, $X$ and $Y$ are not independent.
