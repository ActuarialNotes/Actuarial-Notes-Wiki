---
id: "fams-033"
exam: "Exam FAM"
topic: "Coverage Modifications"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Coverage+Modifications
  - Concepts/Limited+Expected+Value
  - Concepts/Pareto+Distribution
  - Concepts/Coinsurance
  - Concepts/Short-Term+Insurance+Coverage
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e0b56e467b1b26592d992cbae8d58aaf93a5a676cbaad2a87d13fb2d94382270
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-033.md
---

Annual prescription drug costs are modeled by a Pareto distribution with $\theta = 2000$ and $\alpha = 2$.

A prescription drug plan pays annual drug costs for an insured member subject to the following provisions:

(i) The insured pays 100% of costs up to the ordinary annual deductible of 250.

(ii) The insured then pays 25% of the costs between 250 and 2250.

(iii) The insured pays 100% of the costs above 2250 until the insured has paid 3600 in total.

(iv) The insured then pays 5% of the remaining costs.

Calculate the expected annual plan payment.

- A) 1120
- B) 1140
- C) 1160
- D) 1180
- E) 1200

## Explanation

$$\begin{align*}
E(X \wedge x) &= \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha - 1}\right] \\
&= \frac{2000}{1}\left[1 - \frac{2000}{x + 2000}\right] \\
&= \frac{2000x}{x + 2000}
\end{align*}$$

| $x$ | $E(X \wedge x)$ |
|---|---|
| $\infty$ | 2000 |
| 250 | 222 |
| 2250 | 1059 |
| 5100 | 1437 |

$$\begin{align*}
&0.75[E(X \wedge 2250) - E(X \wedge 250)] + 0.95[E(X) - E(X \wedge 5100)] \\
&= 0.75(1059 - 222) + 0.95(2000 - 1437) \\
&= 1162.6
\end{align*}$$

The 5100 breakpoint was determined by when the insured's share reaches 3600:

$$3600 = 250 + 0.25(2250 - 250) + (5100 - 2250)$$

The answer is **C**.
