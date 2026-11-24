---
id: "atpa-an-018"
exam: "Exam ATPA"
topic: "Data Preparation"
learning_objective: "Working with Data"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Data+Preparation
  - Concepts/Data+Pipeline
points: 2
---

An analyst prepares a frequency data set with one row per policy term. Data are evaluated at 2025-12-31, so earning stops at 2026-01-01. Days are counted with the end date excluded and a 365-day year.

## Part a (1 point)
A term runs from 2025-05-01 to 2026-05-01. Calculate its earned exposure in years. Give your answer to four decimal places.

### Answer
0.6712

### Explanation
Exposure is earned only up to the evaluation date:

$$
e_i = \frac{\min\left(t_i^{\text{exp}},\ t^{\text{eval}}\right) - t_i^{\text{eff}}}{365} = \frac{\text{2026-01-01} - \text{2025-05-01}}{365} = \frac{245}{365} = \mathbf{0.6712}
$$

**Common wrong entries**

- **1.0000** earns the whole term, past the evaluation date. Claims after the cut-off are not in the data, so frequency would be understated.
- **0.3288** is the unearned part, 120/365.

## Part b (1 point)
The analyst proposes four predictors for this term. Which one should **not** be used?

- A) The number of claims in the three years before 2025-05-01
- B) The number of claims from 2022-05-01 to 2025-12-31
- C) The driver's age on 2025-05-01
- D) The vehicle's age at the term's effective date

### Answer
B

### Explanation
A predictor must use only information available at the start of the term. **B** counts claims up to the evaluation date, which includes the claims of this term, so it leaks the target into the model and makes it look better than it is. **A** stops at the term's effective date, and **C** and **D** are measured at that date, so all three are known when the term is priced.
