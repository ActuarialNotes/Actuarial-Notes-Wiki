---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b3025aa6d9ff0e4d479b56eb145cff87a024433b6946441090192d41fc75725c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Caseload Effect.md
---

A **Caseload Effect** is the dependence of reporting speed on the number of claims. A claim is more likely to be reported in a timely fashion when the caseload is low, so the expected proportion reported by a given age falls as the number of claims grows.

[[Loss Development Using Credibility (Brosius - 1993)|Brosius (1993)]] models it by giving the expected reported amount an intercept. With $Y$ the ultimate (claims incurred) and $X$ the amount reported at the evaluation age, the expected reported amount is

> $$E(X \mid Y = y) = d\,y + x_0$$

- $d \neq 0$, and presumably $d$ and $x_0$ are both positive.

Setting $x_0 = 0$ gives proportional reporting, Brosius's Development Formula 2. The model implies $E(X \mid Y = 0) = x_0 > 0$, which Brosius concedes may be undesirable. Adjuster caseloads are also among the [[Claims Processing Changes|claims processing]] conditions that change the timing of development.

## The caseload effect on development factors

The expected proportion reported by the evaluation age is

> $$\frac{E(X \mid Y = y)}{y} = d + \frac{x_0}{y}$$

The expected factor to ultimate for a year with $y$ claims is $1/(d + x_0/y)$. That is smaller for a light year than for a heavy one, so a single link ratio, which assumes the ratio is a constant $d$, cannot fit both.

> [!example]- If $E(X \mid Y = y) = 0.5\,y + 3$, what are the expected development ratios for years with $10$, $20$ and $40$ claims? {Example}
> - The reported ratio is $d + x_0/y = 0.5 + 3/y$.
> - For $10$ claims it is $0.800$, a factor to ultimate of $1.250$.
> - For $20$ claims it is $0.650$, a factor of $1.538$.
> - For $40$ claims it is $0.575$, a factor of $1.739$.
> - Light years report faster, so one development factor cannot suit all three.

## The credibility estimate under a caseload effect

Brosius's Development Formula 3 estimates the ultimate from the reported amount $x$ as

> $$L(x) = Z\,\frac{x - x_0}{d} + (1 - Z)\,E(Y)$$

- $Z = VHM/(VHM + EVPV)$ is the same credibility as in Formula 2.
- The [[Variance of Hypothetical Means|VHM]] and [[Expected Value of Process Variance|EVPV]] are those of $X$ given $Y$.

Even with perfectly predictable reporting ($EVPV = 0$, $Z = 1$), the best estimate $(x - x_0)/d$ is a line with a negative intercept rather than a multiple of $x$.

> [!example]- What is the Formula 3 estimate of this year's ultimate count, and how does it compare with an average year's link ratio? {Example}
> For a small line, claims reported by year-end satisfy $E(X \mid Y = y) = 0.5\,y + 3$. The number of claims incurred $Y$ has mean $20$ and variance $40$, and $\mathrm{Var}(X \mid Y = y) = 0.25\,y$. This year $15$ claims have been reported.
>
> > [!answer]-
> > - $VHM = \mathrm{Var}(0.5\,Y + 3) = 0.25 \times 40 = 10$ and $EVPV = E(0.25\,Y) = 5$, so $Z = 10/(10 + 5) = 2/3$.
> > - $L(15) = \tfrac{2}{3} \times (15 - 3)/0.5 + \tfrac{1}{3} \times 20 = 16 + 6.67 = 22.67$.
> > - As a check with Formula 1, $E(X) = 0.5(20) + 3 = 13$, $\mathrm{Cov}(X, Y) = 0.5 \times 40 = 20$ and $\mathrm{Var}(X) = 15$, so $L(15) = (15 - 13)(20/15) + 20 = 22.67$.
> > - The link ratio of an average year is $20/13 = 1.538$, which gives $15 \times 1.538 = 23.08$.
> > - Inverting the reporting line gives $(15 - 3)/0.5 = 24$. That is above $23.08$ because a heavier-than-average year reports a smaller share, so it needs a larger factor than the average year's.
> > - Credibility then pulls the $24$ one-third of the way back to $E(Y) = 20$, giving $22.67$.

## Least squares development under a caseload effect

$L(x)$ is still linear in $x$. [[Least Squares Development Method|Least squares development]] fits the line directly from past years, so it makes sense even when the development ratio varies with the caseload. $x_0$ and $d$, which may be impossible to determine in practice, are never needed. The proof shifts $X$ by $x_0$: $W = X - x_0$ has the same EVPV and VHM, so Formula 2 applies to $W$. In the example above, a least squares line through past years would approach $L(x) = \tfrac{4}{3}x + 2.67$.

> [!trap] Applying one link ratio to every year
> Under a caseload effect a heavy year reports a smaller share than an average one. The average year's factor understates its ultimate before credibility, $23.08$ against $24$ in the example.
