---
concept: "Parameter Estimate Tables"
exam: exam-mas-i
topic: "C. Extended Linear Models"
correct: A
---
A Poisson GLM with a log link reports coefficient β̂ = 0.40 for Territory B (reference: Territory A), with p = 0.002. What does the output tell you?

- A) Territory B is significant, with about e^0.40 ≈ 1.49× the expected claims of Territory A
- B) Territory B has 0.40× the expected claims of Territory A
- C) Territory B is not significant, because p is small
- D) Territory B has about 40% fewer claims than Territory A

<!-- rationale: 1: reads the raw coefficient as the multiplier, skipping exp · 2: reverses the p-value significance rule · 3: wrong sign and skips exp -->
