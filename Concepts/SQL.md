---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c7b247819ac013a7b85dcf3a235309b8959f1cc1613411ae0910f7b9604e66e7
  sources:
    - "PostgreSQL 17 Documentation, Description (general processing of SELECT, steps 1-8); WHERE Clause; SELECT List (output names in ORDER BY/GROUP BY, not WHERE/HAVING), sha256:16d6c1ac8132a80f1a157883d3fae1c07fca9196b44e76c4574027f13d830a7f — https://www.postgresql.org/docs/17/sql-select.html"
    - "PostgreSQL 17 Documentation, §2.7 WHERE selects input rows before aggregates, HAVING groups after; WHERE must not contain aggregates; condition without aggregate more efficient in WHERE, sha256:df158bcbc7924e1fbe49821aab78e37df53a7e14ac4cc8befdc480fee72b7e35 — https://www.postgresql.org/docs/17/tutorial-agg.html"
    - "PostgreSQL 17 Documentation, §7.3 SELECT *, value expressions per row, column labels, sha256:253982a077881262613e8fbabcef62a96d0bb6126212348fca17e527e533f8a6 — https://www.postgresql.org/docs/17/queries-select-lists.html"
    - "PostgreSQL 17 Documentation, §7.2 table aliases, self-join, sha256:69486ac181f941b65eb886f28d243b950ba891431dee9efada046a430ae2a566 — https://www.postgresql.org/docs/17/queries-table-expressions.html"
    - "PostgreSQL 17 Documentation, §7.5 unspecified order without ORDER BY; tie-breaking; ASC default; ORDER BY x, y DESC, sha256:efe155210f5dddb504fc919b8abbfe5866e2ac22c0dab8704488c7bd64fa176d — https://www.postgresql.org/docs/17/queries-order.html"
    - "PostgreSQL 17 Documentation, §9.21 count(*) / count(expr) non-null; avg etc. of non-null inputs; null when no rows except count, sha256:42dc684319f61831aa4fbb2cec8af602a22aadb72eb92eb784bb84ed1a98c076 — https://www.postgresql.org/docs/17/functions-aggregate.html"
    - "PostgreSQL 17 Documentation, §9.2 comparison with null yields null; IS NULL, sha256:7c49c06dfe1ddba8fa5e113dc4f0a3541e7e9534916aa0aaffb02f5da91030b2 — https://www.postgresql.org/docs/17/functions-comparison.html"
    - "PostgreSQL 17 Documentation, §9.18 COALESCE, sha256:30ef51aafd582617bbc6b538f21fb77149001f937cc795e23f54b4501db45146 — https://www.postgresql.org/docs/17/functions-conditional.html"
    - "MySQL 8.4 Reference Manual §15.2.13 SELECT Statement, alias 'can be used in GROUP BY, ORDER BY, or HAVING clauses'; not permissible in WHERE, sha256:94ac7713ee060fc295f2258a235fc52352ae1f395f396fdd2f8853e7711ca129 — https://dev.mysql.com/doc/refman/8.4/en/select.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/SQL.md
---

**SQL** (Structured Query Language) is the language used to retrieve and manipulate data held in the tables of a [[Relational Database|relational database]]. A query is a `SELECT` statement that names the columns or calculations wanted, the tables to read (`FROM`), the rows to keep (`WHERE`), how to group them (`GROUP BY`), which groups to keep (`HAVING`) and the order of the result (`ORDER BY`), and the database decides how to carry it out.

A summary query is written in this form:

```sql
SELECT terr, COUNT(*) AS n_claims, SUM(paid) AS total_paid
FROM claim
WHERE acc_year = 2024
GROUP BY terr
HAVING COUNT(*) >= 50
ORDER BY total_paid DESC;
```

It is processed in a different order from the one it is written in:

1. The tables in `FROM` are read and joined.
2. `WHERE` removes the rows that do not satisfy its condition.
3. `GROUP BY` groups the remaining rows and the aggregates are computed.
4. `HAVING` removes groups.
5. The output columns of the `SELECT` list are computed.
6. Duplicates are removed if `DISTINCT` is asked for.
7. `ORDER BY` sorts the result.

The order explains two rules below: `WHERE` cannot use an aggregate, and it cannot use a name given in the select list.

## Selecting and filtering rows

`SELECT *` returns every column. Otherwise the select list names columns or computes new ones from them, each evaluated once per result row. `FROM` names the table, or several tables combined by a [[Table Join|join]].

