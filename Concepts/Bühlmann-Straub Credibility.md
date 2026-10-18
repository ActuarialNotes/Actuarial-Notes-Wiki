---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:46a35a84038e009536ea33be776cddd2086707c2edd322057ca174b6d26bceb4
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Bühlmann-Straub Credibility.md"
---

**Bühlmann-Straub Credibility** extends [[Bühlmann Credibility]] to handle observations with **unequal exposures** (or weights) $m_i$. Each period $i$ contributes a loss rate $X_i = S_i / m_i$ with weight $m_i$, so periods with more exposure get more weight.

> $$\text{Estimate} = Z \cdot \bar{X}_w + (1-Z) \cdot \mu$$
>
> $$Z = \frac{m}{m + k}$$
>
> $$\bar{X}_w = \frac{\sum_{i=1}^n m_i X_i}{\sum_{i=1}^n m_i}$$
>
> $$m = \sum_{i=1}^n m_i$$

**Variance components** (as in [[Bühlmann Credibility]], but per unit of exposure: $\text{Var}(X_i \mid \theta) = \sigma^2(\theta)/m_i$):
$$k = \frac{v}{a}, \quad v = E[\sigma^2(\theta)], \quad a = \text{Var}(\mu(\theta))$$

- $\bar{X}_w$ is the **exposure-weighted** average loss rate
- $m$ is the **total exposure**; credibility increases with total exposure, not just the number of periods
- When all $m_i = 1$, Bühlmann-Straub reduces to the standard Bühlmann model
- Parameters $v$ and $a$ are typically estimated from the data using **empirical Bayes** methods

![[Media/Figures/Bühlmann-Straub_Credibility.svg|340]]

> [!example]- Bühlmann-Straub with Unequal Exposures {Example}
> A risk has three years of data with exposures $(m_1, m_2, m_3) = (100, 200, 150)$ and loss rates $(X_1, X_2, X_3) = (0.08, 0.06, 0.09)$. Given $k = v/a = 250$ and overall mean $\mu = 0.07$, find the credibility estimate.
>
> > [!answer]-
> > $m = 100 + 200 + 150 = 450$.
> > $\bar{X}_w = \frac{100(0.08) + 200(0.06) + 150(0.09)}{450} = \frac{8 + 12 + 13.5}{450} = \frac{33.5}{450} \approx 0.0744$.
> > $Z = \frac{450}{450 + 250} = \frac{450}{700} \approx 0.643$.
> > $$\text{Estimate} = 0.643(0.0744) + 0.357(0.07) \approx 0.0479 + 0.0250 = 0.0729$$
