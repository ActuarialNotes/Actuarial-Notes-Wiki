---
id: "fams-026"
exam: "Exam FAM"
topic: "Limited Expected Value"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Limited+Expected+Value
  - Concepts/Policy+Limit
  - Concepts/Severity+Distribution
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0b946a946dd2aa5034b950085939480f9bb4120b875b16628824fe9f2c48e92b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-026.md
---

The unlimited severity distribution for claim amounts under an auto liability insurance policy is given by the cumulative distribution:

$$F(x) = 1 - 0.8e^{-0.02x} - 0.2e^{-0.001x}, \quad x \ge 0$$

The insurance policy pays amounts up to a limit of 1000 per claim.

Calculate the expected payment under this policy for one claim.

- A) 57
- B) 108
- C) 166
- D) 205
- E) 240

## Explanation

Limited expected value =

$$\begin{align*}
\int_0^{1000}[1 - F(x)]\,dx &= \int_0^{1000} 0.8e^{-0.02x} + 0.2e^{-0.001x}\,dx \\
&= -40e^{-0.02x} - 200e^{-0.001x}\Big|_0^{1000} \\
&= -0 - 73.576 + 40 + 200 \\
&= 166.424
\end{align*}$$

The answer is **C**.
