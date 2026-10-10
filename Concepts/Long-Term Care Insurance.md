---
aliases:
  - Long Term Care
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1d6fbb0bc9bc98c2916b9f9d2bf3a08555c57aebb6b38ec4c977175db11ee494
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Long-Term Care Insurance.md
---
**Long-Term Care Insurance** (LTC) pays for the personal care a person needs when they can no longer look after themselves because of chronic illness, frailty or cognitive decline, in a nursing facility, an assisted living facility or at home. Benefits start once the insured meets a benefit trigger and an elimination period has passed, and they are paid up to a daily or monthly maximum from a pool of money. Premiums are usually level for life but not guaranteed, and the long gap between purchase and claim makes LTC one of the hardest long-duration [[Health Insurance|health contracts]] to price.

> $$\text{Eligible}_t = \mathbb{1}\{N_t \geq 2\} \ \lor\ \mathbb{1}\{\text{cognitive impairment}_t\}$$

> $$\text{DMB}_t = \text{DMB}_0\,(1 + j)^{t}$$

> $$\text{Paid}_t = \min(\text{Cost}_t,\ \text{DMB}_t,\ \text{Pool}_{t-1})$$

> $$\text{Pool}_t = \text{Pool}_{t-1} - \text{Paid}_t$$

- **Symbols:** $N_t$ is the number of activities of daily living (ADLs) the insured cannot perform without substantial help, usually counted from bathing, dressing, eating, toileting, transferring and continence. $\text{DMB}_t$ is the daily maximum benefit $t$ years after issue, $j$ the compound inflation protection rate, $\text{Cost}_t$ the cost of care incurred that day, and $\text{Pool}_t$ the benefit left in the pool of money.
- **Benefit triggers:** A claimant qualifies by needing help with a set number of ADLs or by having a severe cognitive impairment, such as dementia, that requires supervision. The cognitive trigger matters because a person with dementia may be physically able to perform every ADL.
- **Pool and elimination period:** The pool of money is often sold as a maximum daily benefit times a benefit period, such as three years, and it is used up only as benefits are paid, so a claimant whose care costs less than the maximum is covered for longer. The elimination period, counted in days of care, is a deductible measured in time.
- **Settings and payment basis:** Policies cover nursing facilities, assisted living, home care and adult day care, sometimes at different maximums. Reimbursement policies pay the actual cost up to the maximum, while indemnity or cash policies pay the maximum whatever is spent, which carries more [[Moral Hazard|moral hazard]].
- **Inflation protection:** Claims often begin decades after purchase, when care costs much more than at issue. Compound inflation protection keeps the maximum in step with costs but raises the premium a great deal. Simple increases, or offers to buy more coverage later, are cheaper alternatives that protect less.
- **Pricing risks:** Premiums are level while claim costs rise steeply with age, so early premiums fund a large active life reserve, as in a [[Policy Value|policy value]]. Early products assumed many policyholders would [[Lapse|lapse]] before claiming, but far fewer did. Combined with lower interest rates, longer lives and longer claims, this left many blocks underpriced.
- **Rate increases:** Individual LTC is guaranteed renewable, so the insurer cannot change one person's premium but can raise rates for a whole class, with regulatory approval. Many blocks have needed large increases, and policyholders are often offered reduced benefits in place of the higher premium.
- **Hybrid products:** Life insurance or annuities with an LTC rider pay care benefits by accelerating the death benefit or drawing down the account value. Part of each claim is money the insurer would have paid anyway, which reduces the risk the insurer carries compared with stand-alone LTC.

> [!example]- How Inflation Protection Changes a Claim {Example}
> At age 60, an insured buys a reimbursement policy with a \$200 daily maximum, a three-year benefit period and 5% compound inflation protection that applies to the maximum and the pool. At age 80, the insured enters a nursing facility costing \$450 a day. Find the daily benefit and how long the pool lasts, ignoring increases during the claim, and compare a policy with no inflation protection.
>
> > [!answer]-
> > The pool at issue is $200 \times 1{,}095 = 219{,}000$, and both the maximum and the pool have grown for 20 years.
> > $$
> > \begin{align*}
> > \text{DMB}_{20} &= 200\,(1.05)^{20} \\
> > &= 530.66 \\
> > \text{Pool}_{20} &= 219{,}000\,(1.05)^{20} \\
> > &= 581{,}072 \\
> > \text{Days} &= \frac{581{,}072}{450} \\
> > &= 1{,}291
> > \end{align*}
> > $$
> > The cost of care is below the maximum, so the policy pays the full \$450 a day, and the pool lasts about 3.5 years, longer than the three-year benefit period. Without inflation protection the policy pays only \$200 a day, and the insured pays the other \$250, 56% of the cost, from savings or with help from [[Medicaid]].

> [!example]- Sizing a Rate Increase {Example}
> An LTC block was priced for a lifetime loss ratio of 75%. With illustrative present values in millions, past premiums are 600 and past claims 200. On revised lapse and morbidity assumptions, future premiums at current rates are 400 and future claims are 650. Find the lifetime loss ratio now and the rate increase that restores 75%.
>
> > [!answer]-
> > The lifetime loss ratio combines past and future, and only future premiums can be increased.
> > $$
> > \begin{align*}
> > \text{LR} &= \frac{200 + 650}{600 + 400} \\
> > &= 85\% \\
> > 600 + 400\,(1 + x) &= \frac{200 + 650}{0.75} \\
> > &= 1{,}133.3 \\
> > x &= \frac{1{,}133.3 - 600}{400} - 1 \\
> > &= 33.3\%
> > \end{align*}
> > $$
> > A 33.3% increase restores the priced loss ratio. If the increase leads healthier policyholders to lapse, future premiums fall by more than future claims and the loss ratio stays above plan, which is why actuaries project the increase's effect on lapses and on benefit reductions before filing it.

> [!tip]- How it appears on the exam
> - **CP-321 plan and product provisions:** Questions ask candidates to describe stand-alone and hybrid LTC contracts, how they developed, the organizations that offer them and why, and the moral hazard and financial and legal risks they carry. A short calculation applies a policy's trigger, maximum, pool and inflation protection to a claim.
> - **CP-321 pricing and reserving:** The same contract returns in the objectives on assumptions, experience monitoring, rate increases and reserves, where a question asks why a block's experience differs from pricing and how to size or justify an increase.

> [!warning]- Exam traps
> - **Benefit period is not a time limit:** With a pool of money, the benefit period only sets the size of the pool. A claimant whose care costs less than the maximum is covered for longer than the stated period.
> - **Inflation on the pool too:** Compound inflation protection usually increases the pool as well as the daily maximum. Growing only the daily maximum makes the pool run out too early.
> - **Lapses raise cost:** Because premiums are level and claims come late, a lapse removes a policy that would have cost more than it paid. Lower lapses than priced increase the claims of a block, even though more premium is collected.
> - **Rate increases on the whole class:** Guaranteed renewable means the premium cannot be changed for one person because of their health. An increase applies to everyone in the rating class, and it changes the future premiums only, not those already paid.
