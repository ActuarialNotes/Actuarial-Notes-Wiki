---
id: "faml-2-01"
exam: "Exam FAM"
topic: "Future Lifetime Random Variable"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Survival+Model
  - Concepts/Hazard+Rate
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:6991b4d6a5d9b164fc31d01ffa0689539e98a8b7e19ae03f27115e6ea7f99303
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.1, p.5 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.1, p.3 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-01.md
---

You are given:

(i) $S_{0}(t) = \left(1 - \dfrac{t}{\omega}\right)^{\frac{1}{4}}$, for $0 \le t \le \omega$

(ii) $\mu_{65} = \dfrac{1}{180}$

Calculate $e_{106}$, the curtate expectation of life at age 106.

[Question 3 on the Fall 2012 exam]

- A) 2.2
- B) 2.5
- C) 2.7
- D) 3.0
- E) 3.2

## Explanation

Since $S_{0}(t) = 1 - F_{0}(t) = \left(1 - \dfrac{t}{\omega}\right)^{\frac{1}{4}}$, we have $\ln[S_{0}(t)] = \dfrac{1}{4}\ln\left[\dfrac{\omega - t}{\omega}\right]$.

Then $\mu_{t} = -\dfrac{d}{dt}\log S_{0}(t) = \dfrac{1}{4}\,\dfrac{1}{\omega - t}$, and $\mu_{65} = \dfrac{1}{180} = \dfrac{1}{4}\,\dfrac{1}{\omega - 65} \Rightarrow \omega = 110$.

$$e_{106} = \sum_{t=1}^{3} {}_{t}p_{106}, \quad \text{since } {}_{4}p_{106} = 0$$

$$\begin{align*}
{}_{t}p_{106} &= \frac{S_{0}(106+t)}{S_{0}(106)} \\
&= \frac{\left(1 - \frac{106+t}{110}\right)^{1/4}}{\left(1 - \frac{106}{110}\right)^{1/4}} \\
&= \left(\frac{4-t}{4}\right)^{1/4}
\end{align*}$$

$$\begin{align*}
e_{106} &= \sum_{i=1}^{i=4} {}_{t}p_{106}\text{ (as printed)} \\
&= \frac{1}{4^{0.25}}\left(1^{0.25} + 2^{0.25} + 3^{0.25}\right) \\
&= 2.4786
\end{align*}$$

The answer is **B**.
