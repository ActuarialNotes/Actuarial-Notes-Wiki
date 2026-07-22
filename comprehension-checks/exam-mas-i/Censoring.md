---
concept: "Censoring"
exam: exam-mas-i
topic: "B. Statistics"
correct: A
---
A claim is right-censored at 4 (we know the loss exceeded 4 but not its exact size). How does it enter the likelihood?

- A) Through the survival probability S(4) = P(X > 4)
- B) Through the density f(4), as if the loss were exactly 4
- C) It is dropped — a censored observation carries no information
- D) Through f(4)/S(4), the truncated-data contribution

<!-- rationale: 1: treats the censored value as if observed exactly · 2: wrongly discards censored data as uninformative · 3: confuses censoring with truncation -->
