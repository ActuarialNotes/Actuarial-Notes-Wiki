---
id: "cas8-an-003"
exam: "Exam 8"
topic: "Model Implementation"
learning_objective: "Classification Ratemaking"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Model+Implementation
  - Concepts/Rating+Plan
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:13dd8716c4c132296d20f114b2283feacf251de87466ad269718833a7c1ec20e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-003.md
---

An insurer has finished a personal auto GLM and is turning it into a rating plan. Determine which of the following statements about implementing and maintaining the model are true.

- I. A safe-driving discount offered for the first time, with no data on it in the model, may overlap with modelled variables, and judgmental adjustments to the plan may be appropriate.
- II. Between full rebuilds, refreshing the existing model on newer data lets its predictions reflect the most recent experience.
- III. Some ambiguity about which class a risk belongs to is acceptable in the rating plan, provided the model itself was fitted at a finer level.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Goldburd et al. (Sections 3.8 and 3.9) list what matters when a model becomes a product, and how to keep it current.

- **I is true.** Rating plans often include factors the model doesn't, because there is no data on them. A first-time safe-driving discount is the monograph's own example: it may overlap with variables in the model, so judgmental adjustments to the plan's variables may be appropriate.
- **II is true.** A model's predictive accuracy decays as the world changes. It should be rebuilt periodically, and in the interim it can be refreshed with newer data.
- **III is false.** The product must be clear and understandable, with no ambiguity in the risk classification. A finer model does not help an underwriter who can't tell which class a risk is in.

Statements I and II are true, so the answer is **B**.

**Why not the others**

- **A** misses II, treating the model as finished once it is implemented.
- **C** and **D** accept III, trading the plan's clarity for the model's detail.
- **E** would need all three statements true, or a set no option lists; III is false.
