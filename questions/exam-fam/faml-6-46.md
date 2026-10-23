---
id: "faml-6-46"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Deferred+Annuity
  - Concepts/Annuity+Due
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:969048c0f9619a68e2b6f82275dc4f6217a0f9d08211b0638b74e293d6b0adf8
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.46, p.85, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.46, p.58, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-46.md
---

For a special 10-year deferred whole life annuity-due of 300 per year issued to (55), you are given:

(i) Annual premiums are payable for 10 years

(ii) If death occurs during the deferral period, all premiums paid are returned without interest at the end of the year of death

(iii) $\ddot{a}_{55} = 12.2758$

(iv) $\ddot{a}_{55:\overline{10}|} = 7.4575$

(v) $(IA)^{1}_{55:\overline{10}|} = 0.51213$

Calculate the level net premium.

[Question 7 on the Fall 2017 exam]

- A) 195
- B) 198
- C) 201
- D) 204
- E) 208

## Explanation

Let $P$ be the premium per 1 of insurance (as printed).

$$P\ddot{a}_{55:\overline{10}|} = 0.51213P + v^{10}\,{}_{10}p_{55}\,\ddot{a}_{65}$$

$$\begin{align*}
\ddot{a}_{55} &= \ddot{a}_{55:\overline{10}|} + v^{10}\,{}_{10}p_{55}\,\ddot{a}_{65} \\
\Rightarrow v^{10}\,{}_{10}p_{55}\,\ddot{a}_{65} &= 12.2758 - 7.4575 \\
&= 4.8183
\end{align*}$$

$$\begin{align*}
7.4575P &= 0.51213P + 4.8183 \\
\Rightarrow P &= 0.693742738
\end{align*}$$

$$300P = 208.12$$

The answer is **E**.
