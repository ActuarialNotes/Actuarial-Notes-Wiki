---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:12c99716487c3024796f9b0f46d03be4b81e4da3906852325b66dcbea3ec9c4c
  sources:
    - "Microsoft Learn, SQL Server: User-defined functions, Types of functions: scalar functions return a single value; table-valued functions return a table, sha256:941f4f09b6fa447e13911f0e67beaf0af3b11bb0e9a3e3107f25b0683a3d637b — https://learn.microsoft.com/en-us/sql/relational-databases/user-defined-functions/user-defined-functions"
    - "Microsoft Learn, SQL Server: Scalar UDF inlining, 'Performance of scalar UDFs': iterative invocation, once per qualifying tuple, sha256:92e7c2723f681df926fffedee54758093b6c9def70f3b6986ef46c4d2a581ec4 — https://learn.microsoft.com/en-us/sql/relational-databases/user-defined-functions/scalar-udf-inlining"
    - "MySQL 8.4 Reference Manual §15.1.17 CREATE PROCEDURE and CREATE FUNCTION, CREATE FUNCTION syntax: RETURNS type, [NOT] DETERMINISTIC, RETURN body, sha256:5b29ff65a71e8d62639fc9a578e82e8abe906fec9e2bfe5c81352970219b8384 — https://dev.mysql.com/doc/refman/8.4/en/create-procedure.html"
    - "PostgreSQL 17 Documentation, §9.18 CASE: if the ELSE clause is omitted and no condition is true, the result is null, sha256:30ef51aafd582617bbc6b538f21fb77149001f937cc795e23f54b4501db45146 — https://www.postgresql.org/docs/17/functions-conditional.html"
    - "PostgreSQL 17 Documentation, CREATE FUNCTION: RETURNS / RETURNS TABLE, IMMUTABLE/STABLE/VOLATILE, sha256:66c343eafe0f954058bf093fe5e5bf42777f7da017baa805848924a2e1568024 — https://www.postgresql.org/docs/17/sql-createfunction.html"
    - "PostgreSQL 17 Documentation, SQL functions; functions returning sets / RETURNS TABLE used as table sources in FROM, sha256:95abe7b3a4aeb7a06cb4e3070a9dd0af02907728d0b6685379a2fe668ace8b22 — https://www.postgresql.org/docs/17/xfunc-sql.html"
    - "PostgreSQL 17 Documentation, §11.7 index on expression, sha256:fd3493d2effa9046566d392567b4790e94614cd2d0e869034286bcf5b2568738 — https://www.postgresql.org/docs/17/indexes-expressional.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/User-Defined Function.md
---

A **User-Defined Function** (UDF) is a named function an analyst writes, in SQL, R or Python, to package a rule that is applied the same way every time it is called. Once defined it is used like a built-in function such as `SUM` or `ROUND`, so a rule such as assigning a territory from a postal code or a driver to an age band is written once and applied in every query, data set and model that needs it.

Applied to row $i$ of a table with $n$ rows, the value a function $f$ returns is

> $$y_i = f(x_{i1}, \dots, x_{ip})$$

- $x_{i1}, \dots, x_{ip}$ are the values its $p$ arguments take in row $i$.
- $y_i$ is the value it returns for that row, for $i = 1, \dots, n$.

## Scalar functions

A scalar function returns one value for each call, so it can appear wherever a column can: in the `SELECT` list, a `WHERE` condition or a `GROUP BY`. Applied in a query, it is evaluated once per row. A function that assigns a driver of age $a$, in whole years, to an age band is

> $$\text{band}(a) = \begin{cases} \text{16-24} & 16 \le a \le 24 \\ \text{25-64} & 25 \le a \le 64 \\ \text{65+} & a \ge 65 \end{cases}$$

In SQL the rule is written as a `CASE` expression. A `CASE` with no `ELSE` returns null for any value its branches miss, such as an age below the first band or a null age. Grouping by the result then gives a null group that is easy to overlook, so count it.

