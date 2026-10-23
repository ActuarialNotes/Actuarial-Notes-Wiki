---
id: "faml-6-50"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Table
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:4318afe51549643e431fed93c2d4878d5cfcc7dd63f28ad3982344e55a59c5a1
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.50, p.89, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.50, p.60, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-50.md
---

On July 15, 2017, XYZ Corp buys fully discrete whole life insurance policies of 1,000 on each of its 10,000 workers, all age 35. It uses the death benefits to partially pay the premiums for the following year.

You are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

(iii) The insurance is priced using the equivalence principle

Calculate XYZ Corp's expected net cash flow from these policies during July 2018.

[A modified version of Question 13 on the Fall 2017 exam]

- A) –47,000
- B) –48,000
- C) –49,000
- D) –50,000
- E) –51,000

## Explanation

$$\begin{align*}
1{,}000P &= 1{,}000\,\frac{A_{35}}{\ddot{a}_{35}} \\
&= \frac{96.53}{18.9728} \\
&= 5.0878
\end{align*}$$

Benefits paid during July 2018:

$$\begin{align*}
10{,}000 \times 1{,}000 \times q_{35} &= 10{,}000 \times 0.391 \\
&= 3910
\end{align*}$$

Premiums payable during July 2018:

$$\begin{align*}
10{,}000 \times (1 - q_{35}) \times 5.0878 &= 9{,}996.09 \times 5.0878 \\
&= 50{,}858.10
\end{align*}$$

Cash flow during July 2018:

$$\begin{align*}
3910 - 50{,}858 &= -46{,}948
\end{align*}$$

The answer is **A**.
