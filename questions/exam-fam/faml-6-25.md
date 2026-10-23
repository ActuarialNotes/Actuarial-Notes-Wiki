---
id: "faml-6-25"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Woolhouse's+Formula
  - Concepts/Deferred+Annuity
  - Concepts/Expenses
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:41937b6fb3b738f6f5399f718ee9ac549f44e6318dee5a563d74c093e691e04e
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.25, p.69, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.25, p.46, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-25.md
---

For a fully discrete 10-year deferred whole life annuity-due of 1000 per month on (55), you are given:

(i) The premium, $G$, will be paid annually at the beginning of each year during the deferral period

(ii) Expenses are expected to be 300 per year for all years, payable at the beginning of the year

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

(v) Using the two-term Woolhouse approximation, the expected loss at issue is –800

Calculate $G$.

[A modified version of Question 9 on the Spring 2015 exam]

- A) 12,110
- B) 12,220
- C) 12,330
- D) 12,440
- E) 12,550

## Explanation

Need $\text{EPV(Ben + Exp)} - \text{EPV(Prem)} = -800$

$$\begin{align*}
\text{EPV(Prem)} &= G\ddot{a}_{55:\overline{10}|} \\
&= 8.0192G
\end{align*}$$

$$\begin{align*}
\text{EPV(Ben + Exp)} &= 12{,}000\,{}_{10|}\ddot{a}^{(12)}_{55} + 300\ddot{a}_{55} \\
&= 12{,}000\,{}_{10}E_{55}\,\ddot{a}^{(12)}_{65} + 300\ddot{a}_{55} \\
&= 12{,}000\,{}_{10}E_{55}\left(\ddot{a}_{65} - \frac{m-1}{2m}\right) + 300\ddot{a}_{55} \\
&= 12{,}000(0.59342)\left(13.5498 - \tfrac{11}{24}\right) + 300(16.0599) \\
&= 98{,}042.83
\end{align*}$$

Therefore,

$$\begin{align*}
98{,}042.83 - 8.0192G &= -800 \\
G &= 12{,}326
\end{align*}$$

The answer is **C**.
