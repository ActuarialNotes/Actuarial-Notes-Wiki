---
id: "faml-5-03"
exam: "Exam FAM"
topic: "Increasing Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Increasing+Annuity
  - Concepts/Continuous+Annuity
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:47b777c58f4b85ef099e5d935a24b2bea2fe25fa3879ab8388aacbe58205bf54
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.3, p.42 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.3, p.28 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-03.md
---

You are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) Deaths are uniformly distributed over each year of age

(iii) $i = 0.05$

Calculate $\dfrac{d}{dt}(\bar{I}\bar{a})_{40:\overline{t}|}$ at $t = 10.5$.

[A modified version of Question 19 on the Fall 2017 exam]

- A) 5.8
- B) 6.0
- C) 6.2
- D) 6.4
- E) 6.6

## Explanation

$$(\bar{I}\bar{a})_{40:\overline{t}|} = \int_{0}^{t} s\,{}_{s}p_{40}\,v^{s}\,ds \Rightarrow \frac{d(\bar{I}\bar{a})_{40:\overline{t}|}}{dt} = t\,{}_{t}p_{40}\,v^{t}$$

At $t = 10.5$,

$$\begin{align*}
10.5\,{}_{10.5}E_{40} &= 10.5\,{}_{10}p_{40}\,{}_{0.5}p_{50}\,v^{10.5} \\
&= 10.5\,{}_{10}E_{40}\,{}_{0.5}p_{50}\,v^{0.5} \\
&= 10.5 \times 0.60920 \times (1 - 0.5 \times 0.001209)(0.975900073) \\
&= 6.239
\end{align*}$$

The answer is **C**.
