---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:30c95d439730bb2dc04476c1bfacdcec1b33c6695eea50e268582f68db16b84e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Caseload Effect.md
---

**Caseload effect** is the dependence of reporting speed on the number of claims. A claim is more likely to be reported in a timely fashion when the caseload is low, so the expected proportion reported by a given age, $E(X \mid Y = y)/y$, falls as the number of claims $y$ grows. [[Loss Development Using Credibility (Brosius - 1993)|Brosius (1993)]] models it by giving the expected reported amount an intercept.

> $$E(X \mid Y = y) = d\,y + x_0$$

> $$\frac{E(X \mid Y = y)}{y} = d + \frac{x_0}{y}$$

> $$L(x) = Z\,\frac{x - x_0}{d} + (1 - Z)\,E(Y)$$

- $Y$ is the ultimate (claims incurred) and $X$ the amount reported at the evaluation age, with $d \neq 0$ and, presumably, $d$ and $x_0$ both positive. Setting $x_0 = 0$ gives proportional reporting, Brosius's Development Formula 2. The last block is his Development Formula 3, with the same credibility $Z = VHM/(VHM + EVPV)$, where the [[Variance of Hypothetical Means|VHM]] and [[Expected Value of Process Variance|EVPV]] are those of $X$ given $Y$.
- **What it does to development factors.** The expected factor to ultimate for a year with $y$ claims is $1/(d + x_0/y)$. That is smaller for a light year than for a heavy one, so a single link ratio, which assumes the ratio is a constant $d$, cannot fit both. Even with perfectly predictable reporting ($EVPV = 0$, $Z = 1$), the best estimate $(x - x_0)/d$ is a line with a negative intercept rather than a multiple of $x$.
- **Why least squares still works.** $L(x)$ is still linear in $x$. [[Least Squares Development Method|Least squares development]] fits the line directly from past years, so it makes sense even when the development ratio varies with the caseload. $x_0$ and $d$, which may be impossible to determine in practice, are never needed. The proof shifts $X$ by $x_0$: $W = X - x_0$ has the same EVPV and VHM, so Formula 2 applies to $W$.
- The model implies $E(X \mid Y = 0) = x_0 > 0$, which Brosius concedes may be undesirable. Adjuster caseloads are also among the [[Claims Processing Changes|claims processing]] conditions that change the timing of development.

> [!example]- Development Ratios and the Credibility Estimate Under a Caseload Effect {Example}
> For a small line, claims reported by year-end satisfy $E(X \mid Y = y) = 0.5\,y + 3$. The number of claims incurred $Y$ has mean $20$ and variance $40$, and $\mathrm{Var}(X \mid Y = y) = 0.25\,y$.
>
> (a) Find the expected development ratio for years with $10$, $20$ and $40$ claims. (b) This year $15$ claims have been reported. Estimate the ultimate count with Development Formula 3, and compare the link ratio set at an average year.
>
> > [!answer]-
> > **(a)** The ratio is $d + x_0/y = 0.5 + 3/y$:
> >
> > | Claims $y$ | Reported ratio | Factor to ultimate |
> > |---|---|---|
> > | $10$ | $0.800$ | $1.250$ |
> > | $20$ | $0.650$ | $1.538$ |
> > | $40$ | $0.575$ | $1.739$ |
> >
> > Light years report faster, so one development factor cannot suit all three.
> >
> > **(b)** The credibility weight:
> >
> > $$
> > \begin{align*}
> > VHM &= \mathrm{Var}(0.5\,Y + 3) \\
> > &= 0.25 \times 40 \\
> > &= 10 \\
> > EVPV &= E(0.25\,Y) \\
> > &= 5 \\
> > Z &= \frac{10}{10 + 5} \\
> > &= 2/3
> > \end{align*}
> > $$
> >
> > Then Formula 3 gives:
> >
> > $$
> > \begin{align*}
> > L(15) &= \tfrac{2}{3} \cdot \frac{15 - 3}{0.5} + \tfrac{1}{3}(20) \\
> > &= 16 + 6.67 \\
> > &= 22.67
> > \end{align*}
> > $$
> >
> > **Check with Formula 1.** Here $E(X) = 0.5(20) + 3 = 13$, $\mathrm{Cov}(X, Y) = 0.5 \times 40 = 20$ and $\mathrm{Var}(X) = VHM + EVPV = 15$:
> >
> > $$
> > \begin{align*}
> > L(15) &= (15 - 13)\,\tfrac{20}{15} + 20 \\
> > &= 22.67
> > \end{align*}
> > $$
> >
> > The link ratio of an average year is $20/13 = 1.538$, which gives $15 \times 1.538 = 23.08$. Two effects separate the estimates:
> >
> > - Inverting the reporting line gives $(15 - 3)/0.5 = 24$. That is above $23.08$ because a heavier-than-average year reports a smaller share, so it needs a larger factor than the average year's.
> > - Credibility then pulls the $24$ one-third of the way back to $E(Y) = 20$, giving $22.67$.
> >
> > A least squares line through past years would approach $L(x) = \tfrac{4}{3}x + 2.67$, without anyone knowing $d$ or $x_0$.
