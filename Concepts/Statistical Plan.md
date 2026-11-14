---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6ddcc3e971e5fe7fe6cbf71de0d5897fa1dc1cbf1c695abce966bc6c1e50c0ca
  sources:
    - "NAIC, Statistical Handbook of Data Available to Insurance Regulators (2012), as hosted by the Alaska Division of Insurance, §1.3 financial vs statistical data, §1.4 pooled data and statistical agents, §1.6 role of statistical agents and statistical plans (data elements, formats, coding), §2.3.1-2.3.3 control totals, reconciliation to Annual Statement State Pages, validity checks; §5 private passenger auto data elements; §23A unit statistical reports; App. A statistical agents (AAIS, ISO, NCCI), PDF pp.13-30, 71-76, 229-232, 289-298, sha256:b2929917f42e54e41b4904be523f776f28c21c482933613eca3432982b7561ca — https://www.commerce.Alaska.gov/web/Portals/11/Pub/INS_StatisticalHandbookDataInsurance%20Regulators.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 External Data / Statistical Plans, printed pp.44-45 (PDF pp.56-57); App. D advisory loss costs and company deviation, PDF pp.394-398, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "NCCI, ABCs of Experience Rating (copy hosted by CEIWC), 'Data Used on the Experience Rating Worksheet': payroll and loss information used to calculate the mod comes from unit statistical reports filed under NCCI's Statistical Plan, sha256:268bbb28e4894f10ca942274a62ac2bcd6237e9278ddd1df8f414da99e0f31ed — https://www.ceiwc.com/PDFs/ABCs-of-Experience-Rating-NCCI.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statistical Plan.md
---
A **Statistical Plan** is a standardized set of rules and codes by which insurers report their premium, exposure and loss data to a statistical agent, such as the Insurance Services Office (ISO), the National Council on Compensation Insurance (NCCI) or the American Association of Insurance Services (AAIS). Because every reporting insurer codes line, class, territory, coverage, exposure, premium and losses the same way, the agent can combine their data into industry statistics that support [[Classification Ratemaking|ratemaking]] and [[Insurance Regulation|regulation]].

A statistical plan defines a record layout and the code lists that fill it. Premium and exposure are reported on premium records, and claims on separate loss records:

| Premium record | Loss record |
| :--- | :--- |
| State, line and subline | The same classification codes |
| Class, territory and coverage | Accident date |
| Limit and deductible | Number of claims |
| Policy effective date | Paid and outstanding losses |
| Exposure and premium amounts | |

A loss cost needs both kinds of record, matched on the same classification codes and the same experience period. Every characteristic is reported as a code from the plan's tables rather than as free text, so one insurer's "downtown core" and another's "central business district" both map to the same territory code. The agent's edits flag records with codes that are not on the lists, and the insurer must correct them. Amount and exposure fields often carry implied decimals or units, such as tenths of a car-year.

> [!example]- What does this statistical plan record report, and what is its average earned premium per car-year? {Example}
> An illustrative personal auto statistical plan uses a pipe-delimited premium record with the fields record type, state, line, class, territory, coverage, accounting month, earned exposure in tenths of a car-year, and earned premium in whole dollars. The code lists give `P` = premium record, `29` = the reporting state, `AU` = private passenger auto, `7398` = adult driver with no youthful operator, `12` = territory 12, and `BI` = bodily injury liability. The record is `P|29|AU|7398|12|BI|202403|000183|0012755`.
>
> > [!answer]-
> > - The record reports bodily injury liability premium for private passenger auto, adult drivers with no youthful operator, in territory 12 of the reporting state.
> > - The accounting month is March 2024.
> > - The exposure field is in tenths, so `000183` is 18.3 car-years.
> > - The earned premium is \$12,755.
> > - The average earned premium is $12{,}755 / 18.3 = \$697$ per car-year.
> > - Reading `000183` as 183 car-years would give about \$70, a tenth of the right figure.

## Advisory loss costs

An advisory organization such as ISO uses the pooled data to develop loss costs and rating factors by class and territory that member insurers can adopt or adjust. For class $c$ in territory $t$, the industry [[Loss Cost|loss cost]] is

> $$\text{LC}_{c,t} = \frac{\sum_{j} L_{j,c,t}}{\sum_{j} E_{j,c,t}}$$

- $L_{j,c,t}$ is the losses insurer $j$ reports for the cell.
- $E_{j,c,t}$ is the [[Earned Exposure|earned exposure]] insurer $j$ reports for the cell.

A small insurer's own data are too thin for credible class and territory relativities, so the industry statistics give it a starting point. It can blend its own experience with the industry figure using a [[Credibility|credibility]] weight $Z$. Its blended loss cost is

> $$\hat{\text{LC}}_{j,c,t} = Z \times \frac{L_{j,c,t}}{E_{j,c,t}} + (1 - Z) \times \text{LC}_{c,t}$$

> [!example]- What blended loss cost does Insurer A get from this pooled data? {Example}
> Three insurers report statistical data for one class and territory cell. Insurer A has an illustrative credibility of $Z = 0.30$.
>
> | Insurer | Car-years | Losses |
> | :--- | ---: | ---: |
> | A | 400 | \$260,000 |
> | B | 1,100 | \$610,000 |
> | C | 2,500 | \$1,370,000 |
>
> > [!answer]-
> > - The industry figure pools 4,000 car-years and \$2,240,000 of losses, so $\text{LC} = 2{,}240{,}000 / 4{,}000 = \$560$.
> > - Insurer A's own loss cost is $260{,}000 / 400 = \$650$, an estimate that rests on very few claims.
> > - The blend is $0.30 \times 650 + 0.70 \times 560 = \$587$.
> > - The pooled statistical plan data move Insurer A's loss cost from \$650 to \$587.

> [!trap] Treating the statistical agent as the ratemaker
> A statistical agent collects and aggregates the data. Advisory loss costs built from those data are a starting point that each insurer may adopt or adjust, and the insurer still files its own rates.

## Uses in regulation

Regulators require insurers to report statistical data to a licensed or designated statistical agent. They use the compiled data to review rate filings, monitor market conditions and study topics such as availability of coverage. In workers compensation, NCCI's unit statistical data also feed [[Experience Rating|experience rating]] of individual employers.

## Statistical data and financial data

Statistical plans report data at a much finer level than the [[NAIC Annual Statement|annual statement]]. Agents compare an insurer's statistical totals with its financial reporting to check that nothing was lost. The two are designed for different purposes, so timing and definitions can differ and have to be reconciled.

## Limits of a statistical plan

A statistical plan captures only the fields it defines, so a modern rating variable that the plan does not code, such as a telematics score, is not available from the agent. Insurers therefore combine statistical plan data with their own operational data and [[External Data|external data]].
