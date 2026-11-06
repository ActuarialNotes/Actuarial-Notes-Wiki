---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:0a941cba32352871fc8aecd28861378ecb2074c2a520e1284999d0c41cf8eee0
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

- It is non-decreasing in each argument.
- $F(-\infty, y) = F(x, -\infty) = 0$ and $F(\infty, \infty) = 1$.
- Letting one argument run to $\infty$ gives a marginal CDF: $F_X(x) = F(x, \infty)$.
- The joint CDF of [[Independent Random Variables]] factors as $F(x,y) = F_X(x)\cdot F_Y(y)$

> [!idea] The idea
> The joint CDF stores the probability of every lower-left corner $\{X \le x, Y \le y\}$, not of single cells. Any rectangle is a corner with two strips cut off and the doubly-cut corner added back, so every probability about $(X, Y)$ can still be recovered from $F$.

![[Media/Figures/Joint_Cumulative_Distribution_Function.svg|340]]

## Adding up the cells below and to the left

A policyholder has an auto policy and a home policy. $X$ and $Y$ are the numbers of claims on the two policies next year, with joint probability function

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---|---|---|
| $X=0$ | 0.30 | 0.15 | 0.05 |
| $X=1$ | 0.20 | 0.20 | 0.10 |

**What is $F(1, 1)$?** It is the probability of at most one auto claim and at most one home claim. Add every cell with $x_i \le x$ and $y_j \le y$: $F(1, 1) = 0.30 + 0.15 + 0.20 + 0.20 = 0.85$. Doing this for every corner gives the joint CDF as a table:

| | $y=0$ | $y=1$ | $y=2$ |
|---|---|---|---|
| $x=0$ | 0.30 | 0.45 | 0.50 |
| $x=1$ | 0.50 | 0.85 | 1.00 |

For discrete variables, $F$ adds up the joint probability function over every cell at or below $x$ and at or below $y$:

> $$F(x,y) = \sum_{x_i \le x}\ \sum_{y_j \le y} p(x_i, y_j)$$

The last column is the marginal CDF of $X$. With $y = 2$, the largest value, the condition $Y \le 2$ always holds, so $F(0, 2) = P(X \le 0) = 0.50$.

## Getting one cell back

**Given only the CDF table, what is $P(X = 1, Y = 1)$?** Start from the corner $F(1, 1) = 0.85$. Cut off the strip with $X \le 0$, which is $F(0, 1) = 0.45$, and the strip with $Y \le 0$, which is $F(1, 0) = 0.50$. The corner $F(0, 0) = 0.30$ was cut off twice, so add it back once.

> $$
> \begin{align*}
> P(X=1, Y=1) &= 0.85 - 0.45 - 0.50 + 0.30 \\
>             &= 0.20
> \end{align*}
> $$

That matches the joint table. For integer-valued $X$ and $Y$, a single cell is recovered from $F$ by inclusion–exclusion on the rectangle:

> $$p(x,y) = F(x,y) - F(x-1,y) - F(x,y-1) + F(x-1,y-1)$$

> [!trap] Subtracting one neighbour
> $F(1, 1) - F(0, 1) = 0.40$ is not a cell. It is $P(X = 1, Y \le 1)$, a whole strip. A single cell needs all four terms.

The same rule gives the probability of any rectangle, for discrete or continuous variables:

> $$
> \begin{align*}
> P(a < X \le b,\ c < Y \le d) &= F(b, d) - F(a, d) \\
>                              &\quad - F(b, c) + F(a, c)
> \end{align*}
> $$

## The probability that both exceed

**What is the probability that both policies have a claim?** The event $\{X > 0, Y > 0\}$ is the complement of "$X \le 0$ or $Y \le 0$". Inclusion–exclusion on that union gives

> $$P(X > x,\ Y > y) = 1 - F_X(x) - F_Y(y) + F(x, y)$$

For the policyholder, $1 - 0.50 - 0.50 + 0.30 = 0.30$. The cells $(1, 1)$ and $(1, 2)$ give the same $0.20 + 0.10$.

## Continuous variables

For continuous variables, $F$ is a double integral of the [[Joint Probability Density Function|joint density]] over the lower-left corner. The joint PDF is recovered by differentiating once in each variable:

> $$f(x,y) = \frac{\partial^2 F(x,y)}{\partial x\, \partial y}$$

