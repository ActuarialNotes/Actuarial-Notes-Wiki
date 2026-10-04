---
id: "masi-sample-q1"
exam: "Exam MAS-I"
topic: "Inversion Method"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Inversion+Method
  - Concepts/Gamma
  - Concepts/Exponential+Distribution
answer: "D"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b359a5c304229f04909c408818edf95e17b998e6f17d348fb323888d12277065
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-sample-001.md
---

An actuary is using the inversion method to simulate a gamma random variable with mean and variance both equal to 2. Two random draws from the uniform distribution $(0,1)$ are independently made, and their values are 0.2 and 0.8.

Calculate the value of the simulated gamma random variable.

- A) Less than 0.5
- B) At least 0.5, but less than 1.0
- C) At least 1.0, but less than 1.5
- D) At least 1.5, but less than 2.0
- E) At least 2.0

## Explanation

**Identify the gamma.** A gamma random variable with shape $\alpha$ and scale $\theta$ has mean $\alpha\theta$ and variance $\alpha\theta^2$. Both equal 2:

$$
\begin{align*}
\alpha\theta &= 2 \\
\alpha\theta^2 &= 2 \\
\theta &= \frac{\alpha\theta^2}{\alpha\theta} \\
&= 1 \\
\alpha &= \frac{2}{\theta} \\
&= 2
\end{align*}
$$

So, in CAS's words, the actuary is simulating a gamma random variable with $(\alpha, \theta) = (2, 1)$, and "it can be thought of the sum of two independent exponential random variables each with rate 1." That is why two uniform draws are given: one for each exponential.

**Invert each exponential.** An exponential with rate 1 has $F(x) = 1 - e^{-x}$, so the inversion method returns $-\ln(1 - u)$ for a draw $u$ — or $-\ln u$, since $1 - U$ is uniform on $(0,1)$ too. CAS's solution uses $-\ln u$ on each draw and adds the two:

$$
\begin{align*}
X &= -\ln(0.2) - \ln(0.8) \\
&= 1.6094 + 0.2231 \\
&= 1.833
\end{align*}
$$

CAS's item note: Ross (Example 11.3) treats either $U$ or $1 - U$ as a valid value to invert when simulating an exponential, and the draws in this question are chosen so the answer is the same either way — with $1 - U$, the draws 0.2 and 0.8 become 0.8 and 0.2, and the sum is unchanged.

The simulated value 1.833 falls in $[1.5, 2.0)$, so the answer is **D**.
