---
id: p-046
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - discrete-distributions
  - expected-value
wiki_link: Concepts/Expected+Value
answer: E
points: 1
---

An insurance policy on an electrical device pays a benefit of 4000 if the device fails during the first year. The amount of the benefit decreases by 1000 each successive year until it reaches 0. If the device has not failed by the beginning of any given year, the probability of failure during that year is 0.4.

Calculate the expected benefit under this policy.

- A) 2234
- B) 2400
- C) 2500
- D) 2667
- E) 2694

## Explanation

Let $Y$ be the benefit amount.

* Failure in Year 1: Benefit = 4000. Probability = 0.4
* Failure in Year 2: Benefit = 3000. Probability = P(survive Yr 1) * P(fail Yr 2) = $(0.6)(0.4)$
* Failure in Year 3: Benefit = 2000. Probability = P(survive Yr 1,2) * P(fail Yr 3) = $(0.6)^2(0.4)$
* Failure in Year 4: Benefit = 1000. Probability = P(survive Yr 1,2,3) * P(fail Yr 4) = $(0.6)^3(0.4)$

The expected benefit is:
$$E[Y] = 4000(0.4) + 3000(0.6)(0.4) + 2000(0.6)^2(0.4) + 1000(0.6)^3(0.4)$$
$$= 1600 + 720 + 288 + 86.4 = 2694.4$$
