---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6b2f81b320521d6fda36fa2c82263319be31648d37e6c0ca9cc40e2c06f3994c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayesian Estimation.md
---

**Bayesian Estimation** treats an unknown parameter $\theta$ as a random variable with a prior distribution $\pi(\theta)$, combines the prior with the likelihood of the data to form the [[Posterior Distribution|posterior distribution]], and estimates $\theta$ by the value that minimises the expected loss under that posterior. Unlike [[Maximum Likelihood Estimation|maximum likelihood]], it returns a whole distribution for $\theta$, so point estimates, interval estimates and predictions of the next loss all come from the same posterior.

> $$\pi(\theta \mid \mathbf{x}) = \frac{f(\mathbf{x} \mid \theta)\,\pi(\theta)}{\int f(\mathbf{x} \mid \theta)\,\pi(\theta)\,d\theta}$$

> $$\pi(\theta \mid \mathbf{x}) \propto \pi(\theta)\prod_{i=1}^{n} f(x_i \mid \theta)$$

> $$f(y \mid \mathbf{x}) = \int f(y \mid \theta)\,\pi(\theta \mid \mathbf{x})\,d\theta$$

> $$\Pr(a < \Theta < b \mid \mathbf{x}) = 1 - \alpha$$

- **Symbols:** Following Klugman, Panjer & Willmot (*Loss Models*, chapter 13), $f(x \mid \theta)$ is the model distribution, $\mathbf{x} = (x_1, \ldots, x_n)$ are observations that are independent given $\theta$, and $f(y \mid \mathbf{x})$ is the [[Predictive Distribution|predictive distribution]] of a new observation $y$. The last block defines a $100(1 - \alpha)\%$ credibility interval $(a, b)$.
- **Loss functions:** The Bayes estimate minimises the posterior expected loss. Squared-error loss, $(\hat\theta - \theta)^2$, gives the posterior mean. Absolute loss, $|\hat\theta - \theta|$, gives the posterior [[Median|median]], and zero-one loss gives the posterior [[Mode|mode]].
- **Intervals:** A credibility interval is a probability statement about $\theta$ given this data, which a [[Confidence Interval|confidence interval]] is not. The highest posterior density (HPD) set, $\{\theta : \pi(\theta \mid \mathbf{x}) \ge c\}$ with $c$ chosen to give probability $1 - \alpha$, is the shortest such interval when the posterior has one peak. The equal-tailed interval cuts $\alpha/2$ from each tail and is longer unless the posterior is symmetric.
- **Bayesian estimation and Bayesian credibility:** [[Bayesian Credibility|Bayesian credibility]] uses the same mechanics with a different reading. Its prior describes how risk parameters vary across a portfolio, and its target is the posterior mean of the hypothetical mean $E[X \mid \theta]$ for one risk. Bayesian estimation targets $\theta$ itself, or any function of it, under whichever loss function is named, and its prior can express judgment or can be noninformative, such as $\pi(\theta) \propto 1/\theta$. With a [[Conjugate Prior|conjugate prior]], both reduce to updating the prior's parameters.

> [!example]- Exponential Severity with an Inverse Gamma Prior {Example}
> Losses are exponential with mean $\theta$. The prior for $\theta$ is inverse gamma with $\alpha = 3$ and scale $\beta = 2{,}000$, so the prior mean is $\beta/(\alpha - 1) = 1{,}000$. Four losses are observed: 800, 1,200, 1,500 and 2,500. Find the posterior distribution, the Bayes estimate of $\theta$ under squared-error loss, and the probability that the next loss exceeds 5,000.
>
> > [!answer]-
> > The likelihood is $\theta^{-4}e^{-6{,}000/\theta}$, and the prior is proportional to $\theta^{-4}e^{-2{,}000/\theta}$.
> > $$
> > \begin{align*}
> > \pi(\theta \mid \mathbf{x}) &\propto \theta^{-4}e^{-2{,}000/\theta} \cdot \theta^{-4}e^{-6{,}000/\theta} \\
> > &= \theta^{-8}e^{-8{,}000/\theta}
> > \end{align*}
> > $$
> > This is the kernel of an inverse gamma distribution with $\alpha = 7$ and $\beta = 8{,}000$.
> > $$
> > \begin{align*}
> > E[\Theta \mid \mathbf{x}] &= \frac{8{,}000}{7 - 1} \\
> > &= 1{,}333.33
> > \end{align*}
> > $$
> > The estimate lies between the prior mean of 1,000 and the maximum likelihood estimate $\bar{x} = 1{,}500$, with weight $4/6$ on the data. Mixing the exponential over this posterior gives a predictive distribution that is Pareto with $\alpha = 7$ and $\theta = 8{,}000$.
> > $$
> > \begin{align*}
> > \Pr(Y > 5{,}000 \mid \mathbf{x}) &= \left(\frac{8{,}000}{13{,}000}\right)^{7} \\
> > &= 0.0334
> > \end{align*}
> > $$
> > Plugging the point estimate into the exponential gives $e^{-5{,}000/1{,}333.33} = 0.0235$ instead. The predictive probability is about 40% higher, because it carries the uncertainty about $\theta$ as well as the randomness of the loss.

