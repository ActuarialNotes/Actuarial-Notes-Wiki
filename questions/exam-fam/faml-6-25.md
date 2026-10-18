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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:41937b6fb3b738f6f5399f718ee9ac549f44e6318dee5a563d74c093e691e04e
  sources: []
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
