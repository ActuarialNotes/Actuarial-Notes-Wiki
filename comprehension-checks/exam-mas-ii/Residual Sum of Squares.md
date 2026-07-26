---
concept: "Residual Sum of Squares"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: D
---
A predictor made of pure random noise is added to an OLS regression. What happens to the quantity that OLS minimizes?

- A) It rises, since an irrelevant predictor worsens the fit
- B) It stays put unless the new predictor is statistically significant
- C) It drops only if the predictor is genuinely related to the response
- D) It can only stay the same or fall, noise or not

<!-- rationale: 0: assumes a useless predictor is penalized, when in-sample fit never degrades · 1: ties the fit statistic to a significance test · 2: assumes the drop requires real signal, missing why adjusted measures and AIC exist at all -->
