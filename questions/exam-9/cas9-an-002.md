---
id: "cas9-an-002"
exam: "Exam 9"
topic: "Ratemaking"
learning_objective: "Catastrophe and Reinsurance"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Ratemaking
  - Concepts/Catastrophe+Modelling
  - Concepts/Catastrophe+Expected+Loss+Cost
  - Concepts/Expense+Provisions
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:c5cdc3113da57c37a0646f439c660fc60efb9273b58ada4e04c70ad5bc92dc7a
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 pp.94 and 98 (catastrophe provision added after trend/development; modeled vs non-modeled catastrophes) and Ch.8 p.141 (pure premium indication formula), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-002.md
---

An actuary is setting homeowners rates in a hurricane-exposed state. The five-year experience period contains one major hurricane. The actuary has the following:

- Non-hurricane pure premium (including LAE), already developed to ultimate and trended to the future policy period: \$410 per exposure
- Average hurricane pure premium in the experience period, actual losses: \$210 per exposure
- Hurricane catastrophe model expected annual loss for the current book, already at the future policy period's cost level: \$85 per exposure
- The combined loss development and trend factor used on the non-hurricane losses: 1.15
- Fixed expense: \$40 per exposure
- Variable expense: 20% of premium
- Underwriting profit provision: 5% of premium

Calculate the indicated average rate per exposure.

- A) \$600.00
- B) \$700.00
- C) \$713.33
- D) \$730.33
- E) \$880.00

## Explanation

Hurricane losses are too rare and too severe for five years of experience to estimate them, so the actual hurricane losses are removed from the experience and replaced by the catastrophe model's expected annual loss. A model provision already stated for the future policy period is added to the non-catastrophe losses **after** those have been developed and trended; it is not developed or trended again.

$$
\text{Projected pure premium} = \$410 + \$85 = \$495
$$

$$
\text{Indicated average rate} = \frac{\$495 + \$40}{1 - 0.20 - 0.05} = \frac{\$535}{0.75} = \mathbf{\$713.33}
$$

The answer is **C**.

**Why not the others**

- **A** — \$600.00 leaves the hurricane provision out altogether, which is right only in the years no hurricane happens: the rate would never pay for the event it insures.
- **B** — \$700.00 grosses up the losses for variable expense and profit but adds the fixed expense afterwards, so the fixed expense carries no variable expense or profit loading.
- **D** — \$730.33 applies the 1.15 development and trend factor to the model's \$85, which is already at the future cost level; the catastrophe provision is over-adjusted.
- **E** — \$880.00 uses the experience period's actual hurricane losses, which reflect whether a storm happened to strike in those five years rather than the long-run expectation the model estimates.
