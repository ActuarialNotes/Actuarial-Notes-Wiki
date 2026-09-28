---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:c66fc4a4d75026c2d93cf6961aa6aec4eb56bd7cfc9c1d11327923cc9268b666
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.4 joint cdf (discrete double sum; continuous double integral) p.5, §3.5 properties of the joint cdf p.6, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.2 Joint Cumulative Distribution Function (limits, rectangle formula, f = d2F/dxdy), web page as fetched 2026-09-28, sha256:dbbb45db724d91c7f1eeede2524932e6babb38a906987d51550cb7a9990b73e0 — https://www.probabilitycourse.com/chapter5/5_2_2_joint_cdf.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q239 (discrete joint cdf, rectangle recovery, PDF p.71), Q410 (discrete joint cdf by adding cells, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.7 (independence iff the joint cdf factors, PDF p.173), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Joint Cumulative Distribution Function.md
---

The **joint cumulative distribution function** (joint CDF) of random variables $X$ and $Y$ gives the probability that $X \leq x$ and $Y \leq y$ simultaneously.

> $$F(x,y) = P(X \leq x,\; Y \leq y)$$

- It is non-decreasing in each argument
- $F(-\infty, y) = F(x, -\infty) = 0$ and $F(\infty, \infty) = 1$
- For discrete variables, $F$ adds up the joint probability function over every cell at or below $x$ and at or below $y$:

> $$F(x,y) = \sum_{x_i \le x}\ \sum_{y_j \le y} p(x_i, y_j)$$

- For integer-valued $X$ and $Y$, a single cell is recovered from $F$ by inclusion–exclusion on the rectangle:

> $$p(x,y) = F(x,y) - F(x-1,y) - F(x,y-1) + F(x-1,y-1)$$

- For continuous jointly distributed variables, the joint PDF is recovered by:

> $$f(x,y) = \frac{\partial^2 F(x,y)}{\partial x\, \partial y}$$

- The joint CDF of [[Independent Random Variables]] factors as $F(x,y) = F_X(x)\cdot F_Y(y)$

![[Media/Figures/Joint_Cumulative_Distribution_Function.svg|340]]

> [!example]- A Discrete Joint CDF {Example}
> $X$ and $Y$ are the numbers of claims on two policies, with joint probability function
>
> | | $Y=0$ | $Y=1$ | $Y=2$ |
> |---|---|---|---|
> | $X=0$ | 0.30 | 0.15 | 0.05 |
> | $X=1$ | 0.20 | 0.20 | 0.10 |
>
> Find $F(1,1)$ and $F(0,2)$, then recover $P(X=1, Y=1)$ from $F$ alone.
>
> > [!answer]-
> > Add every cell with $x_i \le x$ and $y_j \le y$:
> > $$
> > \begin{align*}
> > F(1,1) &= 0.30 + 0.15 + 0.20 + 0.20 = 0.85 \\
> > F(0,2) &= 0.30 + 0.15 + 0.05 = 0.50
> > \end{align*}
> > $$
> > With $F(0,1) = 0.45$, $F(1,0) = 0.50$ and $F(0,0) = 0.30$, the rectangle rule gives the cell back:
> > $$
> > \begin{align*}
> > P(X=1, Y=1) &= F(1,1) - F(0,1) - F(1,0) + F(0,0) \\
> >             &= 0.85 - 0.45 - 0.50 + 0.30 \\
> >             &= 0.20
> > \end{align*}
> > $$
> > which matches the table.

> [!example]- Computing a Joint Probability {Example}
> $X$ and $Y$ are independent, each Uniform on $[0,1]$. Find $P(X \leq 0.4,\; Y \leq 0.6)$.
>
> > [!answer]-
> > Since $X$ and $Y$ are independent with $F_X(x) = x$ and $F_Y(y) = y$:
> > $$F(0.4, 0.6) = F_X(0.4) \cdot F_Y(0.6) = 0.4 \times 0.6 = 0.24$$
