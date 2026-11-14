---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b6c21f897fdcfe2d0b563d986eb9512796f878e8c4c6f5dd13c5bcd2ec1cdf1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayesian Estimation.md
---

**Bayesian Estimation** treats an unknown parameter $\theta$ as a random variable with a prior distribution $\pi(\theta)$, combines the prior with the likelihood of the data to form the [[Posterior Distribution|posterior distribution]], and estimates $\theta$ by the value that minimises the expected loss under that posterior. Unlike [[Maximum Likelihood Estimation|maximum likelihood]], it returns a whole distribution for $\theta$, so point estimates, interval estimates and predictions of the next loss all come from the same posterior.

For observations $\mathbf{x} = (x_1, \ldots, x_n)$ that are independent given $\theta$, the posterior distribution is

> $$\pi(\theta \mid \mathbf{x}) = \frac{f(\mathbf{x} \mid \theta)\,\pi(\theta)}{\int f(\mathbf{x} \mid \theta)\,\pi(\theta)\,d\theta}$$

- $f(\mathbf{x} \mid \theta) = \prod_{i=1}^{n} f(x_i \mid \theta)$ is the likelihood, and $f(x \mid \theta)$ is the model distribution.
- The denominator is the marginal distribution of the data. It does not depend on $\theta$.

So the posterior is proportional to the prior times the likelihood:

> $$\pi(\theta \mid \mathbf{x}) \propto \pi(\theta)\prod_{i=1}^{n} f(x_i \mid \theta)$$

The posterior is 0 wherever the prior or the likelihood is 0. When the model's support depends on $\theta$, as for the uniform, the likelihood is 0 below the largest observation, and the posterior starts there and not at the prior's lower bound. With a uniform prior on an interval, the posterior is the likelihood restricted to that interval, rescaled, so its mode is where the likelihood is largest within the interval. With a [[Conjugate Prior|conjugate prior]], updating reduces to updating the prior's parameters.

> [!example]- What is the posterior distribution of $\theta$, and its posterior mean? {Example}
> Losses are exponential with mean $\theta$. The prior for $\theta$ is inverse gamma with $\alpha = 3$ and scale $\beta = 2{,}000$, so the prior mean is $\beta/(\alpha - 1) = 1{,}000$. Four losses are observed: 800, 1,200, 1,500 and 2,500.
>
> > [!answer]-
> > - The losses total 6,000, so the likelihood is $\theta^{-4}e^{-6{,}000/\theta}$.
> > - The prior is proportional to $\theta^{-4}e^{-2{,}000/\theta}$.
> > - Their product is $\theta^{-8}e^{-8{,}000/\theta}$, the kernel of an inverse gamma distribution with $\alpha = 7$ and $\beta = 8{,}000$.
> > - The posterior mean is $8{,}000/(7 - 1) = 1{,}333.33$.
> > - It lies between the prior mean of 1,000 and the maximum likelihood estimate $\bar{x} = 1{,}500$, with weight $4/6$ on the data.

## Bayes estimates and loss functions

The Bayes estimate minimises the posterior expected loss, so the loss function named decides whether the posterior mean, [[Median|median]] or [[Mode|mode]] is reported:

| Loss function | Bayes estimate |
| :--- | :--- |
| Squared error, $(\hat\theta - \theta)^2$ | Posterior mean |
| Absolute, $\lvert\hat\theta - \theta\rvert$ | Posterior median |
| Zero-one | Posterior mode |

The three differ whenever the posterior is skewed.

