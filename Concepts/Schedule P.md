---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a97701f844ac7a77d3ea6c439b3d23b00e94c23585c25fc15d53eaea215415f6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Schedule P.md
---

**Schedule P** is the part of the [[NAIC Annual Statement]] that reports a U.S. P&C insurer's premium, loss and loss adjustment expense history by line of business and incurred year — ten years plus a "prior" row — in a summary part, triangles of incurred, paid and bulk-plus-IBNR amounts, and claim counts. It is the public dataset for loss-development analysis and the data the Appointed Actuary reconciles to in the Statement of Actuarial Opinion.

> $$\text{Case reserves} = \text{Part 2} - \text{Part 3} - \text{Part 4}$$
>
> $$\text{Reported losses} = \text{Part 2} - \text{Part 4}$$

- All three are net losses plus DCC for the same line, incurred year and valuation: **Part 2** is incurred (paid + case + bulk and IBNR), **Part 3** cumulative paid, **Part 4** bulk and IBNR. Subtracting recovers the case reserves and the [[Incurred Losses|reported (case-incurred)]] triangle an actuary actually develops.
- **The seven parts.** Part 1 — by line: earned premium; paid and unpaid losses, DCC and AO; direct and assumed, ceded and net; salvage and subrogation; claim counts; loss and LAE ratios; discount. Part 1 Summary totals all lines and ties to the income statement and page 3. Part 2 — incurred net losses and DCC at each year end, with **one-year and two-year development** columns. Part 3 — cumulative paid net losses and DCC, with claims closed with loss payment. Part 4 — bulk and IBNR. Part 5 — claim counts closed with payment, outstanding and reported, on a direct and assumed basis. Part 6 — earned premium by year of coverage, restated for audits and retrospective adjustments. Part 7 — loss-sensitive contracts. Interrogatories follow.
- **Basis of the triangles:** net of reinsurance, net of [[Salvage and Subrogation|salvage and subrogation]], undiscounted; they include **DCC, which correlates with loss, but not AO**, which does not ([[Litigation Costs]]). Occurrence lines use accident year; claims-made lines use report year. Retroactive reinsurance is excluded.
- **Uses in the opinion.** The scope paragraph states that the actuary reconciled the data used to Schedule P Part 1 ([[SAO Language]]). Beyond reconciliation, the actuary can develop the Part 2 − Part 4 and Part 3 [[Development Triangle|triangles]], compare paid-to-reported ratios, read closure rates from Part 5 ([[Claim Count Triangle]]), and use the development columns to test the carried reserves' history — the same data behind the [[IRIS Ratios]] reserve tests and the [[Risk-Based Capital|RBC]] reserve charge.
- **Limitations:** net data mix gross development with reinsurance changes ([[Reinsurance Recovery]]); lines are broad groupings; ten years is short for a long tail, so a [[Tail Factor]] still needs outside support; Part 4 shows carried IBNR, not its development, so it cannot by itself test IBNR adequacy; and the external auditor tests Part 1 excluding bulk and IBNR and claim counts.

> [!example]- Development Factors From Schedule P {Example}
> Schedule P for one line ($\$000$, net losses and DCC), shifted so that columns are ages in months.
>
> Part 2, incurred:
>
> | AY | 12 | 24 | 36 |
> |---|---|---|---|
> | $2021$ | $5{,}000$ | $5{,}300$ | $5{,}450$ |
> | $2022$ | $5{,}400$ | $5{,}800$ | |
> | $2023$ | $6{,}000$ | | |
>
> Part 4, bulk and IBNR:
>
> | AY | 12 | 24 | 36 |
> |---|---|---|---|
> | $2021$ | $2{,}000$ | $1{,}100$ | $600$ |
> | $2022$ | $2{,}200$ | $1{,}300$ | |
> | $2023$ | $2{,}500$ | | |
>
> Part 3 shows AY 2021 paid of $3{,}900$ at 36 months. Build the reported triangle, derive volume-weighted age-to-age factors, and find AY 2021's case reserve at 36 months.
>
> > [!answer]-
> > **Reported = Part 2 − Part 4:**
> >
> > | AY | 12 | 24 | 36 |
> > |---|---|---|---|
> > | $2021$ | $3{,}000$ | $4{,}200$ | $4{,}850$ |
> > | $2022$ | $3{,}200$ | $4{,}500$ | |
> > | $2023$ | $3{,}500$ | | |
> >
> > $$\begin{align*}
> > f_{12 \to 24} &= \frac{4{,}200 + 4{,}500}{3{,}000 + 3{,}200} \\
> > &= 1.403 \\[4pt]
> > f_{24 \to 36} &= \frac{4{,}850}{4{,}200} \\
> > &= 1.155 \\[4pt]
> > \text{Case}_{2021,36} &= 5{,}450 - 3{,}900 - 600 \\
> > &= 950
> > \end{align*}$$
> >
> > Developing Part 2 directly would project the company's *own* IBNR forward and mix a reserving judgement into the data; stripping Part 4 out first gives an independent view — which is what an opining actuary needs. See [[Age to Age Factor]] and [[Chain Ladder Method]].

> [!example]- One-Year Development as an Adequacy Signal {Example}
> Using the Part 2 figures above, compute the one-year development at the latest year end for AY 2021 and 2022, and compare it with prior-year surplus of $\$9{,}000$ thousand.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{AY 2021} &= 5{,}450 - 5{,}300 \\
> > &= +150 \\[4pt]
> > \text{AY 2022} &= 5{,}800 - 5{,}400 \\
> > &= +400 \\[4pt]
> > \text{Total} &= +550 \\[4pt]
> > \frac{550}{9{,}000} &= 6.1\%
> > \end{align*}$$
> >
> > Positive development is **adverse**: last year's estimates of these accident years were $\$550$ thousand too low, and the shortfall came out of this year's income. Both years moved the same way, and the younger year moved more, so the actuary should ask whether the latest accident year, estimated on the same basis, is also understated.
