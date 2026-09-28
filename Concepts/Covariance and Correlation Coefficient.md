---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:83834efc55f17e899ef8a05a074b0fd71ab4af0a785fcbb139299338cd0c9264
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov = E[XY]-EX EY; Lemma 5.3 bilinearity; rho = Cov/(sigma_X sigma_Y); -1 <= rho <= 1; independent implies uncorrelated, converse not necessarily true), web page as fetched 2026-09-28, sha256:330faf8fb05f924926ce40a5e577b79910d97ec946263f40c64bf5e1277a9f82 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ex. 6.2.23 (PDF p.275), Exercises 6.3.17-18 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Covariance and Correlation Coefficient.md
---

The **covariance** $\text{Cov}(X, Y)$ measures the direction of the linear relationship between two [[Random Variable|random variables]] — positive if they tend to move together, negative if oppositely. The **correlation coefficient** $\rho_{X,Y}$ standardizes it into the range $[-1, 1]$.

> $$\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$

> $$\rho_{X,Y} = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma_Y}$$

- Correlation is unit-free and comparable across scales, whereas covariance carries the product of the two variables' units.
- $\rho_{X,Y} = 0$ means no linear relationship, but not necessarily [[Independent Random Variables|independence]].
- Covariance is bilinear: $\text{Cov}(aX + bY,\, Z) = a\,\text{Cov}(X, Z) + b\,\text{Cov}(Y, Z)$, adding a constant to either variable leaves it unchanged, and $\text{Cov}(X, X) = \text{Var}(X)$.
- See also [[Correlation]] and [[Covariance]].

> [!example]- Covariance of Study Hours and Exam Score {Example}
> A joint PMF is $p(1,4)=0.2$, $p(1,8)=0.1$, $p(3,4)=0.1$, $p(3,8)=0.6$, where $X$ = hours studied and $Y$ = exam score. Compute $\text{Cov}(X, Y)$.
>
> > [!answer]-
> > First the marginal means:
> > $$\begin{align*} E[X] &= 1(0.3) + 3(0.7) = 2.4 \\ E[Y] &= 4(0.3) + 8(0.7) = 6.8 \end{align*}$$
> > Then $E[XY]$:
> > $$E[XY] = 1{\cdot}4(0.2) + 1{\cdot}8(0.1) + 3{\cdot}4(0.1) + 3{\cdot}8(0.6) = 17.2$$
> > Therefore:
> > $$\text{Cov}(X, Y) = 17.2 - (2.4)(6.8) = 17.2 - 16.32 = 0.88$$
> > The positive covariance confirms that more study hours is associated with higher scores.
