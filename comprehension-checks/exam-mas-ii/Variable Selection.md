---
concept: "Variable Selection"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: C
---
Two nested candidate models are compared using AIC and using BIC. Which criterion is the more likely to favour the sparser model, and why?

- A) AIC, because it charges the heavier penalty per parameter
- B) Neither — the two criteria always rank candidate models the same way
- C) BIC, because its per-parameter penalty grows with the sample size
- D) Whichever returns the larger value, since a higher score means a better trade-off

<!-- rationale: 0: reverses which criterion penalizes complexity harder · 1: assumes different penalties cannot change the ordering · 3: inverts the decision rule — the smaller value is the preferred model -->
