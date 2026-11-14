---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2923ce149a8a47547df57d708a016b626a776612c145e9c3e6bc5097cc77000d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Margin.md
---

The **Profit Margin** of a policy is its [[Net Present Value|net present value]] (NPV) divided by the expected present value (EPV) of its premiums, both calculated at the risk discount rate. It expresses the profit from a [[Profit Testing|profit test]] per unit of premium income, so that policies of different sizes, terms and premium patterns can be compared on one scale. The profit margin is

> $$\text{Profit margin} = \frac{\text{NPV}}{\text{EPV of premiums}}$$

- The NPV is the present value of the [[Profit Signature|profit signature]], so expenses and reserves are already in it.

For a premium $P$ paid at the start of each year while a policy issued at age $x$ is in force, the EPV of premiums at the risk discount rate $r$ is

> $$\text{EPV of premiums} = \sum_{t=0}^{n-1} P\,{}_tp_x\,(1+r)^{-t}$$

- ${}_tp_x$ is the probability that the policy is in force at time $t$, allowing for every decrement, including [[Lapse|lapses]].
- The first premium, at time 0, is not discounted, and the last is weighted by ${}_{n-1}p_x$.

A premium is received only from a policy still in force. For a level premium the EPV is $P\,\ddot{a}_{x:\overline{n}|}$ at rate $r$, and using $P\,\ddot{a}_{\overline{n}|}$ without the survival factor overstates the premiums and understates the margin.

A profit margin of $5\%$ means that the shareholders expect to gain 5 cents of present value for every dollar of premium the policy brings in. The margin has the same sign as the NPV, but unlike the NPV it does not grow with the size of the policy. It always exists, while an [[Internal Rate of Return|internal rate of return]] may not, but its value depends on the choice of $r$. The NPV, IRR, margin and [[Discounted Payback Period|discounted payback period]] are usually reported together.

> [!example]- What is the profit margin of this term insurance? {Example}
> A 5-year term insurance on $(60)$ has a premium of $\$500$ a year and an NPV of $93.00$ at a risk discount rate of $10\%$, as found in [[Profit Testing]]. Mortality follows the SULT at $5\%$, so ${}_tp_{60}$ for $t = 1$ to $4$ is $0.996602$, $0.992823$, $0.988619$ and $0.983943$.
>
> > [!answer]-
> > - Each premium is weighted by the probability that the policy is in force to pay it and discounted at $10\%$.
> > - The weighted, discounted factors for $t = 0$ to $4$ are $1$, $0.906002$, $0.820515$, $0.742764$ and $0.672046$, which sum to $4.141327$.
> > - The EPV of premiums is $500(4.141327) = 2{,}070.66$.
> > - The profit margin is $93.00/2{,}070.66 = 4.49\%$.

## Premium for a target margin

A target margin $m$ fixes the premium through

> $$\text{NPV}(P) = m\,P\,\ddot{a}_{x:\overline{n}|}$$

- $\text{NPV}(P)$ is the NPV at rate $r$ when the premium is $P$, and $\ddot{a}_{x:\overline{n}|}$ is also at rate $r$.

When the reserves do not depend on the premium, both sides are linear in $P$ and the equation has a single solution.

> [!example]- What premium gives the term insurance a profit margin of 10%? {Example}
> Each extra dollar of premium raises the NPV at $10\%$ by $3.8710$, and the reserves do not depend on the premium.
>
> > [!answer]-
> > - The NPV is $93.00 + 3.8710(P - 500)$, and the EPV of premiums is $4.1413\,P$.
> > - Setting the NPV equal to $10\%$ of the EPV gives $93.00 + 3.8710(P - 500) = 0.41413\,P$.
> > - So $3.45687\,P = 1{,}842.50$ and $P = \$533.00$.
> > - Check: the NPV is $93.00 + 3.8710(33.00) = 220.74$ and the EPV of premiums is $2{,}207.31$, a ratio of $10.0\%$.

> [!trap] Valuing the premiums at a different rate from the NPV
> The EPV of premiums is taken at the risk discount rate $r$, the same rate as the NPV. Valuing the premiums at the earned rate or the reserve rate mixes two bases in one ratio.
