---
id: "pa-an-038"
exam: "Exam PA"
topic: "Generalized Linear Model"
learning_objective: "Generalized Linear Models"
difficulty: hard
type: multi-part
bloom: create
wiki_link:
  - Concepts/Generalized+Linear+Model
  - Concepts/Offset+Variable
  - Concepts/Poisson+Regression
  - Concepts/Link+Function
points: 4
---

A personal auto insurer asks you to build a claim frequency model to update its territory and driver relativities. Each row of the data is one policy term, with the number of claims (0, 1, 2 or more), the earned car-years (from 0.1 to 1.0, since many terms were cancelled or written mid-year), the territory and the driver's age group. The insurer's deductible relativities were set in a separate study last year, and management wants them kept as they are while the other relativities are re-estimated around them. The rating plan is multiplicative.

## Part a (1 point)
Which distribution should the response have?

- A) Normal
- B) Gamma
- C) Poisson
- D) Binomial

### Answer
C

### Explanation
The response is a claim count, a non-negative whole number, and the Poisson distribution is the usual model for claim counts. **A** allows negative and fractional values with constant variance. **B** suits a positive, continuous severity and cannot take the value 0, which most policy terms have. **D** models a yes-or-no outcome, but a term can have two or more claims.

## Part b (1 point)
Which link function should the model use?

- A) Identity
- B) Log
- C) Logit
- D) Inverse

### Answer
B

### Explanation
The log link keeps every fitted mean positive and makes the predictors' effects multiplicative, which matches the multiplicative rating plan. **A** makes the effects additive and can give negative frequencies. **C** maps a probability between 0 and 1 and belongs with a binary response. **D** does not give multiplicative effects.

## Part c (1 point)
How should earned car-years enter the model?

- A) As an offset of $\ln(\text{car-years})$
- B) As a predictor, with its coefficient estimated
- C) As an offset equal to the car-years themselves
- D) It should be left out, because the territory and age relativities do not depend on exposure

### Answer
A

### Explanation
A policy term with twice the car-years should have twice the expected claims, so the expected count is proportional to exposure. On the log scale that is the offset $\ln(\text{car-years})$, with its coefficient fixed at 1. **B** drops the assumption of proportionality and estimates a different model. **C** enters the exposure itself instead of its logarithm, so a full year would multiply the expected count by $e^{1}$. **D** would give a cancelled term with 0.1 car-years the same expected count as a full-year term.

## Part d (1 point)
Explain how the deductible relativities should be included so that they are kept as they are, and why this works.

### Explanation
A full-credit answer makes these points:

1. Each policy's deductible relativity enters the model as an offset of its logarithm, added to the exposure offset: $o_i = \ln(\text{car-years}_i) + \ln(\text{deductible relativity}_i)$.
2. An offset's coefficient is fixed at 1, so the deductible effect is imposed on the fitted mean rather than estimated, and the relativities stay as they were set.
3. The territory and age coefficients are then estimated in the presence of the deductible effect, so they do not absorb any of it.

**Sample answer.** Add the logarithm of each policy's deductible relativity to the offset, so that the total offset is $\ln(\text{car-years}) + \ln(\text{deductible relativity})$. Because an offset has its coefficient fixed at 1, the model multiplies each policy's expected count by its deductible relativity without re-estimating it. The territory and driver age coefficients are estimated around those fixed relativities, so they measure only their own effects.
