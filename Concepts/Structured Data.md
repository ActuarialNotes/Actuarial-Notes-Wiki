---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:db5b1da546fedb11a05b04cb9ad2cab251ebb62baacca20c836ee0c951d6828c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Structured Data.md
---

**Structured Data** are data organized under a fixed schema: records arranged as rows, each with the same set of named fields arranged as columns, and each field holding values of one declared [[Data Types|data type]]. Because every record has the same shape, structured data are stored in the tables of a [[Relational Database|relational database]] and can be filtered, sorted, joined and summarized directly with SQL, which is what most insurer policy, premium and claim data look like.

> $$S_g = \sum_{i \,:\, x_i = g} y_i$$

> $$\bar{y}_g = \frac{\sum_{i \,:\, x_i = g} y_i}{\sum_{i \,:\, x_i = g} e_i}$$

- **Symbols:** Row $i$ of the table has a grouping field $x_i$, such as territory, a measure $y_i$, such as premium or claim count, and an exposure $e_i$. $S_g$ is the total of the measure over the rows in group $g$, which is what `SUM(y) ... GROUP BY x` returns, and $\bar{y}_g$ is the group's average per unit of exposure, such as the average premium per car-year.
- **The schema:** The schema fixes, before any data are loaded, each table's fields, their data types (integer, decimal, text, date), and constraints such as a field that may not be null or must be unique. A record that does not fit, such as a date with 30 February in it, is rejected or flagged when loaded, which is a large part of why structured data are easier to trust than [[Unstructured Data|unstructured data]].
- **Keys:** A primary key identifies each record, such as the policy number, and foreign keys link a record to records in other tables, such as the policy number on a claim. Keys are what make a [[Table Join|join]] possible and what let duplicates be found.
- **Querying:** A summary query selects the fields it needs, filters rows with `WHERE`, groups them with `GROUP BY`, aggregates each group with functions such as `COUNT`, `SUM`, `AVG`, `MIN` and `MAX`, and filters the groups with `HAVING`. The result is itself a structured table, one row per group, which is how premium, exposure and losses are summarized by territory or class for [[Summary Statistics|summary statistics]] and ratemaking.
- **Examples in insurance:** The policy, premium, billing and claim tables of operational systems are structured, and so are the records reported to a [[Statistical Plan|statistical plan]], [[External Data|external data]] such as credit attributes or motor vehicle records delivered in fixed layouts, and the aggregated tables in a [[Data Warehouse|data warehouse]] or [[Data Mart|data mart]].
- **The other kinds:** [[Unstructured Data]], such as adjusters' notes, photos and recorded calls, have no predefined fields. Semi-structured data, such as JSON or XML telematics records, carry labels on their pieces but no fixed table shape. Both become structured once features are extracted or the records are flattened into rows, and that is usually how they enter a model.
- **Limits:** A fixed schema captures only what its designers anticipated. A fact with no field, such as the reason a claim was reopened, is either lost or typed into a free-text field, where it becomes unstructured again.

> [!example]- Summarizing a Policy Table by Territory {Example}
> A personal auto policy table holds eight policies.
>
> | policy | terr | exposure | premium |
> | :--- | :--- | ---: | ---: |
> | P1 | T1 | 1.00 | 900 |
> | P2 | T1 | 0.50 | 450 |
> | P3 | T1 | 1.00 | 1,000 |
> | P4 | T2 | 1.00 | 1,300 |
> | P5 | T2 | 1.00 | 1,200 |
> | P6 | T3 | 0.25 | 400 |
> | P7 | T3 | 1.00 | 1,500 |
> | P8 | T3 | 0.75 | 1,100 |
>
> What does the following query return?
>
> ```sql
> SELECT terr, COUNT(*) AS policies, SUM(exposure) AS expo,
>        SUM(premium) AS prem, SUM(premium) / SUM(exposure) AS avg_prem
> FROM policy
> GROUP BY terr
> ```
>
> > [!answer]-
> > Each group's sums run over its own rows. For territory 1,
> > $$
> > \begin{align*}
> > \bar{y}_{T1} &= \frac{900 + 450 + 1{,}000}{1.00 + 0.50 + 1.00} \\
> > &= \frac{2{,}350}{2.50} \\
> > &= 940
> > \end{align*}
> > $$
> > and the other territories follow in the same way.
> >
> > | terr | policies | expo | prem | avg_prem |
> > | :--- | ---: | ---: | ---: | ---: |
> > | T1 | 3 | 2.50 | 2,350 | 940 |
> > | T2 | 2 | 2.00 | 2,500 | 1,250 |
> > | T3 | 3 | 2.00 | 3,000 | 1,500 |
> >
> > Territory 3 has as many policies as territory 1 but less exposure, because two of its policies were in force for part of the year. Counting policies would overstate its size, which is why the summary carries exposure and divides premium by it.

> [!example]- Rolling the Summary Up to the Whole Book {Example}
> Using the territory summary from the first example, a report needs the average premium per car-year for all three territories together. One analyst averages the three territory averages. Find that figure and the correct one.
>
> > [!answer]-
> > The simple average treats every territory as equally large.
> > $$
> > \begin{align*}
> > \text{Simple average} &= \frac{940 + 1{,}250 + 1{,}500}{3} \\
> > &= 1{,}230.00 \\
> > \bar{y} &= \frac{2{,}350 + 2{,}500 + 3{,}000}{2.50 + 2.00 + 2.00} \\
> > &= \frac{7{,}850}{6.50} \\
> > &= 1{,}207.69
> > \end{align*}
> > $$
> > The correct average is \$1,207.69, the total premium over the total exposure. It is the average of the territory averages weighted by exposure, and it equals what the query returns with the `GROUP BY` removed. The simple average gives territory 1, the largest and cheapest territory, too little weight and overstates the book's average by \$22.31.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Topic 4 covers working with structured data and contrasts it with unstructured data. Application questions describe a data source and ask whether it is structured, semi-structured or unstructured, or what makes a table suitable for a given analysis.
> - **DISC-DA:** Other questions give a small table and a summary query and ask what the query returns, such as a count, total or average by group. These connect to the querying sections of Topic 3 and the data set building of Topic 9.

> [!warning]- Exam traps
> - **Structured is about shape, not storage:** A spreadsheet with consistent columns is structured even though it is not in a database, and a database field holding free-text notes holds unstructured data. Decide by whether each record follows a fixed set of typed fields.
> - **Averages of averages:** An average of group averages is not the overall average unless the groups have equal weight. Recompute from the group totals, as the second example shows.
> - **Counting nulls:** `COUNT(*)` counts every row, while `COUNT(field)` counts only the rows where that field is not null, and `AVG(field)` ignores nulls. A summary of claim severity that treats a null paid amount as zero, or drops it, gives a different average, so check which the question wants.
> - **WHERE versus HAVING:** `WHERE` filters rows before they are grouped and `HAVING` filters groups after aggregation. A condition on a total, such as territories with more than 1,000 car-years, belongs in `HAVING`.
