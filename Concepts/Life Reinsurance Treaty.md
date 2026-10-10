---
aliases:
  - Reinsurance Agreement Provision
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5ce4153b2c2a92d99644078b947505c1b1ef30a3a65d287fd3ec9248427b66e2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Reinsurance Treaty.md
---
A **Life Reinsurance Treaty** is the written agreement between a ceding company and a reinsurer that governs a life reinsurance arrangement: which policies are covered and how they are ceded, what the reinsurer is paid and pays back, how the business is administered, and how the arrangement changes or ends. Its provisions turn the commercial deal into enforceable terms. For the cedant to take statutory credit, they must also meet the regulators' [[Risk Transfer|risk transfer]] requirements, which forbid terms that return the risk to the cedant.

> $$\text{RA} = \min\bigl(F,\ L_{\text{new}}\bigr) - \min\bigl(F,\ L_{\text{old}}\bigr)$$

> $$\text{ER} = p \times \max\bigl(0,\ \Pi - A - X - E - \text{LCF}\bigr)$$

- **Symbols:** In the recapture formula, $F$ is the policy's face, $L_{\text{old}}$ and $L_{\text{new}}$ the cedant's retention limits when the policy was issued and after the increase, and $\text{RA}$ the amount the cedant may take back. In the experience refund, $p$ is the refund percentage, $\Pi$ the reinsurance premiums, $A$ the allowances, $X$ the claims, $E$ the reinsurer's agreed charge for expenses and risk, and $\text{LCF}$ any loss carried forward from earlier periods.
- **Parties and scope:** The treaty names the cedant and reinsurer and the effective date, and lists the plans, issue ages, underwriting classes and territory covered. It states the plan of reinsurance, such as [[Reinsurance Transaction|YRT, coinsurance or modco]], and that the reinsurer's liability begins and ends with the cedant's.
- **Automatic and facultative terms:** The cedant's retention schedule decides what is ceded. Business within the automatic binding limit and jumbo limit, underwritten to the cedant's standards, binds the reinsurer without review. Anything else is submitted [[Facultative Reinsurance|facultatively]], and the treaty sets how offers are made, accepted and how long they stay open.
- **Premiums and allowances:** A rate schedule, or the original premium less allowances for coinsurance, sets the reinsurance premium. The treaty fixes the due dates and the grace period, and what happens when premiums go unpaid. YRT rates are usually not guaranteed, and the reinsurer's right to raise them is a negotiated term.
- **Reporting and claims:** The treaty sets the administration method and the reports, as described under [[Reinsurance Administration]]. Its claims clause covers notice, proof, contested claims, the sharing of claim expenses and of extra-contractual damages.
- **Recapture:** Recapture lets the cedant take back reinsured business, usually only when it raises its retention and only after the policy has been reinsured for a stated number of years. It generally applies to all eligible policies alike. Under YRT nothing is paid on recapture, while under coinsurance the reinsurer returns assets equal to its share of the reserve.
- **Insolvency, offset and arbitration:** The insolvency clause makes the reinsurer pay the cedant's liquidator without reduction for the cedant's insolvency, which U.S. regulators require for credit. The offset clause lets mutual balances be netted, and the arbitration clause sends disputes to arbitration instead of the courts.
- **Errors and omissions:** An oversight by either party does not void coverage. The parties are restored to the position they would have held without the error.
- **Experience refund and termination:** Some treaties return part of the reinsurer's profit, with losses carried forward against later refunds. Either party can usually end the treaty for new business on notice, while business already ceded stays reinsured until it runs off or is recaptured.
- **Risk transfer limits:** Under statutory accounting (SSAP 61R and its Appendix A-791), the cedant gets no credit if the treaty requires it to reimburse the reinsurer's losses, to recapture, or to give up surplus at the reinsurer's option. The reinsurer must also take on the risks that are significant for the product. The American Academy of Actuaries' risk transfer practice note discusses how actuaries apply these rules, so experience refunds, recapture and termination terms are written with them in mind.

