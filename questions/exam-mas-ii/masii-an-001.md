---
id: "masii-an-001"
exam: "Exam MAS-II"
topic: "Frequency"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Frequency
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Partial+Credibility
  - Concepts/Full+Credibility+Standard
answer: "B"
points: 2
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:19a8ea5e2ffc008291a4fac2d8620d04017c5944d52973a66c8bc29228536161
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.12 Credibility, printed pp.217-220 (PDF 229-232): full-credibility standard 1,082 claims at p=90%, k=5%; square-root rule Z = sqrt(n/1,082); worked example Z = sqrt(100/1,082) = 0.30, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-001.md
---

An actuary is updating the claim frequency for one territory using classical (limited fluctuation) credibility. You are given:

- Earned exposures in the territory: 25,000 car-years
- Reported claims in the territory: 480
- Statewide frequency, used as the complement of credibility: 0.0240 claims per car-year
- Standard for full credibility: 1,082 claims
- Partial credibility is assigned by the square-root rule

Calculate the credibility-weighted claim frequency for the territory.

- A) 0.0192
- B) 0.0208
- C) 0.0219
- D) 0.0224
- E) 0.0240

## Explanation

Frequency is claims per unit of exposure:

$$
\text{Frequency} = \frac{480}{25{,}000} = 0.0192
$$

The full-credibility standard is stated in **claims**, so the credibility is measured on the 480 observed claims, not on the exposures:

$$
Z = \sqrt{\frac{480}{1{,}082}} = 0.6661
$$

$$
\text{Estimate} = 0.6661(0.0192) + (1 - 0.6661)(0.0240) = \mathbf{0.0208}
$$

The answer is **B**.

**Why not the others**

- **A** — 0.0192 is the territory's own frequency with full credibility, which follows from comparing 25,000 car-years with a standard expressed in claims. The units must match: 480 claims is less than 1,082.
- **C** — uses $Z = 480/1{,}082 = 0.4436$, a linear rather than square-root rule for partial credibility.
- **D** — applies $Z$ to the complement and $(1 - Z)$ to the territory's experience, reversing the weights.
- **E** — the statewide complement alone ($Z = 0$), as if partial credibility were not allowed below the full standard.
