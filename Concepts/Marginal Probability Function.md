---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:cfe5e6c40d43ea0c29b95ff03b9e57ac52380fb03f66a672fa12bdfabcc81ce9
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.1 Joint Probability Density Function (eq. 5.15, marginal PDFs, Example 5.15), web page as fetched 2026-09-28, sha256:c2ca39bee0f18d77474ce3ddaf824f6c191da3903c3f4a2ce4389c6ffae9bc94 — https://www.probabilitycourse.com/chapter5/5_2_1_joint_pdf.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), Q239 (discrete joint cdf, PDF p.71), Q410 (discrete joint cdf, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.1 Joint PMF: P((X,Y) in A) = sum of P_XY over (A cap R_XY); R_XY taken as R_X x R_Y with some P_XY zero; marginal PMF eq. (5.1), HTML fetched 2026-10-30, sha256:eeadad2f381a4b909be811c27c4f8b6e9e85b96678a9fa9a25bf57ade8bfbabf — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Marginal Probability Function.md
---

The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p(x,y)$ by summing over all values of $Y$, describing the behavior of each variable in isolation.

> $$p_X(x) = P(X = x)$$

> $$= \sum_y p(x, y)$$

- Similarly $p_Y(y) = \sum_x p(x,y)$
- In the continuous case, the marginal PDF integrates the [[Joint Probability Density Function|joint density]] over the other variable: $f_X(x) = \int_{-\infty}^{\infty} f(x,y)\,dy$.
- Marginal distributions are the starting point for computing [[Moments for Joint Distributions]] and assessing [[Independent Random Variables|independence]].

> [!idea] The idea
> The event $X = x$ happens together with exactly one value of $Y$, so it is split across the cells of one row. Adding the row puts the pieces back together. The marginal answers questions about $X$ alone, but it has forgotten how $X$ and $Y$ move together.

![[Media/Figures/Marginal_Probability_Function.svg|340]]

## Adding across a row

A policyholder has an auto policy and a home policy. $X$ is the number of auto claims next year and $Y$ the number of home claims. The joint probabilities sit inside the table, and the marginals are written in its margins, which is where the name comes from.

| | $Y=0$ | $Y=1$ | $Y=2$ | $p_X$ |
|---|---|---|---|---|
| $X=0$ | 0.30 | 0.15 | 0.05 | 0.50 |
| $X=1$ | 0.20 | 0.20 | 0.10 | 0.50 |
| $p_Y$ | 0.50 | 0.35 | 0.15 | 1 |

**What is the probability of exactly one home claim?** It doesn't matter how many auto claims come with it, so add the column: $p_Y(1) = 0.15 + 0.20 = 0.35$. Each marginal is a full probability function, so the marginals of $Y$ add to 1.

The marginal is all that's needed for a question about one variable. The expected number of home claims is $E[Y] = (1)(0.35) + (2)(0.15) = 0.65$.

## The marginal forgets how the variables move together

Multiply the margins instead of reading the cells, and the probability of no claims at all comes out as $(0.50)(0.50) = 0.25$. The table says 0.30. Many joint tables share these margins, and only one of them has every cell equal to the product. So a marginal can always be found from the joint PMF, but the joint PMF can be rebuilt from the marginals only for [[Independent Random Variables|independent]] variables. See [[Multivariate Distribution]] for the two tables side by side.

## When the support is not a rectangle

The sum runs only over the joint PMF's support. When that support is not a rectangle, the number of terms changes with the value held fixed.

Suppose a policyholder files $X$ claims, from 0 to 3, and $Y$ of them are paid, so $0 \le y \le x$. Each of the 10 allowed pairs has probability $1/10$. For $x = 2$, the possible values of $y$ are 0, 1 and 2, so the marginal is $p_X(x) = \sum_{y=0}^{x} p(x, y)$, here $3/10$.

