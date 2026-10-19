---
id: "astam-2024s-q6"
exam: "Exam ASTAM"
topic: "Generalized Pareto Distribution"
learning_objective: "Severity Models"
difficulty: hard
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Generalized+Pareto+Distribution
  - Concepts/Generalized+Extreme+Value+Distribution
  - Concepts/Pareto+Distribution
  - Concepts/Mixture+Distribution
  - Concepts/Risk+Measure
  - Concepts/Hazard+Rate
points: 11
---

An actuary is investigating the severity of losses from a commercial line for reinsurance pricing, using a data set of 500 observations of loss severity, denoted $X$. The actuary first proposes to estimate the loss severity using a frailty model with frailty random variable $\Lambda$. You are given:

- $\Lambda$ follows a Gamma distribution with mean $\alpha/\gamma$ and variance $\alpha/\gamma^2$.
- Given $\Lambda = \lambda$, the conditional hazard rate of $X$ is $h_{X|\Lambda}(x|\lambda) = \lambda$.

## Part a (2 points)

Show that the unconditional survival function of $X$ is

$$S_X(x) = \left(\frac{\gamma}{\gamma + x}\right)^{\alpha}, \qquad x \ge 0,$$

which is the survival function for a Pareto distribution.

### Explanation
We have that, conditional on $\Lambda = \lambda$, the distribution of $X$ is exponential, i.e.

$$S_{X|\Lambda}(x) = e^{-\Lambda x}$$

Also, the density function of $\Lambda$ is $f_\Lambda(\lambda) = \dfrac{\gamma^\alpha\lambda^{\alpha-1}e^{-\gamma\lambda}}{\Gamma(\alpha)}$

(from the formula sheet, with $\gamma = \theta^{-1}$).

Then:

$$\begin{align*}
S_X(x) = E\big[S_{X|\Lambda}(x)\big] &= \int_0^\infty e^{-\lambda x}f_\Lambda(\lambda)\,d\lambda \\
&= \int_0^\infty e^{-\lambda x}\,\frac{\gamma^\alpha\lambda^{\alpha-1}e^{-\gamma\lambda}}{\Gamma(\alpha)}\,d\lambda
\end{align*}$$

(Now multiply and divide by $(\gamma + x)^\alpha$)

$$= \int_0^\infty \frac{e^{-\lambda(\gamma+x)}\lambda^{\alpha-1}(\gamma+x)^\alpha}{\Gamma(\alpha)}\,d\lambda\left(\frac{\gamma^\alpha}{(\gamma+x)^\alpha}\right) = \left(\frac{\gamma}{\gamma+x}\right)^\alpha$$

As the integrand is the density function of a gamma distribution for $\lambda$, with parameters $\alpha$ and $\gamma + x$, which must integrate to 1.0.

**Alternatively,**

We have that, conditional on $\Lambda = \lambda$, the distribution of $X$ is exponential, i.e.

$$S_{X|\Lambda}(x) = e^{-\Lambda x}.$$

Also, the distribution of $\Lambda$ is $\text{Gamma}(\alpha, \gamma^{-1})$

(from the formula sheet, with $\theta = \gamma^{-1}$).

Then:

$$\begin{align*}
S_X(x) = E_\Lambda\big[S_{X|\Lambda}(x)\big] &= E_\Lambda\big[e^{-\Lambda x}\big] \\
&= M_\Lambda(-x) \\
&= \left(1 + \frac{x}{\gamma}\right)^{-\alpha} \\
&= \left(\frac{\gamma}{\gamma+x}\right)^\alpha
\end{align*}$$

### Examiner Report
Overall, this question was not done well.

For Part (a), many candidates started from the unconditional survival function of X being the moment generating function of the frailty random variable by replacing x by -x. However, as a proof question, candidates are expected to show why this is valid.

## Part b (3 points)

You are given that the maximum likelihood estimates (MLEs) of $\alpha$ and $\gamma$ based on the 500 observations are $\hat\alpha = 4.19$ and $\hat\gamma = 6{,}726.8$.

(i) Show that the 97.5% Value at Risk (VaR) of the losses using the fitted frailty model for $X$ is 9,500 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Calculate the 97.5% Expected Shortfall (ES) of the losses using the fitted frailty model for $X$.

### Explanation
Let $Q$ denote the 97.5% quantile of $X$.

(i)

$$\begin{align*}
&S_X(Q) = 0.025 \Rightarrow \left(\frac{\hat\gamma}{\hat\gamma + \hat Q}\right)^{\hat\alpha} = 0.025 \\
&\Rightarrow \hat Q = \hat\gamma\left((0.025)^{-1/\hat\alpha} - 1\right) = 9497.34
\end{align*}$$

(ii) From the formula sheet:

$$\begin{align*}
E[S - Q|S > Q] &\simeq \left(\frac{\lambda + Q}{\alpha - 1}\right) \\
\Rightarrow E[S|S > Q] &\simeq \hat Q + \left(\frac{\hat\lambda + \hat Q}{\hat\alpha - 1}\right) = 14{,}583.3
\end{align*}$$

### Examiner Report
Candidates did very well in Part (b).

## Part c (2 points)

