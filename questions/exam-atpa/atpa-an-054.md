---
id: "atpa-an-054"
exam: "Exam ATPA"
topic: "Explainability"
learning_objective: "Model Explainability and Communication"
difficulty: easy
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Explainability
answer: "E"
points: 1
---

An insurer's analytics team has built five gradient boosting machines that are hard to explain. Each would be used as described below, with no explanation of individual outputs beyond what the team already has.

For which use is the lack of explainability most acceptable?

- A) Setting the personal auto rates the insurer files with the regulator, replacing the current GLM
- B) Declining any homeowners application whose score is above a threshold, with no person reviewing it
- C) Setting each renewal premium directly from the model's prediction, with no rating table behind it
- D) Deciding which small-business applicants are offered coverage through the online quote system
- E) Ordering the queue of premium audits for auditors, who decide every case themselves

## Explanation

A model that is hard to explain can be acceptable when a single output carries little at stake, when a person reviews each output before acting, or when the model only ranks work. Ordering an audit queue does all three: the model only ranks, the auditors decide each case with the file in hand, and a poor ranking costs auditors' time rather than setting a wrong price or refusing someone. The answer is **E**. Its outputs should still be tested across groups, since an unfair ranking would send some groups' policies for audit more often.

**Why not the others**

- **A** sets a filed rate, and the insurer must justify the effect of each rating variable to the regulator.
- **B** decides whether a person is offered coverage, with no one reviewing the decision, so each decline must be justifiable to the applicant and the regulator.
- **C** sets the price each customer pays, which has to be explained to the customer and justified in the filing.
- **D** also decides whether a person is offered coverage.
