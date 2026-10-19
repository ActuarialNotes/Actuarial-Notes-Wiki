---
id: "faml-7-22"
exam: "Exam FAM"
topic: "Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Loss+Random+Variable
  - Concepts/Variance
  - Concepts/Whole+Life+Insurance
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8c56ae2218259bd21f5c51bb55041f2d0b17cdb6af7e2ac1e5a491d4a7f5e5ac
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-22.md
---

For two fully discrete whole life insurance policies on (*x*), you are given:

(i)

|  | Death Benefit | Annual Net Premium | Variance of Loss at Issue |
|---|---|---|---|
| Policy 1 | 8 | 1.250 | 20.55 |
| Policy 2 | 12 | 1.875 | *W* |

(ii) $i = 0.06$

(iii) The two policies are priced using the same mortality table.

Calculate *W*.

[Question 12 on the Spring 2016 exam]

- A) 30.8
- B) 38.5
- C) 46.2
- D) 53.9
- E) 61.6

## Explanation

$$\begin{align*}
V\left[L_{0}\,\#1\right] &= \left(B_{1} + \frac{P_{1}}{d}\right)^{2}\left({}^2A_{x} - A_{x}^{2}\right) \\
                         &= 20.55 \\
\Longrightarrow\quad &\left(8 + \frac{1.25(1.06)}{0.06}\right)^{2}\left({}^2A_{x} - A_{x}^{2}\right) = 20.55
\end{align*}$$

$$\begin{align*}
{}^2A_{x} - A_{x}^{2} &= \frac{20.55}{\left(8 + \dfrac{1.25(1.06)}{0.06}\right)^{2}} \\
&= 0.0227
\end{align*}$$

$$\begin{align*}
V\left[L_{0}\,\#2\right] &= \left(12 + \frac{1.875(1.06)}{0.06}\right)^{2}\left({}^2A_{x} - A_{x}^{2}\right) \\
&= \left(12 + \frac{1.875(1.06)}{0.06}\right)^{2}(0.0227) \\
&= 46.24
\end{align*}$$

The answer is **C**.