Using normalizing functions $c_n = \gamma n^{1/\alpha}$ and $d_n = -\gamma$, show that the distribution function of $X$ is in the maximum domain of attraction (MDA) of the Fréchet distribution.

### Explanation
Using the normalized distribution of the $n$-sample maximum, we have:

$$\begin{align*}
\lim_{n\to\infty} Pr\left(\frac{M_n - d_n}{c_n} \le x\right) &= \lim_{n\to\infty} Pr[M_n \le c_nx + d] \\
&= \lim_{n\to\infty} Pr[max(X_1, X_2, \ldots, X_n) \le (c_nx + d_n)] \\
&= \lim_{n\to\infty}\big(F_X(c_nx + d_n)\big)^n \\
&= \lim_{n\to\infty}\left(1 - \left(\frac{\gamma}{\gamma + \gamma n^{1/\alpha}x - \gamma}\right)^\alpha\right)^n \\
&= \lim_{n\to\infty}\left(1 - \left(\frac{1}{n^{1/\alpha}x}\right)^\alpha\right)^n \\
&= \lim_{n\to\infty}\left(1 - \frac{x^{-\alpha}}{n}\right)^n \\
&= \exp(-x^{-\alpha})
\end{align*}$$

And since $exp(-x^{-\alpha})$ is the distribution function of the Fréchet distribution, the Pareto distribution is confirmed to be in the Fréchet MDA.

**Alternatively:**

It is sufficient to prove that $\lim_{n\to\infty} nS(c_nx + d_n) = -\log H(x)$

Where $H(x)$ is a GEV distribution function with parameter $\xi > 0$.

We have

$$\begin{align*}
nS(c_nx + d_n) &= n\left(\frac{\gamma}{\gamma + \gamma n^{1/\alpha}x - \gamma}\right)^\alpha \\
&= x^{-\alpha} \\
&= -\log H(x)
\end{align*}$$

where $H(x)$ is a GEV distribution with parameters $\xi = \frac{1}{\alpha},\ \mu = 1,\ \theta = \xi$

OR where $H(x)$ is a Frechet distribution with parameters $\alpha, \mu = 0,\ \theta = 1$

Since $\xi > 0$ this is a Fréchet distribution, as required.

### Examiner Report
Part (c) was a challenging question and was poorly done. Candidates were expected to identify the corresponding parameters of the GEV distribution and explain their relationships with the limiting distributions of normalized block maxima. We noticed that many numerical errors prevented candidates from identifying the proper parameters.

## Part d (3 points)

The actuary then decides to estimate the risk measures, VaR and ES, using the Generalized Pareto Distribution (GPD) with a threshold of $d = 8{,}900$ for the excess loss distribution. The MLEs of the GPD parameters are $\hat\xi = 0.85$ and $\hat\beta = 1{,}595.6$.

You are given the following table showing an excerpt from the largest 20 values from the sample of 500, in decreasing order.

| Rank | 500 | 499 | ... | 484 | 483 | 482 | 481 |
|---|---|---|---|---|---|---|---|
| Loss | 38,439 | 22,491 | ... | 8,916 | 8,402 | 8,342 | 8,110 |

(i) Show that the 97.5% VaR of the losses using the fitted GPD is 9,500 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Calculate the 97.5% ES of the losses using the fitted GPD.

### Explanation
Substituting into the formula sheet equations, we have:

(i)

$$\begin{align*}
Q_q &= d + \frac{\beta}{\xi}\left(\left(\frac{S_X(d)}{1-q}\right)^\xi - 1\right) \\
&\approx 8900 + \frac{1595.6}{0.85}\left(\left(\frac{17/500}{0.025}\right)^{0.85} - 1\right) = 9460.71
\end{align*}$$

(ii)

$$\begin{align*}
ES_q &= \frac{1}{1-\xi}\left(Q_q + \beta - \xi d\right) \\
&= \frac{1}{0.15}\left(9460.7 + 1595.6 - 0.85(8900)\right) \\
&= 23{,}275.3
\end{align*}$$

### Examiner Report
Candidates did very well in Part (d).

## Part e (1 point)

Your colleague at your reinsurance company suggests that since the tail risk of the losses has been captured through fitting a fat-tailed frailty model, it is not necessary to perform excess loss analysis using an extreme value distribution. Critique this suggestion.

### Explanation
- We notice that in this case, the frailty/Pareto gives a result which is very close to the GPD model for the VaR, but significantly underestimates the ES compared with the GPD.
- The MLE fit may be very good in the middle of the distribution, but may not capture the tails adequately.
- The ES uses the full tail of the distribution; the VaR ignores the top 2.5%. The ES is therefore a better measure of the extreme tail risk.
- The right tail of the loss distribution is critical for assessing reinsurance requirements.
- Based on the difference between the two ES values, the frailty/Pareto model may not adequately represent the tail risk. Using the extreme value theoretic approach typically provides a more tailored fit of tail behaviour than the MLE.
- Therefore, I would recommend basing the reinsurance strategy on the EVT values rather then the MLE.

### Examiner Report
In Part (e), many candidates provided very generic answers rather than examine how the calculations done in the previous parts can contribute to this question. The question asks candidates to compare the fitting outcomes of the fat-tailed frailty model and the GPD distribution, in terms of the tail. However, a fair number of candidates provided unrelated answers.
