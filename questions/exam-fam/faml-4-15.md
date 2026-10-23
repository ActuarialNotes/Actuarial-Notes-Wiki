---
id: "faml-4-15"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Variance
  - Concepts/Force+of+Interest
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:30b47f99c44d9dc0ea93942021d9fda939c6e57efc7190c101f0a82fa8b162aa
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.15, p.35 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.15, p.24 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-15.md
---

For a special whole life insurance on $(x)$, you are given:

(i) Death benefits are payable at the moment of death

(ii) The death benefit at time $t$ is $b_{t} = e^{0.02t}$, for $t \ge 0$

(iii) $\mu_{x+t} = 0.04$, for $t \ge 0$

(iv) $\delta = 0.06$

(v) $Z$ is the present value at issue random variable for this insurance

Calculate $Var(Z)$.

[Question 4 on the Fall 2016 exam]

- A) 0.020
- B) 0.036
- C) 0.052
- D) 0.068
- E) 0.083

## Explanation

$$\begin{align*}
E[Z] &= \int_{0}^{\infty} b_{t} \cdot v^{t} \cdot {}_{t}p_{x} \cdot \mu_{x+t}\,dt \\
&= \int_{0}^{\infty} e^{0.02t} \cdot e^{-0.06t} \cdot e^{-0.04t} \cdot 0.04\,dt \\
&= 0.04\int_{0}^{\infty} e^{-0.08t}\,dt \\
&= \frac{0.04}{0.08} \\
&= \frac{1}{2}
\end{align*}$$

$$\begin{align*}
E[Z^{2}] &= \int_{0}^{\infty} \left(b_{t} \cdot v^{t}\right)^{2} \cdot {}_{t}p_{x} \cdot \mu_{x+t}\,dt \\
&= \int_{0}^{\infty} \left(e^{0.04t}\right)\left(e^{-0.12t}\right)\left(0.04e^{-0.04}\right)\text{ (as printed)}\,dt \\
&= \frac{0.04}{0.12} \\
&= \frac{1}{3}
\end{align*}$$

$$\begin{align*}
Var[Z] &= \frac{1}{3} - \left(\frac{1}{2}\right)^{2} \\
&= \frac{1}{12} \\
&= 0.0833
\end{align*}$$

The answer is **E**.
