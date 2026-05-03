---
id: p-094
topic: Univariate Random Variables
subtopic: Conditional Probability
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - geometric-distribution
  - conditional-expectation
wiki_link: Concepts/Conditional+Probability
answer: D
points: 1
---

A fair die is rolled repeatedly. Let $X$ be the number of rolls needed to obtain a 5 and $Y$ the number of rolls needed to obtain a 6.

Calculate $E[X \mid Y=2]$.

- A) 5.0
- B) 5.2
- C) 6.0
- D) 6.6
- E) 6.8

## Explanation

$X$ follows a geometric distribution with probability of success $p = 1/6$. Without conditions, $E[X] = 1/p = 6$.

The condition $Y=2$ means the second roll is a 6, and the first roll is not a 6.
There are two possibilities for the first roll: it is a 5 (probability 1/5 since we know it's not 6) or it's not a 5 (probability 4/5).

If the first roll is a 5, then $X=1$. This happens with probability $1/5$ (given $Y=2$).
If the first roll is not a 5, then the first roll is $1, 2, 3,$ or $4$. The second roll is $6$. So $X$ must be at least 3. Since the rolls from the 3rd roll onward are independent, the expected additional rolls to get a 5 is 6. So $E[X \mid X \ge 3] = 2 + 6 = 8$. This happens with probability $4/5$.

$$E[X \mid Y=2] = 1(1/5) + 8(4/5) = \frac{1}{5} + \frac{32}{5} = \frac{33}{5} = 6.6$$
