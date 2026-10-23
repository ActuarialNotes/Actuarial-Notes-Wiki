---
id: "faml-2-11"
exam: "Exam FAM"
topic: "Fractional Age Assumption"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:0cb438dc5f66f4a3c2859c84d2f1ff7dd7f6fe0a1d7e6427218de235e8c399c7
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.11, p.11 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.11, p.8 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-11.md
---

You are given:

i) $q_{80} = 0.04$

ii) $q_{81} = 0.06$

iii) $q_{82} = 0.08$

iv) Deaths between ages 80 and 81 are uniformly distributed

v) Deaths between ages 81 and 82 are subject to a constant force of mortality

Calculate the probability that a person aged 80.6 will die between ages 81.1 and 81.6.

[Question on October 2022 FAM-L Exam]

- A) 0.0294
- B) 0.0296
- C) 0.0298
- D) 0.0300
- E) 0.0302

## Explanation

Let $l_{80} = 1000 \Rightarrow l_{81} = 960 \Rightarrow l_{82} = 902.4$

$$\begin{align*}
\text{Answer} &= \frac{l_{81.1} - l_{81.6}}{l_{80.6}} \\
&= \frac{(960)^{0.9}(902.4)^{0.1} - (960)^{0.4}(902.4)^{0.6}}{(0.4)(1000) + (0.6)(960)} \\
&= 0.02978
\end{align*}$$

The value for $l_{80}$ is arbitrary. Any other starting value gives the same result.

Another form for the survivors between 81 and 82 would be

$\mu = -\ln(902/960) = 0.0095833$ (as printed);

$l_{81.1} = 960 \times e^{-0.1 \times 0.0095833} = 959.08$ (as printed);

$l_{81.6} = 960 \times e^{-0.6 \times 0.0095833} = 954.496$ (as printed).

The answer is **C**.
