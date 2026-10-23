---
id: "astam-2026s-q4"
exam: "Exam ASTAM"
topic: "Bayesian Estimation"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Bayesian+Estimation
  - Concepts/Conjugate+Prior
  - Concepts/Predictive+Distribution
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Bühlmann+Credibility
  - Concepts/Credibility
  - Concepts/Bayesian
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:caa6e2d6dede107fcfb6ee92fed35033f4e3a511d4997504306acc40f22d2170
  sources:
    - "SOA Exam ASTAM Spring 2026 — exam questions, Q4, pp.10-11, sha256:2d067bc99c3437f3791bb61c595db1e2cc8794b876f88dd9b506a5a543cac511 — https://www.soa.org/globalassets/assets/files/edu/2026/astam/april-2026-astam-exam.pdf"
    - "SOA Exam ASTAM Spring 2026 — model solutions and examiners' comments, Q4, pp.7-9, sha256:3930c2d38ba3d08955f65aededeb3bbb1c1eab5191b4f11c7481ceb177a7522f — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2026s-q4.md
---

Let $N$ denote the claim frequency random variable for an automobile insurance policy. The distribution of $N$ is assumed to depend on the driving habits of the policyholder. To model this, the insurer assumes that $N$ depends on an unknown risk parameter $\Lambda$, where $\Lambda$ varies by policyholder.

You are given that

- $N \mid \Lambda \sim \text{Poisson}(\Lambda)$
- The prior distribution of $\Lambda$ is a Gamma distribution, with parameters $\alpha = 2$ and $\theta = 0.2$.

## Part a (2 points)

(i) Calculate $E[N]$

(ii) Calculate the standard deviation of $N$.

### Explanation
$$\begin{align*}
N \mid \Lambda \sim \text{Poi}(\Lambda) &\Rightarrow E\left[N \mid \Lambda\right] = \Lambda \text{ and } V\left[N \mid \Lambda\right] = \Lambda \\
\Lambda \sim \text{Gamma}(\alpha = 2, \theta = 0.2) &\Rightarrow E\left[\Lambda\right] = 0.4 \text{ and } V\left[\Lambda\right] = 0.08
\end{align*}$$

(i) $$E\left[N\right] = E\left[E\left[N \mid \Lambda\right]\right] = E\left[\Lambda\right] = 0.4$$

(ii)

$$\begin{align*}
V\left[N\right] &= E\left[V\left[N \mid \Lambda\right]\right] + V\left[E\left[N \mid \Lambda\right]\right] \\
&= E[\Lambda] + V[\Lambda] \\
&= 0.4 + 0.08 = 0.48 \\
\Rightarrow \text{SD}[N] &= 0.6928
\end{align*}$$

### Examiner Report
1. Part (a) was generally done very well by almost all candidates, especially part (a)(i), for which most candidates received full credit.
2. Part (a)(ii) was mostly done well, though some candidates omitted one of the two variance terms. A small number of candidates also overlooked the need to convert the variance to a standard deviation.
3. Some candidates knew that the unconditional distribution of N is Negative Binomial and used this to get the mean and variance. This earned full credit if done correctly.

## Part b (2 points)

You are given the following claims history for an individual policyholder.

| Calendar Year | Policy Year | Number of Accidents |
|---|---|---|
| 2023 | 1 | 0 |
| 2024 | 2 | 2 |
| 2025 | 3 | 0 |

Show that the posterior distribution of $\Lambda$ is a Gamma distribution with parameters $\alpha^* = 4$ and $\theta^* = \frac{1}{8} = 0.125$.

### Explanation
Let $\pi(\lambda)$ denote the prior pdf for $\Lambda$, and let $L(\mathbf{x} \mid \lambda)$ denote the likelihood function for the data assuming that $\Lambda = \lambda$. The posterior pdf for $\Lambda$ is proportional to the product of the prior and the likelihood, i.e.

$$\begin{align*}
\pi_{\Lambda \mid \mathbf{x}}(\lambda) &\propto \pi(\lambda) L(\mathbf{x} \mid \lambda) \\
\pi(\lambda) &= \frac{\lambda^{\alpha - 1} e^{-\lambda/\theta}}{\theta^\alpha \Gamma(\alpha)} \\
             &= \frac{\lambda e^{-5\lambda}}{0.2^2} \\
L(\mathbf{x} \mid \lambda) &= \left(\frac{e^{-\lambda}\lambda^0}{0!}\right)\left(\frac{\lambda^2 e^{-\lambda}}{2!}\right)\left(\frac{e^{-\lambda}\lambda^0}{0!}\right) \\
                           &= \frac{\lambda^2 e^{-3\lambda}}{2} \\
\Rightarrow \pi_{\Lambda \mid \mathbf{x}}(\lambda) &\propto \lambda^3 e^{-8\lambda} \quad \text{(ignoring terms not involving } \lambda\text{)}
\end{align*}$$

By comparison with the Gamma pdf, we see that the posterior distribution is Gamma with

$$\lambda^{\alpha^* - 1} = \lambda^3 \Rightarrow \alpha^* = 4 \quad \text{and} \quad e^{-\lambda/\theta^*} = e^{-8\lambda} \Rightarrow \theta^* = \frac{1}{8} = 0.125.$$

