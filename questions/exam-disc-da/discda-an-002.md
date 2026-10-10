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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bac4c0e14cf7e5bdf7614890310e07a4a098feb4b9e9c692cb7e378b6b5b2766
  sources: []
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
