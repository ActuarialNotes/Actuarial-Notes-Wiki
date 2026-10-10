---
id: "discda-an-212"
exam: "Exam DISC-DA"
topic: "Model Training and Evaluation"
learning_objective: "7. Understanding Fundamental Modeling Concepts"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Model+Training+and+Evaluation
  - Concepts/Train-Test+Split
  - Concepts/Holdout+Sample
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:fa70e5accbab558d20de52460253fd0e90f3d1c81060aabeaa7d81cb8aa0ca6e
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.3.1 PDF p.50, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-212.md
---

A homeowners wind model is built on five accident years of policy data, including a year with one large hurricane that produced thousands of claims. The analyst splits the records 70/30 at random into training and test sets, and the test-set lift is excellent. The chief actuary doubts the result. Which concern is most valid, and what should be done?

- A) The test set is too small; switch to a 90/10 random split to get more test claims
- B) Hurricane claims fall in both sets; test on a later period not used for training
- C) Random splits always overstate lift; abandon the test set and judge training fit
- D) The model has too few variables; add predictors until the training error stops falling

## Explanation

When one event causes many losses, a random split puts losses from the same storm in both the training and test sets, so the test set is not truly unseen and the validation is over-optimistic. Goldburd et al. recommend an **out-of-time** test set, such as a later year, for perils driven by common events like wind. The answer is **B**.

**Why not the others**

- **A** — a 90/10 split leaves even fewer test claims and keeps the same storm in both sets; it does not address the leak.
- **C** — training fit is the most optimistic measure of all. The cure is a better holdout, not none.
- **D** — adding predictors until training error stops falling invites overfitting, and the problem here is the evaluation, not the model.
