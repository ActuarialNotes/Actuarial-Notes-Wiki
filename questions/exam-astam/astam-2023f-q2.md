---
id: "astam-2023f-q2"
exam: "Exam ASTAM"
topic: "Tail Weight"
learning_objective: "Severity Models"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Tail+Weight
  - Concepts/Hazard+Rate
  - Concepts/Mean+Excess+Loss
  - Concepts/Pareto+Distribution
  - Concepts/Weibull+Distribution
  - Concepts/Generalized+Extreme+Value+Distribution
  - Concepts/Moment
  - Concepts/Severity+Distribution
  - Concepts/Probability+Distributions
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:97425496364768c0b27a7f4ace631e1d32bcc7ab8874968f5e9f4b9076c35720
  sources:
    - "SOA Exam ASTAM Fall 2023, question booklet, Q2, p.4, sha256:94277623c3540e1ab20e885d53ae2c5a1e1290e3e1061dc162aa832e8e3efd92 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-astam-exam.pdf"
    - "SOA ASTAM Fall 2023 Model Solutions (revised February 20, 2024), Q2, pp.5-7, sha256:0e43330341132ce0ac5392dd785e2897506886c307700d7bdd5c03f55b57502c — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/astam-fall-2023-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2023f-q2.md
---

An insurer is analyzing its auto insurance claims with a focus on the right tails of the distributions.

## Part a (1 point)

Losses are categorized into two categories: bodily injury and vehicle repairs.

State with reasons which of these categories is more likely to have a heavy-tailed loss distribution.

### Explanation
The bodily injury category is more likely to have a heavy-tailed distribution than the vehicle repair category. Compensation for injuries is more likely to subject to litigation which often leads to claims in the right tail. On the other hand, the severity of vehicle repair is limited to the value of the vehicle.

### Examiner Report
For Part (a) Most candidates correctly chose bodily injury, but some confused the fat tail of the loss distribution with the term 'long-tail' in explaining their reasoning.

## Part b (1 point)

- (i) State whether an increasing mean excess loss function indicates a heavy-tailed or light-tailed distribution.
- (ii) State whether an increasing hazard rate function indicates a heavy-tailed or light-tailed distribution.

### Explanation
**(i)** An increasing mean excess loss function indicates a heavy-tailed distribution.

**(ii)** An increasing hazard rate function indicates a light-tailed distribution.

## Part c (3 points)

You are given that $X \sim \text{Pareto}(\alpha, \theta_X)$.

- (i) Prove that $e_X(d) = \dfrac{\theta_X + d}{\alpha - 1}$ for $\alpha > 1$.
- (ii) Determine an expression for the hazard rate function for $X$, $h_X(x)$, in terms of $\alpha$ and $\theta_X$.

### Explanation
For the Pareto distribution with $\alpha > 1$,

$$
\begin{align*}
e_X(d) &= E[X - d \mid X > d] \\
&= \frac{\displaystyle\int_d^\infty (x - d)\frac{\alpha\theta_X^\alpha}{(\theta_X + x)^{\alpha+1}}\,dx}{1 - F_X(d)} \\
&= \left(\frac{\theta_X + d}{\theta_X}\right)^\alpha\left(\int_d^\infty (x - d)\frac{\alpha\theta_X^\alpha}{(\theta_X + x)^{\alpha+1}}\,dx\right)
\end{align*}
$$

Let $y = x - d$

$$
\begin{align*}
e_X(d) &= \left(\frac{\theta_X + d}{\theta_X}\right)^\alpha\left(\int_0^\infty y\frac{\alpha\theta_X^\alpha}{(\theta + d + y)^{\alpha+1}}\,dy\right) \text{ (as printed)} \\
&= \left(\frac{\theta_X + d}{\theta_X}\right)^\alpha\left(\frac{\theta_X}{\theta_X + d}\right)^\alpha\left(\int_0^\infty y\frac{\alpha(\theta_X + d)^\alpha}{(\theta_X + d + y)^{\alpha+1}}\,dy\right) \\
&= \int_0^\infty y\frac{\alpha(\theta_X + d)^\alpha}{(\theta_X + d + y)^{\alpha+1}}\,dy
\end{align*}
$$

