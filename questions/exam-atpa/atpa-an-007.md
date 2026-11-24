---
id: "atpa-an-007"
exam: "Exam ATPA"
topic: "Data Pipeline"
learning_objective: "Working with Data"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Data+Pipeline
  - Concepts/Data+Preparation
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:07f1709a608293f71842dbfc6fc912723223fe89873ea63c6adad95906bf109e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-007.md
---

To build a homeowners frequency model on 2021–2025 experience, an analyst extracts every policy in force on 31 December 2025 and attaches each policy's claims since 1 January 2021. The insurer non-renews policies after repeated water claims. Which bias does this extract introduce?

- A) None, because every policy in the extract has its full claim history attached.
- B) It overstates frequency, because it keeps more high-risk policies than the book held.
- C) It leaks the target into the predictors, because claims after the term start are attached.
- D) It double counts the claims of policies that renewed during the period.
- E) It understates frequency, because policies that left after poor experience are missing.

## Explanation

Keeping only the policies that survived to the extract date drops every policy that lapsed, was cancelled or was non-renewed during 2021–2025, along with its exposure and its claims. Those are disproportionately the policies with poor experience, such as the non-renewed water-claim risks. The data under-represent the riskiest policies, and the model understates frequency for the kinds of risks that tend to leave. The extract should select every policy with any exposure in the experience period, using its effective and expiration dates. The answer is **E**.

**Why not the others**

- **A** checks the claims of the policies that were kept, but the bias is in which policies were kept.
- **B** has the direction backwards. The policies removed are the high-risk ones.
- **C** describes leakage, which comes from building a predictor with information from after the prediction date. Attaching claims as the target does not do that.
- **D** confuses selection with duplication. A renewal adds a term, and nothing in this extract repeats a claim.
