---
id: p-058
topic: Univariate Random Variables
subtopic: Variance and Standard Deviation
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - discrete-distributions
  - standard-deviation
wiki_link: Concepts/Standard+Deviation
answer: A
points: 1
---

A probability distribution of the claim sizes for an auto insurance policy is given in the table below:

| Claim Size | Probability |
| :--- | :--- |
| 20 | 0.15 |
| 30 | 0.10 |
| 40 | 0.05 |
| 50 | 0.20 |
| 60 | 0.10 |
| 70 | 0.10 |
| 80 | 0.30 |

Calculate the percentage of claims that are within one standard deviation of the mean claim size.

- A) 45%
- B) 55%
- C) 68%
- D) 85%
- E) 100%

## Explanation

Calculate the mean $\mu$:
$$\mu = 20(0.15) + 30(0.10) + 40(0.05) + 50(0.20) + 60(0.10) + 70(0.10) + 80(0.30) = 55$$

Calculate the second moment $E[X^2]$:
$$E[X^2] = 400(0.15) + 900(0.10) + 1600(0.05) + 2500(0.20) + 3600(0.10) + 4900(0.10) + 6400(0.30) = 3500$$

Calculate Variance and Standard Deviation $\sigma$:
$$Var(X) = 3500 - 55^2 = 3500 - 3025 = 475$$
$$\sigma = \sqrt{475} \approx 21.79$$

The range within one standard deviation of the mean is $[55 - 21.79, 55 + 21.79] = [33.21, 76.79]$.
The claim sizes within this range are 40, 50, 60, and 70.

Sum of probabilities: $0.05 + 0.20 + 0.10 + 0.10 = 0.45$, which is 45%.
