---
id: "masii-an-006"
exam: "Exam MAS-II"
topic: "BIC"
learning_objective: "Linear Mixed Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/BIC
  - Concepts/Summary+Statistics
  - Concepts/AIC
  - Concepts/Linear+Mixed+Model
answer: "A"
points: 2
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:01d61ea2dd40b0abb31f982302c036f64f1522685f2c5f133cfc4c78f1f75245
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §6.2.2 Penalized Measures of Fit, printed pp.66-67 (PDF 76-77): AIC = -2 log-likelihood + 2p; BIC = -2 log-likelihood + p log(n), n the number of data points, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-006.md
---

Three linear mixed models for policyholder loss ratios are fitted by maximum likelihood to the same 400 observations. The summary output reports:

| Model | Parameters estimated | $-2 \times$ log-likelihood |
| :--- | ---: | ---: |
| M1 | 4 | 2,010.0 |
| M2 | 6 | 1,996.0 |
| M3 | 9 | 1,984.0 |

Determine which model AIC selects and which model BIC selects.

- A) AIC selects M3; BIC selects M2
- B) AIC selects M2; BIC selects M1
- C) AIC selects M3; BIC selects M3
- D) AIC selects M2; BIC selects M2
- E) AIC selects M1; BIC selects M1

## Explanation

Both criteria add a penalty per parameter $p$ to $-2\ell$; lower is better.

$$
\text{AIC} = -2\ell + 2p, \qquad \text{BIC} = -2\ell + p\ln n, \qquad \ln 400 = 5.991
$$

| Model | AIC | BIC |
| :--- | ---: | ---: |
| M1 | 2,018.0 | 2,034.0 |
| M2 | 2,008.0 | 2,031.9 |
| M3 | 2,002.0 | 2,037.9 |

AIC selects **M3**; BIC, whose penalty of 5.99 per parameter is three times AIC's 2, selects the smaller **M2**. The answer is **A**.

**Why not the others**

- **B** — M2 is not AIC's minimum (2,008.0 against M3's 2,002.0), and M1 is not BIC's (2,034.0 against M2's 2,031.9).
- **C** — BIC computed with $\log_{10} 400 = 2.60$ instead of the natural log gives 2,020.4, 2,011.6 and 2,007.4, and so picks M3. The penalty uses $\ln n$.
- **D** — M2 is BIC's choice, but AIC's penalty of 2 per parameter is small enough that M3's drop of 12.0 in $-2\ell$ outweighs its 3 extra parameters (a cost of 6).
- **E** — choosing the fewest parameters regardless of fit; both criteria trade the likelihood against the penalty rather than minimising parameters alone.
