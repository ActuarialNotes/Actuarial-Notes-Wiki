---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7fcd0de3925d628174f0d040ee42bce1a49f908de04d2751b3bc5a65273d000b
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.3, printed p.37 (PDF p.43): paid claims cumulative/incremental, with or without expenses, net or gross of recoveries; claim counting per claimant/occurrence, reopened claims; verification of the data (four components, no formal audit); default values, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), Ch.3 Data Aggregation, printed pp.42-43 (PDF pp.54-55): calendar year paid = all payments in the year, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph 4, 2016), §4.1 negative incremental values (modified log link; column sums negative -> shift; model salvage/subrogation separately), §4.4 missing values, §4.5 outliers, §4.6 heteroscedasticity (stratified sampling, hetero-adjustment), §4.7 heteroecthesious data, §4.8 exposure adjustment, PDF pp.28-37, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.3.2 outliers (entry error, extreme, discovery; repeat with and without; disclose); zero-coded missing; §10.4 replace unusual values with NA rather than drop the row, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.3 'Data transformation', §3.2.4 distinct()/count() to find duplicates, sha256:7ecfc380d9ba22575657e2e0ea5b16d9a2c7a235f5cfd2a3ad860bf6bbf745de — https://r4ds.hadley.nz/data-transform.html"
    - "CAS Exam 5 Content Outline, Fall 2026, Domain A task 4 and the reading list (ASOPs 12, 13 and 43 only), PDF pp.2-6, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
    - "CAS Exam 7 Content Outline, Fall 2026, Shapland listed among the readings, PDF pp.4-5, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Issues.md
---

A **Data Issue** is a defect in the data behind a ratemaking or reserving analysis, such as an error, an omission, an inconsistent definition or a questionable value, that would bias the result if the data were used as delivered. An analysis based on incorrect or incomplete data can produce erroneous results. Actuarial standards do not require a formal audit, but they do require procedures to verify that the data is reliable and sufficient for its purpose. Friedland's data review has four components:

1. **Consistency with financial statement data.** The data reconciles with the financial statements, which may be subject to external audit.
2. **Consistency with prior data.** The data is consistent with the data of the prior analysis, and any difference is explained.
3. **Data reasonableness.** Questionable values, such as large negative paid claims or inconsistencies between data elements, are investigated before the data is used, especially if they are material. A questionable value is not always an incorrect one.
4. **Data definitions.** The definition of each data element is known, rather than assumed from its label, and so are the default values that stand in for missing information. A default used too often makes the element unreliable.

> [!example]- An extract of paid claims shows a large negative payment on one accident year. Should the actuary delete it before projecting? {Example}
> - A large negative paid claim is a questionable value, but not necessarily an incorrect one.
> - It may be a recovery, such as salvage or subrogation, or an entry correcting an earlier payment.
> - Deleting it unexamined could remove a genuine recovery and overstate the paid claims.
> - The actuary investigates what it represents before using the data, and corrects it only if it proves to be an error.

## Definitions of claims and claim counts

Even paid claims can mean different things to different people. The actuary needs to know whether they are cumulative or incremental, whether they include claim-related expenses and which ones, and whether they are net or gross of [[Recoveries|recoveries]]. For claim counts, the actuary needs to know whether an accident with payments under several coverages or to several claimants is one claim or several, and whether a reopened claim is counted as a new claim. A change in any of these definitions moves the data without any change in the underlying losses.

## Reconciling a triangle

A triangle is reconciled to the financial statements through its diagonals. A calendar year's payments are the latest diagonal of a cumulative paid triangle less the diagonal before it, accident year by accident year.

> [!example]- A cumulative paid triangle ($000) has 8,700, 8,900, 8,100 and 5,000 on its latest diagonal for accident years 2021 to 2024, and 8,300, 7,500 and 4,800 on the one before for 2021 to 2023. The accounting records show $\$10{,}700$k paid in calendar year 2024, of which $\$5{,}600$k is on accident year 2024. Does the triangle reconcile? {Example}
> - The triangle's calendar year 2024 payments are $(8{,}700 + 8{,}900 + 8{,}100 + 5{,}000) - (8{,}300 + 7{,}500 + 4{,}800) = \$10{,}100$k.
> - It is $\$600$k short of the accounting records.
> - Accident years 2021 to 2023 increased by $400$, $1{,}400$ and $3{,}300$, which sum to the $\$5{,}100$k the records show on them.
> - The gap is all in accident year 2024, shown at $\$5{,}000$k against $\$5{,}600$k. The extract is corrected before any factor is selected.

## Questionable values

An unusual value may be a data entry error, a genuine extreme value or a real discovery, so it is investigated before it is changed or removed. A value that is impossible against known constraints, such as a paid loss far above the policy limit with no other explanation, is a likely keying error. It is checked against the source record and corrected, and if the true value cannot be found, it is set to missing. Deleting the whole record would discard its other valid information, and can bias the result if the deleted records are not random. Capping all values at a percentile changes many genuine values without fixing the error. Other common issues:

- **Disguised missing values.** A default value written by a system for a blank field, or a spike of records at one round or extreme value such as 0, 99 or 999, is missing data coded as a value ([[Missing Data|missing data]]). A search for blanks does not find it.
- **Duplicates.** A record loaded twice, or a [[Table Join|join]] on a key that repeats, inflates counts and totals. Counting the occurrences of each key finds them.
- **Inconsistent coding.** The same quantity in different units, formats or bases across sources is put on one basis ([[Data Validation|data validation]]).

ASOP No. 23 permits the use of data with defects after appropriate adjustment, with the adjustments disclosed.

> [!example]- Paid 12-to-24-month factors for five accident years are 1.62, 1.66, 2.945, 1.67 and 1.63. The 2.945 accident year had $\$4{,}000$k paid at 12 months, and a $\$580$k payment in its second year was keyed as $\$5{,}800$k. What is the effect on the average factor? {Example}
> - The keyed value at 24 months is $4{,}000 \times 2.945 = \$11{,}780$k, and the error is $5{,}800 - 580 = \$5{,}220$k.
> - The corrected value is $11{,}780 - 5{,}220 = \$6{,}560$k, a factor of $6{,}560/4{,}000 = 1.640$.
> - The average factor falls from $9.525/5 = 1.905$ to $8.220/5 = 1.644$.
> - Correcting the record is better than excluding the cell, which would lose a genuine observation.

## Data issues in a bootstrap model

Shapland's [[ODP Bootstrap Model|over-dispersed Poisson bootstrap]] models the incremental values of a triangle, and some data issues need their own treatment:

- **Negative incremental values.** The log link fails on a negative value. A modified log link uses $\ln(q)$ for $q > 0$, $0$ for $q = 0$ and $-\ln(-q)$ for $q < 0$, which works only while the column's sum is positive. If a column sums to a negative value, every cell is shifted by the largest negative incremental to make it non-negative, the model is fitted, and the shift is taken back out of the fitted values.
- **Missing values.** A missing cell is estimated from the surrounding values, or excluded from the development factor and residual calculations so that it has no residual. An irregular triangle with missing early ages for the older years is handled the same way.
- **Outliers.** An unusually large incremental value distorts the fitted parameters and residuals. It is excluded from the development factor and residual calculations, while its cell is still resampled when simulated triangles are generated.
- **Exposure changes.** When exposures change materially across accident years, the losses are divided by the earned exposures, the model is fitted to pure premiums, and the results are multiplied back by each year's exposures.

> [!trap] Deleting the row for one bad value
> A record with one impossible field still holds valid information in its other fields. Setting the bad field to missing keeps it, and deleting the row loses it, along with any pattern in which records were deleted.
