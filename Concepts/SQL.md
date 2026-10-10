---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cba09a70f5b2945150b30f09fbf51fe83c87b2f7d2ea0e096103463a5df1efbb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/SQL.md
---

**SQL** (Structured Query Language) is the language used to retrieve and manipulate data held in the tables of a [[Relational Database|relational database]]. A query is a `SELECT` statement that names the columns or calculations wanted, the tables to read (`FROM`), the rows to keep (`WHERE`), how to group them (`GROUP BY`), which groups to keep (`HAVING`) and the order of the result (`ORDER BY`); the database decides how to carry it out.

> $$\begin{aligned} &1.\ \texttt{FROM} \text{ (with any joins)} \\ &2.\ \texttt{WHERE} \\ &3.\ \texttt{GROUP BY} \text{ and aggregates} \\ &4.\ \texttt{HAVING} \\ &5.\ \texttt{SELECT} \text{ list} \\ &6.\ \texttt{DISTINCT} \\ &7.\ \texttt{ORDER BY} \end{aligned}$$

- **The order of evaluation:** The block is the order in which a query is processed, which is not the order it is written in. The tables in `FROM` are read and joined, `WHERE` removes the rows that do not satisfy its condition, the remaining rows are grouped and the aggregates computed, `HAVING` removes groups, the output columns are computed, duplicates are removed if `DISTINCT` is asked for, and the result is sorted. The order explains two rules below: `WHERE` cannot use an aggregate, and it cannot use a name given in the select list.
- **The written form** of a summary query:

```sql
SELECT terr, COUNT(*) AS n_claims, SUM(paid) AS total_paid
FROM claim
WHERE acc_year = 2024
GROUP BY terr
HAVING COUNT(*) >= 50
ORDER BY total_paid DESC;
```

- **`SELECT` and `FROM`:** `SELECT *` returns every column; otherwise the select list names columns or computes new ones from them, each evaluated once per result row. `FROM` names the table, or several tables combined by a [[Table Join|join]].
- **`WHERE` filters rows:** A row is kept only if the condition is true for it. Conditions combine comparisons (`=`, `<>`, `<`, `>=`) with `AND`, `OR` and `NOT`. Because `WHERE` runs before grouping, it cannot contain an aggregate function.
- **`GROUP BY` and aggregate functions:** `GROUP BY` combines rows that share the same values of the grouping columns into one output row, and aggregate functions compute one value per group: `COUNT(*)` counts rows, `COUNT(col)` counts rows where `col` is not null, and `SUM`, `AVG`, `MIN` and `MAX` work on the non-null values. Without `GROUP BY`, an aggregate treats the whole table as one group.
- **`HAVING` filters groups:** `HAVING` selects groups after the aggregates are computed, so its condition normally uses one, such as territories with at least 50 claims. A condition that needs no aggregate belongs in `WHERE`, which is also cheaper, because the rows it removes are never grouped.
- **`ORDER BY` sorts the result:** Without it, rows come back in an unspecified order that must not be relied on. Sorting is ascending unless `DESC` is written, and each later sort column breaks ties in the earlier ones. The direction applies to each column separately: `ORDER BY x, y DESC` sorts `x` ascending.
- **Aliases:** `AS` gives an output column a name (a column alias), which can be used in `ORDER BY` but not in `WHERE` or `HAVING`, where the expression has to be written out again, because those steps run before the select list is computed. A table alias (`FROM claim AS c`) gives a table a short name, which keeps join conditions readable and is required to join a table to itself.
- **Nulls:** A null is an unknown value, so comparing it with `=` or `<>` gives null rather than true or false, and the row fails a `WHERE` condition. Test for it with `IS NULL` or `IS NOT NULL`, and use `COALESCE` to substitute a value. Aggregates other than `COUNT` return null, not zero, when no rows are selected ([[Missing Data]]).
- **Related tools:** [[Table Join|Joins]] combine tables, a [[Database Index|database index]] speeds up filtering and joining on a column, and a [[User-Defined Function|user-defined function]] packages a rule for reuse inside queries. The same operations exist for an in-memory [[Dataframe|dataframe]] in R or pandas, and a query's result is itself a [[Structured Data|structured]] table.

