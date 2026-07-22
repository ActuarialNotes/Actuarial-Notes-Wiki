---
concept: "Limited Expected Value"
exam: exam-mas-i
topic: "A. Probability Models (Stochastic Processes & Survival Models)"
correct: A
---
Losses X have mean E[X] = 1,000. A policy pays each loss but caps the payment at u = 800. Which quantity equals the insurer's expected payment per loss?

- A) E[min(X, 800)]
- B) E[max(X − 800, 0)]
- C) E[X] − 800 = 200
- D) min(E[X], 800) = 800

<!-- rationale: 1: that is the reinsurer's excess-of-loss share E[(X−u)₊] · 2: subtracts the cap like a deductible · 3: applies the cap to the mean instead of to each loss (Jensen) -->
