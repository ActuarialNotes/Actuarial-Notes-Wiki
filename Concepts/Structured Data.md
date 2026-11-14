---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f81c3d2fce880e4c7c3e52f5d0edcb5055f4d4203480146ea9d4925d23408ffd
  sources:
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §1 'unstructured data' vs structured data, canonical example a relational database; semistructured search, sha256:2536b9352416ca671cd66b93bd5878c85d7461d479dc730c2f79687e69dd0e65 — https://nlp.stanford.edu/IR-book/html/htmledition/boolean-retrieval-1.html"
    - "Manning, Raghavan & Schütze, Introduction to Information Retrieval (Cambridge UP, 2008), §10 XML: semistructured retrieval, sha256:6ad525b29d7965f8216806084a9bceb4bf533ad0533acc017fb58ac9724fb5df — https://nlp.stanford.edu/IR-book/html/htmledition/xml-retrieval-1.html"
    - "PostgreSQL 17 Documentation, §5.5.2-5.5.5 not-null, unique, primary key and foreign key constraints, sha256:f3797f1e000c84ee57bcb411cbffa458be90b2adb69889d243abfa090b0b8224 — https://www.postgresql.org/docs/17/ddl-constraints.html"
    - "PostgreSQL 17 Documentation, §2.7 aggregates, GROUP BY, WHERE vs HAVING, sha256:df158bcbc7924e1fbe49821aab78e37df53a7e14ac4cc8befdc480fee72b7e35 — https://www.postgresql.org/docs/17/tutorial-agg.html"
    - "PostgreSQL 17 Documentation, §9.21 COUNT(*) vs COUNT(expr); avg of non-null values, sha256:42dc684319f61831aa4fbb2cec8af602a22aadb72eb92eb784bb84ed1a98c076 — https://www.postgresql.org/docs/17/functions-aggregate.html"
    - "SOA Exam PA syllabus, October 2026, Topic 2 'Data Exploration and Visualization', objective a) 'Identify structured and unstructured data types', PDF p.2, sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Structured Data.md
---
**Structured Data** are data organized under a fixed schema: records arranged as rows, each with the same set of named fields arranged as columns, and each field holding values of one declared [[Data Types|data type]]. Because every record has the same shape, structured data are stored in the tables of a [[Relational Database|relational database]] and can be filtered, sorted, joined and summarized directly with SQL.

A table of structured data has three parts:

1. **A schema.** It fixes, before any data are loaded, each table's fields, their data types (integer, decimal, text, date), and constraints such as a field that may not be null or must be unique.
2. **Records that fit it.** A record that does not fit, such as a date with 30 February in it, is rejected or flagged when loaded. This is a large part of why structured data are easier to trust than [[Unstructured Data|unstructured data]].
3. **Keys.** A primary key identifies each record, such as the policy number, and foreign keys link a record to records in other tables, such as the policy number on a claim. Keys make a [[Table Join|join]] possible and let duplicates be found.

Data are structured, semi-structured or unstructured according to their shape:

| Kind | Shape | Insurance example |
| :--- | :--- | :--- |
| Structured | A fixed set of typed fields in every record | Policy, premium, billing and claim tables |
| Semi-structured | Labels on the pieces, but no single fixed table shape | JSON or XML telematics records |
| Unstructured | No predefined fields | Adjusters' notes, photos, recorded calls |

Most insurer policy, premium and claim data are structured. So are the records reported to a [[Statistical Plan|statistical plan]], [[External Data|external data]] such as credit attributes or motor vehicle records delivered in fixed layouts, and the aggregated tables in a [[Data Warehouse|data warehouse]] or [[Data Mart|data mart]].

> [!example]- An underwriter types inspection notes into a free-text field of the policy database. Are the notes structured data? {Example}
> - The notes sit in a database column, but each one is free text with no fixed fields inside it.
> - Whether data are structured depends on their shape, not on where they are stored.
> - The notes are unstructured data. Moving them to a data mart would not change that.

> [!trap] Deciding by storage instead of shape
> A spreadsheet with consistent columns is structured even though it is not in a database, and a database field holding free-text notes holds unstructured data. Decide by whether each record follows a fixed set of typed fields.

## Summarizing structured data with SQL

A summary query selects the fields it needs, filters rows with `WHERE`, groups them with `GROUP BY`, aggregates each group with functions such as `COUNT`, `SUM`, `AVG`, `MIN` and `MAX`, and filters the groups with `HAVING`. `WHERE` filters rows before they are grouped. `HAVING` filters groups after aggregation, so a condition on a total, such as territories with more than 1,000 car-years, belongs in `HAVING`. The result is itself a structured table, one row per group.

Let row $i$ of a table have a grouping field $x_i$, such as territory, a measure $y_i$, such as premium, and an exposure $e_i$. The total of the measure over the rows in group $g$, which `SUM(y) ... GROUP BY x` returns, is

> $$S_g = \sum_{i \,:\, x_i = g} y_i$$

The group's average per unit of exposure, such as the average premium per car-year, is

> $$\bar{y}_g = \frac{\sum_{i \,:\, x_i = g} y_i}{\sum_{i \,:\, x_i = g} e_i}$$

> [!example]- What does this query return for the policy table? {Example}
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
> ```sql
> SELECT terr, COUNT(*) AS policies, SUM(exposure) AS expo,
>        SUM(premium) AS prem, SUM(premium) / SUM(exposure) AS avg_prem
> FROM policy
> GROUP BY terr
> ```
>
> > [!answer]-
> > - Each group's sums run over its own rows.
> > - For territory 1, the premium is $900 + 450 + 1{,}000 = 2{,}350$ over $2.50$ car-years, so `avg_prem` is $940$.
> > - The other territories follow in the same way.
> >
> > | terr | policies | expo | prem | avg_prem |
> > | :--- | ---: | ---: | ---: | ---: |
> > | T1 | 3 | 2.50 | 2,350 | 940 |
> > | T2 | 2 | 2.00 | 2,500 | 1,250 |
> > | T3 | 3 | 2.00 | 3,000 | 1,500 |
> >
> > - Territory 3 has as many policies as territory 1 but less exposure, because two of its policies were in force for part of the year.
> > - Counting policies would overstate its size, which is why the summary divides premium by exposure.

## From other kinds of data to structured data

[[Unstructured Data]] and semi-structured data become structured once features are extracted or the records are flattened into rows. That is usually how they enter a model as predictors.

## Limits of a fixed schema

A fixed schema captures only what its designers anticipated. A fact with no field, such as the reason a claim was reopened, is either lost or typed into a free-text field, where it becomes unstructured again.
