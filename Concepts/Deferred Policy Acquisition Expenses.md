---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d809ff9780559b7ed63b3766f7a77bfcfe0196d3115fd435be37fe167dd1761e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deferred Policy Acquisition Expenses.md
---

**Deferred Policy Acquisition Expenses** (DPAE, also called DPAC or DAC) were, under pre-[[IFRS 17]] Canadian P&C reporting, the balance-sheet asset for acquisition expenses paid when a policy is written that relate to its unexpired portion. They were expensed as the premium was earned, but only so far as they could be recovered from the equity in the net [[Unearned Premium|unearned premium]], which the [[Appointed Actuary]] evaluated.

The asset is off the current syllabus. Under IFRS 17, [[Insurance Acquisition Cash Flows]] took its place.

The DPAE booked is

> $$\text{DPAE}_{\text{booked}} = \min\big(\text{DPAE}_{\text{initial}},\ \max(0,\ \text{EQUP})\big)$$

- $\text{DPAE}_{\text{initial}}$ is the amount the accounting department proposes.
- $\text{EQUP}$ is the equity in the net unearned premium.

The equity in the net unearned premium is

> $$\text{EQUP} = \text{UPR}_{\text{net}} + \text{UC} - \text{PL}_{\text{net}}$$

- $\text{UPR}_{\text{net}}$ is the net unearned premium.
- $\text{UC}$ is the unearned reinsurance commissions.
- $\text{PL}_{\text{net}}$ is the net policy liabilities in connection with unearned premium: future claims and adjustment expenses, expected reinsurance costs and maintenance expenses, at actuarial present value.

[[Premium Deficiency]] shows how $\text{PL}_{\text{net}}$ is built. A negative EQUP takes the DPAE to zero and is carried as a premium deficiency, so a premium deficiency always means a booked DPAE of zero.

> [!example]- What is the DPAE at December 31, and what income does each calendar year show with and without the deferral? {Example}
> An annual policy is written on October 1 for a premium of $\$1{,}200$. Commission and premium tax of $\$240$ are paid at issue. Expected claims and adjustment expenses are $\$780$ and maintenance expenses $\$60$, both incurred evenly over the term. Ignore discounting, margins and reinsurance. Then repeat with expected claims of $\$1{,}000$.
>
> > [!answer]-
> > - At December 31, three of twelve months are earned, so the UPR is $\$900$.
> > - EQUP is $900 - 0.75(780) - 0.75(60) = 900 - 585 - 45 = 270$.
> > - The deferrable portion is $0.75 \times 240 = 180$, which EQUP covers, so the **DPAE is $\$180$**.
> > - Year 1 income is $300 - 195 - 15 - (240 - 180) = 30$, and year 2 income is $900 - 585 - 45 - 180 = 90$.
> > - The policy's $\$120$ profit emerges one-quarter in year 1, in step with the premium earned.
> > - **Without the deferral**, year 1 would show $300 - 195 - 15 - 240 = -\$150$ and year 2 $+\$270$, a loss reported on a profitable policy.
> > - With expected claims of $\$1{,}000$, future claims are $0.75 \times 1{,}000 = 750$, so EQUP is $900 - 750 - 45 = 105$.
> > - This is below the $\$180$ deferrable, so the **DPAE is capped at $\$105$**.
> > - Year 1 income is $300 - 250 - 15 - (240 - 105) = -100$, and year 2 income is $900 - 750 - 45 - 105 = 0$.
> > - The policy loses $1{,}200 - 1{,}000 - 60 - 240 = -\$100$ in total, and **all of it is recognised in year 1**. The cap is what stops a deferral from carrying an expected loss forward.

## Deferrable costs

Deferrable costs are acquisition expenses paid up front, and only the proportion relating to the unexpired portion of the policy:

1. Generally, broker and agent commissions and premium taxes.
2. Possibly an allocation of operating expenses such as renewal costs, advertising, licences and fees, and association dues.

Non-deferrable commissions are, in the CAS's published answer, those "that cannot be readily identified as exclusively relating to and varying with the acquisition of premiums and therefore are not recoverable". Page 80.10 of the old P&C-1 reported contingent commissions and other non-deferrable commissions outside the deferral.

Maintenance expenses, the cost of servicing policies already in force, are not acquisition costs. They are a future cost inside $\text{PL}_{\text{net}}$.

## Matching

Deferral spreads the prepaid expenses over the policy term alongside the earned premium, so an expected profit emerges pro rata. Because the asset is capped at EQUP, an expected loss is recognised at once.

