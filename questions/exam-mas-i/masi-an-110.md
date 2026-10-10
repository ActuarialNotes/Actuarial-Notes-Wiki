---
id: "masi-an-110"
exam: "Exam MAS-I"
topic: "Analysis of Covariance"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Analysis+of+Covariance
  - Concepts/F-Distribution
  - Concepts/Residual+Sum+of+Squares
  - Concepts/ANOVA
  - Concepts/Interaction
points: 3
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6346feaff8481580fce05c69786730edf090d72725205e94c2c0534ee9e836b7
  sources:
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.2 Linear Models for Continuous Data, §2.8 Analysis of Covariance Models, PDF pp.42-48 (additive model mu_ij = mu + alpha_i + beta x_ij, parallel lines, alpha_1 = 0; dummies for every level add up to the constant; hierarchical anova F for the factor given the covariate on the ANCOVA model's residual mean square; interaction gives different slopes), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-110.md
---

A study of workers compensation medical costs compares three treatment networks. For each of 30 claims (10 per network) the response is the log of medical cost, and the covariate $x$ is the injured worker's age. Three nested Normal linear models are fitted:

| Model | Residual sum of squares | Residual df |
|---|---|---|
| $x$ only | 52.0 | 28 |
| $x$ + network (common slope) | 40.0 | 26 |
| $x$ $\times$ network (separate slopes) | 37.4 | 24 |

The upper 5% points of the $F$ distribution are $F_{0.05}(2, 24) = 3.403$ and $F_{0.05}(2, 26) = 3.369$.

## Part a (1 point)
Calculate the $F$ statistic for testing whether the three networks' regression lines are parallel. Give your answer to two decimal places.

### Answer
0.83

### Explanation
Parallelism compares the separate-slopes model (24 df) with the common-slope model (26 df); the extra parameters are the two slope differences, and the denominator is the larger model's residual mean square:

$$
\begin{aligned}
F &= \frac{(40.0 - 37.4)/2}{37.4/24} \\
&= \frac{1.30}{1.5583} \\
&= 0.83
\end{aligned}
$$

**Common wrong entries:** **0.90** uses the common-slope model's degrees of freedom, 37.4/26, in the denominator; **1.67** forgets to divide the numerator by its 2 degrees of freedom.

## Part b (1 point)
Calculate the $F$ statistic for testing whether network affects cost after adjusting for age, assuming a common slope. Give your answer to two decimal places.

### Answer
3.90

### Explanation
Compare the common-slope model (26 df) with the $x$-only model (28 df), dividing by the common-slope model's residual mean square:

$$
\begin{aligned}
F &= \frac{(52.0 - 40.0)/2}{40.0/26} \\
&= \frac{6.00}{1.5385} \\
&= 3.90
\end{aligned}
$$

**Common wrong entries:** **3.85** uses the separate-slopes model's mean square, 37.4/24, after part a has already concluded those slopes are unnecessary; **7.80** forgets to divide the numerator by 2.

## Part c (1 point)
At the 5% significance level, which conclusion follows?

- A) The slopes differ by network, so no single network effect can be stated
- B) The lines are parallel, and network has no effect once age is allowed for
- C) The lines are parallel, and network affects cost after adjusting for age
- D) The slopes differ by network, and network has no effect after adjusting for age
- E) No conclusion is possible, because the two tests use different denominators

### Answer
C

### Explanation
Test parallelism first: $F = 0.83 < 3.403$, so the separate slopes are not needed and the common-slope model stands. Then test network adjusted for age in that model: $F = 3.90 > 3.369$, so reject $H_0: \alpha_2 = \alpha_3 = 0$. The networks differ in expected log cost by the same amount at every age. The answer is **C**.

- **A** and **D** — reject parallelism, but 0.83 is far below its critical value.
- **B** — fails to reject the network effect, but the statistic exceeds its critical value, $F = 3.90 > 3.369$ ($p \approx 0.033$).
- **E** — each test correctly uses the residual mean square of the larger model in its own comparison; the sequence of tests is the standard ANCOVA procedure.
