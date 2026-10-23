---
id: "astam-013"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Exponential+Distribution
  - Concepts/Fisher+Information
  - Concepts/Approximate+Confidence+Interval
  - Concepts/Delta+Method
points: 5
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2536652919fca64360de572d3726af6d9a0b76690ccc92ffdcacb61f10c2d49c
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q13, p.18, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q13, p.26, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-013.md
---

An insurance company offers telematics insurance to its automobile insurance policyholders. For a portfolio with $n$ new policies, a total of $M$ claims is recorded in the first $t_0$ months of cover. You may assume that each policy gives rise to a maximum of one claim and that claims arise independently of the others.

Assume that for each policy, the time (measured in months) until a claim occurs is modeled as a random variable $T$, with

$$\Pr\left[T \le t\right] = F(t) = 1 - e^{-\beta t} \qquad t > 0, \quad \beta > 0$$

## Part a

Write down the likelihood of observing $M$ claims in $t_0$ months.

### Explanation
We are given that $Pr(\text{a policy incurs a claim by time } t_0) = 1 - e^{-\beta t_0}$ so that

$$L(\beta; t_0) = \left(1 - e^{-\beta t_0}\right)^M \left(e^{-\beta t_0}\right)^{n-M}.$$

## Part b

Determine the maximum likelihood estimate of $\beta$ in terms of $M$, $t_0$, and $n$.

### Explanation
We can maximize the loglikelihood given by

$$\log L(\beta; t_0) = M \log\left(1 - e^{-\beta t_0}\right) + (n - M)\log\left(e^{-\beta t_0}\right) = M \log\left(1 - e^{-\beta t_0}\right) - (n - M)\beta t_0.$$

Setting the derivative to zero

$$\frac{d \log L}{d\beta} = \frac{M t_0 e^{-\beta t_0}}{1 - e^{-\beta t_0}} - (n - M)t_0 = 0,$$

we have

$$\hat{\beta} = -\frac{1}{t_0} \log\left(\frac{n - M}{n}\right).$$

## Part c

Explain, but do not perform the calculations, how you could construct an approximate confidence interval for $\beta$.

### Explanation
Use the asymptotic results of maximum likelihood estimates with standard error estimated using the information quantity. The 95% confidence interval can then be evaluated as $\hat{\beta} \pm 1.96\, se(\hat{\beta})$.

## Part d

Explain carefully how you can use your estimated value of $\beta$ to estimate the average time until a claim occurs, denoted $\mu$.

### Explanation
Since the average time to a claim is $\mu = 1/\beta$, then its MLE is

$$\hat{\mu} = 1/\hat{\beta} = -\frac{t_0}{\log\left(\frac{n - M}{n}\right)}.$$

## Part e

Explain carefully how you can estimate the variance of your estimate for $\mu$.

### Explanation
Since $\mu$ is a function of $\beta$, i.e. $\mu = g(\beta)$, one can use the Delta method to estimate its variance or standard estimate:

$$Var(\hat{\mu}) = Var(\hat{\beta}) \times \left[g'(\hat{\beta})\right]^2.$$
