---
id: "faml-5-13"
exam: "Exam FAM"
topic: "Woolhouse's Formula"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Woolhouse's+Formula
  - Concepts/Annuity+Due
  - Concepts/Life+Annuity
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0174e52c34c5e8cf29647ff96d7ca634f22e9782411e03f7b91b7ef660faee7b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-13.md
---

For a 30-year temporary life annuity due of 1 per year, payable monthly, on (35), you are given:

i) $\mu_{35+t} = \dfrac{0.15}{75-t}$, $\quad 0 \le t \le 75$

ii) $i = 0.06$

iii) $\ddot{a}_{35:\overline{30}|} = 14.2546$

Calculate the single net premium using the three term Woolhouse formula.

- A) 13.792
- B) 13.796
- C) 13.862
- D) 13.866
- E) 13.870

## Explanation

$$\ddot{a}^{(12)}_{35:\overline{30}|} \approx \ddot{a}_{35:\overline{30}|} - \frac{11}{24}\left(1 - {}_{30}E_{35}\right) - \frac{143}{1728}\left(\delta + \mu_{35} - {}_{30}E_{35}(\delta + \mu_{65})\right)$$

$$\begin{align*}
{}_{30}p_{35} &= e^{-\int_{0}^{30}\frac{0.15}{75-t}\,dt} \\
&= e^{0.15\ln(75-t)\big|_{0}^{30}} \\
&= e^{0.15\ln 45 - 0.15\ln 75} \\
&= e^{0.15\ln(45/75)} \\
&= (45/75)^{0.15}
\end{align*}$$

$$\begin{align*}
{}_{30}E_{35} &= \frac{1}{1.06^{30}}\left(\frac{45}{75}\right)^{0.15} \\
&= 0.161267
\end{align*}$$

$$\begin{align*}
\delta &= \ln(1.06) \\
&= 0.058269 \\
\mu_{35} &= 0.15/75 \\
&= 0.002 \\
\mu_{65} &= 0.15/45 \\
&= 0.003333
\end{align*}$$

$$\begin{align*}
\ddot{a}^{(12)}_{35:\overline{30}|} &\approx 14.2546 - \frac{11}{24}\left(1 - 0.161267\right) - \frac{143}{1728}\left(0.058269 + 0.002 - 0.161267(0.058269 + 0.003333)\right) \\
&= 13.866
\end{align*}$$

The answer is **D**.
