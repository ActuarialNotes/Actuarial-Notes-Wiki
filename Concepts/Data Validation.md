---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:1571aa98961a9c24a565b555b0d6dbf4a9c42b25d1521db6d15e42909d50c99a
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.3 \"Verification of the Data\", printed p.37 (PDF p.43): consistency with financial statement data, with prior data, reasonableness (large negative paid claims; questionable values investigated, not presumed wrong), definitions; no formal audit, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §2.5 review not as detailed as an audit; §3.3(b) questionable values and inconsistent relationships; §3.8(c), PDF pp.6-11, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "NAIC, Statistical Handbook of Data Available to Insurance Regulators (2012), as hosted by the Alaska Division of Insurance, §2.3.1 control totals, §2.3.2 reconciliation to Annual Statement state pages with explained differences, §2.3.3 validity checks for invalid or incomplete codes, PDF pp.22-23, sha256:b2929917f42e54e41b4904be523f776f28c21c482933613eca3432982b7561ca — https://www.commerce.Alaska.gov/web/Portals/11/Pub/INS_StatisticalHandbookDataInsurance%20Regulators.pdf"
    - "PostgreSQL 17 Documentation, §5.5 check, not-null, unique, primary key and foreign key constraints (referential integrity), sha256:f3797f1e000c84ee57bcb411cbffa458be90b2adb69889d243abfa090b0b8224 — https://www.postgresql.org/docs/17/ddl-constraints.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.3 'Data transformation', §3.2.4 distinct() / count() to find duplicate rows, sha256:7ecfc380d9ba22575657e2e0ea5b16d9a2c7a235f5cfd2a3ad860bf6bbf745de — https://r4ds.hadley.nz/data-transform.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Validation.md
---

**Data Validation** is the testing of a data set before it is used, to find values that are impossible, missing, duplicated or inconsistent and to confirm that the data agree with an independent source such as the insurer's financial records. It covers checks on single fields (type and range), on whole records (completeness and internal consistency), across tables (referential integrity and duplicates) and against outside totals (reconciliation), and every difference it finds is either corrected or explained.

> $$\Delta = \frac{T^{\text{data}} - T^{\text{booked}}}{T^{\text{booked}}}$$

