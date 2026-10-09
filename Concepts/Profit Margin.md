---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cecd579bee969b01056db511a995a821dade9783fd568fb2b01cddcd1bac9f59
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Margin.md
---

**The Profit Margin** of a policy is its [[Net Present Value|net present value]] divided by the expected present value of its premiums, both calculated at the risk discount rate. It expresses the profit from a [[Profit Testing|profit test]] per unit of premium income, so that policies of different sizes, terms and premium patterns can be compared on one scale.

> $$\text{Profit margin} = \frac{\text{NPV}}{\text{EPV of premiums}}$$

> $$\text{EPV of premiums} = \sum_{t=0}^{n-1} P\,{}_tp_x\,(1+r)^{-t}$$

- **Symbols:** Following Dickson, Hardy & Waters, the NPV is the present value of the [[Profit Signature|profit signature]] at the risk discount rate $r$, $P$ is the premium paid at the start of each year while the policy is in force, and ${}_tp_x$ is the probability that the policy is in force at time $t$. For a level premium, the denominator is $P\,\ddot{a}_{x:\overline{n}|}$ calculated at rate $r$, and with [[Lapse|lapses]] the survival factor allows for every decrement.
- **What it says:** A profit margin of 5% means that the shareholders expect to gain 5 cents of present value for every dollar of premium the policy brings in. The margin has the same sign as the NPV, but unlike the NPV it does not grow with the size of the policy.
- **Against the other measures:** The margin always exists, while an [[Internal Rate of Return|internal rate of return]] may not, but its value depends on the choice of $r$. The NPV, IRR, margin and [[Discounted Payback Period|discounted payback period]] are usually reported together.
- **Setting a premium:** A target margin $m$ fixes the premium through $\text{NPV}(P) = m\,P\,\ddot{a}_{x:\overline{n}|}$ at rate $r$. When the reserves do not depend on the premium, both sides are linear in $P$ and the equation has a single solution.

> [!example]- Profit Margin of a 5-Year Term Insurance {Example}
> A 5-year term insurance on $(60)$ has a premium of \$500 a year and an NPV of 93.00 at a risk discount rate of 10%, as found in [[Profit Testing]]. Mortality follows the SULT at 5%, so ${}_tp_{60}$ for $t = 1$ to $4$ is $0.996602$, $0.992823$, $0.988619$ and $0.983943$. Find the profit margin.
>
> > [!answer]-
> > The premium paid at time $t$ is discounted at 10% and weighted by the probability that the policy is still in force to pay it.
> > $$
> > \begin{align*}
> > \text{EPV} &= 500\Big(1 + \tfrac{0.996602}{1.1} + \tfrac{0.992823}{1.1^2} \\
> > &\qquad + \tfrac{0.988619}{1.1^3} + \tfrac{0.983943}{1.1^4}\Big) \\
> > &= 500(1 + 0.906002 + 0.820515 + 0.742764 + 0.672046) \\
> > &= 500(4.141327) \\
> > &= 2{,}070.66 \\
> > \text{Profit margin} &= \frac{93.00}{2{,}070.66} \\
> > &= 4.49\%
> > \end{align*}
> > $$
> > The policy earns about 4.5 cents of present value for every dollar of premium, measured at the shareholders' required rate of 10%.

> [!example]- The Premium That Gives a 10% Profit Margin {Example}
> For the same policy, each extra dollar of premium raises the NPV at 10% by 3.8710, because each year's profit rises by $0.97(1.06) = 1.0282$ in proportion to the policies in force. The reserves do not depend on the premium. Find the premium that gives a profit margin of 10%.
>
> > [!answer]-
> > The NPV is $93.00 + 3.8710(P - 500)$, and the EPV of premiums is $4.1413\,P$. Setting the NPV equal to 10% of the EPV gives a linear equation in $P$.
> > $$
> > \begin{align*}
> > 93.00 + 3.8710(P - 500) &= 0.41413\,P \\
> > 3.8710\,P - 0.41413\,P &= 1{,}935.50 - 93.00 \\
> > 3.45687\,P &= 1{,}842.50 \\
> > P &= 533.00
> > \end{align*}
> > $$
> > Check: at \$533.00, the NPV is $93.00 + 3.8710(33.00) = 220.74$ and the EPV of premiums is $533.00(4.1413) = 2{,}207.31$, a ratio of 10.0%. Raising the premium by \$33 more than doubles the NPV, because almost all of the extra premium is profit.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate the profit margin alongside the NPV, IRR and discounted payback period of a profit test, for traditional, [[Universal Life Insurance|universal life]] and [[Equity-Linked Insurance|equity-linked]] policies.
> - **Premium from a target:** The Profit Analysis objectives also ask for premiums based on a specified profit objective, and a target profit margin is one such objective.
> - **Comparisons:** A question may compare the margin under best-estimate and stress-test assumptions, or for two premium levels.

> [!warning]- Exam traps
> - **The rate in the denominator:** The EPV of premiums is taken at the risk discount rate $r$, the same rate as the NPV. Valuing the premiums at the earned rate or the reserve rate mixes two bases in one ratio.
> - **Premiums in advance:** Premiums are paid at times $0$ to $n-1$, so the first premium is not discounted and the last is weighted by ${}_{n-1}p_x$. Shifting them to the ends of the years understates the denominator.
> - **Survival in the denominator:** A premium is received only from a policy still in force. Using $P\,\ddot{a}_{\overline{n}|}$ without the survival factor overstates the premiums and understates the margin.
> - **The right numerator:** The numerator is the NPV of the profit signature, not the NPV of premiums less benefits. Expenses and reserves must already be in it.
