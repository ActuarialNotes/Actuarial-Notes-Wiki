---
id: "faml-7-26"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
  - Concepts/Endowment+Insurance
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9308fef672d6aacfa05f8e6c3af5cd09dfcdea50bbc497d588646c1d32dedc7a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-26.md
---

For a special fully discrete 2-year endowment insurance on (*x*), you are given:

(i) The death benefit for year *k* is 25,000*k* plus the net premium policy value at the end of year *k*, for $k = 1, 2$. For year 2, this net premium policy value is the net premium policy value just before the maturity benefit is paid

(ii) The maturity benefit is 50,000

(iii) $p_{x} = p_{x+1} = 0.85$

(iv) $i = 0.05$

(v) *P* is the level annual net premium

Calculate *P*.

[A modified version of Question 13 on the Fall 2016 exam]

- A) 27,650
- B) 27,960
- C) 28,200
- D) 28,540
- E) 28,730

## Explanation

$$\begin{align*}
{}_{1}V &= \left({}_{0}V + P\right)(1+i) - \left(25{,}000 + {}_{1}V - {}_{1}V\right)q_{x} \\
&= P(1+i) - (25{,}000)q_{x}
\end{align*}$$

$$\begin{align*}
{}_{2}V &= \left({}_{1}V + P\right)(1+i) - \left(50{,}000 + {}_{2}V - {}_{2}V\right)q_{x+1} \\
&= 50{,}000
\end{align*}$$

$$\begin{align*}
\left(\left(P(1+i) - 25{,}000q_{x}\right) + P\right)(1+i) - 50{,}000q_{x+1} &= 50{,}000 \\
\left(\left(P(1.05) - 25{,}000(0.15)\right) + P\right)(1.05) - 50{,}000(0.15) &= 50{,}000
\end{align*}$$

Solving for $P$, we get

$$\begin{align*}
P &= \frac{61{,}437.50}{2.1525} \\
&= 28{,}542.39
\end{align*}$$

The answer is **D**.
