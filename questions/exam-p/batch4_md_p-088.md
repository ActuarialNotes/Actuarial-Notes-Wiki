---
id: p-088
topic: Univariate Random Variables
subtopic: Conditional Probability
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - conditional-probability
  - coinsurance-percentages
  - deductibles
wiki_link: Concepts/Conditional+Probability
answer: B
points: 1
---

The cumulative distribution function for health care costs experienced by a policyholder is modeled by the function
$$F(x) = \begin{cases} 1 - e^{-\frac{x}{100}}, & x > 0 \\ 0, & \text{otherwise.} \end{cases}$$

The policy has a deductible of 20. An insurer reimburses the policyholder for 100% of health care costs between 20 and 120. Health care costs above 120 are reimbursed at 50%.

Let $G$ be the cumulative distribution function of reimbursements given that the reimbursement is positive.

Calculate $G(115)$.

- A) 0.683
- B) 0.727
- C) 0.741
- D) 0.757
- E) 0.777

## Explanation

Let $X$ be the health care cost. The reimbursement $Y$ is positive when $X > 20$.
We want $G(115) = P(Y \le 115 \mid Y > 0) = P(Y \le 115 \mid X > 20)$.

How does the reimbursement $Y$ reach 115?
For costs between 20 and 120, $Y$ grows at 100%. At $X = 120$, $Y = 120 - 20 = 100$.
The remaining 15 of reimbursement comes from the 50% coverage above 120. So the cost must increase by $15 / 0.50 = 30$.
The total cost $X$ corresponding to a reimbursement of 115 is $120 + 30 = 150$.

Thus, $Y \le 115$ is equivalent to $X \le 150$.
$$G(115) = P(X \le 150 \mid X > 20) = \frac{P(20 < X \le 150)}{P(X > 20)}$$
$$= \frac{F(150) - F(20)}{1 - F(20)} = \frac{(1 - e^{-1.5}) - (1 - e^{-0.2})}{e^{-0.2}} = \frac{e^{-0.2} - e^{-1.5}}{e^{-0.2}}$$
$$= 1 - e^{-1.3} = 1 - 0.27253 = 0.72747$$