Suppose $F(x, y) = \tfrac{1}{2}xy(x + y)$ for $0 \le x, y \le 1$. Differentiating $\tfrac{1}{2}(x^2 y + x y^2)$ in $x$ gives $xy + \tfrac{1}{2}y^2$, and then in $y$ gives $f(x, y) = x + y$. The rectangle rule still works: $P(X > 0.5, Y > 0.5) = 1 - 0.375 - 0.375 + 0.125 = 0.375$.

## Independence factors the CDF

When $X$ and $Y$ are independent, every corner probability is a product, $F(x, y) = F_X(x)\,F_Y(y)$. The converse holds too. A joint CDF that splits into a function of $x$ times a function of $y$, each a CDF, belongs to independent variables. Every cell is then the product of the two marginal PMFs, so the rectangle rule can be skipped.

## Try it

> [!example]- Computing a Joint Probability {Example}
> $X$ and $Y$ are independent, each Uniform on $[0,1]$. Find $P(X \leq 0.4,\; Y \leq 0.6)$.
>
> > [!answer]-
> > **Plan:** the event is one lower-left corner, so it is $F(0.4, 0.6)$, and independence makes it a product.
> >
> > Since $X$ and $Y$ are independent with $F_X(x) = x$ and $F_Y(y) = y$:
> > $$F(0.4, 0.6) = F_X(0.4) \cdot F_Y(0.6) = 0.4 \times 0.6 = 0.24$$

> [!example]- One cell from a product-form CDF {Example}
> The numbers of hospital stays $X$ and outpatient visits $Y$ for a policyholder have joint CDF $F(x, y) = \left[1 - 0.6^{x+1}\right]\left[1 - 0.3^{y+1}\right]$ for nonnegative integers $x$ and $y$. Find $P(X = 1, Y = 2)$.
>
> > [!answer]-
> > **Plan:** apply the four-term rectangle rule, then check it with the product of the marginal PMFs.
> > $$
> > \begin{align*}
> > p(1, 2) &= F(1,2) - F(0,2) - F(1,1) + F(0,1) \\
> >         &= 0.62272 - 0.38920 - 0.58240 + 0.36400 \\
> >         &= 0.01512
> > \end{align*}
> > $$
> > The CDF factors, so $X$ and $Y$ are independent. $P(X = 1) = 0.6^1 - 0.6^2 = 0.24$ and $P(Y = 2) = 0.3^2 - 0.3^3 = 0.063$, and $(0.24)(0.063) = 0.01512$.
> >
> > Why is the product the faster route? Each factor is a one-variable CDF, so each marginal PMF is one difference.

> [!example]- A rectangle from a continuous CDF {Example}
> Two loss ratios have joint CDF $F(x, y) = \tfrac{1}{2}xy(x + y)$ for $0 \le x, y \le 1$. Find $P(0.5 < X \le 1,\ 0 < Y \le 0.5)$ and the joint density.
>
> > [!answer]-
> > **Plan:** use the rectangle rule with $a = 0.5$, $b = 1$, $c = 0$, $d = 0.5$, then differentiate for the density.
> >
> > $F(1, 0.5) = 0.375$, $F(0.5, 0.5) = 0.125$, and $F$ is 0 when either argument is 0.
> > $$
> > \begin{align*}
> > P &= F(1, 0.5) - F(0.5, 0.5) - F(1, 0) + F(0.5, 0) \\
> >   &= 0.375 - 0.125 - 0 + 0 \\
> >   &= 0.25
> > \end{align*}
> > $$
> > The density is $f(x, y) = \partial^2 F / \partial x\, \partial y = x + y$ on the unit square. Integrating it over the rectangle gives the same 0.25.

> [!warning]- Exam traps
> - **One neighbour subtracted.** $F(x, y) - F(x-1, y)$ is a strip, not a cell. Use all four terms.
> - **"Both exceed" read as $1 - F(x, y)$.** $1 - F(x, y)$ is the probability that at least one exceeds. "Both exceed" needs $1 - F_X(x) - F_Y(y) + F(x, y)$.
> - **Forgetting the zero corner.** For nonnegative variables, $F(0, y)$ is $P(X = 0, Y \le y)$, not 0, when $X$ is discrete. It is 0 only when $X$ is continuous.
> - **Differentiating only once.** $\partial F / \partial x$ is not a density. The joint PDF needs one derivative in each variable.
