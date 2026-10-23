---
id: "faml-7-14"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
  - Concepts/Expenses
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:18fedd2973feaa77b4dd02c0068ac9cf6278631732a07138ad13f7aaf63846f2
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.14, p.104, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.14, p.72, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-14.md
---

For a fully discrete whole life insurance of 100,000 on (45), you are given:

(i) The gross premium policy value at duration 5 is 5500 and at duration 6 is 7100

(ii) $q_{50} = 0.009$

(iii) $i = 0.05$

(iv) Renewal expenses at the start of each year are 50 plus 4% of the gross premium.

(v) Claim expenses are 200.

Calculate the gross premium.

[A modified version of Question 13 on the Fall 2014 exam]

- A) 2200
- B) 2250
- C) 2300
- D) 2350
- E) 2400

## Explanation

$$\begin{align*}
\left({}_{5}V + 0.96G - 50\right)(1.05) &= q_{50}(100{,}200) + p_{50}\,{}_{6}V \\
\left(5500 + 0.96G - 50\right)(1.05) &= (0.009)(100{,}200) + (1 - 0.009)(7100) \\
(1.05)(0.96)G + 5722.5 &= 7937.9 \\
(1.05)(0.96)G &= 2215.4 \\
G &= 2197.8
\end{align*}$$

The answer is **A**.
