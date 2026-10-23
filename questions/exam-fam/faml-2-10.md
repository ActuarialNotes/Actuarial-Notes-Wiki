---
id: "faml-2-10"
exam: "Exam FAM"
topic: "Survival Model"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Survival+Model
  - Concepts/Hazard+Rate
  - Concepts/Life+Table
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:eb5f634f948f6f95880d8f43f603c884a542acffcb4ddef6641419d20fab9246
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.10, p.10 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.10, p.8 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-10.md
---

You are given:

i) $\mu_{x+t} = \beta t^{2}$, $t \ge 0$

ii) $l_{x} = 1000$

iii) $l_{x+10} = 400$

Calculate $1000\beta$.

[Question on October 2022 FAM-L Exam]

- A) 2.75
- B) 2.80
- C) 2.85
- D) 2.90
- E) 2.95

## Explanation

$${}_{10}p_{x} = \frac{l_{x+10}}{l_{x}} = e^{-\int_{0}^{10}\mu_{x+t}\,dt}$$

$$\Longrightarrow \frac{400}{1000} = e^{-\int_{0}^{10}\beta t^{2}\,dt} \Longrightarrow 0.4 = e^{-\beta t^{3}/3\,\big|_{0}^{10}}$$

$$\Longrightarrow 0.4 = e^{-\beta \cdot 10^{3}/3} \Longrightarrow \ln(0.4) = -\beta\left(\frac{1000}{3}\right)$$

$$\begin{align*}
\Longrightarrow \beta &= -\ln(0.4)(.003) \\
&= 0.0027489
\end{align*}$$

The answer is **A**.
