---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:3662606678df73b385760a0416a6acb3c2d9f89804d3865e27f6b7d05c10d658
  sources:
    - "Tse, Nonlife Actuarial Models: Theory, Methods and Evaluation (Cambridge UP 2009; MAS-I reading) — publisher preview: §1.1 p.4 (PDF 22: 'the monetary amount of each claim is called the claim severity or claim size'; frequency and severity considered separately); printed contents pp.vii-viii (PDF 9-10: §2.2.1-2.2.4 Exponential, Gamma, Weibull, Pareto; §2.4 tail properties; §2.5.4 effects of inflation), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Frees et al. (eds.), Loss Data Analytics (open textbook, 1st ed.), ch.3 'Modeling Loss Severity': §3.2.1 gamma light-tailed (all moments), §3.2.2 Pareto heavy-tailed (decreasing hazard 'another indication'), §3.2.3 Weibull hazard decreasing for shape < 1 ('heavy tailed'), increasing for > 1, §3.3.2 scale distributions (inflation multiplies the scale parameter), §3.3.5.2 k-point mixture (E(X^r), M_X(t) weighted sums), §3.4.2 E(X ^ u) = int_0^u [1 - F(x)] dx and Y^L = (X ^ u) - (X ^ d), §3.4.3 Example 3.4.5 (500 xs 100 layer, exponential mean 1000, 5% inflation: cost per payment +1.1%), §3.5.2 censored (S(u)) and truncated (f(x)/S(d)) likelihoods, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Frees et al. (eds.), Loss Data Analytics (open textbook, 1st ed.), ch.10 §10.2 'Tails of Distributions': Definition 10.1 (moment method), Examples 10.2.1-10.2.3 (gamma, Weibull light; Pareto heavy, k* = alpha), closing paragraph (MGF criterion more common; lognormal has all moments but no MGF), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html"
    - "Bernegger, 'The Swiss Re Exposure Curves and the MBBEFD Distribution Class', ASTIN Bulletin 27(1), May 1997, pp.99-111 (Exam 9 reading; CAS-hosted scan, read from page images): §2.1 eq. 2.1 pp.100-101 (G(d) = L(d)/L(1) = int_0^d (1 - F)/E[x], increasing, concave, G(0) = 0, G(1) = 1); §2.2 eqs. 2.2-2.3 p.101 (G'(d) = (1 - F(d))/E[x]; F(x) = 1 - G'(x)/G'(0) for 0 <= x < 1); §2.3 eq. 2.4 p.101 (E[x] = 1/G'(0)); §4.3 pp.109-110 (c = 1.5, 2, 3, 4 'coincide very well' with Y1-Y4; c = 5 'coincides very well with a Lloyd's curve used for the rating of industrial risks'), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/database/astin_vol27no1_99.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, May 2016), ch.6 'Leveraged Effect of Limits on Severity Trend' pp.117-118 (PDF 129-130, Tables 6.20-6.21: positive trend -> Basic Limits Trend <= Total Limits Trend <= Excess Losses Trend; excess = total minus basic; deductibles leverage analogously) and ch.11 pp.193, 197 (PDF 205, 209: indicated ILF(H) = LAS(H)/LAS(B)), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 5, 8 and 9, readings Hogg, Tse (PDF p.4); Tse §§1.1, 2.2-2.5 assigned (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, Domain A task 1 'Fit loss distribution-based exposure curves' (p.3) and text reference Bernegger (p.7), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Bahnemann, Distributions for Actuaries (CAS Monograph 2), Problem 2.31 (PDF p.87, CV = SD/mean); §5.2 eq. 5.8 pp.145-146 (PDF pp.157-158, mean excess e(x): constant for exponential, increasing linear for Pareto with a > 1), sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
    - "Wikipedia, 'Lomax distribution', oldid 1333105295, section 'Gamma-exponential (scale-) mixture connection' (exponential with gamma-distributed rate is Lomax/Pareto), sha256:0365b35d2ad2bc7a02e0e3cb1a2e215a3f592623bc24d95e25cd9fb06ce6f9d4 — https://en.wikipedia.org/w/index.php?title=Lomax_distribution&oldid=1333105295"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Severity Distribution.md
---

A **Severity Distribution** is the probability distribution of the size $X$ of a single loss or claim, given that a loss occurs. It prices anything that depends on how large losses are, such as deductibles, limits and excess layers. The expected loss up to a limit $u$, the [[Limited Expected Value|limited expected value]], is

> $$E[X \wedge u] = \int_0^u S(x)\,dx$$

- $S(x) = 1 - F(x)$ is the survival function of $X$.

The expected loss per loss in the layer from $d$ to $u$ is $E[X \wedge u] - E[X \wedge d]$. It depends only on the survival function inside the layer, so for an excess layer the tail of the distribution decides the answer.

> [!example]- Losses are exponential with mean 1,000. What is the expected loss per loss in the layer from 1,000 to 2,000? {Example}
> - The survival function is $S(x) = e^{-x/1{,}000}$.
> - The expected loss in the layer is $\int_{1{,}000}^{2{,}000} e^{-x/1{,}000}\,dx = 1{,}000\left(e^{-1} - e^{-2}\right) = 232.54$.

## Common severity distributions

The severity distributions of the MAS-I reading are the [[Exponential Distribution|exponential]], [[Gamma|gamma]], [[Weibull Distribution|Weibull]] and [[Pareto Distribution|Pareto]] distributions. The [[Lognormal Distribution|lognormal]] is also common.

