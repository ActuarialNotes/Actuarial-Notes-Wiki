---
id: "faml-7-18"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Whole+Life+Insurance
  - Concepts/Annuity+Due
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:4ee24849d9f42026d4c09b45479f0f78b08f627cfbb1252e48bf1b3f78b78fda
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.18, p.106-107, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.18, p.74, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-18.md
---

For a fully discrete whole life insurance of 1 on (*x*), you are given:

(i) The net premium policy value at the end of the first year is 0.012

(ii) $q_{x} = 0.009$

(iii) $i = 0.04$

Calculate $\ddot{a}_{x}$.

[A modified version of Question 14 on the Spring 2015 exam]

- A) 17.1
- B) 17.6
- C) 18.1
- D) 18.6
- E) 19.1

## Explanation

$$\begin{align*}
{}_{1}V_{x} &= A_{x+1} - P_{x}\,\ddot{a}_{x+1} \\
&= 1 - d\,\ddot{a}_{x+1} - P_{x}\,\ddot{a}_{x+1} \\
&= 1 - \left(P_{x} + d\right)\ddot{a}_{x+1} \\
&= 1 - \frac{\ddot{a}_{x+1}}{\ddot{a}_{x}}
\end{align*}$$

$$\Rightarrow \ddot{a}_{x}\left(1 - {}_{1}V_{x}\right) = \ddot{a}_{x+1}$$

Since $\ddot{a}_{x} = 1 + v p_{x}\,\ddot{a}_{x+1}$, substituting we get

$$\ddot{a}_{x}\left(1 - {}_{1}V_{x}\right) = \frac{\ddot{a}_{x} - 1}{v p_{x}} \;\Rightarrow\; \ddot{a}_{x}\left(1 - {}_{1}V_{x}\right) v p_{x} = \ddot{a}_{x} - 1$$

Solving for $\ddot{a}_{x}$, we get

$$\begin{align*}
\ddot{a}_{x} &= \frac{1}{1 - \left(1 - {}_{1}V_{x}\right) v p_{x}} \\
&= \frac{1}{1 - (1 - 0.012)\left(\dfrac{1}{1.04}\right)(1 - 0.009)} \\
&= 17.07942
\end{align*}$$

The answer is **A**.
