---
id: "masi-an-068"
exam: "Exam MAS-I"
topic: "Kolmogorov-Smirnov Test"
learning_objective: "Statistics"
difficulty: hard
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Kolmogorov-Smirnov+Test
  - Concepts/Empirical+Distribution
  - Concepts/Exponential+Distribution
  - Concepts/Critical+Value
  - Concepts/Hypothesis+Testing
points: 3
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:64c5bb78f413a059bba59222e094df2f8a4316143880e85889974f1d99dc1499
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-068.md
---

An insurer's claims department believes its claim sizes follow an exponential distribution with mean 3,000, a figure taken from an industry study. Ten recent claims are:

$$
150,\ 250,\ 400,\ 500,\ 650,\ 800,\ 1{,}000,\ 1{,}300,\ 1{,}700,\ 2{,}250
$$

Use the Kolmogorov–Smirnov critical values 1.22/√n, 1.36/√n and 1.63/√n at the 10%, 5% and 1% significance levels.

## Part a (1 point)
Calculate the Kolmogorov–Smirnov statistic $D$ for the hypothesis that the claims are exponential with mean 3,000. Give your answer to three decimal places.

### Answer
0.472

### Explanation
With $F^*(x) = 1 - e^{-x/3{,}000}$, compare $F^*$ with the empirical CDF just before and at each data point:

| $x_{(i)}$ | $F^*(x_{(i)})$ | $\frac{i-1}{10}$ | $\frac{i}{10}$ | larger gap |
| :---: | :---: | :---: | :---: | :---: |
| 150 | 0.0488 | 0.0 | 0.1 | 0.0512 |
| 250 | 0.0800 | 0.1 | 0.2 | 0.1200 |
| 400 | 0.1248 | 0.2 | 0.3 | 0.1752 |
| 500 | 0.1535 | 0.3 | 0.4 | 0.2465 |
| 650 | 0.1948 | 0.4 | 0.5 | 0.3052 |
| 800 | 0.2341 | 0.5 | 0.6 | 0.3659 |
| 1,000 | 0.2835 | 0.6 | 0.7 | 0.4165 |
| 1,300 | 0.3517 | 0.7 | 0.8 | 0.4483 |
| 1,700 | 0.4326 | 0.8 | 0.9 | 0.4674 |
| 2,250 | 0.5276 | 0.9 | 1.0 | 0.4724 |

The data sit well to the left of the model, so every large gap is on the after-the-jump side, and

$$
D = 1 - F^*(2{,}250) = e^{-0.75} = 0.472
$$

**Common wrong entries:** **0.372** checks only the before-the-jump side, $F^* - (i-1)/10$, missing every gap here; **0.528** is $F^*(2{,}250)$ itself, the model's CDF rather than its distance from the empirical one.

## Part b (1 point)
Using your result from part (a), which conclusion follows?

- A) Do not reject the exponential model at the 10% level
- B) Reject at the 10% level, but not at the 5% level
- C) Reject at the 5% level, but not at the 1% level
- D) Reject at the 1% level

### Answer
C

### Explanation
With $n = 10$, the critical values are

$$
\begin{align*}
\frac{1.22}{\sqrt{10}} &= 0.386 \quad (10\%) \\
\frac{1.36}{\sqrt{10}} &= 0.430 \quad (5\%) \\
\frac{1.63}{\sqrt{10}} &= 0.515 \quad (1\%)
\end{align*}
$$

$D = 0.472$ exceeds 0.430 but not 0.515: reject at 5% but not at 1%, answer **C**. Option **A** is where the one-sided value 0.372 would lead; **B** and **D** misplace 0.472 against the table.

## Part c (1 point)
A second analyst instead sets the exponential mean equal to the sample mean of these ten claims, 900, recomputes the statistic as $D = 0.159$, compares it with 0.430, and reports that "the exponential model passes at the 5% level." Which assessment of that report is most valid?

- A) The report stands: the distribution of $D$ does not depend on the model, so 0.430 still applies
- B) The report is unsupported: fitting the mean to these data shrinks $D$, so 0.430 is too large
- C) The report is unsupported: fitting the mean makes $D$ larger, so the test now rejects too often
- D) The report stands once the critical value is reduced for one estimated parameter, as in the chi-square test
- E) The report stands, and part (b) was the invalid test, because the mean was not estimated from the data

### Answer
B

### Explanation
The tabled critical values assume the hypothesized distribution is **fully specified** before the data are seen. When its parameter is estimated from the same sample, the fitted CDF is pulled toward the empirical one, so $D$ tends to be smaller than it would be under the true model. The correct critical value is then smaller than 0.430 (it has to be found by simulation), and comparing with 0.430 makes the test reject less often than its stated 5%. A small $D$ judged against the usual table is therefore weak evidence that the model fits. The answer is **B**.

- **A** — the distribution-free property holds only for a fully specified $F^*$; estimating a parameter breaks it.
- **C** — gets the direction backwards: fitting moves the model toward the data, shrinking $D$.
- **D** — borrows the chi-square test's degrees-of-freedom adjustment; the K–S test has no such simple correction.
- **E** — inverts the requirement: part (b)'s test, with the mean fixed from an outside study, is exactly the setting the table was built for.
