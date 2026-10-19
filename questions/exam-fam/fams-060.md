---
id: "fams-060"
exam: "Exam FAM"
topic: "Limited Expected Value"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Limited+Expected+Value
  - Concepts/Deductible
  - Concepts/Coinsurance
  - Concepts/Pareto+Distribution
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b952c33ee7cd852ece625b54feb45a38d38c8bac1272678c6e25b7ee54f04735
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-060.md
---

An individual performs dangerous motorcycle jumps at extreme sports events around the world.

The annual cost of repairs to their motorcycle is modeled by a Pareto distribution with $\theta = 5000$ and $\alpha = 2$.

An insurance policy reimburses motorcycle repair costs subject to the following provisions:

(i) The annual ordinary deductible is 1000.

(ii) The policyholder pays 20% of repair costs between 1000 and 6000 each year.

(iii) The policyholder pays 100% of the annual repair costs above 6000 until they have paid 10,000 in out-of-pocket repair costs each year.

(iv) The policyholder pays 10% of the remaining repair costs each year.

Calculate the expected annual insurance reimbursement.

- A) 2300
- B) 2500
- C) 2700
- D) 2900
- E) 3100

## Explanation

Insurance pays 80% of the portion of annual claim between 6,000 and 1,000, and 90% of the portion of annual claims over 14,000.

The 14,000 breakpoint is where the policyholder has paid 10,000:

- 1000 = deductible
- 1000 = 20% of costs between 1000 and 6000
- 8000 = 100% of costs between 14,000 and 6,000

$$\begin{align*}
E(X \wedge x) &= \theta\left(1 - \frac{\theta}{x+\theta}\right) \\
&= \frac{5000x}{x + 5000}
\end{align*}$$

| $x$ | $E(X \wedge x)$ |
|---|---|
| 1000 | 833.33 |
| 6000 | 2727.27 |
| 14000 | 3684.21 |
| $\infty$ | 5000 |

$$\begin{align*}
&0.80[E(X \wedge 6000) - E(X \wedge 1000)] + 0.90[E(X) - E(X \wedge 14000)] \\
&= 0.80[2727.27 - 833.33] + 0.90[5000 - 3684.21] \\
&= 1515.15 + 1184.21 \\
&= 2699.36
\end{align*}$$

The answer is **C**.
