---
id: "faml-7-01"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Whole+Life+Insurance
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:0399b7696b08711a361f042271106a3a71829ad911cc1290667cf1426fd8128d
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.1, p.94, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.1, p.64, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-01.md
---

For a special fully discrete whole life insurance on (40), you are given:

(i) The death benefit is 50,000 in the first 20 years and 100,000 thereafter

(ii) Level net premiums of 875 are payable for 20 years

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

Calculate $_{10}V$, the net premium policy value at the end of year 10 for this insurance.

[A modified version of Question 4 on the Fall 2012 exam]

- A) 11,090
- B) 11,120
- C) 11,150
- D) 11,180
- E) 11,210

## Explanation

$$\begin{align*}
{}_{10}V &= 50{,}000\left(A_{50} + {}_{10}E_{50}A_{60}\right) - (875)\left[\ddot{a}_{50:\overline{10}|}\right] \\
&= 50{,}000[0.18931 + (0.60182)(0.29028)] - 875[8.0550] \\
&= 11{,}152
\end{align*}$$

The answer is **C**.
