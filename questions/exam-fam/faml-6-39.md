---
id: "faml-6-39"
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
  content_hash: sha256:99af0cf535755fbd4225f54b32227c87e42edc278e19fd7f1075c495c4e037b4
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.39, p.80, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.39, p.54, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-39.md
---

XYZ Insurance writes 10,000 fully discrete whole life insurance policies of 1000 on lives age 40 and an additional 10,000 fully discrete whole life policies of 1000 on lives age 80.

XYZ used the following assumptions to determine the net premiums for these policies:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

During the first ten years, mortality did follow the Standard Ultimate Life Table.

Calculate the average net premium per policy in force received at the beginning of the eleventh year.

[A modified version of Question 11 on the Spring 2016 exam]

- A) 29
- B) 32
- C) 35
- D) 38
- E) 41

## Explanation

Premium at issue for (40):

$$\begin{align*}
\frac{1000A_{40}}{\ddot{a}_{40}} &= \frac{121.06}{18.4578} \\
&= 6.5587
\end{align*}$$

Premium at issue for (80):

$$\begin{align*}
\frac{1000A_{80}}{\ddot{a}_{80}} &= \frac{592.93}{8.5484} \\
&= 69.3615
\end{align*}$$

Lives in force after ten years:

Issued at age 40:

$$\begin{align*}
10{,}000\,{}_{10}p_{40} &= 10{,}000 \times \frac{98{,}576.4}{99{,}338.3} \\
&= 9923.30
\end{align*}$$

Issued at age 80:

$$\begin{align*}
10{,}000\,{}_{10}p_{80} &= 10{,}000 \times \frac{41{,}841.1}{75{,}657.2} \\
&= 5530.35
\end{align*}$$

The total number of lives after ten years is therefore:

$$\begin{align*}
9923.30 + 5530.35 &= 15{,}453.65
\end{align*}$$

The average premium after ten years is therefore:

$$\begin{align*}
\frac{(6.5587 \times 9923.30) + (69.3615 \times 5530.35)}{15{,}453.65} &= 29.03
\end{align*}$$

The answer is **A**.
