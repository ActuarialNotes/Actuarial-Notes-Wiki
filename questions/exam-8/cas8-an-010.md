---
id: "cas8-an-010"
exam: "Exam 8"
topic: "Reasonableness Testing"
learning_objective: "Excess, Deductible, and Individual Risk Rating"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Reasonableness+Testing
  - Concepts/Increased+Limits
  - Concepts/Layer+of+Insurance
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:2d92659736934bef69fe273a9bf71935edb9672927b1a13f556f6ace74de81db
  sources:
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), Ch.6 consistency of ILFs, PDF pp.181-182, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-010.md
---

A general liability insurer prices excess layers from a set of increased limit factors, with \$1 million as the basic limit. The basic limit premium for a risk is \$5,000.

| Limit (\$ millions) | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Increased limit factor | 1.000 | 1.300 | 1.480 | 1.700 | 1.800 |

The resulting layer premiums are \$1,500 for \$1 million excess of \$1 million, \$900 for \$1 million excess of \$2 million, \$1,100 for \$1 million excess of \$3 million and \$500 for \$1 million excess of \$4 million.

Which layer premium fails a reasonableness check, and why?

- A) \$1 million excess of \$1 million, because it is higher than any of the layers above it
- B) \$1 million excess of \$2 million, because it is less than two-thirds of the layer below it
- C) \$1 million excess of \$3 million, because it is higher than the equal-width layer below it
- D) \$1 million excess of \$4 million, because it is less than a tenth of the basic limit premium
- E) None, because every factor is higher than the factor for the limit below it

## Explanation

Each layer premium is the basic limit premium times the difference in factors. For \$1 million excess of \$1 million it is 5,000 times (1.300 - 1.000), or 1,500.

Bahnemann (Chapter 6) shows that premiums for successively higher layers of constant width should **decrease** as the attachment point rises. This holds for every pricing method based on expected losses and reasonable claim-size distributions. A set of increased limit factors with this property, $I''(x) < 0$ for every limit, is called *consistent*. With a continuous claim-size density, factors built from expected losses always are.

The layer factors here are 0.300, 0.180, 0.220 and 0.100. The \$1 million excess of \$3 million layer (0.220, or \$1,100) costs more than the layer of the same width below it (0.180, or \$900). Expected losses can't rise from one layer to the next layer up, so the factor for the \$4 million limit (or the one for \$3 million) is unreasonable. The answer is **C**.

**Why not the others**

- **A** describes the pattern the check expects. The lowest excess layer should be the most expensive.
- **B** invents a rule. Nothing requires a layer to be some fixed fraction of the layer below it, only to be no larger.
- **D** invents a rule too. A thin, high layer can cost very little relative to the basic limit.
- **E** stops at the first check. Factors that rise with the limit are necessary, but they must also rise by decreasing amounts.
