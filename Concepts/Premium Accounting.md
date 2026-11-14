---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d3dcb8f8411e3ec03c889540224c83cd7b39b55531a662bc15112f711e819328
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 53 ¶3-18 (PDF pp.347-350); SSAP No. 6 ¶7, ¶9-10 and Exhibit A (PDF pp.83-86); SSAP No. 66 ¶3, ¶7, ¶9.a (PDF pp.502-504); SSAP No. 62R ¶30 (PDF p.441), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), pp.36-37 (UPR categories, daily vs monthly pro rata); p.218 (U&IE Part 1B columns), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Accounting.md
---

**Premium Accounting** is how an insurer records premium as written, recognizes it as revenue as the coverage is provided, and carries the related balances: the unearned premium reserve, premiums receivable, estimated audit and retrospective adjustments, and any premium deficiency. For a U.S. property-casualty insurer's statutory statements the rules are in SSAP No. 53, with SSAP No. 6 for receivables, SSAP No. 66 for retrospectively rated policies and SSAP No. 62R for reinsurance premium.

For a period, the [[Earned Premium|earned premium]] is

> $$\text{EP} = \text{WP} - \Delta\text{UPR}$$

- $\text{WP}$ is the [[Written Premium|written premium]] for the period.
- $\Delta\text{UPR}$ is the change in the [[Unearned Premium|unearned premium reserve]] over the period.

For a block of policies written in one period, the earned premium is the written premium less what is still unearned, so the earned fraction is one minus the unearned fraction.

## Written premium

Written premium is the contractually determined amount charged to the policyholder for the policy's effective period, based on the expected risk, benefits and expenses. It is recorded on the policy's effective date, and the full amount goes into the unearned premium reserve at that moment. Written premium for a period is therefore the premium on policies and endorsements whose effective dates fall in it, regardless of when the premium is received.

Additional premium for an endorsement is recorded on the endorsement's effective date and earned in the same way, evenly over the coverage from that date to the policy's expiration. Premium paid before the policy's effective date is a liability, not written premium and not part of the unearned premium reserve, until coverage begins.

Workers compensation premium that varies with the insured's activities may be recorded as written on an installment basis, as billed. Other policies are written in full at the effective date. A flat service charge for paying in installments is not premium. It is reported as other income.

> [!trap] Booking written premium when it is paid
> Statutory written premium is booked in full when the policy takes effect, not when it is paid. Premium paid early is an advance premium liability, not written premium.

## Types of written premium

**Direct** premium is written on the insurer's own policies. **Assumed** premium comes from reinsurance the insurer accepts from other insurers. **Ceded** premium is paid to reinsurers, and under SSAP No. 62R it reduces the ceding insurer's written and earned premium rather than appearing as an expense. Net written premium is what remains:

> $$\text{NWP} = \text{Direct} + \text{Assumed} - \text{Ceded}$$

The annual statement's Underwriting and Investment Exhibit, Part 1B, shows the direct, assumed (from affiliates and non-affiliates), ceded (to affiliates and non-affiliates) and net amounts.

> [!example]- An insurer writes $\$50$ million direct, assumes $\$6$ million and cedes $\$14$ million under a quota share. What is its net written premium? {Example}
> - The assumed premium is added to the direct premium, and the ceded premium is subtracted.
> - $\text{NWP} = 50 + 6 - 14 = \$42$ million.

## Revenue recognition

Because the exposure under most property-casualty policies does not vary much over the term, premium is earned evenly. Where the period of risk differs significantly from the contract period, premium is earned in proportion to the protection provided over the period of risk. Under the **daily pro rata** method, a policy's unearned premium is

> $$\text{UPR}_{\text{policy}} = \text{WP} \times \frac{\text{Days unexpired}}{\text{Days in term}}$$

The days in force in a calendar year are counted from the effective date, inclusive, through the end of the year, using the actual days in each month.

The **monthly pro rata** method assumes business is written evenly through each month, so the average policy starts mid-month. A one-year policy written in month $m$ is then $(2m-1)/24$ unearned at year end: $\tfrac{1}{24}$ for January, $\tfrac{3}{24}$ for February, $\tfrac{5}{24}$ for March.

