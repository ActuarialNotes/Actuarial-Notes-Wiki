---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:162c8b153f3977a58326d83e438ea20a6c777fb71d3f2c9a75c42fbfef2cab8e
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance of Hypothetical Means.md
---

The **variance of the hypothetical means (VHM)**, written $a$, is the between-risk variance in a [[Bühlmann Credibility]] model — how much the risks in the portfolio genuinely differ from one another once process noise is stripped out.

> $$a = \mathrm{VHM} = \mathrm{Var}_\Theta\!\left(E[X \mid \Theta]\right)$$

- $\mu(\Theta) = E[X \mid \Theta]$ is the **hypothetical mean**: the long-run mean of a risk with parameter $\Theta$. VHM is the variance of that quantity across the population
- With the [[Expected Value of Process Variance]] $v$ it gives $k = v/a$ and $Z = n/(n+k)$
- **Large $a$** means the risks are genuinely heterogeneous, so a risk's own experience is worth a lot and $Z$ rises
- $a = 0$ means every risk has the same mean — experience rating has nothing to detect, and $Z = 0$ for any $n$
- The overall mean is $\mu = E[\mu(\Theta)]$, and $\mathrm{Var}(X) = v + a$

![[Media/Figures/Variance_of_Hypothetical_Means.svg|340]]

> [!example]- VHM for a Gamma-Poisson Model {Example}
> Claim counts are Poisson with mean $\Lambda$, where $\Lambda \sim \text{Gamma}(\alpha = 4, \theta = 0.05)$. Find $\mu$, $v$, $a$, and $k$.
>
> > [!answer]-
> > $\mu(\Lambda) = \Lambda$ and $\sigma^2(\Lambda) = \Lambda$ for a Poisson.
> > $$\mu = E[\Lambda] = \alpha\theta = 4(0.05) = 0.20$$
> > $$v = E[\Lambda] = 0.20 \qquad a = \mathrm{Var}(\Lambda) = \alpha\theta^{2} = 4(0.0025) = 0.01$$
> > $$k = \frac{v}{a} = \frac{0.20}{0.01} = 20 = \frac{1}{\theta}$$
> > For the Gamma-Poisson, $k$ is always $1/\theta$, and $Z = n/(n + 1/\theta)$ reproduces the Bayesian posterior mean exactly.
