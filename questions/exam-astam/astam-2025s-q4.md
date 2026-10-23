---
id: "astam-2025s-q4"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Truncation
  - Concepts/Fisher+Information
  - Concepts/Approximate+Confidence+Interval
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Coinsurance
points: 9
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b9d135ed756514333aa5a9605236d750efa19aac920b730351c9e88191cee0a6
  sources:
    - "SOA Exam ASTAM Spring 2025 — exam questions, Q4, p.8, sha256:6abc81ba7d868ecb7eb1a7a747b4558adcfc1794531dcef0ef95c6c8f82c33e6 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-astam-exam.pdf"
    - "SOA Exam ASTAM Spring 2025 — model solutions and examiners' comments, Q4, pp.10-13, sha256:f651a9645c9b8ace921bb11d9def2e3655895a0fd6c563fe8777c43eb3f706e5 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2025s-q4.md
---

An actuary is analyzing the reported losses from an auto insurance with an ordinary deductible of $d$. Let $X$ denote the ground-up loss random variable, which is assumed to have a Pareto distribution with known $\theta$ and unknown $\alpha$.

A random sample of 20 reported ground-up losses was collected. Note that losses below the deductible are not reported to the insurer, so only losses above the deductible were sampled.

## Part a (3 points)

(i) Determine the log-likelihood function for the sample in terms of $\theta, \alpha, d,$ and the sample data, $x_1, x_2, \cdots, x_{20}$.

(ii) You are given that $\theta = 5{,}000$, $d = 1{,}000$, and that $\displaystyle\sum_{i=1}^{20} \ln(\theta + x_i) = 181.66$. Show that the maximum likelihood estimate of $\alpha$, denoted $\hat{\alpha}$, is 2.6 to the nearest 0.1. You should calculate the value to the nearest 0.001.

### Explanation

(i) We have samples of the ground up loss *conditional* on the loss exceeding the deductible, 1000. Let $n = 20$. Then

$$
\begin{align*}
L(\alpha) &= \prod_{i=1}^{n} \frac{f(x_i)}{S(d)} = \prod_{i=1}^{n} \left(\frac{\alpha\theta^{\alpha}}{(\theta + x_i)^{\alpha+1}}\right)\left(\frac{\theta + d}{\theta}\right)^{\alpha} = \prod_{i=1}^{n} \frac{\alpha(\theta + d)^{\alpha}}{(\theta + x_i)^{\alpha+1}} \\
&= \alpha^{n} (\theta + d)^{\alpha n} \prod_{i=1}^{n} (\theta + x_i)^{-(\alpha+1)}
\end{align*}
$$

$$\Rightarrow l(\alpha) = n\log\alpha + \alpha n \log(\theta + d) - (\alpha + 1)\sum_{i=1}^{n} \log(\theta + x_i)$$

(ii)

$$l'(\alpha) = \frac{n}{\alpha} + n\log(\theta + d) - \sum_{i=1}^{n} \log(\theta + x_i)$$

Set equal to 0 for

$$\hat{\alpha} = \frac{n}{\sum_{i=1}^{n} \log(\theta + x_i) - n\log(\theta + d)} = \frac{20}{181.66 - 20\log(6000)} = 2.60766$$

### Examiner Report

Examiners' Comments: Candidates did very well. Most candidates understand that for left-truncated reported losses, conditional density should be used for the likelihood function. Common mistakes include ignoring the truncation or treating the reported losses as net losses after applying the deductible (although the question states that they are ground-up losses).

## Part b (1 point)

Estimate a 95% confidence interval for $\alpha$ using Fisher's information.

### Explanation

Take the second derivative of the log likelihood:

$$l''(\alpha) = -\frac{n}{\alpha^2} \Rightarrow Var[\hat{\alpha}] \approx \frac{\hat{\alpha}^2}{n} = 0.3400 = 0.5831^2$$

$$\Rightarrow 95\% \text{ CI is approximately } \big(2.608 - 1.96(0.5831),\ 2.608 + 1.96(0.5831)\big) = (1.46\,;\ 3.75)$$

### Examiner Report

Examiners' Comments: Candidates did well in this part.

## Part c (2 points)

Let

$$Y = \begin{cases} 0 & \text{if } X \le d \\ X - d & \text{if } X > d \end{cases}$$

Calculate the maximum likelihood estimate of $E[Y]$.

### Explanation

Method 1:

$$Y + (X \wedge d) = X$$

$$
\begin{align*}
E[Y] &= E[X] - E[X \wedge d] \\
     &= \frac{\theta}{\alpha - 1} - \frac{\theta}{\alpha - 1}\left(1 - \left(\frac{\theta}{\theta + d}\right)^{\alpha - 1}\right) \\
