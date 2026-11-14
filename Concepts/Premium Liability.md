---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e2d35070563f80534cfa0dfd7bc3fbeb2caaf471e12bb7299d9b96b32aac85f1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Liability.md
---
The **Premium Liability** of an insurer is the part of its [[Insurance Contract Liabilities|insurance contract liabilities]] that is not a claim liability: the actuarial present value of the costs still to come on the unexpired portion of the policies in force at the valuation date. Canadian practice before [[IFRS 17]] built it from future claims and adjustment expenses, expected reinsurance costs and maintenance expenses, each with a provision for adverse deviations, and the [[Appointed Actuary]] compared it with the [[Unearned Premium|unearned premium]] it is meant to be paid from.

The premium liabilities are

> $$\text{PL} = \text{APV}(\text{claims} + \text{LAE}) + \text{RC} + \text{ME}$$

- $\text{APV}$ is the actuarial present value, which discounts the cash flows and adds the provisions for adverse deviations.
- $\text{RC}$ is the expected cost of reinsurance protecting the unexpired coverage.
- $\text{ME}$ is the maintenance expenses.

## Future claims and adjustment expenses

The largest piece is found by applying a selected expected loss ratio to the unearned premium reserve (UPR), by line or by a segmentation consistent with the claim liability analysis. The CIA's educational note adjusts historical experience to the period the UPR will be earned in, through trend to its average accident date, on-level factors, legal changes, mix, catastrophe loadings and seasonality.

ALAE and ULAE are either included with the losses or estimated separately, consistently with the claim liabilities. A common approach applies a ULAE ratio from historical experience to the expected losses.

## Reinsurance costs and maintenance expenses

On a net basis, the cost of reinsurance covering the unexpired portion is subtracted from the UPR before the expected loss ratio is applied, and is added back as its own item. A proportional treaty needs no separate cost, because the net UPR is already reduced and the loss ratio is the same gross and net.

Maintenance expenses are the cost of servicing the policies in force, such as endorsements and mid-term cancellations. They are usually a share of the general expense ratio applied to the **gross** UPR, and the note gives typical shares of 25% to 50%. Applying the full general expense ratio, or adding acquisition costs already prepaid in the [[Deferred Policy Acquisition Expenses|DPAE]], double-counts them. Their time value is "not generally material", so they are usually left undiscounted.

## Discounting

The payment pattern and discount rate normally match the claim liabilities. A future accident year has its average accident date half-way through the year. For the UPR of annual policies written evenly, the exposure left declines linearly, so the average accident date of its losses, in years after the valuation date, is

> $$\bar{t} = \frac{\int_0^1 x\,(1-x)\,dx}{\int_0^1 (1-x)\,dx}$$

which is $1/3$. The present value of a future accident year is therefore moved forward by $(1+i)^{1/2 - 1/3}$. The median date, $1 - \sqrt{0.5} = 0.2929$ years, is an accepted approximation. For six-month policies the date is one-third of six months, or $1/6$ of a year.

> [!example]- A future accident year's losses have a 4% present value factor of $0.9250$. What is the UPR's factor for annual and for six-month policies? {Example}
> - Both kinds of policy are written evenly, so the losses in their UPR have average accident dates of $1/3$ and $1/6$ of a year.
> - For annual policies the factor is $0.9250 \times 1.04^{1/2 - 1/3} = 0.9311$.
> - For six-month policies it is $0.9250 \times 1.04^{1/2 - 1/6} = 0.9372$.
> - The UPR's losses happen sooner than a future accident year's, so they are discounted less, and shorter policies are discounted less still.

## Margins for adverse deviations

[[Margin for Adverse Deviations|Margins for adverse deviations]] are added for claims development, reinsurance recovery and the investment return rate. The standards expect them to differ from those on claim liabilities, and claims that have not yet occurred are generally more uncertain.

## The premium deficiency test

The purpose of the premium liabilities is to test whether the unearned premium is enough to pay for the unexpired coverage. The equity in the net unearned premium is

> $$\text{EQUP} = \text{UPR}_{\text{net}} + \text{UC} - \text{PL}_{\text{net}}$$

- $\text{UPR}_{\text{net}}$ is the net unearned premium reserve.
- $\text{UC}$ is the unearned reinsurance commissions.

The equity is usually computed for all lines combined and compared with the proposed DPAE:

1. If EQUP is at least the proposed DPAE, nothing changes.
2. If it is positive but smaller, the DPAE is written down to EQUP.
3. If it is negative, the DPAE goes to zero and a [[Premium Deficiency|premium deficiency]] of $-\text{EQUP}$ is carried.

> [!example]- What are this insurer's premium liabilities, and what DPAE should it book? {Example}
> At December 31, a personal property insurer that cedes nothing has an unearned premium of $\$20.00$ million on annual policies written evenly through the year. The accounting department proposes a DPAE of $\$3.60$ million. The illustrative assumptions are:
>
> | Assumption | Value |
> | :--- | :--- |
> | Expected loss ratio | 75% |
> | ULAE | 6% of losses |
> | Maintenance expenses | 3% of the UPR, undiscounted |
> | Payments | 45%, 35%, 20% at 0.5, 1.5, 2.5 years after the accident date |
> | Discount rate | 4% |
> | Investment return MfAD | 50 basis points |
> | Claims development MfAD | 7.5% |
>
> > [!answer]-
> > - The payments fall $1/3$ of a year later than the pattern, at $0.8333$, $1.8333$ and $2.8333$ years.
> > - Weighting the discount factors by the pattern gives $0.9402$ at 4% and $0.9473$ at 3.5%.
> > - Claims and LAE are $0.75 \times 20.00 \times 1.06 = 15.90$, with a present value of $15.90 \times 0.9402 = 14.95$ at 4%.
> > - The claims PfAD is $0.075 \times 14.95 = 1.12$, and the interest PfAD is $15.90 \times (0.9473 - 0.9402) = 0.11$.
> > - Maintenance expenses are $0.03 \times 20.00 = 0.60$, so $\text{PL} = 14.95 + 1.12 + 0.11 + 0.60 = 16.78$.
> > - $\text{EQUP} = 20.00 - 16.78 = 3.22$, positive but below the proposed $\$3.60$ million, so the DPAE is written down to $\$3.22$ million and there is no premium deficiency.
> > - At an expected loss ratio of 95%, the same steps give $\text{PL} = 21.10$ and $\text{EQUP} = -1.10$. The DPAE then goes to zero and a premium deficiency of $\$1.10$ million is carried.

## Under IFRS 17

The [[Liability for Remaining Coverage]] took the UPR's place. Under the [[Premium Allocation Approach|PAA]], an [[Onerous Contract|onerous]] group's shortfall is recognised as a [[Loss Component|loss component]], group by group, with a risk adjustment in place of the margins.

> [!trap] Discounting the UPR's losses from mid-year
> Discounting the UPR's losses from the middle of the year treats them as a future accident year. For annual policies written evenly the average accident date is one-third of a year out, and for six-month policies it is one-sixth.
