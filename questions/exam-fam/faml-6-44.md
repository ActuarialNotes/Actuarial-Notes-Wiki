---
id: "faml-6-44"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Pure+Endowment
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:122832d0417f008c92697bfc8993acacfc1b418e1c212bf57c4c363ffe604f8a
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.44, p.83, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.44, p.57, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-44.md
---

For a special fully discrete 10-year deferred whole life insurance of 100 on (50), you are given:

(i) Premiums are payable annually, at the beginning of each year, only during the deferral period

(ii) For deaths during the deferral period, the benefit is equal to the return of all premiums paid, without interest

(iii) $i = 0.05$

(iv) $\ddot{a}_{50} = 17.0$

(v) $\ddot{a}_{60} = 15.0$

(vi) $_{10}E_{50} = 0.60$

(vii) $(IA)^{1}_{50:\overline{10}|} = 0.15$

Calculate the annual net premium for this insurance.

[Question 7 on the Spring 2017 exam]

- A) 1.3
- B) 1.6
- C) 1.9
- D) 2.2
- E) 2.5

## Explanation

Let $P$ be the premium per 1 of insurance.

$$P\ddot{a}_{50:\overline{10}|} = P(IA)^{1}_{50:\overline{10}|} + {}_{10}E_{50}A_{60}$$

$$\begin{align*}
\ddot{a}_{50:\overline{10}|} &= \ddot{a}_{50} - {}_{10}E_{50}\,\ddot{a}_{60} \\
&= 17.0 - 0.60 \times 15.0 \\
&= 8
\end{align*}$$

$$\begin{align*}
A_{60} &= 1 - d\ddot{a}_{60} \\
&= 1 - \left(\frac{0.05}{1.05}\right)15 \\
&= 0.285714
\end{align*}$$

$$P\left(\ddot{a}_{50:\overline{10}|} - (IA)^{1}_{50:\overline{10}|}\right) = {}_{10}E_{50}A_{60}$$

$$\begin{align*}
P &= \frac{{}_{10}E_{50}A_{60}}{\ddot{a}_{50:\overline{10}|} - (IA)^{1}_{50:\overline{10}|}} \\
&= \frac{0.6 \times 0.285714}{8 - 0.15} \\
&= 0.021838
\end{align*}$$

$$100P = 2.18$$

The answer is **D**.
