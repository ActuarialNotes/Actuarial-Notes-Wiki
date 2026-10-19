---
id: "astam-2024f-q4"
exam: "Exam ASTAM"
topic: "Risk Measure"
learning_objective: "Severity Models"
difficulty: medium
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Hazard+Rate
  - Concepts/Tail+Weight
  - Concepts/Risk+Measure
  - Concepts/Mean+Excess+Loss
  - Concepts/Generalized+Extreme+Value+Distribution
  - Concepts/Pareto+Distribution
  - Concepts/Severity+Distribution
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4c781bdc168171b5c3f5731630c0dea61b63493a855f010805d9770d5573fb0a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2024f-q4.md
---

An insurance company has a portfolio of insurance policies for which the loss random variable, $X > 0$, has the following survival function:

$$S_X(x) = \left(\frac{\lambda}{\lambda + \theta x}\right)^{\frac{1}{\theta}} \qquad \lambda > 0, \theta > 0$$

## Part a (3 points)

(i) Show that the hazard rate function for $X$ is $h(x) = \dfrac{1}{\lambda + \theta x}$.

(ii) Briefly categorize the tail behavior of $X$, based on $h(x)$.

### Explanation
(i)

$$h(x) = -\frac{d\log S(x)}{dx};$$

$$\log S(x) = \left(\frac{1}{\theta}\right)\big(\log\lambda - \log(\lambda + \theta x)\big)$$

$$\Rightarrow h(x) = \left(\frac{1}{\theta}\right)\left(\frac{\theta}{\lambda + \theta x}\right) = \frac{1}{\lambda + \theta x}$$

OR

$$h(x) = \frac{f(x)}{S(x)};$$

$$f(x) = -\frac{d}{dx}S(x) = \lambda^{\frac{1}{\theta}}(\lambda + \theta x)^{-\frac{1}{\theta} - 1} = \left(\frac{\lambda}{\lambda + \theta x}\right)^{\frac{1}{\theta}}\left(\frac{1}{\lambda + \theta x}\right)$$

$$\Rightarrow h(x) = \frac{\left(\frac{\lambda}{\lambda + \theta x}\right)^{\frac{1}{\theta}}\left(\frac{1}{\lambda + \theta x}\right)}{\left(\frac{\lambda}{\lambda + \theta x}\right)^{\frac{1}{\theta}}} = \left(\frac{1}{\lambda + \theta x}\right)$$

(ii) We see that the hazard rate is a decreasing function of $x$ which indicates a fat-tailed distribution.

### Examiner Report
Part A

Candidates did very well on part A. The biggest error was incorrectly determining the derivative of the $\log S(x)$ or the derivative of $S(x)$. Additionally, to get full credit on a "show" question, you must actually show the steps which lead to the given answer. It is best to show too much work than not enough.

## Part b (1 point)

The insurance company is deciding whether to use the Value at Risk or Expected Shortfall risk measure to determine its solvency capital needed to cover adverse loss experience.

Describe one advantage and one disadvantage of using the Expected Shortfall risk measure, as compared with the Value at Risk measure.

### Explanation
ES Advantage: It is a coherent risk measure, which means it is less easy to game, i.e. does not incentivize risk seeking behavior.

ES Advantage: It takes into consideration how large the rare tail losses may be. These do not impact the VaR.

ES Disadvantage: for some fat tailed distributions the ES may not be defined.

ES Disadvantage: requires more information to calculate; VaR can be calculated without information on the far right tail of the loss distribution.

### Examiner Report
Part B

Candidates also did well on this part although many candidates did not state that ES was a coherent risk measure.

## Part c (3 points)

Now let $\lambda = 2000$ and $\theta = 0.4$.

(i) Show that for the distribution of $X$ the 99% Value at Risk (VaR), denoted $Q_{99\%}$, is 26,550 to the nearest 10. You should calculate the value to the nearest 1.

(ii) You are given that the mean excess loss function for $X$ is

$$e(d) = \frac{\lambda + \theta d}{1 - \theta} \quad \text{for } 0 < \theta < 1.$$

