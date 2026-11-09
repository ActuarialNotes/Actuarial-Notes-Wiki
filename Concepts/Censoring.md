---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:202282f24fe1532e52d51e6d361f8cde07b2e1780dd4b350a2aabab3cdbb6607
  sources:
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (open textbook), Ch.4 Model Selection and Estimation §4.3.1.2 (right-censoring most common, X_U* = min(X, C_U); left-censoring max(X, C_L); a reinsurer not observing small claims is censoring from the left; grouped / interval-censored data), §4.3.1.4 likelihood-contribution table (exact f(x), right-censored 1 - F(C_U), interval F(C_U) - F(C_L)) and exponential special case, HTML fetched 2026-10-05, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.5.2.2 MLE for censored data (L = Π f(x_i) × S(u)^m), HTML fetched 2026-10-05, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Dey, Lipsitz, Cooper, Trinh, Krzywinski & Altman, 'Survival analysis—time-to-event data and censoring', Nature Methods 19(8), 2022, Fig. 3 caption (treating censored times as observed event times underestimates survival), article HTML fetched 2026-10-05, sha256:44e0b7fe90a312e529a72b9bf7b37506acfa215cf52e88378ed80ed5448851fb — https://www.nature.com/articles/s41592-022-01563-7"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 8-9 (MLE 'accounting for censoring and truncation'; 'missing data values, including censoring and truncation'), PDF p.4; Tse §§10.1, 10.2, 12.3 listed for Domain B, PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Censoring.md
---

![[Media/Figures/Censoring.svg|340]]

**Censoring** is the recording of an observation as lying in a range rather than at its exact value. An observation is right-censored at $u$ when it is known only to exceed $u$, as when a loss above a [[Policy Limit|policy limit]] $u$ is paid at the limit. In [[Maximum Likelihood Estimation|maximum likelihood estimation]], an observation right-censored at $u$ contributes to the likelihood the probability

> $$S(u) = P(X > u)$$

- $S(x)$ is the survival function of the loss $X$.

An exact observation $x$ contributes its density $f(x)$. The likelihood is the product of the densities of the exact observations and the survival probabilities of the censored ones.

> [!example]- Losses are exponential with mean $\theta$. Two losses are observed exactly, at 2 and 3, and a third is known only to exceed 4. What is the maximum likelihood estimate of $\theta$? {Example}
> - The exact losses contribute $f(2) = \frac{1}{\theta}e^{-2/\theta}$ and $f(3) = \frac{1}{\theta}e^{-3/\theta}$.
> - The censored loss contributes $S(4) = e^{-4/\theta}$.
> - The likelihood is $L(\theta) = \theta^{-2}e^{-9/\theta}$, so $l(\theta) = -2\ln\theta - 9/\theta$.
> - Setting $l'(\theta) = -2/\theta + 9/\theta^2$ to 0 gives $\hat{\theta} = 9/2 = 4.5$.

## Exponential losses with a policy limit

For exponential losses with mean $\theta$, $n$ losses observed exactly and $s$ losses right-censored at $u$, the maximum likelihood estimate is

> $$\hat{\theta} = \frac{\sum_{i=1}^{n} x_i + s\,u}{n}$$

- $x_1, \ldots, x_n$ are the exact observations.

The numerator is the sum of all recorded values, censored ones included, and the denominator counts only the exact observations.

> [!example]- Losses are exponential, and a policy pays at most 10,000. The payments are 1,000, 3,000, 6,000, 10,000 and 10,000. What is the maximum likelihood estimate of the mean loss? {Example}
> - The three payments below 10,000 are exact, so $n = 3$.
> - The two payments of 10,000 are right-censored at $u = 10{,}000$, so $s = 2$.
> - The exact payments sum to 10,000 and the censored payments to 20,000, a total of 30,000.
> - The estimate is $\hat{\theta} = 30{,}000/3 = 10{,}000$.

## Left censoring and interval censoring

An observation is left-censored at $u$ when it is known only to be at most $u$, and it contributes $F(u)$. An observation known only to lie in the interval $(a, b]$ is interval-censored, and it contributes $F(b) - F(a)$. [[Grouped Data|Grouped data]] are interval-censored.

> [!trap] Treating a payment at the limit as an exact loss
> A loss paid at the policy limit is at least the limit. Counting it as an exact value understates the mean. In the example above, dividing the 30,000 by all 5 payments gives 6,000 instead of 10,000.
