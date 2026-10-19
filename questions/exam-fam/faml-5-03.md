---
id: "faml-5-03"
exam: "Exam FAM"
topic: "Increasing Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Increasing+Annuity
  - Concepts/Continuous+Annuity
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:47b777c58f4b85ef099e5d935a24b2bea2fe25fa3879ab8388aacbe58205bf54
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-03.md
---

You are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) Deaths are uniformly distributed over each year of age

(iii) $i = 0.05$

Calculate $\dfrac{d}{dt}(\bar{I}\bar{a})_{40:\overline{t}|}$ at $t = 10.5$.

[A modified version of Question 19 on the Fall 2017 exam]

- A) 5.8
- B) 6.0
- C) 6.2
- D) 6.4
- E) 6.6

## Explanation

$$(\bar{I}\bar{a})_{40:\overline{t}|} = \int_{0}^{t} s\,{}_{s}p_{40}\,v^{s}\,ds \Rightarrow \frac{d(\bar{I}\bar{a})_{40:\overline{t}|}}{dt} = t\,{}_{t}p_{40}\,v^{t}$$

At $t = 10.5$,

$$\begin{align*}
10.5\,{}_{10.5}E_{40} &= 10.5\,{}_{10}p_{40}\,{}_{0.5}p_{50}\,v^{10.5} \\
&= 10.5\,{}_{10}E_{40}\,{}_{0.5}p_{50}\,v^{0.5} \\
&= 10.5 \times 0.60920 \times (1 - 0.5 \times 0.001209)(0.975900073) \\
&= 6.239
\end{align*}$$

The answer is **C**.
