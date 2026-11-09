---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:eb4a0936c2f10f196aa03f58bc24bac13d09727d26e43b68b50ffa1152d818a4
  sources:
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (open textbook), Ch.4 §4.3.1.3 truncated data (left truncation at a deductible; right truncation; truncated outcomes are not observed at all, censored ones are recorded in limited form; Fig. 4.12), §4.3.1.4 contribution f(x)/(1 - F(C_L)) and exponential special case, HTML fetched 2026-10-05, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.5.2.3 MLE for truncated data (L = Π f(x_i)/S(d); 'we would not have been aware of the existence of these values had they not exceeded d'), HTML fetched 2026-10-05, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Luo, Shevchenko & Donnelly, 'Addressing the Impact of Data Truncation and Parameter Uncertainty on Operational Risk Estimates', J. Operational Risk 2(4), 2007 (arXiv:0904.2910 preprint), abstract PDF p.2, §5.1 PDF pp.12-14 (naive lognormal fit to truncated data always overestimates μ and underestimates σ; underestimates Q_0.99 for truncation below 66%, Q_0.999 below 92%), §5.2 PDF p.14, sha256:a91ad1b0e1bc8a2ec69e9c7f614faf8db2e6f4ca02e879a2ef3a598ecd39cf9b — https://arxiv.org/pdf/0904.2910"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 8-9 (MLE accounting for censoring and truncation; missing data values including censoring and truncation), PDF p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Truncation.md
---

![[Media/Figures/Truncation.svg|340]]

**Truncation** is the exclusion from the data of every value outside a range, so that an excluded value is not recorded at all. Data are left-truncated at $d$ when values at or below $d$ are not recorded, as when losses below a [[Deductible|deductible]] $d$ are not reported. A value recorded from data left-truncated at $d$ is drawn from the distribution of $X$ given $X > d$, so in [[Maximum Likelihood Estimation|maximum likelihood estimation]] it contributes the conditional density

> $$\frac{f(x)}{S(d)}$$

- $f(x)$ is the density of the loss $X$, and $S(x) = 1 - F(x)$ is its survival function.
- $x > d$.

> [!example]- Losses are exponential with mean $\theta$, and only losses above a deductible of 1 are reported. The two reported losses are 2 and 3. What is the maximum likelihood estimate of $\theta$? {Example}
> - With $S(1) = e^{-1/\theta}$, each loss contributes $\frac{f(x)}{S(1)} = \frac{1}{\theta}e^{-(x - 1)/\theta}$.
> - The likelihood is $L(\theta) = \theta^{-2}e^{-(1 + 2)/\theta} = \theta^{-2}e^{-3/\theta}$.
> - Setting $l'(\theta) = -2/\theta + 3/\theta^2$ to 0 gives $\hat{\theta} = 3/2 = 1.5$.

## Exponential losses above a deductible

The exponential distribution is [[Exponential Distribution#Memorylessness|memoryless]], so given $X > d$, the excess $X - d$ is exponential with the same mean $\theta$. For $n$ losses $x_1, \ldots, x_n$ left-truncated at $d$, the maximum likelihood estimate of $\theta$ is therefore the mean of the excesses:

> $$\hat{\theta} = \frac{1}{n}\sum_{i=1}^{n} (x_i - d)$$

> [!example]- Losses are exponential, and a policy has an ordinary deductible of 500. Losses below the deductible are not reported. The payments on three reported losses are 1,000, 4,000 and 2,500. What is the maximum likelihood estimate of the mean loss? {Example}
> - Each payment is the excess $x_i - 500$ of a loss above the deductible.
> - The estimate is the mean payment, $\hat{\theta} = 7{,}500/3 = 2{,}500$.
> - The deductible does not change the distribution of the payment, so the ground-up mean loss is also estimated as 2,500.

## The mean of truncated data

The average of the losses recorded above a deductible $d$ estimates $E[X \mid X > d]$, not $E[X]$. It overstates the mean of all losses, because only the larger losses are seen. The mean payment when losses below the deductible are not reported is the [[Deductible#Expected payment per payment|expected payment per payment]], $E[X - d \mid X > d]$.

Data are right-truncated at $u$ when values above $u$ are not recorded. A recorded value then contributes $f(x)/F(u)$.

> [!trap] Confusing truncation with censoring
> A truncated value is not in the data at all, so the likelihood divides by $S(d)$ for every recorded value. A [[Censoring|censored]] value is in the data with only its range known, so it contributes $S(u)$ in place of a density. A loss below a deductible is truncated, and a loss paid at a policy limit is censored.
