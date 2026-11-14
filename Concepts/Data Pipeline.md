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
  content_hash: sha256:579d125bc6839077d47f9359b5e315ab58ea9c5b836a1581ad52d00445fd08ed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Pipeline.md
---
A **Data Pipeline** is the sequence of steps that moves data from where they are stored to a finished data set. For an actuary the finished data set is usually a modelling data set, with one row per unit of observation holding the target, the predictors and the exposure, ready for a [[Generalized Linear Model]] or another [[Predictive Analytics|predictive model]].

A pipeline has three steps:

1. **Extract** the data from their sources.
2. **Transform** them into the shape and quality the analysis needs.
3. **Load** the result into its destination.

The three steps together are known as ETL. When raw data are loaded first and transformed later, as in a [[Data Warehouse|data lake]], the order becomes ELT.

## Extracting data from different file structures

Data arrive in different file structures. A CSV file holds one record per line, with fields separated by commas. A JSON file holds records as nested key–value pairs, which must be flattened into rows, so a policy with a nested list of two vehicles becomes two rows that repeat the policy's own fields. A fixed-width file places each field at set character positions given by a record layout. A [[Relational Database|relational database]] is queried with SQL.

[[Statistical Software|Software]] guesses each column's type when it reads a file, so a territory code `07` can become the number 7 and a date can be read as text. The types are checked against the record layout before anything is transformed.

> [!example]- What are the fields of this fixed-width policy record? {Example}
> A legacy policy file has no delimiters. Its record layout gives positions 1–8 for the policy number, 9–16 for the effective date as YYYYMMDD, 17–18 for the territory code, and 19–27 for the written premium in cents. The record is `P00012342024031507000123450`.
>
> > [!answer]-
> > - Cutting the 27 characters at the layout's positions gives the four fields.
> >
> > | Field | Characters | Value |
> > | :--- | :--- | :--- |
> > | Policy number | 1–8 | P0001234 |
> > | Effective date | 9–16 | 2024-03-15 |
> > | Territory | 17–18 | 07 |
> > | Written premium | 19–27 | 1,234.50 |
> >
> > - The territory is kept as the text code `07`. As the number 7 it would be treated as a continuous variable and might fail to match other tables.
> > - The premium field holds 123,450 cents, so it is divided by 100 to give $\$1{,}234.50$.
> > - A layout misread by one position would shift every field after the error.

## Transforming data into a modelling data set

The transformations subset the records and fields needed, aggregate and summarize to the unit of observation (claims to policies, for example), join sources on common keys, recode values and handle [[Missing Data|missing data]] by deletion, imputation or a missing-value flag. They also validate the data for internal consistency, looking for records that cannot be right, such as a claim dated before its policy's effective date or a negative exposure. The finished data set should be [[Tidy Data|tidy]].

The finished data set has one row per unit the model predicts for, such as a policy-year or a vehicle-year. Claim-level rows fed to a frequency model would count each claim's row as a separate exposure. When rows are summarized to a coarser unit, the exposure is summed rather than taken from the first row.

New records to be scored pass through exactly the transformations the training data did, including the same imputation values and recoding. Otherwise the model is applied to data that differ from the data it was fitted on.

## Bias introduced in preparing data

Each step can bias a model without anyone intending it. Keeping only the policies in force on the extract date drops the ones that lapsed or were cancelled. Dropping records with missing values removes whichever group tends to leave a field blank. A predictor computed with information from after the prediction date leaks the answer into the model.

> [!example]- What bias does this extract introduce, and how should the extract be defined? {Example}
> To build a frequency model on 2021–2025 experience, an analyst extracts the policies in force on 31 December 2025 and attaches each one's claims since 2021.
>
> > [!answer]-
> > - The extract keeps only policies that survived to the end of 2025.
> > - Policies the insurer cancelled or declined to renew after poor claims experience, and customers who left after a claim, are missing along with their exposure and claims.
> > - The data therefore under-represent the riskiest policies, and the model understates frequency for the kinds of risks that tend to leave.
> > - The extract should select every policy with any exposure in the experience period, using its effective and expiration dates, whether or not it is still in force.

> [!trap] Joining on a key that is not unique
> A join on a key that is not unique duplicates rows and inflates exposure, and an inner join drops the records with no match. Count the records after every step and reconcile them with the source.
