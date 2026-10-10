---
id: "discda-an-216"
exam: "Exam DISC-DA"
topic: "Underwriting Modeling Dataset"
learning_objective: "Preparing Data for Insurance Applications"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Underwriting+Modeling+Dataset
  - Concepts/Offset+Variable
  - Concepts/Generalized+Linear+Model
answer: "B"
points: 1
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
