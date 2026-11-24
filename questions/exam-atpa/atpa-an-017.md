---
id: "atpa-an-017"
exam: "Exam ATPA"
topic: "Missing Data"
learning_objective: "Working with Data"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Missing+Data
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5469e642903dd19a0cbe7665e9c0d5bba910b0f967aabd6919adcd7e54125204
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-017.md
---

In an application file for a personal lines frequency model, a financial-responsibility score is missing for 12% of applicants. Underwriting notes say that applicants with poor scores often decline to provide one. Which classification of the missing values, and which treatment, is most appropriate?

- A) Missing completely at random; drop the rows with a missing score.
- B) Missing at random; impute the median score from the other variables, with no indicator.
- C) Missing not at random; drop the rows, since any imputed score would be invented.
- D) Missing completely at random; impute the mean score and proceed.
- E) Missing not at random; keep the rows, impute, and add a missing-value indicator.

## Explanation

The chance of a score being missing depends on the score itself, since applicants with poor scores decline to give one. That is missing not at random (MNAR), and dropping or naively filling these values biases the model. Keeping the rows with an imputed value **and** a missing-value indicator lets the model estimate the effect of missingness, which here is likely to carry higher risk. The treatment must be stated in the report and applied in exactly the same way when scoring new business. The answer is **E**.

**Why not the others**

- **A** and **D** call the data MCAR, which would require missingness to be unrelated to anything. The underwriting notes say it is related to the score.
- **B** calls the data MAR, where missingness depends only on other observed variables, and imputes without an indicator, so the model cannot see that a missing score is itself a signal.
- **C** classifies correctly but drops the rows, removing a group that is riskier than average and leaving the model unable to price applicants who give no score.
