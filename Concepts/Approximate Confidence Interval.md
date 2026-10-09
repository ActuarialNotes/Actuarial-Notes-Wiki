---
aliases:
  - Non-Normal Confidence Interval
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a30ebfb638fb31c8bc07099224bdd55bf8e7c2c2022453d1af7d499eab7f276d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Approximate Confidence Interval.md
---

**Approximate Confidence Interval** is an interval for a parameter built from the large-sample behaviour of its [[Maximum Likelihood Estimation|maximum likelihood estimator]] rather than from an exact sampling distribution. The usual one is the normal interval, the estimate plus or minus a normal percentile times a standard error taken from the [[Fisher Information|Fisher information]]. The non-normal intervals, log-transformed or based on the likelihood ratio, keep a positive parameter positive and become asymmetric when the likelihood is.

> $$\hat\theta \pm z_{\alpha/2}\sqrt{\widehat{\text{Var}}(\hat\theta)}$$

> $$\widehat{\text{Var}}(\hat\theta) = \big[-\ell''(\hat\theta)\big]^{-1}$$

> $$\Big(\hat\theta\,e^{-z_{\alpha/2}\text{SE}/\hat\theta},\ \hat\theta\,e^{z_{\alpha/2}\text{SE}/\hat\theta}\Big)$$

> $$\Big\{\theta : \ell(\theta) \ge \ell(\hat\theta) - \tfrac{1}{2}\chi^2_{1,\,1-\alpha}\Big\}$$

> $$\hat\mu = \frac{d}{v}$$

> $$\widehat{\text{Var}}(\hat\mu) = \frac{d}{v^2}$$

- **Symbols:** $\ell$ is the log-likelihood, $z_{\alpha/2}$ is the upper $\alpha/2$ point of the standard normal (1.96 for 95%), and $\text{SE} = \sqrt{\widehat{\text{Var}}(\hat\theta)}$. The variance can come from the observed information $-\ell''(\hat\theta)$, as written, or from the expected information evaluated at $\hat\theta$. $\chi^2_{1,\,1-\alpha}$ is the $100(1-\alpha)$th percentile of the [[Chi-Squared Distribution|chi-squared distribution]] with one degree of freedom, which is 3.841 at 95%. For a function $g(\theta)$, the [[Delta Method|delta method]] gives $\widehat{\text{Var}}[g(\hat\theta)] \approx g'(\hat\theta)^2\,\widehat{\text{Var}}(\hat\theta)$.
- **Non-normal intervals:** The log-transformed interval is the normal interval for $\ln\theta$ mapped back, since the delta method gives $\text{SE}(\ln\hat\theta) \approx \text{SE}/\hat\theta$. It stays positive and reaches further above $\hat\theta$ than below. The likelihood-ratio interval keeps every $\theta$ that a [[Likelihood Ratio Test|likelihood ratio test]] would not reject. It follows the shape of the likelihood, needs no variance, and transforms with the parameter, and it is the non-normal interval of Klugman, Panjer & Willmot (*Loss Models*, chapter 11).
- **Transition intensities:** In a [[Multiple State Model|multiple state model]] with a constant [[Transition Intensity|transition intensity]] $\mu$ out of a state, $v$ is the total time that lives were observed in the state and $d$ is the number of transitions observed. The likelihood is $\mu^d e^{-\mu v}$, so $\hat\mu = d/v$, and $-\ell''(\mu) = d/\mu^2$ gives the variance $\hat\mu^2/d = d/v^2$ (Dickson, Hardy & Waters, chapter 8). Intensities out of the same state share $v$, but the cross derivatives of the log-likelihood are 0, so their estimators are asymptotically independent.
- **Accuracy:** All of these intervals are large-sample approximations. With few observations the normal interval can include impossible values, such as a negative intensity, and the non-normal forms are the remedy.

