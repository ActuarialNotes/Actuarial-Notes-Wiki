---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7dba9db66315e115437b13109a2c36c4abacf913de31fd654628c59f56d6d8f1
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.1 'Data visualization', §1.2.1 data frame = rectangular collection of variables (columns) and observations (rows); tidy data definition, sha256:871721caf69ea711517d9a4f0f627806da4200f6f7fd0068aa89530943339ad4 — https://r4ds.hadley.nz/data-visualize.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.3 'Data transformation', §3.1.3 column types <int>/<dbl>/<chr>/<dttm>, dplyr never modifies inputs; §3.2.1-3.2.4 filter/arrange/distinct; §3.3 mutate/select; §3.5 group_by/summarize, mean() returns NA without na.rm; §3.6 include a count, sha256:7ecfc380d9ba22575657e2e0ea5b16d9a2c7a235f5cfd2a3ad860bf6bbf745de — https://r4ds.hadley.nz/data-transform.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.19 Joins, Ch.19 left_join and other join verbs, sha256:27708095875a55fe556f715fa31bef17d6c0bfdf5b8f6b36d1c1cafdce46dd21 — https://r4ds.hadley.nz/joins.html"
    - "pandas 3.0.6 User Guide, Intro to data structures, DataFrame: '2-dimensional labeled data structure with columns of potentially different types ... like a spreadsheet or SQL table', sha256:d5af0fa791e879285aff87a158e00b3e1cca8b1030f4d1b8870a6d2fa8eb56ca — https://pandas.pydata.org/docs/user_guide/dsintro.html"
    - "pandas 3.0.6, Comparison with SQL, copies vs in place; SELECT/assign(); WHERE/boolean indexing; isna()/notna(); GROUP BY size() vs count() (NOT NULL records); JOIN via merge(); sort_values(), sha256:9fb10fe945e08662d043b8aba3f413b9accef4d652c153329fadbe7a17ea52da — https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Dataframe.md
---

