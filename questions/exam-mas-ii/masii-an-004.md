---
id: "masii-an-004"
exam: "Exam MAS-II"
topic: "Exposure Base"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Exposure+Base
  - Concepts/Bühlmann-Straub+Credibility
  - Concepts/Frequency
answer: "D"
points: 2
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7bd3814b3611782cb2a76d8d0f6fc165607157b29f98bac59f47b9525cc6b791
  sources:
    - "Dean, Topics in Credibility Theory, SOA Construction and Evaluation of Actuarial Models Study Note (C-24-05), §1.2 Bühlmann-Straub Model, PDF pp.11-16: exposure m_t (e.g. number of insured vehicles), process variance sigma^2/m_t; 'The total exposure m replaces N in the Bühlmann formula', Z = m/(m+K); worked example p.16, sha256:6e31928104c195095960e92ec11de665106d1c11357b8bb5674410d377afc1b0 — https://www.soa.org/globalassets/assets/files/edu/c-24-05.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.12 Credibility, printed pp.220-221 (PDF 232-233): Bühlmann Z = N/(N+K), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-004.md
---

Commercial auto fleets are experience rated with Bühlmann-Straub credibility. The exposure base is the car-year, and the credibility constant has been estimated as $K = 150$ car-years.

Fleet A has insured 40 vehicles in each of the last 3 years. Its observed claim frequency over that period is 0.12 claims per car-year, and the class frequency is 0.08.

Calculate the credibility-weighted claim frequency for Fleet A.

- A) 0.0800
- B) 0.0808
- C) 0.0884
- D) 0.0978
- E) 0.1022

## Explanation

In the Bühlmann-Straub model the volume behind a risk's experience is its exposure, measured in the same unit as $K$. Fleet A's exposure is

$$
m = 40 \times 3 = 120 \text{ car-years}
$$

$$
Z = \frac{m}{m + K} = \frac{120}{120 + 150} = 0.4444
$$

$$
\text{Estimate} = 0.4444(0.12) + 0.5556(0.08) = \mathbf{0.0978}
$$

The answer is **D**.

**Why not the others**

- **A** — the class frequency alone, as though the fleet's experience earned no credibility.
- **B** — counts the 3 years as the volume ($Z = 3/153$). With unequal exposures, it is car-years, not years, that measure how much the fleet's experience says. A 400-vehicle fleet's 3 years are worth far more than a 4-vehicle fleet's.
- **C** — counts the 40 vehicles once ($Z = 40/190$), dropping two of the three years of exposure.
- **E** — reverses the weights, applying $Z$ to the class frequency.
