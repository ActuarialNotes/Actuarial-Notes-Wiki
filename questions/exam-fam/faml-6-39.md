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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:99af0cf535755fbd4225f54b32227c87e42edc278e19fd7f1075c495c4e037b4
  sources: []
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
