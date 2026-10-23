---
id: "faml-6-10"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c23bfee8c463209960038f68770c0b597977884c2f6333588a72ca576206a572
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.10, p.57, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.10, p.39, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-10.md
---

For a fully discrete 3-year term insurance of 1000 on $(x)$, you are given:

(i) $p_{x} = 0.975$

(ii) $i = 0.06$

(iii) The actuarial present value of the death benefit is 152.85

(iv) The annual net premium is 56.05

Calculate $p_{x+2}$.

[A modified version of Question 15 on the Fall 2013 exam]

- A) 0.88
- B) 0.89
- C) 0.90
- D) 0.91
- E) 0.92

## Explanation

$$\begin{align*}
\ddot{a}_{x:\overline{3}|} &= \frac{\text{Actuarial PV of the benefit}}{\text{Level Annual Premium}} \\
&= \frac{152.85}{56.05} \\
&= 2.727
\end{align*}$$

$$\begin{align*}
\ddot{a}_{x:\overline{3}|} = 1 + \frac{0.975}{1.06} + \frac{0.975\left(p_{x+1}\right)}{(1.06)^{2}} &= 2.727 \\
\Rightarrow p_{x+1} &= 0.93
\end{align*}$$

Actuarial PV of the benefit =

$$\begin{align*}
152.85 &= 1{,}000\left[\frac{0.025}{1.06} + \frac{0.975(1-0.93)}{(1.06)^{2}} + \frac{0.975(0.93)\left(q_{x+2}\right)}{(1.06)^{3}}\right] \\
\Rightarrow q_{x+2} &= 0.09 \\
\Rightarrow p_{x+2} &= 0.91
\end{align*}$$

The answer is **D**.
