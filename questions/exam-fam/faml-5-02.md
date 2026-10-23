---
id: "faml-5-02"
exam: "Exam FAM"
topic: "Life Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Annuity
  - Concepts/Endowment+Insurance
  - Concepts/Pure+Endowment
  - Concepts/Annuity+Immediate
  - Concepts/Expected+Value
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:68da1d05eb34c329cfd2de8d4720a25bb119169cf2a78ab7bff1d04ac190f278
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.2, p.41 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.2, p.28 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-02.md
---

You are given:

(i) $A_{x} = 0.30$

(ii) $A_{x+n} = 0.40$

(iii) $A_{x:\overline{n}|}^{\ \ 1} = 0.35$

(iv) $i = 0.05$

Calculate $a_{x:\overline{n}|}$.

[Question 1 on the Fall 2013 exam]

- A) 9.3
- B) 9.6
- C) 9.8
- D) 10.0
- E) 10.3

## Explanation

$$A_{x:\overline{n}|}^{\ \ 1} = {}_{n}E_{x}$$

$$\begin{align*}
A_{x} &= A^{1}_{x:\overline{n}|} + {}_{n}E_{x}\,A_{x+n} \\
0.3 &= A^{1}_{x:\overline{n}|} + (0.35)(0.4) \\
\Rightarrow A^{1}_{x:\overline{n}|} &= 0.16
\end{align*}$$

$$\begin{align*}
A_{x:\overline{n}|} &= A^{1}_{x:\overline{n}|} + {}_{n}E_{x} \\
&= 0.16 + 0.35 \\
&= 0.51
\end{align*}$$

$$\begin{align*}
\ddot{a}_{x:\overline{n}|} &= \frac{1 - A_{x:\overline{n}|}}{d} \\
&= \frac{1 - 0.51}{(0.05/1.05)} \\
&= 10.29
\end{align*}$$

$$\begin{align*}
a_{x:\overline{n}|} &= \ddot{a}_{x:\overline{n}|} - 1 + {}_{n}E_{x} \\
&= 10.29 - 0.65 \\
&= 9.64
\end{align*}$$

The answer is **B**.