The Standards of Practice build this into the premium liabilities themselves. Their amount "after deducting any deferred policy acquisition expense asset" is the present value of the cash flows still to come on the policies in force (paragraph 2230.01, as quoted in the CIA's 2007 note).

## Writing the DPAE down

A write-down lowers the asset and raises the expense by the same amount, so net income and equity both fall. One trigger for a write-down is a fall in the discount rate, which raises the premium liabilities and lowers the maximum DPAE.

> [!example]- What is the effect of this DPAE review on net income, equity and return on equity, ignoring tax? {Example}
> The actuary finds net UPR of $80{,}000$, unearned reinsurance commissions of $1{,}500$ and net policy liabilities in connection with unearned premium of $74{,}300$ (\$000s). The accounting department proposed a DPAE of $9{,}000$, on which basis net income for the year is $6{,}000$ and year-end equity $60{,}000$.
>
> > [!answer]-
> > - EQUP is $80{,}000 + 1{,}500 - 74{,}300 = 7{,}200$.
> > - EQUP is positive but below $9{,}000$, so the DPAE is written down by $1{,}800$ to $7{,}200$, with no premium deficiency.
> > - The $1{,}800$ becomes expense this year, so net income falls to $4{,}200$ and equity to $58{,}200$.
> > - ROE falls from $6{,}000/60{,}000 = 10.0\%$ to $4{,}200/58{,}200 = 7.2\%$.
> > - The ratio $(N - x)/(E - x)$ is below $N/E$ whenever net income $N$ is less than equity $E$, so for any ordinary insurer the write-down lowers ROE.

> [!trap] A write-down's effect on ROE reasoned from equity alone
> Examiners marked it wrong to reason that ROE falls simply because equity falls. A falling equity on its own pushes ROE up. ROE falls because net income falls by the same amount, which pulls it down by more.

## Commission reconciliation on page 80.10

The published answers use the reconciliation on page 80.10 of the old P&C-1. The commission expense is

> $$\text{Commission expense} = \text{Deferred}_{\text{start}} + \text{Written}_{\text{direct and assumed}} - \text{Deferred}_{\text{end}}$$

- $\text{Deferred}_{\text{start}}$ and $\text{Deferred}_{\text{end}}$ are the deferred commissions at the start and end of the year.
- $\text{Written}_{\text{direct and assumed}}$ is the direct and assumed commissions written.

The ceded commission income is

> $$\text{Ceded commission income} = \text{UC}_{\text{start}} + \text{Written}_{\text{ceded}} - \text{UC}_{\text{end}}$$

- $\text{UC}_{\text{start}}$ and $\text{UC}_{\text{end}}$ are the unearned commissions at the start and end of the year.
- $\text{Written}_{\text{ceded}}$ is the ceded commissions written.

The total net commissions are the expense less the income, plus the net contingent commissions and the net other non-deferrable commissions. Deferred commissions at the **start** add to the expense and those at the **end** reduce it, and unearned ceded commissions work the same way on the income side. Examiners reported errors in these signs.

> [!example]- What are the net commissions attributable to the period and the total net commissions? {Example}
> From page 80.10 of an insurer's P&C-1 (\$000s): deferred commissions were $21{,}000$ at the start of the year and $23{,}500$ at the end. Unearned commissions were $1{,}800$ at the start and $2{,}100$ at the end. Commissions written were $48{,}000$ direct, $1{,}500$ on reinsurance assumed and $6{,}000$ on reinsurance ceded. Contingent commissions were $2{,}400$ gross and $400$ ceded. Other non-deferrable commissions were $900$ gross and $100$ ceded.
>
> > [!answer]-
> > - The commission expense is $21{,}000 + 48{,}000 + 1{,}500 - 23{,}500 = 47{,}000$.
> > - The ceded commission income is $1{,}800 + 6{,}000 - 2{,}100 = 5{,}700$.
> > - The net commissions attributable to the period are $47{,}000 - 5{,}700 = 41{,}300$.
> > - The total net commissions are $41{,}300 + (2{,}400 - 400) + (900 - 100) = 44{,}100$.
> > - Deferred commissions grew by $2{,}500$, so that much of the year's commissions written sits on the balance sheet rather than in expense.

## Acquisition costs under IFRS 17

IFRS 17 has been in force in Canada since January 1, 2023.

1. Only acquisition cash flows directly attributable to the portfolio are deferred. Under the [[Premium Allocation Approach|PAA]], the [[Liability for Remaining Coverage|LRC]] at issue is premiums received less, if applicable, the deferred acquisition costs, so the deferral sits inside the liability rather than beside it as an asset.
2. Where each contract's coverage period is a year or less, the insurer may instead expense them as incurred (IFRS 17.59(a)). That keeps them out of the [[Onerous Contract|onerous]] assessment but front-ends the expense.
3. Costs allocated to groups not yet recognised, such as expected renewals, are held as an asset subject to recoverability tests.

The 2023 returns have no page 80.10. Page 80.15 of the quarterly return reports total commissions by class only, and insurance service expenses include a column for the amortization of insurance acquisition cash flows (page 60.25).
