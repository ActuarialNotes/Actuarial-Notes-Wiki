---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:03717befeb2a2fdcf3ad5f1e9393775ccb544b73d66a3e73947cee4571407e3a
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Frees et al., Loss Data Analytics (open text), Appendix B, §16.3 Conjugate Distributions, sha256:66a757e0d3dfdac6e4196cd9458ad437bb4ea690dca28797e4c1fe403c5f9e92 — https://openacttexts.github.io/Loss-Data-Analytics/CAppB.html"
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Conjugate Prior.md
---

A **conjugate prior** is a prior distribution for a risk parameter that, combined with a given likelihood, produces a posterior in the *same* family. Updating then reduces to arithmetic on the parameters — the reason [[Bayesian Credibility]] is computable by hand on an exam.

> $$\pi(\theta) \in \mathcal{F} \;\text{and}\; f(x \mid \theta) \;\Longrightarrow\; \pi(\theta \mid \mathbf{x}) \in \mathcal{F}$$

**Common conjugate pairs:**

| Likelihood | Prior | Posterior | Posterior mean |
| :--- | :--- | :--- | :--- |
| Poisson$(\lambda)$ | Gamma$(\alpha, \theta)$ | Gamma$\left(\alpha + \sum x_i,\; \frac{\theta}{1 + n\theta}\right)$ | $Z\bar{x} + (1-Z)\alpha\theta$, $Z = \frac{n}{n + 1/\theta}$ |
| Bernoulli / Binomial | Beta$(a, b)$ | Beta$\left(a + \sum x_i,\; b + n - \sum x_i\right)$ | $Z\bar{x} + (1-Z)\frac{a}{a+b}$, $Z = \frac{n}{n + a + b}$ |
| Normal$(\theta, \sigma^2)$ | Normal$(\mu, \tau^2)$ | Normal, precision-weighted | $Z\bar{x} + (1-Z)\mu$, $Z = \frac{n}{n + \sigma^2/\tau^2}$ |
| Exponential$(\theta)$ | Inverse Gamma | Inverse Gamma | credibility-weighted |

- Every posterior mean above is **linear in $\bar{x}$**, which is exactly the form [[Bühlmann Credibility]] assumes — so for a conjugate pair the Bühlmann and Bayesian estimates are **identical**, not merely close
- The prior parameters act like pseudo-observations: a Gamma$(\alpha, \theta)$ prior behaves like having already seen $1/\theta$ exposures with $\alpha$ claims
- Outside a conjugate pair the posterior generally has no closed form and Bühlmann is a linear approximation to it

![[Media/Figures/Conjugate_Prior.svg|340]]

> [!example]- Gamma-Poisson Update {Example}
> A driver's annual claim count is Poisson$(\Lambda)$ with prior $\Lambda \sim$ Gamma$(\alpha = 2, \theta = 0.10)$. Over 3 years the driver reports 1 claim. Find the posterior and the Bayesian estimate of next year's frequency.
>
> > [!answer]-
> > Posterior: Gamma with $\alpha^* = \alpha + \sum x_i = 2 + 1 = 3$ and $\theta^* = \dfrac{\theta}{1 + n\theta} = \dfrac{0.10}{1 + 0.3} = 0.0769$.
> > $$E[\Lambda \mid \mathbf{x}] = \alpha^*\theta^* = 3(0.0769) = 0.2308$$
> > Check against Bühlmann: $k = 1/\theta = 10$, $Z = 3/13 = 0.2308$, $\bar{x} = 1/3$, $\mu = \alpha\theta = 0.20$:
> > $$0.2308\left(\tfrac{1}{3}\right) + 0.7692(0.20) = 0.0769 + 0.1538 = 0.2308 \;\checkmark$$
