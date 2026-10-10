---
id: "discda-an-235"
exam: "Exam DISC-DA"
topic: "Predictive Analytics"
learning_objective: "10. Ethical and Societal Considerations of Data Analytics"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Predictive+Analytics
  - Concepts/Holdout+Sample
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:737334f3960bd21486c7479efa01e27f192d655e0dd5eba62fceaa2feaa55ea7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-235.md
---

An insurer plans a predictive model to flag homeowners claims that are likely to become litigated. It will learn from five years of closed claims, each recorded as litigated or not. Which statement about the project is correct?

- A) It is a supervised model: the target is known for every historical claim the model learns from.
- B) It is an unsupervised model, because the new claims it will score have no known outcome yet.
- C) The best evidence that it works is how closely it fits the five years of claims it was fitted to.
- D) Which decision the model will feed can be settled after it is built, because that decision does not affect which variables may be used.

## Explanation

A supervised method learns from data in which the target is known — here, whether each closed claim was litigated — and a claims model of this kind is supervised. The answer is **A**.

**Why not the others**

- **B** — every predictive model scores cases whose outcome is not yet known; that is what prediction means. Whether a method is supervised depends on the data it learns from, and these data carry a known target. Unsupervised methods such as clustering look for structure with no target at all.
- **C** — in-sample fit improves every time a term is added, so it says little about new claims. A model is judged on a hold-out sample or by cross-validation.
- **D** — the decision the model feeds is part of framing the business problem, before any data are touched. It fixes how the output must be presented and which variables may lawfully be used.
