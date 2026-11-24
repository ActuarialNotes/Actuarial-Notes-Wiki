---
id: "atpa-an-032"
exam: "Exam ATPA"
topic: "Variable Selection"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Variable+Selection
  - Concepts/AIC
  - Concepts/BIC
points: 2
---

An analyst starts a claim-frequency model with 150 candidate predictors on 50,000 policy records.

## Part a (1 point)
Calculate the number of models forward stepwise selection fits, including the null model, if it runs until all 150 predictors are in. Give your answer as a whole number.

### Answer
11326

### Explanation
Step $k$ fits $p - k$ models for $k = 0, 1, \ldots, p - 1$, and the null model adds one:

$$
1 + \frac{p(p+1)}{2} = 1 + \frac{150(151)}{2} = \mathbf{11{,}326}
$$

Best subset selection would fit $N = 2^{150}$ models, far too many, which is why a stepwise search is used when starting with this many variables.

- **11,325** leaves out the null model.
- **22,650** counts $p(p+1)$ without halving.

## Part b (1 point)
Forward selection gives two candidate models:

| Model | Parameters | Log-likelihood |
| :--- | ---: | ---: |
| 1 | 12 | $-20{,}150$ |
| 2 | 20 | $-20{,}135$ |

Which statement is correct? Use $\ln 50{,}000 = 10.82$.

- A) AIC and BIC both prefer Model 1
- B) AIC prefers Model 2 and BIC prefers Model 1
- C) AIC prefers Model 1 and BIC prefers Model 2
- D) AIC and BIC both prefer Model 2

### Answer
B

### Explanation
The lower criterion is preferred.

$$
\text{AIC}_1 = 40{,}300 + 2(12) = 40{,}324, \qquad \text{AIC}_2 = 40{,}270 + 2(20) = 40{,}310
$$

$$
\text{BIC}_1 = 40{,}300 + 12(10.82) = 40{,}429.8, \qquad \text{BIC}_2 = 40{,}270 + 20(10.82) = 40{,}486.4
$$

AIC prefers Model 2 and BIC prefers Model 1. With $n \geq 8$, BIC charges more per parameter than AIC, so it never chooses more predictors than AIC does. The answer is **B**.

- **A** — would need the 8 extra parameters to cost AIC more than the 30-point fall in $-2l$, but they cost only 16.
- **C** — reverses the two penalties: BIC's is the heavier one, so it cannot prefer the larger model when AIC prefers the smaller.
- **D** — compares the fits alone, as $-2l$ or deviance would, which always favours the larger model.
