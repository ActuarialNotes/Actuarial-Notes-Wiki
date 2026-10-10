---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:b3fcf7c7e9b2b5e4fe6d3310786ea4d77f8172fc825d800be97ac00373512f1b
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 55 ¶4, 6.a-c, 11, 13-14 (PDF pp.362-363, 367); SSAP No. 62R ¶31 (PDF pp.441-442), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), Ch.2 p.12 (printed 11); Ch.22 p.306 (printed 305), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, updated for deviation language May 2011, Doc. No. 159), sections 2.1, 2.11 (PDF p.8) — re-fetched this run; this ASB copy's hash differs from the copy cited in run f8d9 (the 2011 deviation-language reissue), definitions identical, sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.1 printed pp.13-14 — prior-pass source, re-fetched, hash unchanged, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unpaid Claims.md
---

**Unpaid Claims** are the insurer's liability at a valuation date for claims that have occurred but are not yet fully paid. The **unpaid claim estimate** is the central output of a reserve analysis, and [[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] defines it as the actuary's estimate of the obligation for future payment resulting from claims due to past events.

> $$\text{Unpaid} = \text{Ultimate} - \text{Paid to date}$$

> $$\text{Unpaid} = \text{Case Reserves} + \text{IBNR}$$

- The two identities are the same quantity split differently: by **what is known** (case reserves on reported claims plus [[IBNR]] for everything else), or by **what remains** (ultimate less what has been paid).
- The estimate covers indemnity, [[Allocated Loss Adjustment Expense|ALAE]] and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]] — the last of which is never in a case reserve and must be added in bulk. It must also reflect [[Salvage and Subrogation|salvage and subrogation]] and [[Reinsurance Recovery|reinsurance recoveries]] on whatever basis is being reported.
- Friedland and ASOP 43 prefer *unpaid claims* to *reserves* deliberately: it is an estimate of a **future payment obligation**, not a fund of money set aside. The distinction matters when explaining results to non-actuaries, who often assume a reserve is cash in an account.
- ASOP 43's **actuarial central estimate** is an estimate "that represents an expected value over the range of reasonably possible outcomes" — not a conservative figure, not a best case, and not necessarily any particular percentile of the distribution.
- The estimate applies equally to **non-insurance entities that retain risk** — self-insureds, captives, public entities, pools — for their [[Self-Insured Retention|retained layer]], which is why the reserving syllabus covers them alongside insurers.
- Accuracy matters beyond the balance sheet: unpaid claim estimates drive solvency assessment, [[Ratemaking|ratemaking]] (through ultimate loss ratios), reinsurance commutations, collateral requirements, and the price of the company itself in a transaction.
- **Statutory accounting (SSAP No. 55):** In a U.S. insurer's statutory statements, losses and LAE are recognized as expenses when the covered event occurs, which for a claims-made policy is the reporting of the incident to the insurer, and a liability is set up for what is unpaid: reported losses, IBNR (including bulk provisions for deficiencies in case reserves) and LAE. The liability is based on the estimated ultimate cost of settling the claims, including inflation, and is not discounted unless a specific SSAP allows it. Management records its best estimate for each line and in total; where it estimates a range and no point is better than another, it records the midpoint. Reserves recoverable from reinsurers are netted against the gross liability (SSAP No. 62R), so the statutory balance sheet shows unpaid claims net of reinsurance.

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

> [!tip]- How it appears on the exam
> - **DISC-IA:** Loss reserves appear in the objectives on loss and LAE accounting and on the relationship between loss reserves and the [[Unearned Premium|unearned premium reserve]]. Expect a question asking when a loss is recognized, what the reserve includes, or whether an amount belongs in the loss reserves or the UPR.
> - **Exam 5:** Reserving questions split the unpaid estimate into case and IBNR and build the full liability, as in the examples above.

> [!warning]- Exam traps
> - **Occurrence versus report:** Under an occurrence policy the loss is recognized when the event occurs, even if no one has reported it yet (IBNR). Only for claims-made coverage is the report the covered event.
> - **Statutory reserves are net:** SAP nets ceded reserves against the liability; GAAP shows the gross liability and a reinsurance recoverable asset.
> - **No discount by default:** Statutory loss reserves are undiscounted unless a specific SSAP permits discounting.
