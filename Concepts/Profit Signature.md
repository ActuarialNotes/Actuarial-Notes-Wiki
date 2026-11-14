---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:314f4a5a715cdd539a16fbcad141462757b89ac3b177d0e5fff6c34bd28da609
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Signature.md
---

The **Profit Signature** $\Pi = (\Pi_0, \Pi_1, \dots, \Pi_n)$ is the profit expected to emerge at the end of each year of a policy, per policy issued. Each entry is the [[Profit Vector|profit vector]] entry $\mathrm{Pr}_t$ for that year times the probability that the policy is still in force at the start of the year, so for a policy issued at age $x$ it is

> $$\Pi_0 = \mathrm{Pr}_0$$

> $$\Pi_t = {}_{t-1}p_x\,\mathrm{Pr}_t$$

- ${}_{t-1}p_x$ is the probability that a policy issued at age $x$ is still in force at time $t-1$.
- When policies can also [[Lapse|lapse]], it is ${}_{t-1}p_x^{(\tau)}$ from a [[Multiple Decrement Model|multiple decrement model]], the probability of surviving every decrement.

$\mathrm{Pr}_t$ assumes the policy reached the start of year $t$, but the insurer commits its capital at issue, when it does not know which policies will survive. Weighting each year's profit by the probability of reaching it gives the expected profit per policy issued.

The signature's present value at the risk discount rate $r$ is the policy's [[Net Present Value|net present value]], which is

> $$\text{NPV} = \sum_{t=0}^{n} \Pi_t\,(1+r)^{-t}$$

The [[Internal Rate of Return|internal rate of return]], [[Profit Margin|profit margin]] and [[Discounted Payback Period|discounted payback period]] are also read from the signature.

> [!example]- What are the profit signature and NPV of this term insurance? {Example}
> A 5-year term insurance on $(60)$ has the profit vector $(-250,\ 90.59,\ 90.45,\ 93.33,\ 89.97,\ 91.30)$, worked out in [[Profit Testing]]. Mortality follows the SULT at $5\%$, so ${}_{t-1}p_{60}$ for $t = 1$ to $5$ is $1$, $0.996602$, $0.992823$, $0.988619$ and $0.983943$. The risk discount rate is $10\%$.
>
> > [!answer]-
> > - $\Pi_0 = -250$ and $\Pi_1 = 90.59$, since every policy is in force at the start of year 1.
> > - $\Pi_2 = 0.996602(90.45) = 90.14$ and $\Pi_3 = 0.992823(93.33) = 92.66$.
> > - $\Pi_4 = 0.988619(89.97) = 88.95$ and $\Pi_5 = 0.983943(91.30) = 89.83$.
> > - Discounted at $10\%$, the entries after time 0 are $82.35$, $74.50$, $69.62$, $60.75$ and $55.78$, which sum to $343.00$.
> > - The NPV is $343.00 - 250 = 93.00$.
> > - Discounting the profit vector instead gives $95.37$, which overstates the NPV by $2.37$ because it counts the profit of policies that have already ended in a death.

## Shape of the signature

A typical signature is negative at time 0, because of the expenses paid at issue, and positive afterward. A lower probability of staying in force gives the later, positive entries less weight against the loss at time 0, so the NPV falls. Reserves move profit later, and a signature that turns negative again after it has turned positive can have more than one internal rate of return.

> [!trap] Using ${}_tp_x$ instead of ${}_{t-1}p_x$
> $\Pi_t$ uses ${}_{t-1}p_x$, the probability of being in force at the start of year $t$, because $\mathrm{Pr}_t$ already allows for deaths during the year. Using ${}_tp_x$ removes the year's deaths twice.
