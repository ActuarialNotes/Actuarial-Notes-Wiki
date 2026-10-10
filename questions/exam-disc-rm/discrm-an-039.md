---
id: "discrm-an-039"
exam: "Exam DISC-RM"
topic: "Liability Loss Exposure"
learning_objective: "5. Insurance as a Risk Management Technique"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Liability+Loss+Exposure
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c86a849cd678566a95016e57be212f57c7ae80abd7bef1f99b17b93b7201865c
  sources:
    - "ISO HO 00 03 05 11, Homeowners 3 - Special Form (specimen, Maine BOI), Section I Coverage D; Section II Coverage E, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-039.md
---

A store expects 20 premises liability claims a year. Each claim costs an average of \$5,000 to defend, whether or not it results in a payment. Thirty percent of claims result in damages, which average \$40,000 when paid. What is the store's expected annual cost of these claims?

- A) \$240,000
- B) \$270,000
- C) \$340,000
- D) \$900,000

## Explanation

Defense costs apply to every claim, while damages apply only to the claims that result in a payment:

$$
\begin{align*}
E[L] &= f\left(p\,\bar{D} + \bar{C}_{\text{def}}\right) \\
&= 20\,\big(0.30 \times 40{,}000 + 5{,}000\big) \\
&= 20 \times 17{,}000 \\
&= \mathbf{340{,}000}
\end{align*}
$$

The answer is **C**.

**Why not the others**

- **A** — \$240,000 counts damages only, leaving out defense costs, which are a large part of a liability exposure.
- **B** — \$270,000 applies defense costs only to the claims that are paid; every claim must be defended.
- **D** — \$900,000 assumes every claim results in damages.
