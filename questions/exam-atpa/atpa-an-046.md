---
id: "atpa-an-046"
exam: "Exam ATPA"
topic: "Shapley Value"
learning_objective: "Model Explainability and Communication"
difficulty: hard
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Shapley+Value
answer: "171.67"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e10c4b12d510b4a6ee9831877768fbf12d5df7e4f7779928317fb91c187e1381
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-046.md
---

A boosted pure premium model predicts 800 for one personal auto policy. The model uses three features: the driver's prior claims ($A$), the territory ($T$) and the vehicle ($V$). Averaging the model over the portfolio while the features in a coalition $S$ are held at this policy's values gives these payouts:

| Coalition $S$ | $v(S)$ |
| :--- | ---: |
| $\varnothing$ | 500 |
| $\{A\}$ | 650 |
| $\{T\}$ | 560 |
| $\{V\}$ | 540 |
| $\{A, T\}$ | 730 |
| $\{A, V\}$ | 700 |
| $\{T, V\}$ | 600 |
| $\{A, T, V\}$ | 800 |

Calculate the Shapley value of prior claims ($A$) for this policy. Give your answer to two decimal places.

## Explanation

The Shapley value of $A$ is its marginal contribution averaged over every coalition of the other features, weighted by the probability that exactly those features come before $A$ in a random ordering. For three features the weights are $\tfrac{1}{3}$ for the empty coalition, $\tfrac{1}{6}$ for each coalition of one and $\tfrac{1}{3}$ for the coalition of two.

The marginal contributions of $A$:

$$v(\{A\}) - v(\varnothing) = 650 - 500 = 150$$

$$v(\{A,T\}) - v(\{T\}) = 730 - 560 = 170$$

$$v(\{A,V\}) - v(\{V\}) = 700 - 540 = 160$$

$$v(\{A,T,V\}) - v(\{T,V\}) = 800 - 600 = 200$$

$$\phi_A = \tfrac{1}{3}(150) + \tfrac{1}{6}(170) + \tfrac{1}{6}(160) + \tfrac{1}{3}(200) = \mathbf{171.67}$$

As a check, the same method gives $\phi_T = 76.67$ and $\phi_V = 51.67$, and the three add up to $\phi_A + \phi_T + \phi_V = 300 = v(N) - v(\varnothing)$, the prediction less the average prediction.

**Common wrong entries**

- **170.00** gives each of the four coalitions the same weight of $\tfrac{1}{4}$. The weight depends on the coalition's size, and with equal weights the three values no longer add up to 300 in general.
- **150.00** is $A$'s contribution to the empty coalition only, its effect when nothing else is known.
- **200.00** is $A$'s contribution when it joins last, its effect with everything else already known.
