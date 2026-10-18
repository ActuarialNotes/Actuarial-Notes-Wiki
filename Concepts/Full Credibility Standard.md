---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:cc93054a524e4ea9baf6967ed4802041de48837e38541a69209e3064b56b5541
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Full Credibility Standard.md
---

The **full credibility standard** is the volume of experience at which [[Limited Fluctuation Credibility|classical credibility]] assigns $Z = 1$. It is the smallest expected claim count $n_F$ for which the observed value stays within $100k\%$ of its expected value with probability $p$.

> $$n_F = \left(\frac{z_{(1+p)/2}}{k}\right)^{2}\left[\frac{\sigma_N^{2}}{\mu_N} + \left(\frac{\sigma_X}{\mu_X}\right)^{2}\right]$$
>
> $$\text{where } z_{(1+p)/2} \text{ is the standard normal quantile and } k \text{ the tolerance}$$

- $p$ is the **probability level** (how often the estimate must land inside the range) and $k$ the **range parameter** (how wide "inside" is) — the pair $(p, k)$ defines the standard, not the data
- **Frequency**, Poisson: $\sigma_N^2/\mu_N = 1$ and there is no severity term, so the standard reduces to $n_F = (z/k)^2$ expected claims
- **Severity**: $n_F = (z/k)^2 \cdot \mathrm{CV}_X^2$ claims, where $\mathrm{CV}_X = \sigma_X/\mu_X$ is the [[Coefficient of Variation]] of claim size
- **[[Aggregate Loss Model|Aggregate]]** loss with Poisson frequency: $n_F = (z/k)^2\left(1 + \mathrm{CV}_X^2\right)$ claims
- A standard stated in claims converts to exposures by dividing by the expected claim frequency per exposure
- Below the standard the estimate is not discarded — it is blended by [[Partial Credibility]]

![[Media/Figures/Full_Credibility_Standard.svg|340]]

> [!example]- The 1,082-Claim Standard {Example}
> An actuary wants the observed frequency to be within $\pm 5\%$ of the true frequency $90\%$ of the time. Claim counts are Poisson. How many claims are needed for full credibility?
>
> > [!answer]-
> > $p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$:
> > $$n_F = \left(\frac{1.645}{0.05}\right)^{2} = (32.9)^{2} = 1{,}082.4$$
> > **1,082 expected claims** — the standard quoted throughout classical credibility. Tightening to $k = 0.025$ quadruples it to 4,330 claims.

> [!example]- Adding Severity Variation {Example}
> Claim severity has mean 3,000 and standard deviation 6,000, and frequency is Poisson. Find the full-credibility standard for aggregate losses at $p = 0.90$, $k = 0.05$.
>
> > [!answer]-
> > $\mathrm{CV}_X = 6{,}000/3{,}000 = 2$, so $\mathrm{CV}_X^2 = 4$:
> > $$n_F = 1{,}082.4\,(1 + 4) = 5{,}412$$
> > **5,412 claims.** Severity variation multiplies the frequency-only standard by $1 + \mathrm{CV}_X^2$ — heavy-tailed lines need far more data to be fully credible.
