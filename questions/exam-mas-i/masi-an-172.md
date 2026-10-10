---
id: "masi-an-172"
exam: "Exam MAS-I"
topic: "Noncentral Chi-Squared Distribution"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Noncentral+Chi-Squared+Distribution
  - Concepts/Power+of+a+Test
  - Concepts/ANOVA
  - Concepts/F-Distribution
points: 2
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:401e432ed533aa4660b26794d2213d63db2d3fbdf42849c693eeef233dbf3a56
  sources:
    - "Levine, STAT 517 (Purdue) Lecture 24 'Noncentral chi^2 and F-distributions' (Hogg-Craig notation), PDF pp.2-5 (sum X_i^2/sigma^2 ~ chi-square_n(sum mu_i^2/sigma^2); noncentrality = the quadratic form evaluated at the means / sigma^2; noncentral F), sha256:f84259546359e3b92d9a0e6f2de41a7f4b445a3063739fdbefe1047f5a9214ae — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture24_STAT517.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7.2 Scheffe's method (all contrasts; C-hat +/- sqrt((r-1) F_{alpha; r-1, N-r}) s_C, s_C^2 = sigma-hat^2 sum c_i^2/n_i), sha256:25e822151f4f779425f69dea32f1f44450a2355e22e576bfc43dbbcd8db2e532 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc472.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-172.md
---

An actuary plans a one-way ANOVA at the 5% level to test whether mean log-severity differs across three territories, with $n = 5$ claims from each. Log-severity is normal with standard deviation $\sigma = 0.5$ in every territory, and the true territory means are 8.1, 8.1 and 8.7. Under these true means the F statistic has a noncentral F-distribution with 2 and 12 degrees of freedom.

## Part a (1 point)
Calculate the noncentrality parameter $\theta$ of the F statistic's distribution. Give your answer to two decimal places.

### Answer
4.80

### Explanation
With $k$ groups of $n$ observations, the between-groups sum of squares over $\sigma^2$ is noncentral chi-squared with

$$
\theta = \frac{n\sum_j (\mu_j - \bar\mu)^2}{\sigma^2}
$$

Here $\bar\mu = (8.1 + 8.1 + 8.7)/3 = 8.3$:

$$
\begin{align*}
\sum_j (\mu_j - \bar\mu)^2 &= (-0.2)^2 + (-0.2)^2 + (0.4)^2 \\
&= 0.24 \\[4pt]
\theta &= \frac{5(0.24)}{0.5^2} \\
&= \mathbf{4.80}
\end{align*}
$$

**Common wrong entries**

- **0.96** — leaves out the factor $n = 5$; each group mean is estimated from 5 claims, which is what makes the spread detectable.
- **2.40** — divides by $\sigma = 0.5$ instead of $\sigma^2 = 0.25$.

## Part b (1 point)
The number of territories and the number of claims per territory stay fixed, so the F statistic keeps 2 and 12 degrees of freedom and the same critical value. Which of the following changes to the situation above would give the test the **highest** power?

- A) Every true territory mean is 0.3 higher: 8.4, 8.4 and 9.0
- B) The standard deviation falls from 0.5 to 0.45, with the true means unchanged
- C) The true means are 7.9, 8.3 and 8.7, with $\sigma = 0.5$
- D) The true means are 8.0, 8.6 and 8.6, with $\sigma = 0.5$

### Answer
C

### Explanation
With the degrees of freedom and the critical value fixed, the power $P\big(F(2, 12, \theta) > c\big)$ increases with $\theta$, so compare the noncentrality parameters:

| Scenario | $\sum(\mu_j - \bar\mu)^2$ | $\sigma^2$ | $\theta$ | Power |
| :--- | ---: | ---: | ---: | ---: |
| Original | 0.24 | 0.25 | 4.80 | 0.391 |
| A | 0.24 | 0.25 | 4.80 | 0.391 |
| B | 0.24 | 0.2025 | 5.93 | 0.470 |
| C | 0.32 | 0.25 | 6.40 | 0.501 |
| D | 0.24 | 0.25 | 4.80 | 0.391 |

(The power column is from software; the critical value is $F_{0.05;\,2,\,12} = 3.885$.) Scenario C has the largest $\theta$ and so the highest power. Widening the range of means from 0.6 to 0.8 raises the sum of squared deviations from 0.24 to 0.32, a gain of a third, which beats the 23% gain from the smaller $\sigma$. The answer is **C**.

- **A** — shifting every mean by the same amount leaves every deviation from $\bar\mu$ unchanged, so $\theta$ and the power are unchanged. The test detects differences, not levels.
- **B** — a smaller $\sigma$ does raise $\theta$, by the factor 0.25/0.2025 = 1.23 to 5.93, but not as far as scenario C.
- **D** — the mirror image of the original (one territory 0.4 below the mean, two 0.2 above), so $\sum(\mu_j - \bar\mu)^2$ and $\theta$ are unchanged.
