---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:5f1b88968834719ade11f172311a02a092b59552b90457bf0083881d812e0390
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (P(A|B)=P(A∩B)/P(B); f_X|Y = f_XY/f_Y; independence gives f_X|Y = f_X), web page as fetched 2026-09-28, sha256:440ec280d6efdc0929cc844b4e80449f095eeb361179491311b023da88395b95 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), Q239 (discrete joint cdf, PDF p.71), Q410 (discrete joint cdf, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Conditional and Marginal Probability Functions.md
---

The **Conditional and Marginal Probability Functions** each describe one [[Random Variable|random variable]] from a joint distribution. The [[Marginal Probability Function|marginal probability function]] $f_X(x)$ is the distribution of $X$ on its own, and the [[Conditional Probability Function|conditional probability function]] $f_{X \mid Y}(x \mid y)$ is the distribution of $X$ once $Y = y$ is known.

For discrete $X$ and $Y$ with [[Joint Probability Function|joint probability function]] $f(x, y)$, the marginal probability function of $X$ sums the joint probabilities over every value of $Y$:

> $$f_X(x) = \sum_y f(x, y)$$

In a joint probability table, the marginals are the row and column totals. For continuous random variables, the sum becomes an integral of the [[Joint Probability Density Function|joint density]] over $y$.

The conditional probability function of $X$ given $Y = y$ is

> $$f_{X \mid Y}(x \mid y) = \frac{f(x, y)}{f_Y(y)}$$

- $f_Y(y) > 0$ is the marginal probability that $Y = y$.

It is [[Conditional Probability|conditional probability]] applied to every value of $X$ at once. Conditioning on any event $F$ about $X$ and $Y$ works the same way: an outcome inside $F$ has conditional probability equal to its joint probability divided by $P(F)$, and an outcome outside $F$ has conditional probability 0. If $X$ and $Y$ are [[Independent Random Variables|independent]], the conditional equals the marginal, $f_{X \mid Y}(x \mid y) = f_X(x)$.

> [!example]- What are the marginal distribution of $X$ and $P(X = 1 \mid Y = 2)$? {Example}
> $X$ is the number of claims on a policy and $Y$ its policy type, with the joint probability function:
>
> | | $Y = 1$ | $Y = 2$ |
> | --- | --- | --- |
> | $X = 0$ | 0.3 | 0.1 |
> | $X = 1$ | 0.2 | 0.4 |
>
> > [!answer]-
> > - The row totals give the marginal of $X$: $f_X(0) = 0.3 + 0.1 = 0.4$ and $f_X(1) = 0.2 + 0.4 = 0.6$.
> > - The column total for $Y = 2$ is $f_Y(2) = 0.1 + 0.4 = 0.5$.
> > - $P(X = 1 \mid Y = 2) = \frac{f(1, 2)}{f_Y(2)} = \frac{0.4}{0.5} = 0.8$.

> [!trap] Dividing by the wrong total
> $P(X = 1 \mid Y = 2)$ divides by the total of the column $Y = 2$, which is $0.5$. Dividing by the row total $f_X(1) = 0.6$ gives $\frac{0.4}{0.6} = 0.67$, which is $P(Y = 2 \mid X = 1)$.