A **Dataframe** (data frame) is a rectangular table that holds a data set in memory for analysis, with **variables in columns** and **observations in rows**: every value in a column has the same type, while different columns can have different types. It is the central structure of R (`data.frame`, and the tidyverse's tibble) and of Python's pandas library (`DataFrame`), which describes it as a two-dimensional labelled structure that can be thought of like a spreadsheet or an SQL table.

> $$D = \big[\,x_{ij}\,\big]_{n \times p}$$

> $$s_g = h\big(\{\, x_{ij} : g_i = g \,\}\big)$$

- **Symbols:** $D$ has $n$ rows (observations, such as policies or claims) and $p$ columns (variables), and $x_{ij}$ is the value of variable $j$ for observation $i$. The second block is a grouped summary: the rows are split by the value $g_i$ of a grouping variable, a summary function $h$ (a count, sum or mean) is applied to variable $j$ within each group, and the result has one row per group.
- **Tidy layout:** A table is tidy when each variable is in its own column, each observation in its own row, and each value in its own cell ([[Tidy Data]]). Most dataframe tools assume this layout, and the [[Data Types|type]] of each column (integer, double, character, date-time) decides which operations make sense on it.
- **Operations on rows, columns and groups:** The tools fall into a few kinds, and each has a counterpart in [[SQL]].

| Task | R (dplyr) | pandas | SQL |
| :--- | :--- | :--- | :--- |
| Keep rows meeting a condition | `filter()` | boolean indexing | `WHERE` |
| Sort rows | `arrange()`, `desc()` | `sort_values()` | `ORDER BY` |
| Remove duplicate rows | `distinct()` | `drop_duplicates()` | `DISTINCT` |
| Choose columns | `select()` | a list of column names | `SELECT a, b` |
| Add a derived column | `mutate()` | `assign()` | `SELECT expr AS name` |
| Group and summarize | `group_by()`, `summarize()` | `groupby()`, `agg()` | `GROUP BY` |
| Combine tables on a key | `left_join()` and others | `merge()` | `JOIN` |

- **What each changes:** Filtering changes which rows are present but not their order, and sorting changes their order but not which are present; neither touches the columns. Selecting and adding columns leave the rows alone. Sorting on several columns uses each later column to break ties in the earlier ones.
- **Results are new tables:** dplyr's functions never modify their input, and most pandas operations return a copy. A filtered or summarized result must be assigned to a name, either a new object or the original one, or it is printed and lost.
- **Missing values in summaries:** In R, a missing value (`NA`) makes `mean()` and `sum()` return `NA` unless `na.rm = TRUE` drops it. In pandas, `size()` counts the rows of each group, while `count()` counts only the non-null values in each column, the same split as `COUNT(*)` against `COUNT(column)` in SQL ([[Missing Data]]).
- **Count every summary:** Including the number of rows in each group with a summary shows when a group's average rests on very little data, which otherwise can put the smallest groups at the top of a ranking.
- **Where it fits:** Data usually reach a dataframe from a database query or a file, are combined with a [[Table Join|join]], checked by [[Data Validation|validation]], and prepared for plotting in [[Exploratory Data Analysis]] or for a model ([[Data Preparation]], [[Feature Engineering]]).

> [!example]- Summarizing Claims by Territory {Example}
> A claims dataframe `claims` has seven rows.
>
> | claim | terr | ay | paid |
> | :--- | :--- | ---: | ---: |
> | C1 | T1 | 2024 | 4,000 |
> | C2 | T1 | 2024 | 6,000 |
> | C3 | T2 | 2024 | 2,500 |
> | C4 | T2 | 2023 | 9,000 |
> | C5 | T2 | 2024 | NA |
> | C6 | T3 | 2024 | 12,000 |
> | C7 | T2 | 2024 | 3,500 |
>
> An analyst runs:
>
> ```r
> claims |>
>   filter(ay == 2024) |>
>   group_by(terr) |>
>   summarize(n = n(), avg_paid = mean(paid, na.rm = TRUE)) |>
>   arrange(desc(avg_paid))
> ```
>
> What does it return, and what would change without `na.rm = TRUE`?
>
> > [!answer]-
> > The filter drops C4, an accident year 2023 claim, leaving six rows. Grouping by territory and summarizing gives one row per territory, and `n()` counts rows, including C5.
> > $$
> > \begin{align*}
> > \bar{y}_{T1} &= \frac{4{,}000 + 6{,}000}{2} \\
> > &= 5{,}000 \\
> > \bar{y}_{T2} &= \frac{2{,}500 + 3{,}500}{2} \\
> > &= 3{,}000 \\
> > \bar{y}_{T3} &= 12{,}000
> > \end{align*}
> > $$
> > Sorted by descending average, the result is T3 ($n = 1$, 12,000), T1 ($n = 2$, 5,000) and T2 ($n = 3$, 3,000). T2's count is 3 but its average uses only the 2 claims with a paid amount. Without `na.rm = TRUE`, T2's average would be `NA`. The count column also shows that T3 tops the list on a single claim.

> [!example]- Tracking a Dataframe's Shape Through a Pipeline {Example}
> A policy dataframe has 10,000 rows and 12 columns. An analyst keeps the 2,400 rows written through the agency channel, selects 4 columns (territory, exposure, premium and losses), adds a loss ratio column, then groups by territory (8 territories) and summarizes total exposure, total premium and total losses. Give the dimensions after each step.
>
> > [!answer]-
> > Filtering changes only the rows, selecting and adding columns change only the columns, and a grouped summary returns one row per group with the grouping column plus one column per summary.
> >
> > | Step | Rows | Columns |
> > | :--- | ---: | ---: |
> > | Start | 10,000 | 12 |
> > | Filter to agency | 2,400 | 12 |
> > | Select 4 columns | 2,400 | 4 |
> > | Add loss ratio | 2,400 | 5 |
> > | Group and summarize | 8 | 4 |
> >
> > The policy-level loss ratio column is not carried into the summary: a territory's loss ratio is its total losses over its total premium, computed after summarizing, not an average of the policies' ratios.

> [!tip]- How it appears on the exam
> - **DISC-DA** covers managing dataframes as the first section of its topic on preparing data for analysis, followed by [[SQL|querying data]] and [[Table Join|joining tables]]. Application questions show a small table and a sequence of operations and ask what the result contains: which rows survive a filter, what a grouped summary returns, or how many rows and columns remain.
> - Questions can also ask which operation does a task (subset rows, choose columns, derive a variable, summarize by group), or compare a dataframe operation with its SQL counterpart. Topic 9 applies the same operations to build insurance modelling data sets.

> [!warning]- Exam traps
> - **Filter and select are not the same:** Filtering keeps rows that meet a condition, and selecting keeps columns by name. An answer that "filters" a column out, or "selects" policies over \$1,000, has them swapped.
> - **Sorting does not filter:** Sorting changes the order of the rows and never their number. Taking the top rows after a sort is a separate step.
> - **A count of rows is not a count of values:** `n()` and `size()` count rows in a group, including those with a missing value, while `count()` on a column and a mean with missing values removed use only the non-missing ones. Check which a question's figure is based on.
> - **Average of ratios:** A ratio for a group is computed from the group's totals. Averaging the row-level ratios weights every policy equally, whatever its premium.
