---
id: "masi-an-101"
exam: "Exam MAS-I"
topic: "Offset Variable"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Offset+Variable
  - Concepts/Poisson+Regression
  - Concepts/Link+Function
answer: "-0.8557"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5e9f763aa00b417022685f07e71463c8387c369eebd685647b5a722db5cebaa4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-101.md
---

An insurer refits its claim-frequency model as a Poisson GLM with a log link. Its deductible relativities were set in a separate study and are not to be re-estimated, so each record's offset carries both its exposure and its established deductible relativity. One record has 0.5 car-years of exposure and a \$1,000 deductible, whose established relativity is 0.85.

Calculate the value of the offset for this record. Give your answer to four decimal places, e.g. -1.2345.

## Explanation

Under a log link the model is multiplicative on the mean,

$$
\mu_i = \text{exposure}_i \times \text{deductible relativity}_i \times e^{\beta_0 + \beta_1 x_{i1} + \cdots}
$$

so on the linear-predictor scale each known factor enters as its **logarithm**, and the logs add:

$$
\begin{aligned}
\text{offset} &= \ln(0.5) + \ln(0.85) \\
&= -0.69315 - 0.16252 \\
&= -0.85567
\end{aligned}
$$

The offset is **-0.8557**.

**Common wrong entries**

- **0.4250** — the product 0.5 × 0.85 entered unlogged; the offset must be on the scale of the linear predictor, so a log link needs $\ln(0.425)$, which is the same $-0.8557$.
- **-0.6931** — the exposure alone; the deductible relativity is then re-estimated (or ignored) instead of carried forward.
- **-0.1625** — the deductible relativity alone, forgetting that exposure belongs in the offset too.
