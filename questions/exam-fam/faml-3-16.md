---
id: "faml-3-16"
exam: "Exam FAM"
topic: "Life Table"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Table
  - Concepts/Fractional+Age+Assumption
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d8a28d6fbf6dcc14247cae06b5957819c4b8c5f17d44ec16d07f6eade257d4dc
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.16, p.24 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.16, p.16 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-16.md
---

You are given:

(i) The following extract from a three-year select and ultimate table:

| $[x]$ | $q_{[x]}$ | $q_{[x]+1}$ | $q_{[x]+2}$ | $q_{x+3}$ | $x+3$ |
|---|---|---|---|---|---|
| 50 | 0.020 | 0.031 | 0.043 | 0.056 | 53 |
| 51 | 0.025 | 0.037 | 0.050 | 0.065 | 54 |
| 52 | 0.030 | 0.043 | 0.057 | 0.072 | 55 |
| 53 | 0.035 | 0.049 | 0.065 | 0.091 | 56 |
| 54 | 0.040 | 0.055 | 0.076 | 0.113 | 57 |
| 55 | 0.045 | 0.061 | 0.090 | 0.140 | 58 |

(ii) Mortality follows a uniform distribution of deaths over each year of age

Calculate $1000\left({}_{0.6|1.5}q_{[52]+1.7}\right)$.

[Question on October 2022 FAM-L Exam]

- A) 91
- B) 92
- C) 93
- D) 94
- E) 95

## Explanation

| $[x]$ | $q_{[x]}$ | $q_{[x]+1}$ | $q_{[x]+2}$ | $q_{x+3}$ | $x+3$ |
|---|---|---|---|---|---|
| 52 | 0.030 | 0.043 | 0.057 | 0.072 | 55 |

$$\begin{align*}
1000\left({}_{0.6|1.5}q_{[52]+1.7}\right) &= 1000\,\frac{l_{[52]+2.3} - l_{[52]+3.8}}{l_{[52]+1.7}}
\end{align*}$$

$l_{[52]} = 1000$ (arbitrary, for convenience; any other value would work and give the same answer)

$$\begin{align*}
l_{[52]+1} &= 1000(1 - 0.03) \\
&= 970 \\
l_{[52]+2} &= 970(1 - 0.043) \\
&= 928.29 \\
l_{55} &= 928.29(1 - 0.057) \\
&= 875.3775 \\
l_{56} &= 875.3775(1 - 0.072) \\
&= 812.3503 \\
l_{[52]+2.3} &= (0.7)l_{[52]+2} + (0.3)l_{55} \\
&= 912.42 \\
l_{[52]+3.8} = l_{55.8} &= (0.2)l_{55} + (0.8)l_{56} \\
&= 824.96 \\
l_{[52]+1.7} &= (0.3)l_{[52]+1} + (0.7)l_{[52]+2} \\
&= 940.80
\end{align*}$$

$$\begin{align*}
1000\left({}_{0.6|1.5}q_{[52]+1.7}\right) &= 1000\,\frac{912.42 - 824.96}{940.80} \\
&= 92.96
\end{align*}$$

The answer is **C**.
