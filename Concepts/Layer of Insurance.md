---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ad7d274c5f05e676e15c8badc40e19d2f8760e7baac91bf1cc3974469683d1eb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Layer of Insurance.md
---

**Layer of Insurance** is the slice of each loss between an attachment point $a$ and an exhaustion point $b = a + l$, written "$l$ xs $a$", together with the coverage that pays it (primary, excess or reinsurance). Its cost is the expected loss that falls inside that slice.

> $$X_{(a,b]} = \min(X, b) - \min(X, a)$$

> $$E\left[X_{(a,b]}\right] = E[X \wedge b] - E[X \wedge a]$$

> $$E[\text{layer loss}] = E[N]\left(E[X \wedge b] - E[X \wedge a]\right)$$

- $X$ is the ground-up severity, $N$ the claim count and $E[X \wedge u]$ the [[Limited Expected Value|limited expected value]]. Equivalently, $E[X_{(a,b]}] = \int_a^b S(x)\,dx$ with $S = 1 - F$ — the horizontal strip of a Lee diagram between $a$ and $b$.
- **Frequency and severity in the layer.** $E[N]\,S(a)$ claims are expected to reach the layer. Each pays on average $\left(E[X \wedge b] - E[X \wedge a]\right)/S(a)$. This is how [[Frequency]] and [[Severity]] distributions give the expected losses by layer.
- **Cost given the overall loss cost.** Layer loss cost $= \text{overall loss cost} \times \dfrac{E[X \wedge b] - E[X \wedge a]}{E[X]}$. In [[Increased Limits|ILF]] form, it is the basic-limits loss cost $\times\,[\text{ILF}(b) - \text{ILF}(a)]$. The bottom layer below a deductible is the [[Loss Elimination Ratio|LER]].
- **Properties.** Layers stack: the layers of a tower add up to the ground-up loss. Expected cost per dollar of limit falls as the layer rises (the consistency test). Upper layers grow faster than the ground-up trend under inflation, and they report and develop later. That is why unpaid claims must be estimated layer by layer rather than by scaling ground-up results — see [[Excess Insurance]] and [[Excess and Deductible Rating]].

> [!example]- Expected Losses in a Layer from Frequency and Severity {Example}
> Claims arrive with a Poisson mean of $20$ per year. Severity is Pareto with $\alpha = 2$ and $\theta = \$100{,}000$, so $E[X \wedge u] = \dfrac{\theta u}{\theta + u}$ and $S(x) = \left(\dfrac{\theta}{\theta + x}\right)^2$. Find the expected annual loss in the layer $\$400{,}000$ xs $\$100{,}000$, the expected number of claims reaching it, and the average payment per such claim.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X \wedge 500\text{K}] &= \frac{100{,}000 \times 500{,}000}{600{,}000} \\
> > &= 83{,}333.33 \\[4pt]
> > E[X \wedge 100\text{K}] &= \frac{100{,}000 \times 100{,}000}{200{,}000} \\
> > &= 50{,}000.00 \\[4pt]
> > \text{Per claim} &= 83{,}333.33 - 50{,}000.00 \\
> > &= 33{,}333.33 \\[4pt]
> > \text{Aggregate} &= 20 \times 33{,}333.33 \\
> > &= \$666{,}667
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Claims in layer} &= 20 \times \left(\tfrac{100}{200}\right)^2 \\
> > &= 5 \\[4pt]
> > \text{Severity in layer} &= \frac{33{,}333.33}{0.25} \\
> > &= \$133{,}333
> > \end{align*}
> > $$
> >
> > The layer carries one-third of the expected ground-up loss ($E[X] = \theta = \$100{,}000$ per claim), from a quarter of the claims.

> [!example]- Cost of a Layer Given the Overall Loss Cost {Example}
> A ground-up loss cost of $\$2{,}400$ per unit of exposure has been set. Ten representative claims, in $\$000$, are $20, 40, 60, 80, 120, 150, 250, 400, 700, 1{,}180$ (total $3{,}000$). Price the layer $\$500{,}000$ xs $\$250{,}000$.
>
> > [!answer]-
> > Cap each claim at $750$ and at $250$, then difference the totals:
> >
> > $$
> > \begin{align*}
> > \textstyle\sum \min(X, 750) &= 2{,}570 \\
> > \textstyle\sum \min(X, 250) &= 1{,}470 \\[4pt]
> > \text{Layer share} &= \frac{2{,}570 - 1{,}470}{3{,}000} \\
> > &= 0.3667 \\[4pt]
> > \text{Layer loss cost} &= 2{,}400 \times 0.3667 \\
> > &= \$880
> > \end{align*}
> > $$
> >
> > The layer takes $36.7\%$ of the loss cost. That figure rests on only three claims ($400$, $700$ and $1{,}180$), so in practice the share would come from a fitted severity curve or industry ILFs rather than from this sample.
