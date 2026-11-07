---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:8a0ec0aa77241ba315c632852236038b6c90d10c41c3fb3c4402d301109b8bd6
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 pp.40-42 (PDF pp.46-48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Friedland, Reserving for Reinsurance (CAS Exam 7 study note), Ch.2 printed pp.35-37 (PDF pp.37-39), Ch.3 printed pp.49, 51-52 (PDF pp.51, 53-54), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Year.md
---

![[Media/Figures/Underwriting_Year.svg|340]]

An **Underwriting Year** is a grouping of claims and premium by the year in which the reinsurance contract became effective. It is also called a treaty year or contract year, and it is the [[Policy Year|policy year]] of reinsurance: each cohort holds all the contracts incepting in that year. The loss ratio of underwriting year $n$ is

> $$\text{Loss Ratio} = \frac{\text{Losses on contracts incepting in year } n}{\text{Premium on contracts incepting in year } n}$$

On a direct book, underwriting year and policy year are the same thing. Underwriting year data are frequently used by reinsurers, and at Lloyd's financial reporting by underwriting year is more common than by accident year.

> [!example]- A reinsurance contract incepting $1/1/2024$ covers losses occurring under the cedant's 12-month policies written during 2024. Over what period can accidents fall in underwriting year 2024? {Example}
> - The first policy subject to the contract is written $1/1/2024$, so the earliest accident date is $1/1/2024$.
> - The last policy is written $12/31/2024$ and runs through $12/30/2025$.
> - The accident dates therefore run from $1/1/2024$ through $12/30/2025$, a 24-month exposure window.

## Advantages and disadvantages of underwriting year data

The greatest advantage of underwriting year aggregation is a true match between claims and the premium of the same contracts. The ceded premium, the commission and the losses of an underwriting year all belong to one set of contract terms, such as the attachment point, the limit and the treaty conditions.

The primary disadvantage is the extended time frame. Claims under 12-month contracts occur over a 24-month period, so they take longer to be reported, and ultimate claims take longer to estimate reliably than for an [[Accident Year|accident year]]. Underwriting year 2024 also holds contracts incepting later in 2024. Under an annual risks-attaching treaty effective $12/31/2024$, a policy written $12/30/2025$ can have an accident as late as $12/29/2026$, so the underwriting year's accidents span 36 months ([[Reserving for Reinsurance (Friedland - 2022)|Friedland]]).

At early maturities the premium is not fully earned and the cumulative development factors are highly leveraged, so reinsurers lean on the [[Expected Loss Method|expected claims]] and [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] techniques there.

> [!example]- A cedant writes a policy on $7/1/2024$ subject to a treaty effective $1/1/2024$. A claim occurs on $3/15/2025$. In which underwriting year, policy year and accident year does it fall? {Example}
> - It falls in underwriting year 2024, the year the treaty became effective.
> - It falls in policy year 2024, the year the cedant's policy became effective.
> - It falls in accident year 2025, the year the loss occurred.
> - The reinsurer's underwriting year 2024 therefore still has claims emerging long after the cedant's accident year 2024 has largely settled.

> [!trap] Re-cutting underwriting year data into accident years
> Converting between bases loses information: a UY triangle cannot be re-cut into accident years without claim-level accident dates. Reports reaching reinsurers often give only summary claim detail, or calendar year or underwriting year data rather than accident year data, which hampers their reserve estimates.
