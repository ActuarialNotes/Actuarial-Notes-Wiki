---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:182c46217d5a2a96460c2aafd44ad3e538071615a00d5a178a12431d42ce484c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Policy.md
---

**An insurance policy** is the contract under which an [[Insurer|insurer]] promises, in exchange for [[Insurance Premium|premium]], to pay covered losses or provide specified benefits arising during the policy period, subject to the policy's terms. The terms turn a ground-up loss $X$ into the insurer's payment $Y = g(X)$, and the price is built on that payment.

> $$\text{Premium} = E[Y] + \text{Expenses} + \text{Risk Load}$$

- **Anatomy.** A policy has declarations (the insured, the property or activity covered, limits, period and premium), an insuring agreement, definitions, exclusions, conditions (notice, cooperation, proof of loss, cancellation) and endorsements. The payment function $g$ comes from the [[Deductible|deductible]], the limits and any [[Coinsurance|coinsurance]] ([[Policy Information]]).
- **Policy period.** Coverage runs from the effective date to **expiration**. Premium is [[Earned Premium|earned]] over the term. Losses attach to the policy through an [[Occurrence Coverage|occurrence]] or [[Claims Made Coverage|claims-made]] trigger, and [[Policy Year|policy-year]] data group policies by their inception date.
- **After expiration (Exam 8).** A guaranteed-cost policy's premium is fixed at inception, except for a [[Premium Audit|premium audit]] of the exposure. Under a [[Loss Sensitive Rating|loss-sensitive]] plan the premium keeps moving. A [[Retrospective Rating|retrospectively rated]] policy is re-rated on the insured's own developing losses, within a minimum and a maximum. Under the NCCI plan the first computation comes six months after expiration, with further ones annually.
- **Canadian law (Exam 6C).** The policy is a contract of utmost good faith ([[Duty of Good Faith]]), and courts read it with coverage grants broadly, exclusions narrowly, and genuine ambiguity against the insurer that drafted it. Provincial [[Insurance Legislation|Insurance Acts]] deem statutory conditions into certain policies, and those conditions can't be varied to the insured's detriment. For auto, the accident benefits themselves are set by statute and regulation ([[Statutory Accident Benefits]]).
- **Pricing (Exam 9).** Under [[Risk-Adjusted Pricing|risk-adjusted pricing]], the risk load depends on how much capital the policy uses up *in the portfolio* and on the [[Cost of Capital|cost of that capital]]. Two policies with the same expected loss can therefore justify different prices ([[Insurance Pricing]]).

> [!example]- A Retro Policy Re-Rated After Expiration {Example}
> A one-year workers compensation policy is written on a retrospective plan with basic premium $\$30{,}000$, loss conversion factor $1.10$, tax multiplier $1.04$, minimum $\$80{,}000$ and maximum $\$200{,}000$. The insured paid a $\$125{,}000$ deposit at inception. Losses valued six months after expiration are $\$70{,}000$. A year later they have developed to $\$150{,}000$.
>
> Find the retrospective premium and the premium returned or charged at each adjustment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > R_1 &= (30{,}000 + 1.10 \times 70{,}000) \times 1.04 \\
> > &= 107{,}000 \times 1.04 \\
> > &= 111{,}280
> > \end{align*}
> > $$
> >
> > $R_1$ falls between the minimum and maximum, so the insurer **returns** $125{,}000 - 111{,}280 = \$13{,}720$.
> >
> > $$
> > \begin{align*}
> > R_2 &= (30{,}000 + 1.10 \times 150{,}000) \times 1.04 \\
> > &= 195{,}000 \times 1.04 \\
> > &= 202{,}800
> > \end{align*}
> > $$
> >
> > This is above the maximum, so the premium is capped at $\$200{,}000$ and the insurer **charges** $200{,}000 - 111{,}280 = \$88{,}720$.
> >
> > The policy expired more than a year earlier and its premium is still moving. The insurer carries credit risk on that additional premium, and the maximum has transferred the last $\$2{,}800$ of the insured's cost to the insurer.

> [!example]- Same Expected Loss, Different Price {Example}
> Two policies each have expected loss $\$800$ and expenses $\$150$. Policy A adds $\$1{,}000$ of required capital to the portfolio. Policy B sits in a catastrophe-exposed zone and adds $\$2{,}000$. Capital earns $3\%$ investment income, and the insurer targets a $10\%$ return on allocated capital. Use one period and ignore taxes and investment income on premium.
>
> Price both policies.
>
> > [!answer]-
> > Set the expected return on allocated capital $Q$ equal to the target:
> >
> > $$
> > \begin{align*}
> > \frac{P - 800 - 150 + 0.03\,Q}{Q} &= 0.10 \\
> > P &= 950 + (0.10 - 0.03)\,Q \\
> > &= 950 + 0.07\,Q
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > P_A &= 950 + 70 \\
> > &= \$1{,}020 \\[4pt]
> > P_B &= 950 + 140 \\
> > &= \$1{,}090
> > \end{align*}
> > $$
> >
> > The margin is the cost of the capital each policy uses: $7$ cents a year per dollar, the gap between the required return and what the capital earns. Policy B costs more because it adds more to the portfolio's tail. Its expected loss is the same as A's.
