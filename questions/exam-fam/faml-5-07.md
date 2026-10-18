---
id: "faml-5-07"
exam: "Exam FAM"
topic: "Woolhouse's Formula"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Woolhouse's+Formula
  - Concepts/Annuity+Due
  - Concepts/Endowment+Insurance
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b0eaba0f2eb29a6ff33e0febbd1de490734322d3c82ec13db0d069741daf68d7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-07.md
---

You are given:

(i) $A_{35} = 0.188$

(ii) $A_{65} = 0.498$

(iii) ${}_{30}p_{35} = 0.883$

(iv) $i = 0.04$

Calculate $1000\,\ddot{a}^{(2)}_{35:\overline{30}|}$ using the two-term Woolhouse approximation.

[Question 7 on the Spring 2015 exam]

- A) 17,060
- B) 17,310
- C) 17,380
- D) 17,490
- E) 17,530

## Explanation

$$\ddot{a}^{(2)}_{35:\overline{30}|} \approx \ddot{a}_{35:\overline{30}|} - \frac{(m-1)}{2m}\left(1 - v^{30}\,{}_{30}p_{35}\right)$$

$$\begin{align*}
\ddot{a}_{35:\overline{30}|} &= \frac{1 - A_{35:\overline{30}|}}{d} \\
&= \frac{1 - A^{1}_{35:\overline{30}|} - {}_{30}E_{35}}{d} \\
&= \frac{1 - \left(A_{35} - {}_{30}E_{35} \times A_{65}\right) - {}_{30}E_{35}}{d}
\end{align*}$$

Since ${}_{30}E_{35} = v^{30}\,{}_{30}p_{35} = 0.2722$, then

$$\begin{align*}
\ddot{a}_{35:\overline{30}|} &= \frac{1 - \left(A_{35} - v^{30}\,{}_{30}p_{35} \times A_{65}\right) - v^{30}\,{}_{30}p_{35}}{d} \\
&= \frac{1 - (0.188 - (0.2722)(0.498)) - 0.2722}{(0.04/1.04)} \\
&= 17.5592
\end{align*}$$

$$\begin{align*}
\ddot{a}^{(2)}_{35:\overline{30}|} &\approx 17.5592 - \frac{1}{4}(1 - 0.2722) \\
&= 17.38
\end{align*}$$

$$\begin{align*}
1000\,\ddot{a}^{(2)}_{35:\overline{30}|} &\approx 1000 \times 17.38 \\
&= 17{,}380
\end{align*}$$

The answer is **C**.
