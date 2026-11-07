---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f6e7a9924ed1742b387f37deb3b82f1e21b439ec04b05fe20aee4c7eb285492a
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Partial Credibility.md
---

![[Media/Figures/Partial_Credibility.svg|340]]

**Partial Credibility** is a credibility $Z < 1$ that [[Limited Fluctuation Credibility|limited fluctuation credibility]] gives to experience whose volume $n$ falls short of the [[Full Credibility Standard|full credibility standard]] $n_F$. Under the square-root rule, the credibility is

> $$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$

- $n$ and $n_F$ are in the same units: claims, or exposures.
- $Z$ is capped at 1: extra data beyond the standard never earns more than full weight.

$Z$ multiplies the observed experience, and $1 - Z$ goes to the [[Complement of Credibility|complement of credibility]].

> [!example]- A rating class produced 300 claims against a full credibility standard of 1,082 claims. Its observed pure premium is 420, and the complement is 380. What is the credibility-weighted pure premium? {Example}
> - The class is below the standard, so $Z = \sqrt{300/1{,}082} = \sqrt{0.2773} = 0.527$.
> - The estimate is $0.527(420) + 0.473(380) = 221.2 + 179.9 = 401.1$.

## Derivation of the square-root rule

The square-root rule chooses $Z$ so that $Z D$, the part of the estimate that varies with the observed experience $D$, fluctuates no more than fully credible experience would:

> $$Z\,\sqrt{\text{Var}(D)} = \frac{k\,E[D]}{z_{(1+p)/2}}$$

- $p$ and $k$ are the probability level and range parameter of the full credibility standard.

$D$ is the mean of $n$ units, so $\sqrt{\text{Var}(D)}/E[D]$ falls with $\sqrt{n}$. Solving for $Z$ gives $\sqrt{n/n_F}$. This is why the rule takes the square root of the ratio, not the ratio itself.

> [!example]- A class's experience has $\sqrt{\text{Var}(D)}/E[D] = 0.08$, and the standard uses $p = 0.90$ and $k = 0.05$. What credibility does it get? {Example}
> - The allowed fluctuation is $k/z_{0.95} = 0.05/1.645 = 0.0304$ of the mean.
> - $Z = 0.0304/0.08 = 0.380$.

## Units of the observed volume

The observed volume is counted in the unit the standard is stated in. For a severity standard it is the number of claims observed. For a frequency, aggregate loss or pure premium standard in claims it is the number of claims, and for one in exposures it is the number of exposures.

> [!example]- A full credibility standard is 5,412 claims, and claim frequency is 0.08 per car year. A territory has 20,000 car years. What is its credibility? {Example}
> - The territory's expected claims are $20{,}000 \times 0.08 = 1{,}600$.
> - $Z = \sqrt{1{,}600/5{,}412} = 0.544$.

Partial credibility stabilizes the estimate but makes no claim to minimize its squared error, which is what [[Bühlmann Credibility|Bühlmann credibility]] does.

> [!trap] A square root, not a ratio
> With 300 claims against a standard of 1,082, the ratio $300/1{,}082 = 0.277$ is not the credibility. The credibility is its square root, $0.527$.
