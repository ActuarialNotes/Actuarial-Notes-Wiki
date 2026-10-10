---
id: "discda-an-022"
exam: "Exam DISC-DA"
topic: "Data Validation"
learning_objective: "3. Preparing Data for Analysis"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Data+Validation
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:cf4d39d1fa4b585840ac94c83c7714279688dfe0dfe6f7ea9cc7b240e58a5153
  sources:
    - "ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §3.3(b) relationships that are significantly inconsistent, PDF p.9, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.3 printed p.37 (PDF p.43): apparent inconsistencies between data elements, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-022.md
---

A claim file has a record whose report date, 2025-03-02, is earlier than its accident date, 2025-03-09. Both fields hold valid dates and no field on the record is blank. Which validation check flags the record?

- A) A consistency check between fields of the same record
- B) A range check on the report date field
- C) A completeness check on the record's fields
- D) A reconciliation of paid losses to the financial statements

## Explanation

Each date is valid on its own; what is impossible is the relationship between them, since a claim cannot be reported before its accident. Checking that fields within a record agree with one another is a **consistency** check. The answer is **A**.

**Why not the others**

- **B** — a range check tests one field against plausible limits, and March 2, 2025 is a plausible report date on its own.
- **C** — a completeness check looks for missing values, and none are missing.
- **D** — reconciliation compares control totals with an outside source; a single record's dates do not affect a premium or loss total.