> [!example]- Reading a Grouped Query {Example}
> A claim table holds eight claims.
>
> | claim_id | terr | acc_year | paid |
> | :--- | :--- | ---: | ---: |
> | K1 | T1 | 2024 | 5,000 |
> | K2 | T1 | 2024 | 15,000 |
> | K3 | T2 | 2024 | 2,000 |
> | K4 | T2 | 2024 | NULL |
> | K5 | T2 | 2024 | 4,000 |
> | K6 | T3 | 2024 | 30,000 |
> | K7 | T1 | 2023 | 1,000 |
> | K8 | T3 | 2023 | 6,000 |
>
> What does this query return?
>
> ```sql
> SELECT terr, COUNT(*) AS n, COUNT(paid) AS n_paid, AVG(paid) AS avg_paid
> FROM claim
> WHERE acc_year = 2024
> GROUP BY terr
> HAVING COUNT(*) >= 2
> ORDER BY avg_paid DESC;
> ```
>
> > [!answer]-
> > `WHERE` removes K7 and K8, the 2023 claims. Grouping the other six by territory gives T1 (K1, K2), T2 (K3, K4, K5) and T3 (K6). `AVG` ignores K4's null.
> > $$
> > \begin{align*}
> > \text{avg}_{T1} &= \frac{5{,}000 + 15{,}000}{2} \\
> > &= 10{,}000 \\
> > \text{avg}_{T2} &= \frac{2{,}000 + 4{,}000}{2} \\
> > &= 3{,}000
> > \end{align*}
> > $$
> > T3 has one claim and fails `HAVING COUNT(*) >= 2`, so the result is two rows, sorted by average: T1 with $n = 2$, $n_{\text{paid}} = 2$ and 10,000, then T2 with $n = 3$, $n_{\text{paid}} = 2$ and 3,000. Treating K4's null as zero would have given T2 an average of 2,000.

> [!example]- Filtering on a Column with Nulls {Example}
> A policy table holds five policies with deductibles of 500, 1,000, NULL, 500 and NULL, the nulls being policies whose deductible was never recorded. How many rows does `SELECT COUNT(*) FROM policy WHERE ...` count under each condition: `deductible <> 500`; `deductible = NULL`; `deductible IS NULL`; and `deductible <> 500 OR deductible IS NULL`?
>
> > [!answer]-
> > A comparison with a null is unknown, so a null row never satisfies `<>` or `=`.
> >
> > - `deductible <> 500` counts **1**, the 1,000 policy only. The two nulls are not counted, though they are not known to be 500.
> > - `deductible = NULL` counts **0**, because the comparison is never true, even for the null rows.
> > - `deductible IS NULL` counts **2**.
> > - `deductible <> 500 OR deductible IS NULL` counts **3**, every policy not known to have a 500 deductible.
> >
> > An analyst who wanted "all policies other than the 500 deductible" and wrote the first condition silently loses the policies with no recorded deductible.

> [!tip]- How it appears on the exam
> - **DISC-DA** covers querying data in its topic on preparing data for analysis, followed by [[Table Join|joining tables]] and by [[Database Index|indexes]], [[Missing Data|null values]] and [[User-Defined Function|user-defined functions]]. Application questions give a small table and a query and ask what it returns: which rows a `WHERE` keeps, what a grouped aggregate equals, or which groups `HAVING` removes.
> - Others ask which clause does a task (filter rows, filter groups, sort, rename a column) or why a query fails. Topic 9 prepares insurance modelling data sets using SQL, so the same clauses appear again inside longer data preparation scenarios.

> [!warning]- Exam traps
> - **`WHERE` versus `HAVING`:** A condition on an aggregate, such as `SUM(paid) > 100000`, cannot go in `WHERE`, which runs before grouping. A condition on a row value, such as an accident year, belongs in `WHERE`, so that the excluded rows never enter the aggregate.
> - **`COUNT(*)` versus `COUNT(col)`:** `COUNT(*)` counts rows and `COUNT(col)` counts non-null values of `col`, and `AVG` divides by the non-null count. A question with nulls in the column usually turns on this.
> - **`= NULL` matches nothing:** Use `IS NULL`. A `<>` condition also drops the null rows, which is easy to miss.
> - **No `ORDER BY`, no order:** A query without `ORDER BY` returns rows in no guaranteed order, so "the first row" of its result is not defined.
> - **An alias does not exist yet in `WHERE`:** A column alias from the select list can be used in `ORDER BY` but not in `WHERE` or `HAVING`. Repeat the expression there.
