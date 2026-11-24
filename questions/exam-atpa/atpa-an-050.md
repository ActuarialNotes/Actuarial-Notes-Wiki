---
id: "atpa-an-050"
exam: "Exam ATPA"
topic: "Model Governance"
learning_objective: "Model Explainability and Communication"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Model+Governance
  - Concepts/Model+Risk
answer: "B"
points: 1
---

A Canadian property and casualty insurer reviews how three of its models are governed under a lifecycle-wide, risk-based approach such as OSFI's Guideline E-23.

- I. The developer of the new GBM claims-triage model tested it thoroughly on holdout data and then signed it off herself for production.
- II. The commercial auto pricing model passed an independent review at launch three years ago. Its performance has not been monitored since, because it passed that review.
- III. A small spreadsheet used to allocate overhead expenses is in the model inventory with a low risk rating, so it is reviewed less deeply and less often than the pricing models.

Determine which of the situations describe a gap in model governance.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I is a gap.** Review must be independent of development, and a separate approver signs the model off. However thorough the developer's testing, it is model testing; a developer who approves her own model fails the independence requirement.

**II is a gap.** Governance runs through every stage of a model's life, including monitoring and change, to decommission. A model validated at launch and never monitored afterwards is still a gap.

**III is not a gap.** A spreadsheet that turns inputs into results is a model, and this one is rightly in the inventory. Under a risk-based approach the risk rating, set from criteria such as materiality and complexity, decides how deep the review is and how often the model is monitored. Reviewing a low-rated model less than a material pricing model is the approach working as intended.

I and II describe gaps, so the answer is **B**.

**Why not the others**

- **A** misses II, treating a review at launch as enough for the model's whole life.
- **C** and **D** count III as a gap, which assumes every model must get the same review regardless of its risk rating.
- **E** would need a different combination, but exactly I and II are gaps.
