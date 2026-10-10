---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d7e40bf0a58be66e14ab75f5de5531174fbf95dbd887b6955afaf66d1a5ab8d4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Accounting.md
---

**Premium Accounting** is how an insurer records premium as written, recognizes it as revenue as the coverage is provided, and carries the related balances: the unearned premium reserve, premiums receivable, estimated audit and retrospective adjustments, and any premium deficiency. For a U.S. property-casualty insurer's statutory statements the rules are in SSAP No. 53, with SSAP No. 6 for receivables, SSAP No. 66 for retrospectively rated policies and SSAP No. 62R for reinsurance premium.

> $$\text{EP} = \text{WP} - \Delta\text{UPR}$$

> $$\text{UPR}_{\text{policy}} = \text{WP} \times \frac{\text{Days unexpired}}{\text{Days in term}}$$

> $$\text{NWP} = \text{Direct} + \text{Assumed} - \text{Ceded}$$

- **Symbols:** EP is [[Earned Premium|earned premium]] for a period, WP is [[Written Premium|written premium]] and $\Delta\text{UPR}$ the change in the [[Unearned Premium|unearned premium reserve]] over the period. NWP is net written premium.
- **Written premium:** Written premium is the contractually determined amount charged to the policyholder for the policy's effective period, based on the expected risk, benefits and expenses. It is recorded on the policy's effective date, and the full amount goes into the unearned premium reserve at that moment. Additional premium for an endorsement is recorded on the endorsement's effective date and earned in the same way.
- **Revenue recognition:** Because the exposure under most property-casualty policies does not vary much over the term, premium is earned evenly, by either the **daily pro rata** method, which computes the unexpired portion of each policy, or the **monthly pro rata** method, which assumes business is written evenly through each month, so the average policy starts mid-month. A one-year policy written in month $m$ is then $(2m-1)/24$ unearned at year end: $\tfrac{1}{24}$ for January, $\tfrac{3}{24}$ for February, $\tfrac{5}{24}$ for March. Where the period of risk differs significantly from the contract period, premium is earned in proportion to the protection provided over the period of risk.
- **Types of written premium:** **Direct** premium is written on the insurer's own policies. **Assumed** premium comes from reinsurance the insurer accepts from other insurers. **Ceded** premium is paid to reinsurers, and under SSAP No. 62R it reduces the ceding insurer's written and earned premium. **Net** written premium is what remains, and the annual statement's Underwriting and Investment Exhibit, Part 1B, shows the direct, assumed (from affiliates and non-affiliates), ceded (to affiliates and non-affiliates) and net amounts.
- **Booked and not yet booked:** Premium on audit-type policies, such as workers compensation rated on payroll, is adjusted after expiration. The insurer estimates the audit premium not yet billed, **earned but unbilled (EBUB)** premium, and records it either through written premium or as an adjustment to earned premium. When the audit is complete the adjustment is recognized at once, and a return of premium reduces earned premium. Ten percent of EBUB above collateral held for the specific policy is nonadmitted. Coverage an insurer keeps in force past the due date while the premium is unpaid, **earned but uncollected** premium, is recorded as direct or assumed written premium because the insurer is at risk for that period.
- **Retrospective adjustments:** On a [[Retrospective Rating|retrospectively rated]] policy the final premium depends on the insured's own losses, so the insurer estimates the adjustment for the expired part of the term by actuarially accepted methods. Accrued additional retrospective premium is a receivable, and accrued return premium is part of the change in unearned premium, either through written premium or as an adjustment to earned premium.
- **Installments:** Workers compensation premium that varies with the insured's activities may be recorded as written on an installment basis, as billed. Other policies are written in full at the effective date. A flat service charge for paying in installments is not premium; it is reported as other income.
- **Advance premium:** Premium paid before the policy's effective date is a liability, not written premium and not part of the unearned premium reserve, until coverage begins.
- **Premiums receivable:** Uncollected premium is an admitted asset only within limits. Under SSAP No. 6, to the extent there is no related unearned premium, uncollected premium more than 90 days past due is nonadmitted, and if an installment is more than 90 days past due, that amount and all future installments recorded on the policy are nonadmitted. An agent's balance over 90 days due is nonadmitted regardless of unearned premium. Uncollectible amounts are written off.
- **Premium deficiency:** When expected losses, loss adjustment expenses, commissions and other acquisition costs, and maintenance costs exceed the unearned premium plus any future installments on existing policies, the insurer records a premium deficiency reserve with a charge to income. Acquisition costs already expensed are left out of the test, policies are grouped as they are marketed, serviced and measured, and a deficiency in one group is not offset by profit in another. The insurer must disclose whether it used anticipated investment income in the calculation.

