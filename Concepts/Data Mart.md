---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8e0305914354e3979a4e094c3e69bf5eaa94947f6b4bf48af7bd23c8518106ba
  sources:
    - "Oracle Business Intelligence Standard Edition One Tutorial 10.1.3, Data Mart Concepts, Appendix A, A.1-A.3 (data mart = single subject, often one department; data warehouse = multiple subjects; dependent marts draw from a central warehouse, independent marts directly from operational or external sources; ETL), sha256:2cdad56cd480d46df69d46bddc08c7cc0c7790ddc43a03622ff2fb2d0e667575 — https://docs.oracle.com/cd/E10352_01/doc/bi.1013/e10312/dm_concepts.htm"
    - "Kimball Group, Dimensional Modeling Techniques, Grain: what a single fact table row represents; declared first; atomic vs rolled-up grain, sha256:389b0d59da62943d4b303319f34832d42e196009a383db5796d0e06d8a28d394 — https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/grain/"
    - "Kimball Group, Dimensional Modeling Techniques, Star schemas: fact tables linked to dimension tables via primary/foreign keys; measurements vs descriptive context, sha256:7b5cf3beea426d7b5e83f4bb693a5e1de1debbe479913b278cdb547afd0cfedd — https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/star-schema-olap-cube/"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 Internal Data, printed p.36 (PDF p.48): some actuaries have a data mart designed for ratemaking, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Mart.md
---

A **Data Mart** is a subject-oriented store of data built for one department or business function, such as a claims mart for the claims department or an underwriting mart for underwriters. It holds only the subjects, fields and level of detail that group needs, usually drawn from the enterprise [[Data Warehouse|data warehouse]] and arranged for fast, simple reporting and analysis.

A warehouse serves the whole company and is large and general. A mart is smaller and shaped to one group's questions, which makes its queries simpler and faster. It also keeps data a department does not need, such as claimant medical details in an underwriting mart, out of that department's reach.

## Dependent and independent data marts

Data marts are of two kinds, told apart by their source:

| Kind | Source | Definitions |
| :--- | :--- | :--- |
| Dependent | The enterprise warehouse | The warehouse's single set |
| Independent | Operational source systems directly | Its own |

A dependent data mart is loaded from the enterprise warehouse. It inherits the warehouse's cleaned data and single set of definitions, such as one meaning of earned premium and one territory map, so figures from two dependent marts reconcile with each other and with the warehouse.

An independent data mart is built directly from operational source systems, with no warehouse in between. It is faster and cheaper to build for one department, but each one applies its own extraction and definitions, and two independent marts can report different numbers for the same quantity.

> [!example]- Why do these two marts report different loss ratios for the same region? {Example}
> Underwriting built an independent mart from the policy administration system. The claims mart is a dependent mart loaded from the warehouse. For the same region and year:
>
> | Mart | Premium reported ($ millions) | Incurred losses ($ millions) |
> | :--- | ---: | ---: |
> | Underwriting (independent) | 48.0 written | 30.1 |
> | Claims (dependent) | 45.6 earned | 30.1 |
>
> > [!answer]-
> > - The underwriting mart's loss ratio is $30.1/48.0 = 62.7\%$.
> > - The claims mart's loss ratio is $30.1/45.6 = 66.0\%$.
> > - The two marts divide the same losses by different premium measures, because the independent mart applied its own definition.
> > - A [[Loss Ratio|loss ratio]] for a calendar or accident year is computed on earned premium, which the warehouse already provides, so the claims mart's 66.0% is the consistent one.
> > - The written premium is higher here because the book is growing and part of the year's writings is still unearned.
> > - Loading the underwriting mart from the warehouse, as a dependent mart with the warehouse's definitions, removes the conflict.

## Star schema

Marts are usually arranged as a star schema. A central fact table holds the measures, such as paid losses, case reserves and claim counts, at a declared grain, and each of its rows carries foreign keys to dimension tables, such as accident date, territory, coverage and claim adjuster, that describe it. Queries join the fact table to the dimensions they need and aggregate.

Measures that are summed, such as losses, premium and counts, belong in the fact table. Descriptive attributes used to group and filter, such as territory, coverage or date, belong in the dimension tables. The schema is a layout of the data and does not change its totals.

## Grain

The grain is what one row of the fact table represents, such as one claim per valuation month, or one cell of accident quarter, development quarter, territory and coverage. It is the first design decision, because it fixes which questions the mart can answer. A mart at an aggregated grain cannot be drilled down to individual claims, or report results by agent when agent is not one of its dimensions. Summed up, a finer grain's rows give the same totals as a coarser grain over the same data.

If a fact table $F$ has one row per combination of its $k$ dimension keys, the number of rows it can have is

> $$\lvert F \rvert \le \prod_{j=1}^{k} \lvert D_j \rvert$$

- $\lvert D_j \rvert$ is the number of members of dimension $j$.

> [!example]- What fact table should this claims data mart use, and how many rows can it have? {Example}
> The claims department wants loss development triangles of paid losses, case reserves and claim counts by territory and coverage. The warehouse holds a claim transaction table of 3,000,000 rows (one per payment or reserve change), a claim table, a policy table, a territory table of 12 territories and a coverage table. The mart is to hold 20 accident quarters, developed quarterly to the latest valuation, for 4 coverages.
>
> > [!answer]-
> > - Take the grain to be accident quarter by development quarter by territory by coverage, with paid losses, case reserves and reported claim count as the measures.
> > - The dimensions are accident quarter, development quarter, territory and coverage, the last two taken from the warehouse's tables so that the mart uses the warehouse's definitions.
> > - At the latest valuation the oldest accident quarter has 20 development quarters and the newest has 1, so each triangle has $20 + 19 + \dots + 1 = 210$ cells, not $20 \times 20$.
> > - The fact table has at most $210 \times 12 \times 4 = 10{,}080$ rows instead of 3,000,000 transactions.
> > - A question about individual claims, such as the largest open claims, is below this grain and must go back to the warehouse, so a claims mart often also keeps a claim-level fact table.

> [!trap] Dependent and independent describe the source
> A dependent mart is fed by the warehouse, and an independent mart is fed by the operational systems directly. The size of the mart or the department that owns it does not decide which kind it is.
