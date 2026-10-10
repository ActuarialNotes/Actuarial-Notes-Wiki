---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:05058169428bca1e76397ed2550010ef0168de61644dc8cb334c0134623a3609
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Mart.md
---

A **Data Mart** is a subject-oriented store of data built for one department or business function, such as a claims mart for the claims department or an underwriting mart for underwriters. It holds only the subjects, fields and level of detail that group needs, usually drawn from the enterprise [[Data Warehouse|data warehouse]] and arranged for fast, simple reporting and analysis.

> $$M = \pi_{A}\big(\sigma_{\theta}(W)\big)$$

> $$\lvert F \rvert \le \prod_{j=1}^{k} \lvert D_j \rvert$$

- **Symbols:** $W$ is the warehouse, $\sigma_{\theta}$ selects the rows meeting condition $\theta$ (the subject, such as claims on personal auto), and $\pi_A$ keeps only the set of fields $A$ the department uses, so $M$ is the mart. In the second block, $F$ is a fact table with one row per combination of its $k$ dimension keys, and $\lvert D_j \rvert$ is the number of members of dimension $j$, so the dimensions bound the number of rows the fact table can have.
- **Dependent mart:** A dependent data mart is loaded from the enterprise warehouse. It inherits the warehouse's cleaned data and single set of definitions, such as one meaning of earned premium and one territory map, so figures from two dependent marts reconcile with each other and with the warehouse.
- **Independent mart:** An independent data mart is built directly from operational source systems, with no warehouse in between. It is faster and cheaper to build for one department, but each one applies its own extraction and definitions, and two independent marts can report different numbers for the same quantity.
- **Star schema:** Marts are usually arranged as a star schema. A central fact table holds the measures, such as paid losses, case reserves and claim counts, at a declared grain, and each of its rows carries foreign keys to dimension tables, such as accident date, territory, coverage and claim adjuster, that describe it. Queries join the fact table to the dimensions they need and aggregate.
- **Grain:** The grain is what one row of the fact table represents, such as one claim per valuation month, or one cell of accident quarter, development quarter, territory and coverage. It is the first design decision, because it fixes which questions the mart can answer: a mart at an aggregated grain cannot be drilled down to individual claims.
- **Why marts exist:** A warehouse serves the whole company and is large and general. A mart is smaller and shaped to one group's questions, which makes its queries simpler and faster and keeps data a department does not need, such as claimant medical details in an underwriting mart, out of its reach.

> [!example]- Designing a Claims Data Mart {Example}
> The claims department wants to produce loss development triangles of paid losses, case reserves and claim counts by territory and coverage. The warehouse holds a claim transaction table of 3,000,000 rows (one per payment or reserve change), a claim table, a policy table, a territory table of 12 territories and a coverage table. The mart is to hold 20 accident quarters, developed quarterly to the latest valuation, for 4 coverages. Propose a fact table and its dimensions, and bound its number of rows.
>
> > [!answer]-
> > Take the grain to be accident quarter by development quarter by territory by coverage, with paid losses, case reserves and reported claim count as the measures. The dimensions are accident quarter, development quarter, territory and coverage, the last two taken from the warehouse's tables so that the mart uses the warehouse's definitions. At the latest valuation, the oldest accident quarter has 20 development quarters and the newest has 1, so each triangle has
> > $$
> > \begin{align*}
> > \text{cells} &= 20 + 19 + \dots + 1 \\
> > &= \frac{20 \times 21}{2} \\
> > &= 210 \\
> > \lvert F \rvert &\le 210 \times 12 \times 4 \\
> > &= 10{,}080
> > \end{align*}
> > $$
> > The mart answers every triangle question with at most 10,080 rows instead of 3,000,000 transactions. Because only the observed cells of each triangle exist, the bound uses the 210 cells rather than $20 \times 20$. The price of the aggregated grain is that a question about individual claims, such as the largest open claims, must go back to the warehouse, so a claims mart often also keeps a claim-level fact table.

> [!example]- Two Marts, Two Loss Ratios {Example}
> Underwriting built an independent mart from the policy administration system and reports \$48.0 million of written premium for a region. The claims mart is a dependent mart loaded from the warehouse and reports \$45.6 million of earned premium for the same region and year. Both show \$30.1 million of incurred losses. Find each loss ratio and explain the difference.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Underwriting mart} &= \frac{30.1}{48.0} \\
> > &= 62.7\% \\
> > \text{Claims mart} &= \frac{30.1}{45.6} \\
> > &= 66.0\%
> > \end{align*}
> > $$
> > The two marts divide the same losses by different premium measures, because the independent mart applied its own definition. A [[Loss Ratio|loss ratio]] for a calendar or accident year is computed on earned premium, which the warehouse already provides, so the claims mart's 66.0% is the consistent one. The written premium is higher here because the book is growing and part of the year's writings is still unearned. Loading the underwriting mart from the warehouse, as a dependent mart with conformed definitions, removes the conflict.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Topic 3 covers data marts alongside extracting data from online sources. Application questions describe a department's reporting need and ask what a data mart is, how it differs from the warehouse it draws on, or whether a dependent or independent mart suits the situation.
> - **DISC-DA:** A question can describe a fact table and its dimension tables and ask what kind of schema it is, what the grain is, or which question the design cannot answer.

> [!warning]- Exam traps
> - **A mart is not a smaller warehouse of everything:** A mart is narrowed to one subject or department. A description of a store that integrates policy, billing and claims data for the whole company describes the warehouse, not a mart.
> - **Dependent and independent are about the source:** A dependent mart is fed by the warehouse, and an independent mart is fed by the operational systems directly. The size of the mart or the department that owns it does not decide which kind it is.
> - **Facts and dimensions:** Measures that are summed, such as losses, premium and counts, belong in the fact table. Descriptive attributes used to group and filter, such as territory, coverage or date, belong in the dimension tables, and an answer that swaps them has the star schema backwards.
> - **The grain limits the questions:** A mart aggregated to territory and quarter cannot report results by agent or by individual claim. When a question asks for detail below the grain, the answer is the warehouse or a finer fact table, not a different query of the same mart.
