---
id: "discda-an-025"
exam: "Exam DISC-DA"
topic: "Data Issues"
learning_objective: "4. Working With Different Types of Data"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Data+Issues
  - Concepts/Outlier
  - Concepts/Data+Validation
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:72f8b3a642bec4265d6e4809eb023a667e6845ba05c43874a85eb265b2ee3cd5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-025.md
---

In a homeowners severity data set of 60,000 claims, one claim shows a paid loss of \$2,400,000 on a dwelling with a \$240,000 coverage limit, and nothing else on the policy could explain the amount. The analyst suspects a keying error. What should be done?

- A) Delete the claim's row and proceed, since it is an obvious outlier
- B) Check the source, correct the value or set it to missing, and record the change
- C) Keep the value as recorded, since extreme claims are genuine and informative
- D) Cap every claim in the data set at its 99th percentile instead

## Explanation

An outlier can be a data entry error, a genuine extreme, or a discovery, so it is investigated before it is changed. A paid loss ten times the limit, with nothing to explain it, points to a keying error (\$240,000 entered as \$2,400,000). The analyst should check the source record and correct it, or, if the true value cannot be found, set it to missing rather than drop the whole record, and document the change. The answer is **B**.

**Why not the others**

- **A** — deleting without investigating loses the record's other information and hides a fixable error; a removal also has to be disclosed.
- **C** — the value is not credible against the limit. Keeping a likely error would inflate severity for that claim's segment.
- **D** — capping every claim changes thousands of genuine values to deal with one record, and still leaves the error in place.