Calculate the confidence level $\alpha$ such that the $\alpha$-Expected Shortfall, denoted $ES_\alpha$, is the same as the 99% VaR calculated in (c)(i).

(iii) In general, suppose that $Q_\beta = ES_\alpha$ for some $\alpha, \beta$. Explain why it is necessary that $\alpha \le \beta$.

### Explanation
(i)

$$S(Q) = 0.01 \Rightarrow \left(\frac{2000}{2000 + 0.4Q}\right)^{2.5} = 0.01$$

$$\Rightarrow 2000 + 0.4Q = 2000(0.01)^{-0.4}$$

$$\Rightarrow Q = \frac{2000}{0.4}\left(0.01^{-0.4} - 1\right) = 26{,}547.9$$

(ii)

$$ES_\alpha = Q_\alpha + e(Q_\alpha) = Q_\alpha + \frac{\lambda + \theta Q_\alpha}{1 - \theta} = \frac{Q_\alpha + \lambda}{1 - \theta}$$

Set this equal to 26,547.9 from (i)

$$26{,}547.9 = \frac{Q_\alpha + \lambda}{1 - \theta} \Rightarrow Q_\alpha = 26{,}547.9(0.6) - 2000 = 13{,}928.7$$

To find $\alpha$, set $S(Q_\alpha) = 1 - \alpha$

$$\Rightarrow 1 - \alpha = \left(\frac{2000}{2000 + 0.4(13{,}928.7)}\right)^{2.5} \Rightarrow \alpha = 0.9641$$

(iii) Note that both $Q_\alpha$ and $ES_\alpha$ are increasing functions of $\alpha$.

Also, for continuous loss distributions, $ES_\alpha$ is the expected value of loss given that it is greater than $Q_\alpha$, so $ES_\alpha \ge Q_\alpha$

Hence, if $ES_\alpha = Q_\beta$ for some $\alpha$ and $\beta$, then $Q_\beta \ge Q_\alpha \Rightarrow \beta \ge \alpha$

### Examiner Report
Part C

Many candidates earned full credit on part (i) but many candidates did not earn credit on part (ii) as their work showed that they did not really understand the concepts and calculation of ES. Part (iii) was done acceptably.

## Part d (3 points)

(i) Identify the functions $c_n$ and $d_n$ (not involving $x$) such that for any $x$, $\theta > 0$,

$$nS(c_nx + d_n) = \left(1 + \theta x\right)^{-1/\theta}$$

(ii) Explain the significance of this result in terms of the relationship between $\theta$ and the tail behavior of $X$.

### Explanation
(i)

$$\begin{align*}
nS(c_nx + d_n) &= n\left(\frac{\lambda}{\lambda + \theta(c_nx + d_n)}\right)^{\frac{1}{\theta}} \\
&= \left(\frac{n^\theta\lambda}{\lambda + \theta(c_nx + d_n)}\right)^{\frac{1}{\theta}} \\
&= \left(\frac{\lambda + \theta c_nx + \theta d_n}{n^\theta\lambda}\right)^{-\frac{1}{\theta}} \\
&= \left(\frac{\lambda + \theta d_n}{n^\theta\lambda} + \frac{c_n}{n^\theta\lambda}(\theta x)\right)^{-\frac{1}{\theta}}
\end{align*}$$

For this to be equal to $(1 + \theta x)^{-\frac{1}{\theta}}$, we need

$$\frac{c_n}{\lambda n^\theta} = 1 \Rightarrow c_n = \lambda n^\theta$$

and

$$\frac{\lambda + \theta d_n}{\lambda n^\theta} = 1 \Rightarrow d_n = \frac{\lambda(n^\theta - 1)}{\theta}$$

(ii) This result shows that the distribution is in the MDA of the GEV distribution, with parameter $\xi = \theta$; if $\theta > 0$ this is the Fréchet distribution, which is very fat-tailed.

### Examiner Report
Part D

Candidates who attempted part (i) did quite well on this part. Also, many candidates were able to describe the significance of the results in part (ii).
