---
aliases:
  - Reinsurance Agreement Provision
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1f7962071c9c77e6c64f6ecba58fa2a841a576427b80714db6c0322464f33e83
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Reinsurance Treaty.md
---
A **Life Reinsurance Treaty** is the written agreement between a ceding company and a reinsurer that governs a life reinsurance arrangement: which policies are covered and how they are ceded, what the reinsurer is paid and pays back, how the business is administered, and how the arrangement changes or ends. Its provisions turn the commercial deal into enforceable terms, and for the cedant to take statutory credit they must also meet the regulators' [[Risk Transfer|risk transfer]] requirements.

The main provisions are:

| Provision | What it sets |
| :--- | :--- |
| Parties and scope | The cedant, the reinsurer, the effective date, and the plans, issue ages, underwriting classes and territory covered. It states the plan of reinsurance, such as YRT, coinsurance or modco, and that the reinsurer's liability begins and ends with the cedant's. |
| Automatic and facultative terms | Business within the automatic binding limit and jumbo limit, underwritten to the cedant's standards, binds the reinsurer without review. Anything else is submitted facultatively, and the treaty sets how offers are made and accepted and how long they stay open. |
| Premiums and allowances | A rate schedule, or the original premium less allowances for coinsurance, with due dates, a grace period and what happens when premiums go unpaid. YRT rates are usually not guaranteed, and the reinsurer's right to raise them is a negotiated term. |
| Reporting and claims | The administration method and reports, as described under [[Reinsurance Administration]]. Claims notice, proof, contested claims, and the sharing of claim expenses and of extra-contractual damages. |
| Recapture | When the cedant may take back reinsured business. |
| Insolvency | The reinsurer pays the cedant's liquidator without reduction for the cedant's insolvency. U.S. regulators require it for credit. |
| Offset | Mutual balances may be netted. |
| Arbitration | Disputes go to arbitration instead of the courts. |
| Errors and omissions | An oversight by either party does not void coverage. The parties are restored to the position they would have held without the error. |
| Experience refund | Part of the reinsurer's profit is returned, with losses carried forward against later refunds. |
| Termination | Either party can usually end the treaty for new business on notice. Business already ceded stays reinsured until it runs off or is recaptured. |

The plan of reinsurance is one of the [[Reinsurance Transaction|reinsurance forms]], and a case outside the automatic terms is placed as [[Facultative Reinsurance|facultative reinsurance]].

## Recapture

Recapture lets the cedant take back reinsured business, usually only when it raises its retention and only after the policy has been reinsured for a stated number of years. It generally applies to all eligible policies alike. When the cedant raises its retention from $L_{\text{old}}$ to $L_{\text{new}}$, the amount it may recapture on a policy of face $F$ is

> $$\text{RA} = \min\bigl(F,\ L_{\text{new}}\bigr) - \min\bigl(F,\ L_{\text{old}}\bigr)$$

Under YRT nothing is paid on recapture, because a YRT reinsurer holds no reserve. Under coinsurance the reinsurer returns assets equal to its share of the reserve.

> [!example]- When can this policy be recaptured, how much is recaptured, and what is it worth to the cedant in the first year? {Example}
> A $\$3{,}000{,}000$ policy was issued on March 1, 2014, when the cedant's retention was $\$1{,}000{,}000$, and the excess was ceded on a YRT basis. The cedant raises its retention to $\$2{,}000{,}000$ effective January 1, 2022. The treaty allows recapture, up to the new retention, on the first policy anniversary after the policy has been reinsured for 10 years. At that anniversary:
>
> | Item | Per $\$1{,}000$ |
> | :--- | ---: |
> | Cedant's reserve on the recaptured amount | 20.00 |
> | YRT rate, per $\$1{,}000$ of net amount at risk | 3.10 |
> | Cedant's expected mortality cost | 2.60 |
>
> > [!answer]-
> > - Ten years of reinsurance are complete on March 1, 2024, a policy anniversary, so that is the recapture date.
> > - The amount recaptured is $\min(3{,}000{,}000,\ 2{,}000{,}000) - \min(3{,}000{,}000,\ 1{,}000{,}000) = \$1{,}000{,}000$.
> > - No payment changes hands, because the treaty is YRT.
> > - The net amount at risk on the recaptured amount is $1{,}000{,}000 - 20 \times 1{,}000 = \$980{,}000$.
> > - The cedant saves $980 \times (3.10 - 2.60) = \$490$ of expected cost in the first year, and takes on the mortality volatility of the extra $\$1{,}000{,}000$.

## Experience refund

A treaty with refund percentage $p$ returns part of the reinsurer's profit, so the experience refund is

> $$\text{ER} = p \times \max\bigl(0,\ \Pi - A - X - E - \text{LCF}\bigr)$$

- $\Pi$ is the reinsurance premiums.
- $A$ is the allowances.
- $X$ is the claims.
- $E$ is the reinsurer's agreed charge for expenses and risk.
- $\text{LCF}$ is any loss carried forward from earlier periods.

An experience refund is never negative. A loss is carried into later years rather than billed to the cedant, since billing it would return the risk to the cedant.

> [!example]- What is this year's experience refund, and what would it be if claims were $\$920{,}000$? {Example}
> A treaty refunds 50% of the reinsurer's profit after a charge of 10% of premiums for expenses and risk, with losses carried forward. This year's premiums are $\$1{,}000{,}000$, with no allowances, and claims are $\$700{,}000$. A loss of $\$50{,}000$ is carried forward from last year.
>
> > [!answer]-
> > - The charge is $0.10 \times 1{,}000{,}000 = \$100{,}000$.
> > - The profit is $1{,}000{,}000 - 700{,}000 - 100{,}000 - 50{,}000 = \$150{,}000$, so the refund is $0.50 \times 150{,}000 = \$75{,}000$.
> > - With claims of $\$920{,}000$ the result is $1{,}000{,}000 - 920{,}000 - 100{,}000 - 50{,}000 = -\$70{,}000$.
> > - The refund is then $0$, and $\$70{,}000$ is carried forward.

## Risk transfer limits

Under statutory accounting (SSAP 61R and its Appendix A-791), the cedant gets no credit if the treaty requires it to reimburse the reinsurer's losses, to recapture, or to give up surplus at the reinsurer's option. The reinsurer must also take on the risks that are significant for the product. Recapture is therefore optional for the cedant, and a treaty that forces it fails the risk transfer test. The American Academy of Actuaries' risk transfer practice note discusses how actuaries apply these rules, so experience refunds, recapture and termination terms are written with them in mind.

> [!trap] Reading the insolvency clause the wrong way round
> The insolvency clause protects the cedant's estate when the cedant is insolvent, by making the reinsurer pay the liquidator in full. It does not protect the cedant against the reinsurer's insolvency.
