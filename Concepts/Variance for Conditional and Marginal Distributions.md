---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:fe3616eba22bed76dcbc540d8f3273abdcc548e405a9a381c84013d3b03fff96
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 Conditional Expectation (Revisited) and Conditional Variance, eq. 5.7 (law of iterated expectations) and eq. 5.10 (law of total variance), sha256:f2c2e885d3519ab5b2d86ade4f54957dbc11842dd5af70988c43bd5a2e1da5d8 — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php"
    - "Siegrist, Random (randomservices.org), Expected Value > Conditional Expected Value (E[E(Y|X)]=E(Y); var(Y|X)=E(Y^2|X)-[E(Y|X)]^2; var(Y)=E[var(Y|X)]+var[E(Y|X)]; uniform conditional variance l^2/12), sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q388 solution (Var(X) = Var(E(X|N)) + E(Var(X|N)) = 12 + 16 = 28), PDF p.108, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §6.1 Theorem 6.5 (E(X)=sum_j E(X|F_j)P(F_j)) p.239 (PDF p.247), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Variance for Conditional and Marginal Distributions.md
---

The **Variance for Conditional and Marginal Distributions** measures spread at two different levels: the marginal variance $\text{Var}(X)$ describes the spread of $X$ across the whole population, while the conditional variance $\text{Var}(X \mid Y=y)$ measures the spread of $X$ within the subpopulation where $Y=y$. The two are tied together by the **law of total variance**.

> $$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$

> $$E[X] = E\bigl[E[X \mid Y]\bigr]$$

> $$\text{Var}(X) = E\bigl[\text{Var}(X \mid Y)\bigr] + \text{Var}\bigl(E[X \mid Y]\bigr)$$

- The second identity is the **law of total expectation** (double expectation); the third is the **law of total variance**. Both are the fastest route to a marginal moment when the problem hands you a conditional distribution and a distribution for its parameter.
- Watch the notation carefully: $E[X \mid Y=y]$ is a **number**, but $E[X \mid Y]$ is a **random variable** — a function of $Y$. The outer $E[\cdot]$ and $\text{Var}(\cdot)$ in the identities average over $Y$'s distribution.
- Read the decomposition as *(average within-group variance) + (variance of the group means)*. Both terms are non-negative, so conditioning can never raise the average spread: $E[\text{Var}(X \mid Y)] \leq \text{Var}(X)$.
- A common slip is to compute $\text{Var}(E[X\mid Y])$ and stop — that is only the between-group piece, never the whole marginal variance.
- Conditional distributions come from the [[Conditional Probability Function]] (discrete) or the [[Joint Probability Density Function]] (continuous). See also [[Moments for Joint Distributions]].

![[Media/Figures/Variance_for_Conditional_and_Marginal_Distributions.svg|340]]

> [!example]- Variance of Claims Given Policy Type {Example}
> Joint PMF: $p(0,1)=0.3$, $p(1,1)=0.2$, $p(0,2)=0.1$, $p(1,2)=0.4$ where $X$ = claims and $Y$ = policy type. Find $\text{Var}(X \mid Y=2)$.
>
> > [!answer]-
> > Since $p_Y(2)=0.5$: $p_{X|Y}(0\mid 2)=0.2$ and $p_{X|Y}(1\mid 2)=0.8$. Then $E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$. So:
> > $$\text{Var}(X \mid Y=2) = 0.8 - (0.8)^2 = 0.16$$

> [!example]- Marginal Variance via the Law of Total Variance {Example}
> A driver's annual claim count is $N \mid \Lambda = \lambda \sim \text{Poisson}(\lambda)$, and the risk parameter $\Lambda$ varies across the portfolio with $E[\Lambda] = 0.2$ and $\text{Var}(\Lambda) = 0.05$. Find $E[N]$ and $\text{Var}(N)$.
>
> > [!answer]-
> > For a [[Poisson Distribution|Poisson]], $E[N \mid \Lambda] = \Lambda$ and $\text{Var}(N \mid \Lambda) = \Lambda$. By double expectation:
> > $$
> > \begin{align*}
> > E[N] &= E\bigl[E[N \mid \Lambda]\bigr] \\
> >      &= E[\Lambda] \\
> >      &= 0.2
> > \end{align*}
> > $$
> > By the law of total variance:
> > $$
> > \begin{align*}
> > \text{Var}(N) &= E\bigl[\text{Var}(N \mid \Lambda)\bigr] + \text{Var}\bigl(E[N \mid \Lambda]\bigr) \\
> >               &= E[\Lambda] + \text{Var}(\Lambda) \\
> >               &= 0.2 + 0.05 \\
> >               &= 0.25
> > \end{align*}
> > $$
> > $\text{Var}(N) > E[N]$: heterogeneous risk parameters make the portfolio's claim counts **overdispersed** relative to a single Poisson, which is why insurers do not price every driver at the portfolio mean.

> [!example]- Both Terms Matter {Example}
> A loss $X$ is uniform on $(0, Y)$, where $Y$ takes the values 10 and 20 with equal probability. Find $\text{Var}(X)$.
>
> > [!answer]-
> > For $X \mid Y = y \sim \text{Uniform}(0,y)$: $E[X \mid Y] = Y/2$ and $\text{Var}(X \mid Y) = Y^2/12$. With $Y \in \{10, 20\}$ equally likely, $E[Y] = 15$, $E[Y^2] = \tfrac{100 + 400}{2} = 250$.
> >
> > Within-group piece:
> > $$
> > \begin{align*}
> > E\bigl[\text{Var}(X \mid Y)\bigr] &= \frac{E[Y^2]}{12} \\
> >                                   &= \frac{250}{12} \approx 20.83
> > \end{align*}
> > $$
> > Between-group piece:
> > $$
> > \begin{align*}
> > \text{Var}\bigl(E[X \mid Y]\bigr) &= \text{Var}\!\left(\frac{Y}{2}\right) \\
> >                                   &= \frac{1}{4}\left(250 - 15^2\right) \\
> >                                   &= \frac{25}{4} = 6.25
> > \end{align*}
> > $$
> > $$\text{Var}(X) = 20.83 + 6.25 \approx 27.08$$
> > Reporting only 6.25 (the between-group term) would understate the spread by a factor of four.