| Distribution | Survival function $S(x)$ | Mean |
| --- | --- | --- |
| Exponential | $e^{-x/\theta}$ | $\theta$ |
| Gamma | no closed form | $\alpha\theta$ |
| Weibull | $e^{-(x/\theta)^\tau}$ | $\theta\,\Gamma(1 + 1/\tau)$ |
| Pareto | $\left(\frac{\theta}{x + \theta}\right)^{\alpha}$ | $\frac{\theta}{\alpha - 1}$, for $\alpha > 1$ |
| Lognormal | $1 - \Phi\left(\frac{\ln x - \mu}{\sigma}\right)$ | $e^{\mu + \sigma^2/2}$ |

From the lightest [[Tail Weight|tail]] to the heaviest, the order is the Weibull with $\tau > 1$, the exponential, the lognormal and the Pareto. The lognormal has every moment but no moment generating function. A heavier-tailed distribution places more of the expected loss in the excess layers.

The tail also shows in the [[Mean Excess Loss|mean excess loss]] $e(d)$, the expected amount by which a loss above $d$ exceeds it. It is constant for the exponential and rises in a straight line for the Pareto. At large thresholds the lognormal's mean excess loss rises too, but more slowly than a straight line, and its [[Hazard Rate|hazard rate]] rises at first and then falls toward 0.

## Scaling and inflation

Each distribution in the table has a scale parameter $\theta$, or $e^\mu$ for the lognormal. Multiplying the losses by a constant $c$ keeps the family and multiplies the scale parameter by $c$. If losses inflate at the rate $r$, the scale parameter becomes

> $$\theta' = (1 + r)\,\theta$$

> [!example]- Losses are exponential with mean 1,000 and inflate by 10%. What is the probability that an inflated loss exceeds 2,000? {Example}
> - The inflated losses are exponential with mean $1.1 \times 1{,}000 = 1{,}100$.
> - The probability is $e^{-2{,}000/1{,}100} = 0.1623$.

## Fitting to data truncated by a deductible

Losses at or below a deductible $d$ are not reported, so the data are [[Truncation|truncated]] at $d$. Each reported loss $x_i$ enters the [[Maximum Likelihood Estimation|likelihood]] as its density given that it exceeds $d$:

> $$L(\theta) = \prod_{i=1}^{n} \frac{f(x_i)}{S(d)}$$

A loss [[Censoring|censored]] at a policy limit $u$ enters the likelihood as $S(u)$.

> [!example]- Four losses are reported under a deductible of 1,000, with ground-up sizes 1,500, 2,500, 4,000 and 7,000. What is the maximum likelihood estimate of the mean of an exponential severity distribution? {Example}
> - Each term of the likelihood is $\frac{\theta^{-1}e^{-x_i/\theta}}{e^{-1{,}000/\theta}} = \theta^{-1}e^{-(x_i - 1{,}000)/\theta}$.
> - The amounts above the deductible add to $500 + 1{,}500 + 3{,}000 + 6{,}000 = 11{,}000$, so $L(\theta) = \theta^{-4}e^{-11{,}000/\theta}$.
> - Setting the derivative of $\ln L(\theta) = -4\ln\theta - 11{,}000/\theta$ to zero gives $\hat{\theta} = 11{,}000/4 = 2{,}750$.

## Exposure curves

For property risks the loss is expressed as a fraction $X$ of the risk's maximum possible loss (MPL), so $0 \le X \le 1$. The [[Exposure Curves|exposure curve]] gives the proportion of the expected loss below a retention $d$, as a fraction of the MPL:

> $$G(d) = \frac{E[X \wedge d]}{E[X]}$$

$G$ rises from $G(0) = 0$ to $G(1) = 1$, and it is increasing and concave. The curve and the distribution determine each other: $E[X] = 1/G'(0)$ and $S(d) = G'(d)/G'(0)$ for $d < 1$. A cedant with retention $R$ on a risk with MPL $M$ keeps the share $G(R/M)$ of the expected loss. Using one curve for risks of different sizes assumes that the loss as a fraction of the MPL does not depend on the size of the risk.

Bernegger's MBBEFD class gives exposure curves in closed form:

> $$G(x) = \frac{\ln\left[\frac{(g - 1)b + (1 - gb)\,b^x}{1 - b}\right]}{\ln(gb)}$$

- $b$ and $g$ are the parameters of the curve, with $g$ the reciprocal of the probability of a total loss.

> [!example]- For a class of property risks, the loss as a fraction of MPL has survival function $S(x) = (1 - x)^3$ on $[0, 1]$. A risk has an MPL of 10,000,000 and an expected loss of 30,000. What is the expected loss in the layer of 3,000,000 in excess of 2,000,000? {Example}
> - The limited expected value is $E[X \wedge d] = \int_0^d (1 - x)^3\,dx = \frac{1 - (1 - d)^4}{4}$, and $E[X] = \frac{1}{4}$.
> - The exposure curve is $G(d) = 1 - (1 - d)^4$.
> - The layer runs from 0.2 to 0.5 of the MPL, and $G(0.5) - G(0.2) = 0.9375 - 0.5904 = 0.3471$.
> - The expected loss in the layer is $0.3471 \times 30{,}000 = 10{,}413$.

> [!trap] Fitting truncated data as if it were ground-up
> Ignoring the deductible treats the reported losses as a sample from the whole distribution. In the fitting example, the sample mean of the ground-up sizes gives $\hat{\theta} = 15{,}000/4 = 3{,}750$, which overstates the mean by 36%.
