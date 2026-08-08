---
concept: "Poisson Regression"
exam: exam-mas-i
topic: "C. Extended Linear Models"
correct: A
---
Policies in a frequency data set carry different exposures. How should exposure enter a log-link Poisson model?

- A) As log exposure, with its coefficient fixed at 1
- B) As an ordinary predictor with a fitted coefficient
- C) As a predictor on the raw scale, not logged
- D) It should be left out, since it is not a rating variable

<!-- rationale: 1: lets the model estimate a scaling the theory already fixes · 2: forgets that the link is logarithmic · 3: leaves the model predicting counts rather than rates -->
