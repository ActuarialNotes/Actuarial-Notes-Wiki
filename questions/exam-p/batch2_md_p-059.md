---
id: p-059
topic: Univariate Random Variables
subtopic: Variance and Standard Deviation
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - uniform-distribution
  - deductibles
  - standard-deviation
wiki_link: Concepts/Standard+Deviation
answer: B
points: 1
---

The owner of an automobile insures it against damage by purchasing an insurance policy with a deductible of 250. In the event that the automobile is damaged, repair costs can be modeled by a uniform random variable on the interval $(0, 1500)$.

Calculate the standard deviation of the insurance payment in the event that the automobile is damaged.

- A) 361
- B) 403
- C) 433
- D) 464
- E) 521

## Explanation

Let $X$ be the repair cost, uniform on $[0, 1500]$. Let $Y$ be the insurance payment. $Y = \max(0, X-250)$.

$$E[Y] = \int_{250}^{1500} (x-250)\frac{1}{1500} dx = \frac{(x-250)^2}{3000} \Big|_{250}^{1500} = \frac{1250^2}{3000} \approx 520.83$$

$$E[Y^2] = \int_{250}^{1500} (x-250)^2 \frac{1}{1500} dx = \frac{(x-250)^3}{4500} \Big|_{250}^{1500} = \frac{1250^3}{4500} \approx 434,027.78$$

$$Var(Y) = E[Y^2] - (E[Y])^2 = 434,027.78 - (520.83)^2 \approx 162,763.89$$

$$SD(Y) = \sqrt{162,763.89} \approx 403.44$$
