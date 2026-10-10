---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:2a3de8332d3cfe99f3b293e2b060c0fb178472d3cae437d8d17485526aadfb49
  sources:
    - "van Buuren, Flexible Imputation of Missing Data, 2nd ed. (online), §1.2 MCAR (probability of missing the same for all cases), MAR (same only within groups defined by observed data), MNAR, sha256:db11c6ef06a0653928cd84a6aaf48929b064e7a1d27efbefb723e7cbe8ec4f45 — https://stefvanbuuren.name/fimd/sec-MCAR.html"
    - "van Buuren, Flexible Imputation of Missing Data, 2nd ed. (online), §1.3.1 listwise deletion unbiased under MCAR, wasteful, biased otherwise; §1.3.3 mean imputation underestimates variance; §1.3.7 indicator method retains full data and allows for systematic differences, sha256:cb82f987435cf0811a89c3a3f4b5b7a359edcc49cfb2d0c47a0f532d2218bdfe — https://stefvanbuuren.name/fimd/sec-simplesolutions.html"
    - "PostgreSQL 17 Documentation, §9.2 null comparisons; IS NULL, sha256:7c49c06dfe1ddba8fa5e113dc4f0a3541e7e9534916aa0aaffb02f5da91030b2 — https://www.postgresql.org/docs/17/functions-comparison.html"
    - "PostgreSQL 17 Documentation, §9.21 count(expr), aggregates over non-null, sum of no rows is null, sha256:42dc684319f61831aa4fbb2cec8af602a22aadb72eb92eb784bb84ed1a98c076 — https://www.postgresql.org/docs/17/functions-aggregate.html"
    - "PostgreSQL 17 Documentation, §9.18 COALESCE, sha256:30ef51aafd582617bbc6b538f21fb77149001f937cc795e23f54b4501db45146 — https://www.postgresql.org/docs/17/functions-conditional.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.3 'Data transformation', §3.5.2 mean() returns NA unless na.rm = TRUE, sha256:7ecfc380d9ba22575657e2e0ea5b16d9a2c7a235f5cfd2a3ad860bf6bbf745de — https://r4ds.hadley.nz/data-transform.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.3.2 missing values coded as zero found by looking, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html"
    - "pandas 3.0.6, Comparison with SQL, copies vs in place; SELECT/assign(); WHERE/boolean indexing; isna()/notna(); GROUP BY size() vs count() (NOT NULL records); JOIN via merge(); sort_values(), sha256:9fb10fe945e08662d043b8aba3f413b9accef4d652c153329fadbe7a17ea52da — https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html"
    - "CAS PCPA Exam & Project Content Outline v.8 (updated 9.9.2026), Domain A 'Dealing with Data' tasks A1-A4 and readings (ASOP 23, ASOP 56, Grolemund and Wickham), PDF pp.3-4, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
    - "SOA ATPA learning objectives (2022), missing-data objective (deletion of the record, imputation, missing value flag), sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Missing Data.md
---

**Missing Data** are values of a variable that were never recorded for some observations. How they are handled depends on **why** they are missing. The mechanism decides whether dropping or filling them leaves the model unbiased, and a missing value is often a signal in its own right.

