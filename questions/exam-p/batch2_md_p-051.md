---
id: p-051
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - mixed-distributions
  - deductibles
wiki_link: Concepts/Expected+Value
answer: B
points: 1
---

An auto insurance company insures an automobile worth 15,000 for one year under a policy with a 1,000 deductible. During the policy year there is a 0.04 chance of partial damage to the car and a 0.02 chance of a total loss of the car.

If there is partial damage to the car, the amount $X$ of damage (in thousands) follows a distribution with density function
$$f(x) = \begin{cases} 0.5003e^{-x/2}, & 0 < x < 15 \\ 0, & \text{otherwise.} \end{cases}$$

Calculate the expected claim payment.

- A) 320
- B) 328
- C) 352
- D) 380
- E) 540

## Explanation

The expected payment (in thousands) considers three cases: no damage ($p=0.94$), partial damage ($p=0.04$), and total loss ($p=0.02$).
The payout with a 1 (thousand) deductible is $\max(0, X-1)$. For total loss, $X=15$, payout = 14.

$$E[\text{Payment}] = 0.94(0) + 0.02(15 - 1) + 0.04 \int_{1}^{15} (x-1) 0.5003 e^{-x/2} dx$$
$$= 0.28 + 0.04(0.5003) \int_{1}^{15} (x-1) e^{-x/2} dx$$
Let $u = x-1, dv = e^{-x/2}dx \implies du = dx, v = -2e^{-x/2}$:
$$\int_{1}^{15} (x-1) e^{-x/2} dx = -2(x-1)e^{-x/2} \Big|_{1}^{15} + 2 \int_{1}^{15} e^{-x/2} dx$$
$$= -28e^{-7.5} - 4e^{-x/2} \Big|_{1}^{15} = -28e^{-7.5} - 4e^{-7.5} + 4e^{-0.5} = 4e^{-0.5} - 32e^{-7.5} \approx 2.408$$
$$E[\text{Payment}] = 0.28 + (0.020012)(2.408) \approx 0.328 \text{ thousands} = 328$$
