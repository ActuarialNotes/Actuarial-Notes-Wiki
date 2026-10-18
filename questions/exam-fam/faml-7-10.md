---
id: "faml-7-10"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Expenses
  - Concepts/Equivalence+Principle
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ef1118657f022ad6c6b197d8aa6e12ce4e0343c9440876314ca7f7091c5237aa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-10.md
---

For a fully discrete whole life insurance of 100,000 on (45), you are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

(iii) Commission expenses are 60% of the first year's gross premium and 2% of renewal gross premiums

(iv) Administrative expenses are 500 in the first year and 50 in each renewal year

(v) All expenses are payable at the start of the year

(vi) The gross premium, calculated using the equivalence principle, is 977.60

Calculate $_{5}V^{e}$, the expense policy value at the end of year 5 for this insurance.

[A modified version of Question 8 on the Fall 2013 exam]

- A) –1070
- B) –1020
- C) –970
- D) –920
- E) –870

## Explanation

Use superscript $g$ for gross premiums and gross premium policy values.

Use superscript $n$ (representing "net") for net premiums and net premium policy values.

Use superscript $e$ for expense premiums and expense policy values.

$P^{g} = 977.60$ (given)

$$\begin{align*}
P^{e} &= \frac{0.58P^{g} + 450 + \left(0.02P^{g} + 50\right)\ddot{a}_{45}}{\ddot{a}_{45}} \\
&= \frac{0.58(977.60) + 450 + [0.02(977.60) + 50]17.8162}{17.8162} \\
&= 126.64
\end{align*}$$

Alternatively,

$$\begin{align*}
P^{n} &= \frac{100{,}000A_{45}}{\ddot{a}_{45}} \\
&= 850.97 \\
P^{e} &= P^{g} - P^{n} \\
&= 126.63
\end{align*}$$

$$\begin{align*}
{}_{5}V^{e} &= \left(0.02P^{g} + 50\right)\ddot{a}_{50} - P^{e}\ddot{a}_{50} \\
&= [0.02(977.60) + 50](17.0245) - 126.64(17.0245) \\
&= -972
\end{align*}$$

Alternatively,

$$\begin{align*}
{}_{5}V^{n} &= 100{,}000A_{50} - P^{n}\ddot{a}_{50} \\
&= 100{,}000(0.18931) - 850.97(17.0245) \\
&= 4443.66
\end{align*}$$

$$\begin{align*}
{}_{5}V^{g} &= 100{,}000A_{50} + \left(50 + 0.02P^{g} - P^{g}\right)\ddot{a}_{50} \\
&= 100{,}000(0.18931) + [50 + 0.02(977.60) - 977.60](17.0245) \\
&= 3471.93
\end{align*}$$

$$\begin{align*}
{}_{5}V^{e} &= {}_{5}V^{g} - {}_{5}V^{n} \\
&= -972
\end{align*}$$

The answer is **C**.
