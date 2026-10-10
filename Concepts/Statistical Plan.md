---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1bbe0750591ae6654d26bc9013fd738a69c4ebc15f9ab34031655ec92dda63c4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statistical Plan.md
---

A **Statistical Plan** is a standardized set of rules and codes by which insurers report their premium, exposure and loss data to a statistical agent, such as the Insurance Services Office (ISO), the National Council on Compensation Insurance (NCCI) or the American Association of Insurance Services (AAIS). Because every reporting insurer codes line, class, territory, coverage, exposure, premium and losses the same way, the agent can combine their data into industry statistics that support [[Classification Ratemaking|ratemaking]] and [[Insurance Regulation|regulation]].

> $$\text{LC}_{c,t} = \frac{\sum_{j} L_{j,c,t}}{\sum_{j} E_{j,c,t}}$$

> $$\hat{\text{LC}}_{j,c,t} = Z \times \frac{L_{j,c,t}}{E_{j,c,t}} + (1 - Z) \times \text{LC}_{c,t}$$

- **Symbols:** $L_{j,c,t}$ and $E_{j,c,t}$ are the losses and [[Earned Exposure|earned exposure]] that insurer $j$ reports for class $c$ in territory $t$, and $\text{LC}_{c,t}$ is the industry [[Loss Cost|loss cost]] for that cell. The second block shows how an insurer with thin data can blend its own experience with the industry figure using a [[Credibility|credibility]] weight $Z$.
- **What a record holds:** A statistical plan defines a record layout and the code lists that fill it. A premium record typically carries the state, the line and subline, the class, the territory, the coverage, the limit and deductible, the policy effective date, and the exposure and premium amounts. A loss record carries the same classification codes with the accident date, the number of claims, and the paid and outstanding losses.
- **Coded fields:** Every characteristic is reported as a code from the plan's tables rather than as free text, so that one insurer's "downtown core" and another's "central business district" both map to the same territory code. The agent's edits reject records with codes that are not on the lists.
- **Uses in ratemaking:** An advisory organization such as ISO uses the pooled data to develop loss costs and rating factors that member insurers can adopt or adjust. A small insurer's own data are too thin for credible class and territory relativities, so the industry statistics give it a starting point.
- **Uses in regulation:** Regulators require insurers to report statistical data to a licensed or designated statistical agent, and use the compiled data to review rate filings, monitor market conditions and study topics such as availability of coverage. In workers compensation, NCCI's unit statistical data also feed [[Experience Rating|experience rating]] of individual employers.
- **Statistical data versus financial data:** Statistical plans report data at a much finer level than the [[NAIC Annual Statement|annual statement]], and agents compare an insurer's statistical totals with its financial reporting to check that nothing was lost. The two are designed for different purposes, so timing and definitions can differ and have to be reconciled.
- **Limits:** A statistical plan captures only the fields it defines, so a modern rating variable that the plan does not code, such as a telematics score, is not available from the agent. Insurers therefore combine statistical plan data with their own operational data and [[External Data|external data]].

> [!example]- Decoding a Statistical Plan Record {Example}
> An illustrative personal auto statistical plan uses a pipe-delimited premium record with the fields record type, state, line, class, territory, coverage, accounting month, earned exposure in tenths of a car-year, and earned premium in whole dollars. The code lists give `P` = premium record, `29` = the reporting state, `AU` = private passenger auto, `7398` = adult driver with no youthful operator, `12` = territory 12, and `BI` = bodily injury liability. Decode the record `P|29|AU|7398|12|BI|202403|000183|0012755` and compute the average earned premium per car-year.
>
> > [!answer]-
> > The record reports bodily injury liability premium for private passenger auto, adult drivers with no youthful operator, in territory 12 of the reporting state, for accounting month March 2024. The exposure field is in tenths, so `000183` is 18.3 car-years, and the premium is \$12,755.
> > $$
> > \begin{align*}
> > \bar{P} &= \frac{12{,}755}{18.3} \\
> > &= 696.99
> > \end{align*}
> > $$
> > The average earned premium is about \$697 per car-year. Reading `000183` as 183 car-years would give about \$70, which is why the plan's units and implied decimals belong in the code list.

> [!example]- Pooling Data Across Insurers {Example}
> Three insurers report statistical data for one class and territory cell. Insurer A reports 400 car-years and \$260,000 of losses, Insurer B 1,100 car-years and \$610,000, and Insurer C 2,500 car-years and \$1,370,000. Compute the industry loss cost and Insurer A's own loss cost, then blend them for Insurer A with an illustrative credibility of $Z = 0.30$.
>
> > [!answer]-
> > The industry figure pools all 4,000 car-years and \$2,240,000 of losses.
> > $$
> > \begin{align*}
> > \text{LC} &= \frac{2{,}240{,}000}{4{,}000} \\
> > &= 560 \\
> > \text{LC}_A &= \frac{260{,}000}{400} \\
> > &= 650 \\
> > \hat{\text{LC}}_A &= 0.30 \times 650 + 0.70 \times 560 \\
> > &= 587
> > \end{align*}
> > $$
> > Insurer A's 400 car-years alone would put its loss cost at \$650, but that estimate rests on very few claims. The pooled statistical plan data move it to \$587, which is the kind of stability an advisory loss cost gives a small insurer.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Questions ask what a statistical plan is, who collects the data, and what the data are used for, often by contrasting statistical plan data with an insurer's own operational data and with external data sources from the same topic. Expect to identify the fields a premium or loss record carries, or to explain why an insurer would rely on industry statistics.
> - **Applied questions:** A scenario may describe a small insurer entering a new line or territory and ask which data source supports its rates. Statistical plan data through an advisory organization is the usual answer, with the limit that it covers only the fields the plan codes.

> [!warning]- Exam traps
> - **The agent compiles, it does not set rates:** A statistical agent collects and aggregates the data. Advisory loss costs built from those data are a starting point that each insurer may adopt or adjust, and the insurer still files its own rates.
> - **Premium records and loss records are separate:** Premium and exposure are reported on premium records, and claims are reported on loss records with an accident date. A loss cost needs both, matched on the same classification codes and the same experience period.
> - **Codes carry implied units:** Amount and exposure fields often have implied decimals or units, such as tenths of a car-year. Misreading them shifts every average by a factor of ten.
> - **Not every rating variable is in the plan:** A statistical plan only holds the characteristics its code lists define. A variable an insurer rates on but the plan does not code must come from the insurer's own data.
