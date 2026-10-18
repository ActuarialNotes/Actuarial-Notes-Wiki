---
id: "fams-075"
exam: "Exam FAM"
topic: "Increased Limits"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Increased+Limits
  - Concepts/Excess+of+Loss
  - Concepts/Limited+Expected+Value
  - Concepts/Reinsurance
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:430c709b3d58e69c4910fd8a900b6c41cbdee662887a0025d79cae0e5a2405aa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-075.md
---

A primary liability insurer has a book of business with the following characteristics:

- All policies have a policy limit of 500,000
- The expected loss ratio is 60% on premiums of 4,000,000

A reinsurer provides an excess of loss treaty for the layer 300,000 in excess of 100,000.

The following table of increased limits factors is available:

| Limit | ILF |
|---|---|
| 100,000 | 1.00 |
| 200,000 | 1.25 |
| 300,000 | 1.45 |
| 400,000 | 1.60 |
| 500,000 | 1.70 |

Calculate the reinsurer's expected losses for this coverage (answer to the nearest 000s).

- A) 840,000
- B) 847,000
- C) 850,000
- D) 862,000
- E) 871,000

## Explanation

The expected losses for the primary insurer are $0.6(4{,}000{,}000) = 2{,}400{,}000$. The expected proportion of losses in the treaty layer is $(1.6/1.7 - 1/1.7 = 0.352941)$. The expected cost is

$$\begin{align*}
&0.352941(2{,}400{,}000) \\
&= 847{,}058.
\end{align*}$$

The relative cost of the layer can be derived using formulas from *Loss Models* as follows:

$$\begin{align*}
&\frac{E(X \wedge 400{,}000) - E(X \wedge 100{,}000)}{E(X \wedge 500{,}000)} \\
&= \frac{E(X \wedge 400{,}000)/E(X \wedge 100{,}000) - E(X \wedge 100{,}000)/E(X \wedge 100{,}000)}{E(X \wedge 500{,}000)/E(X \wedge 100{,}000)} \\
&= \frac{ILF(400{,}000) - ILF(100{,}000)}{ILF(500{,}000)} \\
&= \frac{1.60 - 1.00}{1.70} \\
&= 0.352941
\end{align*}$$

The answer is **B**.
