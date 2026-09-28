---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:026219c9c407ec4dd8a18e978ee2d0d0f84dff171af19521e3dfd3ba590c584e
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 2.1 density: P(a <= X <= b) = integral of f from a to b for all a, b (PDF p.67), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b: Continuous Random Variables, definition of a continuous random variable (PDF p.2), pdf values greater than 1 (PDF p.4), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.1 Probability Density Function (f_X >= 0; integral over the line = 1), sha256:77567b0ea0bf96cec488fc7ecd8efb3256cfe1bd35dc9d9e8178f6eaeaf80803 — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Density Function (PDF).md
---

A **Probability Density Function (PDF)** describes the relative likelihood of a continuous random variable taking a particular value. The probability that $X$ falls in an interval $[a, b]$ is the area under $f$ over that interval.

> $$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$

- The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$
- $P(X = x) = 0$ for any single point

![[Media/Figures/Probability_Density_Function_PDF.svg|340]]

> [!example]- Probability from a Polynomial PDF {Example}
> If $f(x) = 3x^2$ for $0 \leq x \leq 1$, what is $P(X > 0.5)$?
>
> > [!answer]-
> > $$P(X > 0.5) = \int_{0.5}^{1} 3x^2\, dx = \left[ x^3 \right]_{0.5}^{1} = 1 - 0.125 = 0.875$$
