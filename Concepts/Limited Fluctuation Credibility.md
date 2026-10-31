---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:79fcbcc80070fcad9ca9843d27d8876529df5df3841c1ffb11d15d8a0bd3e4ba
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 12 pp.217-220 (PDF pp.229-232), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, §§9.2.1–9.2.2, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
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
- **The simplifying assumptions.** In Werner & Modlin's derivation of the basic claim-count standard (Ch. 12), exposures are homogeneous, claim occurrence follows a Poisson distribution and there is no variation in the size of loss (constant severity).
- **Advantages** (Werner & Modlin, Ch. 12). It is the most commonly used approach and so generally accepted, the data it needs is readily available, and the computations are very straightforward.
- **Disadvantages.** The derivation makes simplifying assumptions that may not be true in practice, such as no variation in the size of losses. It uses a selected complement but does not take into account the quality of that complement compared with the latest observation, so judgment is required.
- Full credibility is defined by a probability p that the observed experience stays within a range k of its expected value, and Werner calls that range an arbitrary amount.

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
