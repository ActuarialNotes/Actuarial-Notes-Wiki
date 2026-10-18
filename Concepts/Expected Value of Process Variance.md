---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:e2f39341cec296b4c0be73969f42284378abacb3c2f25182d8178b44c1b7e99c
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expected Value of Process Variance.md
---

The **expected value of the process variance (EPV)**, written $v$, is the average within-risk variance in a [[Bühlmann Credibility]] model — how noisy a single risk's own experience is, averaged over the population of risks.

> $$v = \mathrm{EPV} = E_\Theta\!\left[\mathrm{Var}(X \mid \Theta)\right]$$

- $\Theta$ is the unobserved **risk parameter**; conditioning on it removes the between-risk differences and leaves only process noise
- Together with the [[Variance of Hypothetical Means]] $a$ it fixes the Bühlmann constant $k = v/a$ and hence $Z = n/(n+k)$
- **Large $v$** means one risk's own data is unreliable, so $Z$ falls and the estimate leans on the manual rate
- The total variance splits into the two pieces: $\mathrm{Var}(X) = v + a$ — the conditional-variance decomposition
- Estimated from data by [[Empirical Bayes Credibility|empirical Bayes]] as the pooled within-risk sample variance

![[Media/Figures/Expected_Value_of_Process_Variance.svg|340]]

> [!example]- EPV from a Two-Type Portfolio {Example}
> Half the policyholders are **good** drivers with Poisson claim frequency $\lambda = 0.10$; half are **bad** with $\lambda = 0.40$. Find the EPV.
>
> > [!answer]-
> > For a Poisson risk, $\mathrm{Var}(X \mid \Theta) = \lambda$, so
> > $$v = E[\lambda] = 0.5(0.10) + 0.5(0.40) = 0.25$$
> > Note $a = \mathrm{Var}(\lambda) = 0.5(0.10 - 0.25)^2 + 0.5(0.40 - 0.25)^2 = 0.0225$, so $k = v/a = 0.25/0.0225 = 11.1$ — it takes about 11 years of experience for a driver to earn 50% credibility.
