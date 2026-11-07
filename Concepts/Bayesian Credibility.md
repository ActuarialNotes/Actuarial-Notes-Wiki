---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7e7d07700500e6bfc1c70231b318daea5bab8080dd3bca45decfa2992f6dd44f
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayesian Credibility.md
---

![[Media/Figures/Bayesian_Credibility.svg|340]]

**Bayesian Credibility** is a [[Credibility|credibility]] method that estimates a risk's next observation by its mean under the [[Posterior Distribution|posterior distribution]] of the risk parameter $\Theta$, given the risk's observations $\mathbf{X} = (X_1, \ldots, X_n)$. The credibility estimate is the **posterior mean** of the hypothetical mean, the Bayesian premium:

> $$E[X_{n+1} \mid \mathbf{X}] = E[\mu(\Theta) \mid \mathbf{X}]$$

- $\mu(\theta) = E[X \mid \Theta = \theta]$ is the hypothetical mean of a risk with parameter $\theta$.

The posterior comes from [[Bayes Theorem|Bayes' theorem]], $\pi(\theta \mid \mathbf{x}) \propto f(\mathbf{x} \mid \theta)\,\pi(\theta)$. Of all estimates built from the observations, the Bayesian premium has the smallest expected squared error.

> [!example]- Risks are 60% class A, with claim probability $0.1$ a year, and 40% class B, with claim probability $0.3$. A risk has a claim in its first year. What is its Bayesian premium for claims next year? {Example}
> - Prior times likelihood is $0.6(0.1) = 0.06$ for class A and $0.4(0.3) = 0.12$ for class B.
> - The posterior probabilities are $0.06/0.18 = 1/3$ for A and $2/3$ for B.
> - The Bayesian premium is $\tfrac{1}{3}(0.1) + \tfrac{2}{3}(0.3) = 0.2333$, up from the prior mean of $0.18$.

> [!idea] The idea
> The Bayesian premium is the best estimate of all, and [[Bühlmann Credibility|Bühlmann credibility]] is the best straight-line approximation to it.

The two coincide when the Bayesian premium is itself linear in the observations, which is [[Exact Credibility|exact credibility]].

## Conjugate priors

When the likelihood is in the **linear exponential family** and the prior is its **[[Conjugate Prior|conjugate prior]]**, the posterior mean is a linear credibility formula:

> $$E[\mu(\Theta) \mid \mathbf{X}] = Z\bar{X} + (1 - Z)\mu$$

- $\mu = E[\mu(\Theta)]$ is the prior mean of the hypothetical mean.
- $Z = n/(n + k)$, with $k$ read from the prior's parameters.

For a Poisson likelihood and a gamma prior with shape $\alpha$ and scale $\beta$, the posterior is gamma with shape $\alpha + \sum x_i$ and scale $\beta/(1 + n\beta)$, and $k = 1/\beta$.

> [!example]- A policyholder's annual claim count is Poisson with mean $\Lambda$, and $\Lambda$ is gamma with shape $\alpha = 2$ and scale $\beta = 0.5$. In 3 years the policyholder had 0, 2 and 1 claims. What is the Bayesian premium? {Example}
> - The prior mean is $\alpha\beta = 1$.
> - The posterior is gamma with shape $2 + 3 = 5$ and scale $0.5/(1 + 3 \times 0.5) = 0.2$.
> - The Bayesian premium is the posterior mean, $5 \times 0.2 = 1$ claim per year.
> - In credibility form, $k = 1/0.5 = 2$ and $Z = 3/(3 + 2) = 0.6$, so the premium is $0.6(1) + 0.4(1) = 1$.
> - The sample mean equals the prior mean, so the data confirm the prior rather than move it.
