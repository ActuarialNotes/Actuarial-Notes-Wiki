---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:15bab38948577a71881043ca990c0ea5ca6934b6a0abd424f33d9dc0a5df7f7b
  sources:
    - "Wickham & Grolemund, R for Data Science (1st ed., online), Ch.12 'Tidy data' §12.2 (three rules), §12.3 pivot_longer, §12.4.1 separate, sha256:11cbff74baa595633b2d8bf8b99f41605a1c7c67e30887714e6e3873901e93af — https://r4ds.had.co.nz/tidy-data.html"
    - "Wickham, 'Tidy Data', Journal of Statistical Software 59(10), Aug 2014, §2.2-2.3 pp.3-4, §3 p.5, §3.1-3.5 pp.5-12, §4.1 p.13, §4.3 p.14, sha256:cf1034a2675caff9d9d5bdefa80b351b3ceb8a33649799ac3966b02729a571c6 — https://www.jstatsoft.org/index.php/jss/article/view/v059i10/772"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), Ch.1 'Notation and Simple Matrix Algebra' (x_ij = value of the jth variable for the ith observation; X an n x p matrix), printed p.10 (PDF p.21), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tidy Data.md
---

**Tidy Data** is a way of laying out a data set so that it can be modelled directly: **each variable is a column, each observation is a row, and each value is a cell.** The term is from Hadley Wickham, and [[R for Data Science (Grolemund and Wickham - 2017)|Grolemund and Wickham]] build their whole data-wrangling toolkit on it; a [[Generalized Linear Model]] expects its input in exactly this shape.

> $$\mathbf{X} = \begin{bmatrix} x_{11} & x_{12} & \cdots & x_{1p} \\ x_{21} & x_{22} & \cdots & x_{2p} \\ \vdots & \vdots & & \vdots \\ x_{n1} & x_{n2} & \cdots & x_{np} \end{bmatrix}$$

- Row $i$ ($i = 1, \dots, n$) is one **observation** — in a rating model usually one policy, vehicle or policy-term; column $j$ ($j = 1, \dots, p$) is one **variable**; $x_{ij}$ is the value of variable $j$ for observation $i$
- Choosing the **unit of observation** is the first modelling decision. A frequency model is fit at the policy (or policy-term) level, so claim-level data must be **aggregated** — claims counted and losses summed by policy — and then **joined** to the policy data
- Common untidy shapes: one column per year (a *wide* table — **pivot longer** so year becomes a variable), two variables packed into one column (`"M-35"` — **separate** it), and one observation split across several tables (**join** them on a key)
- Python's pandas uses the same idea: a `DataFrame` with one row per observation. [[Python for Data Analysis (McKinney - 2022)|McKinney]] covers the loading, cleaning and reshaping steps; the file most often handed to a candidate is a `.csv`
- After any join, check that the row count is what it should be: a one-to-many key silently duplicates policies and inflates exposure. This is a [[Data Quality|data quality]] check, not a formality

> [!example]- Aggregating Claims to the Policy Level {Example}
> A policy table has $3$ policies (P1, P2, P3), each with $1.0$ car-year. A claim table has $4$ claims: P1 — $\$2{,}000$ and $\$500$; P3 — $\$8{,}000$ and $\$1{,}500$. Build the tidy table a frequency and severity model needs.
>
> > [!answer]-
> > Aggregate claims by policy, then **left-join** onto the policy table so P2 keeps its row with zero claims:
> >
> > | Policy | Exposure | Claim count | Losses |
> > | :--- | ---: | ---: | ---: |
> > | P1 | 1.0 | 2 | 2,500 |
> > | P2 | 1.0 | 0 | 0 |
> > | P3 | 1.0 | 2 | 9,500 |
> >
> > Overall frequency is $4/3 = 1.33$ claims per car-year. An inner join would have dropped P2, and with it a claim-free car-year, overstating frequency at $4/2 = 2.0$.

> [!example]- Tidying a Wide Table {Example}
> A territory summary has columns `territory`, `2022`, `2023`, `2024`, each year column holding earned exposure. Is it tidy, and what should it become?
>
> > [!answer]-
> > No. "Year" is a variable, but it is stored in the column headers, and "exposure" is spread across three columns. **Pivot longer** into three columns — `territory`, `year`, `exposure` — with one row per territory-year. A model can now use `year` as a predictor (for trend) and `exposure` as a weight or [[Offset Variable|offset]].
