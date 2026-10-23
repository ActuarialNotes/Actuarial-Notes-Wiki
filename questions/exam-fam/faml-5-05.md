---
id: "faml-5-05"
exam: "Exam FAM"
topic: "Annuity Due"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Annuity+Due
  - Concepts/Extra+Risk
  - Concepts/Life+Table
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2d93c689e026e5ace9d240ea31f1b52271aaa73150ca94395831f40d4c972c12
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.5, p.44 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.5, p.29 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-05.md
---

For an annuity-due that pays 100 at the beginning of each year that (45) is alive, you are given:

(i) Mortality for standard lives follows the Standard Ultimate Life Table

(ii) The force of mortality for standard lives age $45+t$ is represented as $\mu_{45+t}^{SULT}$

(iii) The force of mortality for substandard lives age $45+t$, $\mu_{45+t}^{S}$, is defined as:

$$\mu_{45+t}^{S} = \begin{cases} \mu_{45+t}^{SULT} + 0.05, & \text{for } 0 \le t < 1 \\ \mu_{45+t}^{SULT}, & \text{for } t \ge 1 \end{cases}$$

(iv) $i = 0.05$

Calculate the actuarial present value of this annuity for a substandard life age 45.

[A modified version of Question 4 on the Fall 2017 exam]

- A) 1700
- B) 1710
- C) 1720
- D) 1730
- E) 1740

## Explanation

$$\ddot{a}_{45}^{S} = 1 + v\,p_{45}^{S}\,\ddot{a}_{46}^{SULT}$$

$$\begin{align*}
p_{45}^{S} &= e^{-\int_{0}^{1}\mu_{45+t}^{S}\,dt} \\
&= e^{-\int_{0}^{1}(\mu_{45+t}^{SULT} + 0.05)\,dt} \\
&= e^{-\int_{0}^{1}(\mu_{45+t}^{SULT})\,dt}\,e^{-\int_{0}^{1}(0.05)\,dt} \\
&= p_{45}^{SULT} \cdot e^{-0.05} \\
&= \left(\frac{98{,}957.6}{99{,}033.9}\right)e^{-0.05} \\
&= 0.9504966
\end{align*}$$

$$\begin{align*}
\ddot{a}_{45}^{S} &= 1 + v\,p_{45}^{S}\,\ddot{a}_{46}^{SULT} \\
&= 1 + (1.05)^{-1}(0.9504966)(17.6706) \\
&= 17.00
\end{align*}$$

$$100\,\ddot{a}_{45}^{S} = 1700$$

The answer is **A**.
