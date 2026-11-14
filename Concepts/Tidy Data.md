---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:c5a02ea12d7cd4caa9c5fd68954ed6cef2d929d7666c8026514ac4bfeeccbd2f
  sources:
    - "Wickham & Grolemund, R for Data Science (1st ed., online), Ch.12 'Tidy data' §12.2 (three rules), §12.3 pivot_longer, §12.4.1 separate, sha256:11cbff74baa595633b2d8bf8b99f41605a1c7c67e30887714e6e3873901e93af — https://r4ds.had.co.nz/tidy-data.html"
    - "Wickham, 'Tidy Data', Journal of Statistical Software 59(10), Aug 2014, §2.2-2.3 pp.3-4, §3 p.5, §3.1-3.5 pp.5-12, §4.1 p.13, §4.3 p.14, sha256:cf1034a2675caff9d9d5bdefa80b351b3ceb8a33649799ac3966b02729a571c6 — https://www.jstatsoft.org/index.php/jss/article/view/v059i10/772"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), Ch.1 'Notation and Simple Matrix Algebra' (x_ij = value of the jth variable for the ith observation; X an n x p matrix), printed p.10 (PDF p.21), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tidy Data.md
---

**Tidy Data** is a way of laying out a data set so that it can be modelled directly. The term is from Hadley Wickham, and [[R for Data Science (Grolemund and Wickham - 2017)|Grolemund and Wickham]] build their data-wrangling toolkit on it. A data set is tidy when

1. each variable is a column,
2. each observation is a row, and
3. each value is a cell.

A [[Generalized Linear Model]] expects its input in exactly this shape. A tidy data set of $n$ observations of $p$ variables is the matrix

> $$\mathbf{X} = \begin{bmatrix} x_{11} & \cdots & x_{1p} \\ \vdots & & \vdots \\ x_{n1} & \cdots & x_{np} \end{bmatrix}$$

- $x_{ij}$ is the value of variable $j$ for observation $i$, with $i = 1, \dots, n$ and $j = 1, \dots, p$.

Python's pandas uses the same idea: a `DataFrame` with one row per observation. [[Python for Data Analysis (McKinney - 2022)|McKinney]] covers the loading, cleaning and reshaping steps.

## The unit of observation

Choosing the unit of observation is the first modelling decision. In a rating model a row is usually one policy, vehicle or policy-term. A frequency model is fit at the policy (or policy-term) level, so claim-level data must be **aggregated** — claims counted and losses summed by policy — and then **joined** to the policy data. A left join keeps the policies with no claims.

> [!example]- What tidy table does a frequency and severity model need from these two tables? {Example}
> A policy table has three policies, P1, P2 and P3, each with $1.0$ car-year. A claim table has four claims:
>
> | Policy | Claim ($) |
> | :--- | ---: |
> | P1 | 2,000 |
> | P1 | 500 |
> | P3 | 8,000 |
> | P3 | 1,500 |
>
> > [!answer]-
> > - Aggregate the claims by policy: P1 has 2 claims and $\$2{,}500$, P3 has 2 claims and $\$9{,}500$.
> > - Left-join the summary onto the policy table, so P2 keeps its row with zero claims:
> >
> > | Policy | Exposure | Claim count | Losses |
> > | :--- | ---: | ---: | ---: |
> > | P1 | 1.0 | 2 | 2,500 |
> > | P2 | 1.0 | 0 | 0 |
> > | P3 | 1.0 | 2 | 9,500 |
> >
> > - Overall frequency is $4/3 = 1.33$ claims per car-year.
> > - An inner join would have dropped P2, and with it a claim-free car-year, overstating frequency at $4/2 = 2.0$.

## Common untidy layouts

Three layouts break the rules. A *wide* table has one column per year, so it is **pivoted longer** to make year a variable. A column packing two variables into one value (`"M-35"`) is **separated**. One observation split across several tables is **joined** on a key.

> [!example]- A territory summary has columns `territory`, `2022`, `2023` and `2024`, each holding earned exposure. Is it tidy, and what should it become? {Example}
> - It is not tidy. Year is a variable, but it is stored in the column headers, and exposure is spread across three columns.
> - Pivoting longer gives three columns, `territory`, `year` and `exposure`, with one row per territory-year.
> - A model can now use `year` as a predictor (for trend) and `exposure` as a weight or [[Offset Variable|offset]].

> [!trap] Joining without checking the row count
> A one-to-many key silently duplicates policies and inflates exposure. After any join, check that the row count is what it should be. This is a [[Data Quality|data quality]] check, not a formality.
