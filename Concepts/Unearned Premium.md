---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:405199b290de67ee94a94d01aca92caf5dea4d04d09a9d48a685386b38824c8d
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 53 ¶6-8, 17-18 (PDF pp.348-350); SSAP No. 55 ¶4, 6 (PDF p.362), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), pp.34, 36-37 (printed 33, 35-36), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.5 pp.68-70 incl. footnote 12 (PDF pp.80-82) — prior-pass source, re-fetched this run, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unearned Premium.md
---

**Unearned Premium** is the portion of written premium corresponding to coverage not yet provided — the insurer's obligation to either provide the remaining coverage or return the premium. The aggregate balance is the **unearned premium reserve** (UEP), a liability on the balance sheet.

> $$\text{UEP for one policy} = \text{Full premium} \times \frac{\text{days remaining}}{\text{policy term}}$$

> $$\text{Earned Premium} = \text{Written Premium} - \Delta\text{UEP}$$

- The UEP is a **premium** liability, not a claim liability. It funds coverage the insurer has promised but not yet delivered, whereas [[Unpaid Claims|unpaid claims]] fund events that have already happened.
- For a book of annual policies written uniformly, the year-end UEP is about **half** of that year's written premium — the average policy is half expired.
- The change in the UEP is the entire bridge between written and [[Earned Premium|earned]] premium. A rising UEP means the book is growing (or prices rose); a falling UEP means it is shrinking.
- Cancellation returns the unearned portion. **Pro rata** cancellation returns the full unearned premium; **short-rate** cancellation, used when the insured cancels, returns less than pro rata to recover acquisition costs that were incurred up front.
- Because commissions and other acquisition costs are paid when the policy is *written* but the premium is earned over the term, rapid growth consumes surplus even on profitable business. This is the "growth penalty" of statutory accounting, and it is why a **premium deficiency reserve** must be established if the unearned premium is not expected to cover the future losses and expenses on that coverage.
- **Statutory recording:** Under SSAP No. 53 the full written premium is recorded on the policy's effective date and placed in the unearned premium reserve at once, and the reserve is computed by the daily pro rata or the monthly pro rata method ([[Premium Accounting]]). Statutory accounting holds the full premium as unearned even though it has already expensed the acquisition costs, a conservative, solvency-focused presentation that lowers surplus.
- **Loss reserves and the UPR:** The two are the largest liabilities on a property-casualty balance sheet: at the end of 2011, loss and LAE reserves were nearly 60% of U.S. industry liabilities and unearned premium about 20%. They cover different parts of the same policies. Under SSAP No. 55 a loss is recognized when the covered event occurs (for a claims-made policy, when it is reported), and the unpaid amount, case reserves plus IBNR plus LAE, is a loss reserve ([[Unpaid Claims]]). The UPR covers the unexpired coverage, on which no loss has yet occurred. As time passes the premium earns, the events of that period occur, and their unpaid cost moves into the loss reserves until it is paid.
- **When the UPR is not enough:** The UPR is the fund for the losses still to occur on in-force business. SSAP No. 53 requires a premium deficiency reserve when the anticipated losses, LAE, commissions and other acquisition costs, and maintenance costs exceed the UPR plus future installments on existing policies. Acquisition costs already expensed are left out, policies are grouped as they are marketed, serviced and measured, a profitable group may not offset a deficient one, and the insurer discloses whether it counted anticipated investment income.

![[Media/Figures/Unearned_Premium.svg|340]]

> [!example]- Unearned Premium Reserve for a Growing Book {Example}
> An insurer writes only $12$-month policies, uniformly through the year:
>
> | Year | Written premium |
> |---|---|
> | $2023$ | $\$24{,}000{,}000$ |
> | $2024$ | $\$30{,}000{,}000$ |
>
> Compute the UEP at each year end and CY 2024 earned premium.
>
> > [!answer]-
> > With uniform writing, the unexpired portion at year end averages half the term:
> >
> > $$\begin{align*}
> > \text{UEP}_{12/31/2023} &= 0.5 \times \$24{,}000{,}000 = \$12{,}000{,}000 \\
> > \text{UEP}_{12/31/2024} &= 0.5 \times \$30{,}000{,}000 = \$15{,}000{,}000
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{CY 2024 EP} &= \$30{,}000{,}000 - (\$15{,}000{,}000 - \$12{,}000{,}000) \\
> > &= \$27{,}000{,}000
> > \end{align*}$$
> >
> > The insurer wrote $\$30$M, earned $\$27$M, and carries a $\$15$M liability for coverage it still owes. If it paid $15\%$ commission on writings, $\$4.5$M of expense was booked against $\$27$M of earned premium — the growth strain.