> [!example]- What are this April policy's 2025 earned premium and year-end unearned premium under each pro rata method? {Example}
> An insurer writes a one-year policy for \$2,400 effective April 1, 2025.
>
> > [!answer]-
> > - From April 1 through December 31 the policy is in force for $30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31 = 275$ days.
> > - The policy is in force for 275 of its 365 days in 2025, so the daily earned premium is $2{,}400 \times 275/365 = \$1{,}808.22$.
> > - The daily unearned premium is $2{,}400 \times 90/365 = \$591.78$.
> > - The monthly method treats April's writings as written mid-month, so the unearned fraction at year end is $(2 \times 4 - 1)/24 = 7/24$.
> > - The monthly unearned premium is $2{,}400 \times 7/24 = \$700$, and the earned premium is $2{,}400 - 700 = \$1{,}700$.
> > - Both methods book \$2,400 of written premium on April 1. The monthly method assumes business is written evenly through each month; for this one policy, written on the first of the month, it understates 2025's earned premium by \$108.22.

## Audit and retrospective premium

Premium on audit-type policies, such as workers compensation rated on payroll, is adjusted after expiration. The insurer estimates the audit premium not yet billed, **earned but unbilled (EBUB)** premium, and records it either through written premium or as an adjustment to earned premium. When the audit is complete the adjustment is recognized at once, and a return of premium reduces earned premium. Ten percent of EBUB above collateral held for the specific policy is nonadmitted. The insurer also accrues the commissions and premium taxes that go with the estimated premium, measured on when the premium is earned rather than when it is collected.

Coverage an insurer keeps in force past the due date while the premium is unpaid, **earned but uncollected** premium, is recorded as direct or assumed written premium because the insurer is at risk for that period.

On a [[Retrospective Rating|retrospectively rated]] policy the final premium depends on the insured's own losses, so the insurer estimates the adjustment for the expired part of the term by actuarially accepted methods. Accrued additional retrospective premium is a receivable, and accrued return premium is part of the change in unearned premium, either through written premium or as an adjustment to earned premium.

> [!example]- An insurer estimates $\$800{,}000$ of EBUB premium on its workers compensation policies and holds $\$300{,}000$ of collateral against it. How much of the EBUB asset is nonadmitted? {Example}
> - The EBUB above the collateral is $\$800{,}000 - \$300{,}000 = \$500{,}000$.
> - Ten percent of it is nonadmitted: $0.10 \times \$500{,}000 = \$50{,}000$.
> - The remaining \$750,000 of the EBUB asset is admitted.

## Premiums receivable

Uncollected premium is an admitted asset only within limits. Under SSAP No. 6, to the extent there is no related unearned premium, uncollected premium more than 90 days past due is nonadmitted, and if an installment is more than 90 days past due, that amount and all future installments recorded on the policy are nonadmitted. An agent's balance over 90 days due is nonadmitted regardless of unearned premium. Nonadmitted premium is excluded from surplus but may still be collected. A balance that is probably uncollectible is written off and charged to income.

> [!example]- How much of this unpaid installment policy's premium is nonadmitted at May 31? {Example}
> A workers compensation policy written January 1 for \$60,000 is billed in twelve monthly installments of \$5,000 at the end of each month, and the insured pays nothing.
>
> > [!answer]-
> > - The full \$60,000 was written on January 1. By May 31, five installments have been billed and five months earned.
> > - Billed and uncollected premium is $5 \times \$5{,}000 = \$25{,}000$, and booked premium not yet due is $\$60{,}000 - \$25{,}000 = \$35{,}000$.
> > - The unearned premium is $\$60{,}000 \times 7/12 = \$35{,}000$.
> > - The January installment, due January 31, is more than 90 days past due, so the whole \$25,000 of billed premium is nonadmitted, and so is each later installment as it is billed.
> > - The \$35,000 not yet due is matched by the \$35,000 of unearned premium, so no further amount is nonadmitted now.

## Premium deficiency

When expected losses, loss adjustment expenses, commissions and other acquisition costs, and maintenance costs exceed the unearned premium plus any future installments on existing policies, the insurer records a premium deficiency reserve with a charge to income. Acquisition costs already expensed are left out of the test, policies are grouped as they are marketed, serviced and measured, and a deficiency in one group is not offset by profit in another. The insurer must disclose whether it used anticipated investment income in the calculation.
