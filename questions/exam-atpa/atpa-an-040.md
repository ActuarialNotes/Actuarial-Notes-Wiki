---
id: "atpa-an-040"
exam: "Exam ATPA"
topic: "Explainability"
learning_objective: "Model Explainability and Communication"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Explainability
  - Concepts/Interpretability
  - Concepts/Shapley+Value
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4e5c1fb917f0311ddad2767b4ba91f51b2b538ff158ecc443150247d8b6ddf3f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-040.md
---

A pricing team is replacing its personal auto GLM with a gradient boosting machine (GBM). In the project's documentation, the team writes three statements about explainability and interpretability.

Determine which of the following statements are true.

- I. Interpretability is a property of the model itself, while explainability concerns whether the model's outputs can be justified to a particular audience, such as a regulator or a policyholder.
- II. Once Shapley values are produced for every quote, the GBM becomes decomposable, because each prediction is split into one contribution per variable.
- III. A GLM with hundreds of engineered features and interaction terms may be neither simulatable nor decomposable.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I is true.** Interpretability describes how far a person can follow how the model turns inputs into outputs, so it belongs to the model. Explainability describes whether the outputs can be justified to a stakeholder in terms that stakeholder can act on, so it depends on the audience too.

**II is false.** Shapley values are post-hoc interpretability: they are extracted from the fitted model and describe what it does for one record, while the trees and their splits stay as hidden as before. Decomposability is a kind of transparency, in which each input, parameter and calculation of the model has an intuitive meaning of its own, as each relativity of a log-link GLM does. A post-hoc explanation makes an opaque model easier to use, but it does not make the model transparent.

**III is true.** Lipton's point is that a linear form alone does not make a model interpretable. With hundreds of engineered features and interactions, no person can take in the whole model and work out a prediction by hand (not simulatable), and a coefficient on a heavily transformed variable has no intuitive meaning (not decomposable).

I and III are true, so the answer is **C**.

**Why not the others**

- **A** rejects III, treating every linear model as interpretable because of its form.
- **B** accepts II, confusing a post-hoc split of one prediction with the transparency of the model's own parameters.
- **D** accepts II and rejects I, which reads the two terms as interchangeable.
- **E** would need a different combination, but exactly I and III are true.
