**Unpaid Claims** are the insurer's liability at a valuation date for claims that have occurred but are not yet fully paid. The **unpaid claim estimate** is the central output of a reserve analysis, and [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] defines it as the actuary's estimate of the obligation for future payment resulting from claims due to past events.

> $$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$

> $$\text{Unpaid} = \text{Case Reserves} + \text{IBNR}$$

- The two identities are the same quantity split differently: by **what is known** (case reserves on reported claims plus [[IBNR]] for everything else), or by **what remains** (ultimate less what has been paid).
- The estimate covers indemnity, [[Allocated Loss Adjustment Expense|ALAE]] and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]] — the last of which is never in a case reserve and must be added in bulk. It must also reflect [[Salvage and Subrogation|salvage and subrogation]] and [[Reinsurance Recovery|reinsurance recoveries]] on whatever basis is being reported.
- Friedland and ASOP 43 prefer *unpaid claims* to *reserves* deliberately: it is an estimate of a **future payment obligation**, not a fund of money set aside. The distinction matters when explaining results to non-actuaries, who often assume a reserve is cash in an account.
- ASOP 43's **actuarial central estimate** is an estimate "that represents an expected value over the range of reasonably possible outcomes" — not a conservative figure, not a best case, and not necessarily any particular percentile of the distribution.
- The estimate applies equally to **non-insurance entities that retain risk** — self-insureds, captives, public entities, pools — for their [[Self-Insured Retention|retained layer]], which is why the reserving syllabus covers them alongside insurers.
- Accuracy matters beyond the balance sheet: unpaid claim estimates drive solvency assessment, [[Ratemaking|ratemaking]] (through ultimate loss ratios), reinsurance commutations, collateral requirements, and the price of the company itself in a transaction.

![[Media/Figures/Unpaid_Claims.svg|340]]

> [!example]- Splitting the Unpaid Estimate {Example}
> For accident year $2024$ an actuary selects ultimate losses of $\$5{,}000{,}000$. Paid to date is $\$1{,}800{,}000$ and case reserves are $\$2{,}200{,}000$.
>
> Compute total unpaid claims and its components.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Unpaid} &= \$5{,}000{,}000 - \$1{,}800{,}000 \\
> > &= \$3{,}200{,}000 \\[6pt]
> > \text{Reported} &= \$1{,}800{,}000 + \$2{,}200{,}000 = \$4{,}000{,}000 \\[4pt]
> > \text{IBNR} &= \$5{,}000{,}000 - \$4{,}000{,}000 = \$1{,}000{,}000
> > \end{align*}$$
> >
> > Check: $\text{Case} + \text{IBNR} = \$2{,}200{,}000 + \$1{,}000{,}000 = \$3{,}200{,}000 \;\checkmark$
> >
> > Of the $\$3.2$M liability, $\$2.2$M is attached to specific claim files and $\$1.0$M is an actuarial estimate attached to nothing in particular. Only the second part is the actuary's own number; the first is the claims department's, and the analysis takes a view on it through [[Case Adequacy|case adequacy]] diagnostics.

> [!example]- Building the Full Liability {Example}
> An insurer's reserve analysis produces, across all accident years: ultimate loss and ALAE $\$68{,}000{,}000$; paid loss and ALAE $\$41{,}000{,}000$; case reserves $\$19{,}000{,}000$. ULAE is estimated at $4\%$ of unpaid loss and ALAE. Expected [[Salvage and Subrogation|salvage and subrogation]] recoveries on unpaid claims are $\$900{,}000$, and ceded recoveries on unpaid claims are $\$5{,}200{,}000$.
>
> State the gross and net unpaid claim liability.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Unpaid loss \& ALAE} &= \$68{,}000{,}000 - \$41{,}000{,}000 \\
> > &= \$27{,}000{,}000 \\[4pt]
> > \text{IBNR} &= \$27{,}000{,}000 - \$19{,}000{,}000 = \$8{,}000{,}000 \\[6pt]
> > \text{ULAE} &= 0.04 \times \$27{,}000{,}000 = \$1{,}080{,}000 \\[4pt]
> > \text{Gross unpaid} &= \$27{,}000{,}000 + \$1{,}080{,}000 \\
> > &= \$28{,}080{,}000
> > \end{align*}$$
> >
> > Net of recoveries:
> >
> > $$\begin{align*}
> > \text{Net unpaid} &= \$28{,}080{,}000 - \$900{,}000 - \$5{,}200{,}000 \\
> > &= \$21{,}980{,}000
> > \end{align*}$$
> >
> > Three things this shows. **ULAE has to be added explicitly** — it is in no case reserve and no loss triangle. **The recoveries are assets, not reductions of the liability**, in statutory presentation: ceded amounts are shown as reinsurance recoverable, and the insurer keeps the credit risk on them. And the difference between $\$28.1$M gross and $\$22.0$M net is entirely a question of collectability — which is why an actuary reporting a net figure states the gross alongside it.
