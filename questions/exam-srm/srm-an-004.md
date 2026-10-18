---
id: "srm-an-004"
exam: "Exam SRM"
topic: "Autocorrelation Function"
learning_objective: "Time Series Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Autocorrelation+Function
  - Concepts/Time+Series
  - Concepts/Correlogram
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:c6f01d77f1449ff288ce6a3a9b3d9b9dba1339b5ada0dbe22472b63c29930bfe
  sources:
    - "Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge, 2010) — author-posted online text, Ch. 8 Autocorrelations and Autoregressive Models, §8.1 Autocorrelations (Definition of the lag k autocorrelation statistic r_k), sha256:815296f6791408afe67faf1e7bf9f91f23dcc23c3461e56bd40da90f89bd6ff8 — https://users.ssc.wisc.edu/~ewfrees/ActuarialRegression2009/C8AR.html"
    - "SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-srm/srm-an-004.md
---

The numbers of claims reported to an insurer in six consecutive quarters (in hundreds) are:

$$y_1, \ldots, y_6 = 4, \; 6, \; 5, \; 9, \; 8, \; 10$$

Calculate the lag 1 sample autocorrelation, $r_1$.

- A) 0.214
- B) 0.257
- C) 0.316
- D) 0.453
- E) 0.780

## Explanation

The lag $k$ sample autocorrelation compares each value with the one $k$ periods earlier, both measured from the overall mean $\bar{y}$, and divides by the total sum of squares of all $T$ observations (Frees, §8.1):

$$
r_k = \frac{\sum_{t=k+1}^{T}(y_{t-k} - \bar{y})(y_t - \bar{y})}{\sum_{t=1}^{T}(y_t - \bar{y})^2}
$$

Here $T = 6$ and $\bar{y} = 42/6 = 7$, so the deviations are $-3, -1, -2, 2, 1, 3$.

Numerator, over the five adjacent pairs:

$$
\begin{align*}
&(-3)(-1) + (-1)(-2) + (-2)(2) + (2)(1) + (1)(3) \\
&= 3 + 2 - 4 + 2 + 3 \\
&= 6
\end{align*}
$$

Denominator, over all six deviations:

$$
9 + 1 + 4 + 4 + 1 + 9 = 28
$$

$$
r_1 = \frac{6}{28} = 0.214
$$

The answer is **A**.

**Why not the others**

- **B** rescales the numerator by $\tfrac{1}{T-1}$ and the denominator by $\tfrac{1}{T}$, giving $r_1 = (6/5)/(28/6) = 0.257$. Both sums share the divisor in $r_k$.
- **C** sums the squared deviations over only the first five observations, giving $r_1 = 6/19 = 0.316$, instead of all six.
- **D** is the ordinary correlation between $(4, 6, 5, 9, 8)$ and $(6, 5, 9, 8, 10)$, which centers each list at its own mean and scales by each list's own spread; $r_k$ uses the single mean $\bar{y}$ and the full-series sum of squares.
- **E** forgets to subtract the mean: $\sum y_{t-1}y_t / \sum y_t^2 = 251/322 = 0.780$.
