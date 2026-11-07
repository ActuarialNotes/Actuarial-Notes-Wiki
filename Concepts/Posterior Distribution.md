---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-tse
  content_hash: sha256:48d5cbf64b325527ccba63b58b210e29d83e875f06478442ddc05d2c4942c65f
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 4 §4.4.2 Bayesian Model (improper prior) and Example 4.4.5 (uniform prior on an interval), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Gelman et al., Bayesian Data Analysis, 3rd ed., author-hosted non-commercial electronic edition, §2.1 p.30, §2.8 pp.51–53, §4.1 pp.85–86, §4.3 p.90, sha256:246f7d34daad4971d40fa247f1045bf3fce4f912dcea9b4267b161ee7a70b306 — https://sites.stat.columbia.edu/gelman/book/BDA3.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Frees et al., Loss Data Analytics (open text), Appendix B, §16.3 Conjugate Distributions, sha256:66a757e0d3dfdac6e4196cd9458ad437bb4ea690dca28797e4c1fe403c5f9e92 — https://openacttexts.github.io/Loss-Data-Analytics/CAppB.html"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Posterior Distribution.md
---

A **Posterior Distribution** is the distribution of an unknown parameter $\theta$ after the observations $\mathbf{x} = (x_1, \ldots, x_n)$ have been taken into account. It is the prior distribution $\pi(\theta)$ updated by the likelihood of the data through [[Bayes Theorem|Bayes' theorem]]:

> $$\pi(\theta \mid \mathbf{x}) = \frac{f(\mathbf{x} \mid \theta)\,\pi(\theta)}{\int f(\mathbf{x} \mid \theta)\,\pi(\theta)\,d\theta}$$

- The prior $\pi(\theta)$ describes how $\theta$ varies across the portfolio before this risk's own experience is seen.
- The likelihood $f(\mathbf{x} \mid \theta) = \prod f(x_i \mid \theta)$ treats the $x_i$ as independent *given* $\theta$.
- The denominator is the marginal probability of the data. It only normalises.

With a discrete prior (risk classes) the integral is a sum. In [[Bayesian Credibility|Bayesian credibility]] the posterior is the distribution every forecast for the risk is averaged over.

> [!example]- A portfolio is 75% good drivers, whose annual claim counts are Poisson with mean $0.2$, and 25% bad drivers, Poisson with mean $0.6$. A driver chosen at random has 1 claim in a year. What are the posterior class probabilities, and the expected number of claims next year? {Example}
> - The likelihoods of one claim are $0.2e^{-0.2} = 0.16375$ for a good driver and $0.6e^{-0.6} = 0.32929$ for a bad one.
> - Prior times likelihood is $0.75(0.16375) = 0.12281$ and $0.25(0.32929) = 0.08232$, which sum to $P(N = 1) = 0.20513$.
> - The posterior probabilities are $0.12281/0.20513 = 0.5987$ (good) and $0.08232/0.20513 = 0.4013$ (bad).
> - The expected claims next year are the posterior-weighted class means, $E[N_2 \mid N_1 = 1] = 0.5987(0.2) + 0.4013(0.6) = 0.3605$.
> - One claim moves the chance that this is a bad driver from $25\%$ to $40\%$, and the forecast from the prior mean $0.30$ to $0.3605$.

> [!idea] The idea
> With little data the posterior stays near the prior, and as $n$ grows it concentrates near the [[Maximum Likelihood Estimation|maximum likelihood estimate]].

That movement from the prior toward the data is credibility. When the posterior mean is linear in $\bar{x}$ it equals the [[Bühlmann Credibility|Bühlmann]] estimate exactly, which is [[Exact Credibility|exact credibility]].

## The kernel of the posterior

The denominator does not involve $\theta$, so the posterior is

> $$\pi(\theta \mid \mathbf{x}) \propto \pi(\theta)\prod_{i=1}^{n} f(x_i \mid \theta)$$

Drop every factor that does not involve $\theta$, multiply prior by likelihood, and recognise the family from what is left. For a [[Conjugate Prior|conjugate prior]] this is the whole technique.

> [!example]- A group policy covers 50 employees, each with probability $q$ of a claim in the year, and the prior for $q$ is Beta$(2, 18)$, with mean $0.10$. This year 9 employees claim. What are the posterior mean and standard deviation of $q$? {Example}
> - Keeping only the factors that involve $q$, the prior $q^{2-1}(1-q)^{18-1}$ is multiplied by the likelihood $q^{9}(1-q)^{41}$.
> - That product is $q^{10}(1-q)^{58}$.
> - This is the kernel of a Beta$(11, 59)$ distribution.
> - The posterior mean is $11/70 = 0.1571$.
> - The posterior variance is $(11)(59)/[(70)^2(71)] = 0.001865$, so the standard deviation is $0.0432$, against a prior standard deviation of $0.0655$.

## Sequential updating

Updating is sequential: this year's posterior is next year's prior. Processing the years one at a time gives the same result as processing them together:

> $$\pi(\theta \mid x_1, x_2) \propto \pi(\theta \mid x_1)\, f(x_2 \mid \theta)$$

> [!example]- In the driver portfolio above, the driver with 1 claim in the first year has 0 claims in the second. What is the posterior probability that the driver is bad? {Example}
> - The prior for year 2 is the year-1 posterior, $0.5987$ good and $0.4013$ bad.
> - The likelihoods of no claims are $e^{-0.2} = 0.8187$ and $e^{-0.6} = 0.5488$.
> - Prior times likelihood is $0.4902$ and $0.2202$.
> - The posterior probability that the driver is bad is $0.2202/(0.4902 + 0.2202) = 0.310$.

## Uniform prior

A uniform prior is constant wherever it is positive, so inside its support the posterior is proportional to the likelihood alone:

> $$\pi(\theta \mid \mathbf{x}) \propto f(\mathbf{x} \mid \theta)$$

Outside its support the posterior is zero, because the prior is a factor of the product. The prior cannot move the posterior's peak: under a uniform prior the posterior mode is the maximum likelihood estimate. If the uniform prior covers only an interval, the posterior is the likelihood cut off at the ends of that interval and renormalised. Its mode is then the value inside the interval where the likelihood is largest, and an MLE outside the interval cannot be the posterior mode.

> [!example]- A claim probability $q$ has a uniform prior on $[0, 0.2]$. In 10 trials there are 3 claims. What is the posterior mode? {Example}
> - The likelihood is proportional to $q^3(1-q)^7$, which peaks at the MLE $q = 0.3$.
> - The posterior is that likelihood cut off at $0.2$, and the likelihood is increasing on $[0, 0.2]$.
> - The posterior mode is $0.2$, the end of the interval nearest the likelihood's peak.

## Improper prior

A prior is improper when its integral over the parameter space is infinite, so it cannot be normalised into a distribution. A constant density on the whole real line is one, and $q^{-1}(1-q)^{-1}$ on $(0, 1)$, the improper Beta$(0, 0)$ kernel, is another. The algebra still runs, but the result is a usable posterior only if it has a finite integral:

> $$\int f(\mathbf{x} \mid \theta)\,\pi(\theta)\,d\theta < \infty$$

Whether it does depends on the data. With the Beta$(0, 0)$ prior and binomial data, the posterior is improper when every trial is a success or every trial is a failure. An improper posterior is not a probability distribution, so it has no posterior mean or any other summary to report.

> [!example]- A claim probability $q$ has the improper prior $q^{-1}(1-q)^{-1}$, and 4 trials give 2 claims. Is the posterior proper? {Example}
> - Prior times likelihood is $q^{-1}(1-q)^{-1} \cdot q^2(1-q)^2 = q(1-q)$.
> - This is the kernel of a Beta$(2, 2)$ distribution, which has a finite integral.
> - The posterior is proper, with mean $0.5$. Had all 4 trials been claims, the product would be $q^3(1-q)^{-1}$, whose integral is infinite.
