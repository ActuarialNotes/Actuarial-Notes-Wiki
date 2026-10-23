---
id: "faml-6-11"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Whole+Life+Insurance
  - Concepts/Extra+Risk
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c51d63cb15cadb5908443b98e8d32f9b7ad6623593073052165a522fe1d4bbaf
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.11, p.58, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.11, p.39, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-11.md
---

For fully discrete whole life insurances of 1 issued on lives age 50, the annual net premium, $P$, was calculated using the following:

(i) $q_{50} = 0.0048$

(ii) $i = 0.04$

(iii) $A_{51} = 0.39788$

A particular life has a first-year mortality rate 10 times the rate used to calculate $P$. The mortality rates for all other years are the same as the ones used to calculate $P$.

Calculate the expected present value of the loss at issue random variable for this life, based on the premium $P$.

[A modified version of Question 16 on the Fall 2013 exam]

- A) 0.025
- B) 0.033
- C) 0.041
- D) 0.049
- E) 0.057

## Explanation

For calculating $P$

$$\begin{align*}
A_{50} &= vq_{50} + vp_{50}A_{51} \\
&= v(0.0048) + v(1-0.0048)(0.39788) \\
&= 0.38536
\end{align*}$$

$$\begin{align*}
\ddot{a}_{50} &= \left(1 - A_{50}\right)/d \\
&= 15.981
\end{align*}$$

$$\begin{align*}
P &= A_{50}/\ddot{a}_{50} \\
&= 0.02411
\end{align*}$$

For this particular life,

$$\begin{align*}
A'_{50} &= vq'_{50} + vp'_{50}A_{51} \\
&= v(0.048) + (1-0.048)(0.39788) \text{ (as printed)} \\
&= 0.41037
\end{align*}$$

$$\begin{align*}
\ddot{a}'_{50} &= \left(1 - A'_{50}\right)/d \\
&= 15.330
\end{align*}$$

$$\begin{align*}
\text{Expected PV of loss} &= A'_{50} - P\ddot{a}'_{50} \\
&= 0.41037 - 0.02411(15.330) \\
&= 0.0408
\end{align*}$$

The answer is **C**.
