---
id: p-035
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - exponential-distribution
  - expected-value
  - insurance-payments
wiki_link: Concepts/Expected+Value
answer: D
points: 1
---

The lifetime of a printer costing 200 is exponentially distributed with mean 2 years. The manufacturer agrees to pay a full refund to a buyer if the printer fails during the first year following its purchase, a one-half refund if it fails during the second year, and no refund for failure after the second year.

Calculate the expected total amount of refunds from the sale of 100 printers.

- A) 6,321
- B) 7,358
- C) 7,869
- D) 10,256
- E) 12,642

## Explanation

Let $T$ denote the printer lifetime. The distribution function is $F(t) = 1 - e^{-t/2}$.

The probability of failure in the first year is $F(1) = 1 - e^{-1/2} = 0.3935$.
The probability of failure in the second year is $F(2) - F(1) = (1 - e^{-1}) - 0.3935 = 0.6321 - 0.3935 = 0.2386$.

Of 100 printers, the expected number of failures is 39.35 in the first year and 23.86 in the second year.
The total expected cost is:
$$E[\text{Refunds}] = 200(39.35) + 100(23.86) = 7870 + 2386 = 10,256$$
