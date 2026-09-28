---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:a49f98c160e4b3d364aa52c478265fd177191e2c21262d72c5645928d4dddea7
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 2.2 and Theorem 2.1 (PDF p.69), continuous uniform density (PDF p.213), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, §2 definition (PDF p.2), cdf definition (PDF p.3), §2.8 Properties of the cdf (PDF pp.5-6), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf"
    - "Evans & Rosenthal, Probability and Statistics: The Science of Uncertainty (2nd ed., free PDF), §2.5 Theorem 2.5.2 and the right-continuity remark after its proof (PDF p.78), sha256:9c434679624d12084c243f647746dd3dbf5ea878ae15158e9de8c89126a5a65b — https://www.utstat.toronto.edu/mikevans/jeffrosenthal/book.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cumulative Distribution Function (CDF).md
---

The **Cumulative Distribution Function (CDF)** of a random variable $X$ gives the probability that $X$ takes a value less than or equal to $x$.

> $$F(x) = P(X \leq x)$$

- For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$
- The CDF is non-decreasing and right-continuous
- $\lim_{x \to -\infty} F(x) = 0$ and $\lim_{x \to \infty} F(x) = 1$

![[Media/Figures/Cumulative_Distribution_Function_CDF.svg|340]]

> [!example]- CDF and Probability for a Uniform Variable {Example}
> If $X$ is uniform on $[0, 5]$, what is the CDF and what is $P(2 \leq X \leq 4)$?
>
> > [!answer]-
> > The PDF is $f(x) = 1/5$ for $0 \leq x \leq 5$, so the CDF is:
> > $$F(x) = \frac{x}{5}, \quad 0 \leq x \leq 5$$
> > $$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$
