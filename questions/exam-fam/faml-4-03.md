---
id: "faml-4-03"
exam: "Exam FAM"
topic: "Endowment Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Endowment+Insurance
  - Concepts/Interest+Rate
  - Concepts/Interest
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c2ae91ee4f1f9b7446c99eaa1930242d949d00d02721b11dde1535db678fe16d
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.3, p.27 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.3, p.19 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-03.md
---

You are given:

(i) $q_{60} = 0.01$

(ii) Using $i = 0.05$, $A_{60:\overline{3}|} = 0.86545$

Using $i = 0.045$ calculate $A_{60:\overline{3}|}$.

[Question 7 on the Spring 2013 exam]

- A) 0.866
- B) 0.870
- C) 0.874
- D) 0.878
- E) 0.882

## Explanation

$$\begin{align*}
A_{60:\overline{3}|} &= q_{60}v + (1 - q_{60})q_{60+1}v^{2} + (1 - q_{60})(1 - q_{60+1})v^{3} \\
&= 0.86545
\end{align*}$$

$$\begin{align*}
q_{60+1} &= \frac{A_{60:\overline{3}|} - q_{60}v - (1 - q_{60})v^{3}}{(1 - q_{60})v^{2} - (1 - q_{60})v^{3}} \\
&= \frac{0.86545 - \dfrac{0.01}{1.05} - \dfrac{0.99}{1.05^{3}}}{\dfrac{0.99}{1.05^{2}} - \dfrac{0.99}{1.05^{3}}} \\
&= 0.017
\end{align*}$$

when $v = 1/1.05$.

The primes indicate calculations at 4.5% interest.

$$\begin{align*}
A'_{60:\overline{3}|} &= q_{60}v' + (1 - q_{60})q_{60+1}v'^{2} + (1 - q_{60})(1 - q_{60+1})v'^{3} \\
&= \frac{0.01}{1.045} + \frac{0.99(0.017)}{1.045^{2}} + \frac{0.99(0.983)}{1.045^{3}} \\
&= 0.87777
\end{align*}$$

The answer is **D**.
