---
id: "discda-an-216"
exam: "Exam DISC-DA"
topic: "Underwriting Modeling Dataset"
learning_objective: "9. Preparing Data for Insurance Applications"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Underwriting+Modeling+Dataset
  - Concepts/Offset+Variable
  - Concepts/Generalized+Linear+Model
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:66f1e82ea5e2227afc51bd23e0db6701045d692e3639184edb37d9fdb2e61f8e
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.6 PDF pp.28-29, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-216.md
---

An underwriting dataset has one row per territory and class, with earned car-years and claim frequency (claims per car-year). The analyst will fit a Poisson GLM with a log link using claim frequency as the target. How should exposure enter the model?

- A) As an offset of ln(car-years), together with a weight equal to car-years
- B) As a weight equal to car-years, with no offset
- C) As an offset of ln(car-years), with no weight
- D) As an ordinary predictor whose coefficient is estimated

## Explanation

For a frequency target, more exposure does not change the expected value, but it makes the observed frequency more stable, so exposure enters as a **weight** and not as an offset. The offset of ln(exposure) belongs to the other set-up, where the target is the claim *count*; for a Poisson model the two set-ups give the same relativities (Goldburd et al., §2.6). The answer is **B**.

**Why not the others**

- **A** — uses both adjustments at once; with a frequency target the offset double-counts exposure in the mean.
- **C** — is right for a claim count target, not a frequency target.
- **D** — estimating a coefficient for exposure lets the model decide that frequency is not proportional to exposure, which is a different model.
