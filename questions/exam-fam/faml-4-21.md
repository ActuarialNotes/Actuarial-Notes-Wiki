---
id: "faml-4-21"
exam: "Exam FAM"
topic: "Term Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Term+Life+Insurance
  - Concepts/Variance
  - Concepts/Fractional+Age+Assumption
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b64be56891870d1b0b7b2ed16926e8ad54584aa49b48d387db16408613f91751
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-21.md
---

For a two-year term insurance of 1 on $(x)$ payable at the moment of death, you are given:

i) $q_{x} = 0.04$

ii) $q_{x+1} = 0.06$

iii) Deaths are uniformly distributed over each year of age

iv) $i = 0.04$

v) $Z$ is the present value random variable for this insurance

Calculate $Var$[Z].

[Question on October 2022 FAM-L Exam]

- A) 0.065
- B) 0.069
- C) 0.073
- D) 0.077
- E) 0.081

## Explanation

$$\begin{align*}
E(Z) &= \frac{i}{\delta}\left[vq_{x} + v^{2}p_{x}q_{x+1}\right] \\
&= \frac{0.04}{\ln(1.04)}\left[\frac{1}{1.04}(0.04) + \frac{1}{1.04^{2}}(0.96)(0.06)\right] \\
&= 0.09353831
\end{align*}$$

$$\begin{align*}
E(Z^{2}) &= \frac{(1+i)^{2} - 1}{2\delta}\left[v^{2}q_{x} + v^{4}p_{x}q_{x+1}\right] \\
&= \frac{(1.04^{2} - 1)}{2\ln(1.04)}\left[\frac{1}{1.04^{2}}(0.04) + \frac{1}{1.04^{4}}(0.96)(0.06)\right] \\
&= 0.08969072
\end{align*}$$

$$\begin{align*}
Var(Z) &= E(Z^{2}) - [E(Z)]^{2} \\
&= 0.08969072 - (0.09353831)^{2} \\
&= 0.0809413
\end{align*}$$

The answer is **E**.
