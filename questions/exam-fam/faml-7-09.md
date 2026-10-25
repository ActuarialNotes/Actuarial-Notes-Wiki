---
id: "faml-7-09"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Endowment+Insurance
  - Concepts/Fractional+Age+Assumption
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:b963c5f4dc51f7fb3e3ac2f210dbd9bd193f016aef50e3b1a13bcbc4a98227a1
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.9, p.100, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.9, p.69, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-09.md
---

For a semi-continuous 20-year endowment insurance of 100,000 on (45), you are given:

(i) Net premiums of 253 are payable monthly

(ii) Mortality follows the Standard Ultimate Life Table

(iii) Deaths are uniformly distributed over each year of age

(iv) $i = 0.05$

Calculate $_{10}V$, the net premium policy value at the end of year 10 for this insurance.

[A modified version of Question 7 on the Fall 2013 exam]

- A) 38,100
- B) 38,300
- C) 38,500
- D) 38,700
- E) 38,900

## Explanation

Let $P = 0.00253$ be the monthly net premium per 1 of insurance.

$$\begin{align*}
{}_{10}V &= 100{,}000\left[\frac{i}{\delta}A^{1}_{55:\overline{10}|} + A_{55:\overset{1}{\overline{10}|}} - 12P\ddot{a}^{(12)}_{55:\overline{10}|}\right] \\
&= 100{,}000\left[1.02480(0.02471) + 0.59342 - (12)(0.00253)(7.8311)\right] \\
&\approx 38{,}100
\end{align*}$$

Where

$$\begin{align*}
A^{1}_{55:\overline{10}|} &= A_{55:\overline{10}|} - {}_{10}E_{55} \\
&= 0.61813 - 0.59342 \\
&= 0.02471
\end{align*}$$

$$\begin{align*}
A_{55:\overset{1}{\overline{10}|}} &= {}_{10}E_{55} \\
&= 0.59342
\end{align*}$$

$$\ddot{a}_{55:\overline{10}|} = 8.0192$$

$$\begin{align*}
\ddot{a}^{(12)}_{55:\overline{10}|} &= \alpha(12)\,\ddot{a}_{55:\overline{10}|} - \beta(12)\left[1 - {}_{10}E_{55}\right] \\
&= 1.00020(8.0192) - 0.46651(1 - 0.59342) \\
&= 7.8311
\end{align*}$$

The answer is **A**.
