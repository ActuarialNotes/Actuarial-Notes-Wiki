---
id: "faml-4-20"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Variance
  - Concepts/Force+of+Interest
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:36f3a42f34e3862e0bbd1b12933fcf5e309583ac2650140f83b2f49a3b883cdf
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.20, p.39 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.20, p.26 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-20.md
---

For a special fully continuous whole life insurance on $(x)$, you are given:

i) $\mu_{x+t} = 0.03, t \ge 0$

ii) $\delta = 0.06$

iii) The death benefit at time $t$ is $b_{t} = e^{0.05t}, t \ge 0$

iv) $Z$ is the present value random variable at issue for this insurance

Calculate Var($Z$).

[Question on October 2022 FAM-L Exam]

- A) 0.0300
- B) 0.0325
- C) 0.0350
- D) 0.0375
- E) 0.0400

## Explanation

$$\begin{align*}
E(Z) &= \int_{0}^{\infty} {}_{t}p_{x} \times \mu \times e^{0.05 \times t}e^{-\delta \times t}\,dt \\
&= \int_{0}^{\infty} e^{-0.03 \times t} \times 0.03 \times e^{0.05 \times t}e^{-0.06 \times t}\,dt \\
&= \frac{0.03}{0.04} \times e^{-0.04t}\Big|_{0}^{\infty} \\
&= 0.75
\end{align*}$$

$$\begin{align*}
E(Z^{2}) &= \int_{0}^{\infty} {}_{t}p_{x} \times \mu \times e^{0.05 \times 2 \times t}e^{-\delta \times 2 \times t}\,dt \\
&= \int_{0}^{\infty} e^{-0.03 \times t} \times 0.03 \times e^{0.05 \times 2 \times t}e^{-0.06 \times 2 \times t}\,dt \\
&= \frac{0.03}{0.04}\text{ (as printed)} \times e^{-0.05t}\Big|_{0}^{\infty} \\
&= 0.6
\end{align*}$$

$$\begin{align*}
Var(Z) &= E(Z^{2}) - [E(Z)]^{2} \\
&= 0.6 - 0.75^{2} \\
&= 0.375\text{ (as printed)}
\end{align*}$$

The answer is **D**.
