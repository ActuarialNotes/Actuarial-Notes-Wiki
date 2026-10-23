---
id: "faml-6-40"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Recursion
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:ba5502b3df0724b862542fed17d0a9479500bc18204067460b5e9d16fe2d69fe
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.40, p.80, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.40, p.55, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-40.md
---

For a special fully discrete whole life insurance, you are given:

(i) The death benefit is $1000(1.03)^{k}$ for death in policy year $k$, for $k = 1, 2, 3...$

(ii) $q_{x} = 0.05$

(iii) $i = 0.06$

(iv) $\ddot{a}_{x+1} = 7.00$

(v) The annual net premium for this insurance at issue age $x$ is 110

Calculate the annual net premium for this insurance at issue age $x + 1$.

[Question 17 on the Spring 2016 exam]

- A) 110
- B) 112
- C) 116
- D) 120
- E) 122

## Explanation

Let $P$ be the annual net premium at $x+1$. Also, let $A^{*}_{y}$ be the expected present value for the special insurance described in the problem issued to $(y)$.

$$P\ddot{a}_{x+1} = 1000\sum_{k=0}^{\infty}(1.03)^{k+1}v^{k+1}\,{}_{k|}q_{x+1} = 1000A^{*}_{x+1}$$

We are given

$$110\ddot{a}_{x} = 1000\sum_{k=0}^{\infty}(1.03)^{k+1}v^{k+1}\,{}_{k|}q_{x} = 1000A^{*}_{x}$$

Which implies that

$$110\left(1 + vp_{x}\ddot{a}_{x+1}\right) = 1000\left(1.03vq_{x} + 1.03vp_{x}A^{*}_{x+1}\right)$$

Solving for $A^{*}_{x+1}$, we get

$$\begin{align*}
A^{*}_{x+1} &= \frac{\dfrac{110}{1000}\left[1 + v(0.95)(7)\right] - 1.03v(0.05)}{1.03v(0.95)} \\
&= 0.8141032
\end{align*}$$

Thus, we have

$$\begin{align*}
P &= \frac{1000(0.8141032)}{7} \\
&= 116.3005
\end{align*}$$

The answer is **C**.
