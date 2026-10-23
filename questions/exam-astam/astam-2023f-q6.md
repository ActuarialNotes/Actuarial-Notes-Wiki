---
id: "astam-2023f-q6"
exam: "Exam ASTAM"
topic: "Mack Chain Ladder Model"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Mack+Chain+Ladder+Model
  - Concepts/Chain+Ladder+Method
  - Concepts/Process+Risk
  - Concepts/Parameter+Risk
  - Concepts/Unpaid+Claims
points: 8
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2d87d51e3ba9792f28863c1c63063c1822d1112f6a35e2872146c703c56e85cd
  sources:
    - "SOA Exam ASTAM Fall 2023, question booklet, Q6, p.11, sha256:94277623c3540e1ab20e885d53ae2c5a1e1290e3e1061dc162aa832e8e3efd92 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-astam-exam.pdf"
    - "SOA ASTAM Fall 2023 Model Solutions (revised February 20, 2024), Q6, pp.16-17, sha256:0e43330341132ce0ac5392dd785e2897506886c307700d7bdd5c03f55b57502c — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/astam-fall-2023-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2023f-q6.md
---

You are analyzing the following cumulative claims run-off triangle information using Mack's model. Assume all claims are settled by the end of Development Year (DY) 4.

| Accident Year (AY) $i$ | DY 0 | DY 1 | DY 2 | DY 3 | DY 4 |
|---|---|---|---|---|---|
| 0 | 2296 | 2846 | 3120 | 3284 | 3336 |
| 1 | 2183 | 3001 | 3263 | 3471 | |
| 2 | 2201 | 2797 | 3197 | | |
| 3 | 2226 | 2561 | | | |
| 4 | 2456 | | | | |
| $\hat{f}_j$ | 1.2581 | ? | 1.0583 | 1.0158 | |
| $\hat{\sigma}_j$ | 4.3438 | ? | 0.4465 | 0.1248 | |
| $S_j$ | 8906 | 8644 | 6383 | 3284 | |

## Part a (1 point)

Show that $\hat{f}_1 = 1.1$ to the nearest 0.1. You should calculate the value to the nearest 0.01.

### Explanation
$$
\hat{f}_1 = \frac{\sum_{i=0}^{4-1-1} C_{i,2}}{\sum_{i=0}^{4-1-1} C_{i,1}} = \frac{3120 + 3263 + 3197}{2846 + 3001 + 2797} = 1.1083
$$

### Examiner Report
Overall, this question was fairly well done. Parts (a) and (b) were particularly done well.

## Part b (2 points)

Show that the estimated total claims cost for AY 3 is $\hat{C}_{3,4} = 3050$ to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
$$
\hat{c}_{3,4} = c_{3,1}\cdot\hat{f}_1\cdot\hat{f}_2\cdot\hat{f}_3 = 2561\cdot 1.1083\cdot 1.0583\cdot 1.0158 = 3051.2
$$

## Part c (2 points)

Show that $\hat{\sigma}_1 = 1.6$ to the nearest 0.1. You should calculate the value to the nearest 0.01.

### Explanation
$$
\begin{align*}
\hat{\sigma}_1^2 &= \frac{1}{2}\left\{c_{0,1}\left(f_{0,1} - \hat{f}_1\right)^2 + c_{1,1}\left(f_{1,1} - \hat{f}_1\right)^2 + c_{2,1}\left(f_{2,1} - \hat{f}_1\right)^2\right\} \\
&= \frac{1}{2}\left\{2846\left(\frac{3120}{2846} - \hat{f}_1\right)^2 + 3001\left(\frac{3263}{3001} - \hat{f}_1\right)^2 + 2797\left(\frac{3197}{2797} - \hat{f}_1\right)^2\right\} \\
&= 2.5521
\end{align*}
$$

Therefore, $\hat{\sigma}_1 = \sqrt{2.5521} = 1.5975$

### Examiner Report
For Part (c). the most common mistake was when calculating $f_{i,1}$, many papers used the claim cost from incorrect development years (1 year off).

## Part d (3 points)

- (i) Show that the process standard deviation for outstanding claims for AY 3, using Mack's approximation, is 90 to the nearest 10. You should calculate the value to the nearest 0.1.
- (ii) Calculate the square root of the estimation error for AY 3 using Mack's approximation.
- (iii) Explain the difference between the variability described by the process variance and the variability described by the estimation error.

### Explanation
**(i)** The process variance for AY3 is

$$
\begin{align*}
Var\left(C_{3,4} \mid C_{3,1}\right) &\approx \hat{C}_{3,4}^2\left(\frac{\hat{\sigma}_1^2}{\hat{f}_1^2\,\widehat{c_{3,1}}} + \frac{\hat{\sigma}_2^2}{\hat{f}_2^2\,\widehat{c_{3,2}}} + \frac{\hat{\sigma}_3^2}{\hat{f}_3^2\,\widehat{c_{3,3}}}\right) \\
&= 3051.2^2\left(\frac{2.5521}{1.1083^2\cdot 2561} + \frac{0.4465^2}{1.0583^2\cdot 2838} + \frac{0.1248^2}{1.0158^2\cdot 3004}\right) \\
 &= 8184.12
\end{align*}
$$

Therefore, the process standard deviation for AY3 is $\sqrt{8184.12} = 90.47$

**(ii)** The estimation error for AY3 is

$$
\begin{align*}
\left(C_{3,4} - E\left[C_{3,4} \mid C_{3,1}\right]\right)^2 &\approx \hat{C}_{3,4}^2\left(\frac{\hat{\sigma}_1^2}{\hat{f}_1^2 S_1} + \frac{\hat{\sigma}_2^2}{\hat{f}_2^2 S_2} + \frac{\hat{\sigma}_3^2}{\hat{f}_3^2 S_3}\right) \\
&= 3051.2^2\left(\frac{2.5521}{1.1083^2\cdot 8644} + \frac{0.4465^2}{1.0583^2\cdot 6383} + \frac{0.1248^2}{1.0158^2\cdot 3284}\right) \\
 &= 2540.32
\end{align*}
$$

The square root of the estimation error for AY3 is then $\sqrt{2540.32} = 50.40$

**(iii)** The process variance is innate to the underlying claims process and is not related to the estimator. If the parameters were known for certain, the process variance would not change.

The estimation error measures the uncertainty/discrepancy between the true and estimated values of the conditional expected ultimate claims.

### Examiner Report
For Parts (d)(i) and (d)(ii), the formulas are provided so the candidates just needed to plug in the correct values. Common errors include miscalculation of $\hat{f}_i$, $\widehat{C_{3,j}}$, and missed exponent. Part (d)(iii) was not done well. Many candidates omitted this part or wrote down things that were completely irrelevant.
