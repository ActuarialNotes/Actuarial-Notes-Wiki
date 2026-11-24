---
id: "atpa-an-006"
exam: "Exam ATPA"
topic: "Data Pipeline"
learning_objective: "Working with Data"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Data+Pipeline
answer: "C"
points: 1
---

A legacy policy file has no delimiters. Its record layout gives positions 1–6 for the policy number, 7–14 for the effective date as YYYYMMDD, 15–16 for the territory code, and 17–24 for the written premium in cents. One record is

`A12345202507010300123456`

The territory table elsewhere in the database stores its codes as two-character text. Which values should the extract load for this record's territory and written premium?

- A) Territory 3 (a number) and premium \$1,234.56
- B) Territory 03 (text) and premium \$123,456.00
- C) Territory 03 (text) and premium \$1,234.56
- D) Territory 3 (a number) and premium \$123,456.00

## Explanation

Cutting the 24 characters at the layout's positions:

| Field | Characters | Value |
| :--- | :--- | :--- |
| Policy number | 1–6 | A12345 |
| Effective date | 7–14 | 2025-07-01 |
| Territory | 15–16 | 03 |
| Written premium | 17–24 | 00123456 |

The territory stays as the text code `03`, so it matches the territory table and is not treated as a continuous number. The premium field holds 123,456 cents, which is \$1,234.56. The answer is **C**.

**Why not the others**

- **A** lets the software read the territory as the number 3, which drops the leading zero, fails to match the text codes in the territory table, and invites the model to treat territory as continuous.
- **B** keeps the territory right but forgets that the premium is stored in cents.
- **D** makes both mistakes.
