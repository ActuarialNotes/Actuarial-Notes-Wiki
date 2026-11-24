---
id: "atpa-an-008"
exam: "Exam ATPA"
topic: "Data Quality"
learning_objective: "Working with Data"
difficulty: easy
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Data+Quality
  - Concepts/Data+Validation
answer: "300000"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:37182eac18ecf3fc54b664c6a123b156bd182e9a0337d4d69419a4c536a2ddb6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-008.md
---

A commercial auto modelling extract totals \$27,400,000 of written premium for the year, and the annual statement shows \$28,900,000 for the line. The data owner explains that \$1,200,000 of premium written through a managing general agent is booked outside the policy system and is not in the extract.

Calculate the premium difference that remains unexplained after the reconciliation. Give your answer in dollars as a whole number, with no sign.

## Explanation

Reconciliation compares a control total of the data with an independent source and explains each part of the difference.

$$
28{,}900{,}000 - 27{,}400{,}000 = 1{,}500{,}000
$$

$$
1{,}500{,}000 - 1{,}200{,}000 = \mathbf{300{,}000}
$$

The unexplained \$300,000 is about 1.0% of the booked premium. It still has to be explained, for example by a missing month or a timing difference. The managing general agent's policies being absent from the model data is itself a finding: the actuary decides whether their absence biases the analysis and discloses it.

**Common wrong entries**

- **1500000** is the whole difference, before the explained item is taken off.
- **2700000** adds the managing general agent's premium to the difference instead of subtracting it.
