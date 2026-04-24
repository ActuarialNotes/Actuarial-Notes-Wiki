$$Y = \alpha\,\min\!\bigl((X-d)_+,\; u\bigr)$$
$$\text{where } d = \text{deductible},\; u = \text{benefit limit},\; \alpha = \text{coinsurance}$$

The Payment Random Variable ($Y$) is the amount the insurer actually pays on a claim, derived from the loss random variable $X$ after applying all policy provisions (deductible, coinsurance, and benefit limit).

$Y$ is a transformed version of $X$ and has a mixed distribution: a probability mass at $Y = 0$ (when $X \leq d$) and a continuous or discrete component for positive payments. Its mean and variance differ from those of $X$ due to the truncation and censoring imposed by the policy.

> [!example]- Full Payment Function with Three Provisions {💡 Example}
> A policy has deductible $d = 200$, coinsurance $\alpha = 0.75$, and benefit limit $u = 900$. If $X = 1500$, find the payment $Y$.
>
> > [!answer]- Answer
> > Step 1 — Apply deductible: $X - d = 1500 - 200 = 1300$.
> > Step 2 — Apply benefit limit: $\min(1300, 900) = 900$.
> > Step 3 — Apply coinsurance:
> > $$Y = 0.75 \times 900 = 675$$
> > The insurer pays \$675. The insured absorbs \$200 (deductible) + \$400 (excess above limit) = \$600, and co-pays $0.25 \times 900 = \$225$, totaling \$825.