### Examiner Report
1. The goal of this part was for candidates to demonstrate that they could derive the conjugacy result, as shown by the use of the words "Show that" in the question. Only a minority of candidates did so. Many others simply stated the conjugacy result which earned very little credit.

## Part c (3 points)

(i) Show that the predictive distribution of claim frequency for this policyholder is Negative Binomial.

(ii) Calculate E[N] under the predictive distribution.

### Explanation
(i) The predictive distribution is the unconditional distribution of $N$ using the posterior distribution for $\Lambda$. That is

$$\begin{align*}
p_k &= \int_0^\infty \Pr\left[N = k \mid \Lambda = \lambda\right] \pi(\lambda)\, d\lambda \\
&= \int_0^\infty \frac{e^{-\lambda}\lambda^k}{k!} \frac{\lambda^3 e^{-8\lambda}}{\left(\tfrac{1}{8}\right)^4 \Gamma(4)}\, d\lambda \\
 &= \int_0^\infty \frac{\lambda^{k+3} e^{-9\lambda}}{k!\left(\tfrac{1}{8}\right)^4 \Gamma(4)}\, d\lambda
\end{align*}$$

We note that the integrand is proportional to a gamma pdf, evaluated at $\lambda$, with parameters $\alpha^+ = k + 4$ and $\theta^+ = \frac{1}{9}$. Using the fact that the gamma pdf must integrate to 1 over the interval from 0 to $\infty$, we have

$$\begin{align*}
p_k &= \int_0^\infty \frac{\lambda^{k+3} e^{-9\lambda}}{\left(\tfrac{1}{8}\right)^4 k!\,\Gamma(4)}\, d\lambda \\
&= \int_0^\infty \frac{\lambda^{k+3} e^{-9\lambda}}{\left(\tfrac{1}{9}\right)^{k+4} \Gamma(k+4)}\, d\lambda \; \frac{\left(\tfrac{1}{9}\right)^{k+4} \Gamma(k+4)}{k!\left(\tfrac{1}{8}\right)^4 \Gamma(4)} \\
&= \frac{\left(\tfrac{1}{9}\right)^{k+4} \Gamma(k+4)}{k!\left(\tfrac{1}{8}\right)^4 \Gamma(4)} \\
 &= \left(\frac{1}{9}\right)^k \left(\frac{8}{9}\right)^4 \frac{\Gamma(k+4)}{\Gamma(4)\, k!}
\end{align*}$$

This is a negative binomial probability function, with parameter $r = 4$, and where

$$\frac{\beta}{1 + \beta} = \frac{1}{9} \Rightarrow \beta = \frac{1}{8} = 0.125$$

(ii) Under the predictive distribution $E[N] = r\beta = \frac{4}{8} = 0.5$

### Examiner Report
1. The average points earned for this part were very low. Very few candidates made a substantive effort to do part (i), though those that did tended to get a majority of the credit.
2. Many candidates noted that the Gamma distribution is a conjugate prior for the Poisson rate parameter; this is true and relates to the result in part (b), but isn't relevant for part (c) and earned no credit.
3. Part (c)(ii) was generally done well by those who attempted it, with the only common mistake being to mix up parameter values.

## Part d (2 points)

Now suppose the claim frequency is estimated using Buhlmann credibility.

(i) Write down the values for the Buhlmann parameters, $v$, $a$, and $\mu$.

(ii) Calculate the Buhlmann estimate of the claim frequency.

### Explanation
(i)

$$\begin{align*}
v &= E\left[V\left[N\right]\right] \text{ (as printed)} \\
  &= E\left[\Lambda\right] \\
&= 0.4 \\
a &= V\left[E\left[N\right]\right] \text{ (as printed)} \\
  &= V\left[\Lambda\right] \\
&= 0.08 \\
\mu &= E\left[N\right] \\
&= 0.4
\end{align*}$$

(ii)

$$\begin{align*}
Z &= \frac{3}{3 + \frac{v}{a}} \\
  &= \frac{3}{8} \\
&= 0.375 \\
\text{Cred Est} &= Z\bar{X} + (1 - Z)\mu \\
                &= 0.375\left(\frac{2}{3}\right) + 0.625(0.4) \\
&= 0.50
\end{align*}$$

### Examiner Report
1. Part (d) was generally done quite well, with most candidates getting full (or nearly full) credit.
2. Some candidates mixed up the Bühlmann parameters, typically swapping a and ν, and some others used posterior parameter values instead of prior values.
3. The Bühlmann estimate of the claim frequency, part (d)(ii), was done well by the bulk of the candidates.

## Part e (1 point)

Your colleague suggests that the best estimate of the annual claim frequency for this policyholder is the estimate from the data, $\bar{X} = \frac{2}{3}$. Critique this suggestion.

### Explanation
We only have 3 years of data. This means that the estimate from the policyholder's own experience is not likely to be very accurate.

By using a credibility approach, we can combine the information from the policyholder's experience with the prior expectation based (presumably) on substantially more data.

### Examiner Report
This part was generally done well by those who attempted it.
