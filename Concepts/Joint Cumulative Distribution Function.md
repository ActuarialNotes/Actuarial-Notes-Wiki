---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:197c46fc2cc4bc80405f535d0a714a6063c77eea705c7fceac2769710d8a93e7
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7a: Joint Distributions, Independence, §3.4 joint cdf F(x,y) = P(X<=x, Y<=y), double integral of the density p.5; §3.5 properties: non-decreasing, 0 at lower-left, 1 at upper-right p.6, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.2 Joint CDF: F_X(x) = F(x,inf); F(inf,inf) = 1; F(-inf,y) = F(x,-inf) = 0; rectangle rule F(x2,y2) - F(x1,y2) - F(x2,y1) + F(x1,y1); independence gives F = F_X F_Y; f = d2F/dxdy, HTML fetched 2026-11-06, sha256:e13e9b9b4648413fda67c6474c945f7a80b9cbced541aae04663da2c8af8829e — https://www.probabilitycourse.com/chapter5/5_2_2_joint_cdf.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.7 independence iff the joint cdf factors (PDF p.173), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 outcome a, joint CDFs for discrete random variables (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Joint Cumulative Distribution Function.md
---

![[Media/Figures/Joint_Cumulative_Distribution_Function.svg|340]]

A **Joint Cumulative Distribution Function** of [[Random Variable|random variables]] $X$ and $Y$ gives the probability that $X \le x$ and $Y \le y$ at the same time:

> $$F(x, y) = P(X \le x, Y \le y)$$

For discrete $X$ and $Y$ with [[Joint Probability Function|joint probability function]] $f$, it adds every value at or below $x$ and at or below $y$:

> $$F(x, y) = \sum_{s \le x}\ \sum_{t \le y} f(s, t)$$

> [!idea] The idea
> $F$ gives the probability of each lower-left corner, and any rectangle is a corner with two strips cut off and their overlap added back.

> [!example]- $X$ and $Y$ are the numbers of auto and home claims, with the joint probability function below. What is $F(1, 1)$? {Example}
> The joint probability function:
>
> | | $Y = 0$ | $Y = 1$ | $Y = 2$ |
> | --- | --- | --- | --- |
> | $X = 0$ | 0.30 | 0.15 | 0.05 |
> | $X = 1$ | 0.20 | 0.20 | 0.10 |
>
> - $F(1, 1)$ adds the values with $x \le 1$ and $y \le 1$.
> - The four values add to
>
> $$F(1, 1) = 0.30 + 0.15 + 0.20 + 0.20 = 0.85$$

## Marginal CDFs and independence

Letting $y$ grow without bound gives the CDF of $X$:

> $$F_X(x) = \lim_{y \to \infty} F(x, y)$$

$X$ and $Y$ are [[Independent Random Variables|independent]] exactly when $F(x, y) = F_X(x)\,F_Y(y)$. If $F(x, y)$ factors into a CDF of $x$ times a CDF of $y$, those factors are the marginal CDFs.

> [!example]- $X$ and $Y$ take values $0, 1, 2, \ldots$ with $F(x, y)$ equal to $1 - 0.6^{x+1}$ times $1 - 0.3^{y+1}$. What is $P(X = 1, Y = 2)$? {Example}
> - $F$ factors, so $X$ and $Y$ are independent with $F_X(x) = 1 - 0.6^{x+1}$ and $F_Y(y) = 1 - 0.3^{y+1}$.
> - $P(X = 1)$ is $F_X(1) - F_X(0)$, which is $0.64 - 0.40 = 0.24$.
> - $P(Y = 2)$ is $F_Y(2) - F_Y(1)$, which is $0.973 - 0.910 = 0.063$.
> - $P(X = 1, Y = 2) = 0.24 \times 0.063 = 0.01512$.

## The probability of a rectangle

The probability that $X$ is in $(a, b]$ and $Y$ is in $(c, d]$ is

> $$
> \begin{aligned}
> & P(a < X \le b,\ c < Y \le d) \\
> & = F(b, d) - F(a, d) \\
> & \quad - F(b, c) + F(a, c)
> \end{aligned}
> $$

For integer-valued $X$ and $Y$, a single value of the joint probability function is the rectangle with $a = x - 1$ and $c = y - 1$.

> [!example]- For the auto and home claims above, $F(1, 1) = 0.85$, $F(0, 1) = 0.45$, $F(1, 0) = 0.50$ and $F(0, 0) = 0.30$. What is $P(X = 1, Y = 1)$? {Example}
> - Cut off the strip $X \le 0$, which is $F(0, 1)$, and the strip $Y \le 0$, which is $F(1, 0)$.
> - The corner $F(0, 0)$ was cut off twice, so add it back once.
> - The probability is
>
> $$P(X = 1, Y = 1) = 0.85 - 0.45 - 0.50 + 0.30 = 0.20$$

> [!trap] Subtracting one neighbour
> $F(1, 1) - F(0, 1) = 0.40$ is $P(X = 1, Y \le 1)$, a whole strip. A single value needs all four terms.

## The probability that both exceed

The probability that $X$ is above $x$ and $Y$ is above $y$ is

> $$P(X > x, Y > y) = 1 - F_X(x) - F_Y(y) + F(x, y)$$

For continuous $X$ and $Y$, the [[Joint Probability Density Function|joint density]] is the derivative of $F$ once in each variable:

> $$f(x, y) = \frac{\partial^2 F(x, y)}{\partial x\, \partial y}$$

> [!example]- $X$ and $Y$ have $F(x, y) = \frac{1}{2}xy(x + y)$ for $0 \le x, y \le 1$. What is $P(X > 0.5, Y > 0.5)$, and what is the joint density? {Example}
> - $F_X(0.5) = F(0.5, 1) = 0.375$, and by symmetry $F_Y(0.5) = 0.375$.
> - $F(0.5, 0.5) = 0.125$.
> - The probability that both exceed 0.5 is
>
> $$1 - 0.375 - 0.375 + 0.125 = 0.375$$
> - Differentiating $\frac{1}{2}(x^2 y + x y^2)$ in $x$ and then in $y$ gives $f(x, y) = x + y$.
