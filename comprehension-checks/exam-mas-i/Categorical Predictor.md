---
concept: "Categorical Predictor"
exam: exam-mas-i
topic: "C. Extended Linear Models"
correct: A
---
A GLM includes 'territory' with 4 levels (A, B, C, D). How many indicator (dummy) variables are needed, and what happens to the omitted level?

- A) 3 indicators; the 4th (reference) level is absorbed into the intercept
- B) 4 indicators, one per level
- C) 1 indicator, scoring the 4 levels as a single number
- D) 3 indicators, and the reference level's rows are dropped from the data

<!-- rationale: 1: forgets the reference level (k dummies causes collinearity) · 2: treats an unordered category as a single numeric score · 3: confuses the reference level with deleted observations -->
