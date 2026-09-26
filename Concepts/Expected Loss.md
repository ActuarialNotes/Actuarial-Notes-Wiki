---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:353a6bef7e2b0e53d076f51859d149b1274b95465c4e2010e3d0ae86ae9eed95
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expected Loss.md
---

**Expected loss** is the mean of the loss that an insurer, or one layer of its coverage, will bear over a period: the expected number of claims times the expected amount each claim contributes. It is where every price starts, and in individual risk rating it is the benchmark actual experience is measured against.

> $$E[S] = E[N]\,E[X]$$

> $$E[S_{(a,\,b]}] = E[N]\,\big(E[X \wedge b] - E[X \wedge a]\big)$$

- $N$ is the claim count ([[Frequency]]) and $X$ the ground-up claim size, drawn from a [[Severity Distribution|severity distribution]]. $S$ is aggregate loss ([[Aggregate Loss Model]]), and the formula needs $N$ independent of the $X_i$. $E[X \wedge u] = \int_0^u [1 - F(x)]\,dx$ is the [[Limited Expected Value|limited expected value]].
- **By layer (Exam 8).** A layer $(a, b]$ pays $\min(X, b) - \min(X, a)$ on each claim. You can also count the claims that *reach* the layer, $E[N]\,[1 - F(a)]$, and multiply by their mean payment in the layer. The two routes must agree. Expected losses by [[Layer of Insurance|layer]] are what [[Increased Limits|increased limits factors]], [[Excess Insurance|excess]] prices and deductible credits are built from.
- **The tail decides the excess layers.** Two severity distributions with the same mean can put very different amounts above a high attachment point. Excess pricing depends on how well the tail is fitted, and the mean says little about it.
- **In rating plans.** [[Experience Rating|Experience rating]] compares the risk's actual losses with the expected losses for its exposure. [[Retrospective Rating|Retrospective rating]] and Table M express aggregate loss as an entry ratio $r = L / E[L]$. In reserving, the expected loss *ratio* is the prior input to the [[Expected Loss Method]].

> [!example]- Expected Losses in an Excess Layer {Example}
> Claims average $20$ a year. Severity is exponential with $\theta = 50{,}000$, so $E[X \wedge u] = \theta\,(1 - e^{-u/\theta})$.
>
> Find expected annual losses in the layer $\$100{,}000$ excess of $\$100{,}000$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X \wedge 200{,}000] &= 50{,}000\,(1 - e^{-4}) \\
> > &= 49{,}084.22 \\[4pt]
> > E[X \wedge 100{,}000] &= 50{,}000\,(1 - e^{-2}) \\
> > &= 43{,}233.24 \\[4pt]
> > E[S_{\text{layer}}] &= 20 \times (49{,}084.22 - 43{,}233.24) \\
> > &= 117{,}020
> > \end{align*}
> > $$
> >
> > Check by the excess-count route. $20\,e^{-2} = 2.707$ claims reach the layer. The exponential is memoryless, so each contributes $50{,}000\,(1 - e^{-2}) = 43{,}233$ on average, and $2.707 \times 43{,}233 = 117{,}020$. The two routes agree.

> [!example]- Allocating Expected Loss Across Layers {Example}
> An account expects $12$ claims. Severity is Pareto with $\alpha = 2$ and $\theta = 100{,}000$, so $E[X] = 100{,}000$ and $E[X \wedge u] = \theta u / (\theta + u)$.
>
> Split expected losses among a $\$250{,}000$ primary layer, a $\$750{,}000$ excess of $\$250{,}000$ layer, and everything above $\$1{,}000{,}000$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X \wedge 250{,}000] &= \frac{100{,}000 \times 250{,}000}{350{,}000} \\
> > &= 71{,}428.57 \\[4pt]
> > E[X \wedge 1{,}000{,}000] &= \frac{100{,}000 \times 1{,}000{,}000}{1{,}100{,}000} \\
> > &= 90{,}909.09
> > \end{align*}
> > $$
> >
> > Multiplying each piece by $12$ claims:
> >
> > - primary: $12 \times 71{,}428.57 = \$857{,}143$
> > - middle layer: $12 \times 19{,}480.52 = \$233{,}766$
> > - above $\$1$M: $12 \times 9{,}090.91 = \$109{,}091$
> >
> > The total is $\$1{,}200{,}000 = 12 \times E[X]$.
> >
> > An exponential with the same mean would put only $100{,}000\,e^{-10} = \$4.54$ per claim above $\$1$M, about $1/2{,}000$ of the Pareto figure. Both curves have the same expected loss in total, but they give completely different excess prices.
