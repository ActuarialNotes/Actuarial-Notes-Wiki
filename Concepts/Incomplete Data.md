---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:7175e0bff1bf528ba0c3906f8249876688b8a97ba5b480c297456f1af4c22bac
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

**Incomplete data** are observations whose values are only partly known — [[Censoring|censored]] (known only to lie in a range) or [[Truncation|truncated]] (never recorded at all outside a range). Insurance data are incomplete by design, because deductibles and policy limits decide which losses are seen and how exactly. Estimation must model this through the [[Maximum Likelihood Estimation|likelihood]] rather than treat what was recorded as a complete sample.

> $$L(\theta) = \prod_{i=1}^{n} \frac{f(x_i \mid \theta)^{\delta_i}\; S(x_i \mid \theta)^{1-\delta_i}}{S(d_i \mid \theta)}$$

- $\delta_i = 1$ if $x_i$ is an exact value and $0$ if it is right-censored at $x_i$ (the loss is known only to be at least $x_i$). $d_i$ is the left-truncation point, such as the deductible; with no truncation $S(d_i) = S(0) = 1$. $S = 1 - F$ is the survival function.
- **Right censoring.** A loss at or above the maximum covered loss is recorded only as "at least $u$", so it contributes $S(u)$. Treating it as exactly $u$ biases severity estimates *down*.
- **Left truncation.** Losses below a deductible $d$ are never reported, so each reported loss is drawn from $X \mid X > d$ and contributes $f(x)/S(d)$. Ignoring this biases the average of the reported losses *up*, since it estimates $E[X \mid X > d]$ rather than $E[X]$ (only the larger losses are seen). A distribution fitted without the adjustment can err in either direction ([[Truncation]]).
- **Grouped (interval) data** are censored on both sides: a value known only to lie in $(a, b]$ contributes $F(b) - F(a)$.
- **Exponential shortcut.** For an [[Exponential Distribution|exponential]] model with any mix of truncation and right censoring, $\hat\theta = \dfrac{\sum_i (x_i - d_i)}{\text{number of exact observations}}$, summing over *all* observations, censored ones included.
- The same adjustments carry over to non-parametric estimates of the survival function, such as the Kaplan–Meier product-limit estimator. They matter again when fitting the [[Severity|severity]] distribution behind [[Coverage Modifications|coverage modifications]].

> [!example]- Fitting Ground-Up Severity From Payment Data {Example}
> A policy has an ordinary deductible of 500 and a maximum covered loss of 5,000. The insurer's records show five claims with ground-up losses of 1,000, 2,000 and 3,500, plus two claims paid at the limit (losses of at least 5,000). Assuming ground-up losses are exponential, find the MLE of $\theta$.
>
> > [!answer]-
> > Every observation is truncated at $d = 500$. The two limit claims are right-censored at 5,000:
> >
> > $$
> > \begin{align*}
> > L(\theta) &= \frac{f(1000)\,f(2000)\,f(3500)\,S(5000)^2}{S(500)^5} \\
> > &= \theta^{-3}\,e^{-(500 + 1500 + 3000 + 4500 + 4500)/\theta} \\
> > &= \theta^{-3}\,e^{-14{,}000/\theta}
> > \end{align*}
> > $$
> >
> > Setting $\frac{d}{d\theta}\ln L = -\frac{3}{\theta} + \frac{14{,}000}{\theta^2} = 0$:
> >
> > $$
> > \begin{align*}
> > \hat\theta &= \frac{14{,}000}{3} \\
> > &= 4{,}666.67
> > \end{align*}
> > $$
> >
> > Treating the two limit claims as exact losses of 5,000 would divide by 5 and give $2{,}800$ — understating mean severity by 40%.

> [!example]- MLE From Grouped Claim Sizes {Example}
> Of 100 claims, 60 were below 1,000, 30 were between 1,000 and 3,000, and 10 exceeded 3,000. Fit an exponential distribution by maximum likelihood.
>
> > [!answer]-
> > Let $p = e^{-1000/\theta}$, so $S(1000) = p$ and $S(3000) = p^3$. Each group contributes its interval probability:
> >
> > $$
> > \begin{align*}
> > L &= (1-p)^{60}\,(p - p^3)^{30}\,(p^3)^{10} \\
> > &= p^{60}\,(1-p)^{90}\,(1+p)^{30}
> > \end{align*}
> > $$
> >
> > Differentiate $\ln L$ with respect to $p$ and clear denominators:
> >
> > $$
> > \begin{align*}
> > \frac{60}{p} - \frac{90}{1-p} + \frac{30}{1+p} &= 0 \\
> > 3p^2 + p - 1 &= 0 \\
> > p &= \frac{-1 + \sqrt{13}}{6} \\
> > &= 0.43426
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \hat\theta &= \frac{-1000}{\ln 0.43426} \\
> > &= 1{,}198.9
> > \end{align*}
> > $$
> >
> > The fitted mean claim size is about 1,199, using only the counts in each size band.