> $$\text{Missing rate}_j = \frac{\#\{i : x_{ij} \text{ missing}\}}{n}$$

- $x_{ij}$ is variable $j$ for observation $i$, and $n$ is the number of observations. Compute the rate for every variable during [[Exploratory Data Analysis]], and look for missing values in disguise: a $0$ age, a `9999` year built, a blank territory code
- **MCAR** (missing completely at random): the chance of being missing is unrelated to anything. Dropping those rows loses data but introduces no bias
- **MAR** (missing at random): missingness depends on *other observed* variables — for example, prior-carrier information missing more often for business written through one channel. It can be handled by modelling it from those variables
- **MNAR** (missing not at random): missingness depends on the missing value itself — for example, applicants with poor credit declining to provide it. Dropping or naively filling these values biases the model
- Treatments:
  - **Complete-case analysis** drops every row with a gap. It is simple, but it can discard a large share of the data and is biased unless the data are MCAR.
  - **Imputation** fills gaps with the median, the mean or a model prediction. It keeps the rows but understates variability.
  - For a [[Categorical Predictor|categorical predictor]], an explicit **"Unknown" level** lets the GLM estimate the effect of missingness directly.
  - For a continuous predictor, impute the value **and** add a missing-value indicator.
- Whatever is chosen has to be stated in the report, and it must be applied in exactly the same way when the model is used to score new business
- **Null values in a database:** In [[SQL]] a missing value is a **null**, an unknown value, and it behaves differently from zero or a blank:
  - A comparison with a null, such as `deductible = NULL` or `deductible <> 500`, gives null rather than true or false, so a `WHERE` condition never keeps the null rows. Test for them with `IS NULL` and `IS NOT NULL`.
  - `COUNT(*)` counts every row, while `COUNT(column)` counts only the non-null values, and `SUM`, `AVG`, `MIN` and `MAX` use only the non-null values. A sum over no rows is null, not zero.
  - `COALESCE(column, value)` returns the first of its arguments that is not null, which substitutes a default where the value is missing.
  - A null key never matches in a [[Table Join|join]], so rows with null keys drop out of an inner join.
  - In R a missing value is `NA`: `mean()` and `sum()` return `NA` unless told to remove missing values (`na.rm = TRUE`), and a [[Dataframe|dataframe]] in pandas tests for nulls with `isna()` and `notna()`.

> [!example]- Missing as Its Own Level {Example}
> In a homeowners frequency GLM (log link), roof age is missing for $9\%$ of policies. Binned roof age is fitted with an "Unknown" level, which gets a coefficient of $0.18$ relative to the base level (roofs $0$–$10$ years old). How should this be interpreted?
>
> > [!answer]-
> > $$e^{0.18} = 1.197$$
> > Policies with no recorded roof age have about $20\%$ higher expected frequency than new roofs, all else equal. **Missingness is predictive** — perhaps because roof age goes unrecorded mostly on older homes bought without an inspection. Had these rows been dropped, the model would have learned nothing about them. It would then have priced them at the average, undercharging the group.

> [!example]- When Dropping Rows Biases the Model {Example}
> Prior claim history is missing for all policies written in their first year with the company, and first-year policies have higher frequency. An analyst drops every row with missing prior history. What goes wrong?
>
> > [!answer]-
> > Here missingness is tied to tenure, and tenure is tied to risk, so this is **not MCAR**. Dropping the rows removes all first-year business, and with it the higher-frequency risks. The model then understates the overall level, and it can never price a new customer.
> >
> > The better treatment keeps the rows and codes prior history as "none on file," a level of its own. Then the model can price new business, and the difference between a new customer and a claim-free renewal becomes a coefficient the actuary can inspect.

> [!tip]- How it appears on the exam
> - **DISC-DA** covers null values with indexes and user-defined functions in its topic on preparing data for analysis. Application questions give a table with nulls and a query and ask what it returns, such as a count or average with some values missing, or which condition finds the missing rows. Its topic on working with different types of data returns to missing values among the common data issues.
> - **PCPA** asks candidates to identify and appropriately manage missing data in the project's data set, and **ATPA** to handle it by choosing among deleting the record, imputation and adding a missing-value flag, which turns on the type of missingness.

> [!warning]- Exam traps
> - **Null is not zero:** `AVG` ignores nulls, so it divides by the number of non-null values. Treating a null paid amount as zero lowers the average; dropping the row changes the count.
> - **`= NULL` finds nothing:** Use `IS NULL`. A `<>` condition also silently drops the null rows.
> - **Missing in disguise:** A $0$ age or a `9999` year built will not be found by a search for nulls. Look at each variable's distribution for impossible values.
> - **Dropping rows is a choice with a bias:** Complete-case analysis is unbiased only when the values are missing completely at random. When missingness is tied to the risk, keep the rows and model the missingness.

