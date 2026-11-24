---
id: "atpa-an-047"
exam: "Exam ATPA"
topic: "Shapley Value"
learning_objective: "Model Explainability and Communication"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Shapley+Value
  - Concepts/Explainability
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ea82c14ef7a4f6a61a4d280b4e2ed8587c33c1d23e0e600e4fcfe48e266a1daf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-047.md
---

A homeowners GBM predicts an annual loss cost of 950 for one applicant, against an average prediction of 600 over the portfolio. The Shapley values for this applicant are $+280$ for the age of the roof, $+120$ for the fire protection class and $-50$ for a claim-free record over the past five years.

Which statement correctly describes what these Shapley values say about this applicant?

- A) The prediction is 350 above average; roof age accounts for 280 of that, and the claim-free record takes off 50
- B) Replacing the roof would lower this applicant's predicted loss cost by 280, other features unchanged
- C) Roof age is the variable the model relies on most across the whole portfolio, followed by protection class
- D) The values are incomplete, because they add up to 350 rather than to the applicant's prediction of 950
- E) Being claim-free causes this applicant to have 50 less in losses each year than an average applicant has

## Explanation

Shapley values split the difference between this record's prediction and the average prediction into one contribution per feature:

$$\hat{f}(\mathbf{x}) = \phi_0 + \sum_j \phi_j = 600 + 280 + 120 - 50 = 950$$

So the prediction is 350 above the average of 600. Roof age moves it up by 280, protection class by 120, and the claim-free record moves it down by 50. The answer is **A**.

**Why not the others**

- **B** reads a Shapley value as the effect of changing the feature. Each value measures how far the feature moved this prediction away from the **average** prediction, not from a new roof, and where features interact the Shapley values share the interaction between them, so changing one feature need not move the prediction by its value.
- **C** turns one record's local explanation into a global ranking. A global importance from Shapley values averages $|\phi_j|$ over every record.
- **D** forgets $\phi_0$. By efficiency the values add up to the prediction **less** the average prediction, 950 - 600 = 350, so nothing is missing.
- **E** reads a cause into the value. It describes what the model does with the claim-free record for this applicant, not that the record causes lower losses.
