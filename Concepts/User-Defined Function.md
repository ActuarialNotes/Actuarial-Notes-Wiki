---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9d405d4a165c805193a4480dec2a83cffda686bf3cc828766925ae1e3f64bf50
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/User-Defined Function.md
---

A **User-Defined Function** (UDF) is a named function an analyst writes, in SQL, R or Python, to package a rule that is applied the same way every time it is called. Once defined it is used like a built-in function such as `SUM` or `ROUND`, so a rule such as assigning a territory from a postal code or a driver to an age band is written once and applied consistently in every query, data set and model that needs it.

> $$y_i = f(x_{i1}, \dots, x_{ip}), \quad i = 1, \dots, n$$

> $$\text{band}(a) = \begin{cases} \text{16-24} & 16 \le a \le 24 \\ \text{25-64} & 25 \le a \le 64 \\ \text{65+} & a \ge 65 \end{cases}$$

- **Symbols:** $f$ is the function, $x_{i1}, \dots, x_{ip}$ are the values its arguments take in row $i$ of a table with $n$ rows, and $y_i$ is the value it returns for that row. The second block is a scalar function of one argument, the driver's age $a$ in whole years, that returns the band label.
- **Scalar functions:** A scalar function returns one value for each call, so it can appear wherever a column can, in the `SELECT` list, a `WHERE` condition or a `GROUP BY`. Applied in a query, it is evaluated once per row.
- **Table-valued functions:** A table-valued function returns a table and is used in the `FROM` clause like a table. An example is a function that takes a valuation date and returns the policies in force on that date, which every in-force count and exposure calculation can then start from.
- **Why write one:** A rule copied into many queries tends to drift, as when one analyst writes `age <= 25` and another `age < 25`, and the two data sets no longer agree. Defining the rule once keeps it consistent, documents it in one place, and means a change, such as a new territory boundary, is made once. This is part of [[Data Quality|data quality]] and of [[Data Documentation|documenting data]].
- **Same idea in R and Python:** R defines a function with `function()` and Python with `def`, and both are used the same way to apply a rule across a data frame. Binning a numeric variable into bands is a common [[Feature Engineering|feature engineering]] step, and a function makes the training data and the scoring data use identical bands.
- **Good practice:** A function should be deterministic, returning the same output for the same inputs, and should not change data as a side effect. It should handle values outside its rule, such as a null or an impossible age, explicitly, usually by returning null so the record can be found and examined as [[Missing Data|missing data]].
- **Performance:** A scalar function in SQL runs row by row and can be slow on a large table. Used in a `WHERE` condition on an indexed column, it can also stop the database from using the [[Database Index|index]], since the index is sorted on the column and not on the function's output.

> [!example]- Banding Driver Age in a Query {Example}
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
> A driver table holds drivers aged 17, 19, 23, 25, 35, 64, 65, 71 and 15. What does the query `SELECT age_band(age) AS band, COUNT(*) FROM driver GROUP BY age_band(age)` return?
>
> > [!answer]-
> > The function is applied to each row, and the query then counts the rows in each band it returns.
> >
> > | band | count |
> > | :--- | ---: |
> > | 16-24 | 3 |
> > | 25-64 | 3 |
> > | 65+ | 2 |
> > | null | 1 |
> >
> > The ages 17, 19 and 23 fall in the first band, 25, 35 and 64 in the second, and 65 and 71 in the third. The 15-year-old matches no `WHEN` branch, so the `CASE` returns null. That row should be investigated rather than dropped, because a 15-year-old listed driver is either a data error or a permit holder the rating plan treats in its own way. Because `BETWEEN` includes both ends, every whole age from 16 up falls in exactly one band.

> [!example]- Two Analysts, Two Age Rules {Example}
> A rate review compares youthful drivers with adults. The data hold 2,000 car-years and 300 claims for ages 16 to 24, 500 car-years and 45 claims at age 25, and 20,000 car-years and 1,200 claims for ages 26 to 64. Analyst A codes youthful as `age <= 25` and analyst B as `age < 25`. Find each analyst's youthful-to-adult frequency relativity.
>
> > [!answer]-
> > Analyst A puts the 25-year-olds with the youthful drivers and analyst B puts them with the adults.
> > $$
> > \begin{align*}
> > \text{A: youthful} &= \frac{300 + 45}{2{,}000 + 500} \\
> > &= 0.1380 \\
> > \text{A: adult} &= \frac{1{,}200}{20{,}000} \\
> > &= 0.0600 \\
> > \text{A: relativity} &= 0.1380 / 0.0600 \\
> > &= 2.300 \\
> > \text{B: youthful} &= \frac{300}{2{,}000} \\
> > &= 0.1500 \\
> > \text{B: adult} &= \frac{1{,}200 + 45}{20{,}000 + 500} \\
> > &= 0.06073 \\
> > \text{B: relativity} &= 0.1500 / 0.06073 \\
> > &= 2.470
> > \end{align*}
> > $$
> > The same data give a relativity of 2.30 or 2.47 depending on one character in a condition. A single `age_band` function, used by both analysts and by the rating system, removes the difference. The [[Classification Ratemaking|classification]] study and the rates it produces then rest on one definition.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Topic 3 covers user-defined functions together with indexes and null values. Application questions describe a rule an analyst applies in many places, such as assigning territories or age bands, and ask why a function is the better way to apply it, or what a given function returns for a given row.
> - **DISC-DA:** Topic 9 prepares insurance data sets in SQL, where a function is one of the transformations. A question can ask how a band or a derived field was produced, or why two data sets built from the same tables disagree.

> [!warning]- Exam traps
> - **Unmatched values return null:** A `CASE` with no `ELSE` returns null for any value its branches miss, such as an age below the first band or a null age. Grouping by the result then gives a null group that is easy to overlook, so count it.
> - **Boundaries must not overlap or leave gaps:** Bands written as `age <= 25` and `age >= 25` both claim the 25-year-olds, and bands written as `age < 25` and `age > 25` lose them. Check each boundary value against the rule.
> - **Scalar versus table-valued:** A scalar function returns one value per row and goes where a column goes. A table-valued function returns a table and goes in the `FROM` clause, so an answer that uses one in the other's place has the two confused.
> - **A function is not a stored copy of the data:** A UDF computes its result when it is called, and it does not add a column to the table. To keep the result, the query's output must be saved as a new table or column.