| $y$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| allowed $x$ | 0–3 | 1–3 | 2–3 | 3 |
| $p_Y(y)$ | 0.4 | 0.3 | 0.2 | 0.1 |

A $y$ outside the support at that $x$ contributes 0. Adding over all four values of $y$ for every $x$ would count pairs, such as 2 paid out of 1 filed, that cannot happen.

## Continuous: integrate instead of add

For a joint density, the same move integrates the other variable out.

> $$f_X(x) = \int_{-\infty}^{\infty} f(x,y)\,dy$$

The limits come from the support. Take $f(x, y) = 6x$ for $0 < x < y < 1$. For a fixed $y$, $x$ runs from 0 to $y$, and for a fixed $x$, $y$ runs from $x$ to 1.

> $$f_Y(y) = \int_0^y 6x\, dx = 3y^2$$

> $$f_X(x) = \int_x^1 6x\, dy = 6x(1 - x)$$

Each marginal density integrates to 1 on $(0, 1)$, which checks the limits.

## Try it

> [!example]- Finding a Marginal PMF {Example}
> Joint PMF: $p(1,1) = 0.2$, $p(1,2) = 0.3$, $p(2,1) = 0.1$, $p(2,2) = 0.4$. Find $p_X(x)$.
>
> > [!answer]-
> > **Plan:** hold $x$ fixed and add over both values of $y$.
> > $$p_X(1) = p(1,1) + p(1,2) = 0.2 + 0.3 = 0.5$$
> > $$p_X(2) = p(2,1) + p(2,2) = 0.1 + 0.4 = 0.5$$
> > The two values add to 1, as a marginal must.

> [!example]- A missing cell {Example}
> The numbers of claims $X$ and $Y$ on two policies have $p(0,0) = 0.25$ and $p(0,1) = 0.30$, with $X$ and $Y$ each 0 or 1. You are told $P(Y = 1) = 0.55$. Find $P(X = 1)$ and $p(1, 0)$.
>
> > [!answer]-
> > **Plan:** use the given marginal of $Y$ to fill one cell, then the total of 1 to fill the other.
> >
> > The column for $Y = 1$ gives $p(1, 1) = 0.55 - 0.30 = 0.25$. The row for $X = 0$ adds to $0.25 + 0.30 = 0.55$, so $P(X = 1) = 1 - 0.55 = 0.45$. Then $p(1, 0) = 0.45 - 0.25 = 0.20$.
> >
> > Why can the cells be filled at all? Each marginal is a row or column total, so it is one equation for the unknown cells in it.

> [!example]- A marginal over a triangle {Example}
> Two loss components have joint density $f(x, y) = 2(x + y)$ for $0 < x < y < 1$. Find the marginal density of $X$ and $P(X > 0.5)$.
>
> > [!answer]-
> > **Plan:** for a fixed $x$, integrate $y$ from $x$ to 1, then integrate the marginal from 0.5 to 1.
> > $$
> > \begin{align*}
> > f_X(x) &= \int_x^1 2(x + y)\, dy \\
> >        &= 2x(1 - x) + (1 - x^2) \\
> >        &= 1 + 2x - 3x^2, \quad 0 < x < 1
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > P(X > 0.5) &= \int_{0.5}^1 (1 + 2x - 3x^2)\, dx \\
> >            &= 1 - 0.625 \\
> >            &= 0.375
> > \end{align*}
> > $$
> > The marginal is small near $x = 1$, because a large $x$ leaves little room for $y$ above it.

> [!warning]- Exam traps
> - **Fixed limits on a triangle.** On $0 < x < y < 1$, integrating $y$ from 0 to 1 for the marginal of $X$ adds density that isn't there. The inner limits come from the sketch of the support.
> - **Rebuilding the joint from the marginals.** $p_X(x)\,p_Y(y)$ equals $p(x, y)$ only under independence.
> - **Adding the wrong direction.** The marginal of $X$ holds $x$ fixed and adds over $y$. Adding a column gives the marginal of $Y$ instead.