> [!example]- Cancellation: Pro Rata vs. Short Rate {Example}
> A $\$2{,}400$ annual commercial policy incepts $1/1/2024$ and is cancelled effective $4/1/2024$. The short-rate table for a $25\%$ expired term returns $70\%$ of the premium.
>
> Compute the return premium and the earned premium under each cancellation basis.
>
> > [!answer]-
> > Three months of a twelve-month term have run, so $25\%$ is expired.
> >
> > **Pro rata** (insurer cancels, or policy provides for it):
> >
> > $$\begin{align*}
> > \text{Return} &= \$2{,}400 \times 0.75 = \$1{,}800 \\
> > \text{Earned} &= \$2{,}400 \times 0.25 = \$600
> > \end{align*}$$
> >
> > **Short rate** (insured cancels):
> >
> > $$\begin{align*}
> > \text{Return} &= \$2{,}400 \times 0.70 = \$1{,}680 \\
> > \text{Earned} &= \$2{,}400 - \$1{,}680 = \$720
> > \end{align*}$$
> >
> > The insurer keeps an extra $\$120$ under short rate. That is not extra profit on the coverage — it is partial recovery of the commission and issuance costs already paid on a policy that will not run its term. In the ratemaking data both the return premium and the shortened exposure must flow through, or the average premium per [[Earned Exposure|earned exposure]] will be misstated.

> [!example]- When the Unearned Premium Falls Short {Example}
> At December 31 an insurer's homeowners book in one state has an unearned premium reserve of \$10,000,000 and no future installments due. Rates there were held down, and for the coverage still to be provided the insurer expects \$8,700,000 of losses, \$1,100,000 of loss adjustment expense and \$1,000,000 of maintenance costs. Commissions were paid and expensed when the policies were written. Its auto book in the same state is expected to be profitable. Is a premium deficiency reserve needed, and how large?
>
> > [!answer]-
> > The commissions are already expensed, so they are left out of the test.
> > $$
> > \begin{align*}
> > \text{Expected costs} &= 8{,}700{,}000 + 1{,}100{,}000 + 1{,}000{,}000 \\
> > &= 10{,}800{,}000 \\
> > \text{PDR} &= 10{,}800{,}000 - 10{,}000{,}000 \\
> > &= 800{,}000
> > \end{align*}
> > $$
> > The insurer records an \$800,000 liability with a charge to income, and discloses the amount. The auto book's expected profit cannot offset it, because the two are marketed and measured as separate groups. As the homeowners premium earns and claims occur, their unpaid cost will appear in the loss and LAE reserves; the PDR recognizes now that the premium held for them will not be enough.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Two objectives use this page: computing the unearned premium, and examining the relationship between loss reserves and the unearned premium reserve. Expect a calculation of the UPR for a policy at a valuation date, and a question asking which liability an amount belongs in, the UPR or the loss reserves.
> - **Premium deficiency:** A question can give the UPR and the expected future losses, LAE and maintenance costs for a group of policies and ask whether a premium deficiency reserve is needed and its amount.
> - **Exam 5:** Ratemaking uses the UPR to bridge written and earned premium, as in the examples above.

> [!warning]- Exam traps
> - **Loss reserves are for events that have happened:** A claim that has occurred is a loss reserve, not a draw on the UPR. The UPR keeps earning with the passage of time whether or not claims occur.
> - **Acquisition costs in the deficiency test:** Commissions already expensed are not counted again when testing for a premium deficiency.
> - **No offsetting between groups:** A deficiency in one grouping of policies is recorded even if another grouping is profitable.
> - **Full premium at inception:** The statutory UPR at inception is the whole written premium, not the premium net of commission.

