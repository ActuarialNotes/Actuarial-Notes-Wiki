---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7cf975f234041e7cbee3f0c5f76a3f9b3f3496737acbc61df07ddf366f1bc33b
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayesian Credibility.md
---

**Bayesian Credibility** applies [[Bayes Theorem|Bayesian inference]] to credibility: the prior distribution of the risk parameter $\theta$ is updated with observed data to produce a posterior distribution, and the credibility estimate is the **posterior mean** $E[\theta \mid \mathbf{X}]$.

> $$\text{Credibility Estimate} = E[\theta \mid X_1, \ldots, X_n]$$

> $$\pi(\theta \mid \mathbf{X}) \propto L(\mathbf{X} \mid \theta) \cdot \pi(\theta)$$

- When the likelihood is in the **linear exponential family** and the prior is its **conjugate**, the posterior mean is a linear credibility formula of the form $Z\bar{X} + (1-Z)\mu_0$
- In this case, **Bayesian credibility = [[Bühlmann Credibility]]** (Bayesian is optimal; Bühlmann is the best linear approximation, and they agree in these cases)

**Common conjugate pairs:**

| Likelihood | Prior | Posterior |
| :--- | :--- | :--- |
| Poisson$(\theta)$ | Gamma$(\alpha, \beta)$, rate $\beta$ | Gamma$(\alpha + \sum x_i,\, \beta + n)$ |
| Binomial$(m, \theta)$ | Beta$(\alpha, \beta)$ | Beta$(\alpha + \sum x_i,\, \beta + mn - \sum x_i)$ |
| Normal$(\theta, \sigma^2)$ | Normal$(\mu_0, \tau^2)$ | Normal (linear combination) |

![[Media/Figures/Bayesian_Credibility.svg|340]]

> [!example]- Bayesian Update for Poisson Claim Frequency {Example}
> A policyholder's annual claim count $N \sim \text{Poi}(\theta)$. The prior for $\theta$ is Gamma$(2, 0.5)$ (mean $= 2 \times 0.5 = 1$). In 3 years, the policyholder had 0, 2, and 1 claims. Find the posterior mean.
>
> > [!answer]-
> > $\sum x_i = 3$, $n = 3$. The prior's $0.5$ is a scale, so its rate is $\beta = 1/0.5 = 2$. The Poisson–gamma update adds the claim count to the shape and the years to the rate: the posterior is Gamma with shape $2 + 3 = 5$ and rate $2 + 3 = 5$ (scale $0.2$).
> > Posterior mean $= 5/5 = 1$ claim per year.
> > This is the credibility-weighted blend: posterior mean $= Z \cdot \bar{X} + (1-Z)\mu_0$ with $Z = n/(n + \beta) = 3/(3 + 2) = 0.6$, giving $0.6(1) + 0.4(1) = 1$. Here the sample mean equals the prior mean, so the data confirm the prior rather than move it.
