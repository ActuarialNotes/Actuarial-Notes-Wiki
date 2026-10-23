---
id: "faml-7-17"
exam: "Exam FAM"
topic: "Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Loss+Random+Variable
  - Concepts/Variance
  - Concepts/Policy+Value
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:11028a0d961811759307f6c8674183db1bcdef064e0e33d4544b75ec3fdd4f5d
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.17, p.106, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.17, p.73, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-17.md
---

For a fully discrete whole life insurance of 1 on ($x$), you are given:

(i) $q_{x+10} = 0.02067$

(ii) $v^{2} = 0.90703$

(iii) $A_{x+11} = 0.52536$

(iv) ${}^{2}A_{x+11} = 0.30783$

(v) $_{k}L$ is the prospective loss random variable at time $k$

Calculate $\dfrac{\text{Var}({}_{10}L)}{\text{Var}({}_{11}L)}$.

[Question 16 on the Fall 2014 exam]

- A) 1.006
- B) 1.010
- C) 1.014
- D) 1.018
- E) 1.022

## Explanation

$$\frac{V[{}_{10}L]}{V[{}_{11}L]} = \frac{\left(1 + \dfrac{p}{d}\right)^{2}\left({}^{2}A_{x+10} - A_{x+10}^{2}\right)}{\left(1 + \dfrac{p}{d}\right)^{2}\left({}^{2}A_{x+11} - A_{x+11}^{2}\right)}\text{ (as printed)}$$

$$\begin{align*}
A_{x+10} &= vq_{x+10} + vp_{x+10}\,A_{x+11} \\
&= (0.90703)^{1/2}(0.02067) + (0.90703)^{1/2}(1 - 0.02067)(0.52536) \\
&= 0.50969
\end{align*}$$

$$\begin{align*}
{}^{2}A_{x+10} &= v^{2}q_{x+10} + v^{2}p_{x+10}\,{}^{2}A_{x+11} \\
&= (0.90703)(0.02067) + (0.90703)(1 - 0.02067)(0.30783) \\
&= 0.29219
\end{align*}$$

$$\begin{align*}
\Rightarrow \frac{\text{Var}({}_{k}L)}{\text{Var}({}_{k+1}L)} &= \frac{(0.29219) - (0.50969)^{2}}{(0.30783) - (0.52536)^{2}} \\
&= \frac{0.03241}{0.03183} \\
&= 1.018
\end{align*}$$

The answer is **D**.
