---
id: "discda-an-022"
exam: "Exam DISC-DA"
topic: "Data Validation"
learning_objective: "Preparing Data for Analysis"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Data+Validation
answer: "A"
points: 1
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
