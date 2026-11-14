---
aliases:
  - Long Term Care
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ab2d1bbd3b9cba0da958383bfedd3b234b6ae4706c2c9cc5e66fd3522f702bf6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Long-Term Care Insurance.md
---
**Long-Term Care Insurance** (LTC) is insurance that pays for the personal care a person needs when they can no longer look after themselves because of chronic illness, frailty or cognitive decline, in a nursing facility, an assisted living facility or at home. Benefits start once the insured meets a benefit trigger and an elimination period has passed, and they are paid up to a daily or monthly maximum from a pool of money. It covers the cost of care rather than replacing income.

A claimant meets the benefit trigger in either of two ways:

1. They cannot perform a set number of activities of daily living (ADLs) without substantial help, usually two of bathing, dressing, eating, toileting, transferring and continence.
2. They have a severe cognitive impairment, such as dementia, that requires supervision.

The cognitive trigger matters because a person with dementia may be physically able to perform every ADL. The elimination period, counted in days of care, is a deductible measured in time.

## The pool of money and inflation protection

The pool of money is often sold as a maximum daily benefit times a benefit period, such as three years. It is used up only as benefits are paid, so a claimant whose care costs less than the maximum is covered for longer than the stated period. On day $t$ of a claim the policy pays

> $$\text{Paid}_t = \min(\text{Cost}_t,\ \text{DMB}_t,\ \text{Pool}_{t-1})$$

- $\text{Cost}_t$ is the cost of care incurred that day.
- $\text{DMB}_t$ is the daily maximum benefit.
- $\text{Pool}_{t-1}$ is the benefit left in the pool, which falls by each day's payment.

Claims often begin decades after purchase, when care costs much more than at issue. With compound inflation protection at rate $j$, the daily maximum $t$ years after issue is

> $$\text{DMB}_t = \text{DMB}_0\,(1 + j)^{t}$$

- $\text{DMB}_0$ is the daily maximum at issue.

Compound inflation protection usually grows the pool as well as the daily maximum. It keeps the maximum in step with costs but raises the premium a great deal. Simple increases, or offers to buy more coverage later, are cheaper alternatives that protect less.

> [!example]- What does this LTC policy pay at age 80, and how long does its pool last? {Example}
> At age 60, an insured buys a reimbursement policy with a $\$200$ daily maximum, a three-year benefit period and 5% compound inflation protection that applies to the maximum and the pool. At age 80, the insured enters a nursing facility costing $\$450$ a day. Ignore increases during the claim, and compare a policy with no inflation protection.
>
> > [!answer]-
> > - The pool at issue is $200 \times 1{,}095 = \$219{,}000$.
> > - After 20 years the daily maximum is $200\,(1.05)^{20} = \$530.66$.
> > - The pool has grown to $219{,}000\,(1.05)^{20} = \$581{,}072$.
> > - The cost of care is below the maximum, so the policy pays the full $\$450$ a day.
> > - The pool lasts $581{,}072/450 = 1{,}291$ days, about 3.5 years, longer than the three-year benefit period.
> > - Without inflation protection the policy pays only $\$200$ a day, and the insured pays the other $\$250$, 56% of the cost, from savings or with help from [[Medicaid]].

## Care settings and payment basis

Policies cover nursing facilities, assisted living, home care and adult day care, sometimes at different maximums. Reimbursement policies pay the actual cost up to the maximum. Indemnity or cash policies pay the maximum whatever is spent, which carries more [[Moral Hazard|moral hazard]].

## Pricing risks and rate increases

Premiums are usually level for life but not guaranteed, while claim costs rise steeply with age, so early premiums fund a large active life reserve, as in a [[Policy Value|policy value]]. The long gap between purchase and claim makes LTC one of the hardest long-duration [[Health Insurance|health contracts]] to price. Early products assumed many policyholders would [[Lapse|lapse]] before claiming, but far fewer did. A lapse removes a policy that would have cost more than it paid, so lower lapses than priced raise a block's claims even though more premium is collected. Combined with lower interest rates, longer lives and longer claims, this left many blocks underpriced.

Individual LTC is guaranteed renewable, so the insurer cannot change one person's premium because of their health but can raise rates for a whole class, with regulatory approval. An increase changes future premiums only. Many blocks have needed large increases, sized as described under [[Long-Term Care Rate Increase|long-term care rate increase]], and policyholders are often offered reduced benefits in place of the higher premium.

## Hybrid products

Life insurance or annuities with an LTC rider pay care benefits by accelerating the death benefit or drawing down the account value. Part of each claim is money the insurer would have paid anyway, which reduces the risk the insurer carries compared with stand-alone LTC.

> [!trap] Reading the benefit period as a time limit
> With a pool of money, the benefit period only sets the size of the pool. A claimant whose care costs less than the maximum is covered for longer than the stated period, as the 3.5 years in the example above shows.