> [!example]- Three Intervals for a Pareto Tail Index {Example}
> Ten losses above \$500,000 are modelled as single-parameter Pareto with $\theta = 500{,}000$ known and $\alpha$ unknown. The data give $\sum \ln(x_i/500{,}000) = 4.0$. Find the maximum likelihood estimate of $\alpha$ and 95% normal, log-transformed and likelihood-ratio intervals for it.
>
> > [!answer]-
> > Apart from a constant, the log-likelihood is $\ell(\alpha) = 10\ln\alpha - 4\alpha$, so $\hat\alpha = 10/4 = 2.5$ and $-\ell''(\alpha) = 10/\alpha^2$.
> > $$
> > \begin{align*}
> > \widehat{\text{Var}}(\hat\alpha) &= \frac{2.5^2}{10} \\
> > &= 0.625 \\
> > \text{Normal} &= 2.5 \pm 1.96(0.7906) \\
> > &= (0.950,\ 4.050) \\
> > e^{1.96(0.7906)/2.5} &= e^{0.6198} \\
> > &= 1.8586 \\
> > \text{Log} &= (2.5/1.8586,\ 2.5 \times 1.8586) \\
> > &= (1.345,\ 4.646)
> > \end{align*}
> > $$
> > For the likelihood-ratio interval, $\ell(2.5) = 10\ln 2.5 - 10 = -0.8371$, and the cutoff is $-0.8371 - 3.841/2 = -2.7576$. Solving $10\ln\alpha - 4\alpha = -2.7576$ numerically gives the interval $(1.253,\ 4.385)$. Both non-normal intervals sit further right than the normal one, because the log-likelihood falls away more steeply below $\hat\alpha$ than above it, and both keep well clear of $\alpha = 1$, below which the Pareto mean is infinite.

> [!example]- A Sickness Intensity and a Probability of Staying Healthy {Example}
> In a healthy–sick–dead model with constant intensities over ages 60 to 65, a study observes 1,250 person-years in the healthy state, with 30 transitions to sick and 5 deaths. Give 95% intervals for $\mu^{01}$ and for the probability ${}_1p_{60}^{\overline{00}} = e^{-(\mu^{01} + \mu^{02})}$ that a healthy life stays healthy for a year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat\mu^{01} &= \frac{30}{1{,}250} \\
> > &= 0.024 \\
> > \text{SE}(\hat\mu^{01}) &= \frac{\sqrt{30}}{1{,}250} \\
> > &= 0.004382 \\
> > \text{CI} &= 0.024 \pm 1.96(0.004382) \\
> > &= (0.0154,\ 0.0326)
> > \end{align*}
> > $$
> > The total intensity is $\hat\mu^{01} + \hat\mu^{02} = 35/1{,}250 = 0.028$, and because the two estimators are asymptotically independent its variance is $35/1{,}250^2$, with standard error 0.004733. The derivative of $e^{-s}$ is $-e^{-s}$, so the delta method multiplies that standard error by $\hat p = e^{-0.028} = 0.97239$.
> > $$
> > \begin{align*}
> > \text{SE}(\hat p) &= 0.97239(0.004733) \\
> > &= 0.004602 \\
> > \text{CI} &= 0.97239 \pm 1.96(0.004602) \\
> > &= (0.9634,\ 0.9814)
> > \end{align*}
> > $$
> > Thirty transitions estimate the sickness intensity only to within about 36% either way, while the one-year probability is pinned down far more tightly in absolute terms, because it is close to 1.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to estimate the variance of estimators and construct normal and non-normal confidence intervals. A question fits a distribution by maximum likelihood, asks for the variance from the information, and then asks for an interval for the parameter or, through the delta method, for a probability, a percentile or a limited expected value.
> - **ALTAM** asks for approximate confidence intervals for the maximum likelihood estimates of transition intensities and probabilities in multiple state and multiple decrement models. A question gives waiting times and transition counts for each state and asks for $\hat\mu = d/v$ with its interval, or for an interval for a probability built from several intensities.
> - **Likelihood-ratio interval:** When it is asked for, the interval is found by solving $\ell(\theta) = \ell(\hat\theta) - \tfrac12\chi^2$ for its two endpoints, numerically or by checking given candidate values.

> [!warning]- Exam traps
> - **Information or its inverse:** The variance is the inverse of the information. Using $-\ell''(\hat\theta)$ itself as the variance gives a nonsense interval, which is easy to miss only when the information happens to be close to 1.
> - **Half the chi-squared value:** The likelihood-ratio cutoff is $\ell(\hat\theta) - \tfrac12\chi^2_{1,\,1-\alpha}$. Subtracting the full 3.841 gives an interval that is much too wide.
> - **Exposure in the right state:** In $\hat\mu = d/v$, $v$ is the time spent in the state the transition leaves, not the total time in the study. Using all person-years understates an intensity out of the healthy state.
> - **Every way out of the state:** A probability of staying in a state depends on every intensity out of it. In the second example the variance of the total intensity is $(30 + 5)/1{,}250^2$, and using only the 30 sicknesses leaves out the deaths, which also end a stay in the healthy state.
