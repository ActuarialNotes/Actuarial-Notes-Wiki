---
id: "faml-4-18"
exam: "Exam FAM"
topic: "Percentile"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Percentile
  - Concepts/Present+Value
  - Concepts/Future+Lifetime+Random+Variable
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:e4f5a9242bb44689582ad6ccc2a48ae64114536b8d9cc309f8c18f60e2471c00
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.18, p.38 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.18, p.26 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-18.md
---

You are given that $T$, the time to first failure of an industrial robot, has a density $f(t)$ given by

$$f(t) = \begin{cases} 0.1, & 0 \le t < 2 \\ 0.4t^{-2}, & 2 \le t < 10 \end{cases}$$

with $f(t)$ undetermined on $[10, \infty)$.

Consider a supplemental warranty on this robot that pays 100,000 at the time $T$ of its first failure if $2 \le T \le 10$, with no benefits payable otherwise.

You are also given that $\delta = 5\%$.

Calculate the 90th percentile of the present value of the future benefits under this warranty.

[Question 5 on the Spring 2017 exam]

- A) 82,000
- B) 84,000
- C) 87,000
- D) 91,000
- E) 95,000

## Explanation

The present value random variable $\text{PV} = 1{,}000{,}000e^{-0.05T}$ (as printed), $2 \le T \le 10$ is a decreasing function of $T$ so that its 90th percentile is

$1{,}000{,}000e^{-0.05p}$ where $p$ is the solution to $\displaystyle\int_{2}^{p} 0.4t^{-2}\,dt = 0.10$.

$$\begin{align*}
\int_{2}^{p} 0.4t^{-2}\,dt &= -0.4\left(\frac{t^{-1}}{-1}\right)\Bigg|_{2}^{p} \\
&= 0.4\left(\frac{1}{2} - \frac{1}{p}\right) \\
&= 0.10 \\
p &= 4
\end{align*}$$

$$\begin{align*}
1{,}000{,}000e^{-0.05 \times 4} &= 81{,}873.08
\end{align*}$$

The answer is **A**.
