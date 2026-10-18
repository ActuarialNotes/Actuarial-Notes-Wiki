---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5c521e752f5c566f3cfd52f760c269ef9b0b3838cf724aaf0f05decc3aa01e72
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Partial Credibility.md
---

**Partial credibility** is the weight $Z < 1$ that [[Limited Fluctuation Credibility|classical credibility]] gives to experience that falls short of the [[Full Credibility Standard]]. The square-root rule sets $Z$ so that the *credibility-weighted* estimate has the same variance the full-credibility standard was chosen to deliver.

> $$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$

- $n$ is the observed volume and $n_F$ the [[Full Credibility Standard]], both in the same units (claims, or exposures)
- The square root, not the ratio: the standard deviation of the mean falls with $\sqrt{n}$
- $Z$ multiplies the observed experience; $1 - Z$ goes to the [[Complement of Credibility]]
- Partial credibility stabilizes the estimate but is **biased toward the complement** — it makes no claim to minimize squared error, which is what [[Bühlmann Credibility]] is for
- $Z$ is capped at 1: extra data beyond the standard never earns more than full weight

![[Media/Figures/Partial_Credibility.svg|340]]

> [!example]- Credibility-Weighting a Small Class {Example}
> A rating class produced 300 claims against a full-credibility standard of 1,082. Its observed pure premium is 420; the manual (complement) pure premium is 380. Find the credibility-weighted pure premium.
>
> > [!answer]-
> > $$Z = \sqrt{\frac{300}{1{,}082}} = \sqrt{0.2773} = 0.527$$
> > $$\text{PP} = 0.527(420) + 0.473(380) = 221.3 + 179.7 = 401.0$$
> > The class gets **401**, a little over half of the way from the manual rate to its own experience.
