---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:34a1d2785dec3f21000ab2817a820edfb4cd76b4e243c92f07c886f9568cf110
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

A **Dataframe** (data frame) is a rectangular table that holds a data set in memory for analysis, with **variables in columns** and **observations in rows**. Every value in a column has the same type, while different columns can have different types. It is the central structure of R (`data.frame`, and the tidyverse's tibble) and of Python's pandas library (`DataFrame`), which describes it as a two-dimensional labelled structure that can be thought of like a spreadsheet or an SQL table.

A dataframe has $n$ rows, the observations such as policies or claims, and $p$ columns, the variables. Most dataframe tools assume the [[Tidy Data|tidy]] layout, each variable in its own column, each observation in its own row and each value in its own cell. The [[Data Types|type]] of each column (integer, double, character, date-time) decides which operations make sense on it.

The operations on a dataframe act on its rows, its columns or groups of rows, and each has a counterpart in [[SQL]]:

| Task | R (dplyr) | pandas | SQL |
| :--- | :--- | :--- | :--- |
| Keep rows meeting a condition | `filter()` | boolean indexing | `WHERE` |
| Sort rows | `arrange()`, `desc()` | `sort_values()` | `ORDER BY` |
| Remove duplicate rows | `distinct()` | `drop_duplicates()` | `DISTINCT` |
| Choose columns | `select()` | a list of column names | `SELECT a, b` |
| Add a derived column | `mutate()` | `assign()` | `SELECT expr AS name` |
| Group and summarize | `group_by()`, `summarize()` | `groupby()`, `agg()` | `GROUP BY` |
| Combine tables on a key | `left_join()` and others | `merge()` | `JOIN` |

Filtering changes which rows are present but not their order. Sorting changes the order of the rows and never their number, and sorting on several columns uses each later column to break ties in the earlier ones. Neither touches the columns. Selecting and adding columns leave the rows alone.

dplyr's functions never modify their input, and most pandas operations return a copy. A filtered or summarized result must be assigned to a name, either a new object or the original one, or it is printed and lost.

> [!example]- What are this policy dataframe's dimensions after each step of the analysis? {Example}
> A policy dataframe has 10,000 rows and 12 columns. An analyst keeps the 2,400 rows written through the agency channel, selects 4 columns (territory, exposure, premium and losses), adds a loss ratio column, then groups by territory (8 territories) and summarizes total exposure, total premium and total losses.
>
> > [!answer]-
> > - Filtering changes only the rows, selecting and adding columns change only the columns, and a grouped summary returns one row per group with the grouping column plus one column per summary.
> >
> > | Step | Rows | Columns |
> > | :--- | ---: | ---: |
> > | Start | 10,000 | 12 |
> > | Filter to agency | 2,400 | 12 |
> > | Select 4 columns | 2,400 | 4 |
> > | Add loss ratio | 2,400 | 5 |
> > | Group and summarize | 8 | 4 |
> >
> > - The policy-level loss ratio column is not carried into the summary. A territory's loss ratio is its total losses over its total premium, computed after summarizing, not an average of the policies' ratios.

## Grouped summaries

In a grouped summary, the rows are split by the value $g_i$ of a grouping variable, and a summary function $h$ (a count, sum or mean) is applied to a variable $j$ within each group. The summary for group $g$ is

> $$s_g = h\big(\{\, x_{ij} : g_i = g \,\}\big)$$

- $x_{ij}$ is the value of variable $j$ for observation $i$.

The result has one row per group, with the grouping column plus one column per summary.

In R, a missing value (`NA`) makes `mean()` and `sum()` return `NA` unless `na.rm = TRUE` drops it. `n()` and `size()` count rows in a group, including those with a missing value, while `count()` on a column and a mean with missing values removed use only the non-missing ones. In pandas, `size()` counts the rows of each group and `count()` counts only the non-null values in each column, the same split as `COUNT(*)` against `COUNT(column)` in SQL ([[Missing Data]]).

Including the number of rows in each group with a summary shows when a group's average rests on very little data, which otherwise can put the smallest groups at the top of a ranking.

> [!example]- What does this pipeline return from the claims dataframe, and what would change without `na.rm = TRUE`? {Example}
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
> > [!answer]-
> > - The filter drops C4, an accident year 2023 claim, leaving six rows.
> > - Grouping by territory and summarizing gives one row per territory, and `n()` counts rows, including C5.
> > - The averages are $(4{,}000 + 6{,}000)/2 = 5{,}000$ for T1, $(2{,}500 + 3{,}500)/2 = 3{,}000$ for T2 and $12{,}000$ for T3.
> > - Sorted by descending average, the result is T3 ($n = 1$, 12,000), T1 ($n = 2$, 5,000) and T2 ($n = 3$, 3,000).
> > - T2's count is 3 but its average uses only the 2 claims with a paid amount. Without `na.rm = TRUE`, T2's average would be `NA`.
> > - The count column also shows that T3 tops the list on a single claim.

Data usually reach a dataframe from a database query or a file, are combined with a [[Table Join|join]], checked by [[Data Validation|validation]], and prepared for plotting in [[Exploratory Data Analysis]] or for a model ([[Data Preparation]], [[Feature Engineering]]).

> [!trap] Swapping filter and select
> Filtering keeps rows that meet a condition, and selecting keeps columns by name. An answer that "filters" a column out, or "selects" policies over \$1,000, has them swapped.
