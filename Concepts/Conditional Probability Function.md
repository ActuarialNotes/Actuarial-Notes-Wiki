---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:68970d2337f16633ad4ae3ed9e3168d2d982faf404a4a8ec864e89e705e3097b
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (P(A|B)=P(A∩B)/P(B); f_X|Y = f_XY/f_Y; independence gives f_X|Y = f_X), web page as fetched 2026-09-28, sha256:440ec280d6efdc0929cc844b4e80449f095eeb361179491311b023da88395b95 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.3 and Ex. 4.12-4.13 (joint distribution function, marginal distributions, independence) pp.142-143 (PDF pp.150-151); §4.2 Def. 4.6, eq. (4.4), Def. 4.7, Thm 4.2 p.165 (PDF p.173); conditional density f_X|Y = f_X,Y/f_Y, PDF p.290; §7.2 Sum of Two Independent Exponential Random Variables (PDF p.300), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Conditional Probability Function.md
---

A **Conditional Probability Function** gives the distribution of one random variable given a specific value of another. The conditional distribution integrates (or sums) to 1 over its support given the conditioning value.

> $$f_{X|Y}(x \mid y) = \frac{f(x, y)}{f_Y(y)}, \quad f_Y(y) > 0$$

- For discrete random variables:

> $$P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$$

![[Media/Figures/Conditional_Probability_Function.svg|340]]

> [!example]- Conditional PDF from a Joint Density {Example}
> If $f(x,y) = 6(1-y)$ for $0 \leq x \leq y \leq 1$, what is $f_{X|Y}(x \mid y)$?
>
> > [!answer]-
> > First find the marginal PDF of $Y$:
> > $$f_Y(y) = \int_0^y 6(1-y)\, dx = 6y(1-y)$$
> > Then apply the conditional PDF formula:
> > $$f_{X|Y}(x \mid y) = \frac{6(1-y)}{6y(1-y)} = \frac{1}{y}, \quad 0 \leq x \leq y$$
> > Given $Y = y$, $X$ is uniformly distributed on $[0, y]$.