> $$\text{Pass rate}_k = \frac{\#\{\text{records passing check } k\}}{\#\{\text{records}\}}$$

- **Symbols:** $T^{\text{data}}$ is a control total built from the data set, such as written premium or paid losses, and $T^{\text{booked}}$ is the same total from the financial records for the same period and scope. The difference $\Delta$ is first reduced by every item that can be explained, and only the unexplained remainder is judged against a tolerance. The pass rate counts how many records survive check $k$.
- **Type and format checks:** Each field must hold the type its documentation says, so a date field holds valid dates, a premium field holds numbers and a code field holds a value from its code list. Text in a numeric field or a date of `2024-02-30` fails.
- **Range checks:** Values must lie in a plausible range, such as an exposure between 0 and the policy's written exposure, a driver age between 16 and 100, or a deductible from the filed list. A value outside the range is flagged for review rather than deleted automatically, because a large loss can be both extreme and real.
- **Completeness checks:** These count missing values field by field and compare record counts with the expected volume, such as policies per month. A month with half the usual records points to a failed extract, and a field that is blank for one branch points to a system difference, both of which are [[Missing Data|missing data]] problems.
- **Consistency checks:** Fields within a record must agree with one another. A claim cannot be reported before its accident date, an accident date must fall within the policy term, and a policy cannot expire before it takes effect. Across tables, every claim must point to a policy that exists, which is the referential integrity check that a [[Relational Database|relational database]] key enforces.
- **Duplicate detection:** Records that repeat a key, such as the same claim number and transaction date, are either true duplicates from a double load or legitimate repeated transactions. A duplicate inflates both counts and amounts, so a join that multiplies rows is one of the first things to test.
- **Reconciliation to financial totals:** The modelling data's premium, exposure, paid losses and claim counts are summed and compared with the financial statements or the prior analysis. Friedland and [[ASOP 23 - Data Quality (ASB - 2016)|ASOP No. 23]] both treat this as a review, not an audit, and a difference is acceptable once it is explained, as described on [[Data Issues]] and [[Data Quality]].

> [!example]- Reconciling a Modelling Dataset to the Books {Example}
> A modeler builds an auto data set for accident year 2024. Its written premium totals \$48,630,000 against \$50,000,000 booked. The extract left out a program written through a managing general agent, with \$1,150,000 of premium, and \$180,000 of premium was booked after the extract date. Paid losses in the data set total \$31,840,000 gross of recoveries, against \$31,020,000 booked net of [[Salvage and Subrogation|salvage and subrogation]], and the recovery file shows \$870,000 received. Reconcile both totals.
>
> > [!answer]-
> > The premium shortfall is \$1,370,000 before any explanation, which is 2.74% of the booked figure. The two known items explain most of it.
> > $$
> > \begin{align*}
> > \text{Unexplained} &= 50{,}000{,}000 - 48{,}630{,}000 - 1{,}150{,}000 - 180{,}000 \\
> > &= 40{,}000 \\
> > \Delta &= \frac{40{,}000}{50{,}000{,}000} \\
> > &= 0.08\%
> > \end{align*}
> > $$
> > The paid losses look 2.6% too high, but they are measured on a different basis. Netting the recoveries puts them on the booked basis.
> > $$
> > \begin{align*}
> > T^{\text{data}} &= 31{,}840{,}000 - 870{,}000 \\
> > &= 30{,}970{,}000 \\
> > \Delta &= \frac{30{,}970{,}000 - 31{,}020{,}000}{31{,}020{,}000} \\
> > &= -0.16\%
> > \end{align*}
> > $$
> > Both remaining differences are small, so the data set reconciles within a typical tolerance. The modeler records the excluded program, the late bookings and the gross basis in the [[Data Documentation|documentation]], and decides whether the excluded program belongs in the model.

> [!example]- Which Check Catches Which Error {Example}
> A claim file has these records, with the policy table holding policies P101 to P150.
>
> 1. Claim C7, policy P120, accident date 2024-06-03, report date 2024-05-28.
> 2. Claim C8, policy P188, accident date 2024-07-14, paid \$4,200.
> 3. Claim C9, policy P131, paid \$-35,000 with no recovery code.
> 4. Claim C9, policy P131, the same transaction loaded a second time.
> 5. Claim C10, policy P142, state field blank.
>
> Name the check that flags each record.
>
> > [!answer]-
> > Record 1 fails a consistency check, because the claim was reported before the accident happened. Record 2 fails the referential integrity check, because policy P188 is not in the policy table, so the claim cannot be joined to its exposure. Record 3 fails a range check, since a large negative payment with no recovery code is questionable and is investigated rather than assumed wrong. Record 4 is caught by duplicate detection on the claim number and transaction, and it would double the claim's amount. Record 5 fails a completeness check. None of these would show in a premium reconciliation, which is why the record-level checks come first.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Questions describe a data set with a problem and ask which test would detect it, or give a list of records and ask which fails a range, consistency, completeness or referential check. Others ask what step comes next when a data set does not reconcile to the financial statements, which is to explain the difference before adjusting or using the data.
> - **Paired topics:** Testing data sits in the same topic as joining tables and handling null values, so a question may trace a duplicate or a missing value back to a faulty [[Table Join|join]].

> [!warning]- Exam traps
> - **Unusual is not wrong:** An outlier that passes every consistency check may be a genuine large loss. Deleting it without investigation biases the data, so the right answer is usually to investigate and document it.
> - **Reconcile on the same basis:** Data gross of recoveries will not match books net of them, and calendar-year books will not match accident-year data. Put both totals on the same basis and scope before calling a difference an error.
> - **A matching total does not prove the detail:** Premium can reconcile in total while records are coded to the wrong territory or class. Record-level checks are needed as well as control totals.
> - **Validation is not an audit:** The analyst tests the data for reasonableness and consistency but is not required to audit the source transactions. The limitations found are disclosed.
