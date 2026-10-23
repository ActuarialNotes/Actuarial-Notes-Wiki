---
id: "fams-016"
exam: "Exam FAM"
topic: "Coverage Modifications"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Coverage+Modifications
  - Concepts/Frequency+Distribution
  - Concepts/Deductible
  - Concepts/Poisson+Distribution
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:7ad04e2561a3105a38ec0cdcf04db53b581bba9c8772260330e13732bf11aa75
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q16, p.14, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q16, p.8, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-016.md
---

Aggregate losses for a portfolio of policies are modeled as follows:

(i) The number of losses before any coverage modifications follows a Poisson distribution with mean $\lambda$.

(ii) The severity of each loss before any coverage modifications is uniformly distributed between 0 and $b$.

The insurer would like to model the effect of imposing an ordinary deductible, $d$ $(0 < d < b)$, on each loss and reimbursing only a percentage, $c$ $(0 < c \le 1)$, of each loss in excess of the deductible.

It is assumed that the coverage modifications will not affect the loss distribution.

The insurer models its claims with modified frequency and severity distributions. The modified claim amount is uniformly distributed on the interval $[0, c(b-d)]$.

Determine the mean of the modified frequency distribution.

- A) $\lambda$
- B) $\lambda c$
- C) $\lambda\dfrac{d}{b}$
- D) $\lambda\dfrac{b-d}{b}$
- E) $\lambda c\dfrac{b-d}{b}$

## Explanation

The modified severity, $X^*$, represents the conditional payment amount given that a payment occurs. Given that a payment is required ($X > d$), the payment must be uniformly distributed between 0 and $c(b - d)$.

The modified frequency, $N^*$, represents the number of losses that result in a payment. The deductible eliminates payments for losses below $d$, so only $1 - F_X(d) = \dfrac{b-d}{b}$ of losses will require payments. Therefore, the Poisson parameter for the modified frequency distribution is $\lambda\dfrac{b-d}{b}$. (Reimbursing $c$% after the deductible affects only the payment amount and not the frequency of payments).

The answer is **D**.