Note that $\dfrac{\alpha(\theta_X + d)^\alpha}{(\theta_X + d + y)^{\alpha+1}}$ is the pdf of a Pareto$(\alpha, \theta_X + d)$ distribution, so the integral is the mean of the Pareto distribution,

$$
\Rightarrow e_X(d) = \frac{\theta_X + d}{\alpha - 1}
$$

**(ii)** The hazard rate is given by

$$
h(x) = \frac{f(x)}{S(x)} = \frac{\alpha\theta_X^\alpha}{(\theta_X + x)^{\alpha+1}}\left(\frac{\theta_X + x}{\theta_X}\right)^\alpha = \frac{\alpha}{\theta_X + x}
$$

### Examiner Report
Part (c) asked for a proof of the maximum (as printed) excess loss formula for the Pareto distribution. For full credit candidates were expected to ***prove*** the result starting from the definition of the function, but substantial partial credit was given to the candidates who used the excess loss formula from the formula sheet.

## Part d (2 points)

You are given that $Y \sim \text{Weibull}(\tau, \theta_Y)$.

- (i) Derive an expression for the hazard rate function for $Y$, $h_Y(y)$, in terms of $\tau$ and $\theta_Y$.
- (ii) Determine the range of values of $\tau$ for which $Y$ is heavy-tailed, based on the hazard rate function.

### Explanation
**(c)(i)** (as printed) For the Weibull distribution,

$$
h(x) = \frac{f(x)}{S(x)} = \frac{f(x)}{1 - F(x)} = \frac{\dfrac{\tau x^{\tau-1}}{\theta^\tau}e^{-(x/\theta)^\tau}}{e^{-(x/\theta)^\tau}} = \frac{\tau x^{\tau-1}}{\theta^\tau}
$$

**(ii)** We are looking for values of $\tau$ for which the hazard rate function is a decreasing function:

$$
h(x) = \frac{\tau x^{\tau-1}}{\theta^\tau} \Rightarrow h'(x) = \frac{\tau(\tau - 1)x^{\tau-2}}{\theta^\tau}
$$

This derivative will be $\le 0$ for $0 \le \tau \le 1$ and hence these are the values for which the distribution has a heavy tail.

## Part e (2 points)

You are given that $\alpha = 2$, $\tau = \tfrac{1}{2}$, $\theta_X = 20$, and $\theta_Y = 10$. Use the limiting ratio of the survival function of $X$ to the survival function of $Y$ to compare their relative tail weights.

### Explanation
**(d)** (as printed) The limit of the ratio of survival functions is:

$$
\lim_{x\to\infty}\frac{S_X(x)}{S_Y(x)} = \lim_{x\to\infty}\frac{\theta_X^2}{(\theta_X + x)^2}e^{(x/\theta_Y)^{0.5}}
$$

Let $y = (x/\theta_Y)^{0.5}$:

$$
\begin{align*}
\lim_{x\to\infty}\frac{S_X(x)}{S_Y(x)} &= \lim_{y\to\infty}\frac{\theta_X^2 e^y}{\left(\theta_X + \theta_Y y^2\right)^2} \\
                                       &= \lim_{y\to\infty}\frac{\theta_X^2 e^y}{2\theta_X\theta_Y y^2 + \theta_X y^4} \text{ (as printed)} \\
&= \lim_{y\to\infty}\frac{e^y}{y^2 + y^4} \\
 &= \infty
\end{align*}
$$

Hence, $X$ has a heavier tail than $Y$.

### Examiner Report
For Part(e), the candidate needed to take the limit of the ratio between two survival functions. The ratio is an exponential function divided by polynomial as the argument goes to infinity. Full marks were given if the candidate demonstrated or even mentioned that an exponential function goes to infinity at a higher rate than a polynomial function. Using some arbitrary values to indicate the limit pattern was not acceptable.

## Part f (1 point)

You are given that $Y$ is in the MDA of the Gumbel distribution. Briefly describe the implication of this on the moments of $Y$.

### Explanation
**(e)** (as printed) As a distribution in the Gumbel MDA, $Y$ must have an infinite number of moments as all positive moments exist.
