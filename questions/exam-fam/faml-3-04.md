---
id: "faml-3-04"
exam: "Exam FAM"
topic: "Normal Approximation"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Normal+Approximation
  - Concepts/Life+Table
  - Concepts/Binomial+Distribution
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:56be21730a10fa926143c5b67b943ed1ac04041127f682e3bb308f98ef286f67
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-04.md
---

The SULT Club has 4000 members all age 25 with independent future lifetimes. The mortality for each member follows the Standard Ultimate Life Table.

Calculate the largest integer $N$, using the normal approximation, such that the probability that there are at least $N$ survivors at age 95 is at least 90%.

[A modified version of Question 24 on the Fall 2013 exam]

- A) 800
- B) 815
- C) 830
- D) 845
- E) 860

## Explanation

Let $S$ denote the number of survivors.

This is a binomial random variable with $n = 4000$ and success probability $\dfrac{21{,}178.3}{99{,}871.1} = 0.21206$

$$\begin{align*}
E(S) &= 4{,}000(0.21206) \\
&= 848.24
\end{align*}$$

The variance is

$$\begin{align*}
Var(S) &= (0.21206)(1 - 0.21206)(4{,}000) \\
&= 668.36
\end{align*}$$

$$\begin{align*}
StdDev(S) &= \sqrt{668.36} \\
&= 25.853
\end{align*}$$

The 90% percentile of the standard normal is 1.282

Let $S^{*}$ denote the normal distribution with mean 848.24 and standard deviation 25.853. Since $S$ is discrete and integer-valued, for any integer $s$,

$$\begin{align*}
\Pr(S \ge s) &= \Pr(S > s - 0.5) \approx \Pr(S^{*} > s - 0.5) \\
&= \Pr\left(\frac{S^{*} - 848.24}{25.853} > \frac{s - 0.5 - 848.24}{25.853}\right) \\
&= \Pr\left(Z > \frac{s - 0.5 - 848.24}{25.853}\right)
\end{align*}$$

For this probability to be at least 90%, we must have $\dfrac{s - 0.5 - 848.24}{25.853} < -1.282$

$$\Rightarrow s < 815.6$$

So $s = 815$ is the largest integer that works.

The answer is **B**.