> [!example]- Recapture Date and Value Under a YRT Treaty {Example}
> A \$3,000,000 policy was issued on March 1, 2014, when the cedant's retention was \$1,000,000, and the excess \$2,000,000 was ceded on a YRT basis. The cedant raises its retention to \$2,000,000 effective January 1, 2022. The treaty allows recapture, up to the new retention, on the first policy anniversary after the policy has been reinsured for 10 years. At that anniversary, the cedant's reserve on the recaptured amount is \$20 per \$1,000, the YRT rate is \$3.10 per \$1,000 of net amount at risk, and the cedant's expected mortality cost is \$2.60 per \$1,000. Find the recapture date, the amount recaptured and the value to the cedant in the first year after recapture.
>
> > [!answer]-
> > Ten years of reinsurance are complete on March 1, 2024, which is a policy anniversary, so that is the recapture date.
> > $$
> > \begin{align*}
> > \text{RA} &= \min(3{,}000{,}000,\ 2{,}000{,}000) - \min(3{,}000{,}000,\ 1{,}000{,}000) \\
> > &= 1{,}000{,}000 \\
> > \text{NAR} &= 1{,}000{,}000 - 1{,}000 \times 20 \\
> > &= 980{,}000 \\
> > \text{Value} &= 980 \times (3.10 - 2.60) \\
> > &= 490
> > \end{align*}
> > $$
> > The cessions fall to \$1,000,000 and no payment changes hands, because a YRT reinsurer holds no reserve. The cedant saves \$490 of expected cost in the first year, and takes on the mortality volatility of the extra \$1,000,000. Across a block, the decision turns on whether the saving is worth that volatility.

> [!example]- Experience Refund With a Loss Carryforward {Example}
> A treaty refunds 50% of the reinsurer's profit after a charge of 10% of premiums for expenses and risk, with losses carried forward. This year's premiums are \$1,000,000, with no allowances, and claims are \$700,000. A loss of \$50,000 is carried forward from last year. Find the refund, and the refund if claims had been \$920,000.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{ER} &= 0.50 \times \max(0,\ 1{,}000{,}000 - 700{,}000 - 100{,}000 - 50{,}000) \\
> > &= 75{,}000 \\
> > \text{ER}' &= 0.50 \times \max(0,\ 1{,}000{,}000 - 920{,}000 - 100{,}000 - 50{,}000) \\
> > &= 0
> > \end{align*}
> > $$
> > With the higher claims there is no refund, and \$70,000 is carried forward. The refund never makes the cedant pay the reinsurer, which is what keeps it consistent with risk transfer.

> [!tip]- How it appears on the exam
> - **CP-341:** Questions ask for the elements of a reinsurance treaty and what each provision does, with emphasis on recapture, insolvency, offset and errors and omissions. A case may give treaty terms and a change in retention, and ask when recapture is allowed, how much, and what changes hands.
> - **Risk transfer:** Questions ask how risk transfer requirements limit provisions such as experience refunds, recapture terms and loss carryforwards, and whether a described treaty would earn credit.

> [!warning]- Exam traps
> - **Recapture is optional and limited:** The cedant may recapture only after the waiting period and only up to its new retention. A treaty that forces recapture fails the risk transfer test.
> - **YRT versus coinsurance recapture:** Under YRT nothing changes hands on recapture. Under coinsurance the reinsurer returns assets equal to its reserve, so treating the two alike misstates the cedant's balance sheet.
> - **Loss carryforwards cap at zero:** An experience refund is never negative. A loss is carried into later years rather than billed to the cedant, since billing it would return the risk.
> - **Insolvency clause direction:** The clause protects the cedant's estate when the cedant is insolvent, by making the reinsurer pay the liquidator in full. It does not protect the cedant against the reinsurer's insolvency.
