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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:737334f3960bd21486c7479efa01e27f192d655e0dd5eba62fceaa2feaa55ea7
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1.4 PDF p.37, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.3 PDF pp.48-49, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam PCPA Content Outline 2025 (v.8), PDF pp.1-5, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
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
