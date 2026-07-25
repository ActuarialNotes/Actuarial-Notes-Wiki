---
concept: "Linear Mixed Model"
exam: exam-mas-ii
topic: "B. Linear Mixed Models"
correct: C
---
A pricing model needs an intercept for each of 500 territories, and the analyst wants sparse territories to borrow strength from the rest. Which specification delivers that?

- A) A fixed effect — 500 indicator coefficients, each estimated on its own territory's data
- B) Either one; with enough data the two give identical estimates
- C) A random effect — intercepts drawn from a common distribution, shrinking toward the overall mean
- D) Neither; a variable with that many levels has to be dropped

<!-- rationale: 0: names the specification that estimates each level freely, which is exactly what does *not* borrow strength · 1: ignores shrinkage, the whole point of the random-effect formulation · 3: over-reacts to high cardinality, the situation this model is built for -->
