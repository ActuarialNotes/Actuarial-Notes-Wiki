---
id: "fams-025"
exam: "Exam FAM"
topic: "Stop-Loss Reinsurance"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Aggregate+Loss+Model
  - Concepts/Poisson+Distribution
  - Concepts/Payment
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2fda81f0bb556589bb12d8c8f2e15d19595a88e65a77c608e6ee7e3ed497a9f3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-025.md
---

For a certain company, losses follow a Poisson frequency distribution with mean 2 per year, and the amount of a loss is 1, 2, or 3, each with probability 1/3. Loss amounts are independent of the number of losses, and of each other.

An insurance policy covers all losses in a year, subject to an annual aggregate deductible of 2.

Calculate the expected claim payments for this insurance policy.

- A) 2.00
- B) 2.36
- C) 2.45
- D) 2.81
- E) 2.96

## Explanation

Let $S$ denote aggregate loss before deductible.

$\text{E}(S) = 2(2) = 4$, since mean severity is 2.

$$f_S(0) = \frac{e^{-2}2^0}{0!} = 0.1353$$

since must have 0 losses to get aggregate loss = 0.

$$f_S(1) = \frac{e^{-2}2^1}{1!}\cdot\frac{1}{3} = 0.0902$$

since must have 1 loss whose size is 1 to get aggregate loss = 1.

$$\begin{align*}
E(S \wedge 2) &= 0f_S(0) + 1f_S(1) + 2[1 - f_S(0) - f_S(1)] \\
&= 0(0.1353) + 1(0.0902) + 2(1 - 0.01353 - 0.0902) \\
&= 1.6392 \\
E[(S-2)_+] &= E(S) - E(S \wedge 2) \\
&= 4 - 1.6392 \\
&= 2.3608
\end{align*}$$

The answer is **B**.
