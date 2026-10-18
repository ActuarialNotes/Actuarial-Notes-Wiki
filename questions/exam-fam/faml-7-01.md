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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0399b7696b08711a361f042271106a3a71829ad911cc1290667cf1426fd8128d
  sources: []
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
