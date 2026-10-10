---
aliases:
  - Inforce
  - Active In-Force
  - Fundamental Strategy
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4e50b258d064017c761fb7b5fa20d2fbdaf138efb9c4677c4277a1cd334f1110
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/In-Force Management.md
---
**In-Force Management** is the active management of a block of life insurance or annuity policies after they are sold, to protect and add to the value it holds for the insurer. The block's value is its value of in-force in the [[Embedded Value|embedded value]], and in-force management changes that value through non-guaranteed elements, offers made to policyholders, [[Reinsurance Transaction|reinsurance]], expense and administration, and an understanding of how policyholders behave. Each action is judged by the value it adds after its cost, and against the policyholders' reasonable expectations and the contract terms.

> $$\Delta V = \text{VIF}_{\text{after}} - \text{VIF}_{\text{before}} - C$$

> $$\Delta V_{\text{offer}} = n_{\text{acc}}\left(\bar{L}_{\text{acc}} - O\right) - C$$

- **Symbols:** $\text{VIF}_{\text{before}}$ and $\text{VIF}_{\text{after}}$ are the value of the [[In-Force|in-force]] block without and with the action, on the same assumptions and risk discount rate, and $C$ is the one-time cost of the action, such as a campaign, a system conversion or a reinsurance fee. In the second block, $n_{\text{acc}}$ is the number of policyholders expected to accept an offer, $\bar{L}_{\text{acc}}$ is the average value to the insurer of the liability each of them gives up, and $O$ is the amount offered for it.
- **Non-guaranteed elements:** Many products let the insurer change cost of insurance charges, crediting rates, expense charges or [[Policyholder Dividend|policyholder dividends]] within the guarantees. A change must follow the contract, the company's own determination policy and the regulator's rules, and it is justified by a change in the anticipated experience, not by a wish to recoup past losses. Lowering a crediting rate raises the spread but can raise [[Lapse|lapses]], so the change is tested with a dynamic lapse assumption.
- **Offers to policyholders:** A conversion offer or buyback gives policyholders a reason to exchange or surrender a costly benefit, such as a [[Guaranteed Minimum Withdrawal Benefit|guaranteed withdrawal benefit]] or a high guaranteed rate. Acceptance is voluntary, so the policyholders who accept are the ones for whom the benefit is worth least, and the offer is priced on their liability, not on the block average.
- **Reinsurance and capital:** New reinsurance, the recapture of an old treaty, or the sale of a closed block can release capital, transfer a risk the company no longer wants, or move the block to a company that can run it more cheaply. The value comes through lower required capital or lower risk, and it is set against the reinsurer's margin.
- **Expenses and administration:** Unit costs rise as a closed block shrinks, because the fixed costs of systems and staff are spread over fewer policies. Consolidating administration systems, outsourcing to a third-party administrator and cleaning up policy data lower the maintenance expense per policy for the rest of the block's life.
- **Behaviour analytics:** [[Predictive Analytics|Predictive models]] of lapse, premium payment, conversion and option use, fitted to [[Experience Study|experience studies]], identify which policyholders are likely to act and why. They let the company target retention campaigns at profitable policies at risk of lapsing, and they refine the assumptions behind every other action.
- **Governance:** Fundamental strategies are documented in an in-force management framework that sets the value measure, the approval process and the policyholder-fairness checks. The aim is to manage the block deliberately rather than leave it to run off on its pricing assumptions.

> [!example]- Pricing a Buyout Offer on a Guarantee {Example}
> A block of 10,000 variable annuities carries a guaranteed withdrawal benefit. On the company's economic basis, the liability per policy, including the guarantee, averages \$118,000. The company offers each policyholder \$106,000 to surrender, and it expects 25% to accept. Because policyholders whose guarantee is deep in the money tend to keep it, the liability of those who accept is expected to average only \$112,000. The campaign costs \$400,000. Find the value the offer adds.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > n_{\text{acc}} &= 0.25(10{,}000) \\
> > &= 2{,}500 \\
> > \Delta V_{\text{offer}} &= 2{,}500(112{,}000 - 106{,}000) - 400{,}000 \\
> > &= 15{,}000{,}000 - 400{,}000 \\
> > &= 14{,}600{,}000
> > \end{align*}
> > $$
> > The offer adds \$14.6 million, and it also releases the capital and hedging cost of the surrendered guarantees. Using the block average of \$118,000 would have given \$29.6 million, twice the realistic figure, because it ignores the selection in who accepts. An offer above \$112,000 would destroy value even though it is still below the average liability.

> [!example]- An Administration Conversion {Example}
> A closed block of 50,000 policies has a maintenance expense of \$80 per policy per year. Moving it to a new administration platform costs \$3,000,000 now and lowers the expense to \$65. At the risk discount rate, with the block's mortality and lapses, the present value of 1 a year per policy now in force is an illustrative 6.2. Is the conversion worth doing?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PV of savings} &= 50{,}000(80 - 65)(6.2) \\
> > &= 4{,}650{,}000 \\
> > \Delta V &= 4{,}650{,}000 - 3{,}000{,}000 \\
> > &= 1{,}650{,}000
> > \end{align*}
> > $$
> > The conversion adds \$1.65 million. It breaks even at an annuity factor of $3{,}000{,}000 / (50{,}000 \times 15) = 4.0$, so it fails if the block runs off much faster than assumed. Delaying the project also shrinks the factor, which is why such conversions are worth most early in a block's run-off.

> [!tip]- How it appears on the exam
> - **ILA-201I and ILA-201U:** Questions ask candidates to describe and evaluate fundamental strategies for enhancing value and profitability through active in-force and operational management. A case gives a block with its products, experience and constraints, and the candidate recommends actions, such as a non-guaranteed element change, a buyout or conversion offer, reinsurance or an expense initiative, and justifies them by their effect on value and on policyholders.
> - **Calculation parts:** Short calculations of the value an action adds, its break-even point or its effect on lapse and profit support the written recommendation.

> [!warning]- Exam traps
> - **Selection in offers:** Policyholders accept an offer when it is good for them. Valuing a buyout on the average policy rather than on those expected to accept overstates its value.
> - **Contract and fairness limits:** A non-guaranteed element can be changed only within the guarantees and the company's documented policy, and for reasons related to anticipated experience. A recommendation that ignores these limits, or recoups past losses, will not be accepted.
> - **Second-order effects:** Raising a charge or cutting a crediting rate changes lapse behaviour, and the policyholders who stay are often the less healthy or those whose guarantees are most valuable. The value of the action has to include that shift.
> - **Same basis:** The before and after values must use the same assumptions and discount rate, apart from what the action changes. Changing the basis at the same time mixes an assumption change into the value of the action.
