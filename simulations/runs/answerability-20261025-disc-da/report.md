# Answerability: Exam DISC-DA (CAS)

Run `answerability-20261025-disc-da` · 59 questions checked of 59 attempted · cost $11.26

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away or on a prerequisite exam's page | 48 | 81% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 6 | 10% |
| **Gap** — something the solution uses is taught on no page | 5 | 8% |

Requirements: 277 — tagged 251 (91%), linked 9 (3%), prerequisite 0 (0%), elsewhere 9 (3%), missing 8 (3%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 59 | 48 | 6 | 5 (8%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### **no page for Cybersecurity Event** — 1 question(s)

- `discda-an-217` (definition): A cybersecurity event is an event resulting in unauthorized access to, disruption of, or misuse of an information system or the nonpublic information stored on it, and the model law's notification duty is triggered when the licensee determines such an event has occurred.

### `Concepts/Insurance Data Regulation.md` — 1 question(s)

- `discda-an-219` (fact): Title insurance is expressly excluded from Colorado SB21-169 (C.R.S. §10-3-1104.9).
- `discda-an-219` (fact): Bonds executed by qualified surety companies are expressly excluded from Colorado SB21-169 (C.R.S. §10-3-1104.9).

### `Concepts/Linear Regression.md` — 1 question(s)

- `discda-an-225` (procedure): To predict with a fitted model, express each predictor in the units used in the model's definition (e.g., convert dollars to thousands of dollars) before substituting it into the equation.

### `Concepts/Outlier.md` — 1 question(s)

- `discda-an-030` (fact): A dense cluster of points in a plot reflects where most of the data lie (typical values), not outliers, and removing it hides the bulk of the data.

### `Concepts/SQL.md` — 1 question(s)

- `discda-an-018` (procedure): To include a default value for nulls in an aggregate, apply the null-replacement function to the column inside the aggregate so the substitution happens row by row before aggregating; wrapping the aggregate result does not change the per-row nulls.

### `Concepts/Scatter Plot.md` — 1 question(s)

- `discda-an-030` (fact): Enlarging plotted points increases overlap and therefore worsens overplotting.
- `discda-an-030` (fact): Summarizing two variables with a single overall mean discards the relationship between them, which a scatter plot is meant to display.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `discda-an-003` | Database Index, Frequency |
| `discda-an-005` | Earned Exposure |
| `discda-an-008` | Complement of Credibility |
| `discda-an-031` | Chart Selection, Univariate Plot |
| `discda-an-032` | Frequency |
| `discda-an-033` | Scatter Plot, Univariate Plot |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Chart Selection | 4 | A line chart is meant for data with a meaningful sequence such as time; plottin…; A line chart connecting points implies an ordered sequence such as time, so it …; A table suits looking up exact values but is poor at conveying a pattern or ran… |
| Dataframe | 4 | Applying summarize() to a grouped dataframe (group_by) returns one row per grou…; In dplyr, n() returns the number of rows in the current group, counting rows wi…; The na.rm = TRUE argument tells an R summary function to remove missing values … |
| Claims Modeling Dataset | 2 | To check a candidate feature for leakage, determine when its value becomes know…; Features that accumulate or are updated after the prediction point, such as cum…; Information recorded at first notice of loss, such as reporting lag, cause-of-l… |
| Exploratory Data Visualization | 2 | An entire group, such as a state with a higher median, is not an outlier, and r…; A stacked bar chart of raw counts has bar segment heights that reflect group si… |
| Insurer Operational Data | 2 | Claim-level characteristics (e.g., attorney representation, injury type, report…; Only payments made within the calendar year count toward that year's calendar y…; A claim settled for less than its prior year-end case reserve produces a negati… |
| Model Training and Evaluation | 2 | Select the model with the lowest validation error, then evaluate the selected m…; Training-set fit is the most optimistic measure of model performance because th… |
| Underwriting Modeling Dataset | 2 | Earned exposure for a period is the portion of a policy's term that falls withi…; To build calendar-year rows from policy terms, truncate each policy term to the…; Assign each claim to the calendar-year row by its accident date, counting only … |
| Classification Tree | 1 | With two classes, a leaf predicts the class whose estimated probability exceeds… |
| Confusion Matrix | 1 | In a binary classifier's confusion matrix, true positives are actual positives …; Derive missing confusion-matrix cells from totals: FP equals flagged count minu… |
| Data Issues | 1 | To treat a suspected erroneous value, check it against the source record and co…; Deleting a whole record because of one bad value discards the record's other va… |
| Data Quality | 1 | ASOP No. 23 requires the actuary to disclose significant steps taken to adjust … |
| Data Types | 1 | Entering a variable as a single numeric predictor in a GLM imposes a linear tre… |
| Data Validation | 1 | A claim cannot be reported before its accident occurs, so a report date earlier… |
| Database Index | 1 | A database index speeds up query performance on a column but does not change th… |
| Exploratory Data Analysis | 1 | A pattern seen in an exploratory plot is a hypothesis, not a conclusion or a ra… |
| External Data | 1 | To assess whether missing or unmatched records are random, compare match rates …; Deleting records with missing values when missingness is related to a risk char…; An acceptable overall match rate depends on where the unmatched records fall, n… |
| Insurance Data Regulation | 1 | Under Colorado SB21-169 (C.R.S. §10-3-1104.9), external consumer data and infor…; Colorado SB21-169 applies to insurance practices such as underwriting, so a per… |
| Missing Data | 1 | The SQL AVG aggregate ignores null values, dividing the sum of non-null values … |
| SQL | 1 | To filter on both row-level values and group totals, put the row-level conditio… |
| Statistical Plan | 1 | A statistical agent only compiles and reports statistical data and does not set… |
| Structured Data | 1 | Whether data are structured depends on having a consistent schema, not on where… |
| Summary Statistics | 1 | Group frequencies must be weighted by exposure, not by claim counts or equally,… |
| Table Join | 1 | In a one-to-many join, a left row with multiple matching right rows appears onc… |
| Types of Plots | 1 | A heat map of raw claim counts mainly reflects where exposure is concentrated, … |
| Univariate Plot | 1 | A box plot summarizes the distribution of values (median, quartiles, spread, ou… |
| Unstructured Data | 1 | Semi-structured data, such as JSON or XML, carries labelled fields or tags that…; Storing data in a database column or moving it to a different repository such a… |
| User-Defined Function | 1 | A SQL CASE expression with no ELSE clause returns NULL for any input that match…; Range bands defined with inclusive bounds (e.g., 25 to 64) include both endpoin… |
| Visualization Design Principles | 1 | To emphasize a single series among many, show it in one strong accent color and… |

## Every question

<details><summary><code>discda-an-001</code> · answerable</summary>

Tagged pages: Data Analytics

| Item | Kind | Status | Where |
|---|---|---|---|
| Prescriptive analytics uses predictions together with costs, constraints and objectives to recommend a specific action or decision. | definition | tagged | Data Analytics: “prescriptive analytics combines a prediction with costs and constraints to recommend an action.” |
| Predictive analytics uses data and models to estimate the probability or value of future or unknown outcomes, such as a claim's likelihood … | definition | tagged | Data Analytics: “Predictive analytics estimates outcomes that are not yet known, such as next year's claims or wheth…” |
| Diagnostic analytics examines historical data to explain why something happened, such as the drivers behind a change in results. | definition | tagged | Data Analytics: “A diagnostic analysis starts from a descriptive result and breaks it down by segment, period or cau…” |
| Descriptive analytics summarizes historical or current data to report what happened or what exists, such as counts and averages. | definition | tagged | Data Analytics: “The first block is a descriptive summary, the average outcome $\bar{y}_g$ over the $n_g$ records in…” |
| The four types of analytics (descriptive, diagnostic, predictive, prescriptive) are distinguished by the question each answers, and a tool … | fact | tagged | Data Analytics: “It is commonly divided into four types that answer progressively harder questions: **descriptive** …” |

</details>

<details><summary><code>discda-an-002</code> · answerable</summary>

Tagged pages: Data Quality, Missing Data

| Item | Kind | Status | Where |
|---|---|---|---|
| ASOP No. 23 directs the actuary to make a reasonable effort to learn the definition of each data element used in the analysis. | fact | tagged | Data Quality: “**Review** (§3.3): make a reasonable effort to learn the *definition* of each data element and to i…” |
| When reviewing data, the actuary should look for questionable or inconsistent values, such as default or placeholder values that stand in f… | fact | tagged | Data Quality: “make a reasonable effort to learn the *definition* of each data element and to identify questionabl…” |
| A default value written by a system for a blank field is disguised missing data and does not represent a true value of the variable. | definition | tagged | Data Quality: “Age $0$ is often a default written when the field was left blank, which makes it [[Missing Data\\|mi…” |
| Handle missing or disguised-missing values explicitly, for example by assigning an 'unknown' level or adding a missing-value flag, so the m… | procedure | tagged | Missing Data: “For a [[Categorical Predictor\\|categorical predictor]], an explicit **"Unknown" level** lets the GL…” |
| ASOP No. 23 permits use of data with defects after adjustment, and deleting records discards their other information and can bias results i… | fact | tagged | Data Quality: “**Use** (§3.4): judge whether the data are acceptable as they are, need enhancement, can be used wi…” |
| ASOP No. 23 requires only a review of the data, which is less detailed than an audit; the actuary is not required to audit the data. | fact | tagged | Data Quality: “A review is not an **audit**, and the actuary is not required to perform one” |
| ASOP No. 23 requires the actuary to disclose significant steps taken to adjust or improve the data. | fact | tagged | Data Quality (collapsed): “Finally **disclose**: in summary form, the questionable values found and the steps taken to fix the…” |

</details>

<details><summary><code>discda-an-003</code> · untagged</summary>

Tagged pages: Data Documentation, Insurer Operational Data

| Item | Kind | Status | Where |
|---|---|---|---|
| Claim frequency equals the number of claims divided by the exposure base (e.g., earned exposure units such as car-years). | formula | elsewhere | Frequency: “$$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$” |
| Frequency depends on the unit of exposure used, so the same claim count divided by exposures measured in different units (e.g., half-year t… | fact | tagged | Data Documentation: “The analyst's \$600 is a pure premium per six-month term, but it would be read as \$600 per car-yea…” |
| A data dictionary documents the definition, meaning, and unit of each field in a data set, so users interpret fields consistently. | definition | tagged | Data Documentation: “A data dictionary lists every field with its name, plain-language definition, data type and format,…” |
| Metadata describes a data set as a whole, such as its extract or run date, record count, and filters, rather than the meaning or unit of in… | definition | tagged | Data Documentation: “Metadata is data about the data set as a whole. It records when the data were extracted and as of w…” |
| A database index speeds up query performance on a column but does not change the results a query returns. | definition | elsewhere | Database Index (collapsed): “An index changes how fast a query runs, never which rows it returns.” |
| Data lineage traces where data came from and how it was transformed, including its source systems, so discrepancies can be traced to their … | definition | tagged | Data Documentation: “Lineage traces each field back through the [[Data Pipeline\\|pipeline]] to its source: which tables …” |

</details>

<details><summary><code>discda-an-004</code> · answerable</summary>

Tagged pages: Data Types

| Item | Kind | Status | Where |
|---|---|---|---|
| A nominal categorical variable has levels that are labels with no meaningful order or spacing, such as identifier or class codes. | definition | tagged | Data Types: “**Nominal** — unordered labels: territory, vehicle make, distribution channel.” |
| An ordinal variable is categorical with levels that have a meaningful order, such as credit tiers, though the spacing between levels need n… | definition | tagged | Data Types: “**Ordinal** — ordered labels whose spacing means nothing: credit tier, construction class, limit ba…” |
| A numeric storage type does not make a field a numeric statistical variable; a numeric-looking code that merely identifies a category shoul… | fact | tagged | Data Types: “**Storage type is not statistical type.** A territory stored as the integers $1$–$12$ is nominal, a…” |
| A categorical predictor enters a GLM as a set of indicator (dummy) variables, one per level (less a base level), rather than as a single sl… | fact | tagged | Data Types: “Software reads what the file holds, so categorical variables must be declared — a `factor` in R, a …” |
| Entering a variable as a single numeric predictor in a GLM imposes a linear trend (one slope) across its values, assuming equal effect per … | fact | tagged | Data Types (collapsed): “The trap is `territory`: left as an integer it is read as a measurement, and a model would assume t…” |
| A discrete count variable records the number of events (such as claims) and is modeled with a count distribution; an identifier code counts… | definition | tagged | Data Types: “**Discrete (count)** — non-negative integers: claim counts, vehicles per policy.” |

</details>

<details><summary><code>discda-an-005</code> · untagged</summary>

Tagged pages: Insurer Operational Data, Written Premium

| Item | Kind | Status | Where |
|---|---|---|---|
| A transactional policy database keeps the original policy record and adds new offsetting records for changes such as cancellations, rather … | fact | tagged | Insurer Operational Data: “A cancellation or a mid-term change does not overwrite the original record. It adds records: one th…” |
| A mid-term cancellation transaction is recorded as a negative record that reverses the unearned portion of the policy's exposure and premiu… | procedure | tagged | Insurer Operational Data: “A cancellation or a mid-term change does not overwrite the original record. It adds records: one th…” |
| With exposure and premium earned evenly over the term, the unearned fraction equals the remaining months divided by the total months of the… | procedure | tagged | Insurer Operational Data: “X has 2 records: $+1.00$ exposure and $+\$900$ on March 1, 2024, then $-0.25$ and $-\$225$ on Decem…” |
| A car-year is the unit of exposure for auto insurance; one car insured for a full year is 1.00 car-year, and partial periods are prorated. | definition | elsewhere | Earned Exposure: “A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: wr…” |

</details>

<details><summary><code>discda-an-006</code> · answerable</summary>

Tagged pages: Insurer Operational Data, Rating Variable, Table Join

| Item | Kind | Status | Where |
|---|---|---|---|
| A rating variable must be known for every policyholder (including prospects) at the time the policy is quoted or rated. | fact | tagged | Insurer Operational Data: “A claim characteristic can describe what drives claim size, but only characteristics known for ever…” |
| Claim-level characteristics (e.g., attorney representation, injury type, report lag) exist only for policies with a claim and are known onl… | fact | tagged | Insurer Operational Data (collapsed): “A characteristic recorded on the claim, such as the type of injury, may explain severity in a reser…” |
| Policy database fields (e.g., driver date of birth) are recorded for every insured, so they can be used as or to derive rating variables su… | fact | tagged | Insurer Operational Data: “A field captured as a changing value (a driver's age) is less useful than a stable one it can be de…” |
| When joining claims and policy databases for a frequency model, keep only fields available for all policyholders at quote time as candidate… | procedure | tagged | Insurer Operational Data: “A claim characteristic can describe what drives claim size, but only characteristics known for ever…” |

</details>

<details><summary><code>discda-an-007</code> · answerable</summary>

Tagged pages: Insurer Operational Data, Case Reserves, Calendar Year

| Item | Kind | Status | Where |
|---|---|---|---|
| Calendar year reported losses equal the payments made during the calendar year plus the change in case reserves (ending minus beginning) du… | definition | tagged | Calendar Year: “$$\text{CY Reported Losses} = \text{Paid} + \Delta\text{Case Reserves}$$” |
| To find a claim's calendar year contribution, take the case reserve at the start of the year (the prior year-end reserve) and at the end of… | procedure | tagged | Calendar Year: “$\Delta$ terms are ending balance minus beginning balance.” |
| Only payments made within the calendar year count toward that year's calendar year losses; all payments in the year are summed, while the r… | fact | tagged | Insurer Operational Data (collapsed): “Calendar year 2025 sees payments of \$11,000 but releases the \$12,000 reserve set in 2024, so this…” |
| A claim settled for less than its prior year-end case reserve produces a negative calendar year reported loss in the settlement year (reser… | fact | tagged | Insurer Operational Data (collapsed): “Calendar year 2025 sees payments of \$11,000 but releases the \$12,000 reserve set in 2024, so this…” |

</details>

<details><summary><code>discda-an-008</code> · untagged</summary>

Tagged pages: Statistical Plan, Insurer Operational Data, External Data

| Item | Kind | Status | Where |
|---|---|---|---|
| Insurers report premium, exposure, and loss data to a statistical agent under a statistical plan, which specifies uniform coding of the dat… | procedure | tagged | Statistical Plan: “A **Statistical Plan** is a standardized set of rules and codes by which insurers report their prem…” |
| An advisory organization pools industry statistical data from many insurers to produce advisory loss costs by class and territory, which in… | definition | tagged | Statistical Plan: “An advisory organization such as ISO uses the pooled data to develop loss costs and rating factors …” |
| Advisory loss costs give a new entrant or small insurer with no or thin own data a starting point for rates, but they are limited to the ra… | fact | tagged | Statistical Plan: “A small insurer's own data are too thin for credible class and territory relativities, so the indus…” |
| Data from other states or other lines cannot be treated as fully credible for a new state, because the classes, territories, and loss exper… | fact | elsewhere | Complement of Credibility: “requires related experience whose frequency, severity or other determinable characteristics may rea…” |
| A statistical agent only compiles and reports statistical data and does not set insurers' rates; each insurer files its own rates and may a… | fact | tagged | Statistical Plan (collapsed): “A statistical agent collects and aggregates the data. Advisory loss costs built from those data are…” |
| External data such as telematics scores can supplement a rating plan with additional rating variables but does not replace class and territ… | fact | tagged | Statistical Plan: “so a modern rating variable that the plan does not code, such as a telematics score, is not availab…” |

</details>

<details><summary><code>discda-an-009</code> · answerable</summary>

Tagged pages: External Data, Missing Data

| Item | Kind | Status | Where |
|---|---|---|---|
| A match rate is the number of matched records divided by the total number of records in the group (segment or overall). | formula | tagged | External Data: “$$\text{Match rate} = \frac{\text{records matched to the source}}{\text{records submitted}}$$” |
| To assess whether missing or unmatched records are random, compare match rates across segments (e.g., by territory or risk class) rather th… | procedure | tagged | External Data (collapsed): “The overall rate looks good, but the missing scores are concentrated in rural policies, so they are…” |
| Data is missing completely at random when the probability of being missing does not depend on any observed or unobserved characteristics, s… | definition | tagged | Missing Data: “**MCAR** (missing completely at random): the chance of being missing is unrelated to anything. Drop…” |
| Deleting records with missing values when missingness is related to a risk characteristic removes a disproportionate share of that segment … | fact | tagged | External Data (collapsed): “Dropping the unmatched policies would remove 60% of the rural book and bias the model toward urban …” |
| Missing values of a predictor can be handled by keeping the records and treating 'missing/no score' as its own category level instead of de… | procedure | tagged | Missing Data: “For a [[Categorical Predictor\\|categorical predictor]], an explicit **"Unknown" level** lets the GL…” |
| An acceptable overall match rate depends on where the unmatched records fall, not on its size alone; a moderately high overall rate can sti… | fact | tagged | External Data (collapsed): “The overall rate looks good, but the missing scores are concentrated in rural policies, so they are…” |

</details>

<details><summary><code>discda-an-010</code> · answerable</summary>

Tagged pages: Dataframe

| Item | Kind | Status | Where |
|---|---|---|---|
| dplyr's mutate() adds new columns computed from existing columns while keeping every row, so the row count is unchanged and the column coun… | fact | tagged | Dataframe: “Selecting and adding columns leave the rows alone.” |
| dplyr's filter() keeps only the rows that satisfy a condition, so it can reduce the number of rows while leaving the columns unchanged. | fact | tagged | Dataframe: “Filtering changes which rows are present but not their order, and sorting changes their order but n…” |
| dplyr's arrange() reorders the rows of a dataframe by one or more columns without changing the number of rows or columns. | fact | tagged | Dataframe: “Filtering changes which rows are present but not their order, and sorting changes their order but n…” |
| Applying summarize() to a grouped dataframe (group_by) returns one row per group containing the grouping columns and the summary columns, s… | fact | tagged | Dataframe (collapsed): “a grouped summary returns one row per group with the grouping column plus one column per summary.” |

</details>

<details><summary><code>discda-an-011</code> · answerable</summary>

Tagged pages: Dataframe, Missing Data

| Item | Kind | Status | Where |
|---|---|---|---|
| In dplyr, group_by() followed by summarize() splits the data into groups and computes each summary expression once per group, returning one… | procedure | tagged | Dataframe: “The second block is a grouped summary: the rows are split by the value $g_i$ of a grouping variable…” |
| In dplyr, n() returns the number of rows in the current group, counting rows with missing values. | fact | tagged | Dataframe (collapsed): “`n()` and `size()` count rows in a group, including those with a missing value” |
| In R, mean() of a vector containing any NA returns NA unless na.rm = TRUE is specified. | fact | tagged | Dataframe: “In R, a missing value (`NA`) makes `mean()` and `sum()` return `NA` unless `na.rm = TRUE` drops it.” |
| The na.rm = TRUE argument tells an R summary function to remove missing values before computing, so the mean is taken over non-missing valu… | definition | tagged | Dataframe (collapsed): “T2's count is 3 but its average uses only the 2 claims with a paid amount.” |
| NA in R represents an unknown (missing) value, not zero, so it is not treated as 0 in calculations. | definition | tagged | Missing Data: “In [[SQL]] a missing value is a **null**, an unknown value, and it behaves differently from zero or…” |

</details>

<details><summary><code>discda-an-012</code> · answerable</summary>

Tagged pages: Dataframe

| Item | Kind | Status | Where |
|---|---|---|---|
| A grouped summary (group-by then summarize) returns one row per distinct combination of the grouping variables that occurs in the data, so … | fact | tagged | Dataframe (collapsed): “a grouped summary returns one row per group with the grouping column plus one column per summary.” |
| The result of a grouped summary contains the grouping columns plus one column for each summary statistic computed, so its column count is t… | fact | tagged | Dataframe (collapsed): “a grouped summary returns one row per group with the grouping column plus one column per summary.” |
| The grouped summary's output shape is determined only by the grouping variables and the statistics; earlier steps such as filtering rows, s… | fact | tagged | Dataframe (collapsed): “Filtering changes only the rows, selecting and adding columns change only the columns, and a groupe…” |

</details>

<details><summary><code>discda-an-013</code> · answerable</summary>

Tagged pages: SQL

| Item | Kind | Status | Where |
|---|---|---|---|
| In SQL, the WHERE clause filters individual input rows before grouping and aggregation occur, so it cannot contain aggregate functions such… | fact | tagged | SQL: “Because `WHERE` runs before grouping, it cannot contain an aggregate function.” |
| The HAVING clause filters groups after GROUP BY and aggregate computation, so it can apply conditions on aggregate values such as a group's… | definition | tagged | SQL: “`HAVING` selects groups after the aggregates are computed, so its condition normally uses one, such…” |
| To filter on both row-level values and group totals, put the row-level condition in WHERE (so excluded rows never enter the aggregates) and… | procedure | tagged | SQL (collapsed): “A condition on an aggregate, such as `SUM(paid) > 100000`, cannot go in `WHERE`, which runs before …” |
| ORDER BY only sorts the result rows and does not remove any rows or groups from the output. | fact | linked | Dataframe (collapsed): “Sorting changes the order of the rows and never their number.” |
| A column alias or computed expression in the SELECT list only names a value and does not filter rows; the alias cannot be referenced in WHE… | fact | tagged | SQL: “`AS` gives an output column a name (a column alias), which can be used in `ORDER BY` but not in `WH…” |

</details>

<details><summary><code>discda-an-014</code> · answerable</summary>

Tagged pages: SQL, Missing Data

| Item | Kind | Status | Where |
|---|---|---|---|
| The SQL aggregate AVG ignores NULL values: it averages only the non-null values, dividing by the count of non-null rows, and does not treat… | fact | tagged | SQL: “`COUNT(*)` counts rows, `COUNT(col)` counts rows where `col` is not null, and `SUM`, `AVG`, `MIN` a…” |
| A NULL in SQL represents a missing or unknown value, not the number zero. | definition | tagged | SQL: “A null is an unknown value, so comparing it with `=` or `<>` gives null rather than true or false, …” |
| A WHERE clause filters rows before aggregation, so an aggregate in the SELECT list is computed only over the rows that satisfy the conditio… | procedure | tagged | SQL: “The tables in `FROM` are read and joined, `WHERE` removes the rows that do not satisfy its conditio…” |
| SUM adds the non-null values of a column, MAX returns the largest value, and COUNT(*) counts all rows including those with NULLs, while COU… | definition | tagged | Missing Data: “`COUNT(*)` counts every row, while `COUNT(column)` counts only the non-null values, and `SUM`, `AVG…” |

</details>

<details><summary><code>discda-an-015</code> · answerable</summary>

Tagged pages: SQL, Missing Data

| Item | Kind | Status | Where |
|---|---|---|---|
| In SQL, a comparison involving NULL (including <>, =, <, >) evaluates to unknown (NULL), not true or false. | fact | tagged | SQL: “A null is an unknown value, so comparing it with `=` or `<>` gives null rather than true or false, …” |
| A WHERE clause keeps only rows for which the condition evaluates to true, so rows where the condition is unknown (NULL) are excluded. | fact | tagged | SQL: “A row is kept only if the condition is true for it.” |
| COUNT(*) counts all rows that remain after the WHERE filter, regardless of NULL values in any column. | fact | tagged | Missing Data: “`COUNT(*)` counts every row, while `COUNT(column)` counts only the non-null values” |
| To include rows with NULL in a not-equal filter, add an explicit test such as OR column IS NULL, since IS NULL is the way to test for missi… | procedure | tagged | SQL: “Test for it with `IS NULL` or `IS NOT NULL`, and use `COALESCE` to substitute a value.” |

</details>

<details><summary><code>discda-an-016</code> · answerable</summary>

Tagged pages: Table Join, SQL

| Item | Kind | Status | Where |
|---|---|---|---|
| A LEFT JOIN returns every row of the left table, paired with each matching row of the right table, and with nulls in the right-table column… | definition | tagged | Table Join: “A left join keeps every row of the left table, a right join keeps every row of the right table and …” |
| In a one-to-many join, a left row with multiple matching right rows appears once per match, so the row count can exceed the left table's ro… | fact | tagged | Table Join (collapsed): “A left join keeps every left row at least once, but a left row with three matches appears three tim…” |
| Right-table rows with no matching key in the left table (orphan rows) are dropped by a LEFT JOIN; only a right or full outer join would kee… | fact | tagged | Table Join: “A full outer join keeps those of both, filling the missing side with null.” |
| To count the rows of a left join, add the number of matched pairs (one row per matching right row) to the number of left rows that have no … | procedure | tagged | Table Join: “$$\lvert R \text{ LEFT JOIN } S \rvert = I + u_R$$” |

</details>

<details><summary><code>discda-an-017</code> · answerable</summary>

Tagged pages: Database Index, Table Join

| Item | Kind | Status | Where |
|---|---|---|---|
| An index pays off on columns used in join conditions or in filters that select a small fraction of rows, because it lets the database locat… | fact | tagged | Database Index: “Indexes pay off on columns used in `WHERE` conditions and in [[Table Join\\|join]] keys, and on colu…” |
| A column with few distinct values (low cardinality) is a poor index candidate because each value matches a large share of the table, so the… | fact | tagged | Database Index: “A column with only a few values, such as a claim status of open, closed or reopened, returns a larg…” |
| Every index consumes storage and must be updated on each insert, update or delete, so adding many unused indexes slows data loading and mai… | fact | tagged | Database Index: “Every index takes storage, and every insert, update or delete must also change each index on the ta…” |
| A secondary index is an index on a non-key column that allows repeated (non-unique) values and points to the rows holding each value. | definition | tagged | Database Index: “A secondary index is built on any other column used to find rows, such as the policy number in a cl…” |
| A table has only one primary key/primary index, and a primary index requires unique values, so a column with duplicates (such as a foreign … | fact | tagged | Database Index: “A table has one primary key and so one primary index, and in many systems the table's rows are stor…” |
| A foreign key in a many-to-one relationship (e.g., many claims per policy) holds repeated values across rows of the child table. | fact | linked | Relational Database: “A foreign key in the claim table holds the policy number of the policy each claim belongs to, which…” |

</details>

<details><summary><code>discda-an-018</code> · gap</summary>

Tagged pages: Missing Data, SQL

| Item | Kind | Status | Where |
|---|---|---|---|
| COALESCE(x, y) returns the first non-null argument, so it returns x when x is not null and the substitute value y when x is null. | definition | tagged | Missing Data: “`COALESCE(column, value)` returns the first of its arguments that is not null, which substitutes a …” |
| The SQL AVG aggregate ignores null values, dividing the sum of non-null values by the count of non-null values rather than the number of ro… | fact | tagged | Missing Data (collapsed): “**Null is not zero:** `AVG` ignores nulls, so it divides by the number of non-null values.” |
| COUNT(column) counts only the non-null values in the column, unlike COUNT(*), which counts all rows. | fact | tagged | Missing Data: “`COUNT(*)` counts every row, while `COUNT(column)` counts only the non-null values” |
| To include a default value for nulls in an aggregate, apply the null-replacement function to the column inside the aggregate so the substit… | procedure | missing |  |

</details>

<details><summary><code>discda-an-019</code> · answerable</summary>

Tagged pages: User-Defined Function, SQL, Missing Data

| Item | Kind | Status | Where |
|---|---|---|---|
| A SQL CASE expression with no ELSE clause returns NULL for any input that matches none of its WHEN conditions. | fact | tagged | User-Defined Function (collapsed): “**Unmatched values return null:** A `CASE` with no `ELSE` returns null for any value its branches m…” |
| Any comparison involving NULL (such as NULL >= 16 or NULL BETWEEN a AND b) evaluates to unknown rather than true, so a NULL value matches n… | fact | tagged | SQL: “A null is an unknown value, so comparing it with `=` or `<>` gives null rather than true or false, …” |
| GROUP BY places all rows whose grouping expression is NULL into a single group, so different inputs that produce NULL are counted together. | fact | tagged | SQL: “`GROUP BY` combines rows that share the same values of the grouping columns into one output row” |
| To count rows per group, apply the grouping function to each row, assign each row to its output group (including NULL), and count the rows … | procedure | tagged | SQL: “`COUNT(*)` counts rows” |
| Range bands defined with inclusive bounds (e.g., 25 to 64) include both endpoints, while values below the lowest band's lower bound fall ou… | fact | tagged | User-Defined Function (collapsed): “Because `BETWEEN` includes both ends, every whole age from 16 up falls in exactly one band.” |

</details>

<details><summary><code>discda-an-020</code> · answerable</summary>

Tagged pages: Web Scraping, External Data

| Item | Kind | Status | Where |
|---|---|---|---|
| An API (application programming interface) data feed delivers structured fields with documented definitions under stated terms of access or… | definition | tagged | Web Scraping: “An API returns structured fields, such as JSON, with documented definitions, and the provider grant…” |
| Web scraping is automated collection of whatever content a web page displays, without guaranteed field definitions or a stable format. | definition | tagged | Web Scraping: “Scraping takes whatever the page displays, so it breaks when the site's layout changes, and its fie…” |
| Scrapers are fragile: they can break when a page's layout changes, so scraped data are less reliable than data from a documented API. | fact | tagged | Web Scraping: “Scraping takes whatever the page displays, so it breaks when the site's layout changes, and its fie…” |
| Data being publicly viewable does not grant permission to collect or use it at scale; terms of use, copyright and privacy law can restrict … | fact | tagged | Web Scraping: “A site's terms of use may forbid automated collection, and its `robots.txt` file sets allow and dis…” |
| Values on a public listing page are entered by whoever wrote the page, are not verified by the site owner, and may be out of date, so their… | fact | tagged | Web Scraping: “Scraped values are self-reported by whoever wrote the page, can be out of date, and cover only the …” |
| When choosing an external data source for underwriting or pricing, prefer the source with documented definitions and permitted terms of use… | procedure | tagged | Web Scraping: “Collecting the data legally does not settle whether using it for underwriting or pricing is permitt…” |

</details>

<details><summary><code>discda-an-021</code> · answerable</summary>

Tagged pages: Data Mart, Data Documentation

| Item | Kind | Status | Where |
|---|---|---|---|
| A dependent data mart is loaded from the enterprise data warehouse and so inherits the warehouse's single set of definitions and extraction… | definition | tagged | Data Mart: “A dependent data mart is loaded from the enterprise warehouse. It inherits the warehouse's cleaned …” |
| An independent data mart is built directly from operational (source) systems rather than from the enterprise data warehouse, applying its o… | definition | tagged | Data Mart: “An independent data mart is built directly from operational source systems, with no warehouse in be…” |
| Independent data marts can report different figures for the same quantity because of differing definitions (e.g., written versus earned pre… | fact | tagged | Data Mart: “each one applies its own extraction and definitions, and two independent marts can report different…” |
| A star schema arranges data into a central fact table surrounded by dimension tables; it is a modeling layout and does not change the total… | definition | tagged | Data Mart: “A central fact table holds the measures, such as paid losses, case reserves and claim counts, at a …” |
| Grain is the level of detail represented by one row of a fact table; a finer grain provides more detail but aggregating it gives the same t… | definition | tagged | Data Mart: “The grain is what one row of the fact table represents, such as one claim per valuation month, or o…” |

</details>

<details><summary><code>discda-an-022</code> · answerable</summary>

Tagged pages: Data Validation

| Item | Kind | Status | Where |
|---|---|---|---|
| A consistency check validates that the values of different fields within the same record are logically compatible with one another (e.g., a… | definition | tagged | Data Validation: “**Consistency checks:** Fields within a record must agree with one another. A claim cannot be repor…” |
| A range check tests whether the value of a single field falls within plausible or allowed limits. | definition | tagged | Data Validation: “**Range checks:** Values must lie in a plausible range, such as an exposure between 0 and the polic…” |
| A completeness check tests whether required fields or records are present and not missing or blank. | definition | tagged | Data Validation: “**Completeness checks:** These count missing values field by field and compare record counts with t…” |
| Reconciliation compares control totals of the data (e.g., paid losses or premium) with an independent outside source such as financial stat… | definition | tagged | Data Validation: “The modelling data's premium, exposure, paid losses and claim counts are summed and compared with t…” |
| A claim cannot be reported before its accident occurs, so a report date earlier than the accident date is a logical impossibility even if e… | fact | tagged | Data Validation (collapsed): “Record 1 fails a consistency check, because the claim was reported before the accident happened.” |

</details>

<details><summary><code>discda-an-023</code> · answerable</summary>

Tagged pages: Structured Data, Unstructured Data

| Item | Kind | Status | Where |
|---|---|---|---|
| Structured data follow a fixed schema in which every record has the same named fields, each holding a single type of value, so the data can… | definition | tagged | Structured Data: “**Structured Data** are data organized under a fixed schema: records arranged as rows, each with th…” |
| Semi-structured data (such as JSON or XML) carry tags or labels on their fields but do not fit a single fixed table schema, so records can … | definition | tagged | Structured Data: “Semi-structured data, such as JSON or XML telematics records, carry labels on their pieces but no f…” |
| Unstructured data, such as audio recordings, images, scanned documents and free text, have no predefined fields or data model and must be p… | definition | tagged | Unstructured Data: “**Unstructured data** is information with no predefined data model — free text, images, audio, vide…” |
| Whether data are structured depends on having a consistent schema, not on where they are stored, so a spreadsheet with consistent typed col… | fact | tagged | Structured Data (collapsed): “A spreadsheet with consistent columns is structured even though it is not in a database, and a data…” |

</details>

<details><summary><code>discda-an-024</code> · answerable</summary>

Tagged pages: Unstructured Data, Structured Data

| Item | Kind | Status | Where |
|---|---|---|---|
| Unstructured data, such as free text, has no predefined data model or typed fields, so it cannot be used directly as model variables. | definition | tagged | Unstructured Data: “**Unstructured data** is information with no predefined data model — free text, images, audio, vide…” |
| Semi-structured data, such as JSON or XML, carries labelled fields or tags that give it partial structure and can be parsed using those lab… | definition | tagged | Unstructured Data (collapsed): “**Semi-structured is not unstructured.** JSON and XML carry labelled fields that can be parsed mech…” |
| Unstructured data must be converted into structured features (feature extraction) before it can be used as predictors in a model. | fact | tagged | Structured Data: “Both become structured once features are extracted or the records are flattened into rows, and that…” |
| To turn text into model features, tokenize each document and count the terms, producing a document-term matrix with one row per document an… | procedure | tagged | Unstructured Data: “Text is tokenized, lower-cased, stripped of stop words and often stemmed before counting; images be…” |
| Storing data in a database column or moving it to a different repository such as a data mart does not change its form; storage location doe… | fact | tagged | Unstructured Data (collapsed): “**Storage is not structure.** A text field sitting in a database column is still unstructured: the …” |

</details>

<details><summary><code>discda-an-025</code> · answerable</summary>

Tagged pages: Data Issues, Outlier, Data Validation

| Item | Kind | Status | Where |
|---|---|---|---|
| An outlier may be a data entry error, a genuine extreme value, or a real discovery, so it should be investigated before it is changed or re… | fact | tagged | Data Issues: “an outlier may be a data entry error, a genuine extreme or a real discovery. Repeat the analysis wi…” |
| A value that is implausible against known constraints, such as a paid loss far exceeding the coverage limit with no other explanation, is a… | fact | tagged | Data Issues: “A value that cannot be true is better replaced by a missing value than deleted with its whole row” |
| To treat a suspected erroneous value, check it against the source record and correct it; if the true value cannot be found, set it to missi… | procedure | tagged | Data Issues (collapsed): “Correcting the record is better than excluding the cell: exclusion loses a genuine observation” |
| Any change made to the data during cleaning, such as a correction, a missing-value replacement, or a removal, should be documented and disc… | procedure | tagged | Outlier: “Whatever is done has to be described: the PCPA project rubric awards credit for stating which anoma…” |
| Deleting a whole record because of one bad value discards the record's other valid information, and capping all values at a percentile alte… | fact | tagged | Data Issues (collapsed): “**Drop the value, not the row:** Replacing one impossible value with a missing value keeps the rest…” |

</details>

<details><summary><code>discda-an-026</code> · answerable</summary>

Tagged pages: Exploratory Data Analysis, Exploratory Data Visualization

| Item | Kind | Status | Where |
|---|---|---|---|
| Exploratory data analysis (EDA) is the initial investigation of a dataset that examines the variation within each variable, including its t… | definition | tagged | Exploratory Data Analysis: “**Exploratory Data Analysis (EDA)** is an approach to analyzing datasets by summarizing their main …” |
| As a first EDA step, plot the distribution of each variable (histograms for numeric fields, bar charts for categorical fields) and check wh… | procedure | tagged | Exploratory Data Visualization: “Look for the typical values (which are most common, which are rare, and whether that matches expect…” |
| Examining variable distributions during EDA doubles as a data quality check, revealing errors and anomalies before anything is built on the… | fact | tagged | Exploratory Data Analysis: “Even when the analysis's main questions are set in advance, EDA is needed to check whether the data…” |
| Model fitting comes after exploration has revealed the data's shape and problems; fitting a model first presumes what EDA is meant to check. | fact | tagged | Exploratory Data Analysis: “**Exploratory Data Analysis (EDA)** is an approach to analyzing datasets by summarizing their main …” |
| Presentation graphics for management communicate findings already established and are not an exploratory step. | fact | linked | Presentation Visualization: “A **presentation visualization** is a graphic built to tell a particular audience one finding that …” |
| Applying a fixed outlier-removal rule before inspecting the data is inappropriate, because genuine extreme values such as large claims may … | fact | linked | Data Validation: “A value outside the range is flagged for review rather than deleted automatically, because a large …” |

</details>

<details><summary><code>discda-an-027</code> · answerable</summary>

Tagged pages: Exploratory Data Analysis, Box Plot

| Item | Kind | Status | Where |
|---|---|---|---|
| Exploratory data analysis examines data through summaries and plots to find patterns and generate hypotheses and questions, rather than to … | definition | tagged | Exploratory Data Analysis: “**Exploratory Data Analysis (EDA)** is an approach to analyzing datasets by summarizing their main …” |
| A pattern seen in an exploratory plot is a hypothesis, not a conclusion or a rating relativity, and must be checked before being acted on. | fact | tagged | Exploratory Data Analysis (collapsed): “**Exploration is not confirmation:** A pattern found while exploring is a hypothesis. It still has …” |
| A difference in group statistics such as the median may arise by chance when the group has few observations, so the group's sample size (cl… | fact | tagged | Exploratory Data Analysis: “every group summary should carry its count, so that a striking average resting on a few records is …” |
| An apparent effect of one variable may be explained by a confounding third variable (such as coverage mix or limits), so analysts should ch… | fact | tagged | Exploratory Data Analysis: “When a plot shows a pattern, ask whether it could be chance, how to describe the relationship and h…” |
| A box plot displays the median, quartiles and outliers of a distribution, and side-by-side box plots compare the distribution of a variable… | definition | tagged | Box Plot: “Box plots are read **side by side**: one box per level of a [[Categorical Predictor]] shows whether…” |
| An entire group, such as a state with a higher median, is not an outlier, and removing it discards the very difference that needs to be und… | fact | linked | Exploratory Data Visualization (collapsed): “**Outliers are investigated, not deleted:** An extreme claim may be real. Repeat the analysis with …” |
| A pie chart of claim counts by group shows frequency composition, not the distribution of severity, so it cannot replace a plot of severity… | fact | linked | Types of Plots: “\\| Bar chart \\| One categorical \\| Count of observations at each level \\|” |

</details>

<details><summary><code>discda-an-028</code> · answerable</summary>

Tagged pages: Exploratory Data Visualization

| Item | Kind | Status | Where |
|---|---|---|---|
| An exploratory visualization is a plot the analyst makes for their own use to investigate the data and answer their own questions, looked a… | definition | tagged | Exploratory Data Visualization: “When making an exploratory plot, the analyst knows before looking which variables it will show, mak…” |
| A presentation visualization is a polished graphic designed once for an audience without the analyst's background, with titles, annotations… | definition | tagged | Exploratory Data Visualization: “A presentation graphic is made for an audience that does not share the analyst's background, so eff…” |
| Exploratory and presentation visualizations differ in audience and purpose: exploratory plots are made by the analyst for the analyst, whil… | fact | tagged | Exploratory Data Visualization: “Exploratory graphics are not for the audience:** An answer that adds titles, annotation and a narra…” |

</details>

<details><summary><code>discda-an-029</code> · answerable</summary>

Tagged pages: Exploratory Data Visualization, Types of Plots

| Item | Kind | Status | Where |
|---|---|---|---|
| The share (proportion) of a group with a characteristic is the count with that characteristic divided by the group's own total count. | definition | tagged | Types of Plots: “Counts show which groups are large; scaling every bar to the same height shows proportions, which c…” |
| A stacked bar chart of raw counts has bar segment heights that reflect group size as well as composition, so a taller segment does not impl… | fact | tagged | Exploratory Data Visualization (collapsed): “**Count is not share:** A taller bar in a count chart says the group is bigger, not that its mix is…” |
| A stacked bar chart scaled so every bar has the same height (100% stacked) displays within-group proportions, which allows comparing compos… | fact | tagged | Types of Plots: “Counts show which groups are large; scaling every bar to the same height shows proportions, which c…” |

</details>

<details><summary><code>discda-an-030</code> · gap</summary>

Tagged pages: Exploratory Data Visualization, Scatter Plot

| Item | Kind | Status | Where |
|---|---|---|---|
| Overplotting occurs when a scatter plot has so many points that they overlap and obscure one another, so the density and distribution of th… | definition | tagged | Exploratory Data Visualization: “A [[Scatter Plot\\|scatter plot]] of hundreds of thousands of points overplots into a solid mass.” |
| To remedy overplotting in a large dataset, bin the points in two dimensions (rectangular or hexagonal bins) and colour each bin by the coun… | procedure | tagged | Exploratory Data Visualization: “Transparency, binning in two dimensions (rectangular or hexagonal bins coloured by count), or binni…” |
| Making points transparent (alpha blending) is an alternative remedy for overplotting, suited to smaller datasets, because dense regions the… | fact | tagged | Exploratory Data Visualization: “Transparency, binning in two dimensions (rectangular or hexagonal bins coloured by count), or binni…” |
| Enlarging plotted points increases overlap and therefore worsens overplotting. | fact | missing |  |
| Summarizing two variables with a single overall mean discards the relationship between them, which a scatter plot is meant to display. | fact | missing |  |
| A dense cluster of points in a plot reflects where most of the data lie (typical values), not outliers, and removing it hides the bulk of t… | fact | missing |  |

</details>

<details><summary><code>discda-an-031</code> · untagged</summary>

Tagged pages: Types of Plots, Box Plot

| Item | Kind | Status | Where |
|---|---|---|---|
| Side-by-side box plots, one per level of a categorical variable, are used to compare the distribution of a numerical variable across catego… | fact | tagged | Types of Plots: “Box plots side by side are compact enough to compare many levels at once, at the cost of hiding the…” |
| A box plot displays a variable's median, first and third quartiles, and outliers. | definition | tagged | Types of Plots: “\\| Box plot \\| Numerical by categorical \\| Median, quartiles and outliers, one box per level \\|” |
| A bar chart of counts per category shows frequency of each category and conveys nothing about the distribution of a numerical variable such… | fact | tagged | Types of Plots: “\\| Bar chart \\| One categorical \\| Count of observations at each level \\|” |
| A single histogram of pooled data shows the overall distribution of a numerical variable and hides differences between groups. | fact | elsewhere | Univariate Plot: “A **Univariate Plot** displays the distribution of **one** variable at a time — its centre, spread,…” |
| A line chart is meant for data with a meaningful sequence such as time; plotting against an arbitrary index like claim number shows no mean… | fact | elsewhere | Chart Selection (collapsed): “A line implies a sequence, as in time. Connecting lines of business or territories with a line sugg…” |

</details>

<details><summary><code>discda-an-032</code> · untagged</summary>

Tagged pages: Types of Plots, Exploratory Data Visualization

| Item | Kind | Status | Where |
|---|---|---|---|
| Claim frequency is the number of claims divided by the exposure (e.g., car-years). | definition | elsewhere | Frequency: “$$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$” |
| A heat map displays a numeric value for each combination of two categorical variables as a tile whose color shade reflects the magnitude of… | definition | tagged | Types of Plots: “A grid of tiles for every combination of two categorical variables, each tile's colour showing a co…” |
| A heat map of raw claim counts mainly reflects where exposure is concentrated, so a rate such as frequency must be plotted to compare risk … | fact | tagged | Types of Plots (collapsed): “A heat map or bar chart of counts mostly shows where the exposure is. For frequency or severity, pl…” |

</details>

<details><summary><code>discda-an-033</code> · untagged</summary>

Tagged pages: Types of Plots, Exploratory Data Analysis

| Item | Kind | Status | Where |
|---|---|---|---|
| A run-sequence plot (time-ordered line chart) plots a variable against time or observation order so that changes over time are visible. | definition | tagged | Types of Plots: “Line chart:** Values plotted in time order and joined by lines, such as monthly claim counts.” |
| A run-sequence plot reveals shifts in level, changes in variation, and outliers at the time they occur, so it is the appropriate plot for d… | fact | tagged | Types of Plots: “\\| Line chart \\| Numerical over time \\| Values in time order: shifts in level or spread, and outlie…” |
| A histogram bins values and discards the time order of observations, so it cannot show when a shift occurred. | fact | tagged | Types of Plots: “A histogram divides the axis into equally spaced bins and draws a bar over each, so its picture dep…” |
| A box plot summarizes the distribution of values (median, quartiles, spread, outliers) and discards time order, so it cannot show changes a… | fact | elsewhere | Univariate Plot (collapsed): “the box draws nothing between them, so a box plot cannot show two humps.” |
| A scatter plot of one variable against another shows the relationship between the two variables, not how either variable changes over time. | fact | elsewhere | Scatter Plot: “A **Scatter Plot** is an [[Exploratory Data Analysis]] display of two variables at once: each obser…” |

</details>

<details><summary><code>discda-an-200</code> · answerable</summary>

Tagged pages: Presentation Visualization

| Item | Kind | Status | Where |
|---|---|---|---|
| The Big Idea (Knaflic) is the single complete sentence that states the whole point of a presentation, combining the audience's stake with w… | definition | tagged | Presentation Visualization: “Following Duarte, the Big Idea states the presenter's point of view, conveys what is at stake, and …” |
| When preparing an explanatory (presentation) visualization, first identify the audience and what they must know or decide, and state the ma… | procedure | tagged | Presentation Visualization: “Before drawing anything, Knaflic recommends being able to say the whole story in three minutes, and…” |
| Chart type selection and design/formatting (colors, fonts, styling) follow from the message and come after it; formatting is a late step an… | fact | tagged | Presentation Visualization: “**Choosing the chart before the message:** The chart type follows from the message.” |
| Exploratory analysis is done to find the finding; most exploratory plots are not shown to the audience, so explanatory visualizations shoul… | fact | tagged | Presentation Visualization: “**Showing the analysis instead of the finding:** A deck of every plot made during exploration is no…” |

</details>

<details><summary><code>discda-an-201</code> · answerable</summary>

Tagged pages: Presentation Visualization, Exploratory Data Visualization

| Item | Kind | Status | Where |
|---|---|---|---|
| An exploratory visualization is a graphic made quickly for the analyst's own use to discover what the data show, often viewed briefly and d… | definition | tagged | Exploratory Data Visualization: “**Exploratory Data Visualization** is the use of quick plots, made by an analyst for their own unde…” |
| A presentation (explanatory) visualization is built for an audience to communicate an already-established finding, typically with a title s… | definition | tagged | Presentation Visualization: “A **presentation visualization** is a graphic built to tell a particular audience one finding that …” |
| Producing many graphics (such as a panel of histograms) each scanned only briefly to look for something interesting is characteristic of ex… | fact | tagged | Presentation Visualization: “[[Exploratory Data Visualization\\|Exploratory graphics]] are made quickly, for the analyst, in larg…” |
| A graphic drawn to ask whether a pattern exists (a question rather than a stated conclusion) is exploratory; a graphic that states a conclu… | fact | tagged | Presentation Visualization: “**Focus:** Draw Territory 7 in one strong color and the other 11 lines in light gray.” |

</details>

<details><summary><code>discda-an-202</code> · answerable</summary>

Tagged pages: Chart Selection, Presentation Visualization

| Item | Kind | Status | Where |
|---|---|---|---|
| A message about ranking (ordering categories by size) is best shown with bars sorted in descending order so the largest values stand out. | fact | tagged | Chart Selection: “\\| **Ranking** \\| Territories by loss ratio \\| Bars sorted by value, descending to stress the large…” |
| Horizontal bars are preferred over vertical bars when category labels are long, because the labels fit without rotating them. | fact | tagged | Chart Selection: “Long category labels read better on horizontal bars than on rotated labels, and bars arranged by si…” |
| Bar charts must start at a zero baseline because bar length encodes the value. | fact | tagged | Chart Selection: “Bars start at zero, because their length encodes the value.” |
| A line chart connecting points implies an ordered sequence such as time, so it is inappropriate for unordered categories and can suggest a … | fact | tagged | Chart Selection (collapsed): “A line implies a sequence, as in time. Connecting lines of business or territories with a line sugg…” |
| A pie chart is only meaningful for parts of a whole, and its slices are hard to compare and rank; ratios such as loss ratios are not parts … | fact | tagged | Chart Selection: “Few's view is that bars on a percentage scale beat pies for comparing parts, since a slice is easy …” |
| A table suits looking up exact values but is poor at conveying a pattern or ranking at a glance, especially when it has many rows in arbitr… | fact | tagged | Chart Selection (collapsed): “A table of 36 monthly counts makes the reader find the trend. A table is right when the reader need…” |

</details>

<details><summary><code>discda-an-203</code> · answerable</summary>

Tagged pages: Chart Selection, Visualization Design Principles

| Item | Kind | Status | Where |
|---|---|---|---|
| Readers judge position along a common scale and length accurately, but judge area and angle poorly, so quantitative comparisons are best en… | fact | tagged | Chart Selection: “Of the visual attributes a graph can use, only 2-D position and line length let a reader judge quan…” |
| A pie chart slice is easy to read only near simple fractions such as 25% or 50%, so pies cannot show small differences between similar-size… | fact | tagged | Chart Selection: “Few's view is that bars on a percentage scale beat pies for comparing parts, since a slice is easy …” |
| To compare category sizes, use a bar chart with bars on a common baseline, sorted by value and labeled with the values, so small difference… | procedure | tagged | Chart Selection: “Bars sorted by value, descending to stress the largest” |
| 3-D effects distort the apparent size of chart elements (front slices look larger), reducing accuracy of comparison. | fact | tagged | Chart Selection: “3-D effects on pies, bars and lines add no data and distort what is shown, because the projection m…” |
| Line charts connect points and imply a trend or ordering, so they are appropriate for ordered data such as time, not for unordered categori… | fact | tagged | Chart Selection (collapsed): “A line implies a sequence, as in time. Connecting lines of business or territories with a line sugg…” |
| Color (hue) distinguishes categories but does not encode quantity, so it cannot help readers compare magnitudes. | fact | tagged | Visualization Design Principles: “Only position and length encode quantities accurately; hue distinguishes categories.” |

</details>

<details><summary><code>discda-an-204</code> · answerable</summary>

Tagged pages: Chart Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| Tables are best when readers need to look up individual values or need exact, precise numbers. | fact | tagged | Chart Selection: “Tables work best when the reader will look up individual values or needs them precisely.” |
| Graphs are best when the message lies in the shape of the data, such as a trend, pattern, or relationship, rather than in exact values. | fact | tagged | Chart Selection: “Graphs work best when the message lives in the shape of the data, in patterns, trends and exception…” |
| A line graph is appropriate for showing change over time, with time on the horizontal axis, because the connecting line conveys sequence an… | fact | tagged | Chart Selection: “\\| **Time series** \\| Monthly claim counts \\| Lines, time on the horizontal axis; bars to stress si…” |
| A line graph is inappropriate for categorical items with no natural order (such as rating classes), since the connecting line implies a seq… | fact | tagged | Chart Selection (collapsed): “A line implies a sequence, as in time. Connecting lines of business or territories with a line sugg…” |

</details>

<details><summary><code>discda-an-205</code> · answerable</summary>

Tagged pages: Visualization Design Principles, Chart Selection

| Item | Kind | Status | Where |
|---|---|---|---|
| In a bar chart whose vertical axis does not start at zero, a bar's visible length equals its value minus the axis starting value, so the ap… | fact | tagged | Visualization Design Principles: “The bars' lengths are in the apparent ratio, while the values are in the ratio $v_2 / v_1$. The two…” |
| To find how many times as long one bar appears as another on a chart with a non-zero axis start, divide (value of the first bar minus axis … | procedure | tagged | Visualization Design Principles: “$$\text{Apparent ratio} = \frac{v_2 - b}{v_1 - b}$$” |
| Bar chart axes should start at zero so that bar lengths are proportional to the values they represent (principle of proportional ink). | fact | tagged | Visualization Design Principles: “The sizes of shaded areas must be proportional to the values they represent (Bergstrom and West's p…” |

</details>

<details><summary><code>discda-an-206</code> · answerable</summary>

Tagged pages: Visualization Design Principles, Presentation Visualization

| Item | Kind | Status | Where |
|---|---|---|---|
| Preattentive attributes such as a distinct color, position, or size are processed by the viewer almost instantly and can be used to draw at… | fact | tagged | Visualization Design Principles: “Some visual attributes are processed at once, without conscious effort: 2-D position, line length, …” |
| To emphasize a single series among many, show it in one strong accent color and render the other series in muted gray so they remain availa… | procedure | tagged | Visualization Design Principles (collapsed): “**Focus:** Draw Territory 3 in one strong color and the other seven in light gray. A single preatte…” |
| Qualitative color scales work well only for a small number of categories (about three to five); beyond that, readers cannot reliably match … | fact | tagged | Visualization Design Principles: “Wilke's rule of thumb is that qualitative color scales work best for three to five categories and b…” |
| Label lines or series directly on the chart instead of using a separate legend, so readers do not have to look back and forth and match col… | procedure | tagged | Visualization Design Principles: “Label lines directly instead of using a legend, and if a legend is needed, order it as the data app…” |
| Short-term (working) memory holds only a handful of chunks of information, so designs requiring readers to remember many color-to-category … | fact | tagged | Visualization Design Principles: “Short-term memory holds roughly three to seven chunks at a time, so a graph whose lines each need a…” |
| About 10% of men have red-green color vision deficiency, so charts should avoid relying on a red-green color contrast to distinguish inform… | fact | tagged | Visualization Design Principles: “About 10% of men and 1% of women have abnormal color vision, mostly an inability to tell red from g…” |
| Non-data ink such as background grids, redundant markers, and extra charts adds clutter and should be minimized, as it does not help the re… | fact | tagged | Visualization Design Principles: “Frames, dense or dark gridlines, borders around the legend and background shading carry no data and…” |

</details>

<details><summary><code>discda-an-207</code> · answerable</summary>

Tagged pages: Similarity and Distance Measures, K-Nearest Neighbors

| Item | Kind | Status | Where |
|---|---|---|---|
| The Euclidean distance between two records is the square root of the sum of squared differences across all predictor variables. | formula | tagged | Similarity and Distance Measures: “$$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$” |
| The nearest neighbor of a new observation is the training record with the smallest distance to it, and k-nearest-neighbor methods base pred… | definition | tagged | K-Nearest Neighbors: “predicts the output for a new observation by looking at the $K$ closest training observations (by s…” |
| On raw values, a variable measured on a larger scale (such as dollars versus years) dominates the Euclidean distance, so variables with sma… | fact | tagged | Similarity and Distance Measures: “A raw distance is dominated by whichever feature has the largest spread in its units.” |
| To standardize a variable before computing distances, divide each difference (or subtract the mean and divide) by the variable's standard d… | procedure | tagged | Similarity and Distance Measures: “$$z_{ij} = \frac{x_{ij} - \bar{x}_j}{s_j}$$” |
| Standardizing predictors gives them comparable weight in distance calculations, which can change which record is the nearest neighbor relat… | fact | tagged | Similarity and Distance Measures: “Standardizing each feature to mean zero and standard deviation one puts them on a comparable scale …” |

</details>

<details><summary><code>discda-an-208</code> · answerable</summary>

Tagged pages: Similarity and Distance Measures

| Item | Kind | Status | Where |
|---|---|---|---|
| The Euclidean distance between two records is the square root of the sum of the squared differences across their features. | formula | tagged | Similarity and Distance Measures: “$$d_{\text{Euc}}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{j=1}^{p} (u_j - v_j)^2}$$” |
| The Manhattan distance between two records is the sum of the absolute values of their differences across features. | formula | tagged | Similarity and Distance Measures: “$$d_{\text{Man}}(\mathbf{u}, \mathbf{v}) = \sum_{j=1}^{p} \lvert u_j - v_j \rvert$$” |

</details>

<details><summary><code>discda-an-209</code> · answerable</summary>

Tagged pages: Similarity and Distance Measures, Clustering

| Item | Kind | Status | Where |
|---|---|---|---|
| Gower's dissimilarity between two observations is the (weighted) average over all features of the per-feature dissimilarity contributions; … | formula | tagged | Similarity and Distance Measures: “Gower's coefficient averages a per-feature contribution in $[0, 1]$” |
| For a nominal or binary feature in Gower's coefficient, the contribution is 0 if the two observations have the same value and 1 if they dif… | procedure | tagged | Similarity and Distance Measures: “0 or 1 for a nominal or binary feature (match or not)” |
| For a numeric feature in Gower's coefficient, the contribution is the absolute difference between the two values divided by the feature's r… | procedure | tagged | Similarity and Distance Measures: “$\lvert u_j - v_j \rvert / R_j$ for a numeric feature with range $R_j$” |

</details>

<details><summary><code>discda-an-210</code> · answerable</summary>

Tagged pages: Model Training and Evaluation, Confusion Matrix

| Item | Kind | Status | Where |
|---|---|---|---|
| In a binary classifier's confusion matrix, true positives are actual positives flagged positive, false positives are actual negatives flagg… | definition | tagged | Confusion Matrix (collapsed): “$TP = 45$, $FP = 90 - 45 = 45$, $FN = 60 - 45 = 15$, $TN = 1000 - 45 - 45 - 15 = 895$.” |
| Precision equals TP divided by (TP + FP), i.e., the share of flagged (predicted positive) cases that are actually positive. | formula | tagged | Confusion Matrix: “\\| Precision (PPV) \\| $\dfrac{TP}{TP + FP}$ \\| of the flagged, how many were right \\|” |
| Recall (sensitivity) equals TP divided by (TP + FN), i.e., the share of all actual positives that the model correctly flags. | formula | tagged | Confusion Matrix: “\\| **Sensitivity** (recall, TPR) \\| $\dfrac{TP}{TP + FN}$ \\| of the actual positives, how many were…” |
| Derive missing confusion-matrix cells from totals: FP equals flagged count minus TP, and FN equals actual positive count minus TP. | procedure | tagged | Confusion Matrix (collapsed): “$TP = 45$, $FP = 90 - 45 = 45$, $FN = 60 - 45 = 15$, $TN = 1000 - 45 - 45 - 15 = 895$.” |

</details>

<details><summary><code>discda-an-211</code> · answerable</summary>

Tagged pages: Model Training and Evaluation, Overfitting, Holdout Sample

| Item | Kind | Status | Where |
|---|---|---|---|
| A validation set is a held-out portion of data not used to fit the models, used to estimate out-of-sample error and compare candidate model… | definition | tagged | Holdout Sample: “A **three-way** split keeps a validation set for choosing between candidate models and a test set t…” |
| Training error decreases (or does not increase) as model complexity increases, so it cannot be used to choose among models of differing com… | fact | tagged | Overfitting: “Training MSE falls every time flexibility is added, because a model with as many free parameters as…” |
| Validation error is typically U-shaped in model complexity: it falls while the model underfits, then rises once the model overfits by fitti… | fact | tagged | Holdout Sample: “Training error always falls as terms are added; holdout error falls, then **rises** once the model …” |
| Select the model with the lowest validation error, then evaluate the selected model once on the untouched test set to confirm its performan… | procedure | tagged | Model Training and Evaluation (collapsed): “Choose Model 3. Its validation MSE of 40.6 is somewhat optimistic, because the validation set was u…” |

</details>

<details><summary><code>discda-an-212</code> · answerable</summary>

Tagged pages: Model Training and Evaluation, Train-Test Split, Holdout Sample

| Item | Kind | Status | Where |
|---|---|---|---|
| A test (holdout) set is data withheld from model training and used to evaluate predictive performance, such as lift, on data the model has … | definition | tagged | Holdout Sample: “A **Holdout Sample** is data deliberately kept out of model building so the finished model can be t…” |
| When a single event (such as a hurricane) generates many correlated claims, a random train/test split places losses from the same event in … | fact | tagged | Model Training and Evaluation: “an **out-of-time** test set, such as a later accident year, is especially important when one event,…” |
| For perils driven by common events such as wind, build the test set out-of-time, training on earlier periods and testing on a later period … | procedure | tagged | Model Training and Evaluation: “an **out-of-time** test set, such as a later accident year, is especially important when one event,…” |
| Training-set fit is the most optimistic measure of model performance because the model was fit to that data, so it cannot replace a holdout… | fact | tagged | Model Training and Evaluation (collapsed): “**Training error as evidence:** A lower training error does not mean a better model; more complexit…” |
| Adding predictors until training error stops falling invites overfitting, since training error keeps declining with complexity regardless o… | fact | tagged | Model Training and Evaluation: “Training error keeps falling as a model gets more flexible, while error on new data falls and then …” |
| Changing the train/test split ratio, such as to 90/10, does not fix leakage from common events and leaves fewer observations in the test se… | fact | tagged | Model Training and Evaluation: “an **out-of-time** test set, such as a later accident year, is especially important when one event,…” |

</details>

<details><summary><code>discda-an-213</code> · answerable</summary>

Tagged pages: Claims Modeling Dataset

| Item | Kind | Status | Where |
|---|---|---|---|
| When building a supervised model's training data, define the target at the same fixed age for every record (e.g., a fixed number of months … | procedure | tagged | Claims Modeling Dataset: “The other way to keep the target consistent is to measure every claim's outcome at the same fixed a…” |
| Compute each claim's target date by adding the target age to its report date, and compare that date to the data valuation date to determine… | procedure | tagged | Claims Modeling Dataset (collapsed): “A claim is usable only if its 24-month date falls on or before the valuation date.” |
| Records that have not yet reached the target age by the valuation date have no observable target (immature, right-censored) and must be exc… | fact | tagged | Claims Modeling Dataset: “A claim too young to have reached that age by the valuation date, the date through which transactio…” |
| A record reaching the target age exactly on the valuation date has an observable target and is included in the training data. | fact | tagged | Claims Modeling Dataset (collapsed): “A claim is usable only if its 24-month date falls on or before the valuation date.” |
| Create a binary classification label by comparing the claim's incurred amount at the target age to the threshold, labeling it positive only… | procedure | tagged | Claims Modeling Dataset (collapsed): “Incurred at that age is \$95,000, so $y = 0$, even though it has since grown to \$130,000.” |

</details>

<details><summary><code>discda-an-214</code> · answerable</summary>

Tagged pages: Claims Modeling Dataset

| Item | Kind | Status | Where |
|---|---|---|---|
| Data leakage is the use of information in model training that would not be available at the time the model makes its prediction, which make… | definition | tagged | Claims Modeling Dataset: “Using information that would not be available when the model makes its prediction is **data leakage…” |
| To check a candidate feature for leakage, determine when its value becomes known relative to the prediction point and flag any feature that… | procedure | tagged | Claims Modeling Dataset (collapsed): “Check *when* each field becomes known, not just whether it is in the warehouse.” |
| Features that accumulate or are updated after the prediction point, such as cumulative amounts paid as of a later extract date, contain par… | fact | tagged | Claims Modeling Dataset (collapsed): “Paid to date and the closing date are part of the outcome the model is trying to predict, and neith…” |
| Information recorded at first notice of loss, such as reporting lag, cause-of-loss code, and policy limits, is available when the claim is … | fact | tagged | Claims Modeling Dataset (collapsed): “Each is known when the claim is first reported: the coded cause, the reporting lag, and the policy …” |

</details>

<details><summary><code>discda-an-215</code> · answerable</summary>

Tagged pages: Underwriting Modeling Dataset, Earned Exposure

| Item | Kind | Status | Where |
|---|---|---|---|
| Earned exposure for a period is the portion of a policy's term that falls within that period, measured in car-years (months of coverage in … | definition | tagged | Underwriting Modeling Dataset (collapsed): “Each row is the part of a policy term that falls in 2025:” |
| To build calendar-year rows from policy terms, truncate each policy term to the calendar year, so a policy that starts before or ends after… | procedure | tagged | Underwriting Modeling Dataset (collapsed): “P3's term runs July 2024 to June 2025, so 6 of its months are in 2025.” |
| Assign each claim to the calendar-year row by its accident date, counting only claims occurring in the year and excluding claims from prior… | procedure | tagged | Underwriting Modeling Dataset (collapsed): “P3's November 2024 claim belongs to the 2024 row, which is not in this table.” |
| A policy shorter than a year (e.g., six-month term) earns exposure only for its actual term length, not a full car-year. | fact | tagged | Underwriting Modeling Dataset: “$$e_i = \frac{\text{days of row } i\text{'s term inside the period}}{\text{days in the period}}$$” |
| Total exposure and total claim count are obtained by summing the row-level in-year earned exposures and in-year claims across all policies. | procedure | tagged | Underwriting Modeling Dataset (collapsed): “\text{Frequency} &= \frac{1 + 0 + 1}{1.00 + 0.25 + 0.50} \\” |

</details>

<details><summary><code>discda-an-216</code> · answerable</summary>

Tagged pages: Underwriting Modeling Dataset, Offset Variable, Generalized Linear Model

| Item | Kind | Status | Where |
|---|---|---|---|
| When the GLM target is claim frequency (claims per exposure), exposure enters the model as a weight (the exposure of each record), not as a… | fact | tagged | Underwriting Modeling Dataset: “A frequency or pure premium target is a ratio to exposure, and the exposure enters the model as a *…” |
| When the GLM target is claim count with a log link, include ln(exposure) as an offset (coefficient fixed at 1) so that the expected count i… | procedure | tagged | Underwriting Modeling Dataset: “**Count model:** the target is 64 or 22, with an offset of $\ln 800 = 6.685$ or $\ln 200 = 5.298$ a…” |
| For a Poisson GLM, the frequency-with-exposure-weights set-up and the count-with-ln(exposure)-offset set-up yield the same relativities. | fact | tagged | Underwriting Modeling Dataset: “For a Poisson GLM with a log link, the two set-ups give the same relativities and predictions.” |
| Using both an exposure offset and an exposure weight with a frequency target double-counts exposure in the mean and is incorrect. | fact | tagged | Underwriting Modeling Dataset (collapsed): “For a Poisson GLM with a log link, the two set-ups give the same relativities and predictions. Ente…” |
| Treating exposure as an ordinary predictor with an estimated coefficient lets the model drop the assumption that expected claims are propor… | fact | tagged | Offset Variable: “If exposure were instead entered as an ordinary covariate, its estimated coefficient need not equal…” |

</details>

<details><summary><code>discda-an-217</code> · gap</summary>

Tagged pages: Insurance Data Regulation

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the NAIC Insurance Data Security Model Law, a licensee must notify the commissioner of its state of domicile within 72 hours of deter… | fact | tagged | Insurance Data Regulation: “After a licensee determines that a cybersecurity event has occurred, it must notify the state's com…” |
| Under the model law, a licensee must also notify the commissioner of a non-domiciliary state if the nonpublic information of 250 or more of… | fact | tagged | Insurance Data Regulation: “or if the nonpublic information of $n \ge 250$ of the state's residents is involved and either $R$,…” |
| For a non-domiciliary state to require notice, in addition to the 250-resident threshold, either notice to a government body must be requir… | fact | tagged | Insurance Data Regulation: “or if the nonpublic information of $n \ge 250$ of the state's residents is involved and either $R$,…” |
| A cybersecurity event is an event resulting in unauthorized access to, disruption of, or misuse of an information system or the nonpublic i… | definition | missing |  |

</details>

<details><summary><code>discda-an-218</code> · answerable</summary>

Tagged pages: Insurance Data Regulation, Credit-Based Insurance Scoring

| Item | Kind | Status | Where |
|---|---|---|---|
| Under the FCRA, an adverse action includes increasing the charge for insurance based wholly or partly on information in a consumer report. | definition | tagged | Insurance Data Regulation: “An "adverse action" includes denying or canceling insurance, increasing any charge for it, or reduc…” |
| When an insurer takes adverse action based on a consumer report, it must notify the consumer and provide the reporting agency's name, addre… | procedure | tagged | Insurance Data Regulation: “An insurer that takes adverse action based even partly on a consumer report must notify the consume…” |
| The FCRA adverse action notice must also disclose the credit score used and inform the consumer of the right to a free copy of the report w… | fact | tagged | Insurance Data Regulation: “An insurer that takes adverse action based even partly on a consumer report must notify the consume…” |
| Underwriting insurance involving the consumer is a permissible purpose for obtaining a consumer report under the FCRA, so the consumer's wr… | fact | tagged | Insurance Data Regulation: “A consumer reporting agency may furnish a consumer report to a person who intends to use it in unde…” |
| The Insurance Data Security Model Law requires notifying the commissioner within 72 hours of a cybersecurity event; this is not a requireme… | fact | tagged | Insurance Data Regulation: “After a licensee determines that a cybersecurity event has occurred, it must notify the state's com…” |
| Re-rating a policy without credit information in cases of extraordinary life circumstances is an exception granted by some state credit sco… | fact | tagged | Credit-Based Insurance Scoring: “the consumer can ask to be re-scored at renewal; and exceptions apply for extraordinary life circum…” |

</details>

<details><summary><code>discda-an-219</code> · gap</summary>

Tagged pages: Insurance Data Regulation, Unfair Discrimination

| Item | Kind | Status | Where |
|---|---|---|---|
| Under Colorado SB21-169 (C.R.S. §10-3-1104.9), external consumer data and information sources include credit scores, social media habits, l… | definition | tagged | Insurance Data Regulation (collapsed): “**Colorado:** Credit scores are listed as external consumer data and information sources, so the in…” |
| Colorado SB21-169 applies to insurance practices such as underwriting, so a personal lines insurer such as a homeowners insurer using exter… | fact | tagged | Insurance Data Regulation (collapsed): “Credit scores are listed as external consumer data and information sources, so the insurer's use of…” |
| Title insurance is expressly excluded from Colorado SB21-169 (C.R.S. §10-3-1104.9). | fact | missing |  |
| Colorado SB21-169 excludes insurers issuing commercial policies, except businessowners and commercial general liability policies with annua… | fact | tagged | Insurance Data Regulation: “Commercial insurance is outside the law except businessowners and commercial general liability poli…” |
| Bonds executed by qualified surety companies are expressly excluded from Colorado SB21-169 (C.R.S. §10-3-1104.9). | fact | missing |  |

</details>

<details><summary><code>discda-an-220</code> · answerable</summary>

Tagged pages: Data Ethics Checklist, Data Ethics

| Item | Kind | Status | Where |
|---|---|---|---|
| The Deon data science ethics checklist is organized into sections covering Data Collection, Data Storage, Analysis, Modeling, and Deploymen… | definition | tagged | Data Ethics Checklist: “**A. Data collection:** informed consent (subjects opt in with a clear understanding of how their d…” |
| The Data Storage section of the Deon checklist covers data security, a way for individuals to have their data removed, and a data retention… | fact | tagged | Data Ethics Checklist: “**B. Data storage:** data security (encryption at rest and in transit, access controls, access logs…” |
| The Data Collection section of the Deon checklist addresses informed consent, collection bias, and limiting the personal data collected, no… | fact | tagged | Data Ethics Checklist: “**A. Data collection:** informed consent (subjects opt in with a clear understanding of how their d…” |
| The Analysis and Deployment sections of the Deon checklist address, respectively, blind spots, dataset bias, honest representation and audi… | fact | tagged | Data Ethics Checklist: “**C. Analysis:** missing perspectives (engaging affected communities and subject matter experts); d…” |

</details>

<details><summary><code>discda-an-221</code> · answerable</summary>

Tagged pages: Data Ethics Checklist, Proxy Discrimination, Confusion Matrix

| Item | Kind | Status | Where |
|---|---|---|---|
| A false positive rate is the proportion of truly negative cases (e.g., legitimate claims) that a model incorrectly flags as positive (e.g.,… | definition | tagged | Confusion Matrix: “\\| **Specificity** (TNR) \\| $\dfrac{TN}{TN + FP}$ \\| of the actual negatives, how many were left al…” |
| A model can have disparate error rates (such as higher false positive rates) across groups even when the underlying true outcome rates are … | fact | linked | Bias in Actuarial Practice: “A difference in predicted premium that is not matched by a difference in observed loss is the signa…” |
| The Deon ethics checklist item 'fairness across groups' (modeling item D.2) asks whether model results have been tested for fairness with r… | definition | tagged | Data Ethics Checklist: “fairness across groups, such as testing for different error rates” |
| Fairness testing across affected groups should be performed before deployment, whereas post-deployment monitoring (Deon item E.1) is what d… | fact | tagged | Data Ethics Checklist: “**E.1 Monitoring:** Track referral rates and fraud confirmed by group after launch.” |
| The Deon checklist items for informed consent, data security, and auditability concern, respectively, whether people agreed to data use, pr… | definition | tagged | Data Ethics Checklist: “informed consent (subjects opt in with a clear understanding of how their data will be used)” |

</details>

<details><summary><code>discda-an-222</code> · answerable</summary>

Tagged pages: Statistical Learning, Supervised Learning, Logistic Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| Supervised learning uses data in which each observation has a recorded response (label) that the model is trained to predict from the predi… | definition | tagged | Supervised Learning: “**Supervised learning** fits a model to predict a labelled response $Y$ from predictors $X$. Every …” |
| Unsupervised learning analyzes predictors without any response variable, seeking structure or patterns in the data. | definition | tagged | Statistical Learning: “**Unsupervised learning**: no labeled response; the goal is to find structure in $\mathbf{X}$” |
| A classification problem is one in which the response is qualitative (categorical), taking values in one of a set of classes. | definition | tagged | Statistical Learning: “one with a **qualitative** response taking one of $K$ classes (fraud or not, renew or lapse) is a *…” |
| A regression problem is one in which the response is quantitative (numerical), such as a claim amount. | definition | tagged | Statistical Learning: “A problem with a **quantitative** response (claim severity, pure premium) is a **regression** probl…” |
| Clustering is an unsupervised method that groups observations into subsets of similar observations without using a response variable. | definition | linked | Clustering: “**Clustering** is an unsupervised [[Statistical Learning]] technique that groups observations into …” |
| Dimension reduction (e.g., principal components analysis) is an unsupervised technique that summarizes the predictors in fewer variables an… | definition | linked | Principal Components Analysis: “**Principal Components Analysis (PCA)** is an unsupervised [[Statistical Learning]] technique that …” |

</details>

<details><summary><code>discda-an-223</code> · answerable</summary>

Tagged pages: Summary Statistics, Frequency

| Item | Kind | Status | Where |
|---|---|---|---|
| Claim frequency is the number of claims divided by the exposure (e.g., car-years). | definition | tagged | Frequency: “$$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$” |
| The combined frequency across groups is the ratio of total claims to total exposure (a ratio of sums), equivalent to an exposure-weighted a… | procedure | tagged | Summary Statistics: “Each is a ratio of sums, not an average of ratios” |
| Group frequencies must be weighted by exposure, not by claim counts or equally, when combining them into an overall frequency. | fact | tagged | Summary Statistics (collapsed): “The overall frequency is $585/10{,}000 = 0.0585$, not the average of the three rows ($0.0683$), bec…” |

</details>

<details><summary><code>discda-an-224</code> · answerable</summary>

Tagged pages: Classification Tree

| Item | Kind | Status | Where |
|---|---|---|---|
| To classify an observation with a decision tree, follow it down the splits, applying each split condition to the observation's predictor va… | procedure | tagged | Classification Tree: “each observation is predicted to belong to the **most commonly occurring class** among the training…” |
| A classification tree predicts the most common class among the training observations in the leaf the observation falls into. | fact | tagged | Classification Tree: “each observation is predicted to belong to the **most commonly occurring class** among the training…” |
| The estimated probability of a class for an observation in a classification tree leaf is the proportion of training observations in that le… | formula | tagged | Classification Tree: “The class proportions in the region, $\hat{p}_{mk}$, double as estimated probabilities.” |
| With two classes, a leaf predicts the class whose estimated probability exceeds one half. | fact | tagged | Classification Tree (collapsed): “The fraud shares are $0.35$, $0.10$ and $0.02$ — all below one half, so **every leaf predicts "legi…” |

</details>

<details><summary><code>discda-an-225</code> · gap</summary>

Tagged pages: Linear Regression

| Item | Kind | Status | Where |
|---|---|---|---|
| A fitted multiple linear regression model predicts the response as the intercept plus the sum of each coefficient times its predictor value… | formula | tagged | Linear Regression: “$$Y_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \varepsilon_i, \qquad \varepsilon_i \s…” |
| A regression coefficient is the change in the predicted response for a one-unit increase in that predictor, holding the other predictors fi… | fact | tagged | Linear Regression: “$\hat\beta_j$ is the change in $E[Y]$ per unit of $x_j$ **holding the other predictors fixed**” |
| To predict with a fitted model, express each predictor in the units used in the model's definition (e.g., convert dollars to thousands of d… | procedure | missing |  |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
