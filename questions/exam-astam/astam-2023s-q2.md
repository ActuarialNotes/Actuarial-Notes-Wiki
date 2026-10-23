---
id: "astam-2023s-q2"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: hard
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Delta+Method
  - Concepts/Approximate+Confidence+Interval
  - Concepts/BIC
  - Concepts/Poisson+Distribution
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a3bf6cee3a83a1fc4241f125d443d1948e9196dd7bf43067acb3d882cd381f11
  sources:
    - "SOA Exam ASTAM Spring 2023 (April 26, 2023), question booklet, Q2, pp.3-4, sha256:fc23b48a1dbfd1d9c85380d5a3605927ba53d90641d5dcba1ab238bf3e02abaf — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-astam.pdf"
    - "SOA ASTAM April 2023 Model Solutions, Q2, pp.4-6, sha256:ac32f8885c3d0e8456bb4edec83c8bf8a89243d21bd6ddaa232842c22d3640a3 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-astam.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2023s-q2.md
---

You are given the following claim frequency data for a line of business with 100 one-year policies.

| Number of Claims ($k$) | 0 | 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|---|
| Policies ($n_k$) | 46 | 34 | 13 | 4 | 3 | 0 |

You are particularly interested in the probability that a policy will have no claims in a year, denoted $p_0$.

You first fit a Poisson ($\lambda$) distribution to this data using Maximum Likelihood Estimation (MLE).

## Part a (3 points)

You are given that the MLE of $\lambda$ is $\hat{\lambda} = 0.84$.

- (i) (1 point) Show that the MLE of $p_0$ is $\hat{p}_0 = 0.43$ to the nearest 0.01. You should calculate the value to the nearest 0.001.
- (ii) (2 points) Use the delta method to construct an approximate 95% linear confidence interval for $p_0$ under this model.

### Explanation
**(i)** Since $p_0 = g(\lambda) = e^{-\lambda}$ is a one-to-one function, by the invariance property of MLE, the MLE of $p_0$ is $\hat{p}_0 = e^{-\hat{\lambda}} = e^{-0.84} = 0.4317$.

**(ii)** We know that $\mathrm{Var}\left[\hat{\lambda}\right] = \mathrm{Var}\left[\bar{N}\right] = \dfrac{\lambda}{n}$, and $g'(\lambda) = -e^{-\lambda}$.

Using the delta method, the variance of the maximum likelihood estimator of $p_0$ is