&= \frac{\theta}{\alpha - 1}\left(\frac{\theta}{\theta + d}\right)^{\alpha - 1} \\
 &= \frac{\theta^{\alpha}}{(\alpha - 1)(\theta + d)^{\alpha - 1}}
\end{align*}
$$

$$\Rightarrow \text{MLE of } E[Y] = \frac{\theta^{\hat{\alpha}}}{(\hat{\alpha} - 1)(\theta + d)^{\hat{\alpha} - 1}} = 2319.9$$

Method 2:

$$E[Y] = E[X - d \mid X > d]\Pr[X > d]$$

$$(X - d \mid X > d) \sim \text{Pareto}(\alpha, \theta + d) \quad \text{from the tables}$$

$$\Rightarrow E[Y] = \frac{\theta + d}{\alpha - 1}\left(\frac{\theta}{\theta + d}\right)^{\alpha} = \frac{\theta^{\alpha}}{(\alpha - 1)(\theta + d)^{\alpha - 1}}$$

$$\Rightarrow \text{MLE of } E[Y] = \frac{\theta^{\hat{\alpha}}}{(\hat{\alpha} - 1)(\theta + d)^{\hat{\alpha} - 1}} = 2319.9$$

Method 3:

$$
\begin{align*}
E[Y] &= \int_d^{\infty} (x - d) f(x)\,dx \\
     &= \int_d^{\infty} (x - d)\frac{\alpha\theta^{\alpha}}{(\theta + x)^{\alpha+1}}\,dx \\
&= \int_0^{\infty} z \frac{\alpha\theta^{\alpha}}{(\theta + d + z)^{\alpha+1}}\,dx \text{ (as printed)} \\
 &= \frac{\theta^{\alpha}}{(\theta + d)^{\alpha}} \int_0^{\infty} z \frac{\alpha(\theta + d)^{\alpha}}{(\theta + d + z)^{\alpha+1}}\,dx \text{ (as printed)} \\
&= \frac{\theta^{\alpha}}{(\theta + d)^{\alpha}}\left(\frac{\theta + d}{\alpha - 1}\right) \\
 &= \frac{\theta^{\alpha}}{(\alpha - 1)(\theta + d)^{\alpha - 1}}
\end{align*}
$$

$$\Rightarrow \text{MLE of } E[Y] = \frac{\theta^{\hat{\alpha}}}{(\hat{\alpha} - 1)(\theta + d)^{\hat{\alpha} - 1}} = 2319.9$$

### Examiner Report

Examiners' Comments: Candidates did well. A few candidates calculate the MLE for the expected loss per payment instead of the expected loss per loss requested in question. Some candidates didn't apply deductible correctly and mistakenly calculate $E\left[(X - d)^{+}\right]$ as $E[X] - d$.

## Part d (2 points)

For $X$ with a Pareto distribution with $\theta = 5000$ and $\alpha = \hat{\alpha}$, show that the loss elimination ratio for an ordinary deductible of $d = 1000$ is 0.25 to the nearest 0.05. You should calculate the value to the nearest 0.001.

### Explanation

$$
\begin{align*}
LER &= \frac{E[X \wedge d]}{E[X]} \\
E[X] &= \frac{\theta}{\hat{\alpha} - 1} \\
&= 3110.1 \\
E[X \wedge d] &= E[X] - E[Y] \\
              &= 3110.1 - 2319.9 \\
&= 790.16 \\
\Rightarrow LER &= 25.406\%
\end{align*}
$$

### Examiner Report

Examiners' Comments: Candidates did excellently in this part.

## Part e (1 point)

The actuary's colleague notes that an ordinary deductible of $d = 1000$ produces a similar reduction in expected payment as does a 75% coinsurance.

Explain why an insurer may prefer to impose an ordinary deductible of 1000 over 75% coinsurance.

### Explanation

- Deductibles tend to eliminate small claims, reducing expense ratios. In this case, around 28% (as printed) of small losses would be eliminated with a deductible of 1000. Using co-insurance, every loss may be submitted for partial reimbursement, even very small ones.
- A major motivation for auto insurance is to cover the rare large losses, particularly (for mandatory insurance) the liability losses. Coinsurance fails to provide adequate cover, as 75% of a very large loss is still a very large loss, leading to a large potential increase in defaults on policyholder share of third party payouts.
- Regulators may not accept co-insurance for mandatory cover as it would likely lead to loss of cover for third parties.

### Examiner Report

Examiners' Comments: Overall, most candidates explained well why insurers may prefer deductible to a coinsurance design when the expected losses are similar. Some candidates try to explain the advantages of deducible, but fail to logically explain why it is preferrable, compared with coinsurance. Some candidates discussed the question from the policyholder perspective rather than the insurer perspective.
