---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:04c475c1280e22e3ec3a6d62c0f616de80b22025f56cb559c98b44121f7286a1
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 53 ¶6-8, 17-18 (PDF pp.348-350); SSAP No. 55 ¶4, 6 (PDF p.362), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), pp.34, 36-37 (printed 33, 35-36), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.5 pp.68-70 incl. footnote 12 (PDF pp.80-82) — prior-pass source, re-fetched this run, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unearned Premium.md
---

![[Media/Figures/Unearned_Premium.svg|340]]

**Unearned Premium** is the portion of the [[Written Premium|written premium]] for coverage not yet provided, the premium for the part of the policy term that has not yet expired at a valuation date. Its total for a book is the unearned premium reserve, a liability for coverage the insurer still owes. When premium is earned evenly over the term, a policy's unearned premium at a valuation date is

> $$\text{Unearned Premium} = \text{Written Premium} \times \frac{\text{Time Remaining in the Term}}{\text{Policy Term}}$$

- $\text{Time Remaining in the Term}$ is the part of the policy's term after the valuation date, in months or in days.
- $\text{Policy Term}$ is the length of the policy's whole term, in the same unit.

The unearned premium is the written premium less the [[Earned Premium|earned premium]] to date. On an annual policy, earned premium exceeds unearned premium only once more than six months of the term have expired. Premium is earned with the passage of time, whether or not claims occur, so a loss does not reduce the unearned premium.

> [!example]- An annual policy is written on 10/1/2024 for $\$1{,}200$. What is its unearned premium at 12/31/2024? {Example}
> - Nine of its twelve months remain after 12/31/2024.
> - Its unearned premium is $1{,}200 \times 9/12 = \$900$.
> - The other $\$300$ has been earned, and the $\$900$ will be earned in 2025.

## The unearned premium reserve and earned premium

The change in the unearned premium reserve is the bridge between written and earned premium:

> $$\text{CY Earned Premium} = \text{CY Written Premium} + \text{Beginning UEP} - \text{Ending UEP}$$

- $\text{Beginning UEP}$ and $\text{Ending UEP}$ are the unearned premium reserves at the start and the end of the year.

For annual policies written evenly through a year, the average policy is half expired at year end, so the reserve is half of the year's written premium. A rising reserve means the book is growing, and a falling one that it is shrinking. For exposures, the unearned exposures at a date are the cumulative written exposures less the cumulative earned exposures.

> [!example]- An insurer writes annual policies evenly through each year: $\$24{,}000{,}000$ in 2023 and $\$30{,}000{,}000$ in 2024. What is its unearned premium reserve at each year end, and its calendar year 2024 earned premium? {Example}
> - Half of each year's writings are unearned at its end: $0.5 \times 24{,}000{,}000 = \$12{,}000{,}000$ at 12/31/2023 and $0.5 \times 30{,}000{,}000 = \$15{,}000{,}000$ at 12/31/2024.
> - The calendar year 2024 earned premium is $30{,}000{,}000 + 12{,}000{,}000 - 15{,}000{,}000 = \$27{,}000{,}000$.

## Cancellations and endorsements

A pro rata mid-term cancellation returns the unearned premium to the insured, the unexpired fraction of the term times the premium. It is recorded as negative written premium, in the calendar year of the cancellation and in the policy's own policy year, and only the premium for the expired part is earned. Werner & Modlin note that a policy may contain a short rate table that entitles the company to retain more than the pro rata premium, for expenses incurred at the onset of the policy. An endorsement's additional premium is written on its effective date, and its unexpired part is held in the unearned premium reserve.

> [!example]- A $\$2{,}400$ annual policy written on 1/1/2024 is cancelled pro rata on 4/1/2024. What premium is returned, and what is earned? {Example}
> - Three of the twelve months have expired, so 75% of the term is unexpired.
> - The return premium is $2{,}400 \times 0.75 = \$1{,}800$, recorded as negative written premium.
> - The earned premium is $2{,}400 \times 0.25 = \$600$.

## Statutory unearned premium

Under SSAP No. 53, the full written premium is recorded on the policy's effective date and placed in the unearned premium reserve at once. The reserve is computed by the daily or monthly pro rata method. Commissions and other acquisition costs are expensed when the policy is written, while the premium is earned over the term. Writing new business therefore strains surplus: the acquisition costs are charged against surplus before the premium that pays for them is earned.

The unearned premium reserve and the loss reserves cover different parts of the same policies. Under SSAP No. 55, a loss is recognized when the covered event occurs, or for a claims-made policy when the claim is reported. Its unpaid amount is a loss reserve, not a draw on the unearned premium. The unearned premium covers the unexpired coverage, on which no loss has occurred yet. Loss and LAE reserves are the largest liability on a property-casualty balance sheet: at the end of 2011 they were nearly 60% of U.S. industry liabilities, and unearned premium about 20%.

## Premium deficiency reserve

When the unearned premium will not cover the costs still to come on the in-force policies, SSAP No. 53 requires a premium deficiency reserve:

> $$\text{PDR} = \max(\text{Anticipated Costs} - \text{UEP} - \text{Future Installments}, 0)$$

- $\text{Anticipated Costs}$ are the anticipated losses, LAE, maintenance costs and acquisition costs not yet expensed, on the coverage still to be provided.
- $\text{UEP}$ is the unearned premium reserve of the group of policies.
- $\text{Future Installments}$ are the installment premiums still due on the existing policies.

Acquisition costs already expensed are left out. Policies are grouped consistently with how they are marketed, serviced and measured, and a deficiency in one group may not be offset by profits expected in another. The insurer discloses whether it counted anticipated investment income.

> [!example]- A homeowners book has $\$10{,}000{,}000$ of unearned premium and no installments due. For its remaining coverage the insurer expects $\$8{,}700{,}000$ of losses, $\$1{,}100{,}000$ of LAE and $\$1{,}000{,}000$ of maintenance costs. Its commissions were expensed when written, and its auto book is expected to be profitable. What premium deficiency reserve is needed? {Example}
> - The commissions are already expensed, so they are left out of the anticipated costs.
> - The anticipated costs are $8{,}700{,}000 + 1{,}100{,}000 + 1{,}000{,}000 = \$10{,}800{,}000$.
> - The reserve is $10{,}800{,}000 - 10{,}000{,}000 = \$800{,}000$.
> - The auto book's expected profit cannot offset it, because the two books are separate groups.

> [!trap] Charging a claim against the unearned premium
> A claim that has occurred is a loss reserve, and the policy's unearned premium keeps earning with time. A $\$10{,}000$ claim in the third month of a $\$1{,}200$ annual policy leaves its unearned premium at $\$900$ at the end of that month, not $\$0$.