$$
\begin{align*}
\mathrm{Var}\left(g\left(\hat{\lambda}\right)\right) &\approx \left[g'\left(\hat{\lambda}\right)\right]^2 \mathrm{Var}\left(\hat{\lambda}\right) = \left[-e^{-0.84}\right]^2 \times \frac{0.84}{100} \\
&= 0.001566.
\end{align*}
$$

Therefore, the 95% linear CI for $p_0$ is

$$
\left(0.4317 \pm 1.96\sqrt{0.001566}\right) = (0.3542,\ 0.5093)
$$

### Examiner Report
Overall, this question proved to be one of the more difficult ones. Candidates often knew what formulas to use, but were unable to derive or explain them.

Candidates did very well on part (a), with most achieving maximum credit.

## Part b (3 points)

You next fit a zero-modified Poisson distribution to this data.

- (i) (1 point) Write down the likelihood function for the zero-modified Poisson distribution in terms of the model parameters ($\lambda$ and $p_0^M$) and the data ($n_k$).
- (ii) (2 points) Using the likelihood function, show that the MLE of $p_0^M$ is $\hat{p}_0^M = 0.5$ to the nearest 0.1. You should calculate the value to the nearest 0.01.

### Explanation
**(i)** The likelihood function for the zero-modified Poisson distribution is

$$
\begin{align*}
L\left(\lambda, p_0^M\right) &= \prod_{k=0}^{\infty}\left(p_k^M\right)^{n_k} = \left(p_0^M\right)^{n_0}\prod_{k=1}^{4}\left(\frac{1-p_0^M}{1-p_0}\,p_k\right)^{n_k} \\
&= \left(p_0^M\right)^{n_0}\left(1-p_0^M\right)^{n-n_0}\prod_{k=1}^{4}\left(\frac{\lambda^k e^{-\lambda}}{k!\left(1-e^{-\lambda}\right)}\right)^{n_k} \\
&= \left(p_0^M\right)^{46}\left(1-p_0^M\right)^{54}\left(1-e^{-\lambda}\right)^{54} e^{-54\lambda}\,\lambda^{84}\,K \text{ (as printed)}
\end{align*}
$$

where $K = \prod_{k=1}^{4}\left(\dfrac{1}{k!}\right)^{n_k}$ does not involve $\lambda$ or $p_0^M$.

**(ii)** The log-likelihood function is

$$
l\left(\lambda, p_0^M\right) = n_0 \log p_0^M + (n - n_0)\log\left(1 - p_0^M\right) + C
$$

where $C$ is a function of $\lambda$ only. Therefore,

$$
\frac{\partial}{\partial p_0^M}\, l\left(\lambda, p_0^M\right) = \frac{n_0}{p_0^M} - \frac{n - n_0}{1 - p_0^M}
$$

Set equal to 0 for the MLE:

$$
\begin{align*}
0 &= \frac{n_0}{\hat{p}_0^M} - \frac{n - n_0}{1 - \hat{p}_0^M} \\
\Rightarrow \left(1 - \hat{p}_0^M\right)n_0 &= \hat{p}_0^M\,(n - n_0) \\
&\Rightarrow \hat{p}_0^M = \frac{n_0}{n} = 0.46
\end{align*}
$$

### Examiner Report
Part (b) proved much more challenging. Very few candidates were able to write down the likelihood function of the ZM Poisson distribution, and therefore very few could derive the MLE required in (b)(ii). Many candidates omitted this part completely.

## Part c (2 points)

- (i) Show that $\mathrm{Var}\left[\hat{p}_0^M\right] = \dfrac{p_0^M\left(1 - p_0^M\right)}{100}$.
- (ii) Construct an approximate 95% linear confidence interval for $p_0^M$ under this model.

### Explanation
**(i)** As a random variable, $\hat{p}_0^M = \dfrac{N_0}{n}$ where $N_0 \sim Bin\left(n, p_0^M\right)$,

$$
\begin{align*}
\mathrm{Var}\left[\hat{p}_0^M\right] &= \mathrm{Var}\left[\frac{N_0}{n}\right] \\
&= \frac{1}{n^2}\left(n p_0^M\left(1 - p_0^M\right)\right) \\
                                     &= \frac{p_0^M\left(1 - p_0^M\right)}{n} \\
&\approx \frac{0.46(1 - 0.46)}{100} = 0.002484
\end{align*}
$$

**(ii)** The estimated 95% confidence interval is

$$
\left(0.46 \pm 1.96\sqrt{0.002484}\right) = (0.3623,\ 0.5577)
$$

### Examiner Report
Part (c) was also omitted by many candidates. Others correctly wrote down the variance, but few were able to satisfy the "show that" part of the question.

## Part d (2 points)

You have calculated the following maximum log-likelihood values for the two models:

| Model | Poisson | Zero-Modified Poisson |
|---|---|---|
| Maximum Log-likelihood | -124.36 | -123.91 |

- (i) Calculate the Schwarz Bayes Criterion (SBC) for both models.
- (ii) Your colleague claims that, because the SBC favors the Poisson model, the Poisson model will be superior for predicting the value of $p_0$. State with reasons whether or not your colleague is correct.

### Explanation
**(i)** The SBC is calculated as $l - \frac{r}{2}\ln n$, where $l$ is the maximum loglikelihood function, $r$ is the number of parameters, and $n$ is the sample size.

$$
\begin{align*}
\text{SBC for Poisson is } & -124.36 - \tfrac{1}{2}\ln 100 = -126.66 \\
\text{SBC for ZM Poisson is } & -123.91 - \tfrac{2}{2}\ln 100 = -128.52
\end{align*}
$$

**(ii)** The statement is incorrect.

The SBC is designed to assess the overall fit of the data to the distribution, taking into consideration the number of parameters involved. It is a very rough method of assessing whether additional parameters provide a significantly better overall fit.

The SBC uses the maximum log likelihood. The MLE method tends to fit to the center of the underlying distribution, and may not provide a good fit in the tails.

The zero-modified Poisson specifically modifies the probability weight at zero to achieve a better fit of $p_0$ to the data.

### Examiner Report
Most candidates correctly evaluated the SBC in part (d)(i), but few recognized that the better fitting model overall might have a worse fit in the left tail.
