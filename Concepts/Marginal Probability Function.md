---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:1ab0b3415a148092bfbb0de3639c90926d9ddde36ecf9fb7d9aa0f120b77db12
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7a: Joint Distributions, Independence, §3.7 marginal pmf: sum the row, written in the margins p.7; §3.8 marginal pdf: integrate out the other variable p.8; §4 independence p.9, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.1 Joint PMF: P((X,Y) in A) = sum of P_XY over A; marginal PMFs by summing, HTML fetched 2026-11-06, sha256:25ee67175334059751c65c27c7c49c0d7bbd0d30063358dd957815fe58fa6779 — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 outcome b (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Marginal Probability Function.md
---

![[Media/Figures/Marginal_Probability_Function.svg|340]]

A **Marginal Probability Function** is the probability function of one [[Random Variable|random variable]], found from the [[Joint Probability Function|joint probability function]] of several. For discrete $X$ and $Y$, the marginal probability function of $X$ adds the joint probability function over every value of $Y$:

> $$f_X(x) = \sum_y f(x, y)$$

In the same way, $f_Y(y) = \sum_x f(x, y)$. In a table, the marginals are the row and column totals written in its margins.

> [!idea] The idea
> A marginal answers any question about one variable alone, but it forgets how the two variables move together.

Multiplying the marginals gives back the joint probability function only when $X$ and $Y$ are [[Independent Random Variables|independent]].

> [!example]- $X$ and $Y$ are each 0 or 1, with $f(0, 0) = 0.25$ and $f(0, 1) = 0.30$. If $P(Y = 1) = 0.55$, what are $f(1, 1)$ and $f(1, 0)$? {Example}
> - $f_Y(1) = f(0, 1) + f(1, 1)$, so $f(1, 1) = 0.55 - 0.30 = 0.25$.
> - $f_X(0) = 0.25 + 0.30 = 0.55$, so $f_X(1) = 1 - 0.55 = 0.45$.
> - $f_X(1) = f(1, 0) + f(1, 1)$, so $f(1, 0) = 0.45 - 0.25 = 0.20$.

## Supports that are not rectangles

When the support is not a rectangle, the sum runs only over the values of $Y$ allowed with each $x$.

> [!example]- A policyholder files $X$ claims, from 0 to 3, and $Y$ of them are paid, so $0 \le y \le x$. Each of the 10 allowed pairs has probability $\frac{1}{10}$. What is $P(X = 2)$? {Example}
> - With $x = 2$, the allowed values of $y$ are 0, 1 and 2.
> - Adding their three probabilities, $f_X(2) = \frac{3}{10}$.

## Continuous random variables

For continuous $X$ and $Y$, the marginal density of $X$ integrates the [[Joint Probability Density Function|joint density]] over $y$:

> $$f_X(x) = \int_{-\infty}^{\infty} f(x, y)\, dy$$

The limits of the integral come from the support at each $x$.

> [!example]- $X$ and $Y$ have joint density $f(x, y) = 6x$ for $0 < x < y < 1$. What is the marginal density of $X$? {Example}
> - For a fixed $x$, $y$ runs from $x$ to 1.
> - The marginal density is
>
> $$f_X(x) = \int_x^1 6x\, dy = 6x(1 - x)$$
>
> - It holds for $0 < x < 1$, and it integrates to 1 there.

> [!trap] Fixed limits on a triangle
> On $0 < x < y < 1$, integrating $y$ from 0 to 1 adds density that isn't there. Read the limits off a sketch of the support.
