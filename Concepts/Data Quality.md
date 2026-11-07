---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:cab7b634f5750127b687c1a8a0fc1347073f6647207b2c0b025c283d8d7d5a18
  sources:
    - "ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §2.1 appropriate data, §2.2 audit, §2.5 review, §2.6 sufficient, §3.1-3.6, §3.8(c), §4.1, PDF pp.6-11, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.3 \"Verification of the Data\", printed p.37 (PDF p.43), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "CAS PCPA Exam & Project Content Outline v.8 (updated 9.9.2026), Domain A 'Dealing with Data' tasks A1-A4 and readings (ASOP 23, ASOP 56, Grolemund and Wickham), PDF pp.3-4, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, Domain A task 4 and the reading list (ASOPs 12, 13 and 43 only), PDF pp.2-6, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
    - "Board of Governors of the Federal Reserve / OCC, SR 11-7 Supervisory Guidance on Model Risk Management (2011), Section IV/V: 'rigorous assessment of data quality and relevance, and appropriate documentation'; Section VII: documentation 'sufficiently detailed so that parties unfamiliar with a model can understand how the model operates, its limitations, and its key assumptions', sha256:0046c0e4eb705830d43312da000271655000beb2a349e1cc3802815638c62cc0 — https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107a1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Quality.md
---

**Data Quality** is whether the data behind an actuarial analysis are appropriate, reasonable and sufficient for it. Appropriate data are suitable for the intended purpose and relevant to what is analyzed, and sufficient data have enough records and data elements for the analysis. [[ASOP 23 - Data Quality (ASB - 2016)|ASOP No. 23]] sets out what the actuary does about it:

1. **Select** the data (§3.2). Consider the data elements wanted and the alternatives, and whether the data are appropriate, current, internally consistent, consistent with readily available external information and sufficient, and what their known limitations are.
2. **Review** the data (§3.3). Make a reasonable effort to learn the definition of each data element, and look for questionable values and inconsistent relationships, such as a policy effective after it expires or a default value standing in for a blank field.
3. **Decide how to use** the data (§3.4): as they are, enhanced, with judgmental adjustments, or not at all if they are too inadequate.
4. **Rely on others** with disclosure (§3.5). The accuracy of data supplied by others is their responsibility, but the actuary still reviews the data and discloses the reliance.
5. **Disclose** the data's significant limitations and the significant steps taken to adjust or improve them.

A review is not an audit. ASOP No. 23 defines a review as an examination of the obvious characteristics of the data for reasonableness and consistency, which is less detailed than an audit of their accuracy and completeness. The standards require procedures to verify that the data are reliable and sufficient, and documentation of the review, but not a formal audit. Poor-quality data are a source of [[Model Risk|model risk]], because a model fits whatever it is given.

> [!example]- Reviewing a personal auto file, an actuary finds 312 policies with a driver age of 0 and 41 with a driver age above 110. What should the actuary do? {Example}
> - The actuary first learns the field's definition from the data owner, and why these values occur.
> - An age of 0 is often a default written when the field was left blank, so it is [[Missing Data|missing data]] in disguise, not a real age.
> - Ages above 110 are more likely keying errors, such as dates of birth entered in the wrong format.
> - The values are corrected from the source where practical. Otherwise they are treated as missing, so that a model does not fit a relativity to "age 0".
> - The questionable values found and the steps taken are disclosed in summary form.

## Reconciliation

Reconciliation compares control totals of the data, such as premium, exposures, paid losses or claim counts, with an independent source such as the financial statements. It tests the data in total, not record by record. A difference is not automatically an error, but it has to be explained, such as a missing month, an excluded line or a timing difference.

> [!example]- A homeowners modelling extract totals $\$41{,}600{,}000$ of written premium for the year, and the annual statement shows $\$43{,}200{,}000$ for the line. The data owner explains that $\$1{,}500{,}000$ of premium written through a program administrator is booked outside the policy system. What remains unexplained? {Example}
> - The extract is $41{,}600{,}000 - 43{,}200{,}000 = -\$1{,}600{,}000$ short of the statement.
> - The program business explains $\$1{,}500{,}000$ of it, leaving $\$100{,}000$, about 0.2% of premium, unexplained.
> - The real finding is that the program policies are missing from the model data. The actuary decides whether their absence biases the analysis, and discloses it.

## Using imperfect data

Data with defects can still be used. Questionable values are investigated before they are changed or excluded, especially if they are material, because a questionable value is not always an incorrect one. A value that cannot be corrected is set to missing rather than deleting its whole record, which would discard the record's other information. A missing or disguised-missing value is handled explicitly, for example with an "unknown" level or a missing-value flag. A spike of records at one round or extreme value, such as 0, 99 or 999, out of line with the rest of a smooth distribution, is a typical sign of a placeholder code. If the data are so inadequate that no adjustment works, the actuary obtains other data, performs only the parts of the assignment the data support, or declines it.

> [!trap] Requiring an audit of the data
> ASOP No. 23 asks for a review, not an audit. An answer that has the actuary audit the source data overstates the standard. What it does require is that the review be documented and the data's limitations disclosed.
