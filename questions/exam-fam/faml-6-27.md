---
id: "faml-6-27"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Survival+Model
  - Concepts/Life+Annuity
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cb8c62a95fd768f84a764996dcf076ea35cfc024aba74e96abcf667a97d1aa77
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-27.md
---

For a special fully continuous whole life insurance on $(x)$, you are given:

(i) Premiums and benefits:

|  | First 20 years | After 20 years |
|---|---|---|
| Premium Rate | $3P$ | $P$ |
| Benefit | 1,000,000 | 500,000 |

(ii) $\mu_{x+t} = 0.03, \ t \ge 0$

(iii) $\delta = 0.06$

Calculate $P$ using the equivalence principle.

[Question 11 on the Spring 2015 exam]

- A) 10,130
- B) 10,190
- C) 10,250
- D) 10,310
- E) 10,370

## Explanation

EPV(Premiums) = EPV(Benefits)

$$\begin{align*}
\text{EPV(Premiums)} &= 3P\bar{a}_{x} - 2P\,{}_{20}E_{x}\,\bar{a}_{x+20} \\
&= 3P\left(\frac{1}{\mu + \delta}\right) - 2P\left(e^{-20(\mu + \delta)}\right)\left(\frac{1}{\mu + \delta}\right) \\
&= 3P\left(\frac{1}{0.09}\right) - 2Pe^{-1.8} - \frac{1}{0.09} \\
&= 29.66P
\end{align*}$$

The third line is as the SOA printed it: its second term is $2Pe^{-1.8}\left(\frac{1}{0.09}\right)$, which is what gives $29.66P$.

$$\begin{align*}
\text{EPV(Benefits)} &= 1{,}000{,}000\,\bar{A}_{x} - 500{,}000\,{}_{20}E_{x}\,\bar{A}_{x+20} \\
&= 1{,}000{,}000\left(\frac{\mu}{\mu + \delta}\right) - 500{,}000\,e^{-20(\mu + \delta)}\left(\frac{\mu}{\mu + \delta}\right) \\
&= 1{,}000{,}000\left(\frac{0.03}{0.09}\right) - 500{,}000\,e^{-1.8}\left(\frac{0.03}{0.09}\right) \\
&= 305{,}783.5
\end{align*}$$

$$\begin{align*}
29.66P &= 305{,}783.5 \\
P &= \frac{305{,}783.5}{29.66} \\
P &= 10{,}309.62
\end{align*}$$

The answer is **D**.
