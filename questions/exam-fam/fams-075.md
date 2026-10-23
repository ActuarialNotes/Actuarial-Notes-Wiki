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
  - Concepts/Claim
  - Concepts/Insurer
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:7c880b6d2df79e83fbc131f593dff09fb2c2a35fa66dea82bec4fa61259659d2
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q75, p.60, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q75, p.31, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
