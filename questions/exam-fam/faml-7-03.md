---
id: "faml-7-03"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
  - Concepts/Expenses
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:39776df325facfda0b77198127b3f737f699c846b1df33ce90ba73b050a3bf5e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-03.md
---

For a whole life insurance of 1000 with semi-annual premiums on (80), you are given:

(i) A gross premium of 60 is payable every 6 months starting at age 80

(ii) Commissions of 10% are paid each time a premium is paid

(iii) Death benefits are paid at the end of the quarter of death

(iv) $_{t}V$ denotes the gross premium policy value at time $t$, $t \geq 0$

(v) $_{10.75}V = 753.72$

(vi)

| $t$ | $l_{90+t}$ |
|---|---|
| 0 | 1000 |
| 0.25 | 898 |
| 0.50 | 800 |
| 0.75 | 706 |

(vii) $i^{(4)} = 0.08$

Calculate $_{10.25}V$.

[A modified version of Question 17 on the Fall 2012 exam]

- A) 680
- B) 690
- C) 700
- D) 710
- E) 730

## Explanation

$i^{(4)} = 0.08$ means an interest rate of $j = 0.02$ per quarter. This problem can be done with two quarterly recursions or a single calculation.

Using two recursions:

$${}_{10.75}V = \frac{[{}_{10.5}V + 60(1 - 0.1)](1.02) - \dfrac{800 - 706}{800}(1000)}{\dfrac{706}{800}}$$

$$\begin{align*}
753.72 &= \frac{[{}_{10.5}V + 54](1.02) - 117.50}{0.8825} \\
\Rightarrow {}_{10.5}V &= 713.31
\end{align*}$$

$$\begin{align*}
{}_{10.5}V &= \frac{[{}_{10.25}V](1.02) - \dfrac{898 - 800}{898}(1000)}{\dfrac{800}{898}} \\
\Rightarrow 713.31 &= \frac{[{}_{10.25}V](1.02) - 109.13}{0.8909}
\end{align*}$$

$${}_{10.25}V = 730.02$$

Using a single step, ${}_{10.25}V$ is the $EPV$ of cash flows through time 10.75 plus ${}_{0.5}E_{80.25}$ times the $EPV$ of cash flows thereafter (that is, ${}_{10.75}V$).

$$\begin{align*}
{}_{10.25}V &= (1000)\left[\frac{898 - 800}{898(1.02)} + \frac{800 - 706}{898(1.02)^{2}}\right] - (60)(1 - 0.1)\left[\frac{800}{898(1.02)}\right] + \left[\frac{706}{898(1.02)^{2}}\right](753.72) \\
&= 730
\end{align*}$$

The answer is **E**.