A row is kept by `WHERE` only if the condition is true for it. Conditions combine comparisons (`=`, `<>`, `<`, `>=`) with `AND`, `OR` and `NOT`. Because `WHERE` runs before grouping, it cannot contain an aggregate function.

## Grouping and aggregate functions

`GROUP BY` combines rows that share the same values of the grouping columns into one output row, and aggregate functions compute one value per group. `COUNT(*)` counts rows, `COUNT(col)` counts rows where `col` is not null, and `SUM`, `AVG`, `MIN` and `MAX` work on the non-null values. Without `GROUP BY`, an aggregate treats the whole table as one group.

`HAVING` selects groups after the aggregates are computed, so its condition normally uses one, such as territories with at least 50 claims. A condition that needs no aggregate belongs in `WHERE`, which is also cheaper, because the rows it removes are never grouped.

> [!example]- What does this query return from the claim table? {Example}
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
> > - `WHERE` removes K7 and K8, the 2023 claims.
> > - Grouping the other six by territory gives T1 (K1, K2), T2 (K3, K4, K5) and T3 (K6).
> > - `AVG` ignores K4's null, so T1 averages $(5{,}000 + 15{,}000)/2 = 10{,}000$ and T2 averages $(2{,}000 + 4{,}000)/2 = 3{,}000$.
> > - T3 has one claim and fails `HAVING COUNT(*) >= 2`.
> > - The result is two rows, sorted by average: T1 with $n = 2$, $n_{\text{paid}} = 2$ and 10,000, then T2 with $n = 3$, $n_{\text{paid}} = 2$ and 3,000.
> > - Treating K4's null as zero would have given T2 an average of 2,000.

## Sorting and aliases

Without `ORDER BY`, rows come back in an unspecified order that must not be relied on, so "the first row" of the result is not defined. Sorting is ascending unless `DESC` is written, and each later sort column breaks ties in the earlier ones. The direction applies to each column separately, so `ORDER BY x, y DESC` sorts `x` ascending.

`AS` gives an output column a name (a column alias), which can be used in `ORDER BY` but not in `WHERE`, where the expression has to be written out again, because that step runs before the select list is computed. In standard SQL and PostgreSQL the alias cannot be used in `HAVING` either. MySQL is an exception and permits an alias in `HAVING`. A table alias (`FROM claim AS c`) gives a table a short name, which keeps join conditions readable and is required to join a table to itself.

## Nulls

A null is an unknown value, so comparing it with `=` or `<>` gives null rather than true or false, and the row fails a `WHERE` condition. Test for it with `IS NULL` or `IS NOT NULL`, and use `COALESCE` to substitute a value. Aggregates other than `COUNT` return null, not zero, when no rows are selected. [[Missing Data#Null values in SQL and R|Null values]] covers the rest.

> [!example]- How many rows does `SELECT COUNT(*) FROM policy WHERE ...` count under each of these four conditions? {Example}
> A policy table holds five policies with deductibles of 500, 1,000, NULL, 500 and NULL, the nulls being policies whose deductible was never recorded. The conditions are `deductible <> 500`, `deductible = NULL`, `deductible IS NULL` and `deductible <> 500 OR deductible IS NULL`.
>
> > [!answer]-
> > - A comparison with a null is unknown, so a null row never satisfies `<>` or `=`.
> > - `deductible <> 500` counts 1, the 1,000 policy only. The two nulls are not counted, though they are not known to be 500.
> > - `deductible = NULL` counts 0, because the comparison is never true, even for the null rows.
> > - `deductible IS NULL` counts 2.
> > - `deductible <> 500 OR deductible IS NULL` counts 3, every policy not known to have a 500 deductible.
> > - An analyst who wanted all policies other than the 500 deductible and wrote the first condition silently loses the policies with no recorded deductible.

[[Table Join|Joins]] combine tables, a [[Database Index|database index]] speeds up filtering and joining on a column, and a [[User-Defined Function|user-defined function]] packages a rule for reuse inside queries. The same operations exist for an in-memory [[Dataframe|dataframe]] in R or pandas, and a query's result is itself a [[Structured Data|structured]] table.

> [!trap] Putting a row condition in `HAVING` or an aggregate in `WHERE`
> A condition on an aggregate, such as `SUM(paid) > 100000`, cannot go in `WHERE`, which runs before grouping. A condition on a row value, such as an accident year, belongs in `WHERE`, so that the excluded rows never enter the aggregate.
