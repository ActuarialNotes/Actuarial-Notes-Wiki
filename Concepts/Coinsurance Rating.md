---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2b27ecadaf7b4cb154cf3580b5460a8bf42336a00cc06755ca83c7ee4418d7a1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coinsurance Rating.md
---

**Coinsurance Rating** prices the two distinct provisions that go by the name *coinsurance*: the **percentage participation** under which the insured shares each covered loss, and the property **coinsurance clause**, which penalizes an insured who carries limits below a required percentage of value.

> $$\text{Loss Cost}_{\text{participation}} = c \times \text{Full-Coverage Loss Cost}$$

> $$\text{Recovery}_{\text{clause}} = \min\!\left(\frac{\text{Insurance Carried}}{\text{Coinsurance \% } \times \text{Value}},\, 1\right) \times \text{Loss}$$

**Percentage participation** (an $80/20$ plan, common in health and some property covers): the insurer pays share $c$ of every covered dollar above any deductible.

- Because the insurer's share is a constant fraction of each loss, the loss cost scales directly by $c$ — unlike a [[Deductible Rating|deductible]], which removes small losses entirely and so requires a [[Loss Elimination Ratio|loss elimination ratio]] rather than a simple proportion.
- The saving is slightly less than $(1-c)$ in practice, because the insurer still investigates and adjusts the whole claim: claim-handling cost does not fall with the payment share, and [[Fixed Expenses|fixed expenses]] do not fall at all.

**Coinsurance clause** (standard commercial property): the insured agrees to carry limits of at least, say, $80\%$ of the property's value. Fall short and every partial loss is settled at the ratio of insurance carried to insurance required.

- Its purpose is **insurance-to-value**. Because most property losses are partial, an insured carrying $50\%$ of value would otherwise pay half the premium for nearly the same expected recovery, and the rate per $\$1{,}000$ would have to rise for everyone.
- The clause applies only up to the policy limit, and full limits are still paid on total losses up to that limit.
- The insurer's exposure to the clause is itself a rating consideration: books with poor insurance-to-value discipline show higher loss ratios per $\$1{,}000$ of stated value, which is [[Mix of Business|mix]], not cost.

![[Media/Figures/Coinsurance_Rating.svg|340]]

> [!example]- Pricing a Participation Plan {Example}
> A full-coverage plan has a manual rate of $\$1{,}200$ a year, of which $\$780$ is loss cost, $\$120$ fixed expenses, with variable expenses of $20\%$ and profit $5\%$. The insurer offers an $80/20$ plan.
>
> Price the coinsurance option.
>
> > [!answer]-
> > The loss cost falls to $80\%$; expenses do not:
> >
> > $$\begin{align*}
> > \text{Loss cost} &= 0.80 \times \$780 = \$624 \\[4pt]
> > \text{Rate} &= \frac{\$624 + \$120}{1 - 0.20 - 0.05} \\
> > &= \frac{\$744}{0.75} \\
> > &= \$992
> > \end{align*}$$
> >
> > The rate falls $17.3\%$, not $20\%$ — the $\$120$ of fixed expense is unchanged, so a $20\%$ cut in losses buys less than a $20\%$ cut in premium.
> >
> > Crediting the full $20\%$ ($\$960$) would leave the fixed expenses under-funded on every coinsurance policy, and the shortfall grows as the participation share falls.

> [!example]- The Coinsurance Clause in Action {Example}
> A commercial building is worth $\$1{,}000{,}000$. The policy carries a $\$600{,}000$ limit with an $80\%$ coinsurance clause. A fire causes $\$200{,}000$ of damage.
>
> What does the insurer pay?
>
> > [!answer]-
> > Insurance **required** is $80\%$ of value:
> >
> > $$0.80 \times \$1{,}000{,}000 = \$800{,}000$$
> >
> > Insurance carried is $\$600{,}000$, so the coinsurance ratio is
> >
> > $$\frac{\$600{,}000}{\$800{,}000} = 0.75$$
> >
> > $$\text{Recovery} = 0.75 \times \$200{,}000 = \$150{,}000$$
> >
> > The insured absorbs $\$50{,}000$ — a penalty for under-insurance, not a deductible.
> >
> > The pricing logic behind the clause: had the insured carried the required $\$800{,}000$, it would have paid $33\%$ more premium for a recovery on this claim that is only $33\%$ larger. Without the clause, under-insuring would be free money on partial losses, and the rate per $\$1{,}000$ of stated value would have to be set as though every policy were under-insured.
