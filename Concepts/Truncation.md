---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:e53fbadd495533b2999b3146e526ca8bc2ff2818f7a1c53759fdf35e7810dc94
  sources:
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.4 §4.3.1.3 truncated data (left truncation at a deductible: losses at or below C_L are not observed; right truncation; truncated outcomes are missing data, censored ones are recorded in limited form), §4.3.1.4 contribution f(x)/(1 - F(C_L)) and exponential special case, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.5.2.3 MLE for truncated data, L = prod f(x_i)/S(d), \"we would not have been aware of the existence of these values had they not exceeded d\", sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Luo, Shevchenko & Donnelly, \"Addressing the Impact of Data Truncation and Parameter Uncertainty on Operational Risk Estimates\", J. Operational Risk 2(4), 2007 (arXiv:0904.2910 preprint), PDF p.3 and p.12, sha256:a91ad1b0e1bc8a2ec69e9c7f614faf8db2e6f4ca02e879a2ef3a598ecd39cf9b — https://arxiv.org/pdf/0904.2910"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 8 and 9 (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Truncation.md
---

**Truncation** occurs when observations below (or above) a threshold are **not recorded at all** — unlike [[Censoring]], which records that an unobserved value exists. In insurance, **left-truncation** arises with deductibles: only losses exceeding the deductible $d$ are reported.

> **Left-truncated likelihood contribution** (only losses $X > d$ are observed):
> $$L_i(\theta) = \frac{f(x \mid \theta)}{S(d \mid \theta)}$$

> $$= \frac{f(x \mid \theta)}{P(X > d \mid \theta)}$$

> $$x > d$$

- Under left-truncation at $d$, the effective distribution is the **conditional** distribution $X \mid X > d$
- Failing to adjust for truncation leads to **upward bias** in estimated means (only the larger claims are seen)
- **Right-truncation**: only values below some upper limit are recorded (less common in insurance)
- Truncation differs from censoring: with truncation, you do not even know an observation exists; with censoring, you know there is an observation but not its exact value

![[Media/Figures/Truncation.svg|340]]

> [!example]- MLE With Left-Truncated Exponential Data {Example}
> Claims above a deductible $d = 1$ are reported. Two reported claims are $x_1 = 2$ and $x_2 = 3$. Assume $X \sim \text{Exp}(\theta)$. Write and maximize the likelihood.
>
> > [!answer]-
> > $S(1|\theta) = e^{-1/\theta}$, so each claim contributes $f(x|\theta)/S(1|\theta) = \frac{1}{\theta}e^{-x/\theta}/e^{-1/\theta} = \frac{1}{\theta}e^{-(x-1)/\theta}$.
> > $$L(\theta) = \frac{1}{\theta}e^{-(2-1)/\theta}\cdot\frac{1}{\theta}e^{-(3-1)/\theta} = \frac{1}{\theta^2}e^{-3/\theta}$$
> > Solving $\ell'(\theta) = -2/\theta + 3/\theta^2 = 0$ gives $\hat{\theta} = 3/2 = 1.5$. This equals $\bar{x} - d = 2.5 - 1 = 1.5$, the sample mean of **excess losses**.
