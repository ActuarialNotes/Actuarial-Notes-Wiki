---
id: "faml-4-07"
exam: "Exam FAM"
topic: "Pure Endowment"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Pure+Endowment
  - Concepts/Variance
  - Concepts/Interest+Rate
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:73138168d2459c97403b41aa3f20a936d3bcf8a836625e05a18f4b13ee74172e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-07.md
---

For a 25-year pure endowment of 1 on $(x)$, you are given:

(i) $Z$ is the present value random variable at issue of the benefit payment

(ii) $Var(Z) = 0.10E[Z]$

(iii) $_{25}p_{x} = 0.57$

Calculate the annual effective interest rate.

[Question 6 on the Fall 2017 exam]

- A) 5.8%
- B) 6.0%
- C) 6.2%
- D) 6.4%
- E) 6.6%

## Explanation

$$\begin{align*}
Var(Z) = 0.10E[Z] &\Rightarrow v^{50}\,{}_{25}p_{x}(1 - {}_{25}p_{x}) = 0.10 \cdot v^{25}\,{}_{25}p_{x} \\
&\Rightarrow \frac{(1 - 0.57)}{(1 + i)^{50}} = 0.10 \times \frac{1}{(1 + i)^{25}} \\
&\Rightarrow (1 + i)^{25} = \frac{0.43}{0.10} \\
&\Rightarrow (1 + i)^{25} = 4.3 \\
&\Rightarrow i = 0.06
\end{align*}$$

The answer is **B**.
