---
id: "fams-069"
exam: "Exam FAM"
topic: "Loss Ratio Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Loss+Ratio+Method
  - Concepts/Loss+Trend
  - Concepts/Development+Factor
  - Concepts/Permissible+Loss+Ratio
  - Concepts/Ratemaking
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:588ccf795f95f862a91e0404aee1e4549aebc8d20371e977200abb9cb3ed583e
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q69, p.54, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q69, p.29, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-069.md
---

You use the following information to determine a rate change using the loss ratio method.

(i)

| Accident Year | Earned Premium at Current Rates | Reported Losses | Weight Given to Accident Year |
|---|---|---|---|
| AY8 | 4252 | 2260 | 40% |
| AY9 | 5765 | 2610 | 60% |

(ii) Trend Factor: 7% per annum effective

(iii) Loss Development Factor (to Ultimate):

AY8: 1.08

AY9: 1.18

(iv) Permissible Loss Ratio: 0.657

(v) All policies are one-year policies, issued uniformly through the year, and rates will be in effect for one year.

(vi) Proposed Effective Date: July 1, CY10

Calculate the required portfolio-wide rate change.

- A) –26%
- B) –16%
- C) –8%
- D) –1%
- E) 7%

## Explanation

Trend periods for losses: Average accident date in experience period is July 1, AY8 and July 1, AY9, respectively. New rates will be in effect from July 1, CY10 through June 30, CY12, with an average accident date of July 1, CY11. Trend period for losses are 3 years for AY8 and 2 years for AY9. Ultimate losses trended and developed are,

$$\begin{align*}
\text{AY8}: \quad &2260(1.07^3)(1.08) \\
&= 2990 \\
\text{AY9}: \quad &2610(1.07^2)(1.18) \\
&= 3526
\end{align*}$$

Weighted average loss ratio:

$$\begin{align*}
&0.4(2990/4252) + 0.6(3526/5765) \\
&= 0.648
\end{align*}$$

Required portfolio-wide rate change:

$$\begin{align*}
&0.648/0.657 - 1 \\
&= -1.4\%.
\end{align*}$$

The answer is **D**.