> [!example]- What are the Bayes estimates of $\theta$ under squared-error, absolute and zero-one loss? {Example}
> Losses on a class of equipment are uniform on $(0, \theta)$, where $\theta$ is the largest possible loss. The prior for $\theta$ is single-parameter Pareto with $\alpha = 3$ and lower bound 1,000, so $\pi(\theta) = 3(1{,}000)^3/\theta^4$ for $\theta > 1{,}000$. Losses of 600, 1,500 and 1,100 are observed.
>
> > [!answer]-
> > - Each loss contributes $1/\theta$ to the likelihood, which is 0 unless $\theta \ge 1{,}500$, the largest loss.
> > - The posterior is proportional to $\theta^{-4} \cdot \theta^{-3} = \theta^{-7}$ for $\theta > 1{,}500$. It is single-parameter Pareto with $\alpha = 6$ and lower bound 1,500, with $P(\Theta > t \mid \mathbf{x}) = (1{,}500/t)^6$.
> > - Under squared-error loss, the estimate is the mean, $6(1{,}500)/5 = 1{,}800.00$.
> > - Under absolute loss, it is the median, $1{,}500 \times 2^{1/6} = 1{,}683.69$.
> > - Under zero-one loss, it is the mode, $1{,}500.00$, because the posterior density falls everywhere above 1,500.

## Credibility intervals

A $100p\%$ credibility interval $(a, b)$ for $\theta$ satisfies

> $$P(a < \Theta < b \mid \mathbf{x}) = p$$

It is a probability statement about $\theta$ given this data, which a [[Confidence Interval|confidence interval]] is not. The highest posterior density (HPD) set, $\{\theta : \pi(\theta \mid \mathbf{x}) \ge c\}$ with $c$ chosen to give probability $p$, is the shortest such interval when the posterior has one peak. The equal-tailed interval cuts $(1 - p)/2$ from each tail and is longer unless the posterior is symmetric.

> [!example]- What is the 95% HPD credibility interval for $\theta$? {Example}
> The posterior for $\theta$ in the example above is single-parameter Pareto with $\alpha = 6$ and lower bound 1,500, so $P(\Theta > t \mid \mathbf{x}) = (1{,}500/t)^6$.
>
> > [!answer]-
> > - The posterior density falls everywhere above 1,500, so the HPD interval starts at 1,500 and ends where the upper tail holds 5%.
> > - Solving $(1{,}500/b)^6 = 0.05$ gives $b = 1{,}500(0.05)^{-1/6} = 2{,}471.32$.
> > - The HPD interval $(1{,}500,\ 2{,}471.32)$ has width 971.
> > - The equal-tailed interval, $(1{,}506.34,\ 2{,}773.97)$, has width 1,268, because it gives up the high-density values just above 1,500 to cut 2.5% from each tail.

## The predictive distribution

The [[Predictive Distribution|predictive distribution]] of a new observation $y$ mixes the model over the posterior:

> $$f(y \mid \mathbf{x}) = \int f(y \mid \theta)\,\pi(\theta \mid \mathbf{x})\,d\theta$$

The probability that the next loss exceeds a value, or its expected value, comes from this distribution. The Bayesian premium in the credibility objectives is its mean.

> [!example]- What is the probability that the next loss exceeds 5,000? {Example}
> Losses are exponential with mean $\theta$, and the posterior for $\theta$ is inverse gamma with $\alpha = 7$ and $\beta = 8{,}000$, as in the first example.
>
> > [!answer]-
> > - Mixing the exponential over this posterior gives a predictive distribution that is Pareto with $\alpha = 7$ and $\theta = 8{,}000$.
> > - The predictive probability is $(8{,}000/13{,}000)^{7} = 0.0334$.
> > - Plugging the posterior mean into the exponential gives $e^{-5{,}000/1{,}333.33} = 0.0235$ instead.
> > - The predictive probability is about 40% higher, because it carries the uncertainty about $\theta$ as well as the randomness of the loss.

## Bayesian estimation and Bayesian credibility

[[Bayesian Credibility|Bayesian credibility]] uses the same mechanics with a different reading. Its prior describes how risk parameters vary across a portfolio, and its target is the posterior mean of the hypothetical mean $E[X \mid \theta]$ for one risk. Bayesian estimation targets $\theta$ itself, or any function of it, under whichever loss function is named, and its prior can express judgment or can be noninformative, such as $\pi(\theta) \propto 1/\theta$.

> [!trap] Reporting the posterior mean when another loss is named
> The posterior mean is the Bayes estimate only under squared-error loss. In the uniform example, absolute loss gives 1,683.69 and zero-one loss gives 1,500, against a mean of 1,800, so check which loss the question names.
