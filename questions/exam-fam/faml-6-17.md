---
id: "faml-6-17"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Endowment+Insurance
  - Concepts/Equivalence+Principle
  - Concepts/Survival+Model
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:86e39338d9447ef663099ff6e00610f0100c2366e249f698a2e027f95bccf734
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-17.md
---

An insurance company sells special fully discrete two-year endowment insurance policies to smokers (S) and non-smokers (NS) age $x$. You are given:

(i) The death benefit is 100,000; the maturity benefit is 30,000

(ii) The level annual premium for non-smoker policies is determined by the equivalence principle

(iii) The annual premium for smoker policies is twice the non-smoker annual premium

(iv) $\mu^{\text{NS}}_{x+t} = 0.1, \ t > 0$

(v) $q^{\text{S}}_{x+k} = 1.5\,q^{\text{NS}}_{x+k}$ for $k = 0, 1$

(vi) $i = 0.08$

Calculate the expected present value of the loss at issue random variable on a smoker policy.

[Question 18 on the Spring 2013 exam]

- A) –30,000
- B) –29,000
- C) –28.000
- D) –27.000
- E) –26.000

## Explanation

$$q^{\text{NS}}_{x} = q^{\text{NS}}_{x+1} = 1 - e^{-0.1} = 0.095$$

Then the annual premium for the non-smoker policies is $P^{\text{NS}}$, where

$$\begin{align*}
P^{\text{NS}}\left(1 + v p^{\text{NS}}_{x}\right) &= 100{,}000\,v q^{\text{NS}}_{x} + 100{,}000\,v^{2} p^{\text{NS}}_{x} q^{\text{NS}}_{x+1} + 30{,}000\,v^{2} p^{\text{NS}}_{x} p^{\text{NS}}_{x+1} \\
P^{\text{NS}} &= \frac{100{,}000(0.926)(0.095) + 100{,}000(0.857)(0.905)(0.095) + 30{,}000(0.857)(0.905)^{2}}{1 + (0.926)(0.905)} \\
P^{\text{NS}} &= 20{,}251
\end{align*}$$

And then $P^{\text{S}} = 40{,}502$.

$$q^{\text{S}}_{x} = q^{\text{S}}_{x+1} = 1.5(1 - e^{-0.1}) = 0.143$$

$$\begin{align*}
EPV(L^{\text{S}}) &= 100{,}000\,v q^{\text{S}}_{x} + 100{,}000\,v^{2} p^{\text{S}}_{x} q^{\text{S}}_{x+1} + 30{,}000\,v^{2} p^{\text{S}}_{x} p^{\text{S}}_{x+1} - P^{\text{S}} - P^{\text{S}} v p^{\text{S}}_{x} \\
&= 100{,}000(0.926)(0.143) + 100{,}000(0.857)(0.857)(0.143) + 30{,}000(0.857)(0.857)^{2} - 40{,}502 - 40{,}502(0.926)(0.857) \\
&= -30{,}017
\end{align*}$$

The answer is **A**.
