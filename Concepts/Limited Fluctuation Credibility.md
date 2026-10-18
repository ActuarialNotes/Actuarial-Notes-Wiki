---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:70916af850c833770407fbad3600f3ff3f589b973960e93e365545fde902606d
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Limited Fluctuation Credibility.md
---

**Limited Fluctuation Credibility** (also called **Classical Credibility**) assigns a credibility factor $Z \in [0,1]$ to observed data based on whether the volume of data is sufficient to meet a specified accuracy standard. The estimate is then a blend of observed experience and an external prior.

> $$\text{Estimate} = Z \cdot \bar{X} + (1-Z) \cdot \mu_0$$
>
> $$Z = \min\!\left(1,\, \sqrt{\frac{n}{n_{\text{full}}}}\right)$$

**Full credibility standard** — the number of observations $n_{\text{full}}$ required so that the observed mean is within $100r\%$ of the true mean with probability $1-\alpha$:

$$n_{\text{full}} = \left(\frac{z_{\alpha/2}}{r}\right)^2 \cdot \frac{\text{Var}(X)}{[\text{E}(X)]^2}$$

- For **claim frequency** (Poisson): $\text{Var}(X)/[E(X)]^2 = 1/\lambda$, giving $n_{\text{full}} = (z_{\alpha/2}/r)^2 / \lambda$; typically **1,082 claims** at $r=5\%$, $1-\alpha=90\%$
- For **claim severity**: $n_{\text{full}}$ depends on the coefficient of variation $\text{CV} = \sigma/\mu$
- For **aggregate losses**: $n_{\text{full}}$ combines frequency and severity CVs: $\text{CV}^2_S = \text{CV}^2_N + \text{CV}^2_X / E[N]$
- Partial credibility uses the **square root rule**: $Z = \sqrt{n/n_{\text{full}}}$ when $n < n_{\text{full}}$

![[Media/Figures/Limited_Fluctuation_Credibility.svg|340]]

> [!example]- Credibility Factor for a Small Class {Example}
> The full credibility standard for frequency is 1,082 claims. A class has 400 observed claims. Calculate the credibility factor.
>
> > [!answer]-
> > $$Z = \sqrt{\frac{400}{1{,}082}} = \sqrt{0.3697} \approx 0.608$$
> > The class has about 60.8% credibility.

> [!example]- Credibility-Weighted Rate Indication {Example}
> A territory has $Z = 0.70$. The observed loss ratio is 0.85 and the complement (prior) is 0.75. Calculate the credibility-weighted indicated loss ratio.
>
> > [!answer]-
> > $$\text{Estimate} = 0.70(0.85) + 0.30(0.75) = 0.595 + 0.225 = 0.820$$
