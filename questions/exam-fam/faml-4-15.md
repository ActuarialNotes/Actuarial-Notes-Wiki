---
id: "faml-4-15"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Variance
  - Concepts/Force+of+Interest
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:51866339ca42c3918449ec798daed2cece381759b4228207c031229cb05a155a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-15.md
---

For a special whole life insurance on $(x)$, you are given:

(i) Death benefits are payable at the moment of death

(ii) The death benefit at time $t$ is $b_{t} = e^{0.02t}$, for $t \ge 0$

(iii) $\mu_{x+t} = 0.04$, for $t \ge 0$

(iv) $\delta = 0.06$

(v) $Z$ is the present value at issue random variable for this insurance

Calculate $Var(Z)$.

[Question 4 on the Fall 2016 exam]

- A) 0.020
- B) 0.036
- C) 0.052
- D) 0.068
- E) 0.083

## Explanation

$$\begin{align*}
E[Z] &= \int_{0}^{\infty} b_{t} \cdot v^{t} \cdot {}_{t}p_{x} \cdot \mu_{x+t}\,dt \\
&= \int_{0}^{\infty} e^{0.02t} \cdot e^{-0.06t} \cdot e^{-0.04t} \cdot 0.04\,dt \\
&= 0.04\int_{0}^{\infty} e^{-0.08t}\,dt \\
&= \frac{0.04}{0.08} \\
&= \frac{1}{2}
\end{align*}$$

$$\begin{align*}
E[Z^{2}] &= \int_{0}^{\infty} \left(b_{t} \cdot v^{t}\right)^{2} \cdot {}_{t}p_{x} \cdot \mu_{x+t}\,dt \\
&= \int_{0}^{\infty} \left(e^{0.04t}\right)\left(e^{-0.12t}\right)\left(0.04e^{-0.04}\right)dt \\
&= \frac{0.04}{0.12} \\
&= \frac{1}{3}
\end{align*}$$

$$\begin{align*}
Var[Z] &= \frac{1}{3} - \left(\frac{1}{2}\right)^{2} \\
&= \frac{1}{12} \\
&= 0.0833
\end{align*}$$

The answer is **E**.
