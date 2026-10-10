---
id: "discda-an-211"
exam: "Exam DISC-DA"
topic: "Model Training and Evaluation"
learning_objective: "7. Understanding Fundamental Modeling Concepts"
difficulty: easy
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Model+Training+and+Evaluation
  - Concepts/Overfitting
  - Concepts/Holdout+Sample
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4082abc17fd2a75844949130c54a2c4f078b02145170d59ae65a717daddd0e5d
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §2.2.2 PDF p.43, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.3 PDF pp.48-51, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-211.md
---

An analyst fits four frequency models of increasing complexity on a training set and scores each on a separate validation set:

| Model | 1 | 2 | 3 | 4 |
| :--- | ---: | ---: | ---: | ---: |
| Training error | 30.2 | 26.8 | 24.9 | 23.1 |
| Validation error | 31.5 | 28.0 | 27.6 | 29.9 |

Which model should be selected for final testing?

- A) Model 1
- B) Model 2
- C) Model 3
- D) Model 4

## Explanation

Training error always falls as complexity grows, so it cannot choose between models. Validation error, measured on data the models did not see, falls to Model 3 and then rises: Model 4 is overfitting, fitting noise in the training data. Model 3 has the lowest validation error, and its performance should then be confirmed once on the untouched test set. The answer is **C**.

**Why not the others**

- **A** — the simplest model underfits; its validation error is the highest of the four.
- **B** — Model 2 is close, but its validation error of 28.0 is above Model 3's 27.6.
- **D** — the lowest *training* error belongs to the most flexible model, which is exactly the one overfitting.
