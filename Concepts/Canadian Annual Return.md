---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2b58f8d62e5c74d87da317c6e415faf94e4dfbe6376f12d60ad2c4524929d9ac
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Canadian Annual Return.md
---

**The Canadian Annual Return** is the standardised regulatory filing every Canadian P&C insurer submits to [[OSFI]] and to provincial regulators after each year end. It contains the audited financial statements, extensive supporting exhibits (loss development, reinsurance, investments, business by province and class), the [[MCT]] capital calculation, and the [[Appointed Actuary]]'s [[Statement of Actuarial Opinion]].

- **What it is for.** It is the regulator's primary window into an insurer, and it is standardised so that companies can be compared with one another and monitored over time. The [[Canadian Council of Insurance Regulators|CCIR]] and OSFI publish the instructions that govern its preparation.
- **Principal components:**
  - Audited **financial statements** — [[Financial Position|statement of financial position]], statement of income, [[Comprehensive Income|comprehensive income]], [[Statement of Changes in Equity|changes in equity]], cash flows, and [[Notes to Financial Statements|notes]].
  - **Supplementary exhibits** — premiums and claims by province and class of insurance, claims development (paid and incurred by accident year, the Canadian analogue to Schedule P), reinsurance ceded by reinsurer with [[Registered Reinsurance|registered]] and [[Unregistered Reinsurance|unregistered]] status, investment schedules.
  - The **[[MCT]]** calculation, showing [[Capital Available]], [[Capital Required]] and the [[Base Solvency Buffer]].
  - The **Appointed Actuary's report and opinion** on [[Insurance Contract Liabilities]].
- **The [[Quarterly Return]]** is a reduced version filed each quarter, giving OSFI a more frequent read on capital and results.
- **The claims development exhibit** is the most heavily used by analysts: it shows how each accident year's estimate has moved over successive valuations, so persistent adverse or favourable development becomes visible and cannot be concealed by a single year's release.
- **Public availability** and the derived ratio sets — the [[MSA Ratios]] published by MSA Research from return data — are what make Canadian P&C financial analysis possible from outside a company.
- The return was substantially rebuilt for [[IFRS 17]]: line items now follow [[Insurance Revenue]], [[Insurance Service Expenses]] and [[Insurance Finance Income or Expenses]] rather than written and earned premium and incurred losses.

> [!example]- Reading the Development Exhibit {Example}
> An insurer's annual return shows, for accident year 2021, the estimated ultimate claims as reported at successive year ends:
>
> $\$142$M (2021), $\$148$M (2022), $\$157$M (2023), $\$169$M (2024).
>
> Surplus is $\$210$ million and total unpaid claims are $\$480$ million. What would a regulator or analyst conclude?
>
> > [!answer]-
> > **Cumulative adverse development of $\$27$ million on one accident year — $19\%$ above the original estimate — and it is accelerating** ($+\$6$M, $+\$9$M, $+\$12$M).
> >
> > The inferences, in order of importance:
> >
> > 1. **The reserving process is biased low, not merely uncertain.** Three consecutive movements in the same direction, growing in size, is not random error around an unbiased estimate.
> > 2. **Other accident years are probably affected too.** Whatever assumption is wrong — development factors, trend, a change in claims handling — applies across years, so the exhibit for 2022 and 2023 should be examined for the same pattern. If the whole book is $19\%$ light, the deficiency is roughly $\$91$ million against $\$210$ million of surplus.
> > 3. **Pricing is contaminated.** Rate indications built on understated loss estimates produce inadequate rates, so current business is being written at a loss — and under [[IFRS 17]] that should be surfacing as [[Onerous Contract|onerous]] groups.
> > 4. **The [[MCT]] is overstated** to the extent liabilities are understated, so the reported capital ratio flatters the position.
> >
> > **What should have happened first.** The [[Appointed Actuary]] performs a roll-forward or actual-versus-expected analysis at each valuation; three years of one-sided deviation should have triggered a change in method or assumptions by the second observation. An exhibit that shows this pattern while the opinion remained unqualified invites the regulator's obvious question.
