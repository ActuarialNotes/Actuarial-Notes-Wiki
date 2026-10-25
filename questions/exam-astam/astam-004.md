---
id: "astam-004"
exam: "Exam ASTAM"
topic: "Bühlmann Credibility"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Bühlmann+Credibility
  - Concepts/Credibility
  - Concepts/Expected+Value+of+Process+Variance
  - Concepts/Variance+of+Hypothetical+Means
  - Concepts/Aggregate+Loss+Model
points: 0
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:87af9805c9f91a146d93eedba3e91c26cf61d837b03202cdf4c29031ed74d3af
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q4, p.8, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q4, pp.9-11, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-004.md
---

CBA Insurance Company splits drivers into three categories – Safe, Not So Safe, and Reckless. Within each category, claim frequency is Poisson distributed, and claim severity is Gamma distributed, but the parameters of the frequency and severity distributions differ, as shown in the following table.

| Type | Proportion of Total Drivers | Frequency parameter | Severity parameters |
|---|---|---|---|
| Safe | 0.5 | $\lambda$=0.04 | $\alpha = 3, \theta = 1000$ |
| Not So Safe | 0.3 | $\lambda$=0.10 | $\alpha = 4, \theta = 1000$ |
| Reckless | 0.2 | $\lambda$=0.25 | $\alpha = 5, \theta = 1000$ |

## Part a

The expected value of the process variance of the claim severities (for the observation of a single claim) under automobile coverage is 4 million to the nearest million. Calculate it to the nearest 1000.

### Explanation

| Type | propn | $\lambda$ | Severity | $E[X] = \alpha\theta$ | $Var[X] = \alpha\theta^2$ |
|---|---|---|---|---|---|
| S | 0.5 | 0.04 | $\alpha = 3, \theta = 1000$ | 3000 | $(3)(1000)^2 = 3{,}000{,}000$ |
| NSS | 0.3 | 0.10 | $\alpha = 4, \theta = 1000$ | 4000 | $(4)(1000)^2 = 4{,}000{,}000$ |
| R | 0.2 | 0.25 | $\alpha = 5, \theta = 1000$ | 5000 | $(5)(1000)^2 = 5{,}000{,}000$ |

We can calculate the probability of a claim arising from a random policyholder as:

$$\begin{aligned}
\Pr(S)\Pr(claim) &= (0.5)(0.04) \\
&= 0.02 \\
\Pr(NSS)\Pr(claim) &= (0.3)(0.10) \\
&= 0.03 \\
\Pr(R)\Pr(claim) &= (0.2)(0.25) \\
&= 0.05 \\
Total &= 0.02 + 0.03 + 0.05 \\
&= 0.10
\end{aligned}$$

Given that a claim arises, we have

$$\begin{aligned}
\Pr(S \mid Claim) &= 0.02/0.1 \\
&= 0.2 \\
\Pr(NSS \mid Claim) &= 0.03/0.10 \\
&= 0.3 \\
\Pr(R \mid Claim) &= 0.05/0.10 \\
&= 0.5
\end{aligned}$$

So

$$E\big[Var[X]\big] = (0.2)(3{,}000{,}000) + (0.3)(4{,}000{,}000) + (0.5)(5{,}000{,}000) = 4{,}300{,}000$$

## Part b

What is the variance of the hypothetical means for claim severities (for the observation of a single claim) under automobile coverage?

### Explanation

$$\begin{aligned}
E[X] &= (0.2)(3000) + (0.3)(4000) + (0.5)(5000) \\
&= 4300 \\
E[X^2] &= (0.2)(3000)^2 + (0.3)(4000)^2 + (0.5)(5000)^2 \\
&= 19{,}100{,}000 \\
\Rightarrow Var\big[E[X]\big] &= 19{,}100{,}000 - (4300)^2 \\
&= 610{,}000
\end{aligned}$$

## Part c

Over several years, an individual driver with automobile coverage has single claim of 20,000. Use Bühlmann Credibility to estimate this driver's future average claim severity.

### Explanation

$$K = \frac{E[Var]}{V[E]} = \frac{4{,}300{,}000}{610{,}000} = 7.04918$$

$$\Rightarrow Z = \frac{N}{N + K} = \frac{1}{1 + 7.04918} = 0.12424$$

$$\text{Estimated Severity} = (0.12424)(20{,}000) + (1 - 0.12424)(4300) = 6250.51$$

## Part d

What is the expected value of the process variance of the pure premium (for the observation of a single exposure) under this coverage?

### Explanation

$$E[S] = E[N]E[X] \quad\text{and}\quad Var[S] = E[N]Var[X] + \big(E[X]\big)^2 Var[N]$$

| Type of Driver | E(S) | Var(S) |
|---|---|---|
| Safe | (0.04)(3000)=120 | $(0.04)(3{,}000{,}000)+(3000)^2(0.04)=480{,}000$ |
| Not So Safe | (0.1)(4000)=400 | $(0.1)(4{,}000{,}000)+(4000)^2(0.1)=2{,}000{,}000$ |
| Reckless | (0.25)(5000)=1250 | $(0.25)(5{,}000{,}000)+(5000)^2(0.25)=7{,}500{,}000$ |

$$EPV = (0.5)(480{,}000) + (0.3)(2{,}000{,}000) + (0.2)(7{,}500{,}000) = 2{,}340{,}000$$
