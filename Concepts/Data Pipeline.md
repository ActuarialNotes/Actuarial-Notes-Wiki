---
aliases:
  - Preparing Data
  - Data Set
  - File Structure
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f5b9abf7c25a7890f6c9edff11f360a2a2807eea4e9639fefcf8ba0f58a3f9ee
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Pipeline.md
---
A **Data Pipeline** is the sequence of steps that moves data from where they are stored to a finished data set: the data are extracted from their sources, transformed into the shape and quality the analysis needs, and loaded into their destination. For an actuary the usual end product is a modelling data set, with one row per unit of observation holding the target, the predictors and the exposure, ready for a [[Generalized Linear Model]] or another [[Predictive Analytics|predictive model]].

> $$\mathcal{D} = L\Big(T\big(E(s_1, \dots, s_k)\big)\Big)$$

- **Symbols:** $s_1, \dots, s_k$ are the sources, $E$ extracts them, $T$ applies the transformations, $L$ loads the result, and $\mathcal{D}$ is the finished data set. The three steps are known together as ETL, and when raw data are loaded first and transformed later, as in a [[Data Warehouse|data lake]], the order becomes ELT.
- **Extract:** Data arrive in different file structures. A CSV file holds one record per line with fields separated by commas, a JSON file holds records as nested key–value pairs that must be flattened into rows, a fixed-width file places each field at set character positions given by a record layout, and a [[Relational Database|relational database]] is queried with SQL.
- **Transform:** The transformations subset the records and fields needed, aggregate and summarize to the unit of observation (claims to policies, for example), join sources on common keys, recode values and handle [[Missing Data|missing data]] by deletion, imputation or a missing-value flag. They also validate the data for internal consistency, looking for records that cannot be right, such as a claim dated before its policy's effective date or a negative exposure, and the finished data set should be [[Tidy Data|tidy]].
- **Bias introduced in preparation:** Each step can bias a model without anyone intending it. Keeping only the policies in force on the extract date drops the ones that lapsed or were cancelled, dropping records with missing values removes whichever group tends to leave a field blank, and a predictor computed with information from after the prediction date leaks the answer into the model.

> [!example]- Extracting a Fixed-Width Record {Example}
> A legacy policy file has no delimiters. Its record layout gives positions 1–8 for the policy number, 9–16 for the effective date as YYYYMMDD, 17–18 for the territory code, and 19–27 for the written premium in cents. Extract the fields of the record `P00012342024031507000123450`.
>
> > [!answer]-
> > Cutting the 27 characters at the layout's positions gives the four fields.
> >
> > | Field | Characters | Value |
> > | :--- | :--- | :--- |
> > | Policy number | 1–8 | P0001234 |
> > | Effective date | 9–16 | 2024-03-15 |
> > | Territory | 17–18 | 07 |
> > | Written premium | 19–27 | 1,234.50 |
> >
> > The territory must be kept as the text code `07`, not converted to the number 7, or it will be treated as a continuous variable and may fail to match other tables. The premium field holds 123,450 cents, so it must be divided by 100, and a layout misread by one position shifts every field after the error.

> [!example]- Flattening a JSON Policy Record {Example}
> A policy system exports each policy as a JSON record with a nested list of vehicles. The modelling data set needs one row per vehicle. Flatten the record below and check it for internal consistency.
>
> ```json
> {"policy": "P17", "start": "2024-07-01",
>  "vehicles": [{"class": "A", "exposure": 1.0},
>               {"class": "C", "exposure": 0.5}]}
> ```
>
> > [!answer]-
> > Each element of the `vehicles` list becomes a row, and the policy-level fields are repeated on every row.
> >
> > | policy | start | class | exposure |
> > | :--- | :--- | :--- | ---: |
> > | P17 | 2024-07-01 | A | 1.0 |
> > | P17 | 2024-07-01 | C | 0.5 |
> >
> > Both exposures lie between 0 and 1 vehicle-year, as an annual term allows, and the 0.5 is consistent with a vehicle added halfway through the term. The policy has 1.5 vehicle-years in total; if a later step summarizes to the policy level, it must sum the exposure rather than take the first row's value.

> [!example]- A Bias Introduced in Preparing Data {Example}
> To build a frequency model on 2021–2025 experience, an analyst extracts the policies in force on 31 December 2025 and attaches each one's claims since 2021. What bias does this introduce, and how should the extract be defined?
>
> > [!answer]-
> > The extract keeps only policies that survived to the end of 2025. Policies the insurer cancelled or declined to renew after poor claims experience, and customers who left after a claim, are missing along with their exposure and claims. The data therefore under-represent the riskiest policies, and the model understates frequency for the kinds of risks that tend to leave. The extract should select every policy with any exposure in the experience period, using its effective and expiration dates, whether or not it is still in force.

> [!tip]- How it appears on the exam
> - **ATPA** places the data pipeline first in its Working with Data section (20–30%). Candidates are asked to explain extract, transform and load operations, to extract data from various file structures, to subset, aggregate and summarize it, and to create data sets that a predictive model can use.
> - **Bias in preparation:** The same section asks candidates to detect possible biases introduced when preparing data for a predictive model. A task can describe a preparation step, such as a filter, a join or the treatment of missing values, and ask what it does to the model.

> [!warning]- Exam traps
> - **Types on import:** [[Statistical Software|Software]] guesses each column's type when it reads a file, so a territory code `07` can become the number 7 and a date can be read as text. Check the types against the record layout before transforming anything.
> - **Row counts:** Count the records after every step and reconcile them with the source. A join on a key that is not unique duplicates rows and inflates exposure, and an inner join silently drops records with no match.
> - **Unit of observation:** The finished data set needs one row per unit the model predicts for, such as a policy-year or a vehicle-year. Feeding claim-level rows to a frequency model counts each claim's row as if it were a separate exposure.
> - **The same steps for scoring:** New records must pass through exactly the transformations the training data did, including the same imputation values and recoding. Otherwise the model is applied to data that differ from the data it was fitted on.
