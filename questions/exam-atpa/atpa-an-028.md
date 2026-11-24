---
id: "atpa-an-028"
exam: "Exam ATPA"
topic: "Table Importability"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Table+Importability
  - Concepts/Boosting
  - Concepts/Generalized+Linear+Model
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cbcf9c89fa113e54795d8400c1800d74a599d118dd7d36e4247556cf4d534486
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-028.md
---

Determine which of the following statements about table importability are true.

- I. A boosted model of single-split trees with a log link can be loaded into a rating engine as one-way tables, one for each variable.
- II. A model that will only order claims for fraud investigators may be chosen without regard to table importability.
- III. A log-link GLM with many interaction terms can be loaded as rating tables, so its effects are easy to understand.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

- **I is true.** With a log link, a boosted model of single-split trees is additive on the log scale. Each tree involves one variable, so each variable's contributions add up to a one-way table of relativities.
- **II is true.** How much table importability weighs depends on the business context. A claims-triage model never sets a filed rate, so it may not need to be table-importable at all.
- **III is false.** The GLM can be loaded as tables, since each interaction is a two-way table, but many interactions make it hard to understand. Table importability and interpretability are judged separately.

I and II are true, so the answer is **B**.

**Why not the others**

- **A** — leaves out II, treating table importability as a requirement for every model whatever its use.
- **C** and **D** — both include III, which treats a model that can be loaded as tables as one that is easy to understand.
- **E** — would need a combination other than I and II.
