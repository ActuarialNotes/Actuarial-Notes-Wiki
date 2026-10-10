---
id: "discda-an-002"
exam: "Exam DISC-DA"
topic: "Data Quality"
learning_objective: "1. Planning an Insurer Data Modeling Project"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Data+Quality
  - Concepts/Missing+Data
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bac4c0e14cf7e5bdf7614890310e07a4a098feb4b9e9c692cb7e378b6b5b2766
  sources:
    - "ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §2.5 review vs audit, §3.3(a)-(b) definitions, questionable values, disclose steps taken to improve data, §3.4(c) judgmental adjustments, §3.8(c) no audit required, PDF pp.6-11, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "van Buuren, Flexible Imputation of Missing Data, 2nd ed. (online), §1.3.1 listwise deletion biased unless MCAR; §1.3.7 indicator method, sha256:cb82f987435cf0811a89c3a3f4b5b7a359edcc49cfb2d0c47a0f532d2218bdfe — https://stefvanbuuren.name/fimd/sec-simplesolutions.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-002.md
---

Reviewing a homeowners extract for a pricing model, an actuary finds that 1,200 of 48,000 policies show a year built of 1900. The data owner confirms that 1900 is the value the policy system writes when the field is left blank. Following ASOP No. 23, what should the actuary do?

- A) Keep 1900 as recorded, since a review accepts the values the source system supplies
- B) Delete the 1,200 policies, since records with questionable values cannot be used
- C) Arrange an audit of every policy's year built against inspection records first
- D) Treat the 1900 values as missing, handle them explicitly, and disclose the step

## Explanation

ASOP No. 23 asks the actuary, when reviewing data, to make a reasonable effort to learn each data element's definition and to identify questionable values. Here the definition is now known: 1900 is a default for a blank field, so those values are **missing data in disguise**, not old homes. The actuary should treat them as missing (for example, as an "unknown" level or with a missing-value flag), so the model does not fit a relativity to homes "built in 1900", and disclose the significant steps taken to improve the data. The answer is **D**.

**Why not the others**

- **A** — a review is meant to find questionable values, not to accept them. Keeping 1900 would make the model treat 1,200 homes of unknown age as the oldest in the book.
- **B** — ASOP No. 23 lets data with defects be used with adjustments. Deleting the policies discards their other fields and can bias the data if the blanks are not random.
- **C** — a review is less detailed than an audit, and the standard does not require the actuary to audit the data. Once the cause is known, an audit of all 48,000 policies is unnecessary.