> [!example]- Three Loss Functions and an HPD Interval {Example}
> Losses on a class of equipment are uniform on $(0, \theta)$, where $\theta$ is the largest possible loss. The prior for $\theta$ is single-parameter Pareto with $\alpha = 3$ and lower bound 1,000, so $\pi(\theta) = 3(1{,}000)^3/\theta^4$ for $\theta > 1{,}000$. Losses of 600, 1,500 and 1,100 are observed. Find the Bayes estimates under squared-error, absolute and zero-one loss, and a 95% HPD credibility interval.
>
> > [!answer]-
> > Each loss contributes $1/\theta$ to the likelihood, which is 0 unless $\theta \ge 1{,}500$, the largest loss. The posterior is therefore proportional to $\theta^{-4} \cdot \theta^{-3} = \theta^{-7}$ for $\theta > 1{,}500$, which is single-parameter Pareto with $\alpha = 6$ and lower bound 1,500, with $\Pr(\Theta > t \mid \mathbf{x}) = (1{,}500/t)^6$.
> > $$
> > \begin{align*}
> > \text{Mean} &= \frac{6(1{,}500)}{5} \\
> > &= 1{,}800.00 \\
> > \text{Median} &= 1{,}500 \times 2^{1/6} \\
> > &= 1{,}683.69 \\
> > \text{Mode} &= 1{,}500.00
> > \end{align*}
> > $$
> > The posterior density falls everywhere above 1,500, so the HPD interval starts at 1,500 and ends where the upper tail holds 5%.
> > $$
> > \begin{align*}
> > \left(\frac{1{,}500}{b}\right)^{6} &= 0.05 \\
> > b &= 1{,}500(0.05)^{-1/6} \\
> > &= 2{,}471.32
> > \end{align*}
> > $$
> > The HPD interval $(1{,}500,\ 2{,}471.32)$ has width 971. The equal-tailed interval, $(1{,}506.34,\ 2{,}773.97)$, has width 1,268, because it gives up the high-density values just above 1,500 to cut 2.5% from each tail.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to estimate the parameters of severity, frequency and aggregate distributions by Bayesian estimation. A question gives a model and a prior, such as a conjugate pair, and asks for the posterior distribution and the Bayes estimate under a named loss function.
> - **Intervals:** A question can ask for a credibility interval, either equal-tailed or HPD, which needs the posterior's distribution function and not just its mean.
> - **Prediction:** A question can ask about the next observation, such as the probability that it exceeds a limit or its expected value. That needs the predictive distribution, and the Bayesian premium in the credibility objectives is its mean.

> [!warning]- Exam traps
> - **The named loss function:** The posterior mean, median and mode differ whenever the posterior is skewed, as in the second example. Check which loss the question names before reporting the mean.
> - **Plug-in prediction:** The probability that the next loss exceeds a value comes from the predictive distribution. Putting the Bayes estimate into the model understates the tail, by about 30% in the first example.
> - **Parameterisation of the prior:** Gamma and inverse gamma priors are written with a scale or a rate. Check the prior's stated mean against the formula before updating, because adding the data to the wrong parameter gives a plausible but wrong posterior.
> - **The support of the posterior:** When the model's support depends on $\theta$, as for the uniform, the likelihood is 0 below the largest observation. The posterior starts there and not at the prior's lower bound.