> [!example]- What does this query return? {Example}
> An analyst defines the banding rule once, in MySQL-style syntax:
>
> ```sql
> CREATE FUNCTION age_band(age INT) RETURNS VARCHAR(5)
> DETERMINISTIC
> RETURN CASE
>   WHEN age BETWEEN 16 AND 24 THEN '16-24'
>   WHEN age BETWEEN 25 AND 64 THEN '25-64'
>   WHEN age >= 65 THEN '65+'
> END;
> ```
>
> A driver table holds drivers aged 17, 19, 23, 25, 35, 64, 65, 71 and 15. The analyst runs `SELECT age_band(age) AS band, COUNT(*) FROM driver GROUP BY age_band(age)`.
>
> > [!answer]-
> > - The function is applied to each row, and the query then counts the rows in each band it returns.
> > - Because `BETWEEN` includes both ends, every whole age from 16 up falls in exactly one band.
> > - The ages 17, 19 and 23 fall in the first band, 25, 35 and 64 in the second, and 65 and 71 in the third.
> > - The 15-year-old matches no `WHEN` branch, so the `CASE` returns null.
> > - The query returns 3 drivers in '16-24', 3 in '25-64', 2 in '65+' and 1 in a null group.
> > - The null row should be investigated rather than dropped, because a 15-year-old listed driver is either a data error or a permit holder the rating plan treats in its own way.

## Table-valued functions

A table-valued function returns a table and is used in the `FROM` clause like a table. An example is a function that takes a valuation date and returns the policies in force on that date, which every in-force count and exposure calculation can then start from.

## Why define a rule once

A rule copied into many queries tends to drift, as when one analyst writes `age <= 25` and another `age < 25`, and the two data sets no longer agree. Defining the rule once keeps it consistent, documents it in one place, and means a change, such as a new territory boundary, is made once. This is part of [[Data Quality|data quality]] and of [[Data Documentation|documenting data]].

> [!example]- What youthful-to-adult frequency relativity does each analyst find? {Example}
> A rate review compares youthful drivers with adults. Analyst A codes youthful as `age <= 25` and analyst B as `age < 25`. The data are:
>
> | Ages | Car-years | Claims |
> | :--- | ---: | ---: |
> | 16 to 24 | 2,000 | 300 |
> | 25 | 500 | 45 |
> | 26 to 64 | 20,000 | 1,200 |
>
> > [!answer]-
> > - Analyst A puts the 25-year-olds with the youthful drivers: youthful frequency $345/2{,}500 = 0.1380$, adult frequency $1{,}200/20{,}000 = 0.0600$, relativity $2.30$.
> > - Analyst B puts them with the adults: youthful frequency $300/2{,}000 = 0.1500$, adult frequency $1{,}245/20{,}500 = 0.06073$, relativity $2.47$.
> > - The same data give 2.30 or 2.47 depending on one character in a condition.
> > - A single `age_band` function, used by both analysts and by the rating system, removes the difference, so the [[Classification Ratemaking|classification]] study and its rates rest on one definition.

## Functions in R and Python

R defines a function with `function()` and Python with `def`, and both are used the same way to apply a rule across a data frame. Binning a numeric variable into bands is a common [[Feature Engineering|feature engineering]] step, and a function makes the training data and the scoring data use identical bands.

## Good practice

A function should be deterministic, returning the same output for the same inputs, and should not change data as a side effect. It should handle values outside its rule, such as a null or an impossible age, explicitly, usually by returning null so the record can be found and examined as [[Missing Data|missing data]]. A function computes its result when it is called and does not add a column to the table, so to keep the result the query's output must be saved as a new table or column.

A scalar function in SQL runs row by row and can be slow on a large table. Used in a `WHERE` condition on an indexed column, it can also stop the database from using the [[Database Index|index]], since the index is sorted on the column and not on the function's output.

> [!trap] Band boundaries that overlap or leave a gap
> Bands written as `age <= 25` and `age >= 25` both claim the 25-year-olds, and bands written as `age < 25` and `age > 25` lose them. Check each boundary value against the rule. `BETWEEN 25 AND 64` includes both 25 and 64.
