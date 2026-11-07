---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:14a58d382ccea27cedf50616ba487af1d7093fbabb4160b7a6d5c432bfce5f51
  sources:
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (open textbook), Ch.4 §4.3.1 (grouped data = interval censored, Example 4.3.1 exponential grouped MLE with p = e^(-1000/θ); likelihood with exact, right-, left- and interval-censored terms; right-censored and left-truncated likelihood Π_E f/(1 - F(C_L)) Π_R (1 - F(C_U))/(1 - F(C_L)); exponential special case θ̂ = Σ (min(x, C_U) - C_L) / n_u) and §4.3.2.2 product-limit (Kaplan-Meier) estimator 'in the presence of incomplete data', HTML fetched 2026-10-05, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.4 (limited loss X ∧ u is right censored) and §3.5.2.1-3.5.2.3 (grouped likelihood Π [F(c_j) - F(c_{j-1})]^{n_j}; policy limit as right censoring S(u); deductible as left truncation f(x)/S(d)), HTML fetched 2026-10-05, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Dey, Lipsitz, Cooper, Trinh, Krzywinski & Altman, 'Survival analysis—time-to-event data and censoring', Nature Methods 19(8), 2022, Fig. 3 caption (treating censored times as observed event times underestimates survival), article HTML fetched 2026-10-05, sha256:44e0b7fe90a312e529a72b9bf7b37506acfa215cf52e88378ed80ed5448851fb — https://www.nature.com/articles/s41592-022-01563-7"
    - "Luo, Shevchenko & Donnelly, J. Operational Risk 2(4), 2007 (arXiv:0904.2910 preprint), §5.1 PDF pp.12-14 (naive lognormal fit to truncated data: μ always overestimated, σ underestimated, high quantiles underestimated for truncation below 66% / 92%), sha256:a91ad1b0e1bc8a2ec69e9c7f614faf8db2e6f4ca02e879a2ef3a598ecd39cf9b — https://arxiv.org/pdf/0904.2910"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 9 'Adjust calculations for the effect of missing data values, including censoring and truncation' (PDF p.4); Tse §§10.1, 10.2, 11.1, 12.1, 12.3 assigned (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Incomplete Data.md
---

**Incomplete Data** is data in which some values are not observed exactly or not recorded at all. In insurance, a [[Deductible|deductible]] causes [[Truncation|truncation]], because losses below it are not reported, and a [[Policy Limit|policy limit]] causes [[Censoring|censoring]], because a loss above it is recorded only as exceeding the limit. In [[Maximum Likelihood Estimation|maximum likelihood estimation]] with data left-truncated at $d$ and right-censored at $u$, the likelihood is

> $$L(\theta) = \prod_{\text{exact } x_i} \frac{f(x_i)}{S(d)} \times \prod_{\text{censored}} \frac{S(u)}{S(d)}$$

- $f(x)$ is the density and $S(x) = 1 - F(x)$ the survival function of the ground-up loss $X$.
- The first product runs over the losses observed exactly, and the second over the losses censored at $u$.
- With no deductible, $S(d) = S(0) = 1$.

> [!example]- A policy has a deductible of 500 and pays losses up to 5,000. Ground-up losses are exponential with mean $\theta$. The reported losses are 1,000, 2,000 and 3,500, and two more losses are at least 5,000. What is the maximum likelihood estimate of $\theta$? {Example}
> - Each exact loss contributes $f(x)/S(500) = \frac{1}{\theta}e^{-(x - 500)/\theta}$.
> - Each censored loss contributes $S(5{,}000)/S(500) = e^{-4{,}500/\theta}$.
> - The amounts above 500 are 500, 1,500, 3,000, 4,500 and 4,500, which sum to 14,000.
> - The likelihood is $L(\theta) = \theta^{-3}e^{-14{,}000/\theta}$, so $l(\theta) = -3\ln\theta - 14{,}000/\theta$.
> - Setting $l'(\theta) = -3/\theta + 14{,}000/\theta^2$ to 0 gives $\hat{\theta} = 14{,}000/3 = 4{,}666.67$.

## Exponential losses with a deductible and a limit

For exponential losses, the maximum likelihood estimate of the mean with any mix of truncation and right censoring is

> $$\hat{\theta} = \frac{\sum_{\text{all } i} (x_i - d_i)}{\text{number of exact observations}}$$

- $x_i$ is the recorded loss, which for a censored loss is the censoring point.
- $d_i$ is the truncation point of loss $i$, and $d_i = 0$ when there is no deductible.

When the data are payments, each payment is already $x_i - d_i$, so the numerator is the sum of all payments.

> [!example]- A policy has a deductible of 1,000 and a maximum payment of 9,000. Losses below the deductible are not reported. The payments are 2,000, 5,000, 9,000 and 9,000. Losses are exponential. What is the maximum likelihood estimate of the mean loss? {Example}
> - The payments of 9,000 are at the maximum, so those two losses are right-censored.
> - The payments sum to 25,000, the censored ones included.
> - Two payments are exact, so $\hat{\theta} = 25{,}000/2 = 12{,}500$.

## Grouped data

[[Grouped Data|Grouped data]] record only the number of losses in each interval. Each loss in an interval $(c_{j-1}, c_j]$ contributes the probability of that interval, so the likelihood is

> $$L(\theta) = \prod_j \left[F(c_j) - F(c_{j-1})\right]^{n_j}$$

- $n_j$ is the number of losses in interval $j$.

> [!example]- Of 100 claims, 60 are below 1,000, 30 are between 1,000 and 3,000, and 10 exceed 3,000. Claim sizes are exponential with mean $\theta$. What is the maximum likelihood estimate of $\theta$? {Example}
> - Write $p = e^{-1{,}000/\theta}$, so that $S(1{,}000) = p$ and $S(3{,}000) = p^3$.
> - The intervals have probabilities $1 - p$, $p - p^3$ and $p^3$.
> - The likelihood is $(1 - p)^{60}(p - p^3)^{30}(p^3)^{10}$, which simplifies to $p^{60}(1 - p)^{90}(1 + p)^{30}$.
> - Setting the derivative of its logarithm with respect to $p$ to 0 gives $3p^2 + p - 1 = 0$, so $p = (\sqrt{13} - 1)/6 = 0.43426$.
> - The estimate is $\hat{\theta} = -1{,}000/\ln 0.43426 = 1{,}198.9$.
