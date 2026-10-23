---
id: "faml-2-05"
exam: "Exam FAM"
topic: "Future Lifetime Random Variable"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Survival+Model
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:064962263e7c3bd2bb593da5894e8c963824fa4a86613207af88e8044451a664
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.5, p.8 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.5, p.6 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-05.md
---

You are given the following:

(i) $e_{40:\overline{20}|} = 18$

(ii) $e_{60} = 25$

(iii) $_{20}q_{40} = 0.2$

(iv) $q_{40} = 0.003$

Calculate $e_{41}$.

- A) 36.1
- B) 37.1
- C) 38.1
- D) 39.1
- E) 40.1

## Explanation

$$\begin{align*}
e_{40} &= e_{40:\overline{20}|} + {}_{20}p_{40} \cdot e_{60} \\
&= 18 + (1 - 0.2)(25) \\
&= 38
\end{align*}$$

$$e_{40} = e_{40:\overline{1}|} + p_{40} \cdot e_{41}$$

$$\begin{align*}
\Rightarrow e_{41} &= \frac{e_{40} - e_{40:\overline{1}|}}{p_{40}} \\
&= \frac{e_{40} - p_{40}}{p_{40}} \\
&= \frac{38 - 0.997}{0.997} \\
&= 37.11434
\end{align*}$$

The answer is **B**.
