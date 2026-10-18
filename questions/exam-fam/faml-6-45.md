---
id: "faml-6-45"
exam: "Exam FAM"
topic: "Percentile"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Percentile
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Whole+Life+Insurance
  - Concepts/Fractional+Age+Assumption
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6312835b2e5564ff829efb0e730dd8968f1b1205c54db6a689dd266e51ae73d8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-45.md
---

For a fully continuous whole life insurance of 100,000 on (35), you are given:

(i) The annual rate of premium is 560

(ii) Mortality follows the Standard Ultimate Life Table

(iii) Deaths are uniformly distributed over each year of age

(iv) $i = 0.05$

Calculate the 75th percentile of the loss at issue random variable for this policy.

[A modified version of Question 8 on the Spring 2017 exam]

- A) 610
- B) 630
- C) 650
- D) 670
- E) 690

## Explanation

$$\begin{align*}
L_{0} &= 100{,}000v^{T} - 560\bar{a}_{\overline{T}|} \\
&= \left(100{,}000 + \frac{560}{\delta}\right)e^{-\delta T} - \frac{560}{\delta}
\end{align*}$$

Since $L_{0}$ is a decreasing function of $T$, the 75th percentile of $L_{0}$ is $L_{0}(t)$ where $t$ is such that $\Pr[T_{35} > t] = 0.75$.

$$\begin{align*}
\frac{l_{35+t}}{l_{35}} &= 0.75 \\
l_{35+t} &= 0.75l_{35} \\
&= 0.75 \times 99{,}556.7 \\
&= 74{,}667.5
\end{align*}$$

$$l_{81} < 74{,}667.5 < l_{80}$$

$$\begin{align*}
t &= (80 - 35) + s \\
l_{80+s} &= sl_{81} + (1 - s)l_{80} \\
74{,}667.5 &= 73{,}186.3s + 75{,}657.2(1 - s) \\
s &= 0.40054 \\
t &= 45.40054
\end{align*}$$

$$\begin{align*}
L_{0}(45.40054) &= \left(100{,}000 + \frac{560}{\ln(1.05)}\right)e^{-45.40054\ln(1.05)} - \frac{560}{\ln(1.05)} \\
&= 689.25
\end{align*}$$

The answer is **E**.
