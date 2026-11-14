---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e83318048bbe6183fdf68ebc1403bcc4b8f6771c7b6c46b7ebd582a94f45c6f8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Schedule P.md
---

**Schedule P** is the part of the [[NAIC Annual Statement]] that reports a U.S. P&C insurer's premium, loss and loss adjustment expense history by line of business and incurred year, for ten years plus a "prior" row. It is the public dataset for loss-development analysis and the data the Appointed Actuary reconciles to in the Statement of Actuarial Opinion.

Schedule P has seven parts, followed by interrogatories:

1. **Part 1**, by line: earned premium; paid and unpaid losses, DCC and AO; direct and assumed, ceded and net; salvage and subrogation; claim counts; loss and LAE ratios; discount. Part 1 Summary totals all lines and ties to the income statement and page 3.
2. **Part 2**: incurred net losses and DCC (paid + case + bulk and IBNR) at each year end, with one-year and two-year development columns.
3. **Part 3**: cumulative paid net losses and DCC, with claims closed with loss payment.
4. **Part 4**: bulk and IBNR.
5. **Part 5**: claim counts closed with payment, outstanding and reported, on a direct and assumed basis.
6. **Part 6**: earned premium by year of coverage, restated for audits and retrospective adjustments.
7. **Part 7**: loss-sensitive contracts.

## Basis of the triangles

The triangles are net of reinsurance, net of [[Salvage and Subrogation|salvage and subrogation]] and undiscounted. They include **DCC, which correlates with loss, but not AO**, which does not ([[Litigation Costs]]). Occurrence lines use accident year, and claims-made lines use report year. Retroactive reinsurance is excluded.

## Reported losses and case reserves

Parts 2, 3 and 4 are all net losses plus DCC for the same line, incurred year and valuation, so subtracting them recovers the [[Incurred Losses|reported (case-incurred)]] losses an actuary develops. The reported losses are

> $$\text{Reported losses} = \text{Part 2} - \text{Part 4}$$

and the case reserves are

> $$\text{Case reserves} = \text{Part 2} - \text{Part 3} - \text{Part 4}$$

> [!example]- What are this line's reported triangle, age-to-age factors and AY 2021 case reserve at 36 months? {Example}
> Schedule P for one line ($\$000$, net losses and DCC), shifted so that columns are ages in months. Part 3 shows AY 2021 paid of $3{,}900$ at 36 months.
>
> Part 2, incurred:
>
> | AY | 12 | 24 | 36 |
> | :--- | ---: | ---: | ---: |
> | 2021 | 5,000 | 5,300 | 5,450 |
> | 2022 | 5,400 | 5,800 | |
> | 2023 | 6,000 | | |
>
> Part 4, bulk and IBNR:
>
> | AY | 12 | 24 | 36 |
> | :--- | ---: | ---: | ---: |
> | 2021 | 2,000 | 1,100 | 600 |
> | 2022 | 2,200 | 1,300 | |
> | 2023 | 2,500 | | |
>
> > [!answer]-
> > - Reported losses are Part 2 minus Part 4:
> >
> > | AY | 12 | 24 | 36 |
> > | :--- | ---: | ---: | ---: |
> > | 2021 | 3,000 | 4,200 | 4,850 |
> > | 2022 | 3,200 | 4,500 | |
> > | 2023 | 3,500 | | |
> >
> > - The volume-weighted 12–24 factor is $(4{,}200 + 4{,}500)/(3{,}000 + 3{,}200) = 1.403$.
> > - The 24–36 factor is $4{,}850/4{,}200 = 1.155$.
> > - AY 2021's case reserve at 36 months is $5{,}450 - 3{,}900 - 600 = 950$.
> > - [[Age to Age Factor]] and [[Chain Ladder Method]] take the factors from here.

## One-year development

The one-year development of an incurred year is its Part 2 incurred at the latest year end minus its Part 2 incurred a year earlier. Positive development is **adverse**: the prior year's estimate was too low, and the shortfall came out of this year's income.

> [!example]- Using the Part 2 figures above, what is the one-year development of AY 2021 and 2022, as a share of prior-year surplus of $\$9{,}000$ thousand? {Example}
> - AY 2021 developed $5{,}450 - 5{,}300 = +150$.
> - AY 2022 developed $5{,}800 - 5{,}400 = +400$.
> - The total is $+550$, which is $550/9{,}000 = 6.1\%$ of prior-year surplus.
> - Both years developed adversely, and the younger year by more, so the actuary should ask whether the latest accident year, estimated on the same basis, is also understated.

## Uses in the opinion

The scope paragraph of the opinion states that the actuary reconciled the data used to Schedule P Part 1 ([[SAO Language]]). Beyond reconciliation, the actuary can develop the Part 2 − Part 4 and Part 3 [[Development Triangle|triangles]], compare paid-to-reported ratios, read closure rates from Part 5 ([[Claim Count Triangle]]), and use the development columns to test the carried reserves' history. The same data lie behind the [[IRIS Ratios]] reserve tests and the [[Risk-Based Capital|RBC]] reserve charge.

## Limitations

Net data mix gross development with reinsurance changes ([[Reinsurance Recovery]]). The lines are broad groupings. Ten years is short for a long tail, so a [[Tail Factor]] still needs outside support. Part 4 shows carried IBNR, not its development, so it cannot by itself test IBNR adequacy. The external auditor tests Part 1 excluding bulk and IBNR and claim counts.

> [!trap] Developing Part 2 as the reported triangle
> Part 2 includes the company's bulk and IBNR, so developing it directly projects the company's own IBNR forward and mixes its reserving judgment into the data. Subtract Part 4 first to get the independent view an opining actuary needs.