> [!example]- Earning a Policy Written in April {Example}
> An insurer writes a one-year policy for \$2,400 effective April 1, 2025. Find the calendar year 2025 earned premium and the December 31, 2025 unearned premium under the daily pro rata method and under the monthly pro rata method.
>
> > [!answer]-
> > The policy is in force for 275 of its 365 days in 2025.
> > $$
> > \begin{align*}
> > \text{EP}_{\text{daily}} &= 2{,}400 \times \frac{275}{365} \\
> > &= 1{,}808.22 \\
> > \text{UPR}_{\text{daily}} &= 2{,}400 \times \frac{90}{365} \\
> > &= 591.78
> > \end{align*}
> > $$
> > The monthly method treats April's writings as written mid-month, so the unearned fraction at year end is $(2 \times 4 - 1)/24 = 7/24$.
> > $$
> > \begin{align*}
> > \text{UPR}_{\text{monthly}} &= 2{,}400 \times \frac{7}{24} \\
> > &= 700.00 \\
> > \text{EP}_{\text{monthly}} &= 2{,}400 - 700 \\
> > &= 1{,}700.00
> > \end{align*}
> > $$
> > Both methods book \$2,400 of written premium on April 1. They differ only in how the premium is split between the two years. The monthly method assumes business is written evenly through each month; for this one policy, written on the first of the month, it understates 2025's earned premium by \$108.22.

> [!example]- From Direct to Net, With an Audit Estimate {Example}
> In one year an insurer writes \$50 million of direct premium, assumes \$6 million from other insurers and cedes \$14 million under a quota share. It also estimates \$800,000 of earned but unbilled audit premium on its workers compensation policies, against which it holds \$300,000 of collateral. Find net written premium and the nonadmitted part of the EBUB asset.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{NWP} &= 50 + 6 - 14 \\
> > &= 42 \text{ million} \\
> > \text{Nonadmitted EBUB} &= 0.10 \times (800{,}000 - 300{,}000) \\
> > &= 50{,}000
> > \end{align*}
> > $$
> > The \$750,000 balance of the EBUB asset is admitted. The insurer must also accrue the commissions and premium taxes that go with the estimated premium, measured on when the premium is earned rather than when it is collected.

> [!example]- An Installment Policy Gone Unpaid {Example}
> A workers compensation policy written January 1 for \$60,000 is billed in twelve monthly installments of \$5,000 at the end of each month, and the insured pays nothing. At May 31, how are the balances shown, and how much is nonadmitted?
>
> > [!answer]-
> > The full \$60,000 was written on January 1. By May 31, five installments have been billed and five months earned.
> > $$
> > \begin{align*}
> > \text{Billed, uncollected} &= 5 \times 5{,}000 \\
> > &= 25{,}000 \\
> > \text{Booked, not yet due} &= 60{,}000 - 25{,}000 \\
> > &= 35{,}000 \\
> > \text{UPR} &= 60{,}000 \times \frac{7}{12} \\
> > &= 35{,}000
> > \end{align*}
> > $$
> > The January installment, due January 31, is more than 90 days past due, so the whole \$25,000 of billed premium is nonadmitted, and so is each later installment as it is billed. The \$35,000 not yet due is matched by the \$35,000 of unearned premium, so no further amount is nonadmitted now, which is the treatment SSAP No. 6 illustrates for a monthly-billed workers compensation policy.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Three objectives cover premium accounting: revenue recognition, the types of written premium and other premium issues. Expect a calculation of earned and unearned premium for a policy written partway through the year, sometimes after a mid-term endorsement or cancellation.
> - **Classification:** A question can describe a transaction, such as an assumed treaty, a ceded quota share, an audit adjustment or premium paid before the effective date, and ask whether and where it is written premium.
> - **Other issues:** Questions on nonadmitted overdue premium, EBUB and the premium deficiency reserve test the statutory reasoning: only assets that could pay claims are admitted, and a liability is added when the unearned premium cannot cover what is still owed.

> [!warning]- Exam traps
> - **Written on the effective date:** Statutory written premium is booked in full when the policy takes effect, not when it is billed or paid. Premium paid early is an advance premium liability, not written premium.
> - **Ceded premium reduces premium:** Ceded premium is a reduction of written and earned premium for the ceding insurer, not an expense line.
> - **Monthly pro rata uses mid-month:** A one-year policy written in March is $5/24$ unearned at year end, not $3/12$.
> - **Nonadmitted is not written off:** Overdue premium that is nonadmitted is excluded from surplus but may still be collected. A balance that is probably uncollectible is written off and charged to income.
> - **Premium deficiency is by group:** A deficiency in one grouping must be recorded even if another grouping is profitable.
