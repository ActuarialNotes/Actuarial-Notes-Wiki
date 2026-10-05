---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:b738174ce522d0e1d7817a1bb3b8d6ec9c33a0a347636e87bf9685469298b974
  sources:
    - "Frees et al., Loss Data Analytics (open text), ch.10: §10.2.1 Definition 10.1 classification by moments (Examples 10.2.1-10.2.3: gamma and Weibull light, Pareto k* = alpha, heavier as alpha falls; lognormal has all moments but no MGF, so methods can disagree), §10.2.2 Definition 10.2 limiting ratio (infinity heavier, constant proportionally equivalent, 0 lighter) and density form by L'Hopital's rule, Pareto heavier than Weibull and gamma; eq. 10.7 TVaR = pi_q + e_X(pi_q) = pi_q + (E[X] - E[X ^ pi_q])/(1 - q); Example 10.3.9 Pareto TVaR = pi_q + (pi_q + theta)/(alpha - 1), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html"
    - "Frees et al., Loss Data Analytics (open text), ch.3: §3.2.2 Pareto (k-th moment exists iff alpha > k; hazard decreasing, an indication of a heavy tail); §3.2.3 Weibull (hazard decreasing for shape < 1, constant at 1, increasing for > 1); §3.4.1 deductible example (excess loss of an exponential with mean 1000 is exponential with the same mean, by memorylessness), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Tse §2.4 assigned, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents (PDF p.10): §2.4 Tail properties of claim severity (contents only), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tail Weight.md
---

**Tail Weight** describes how much probability a [[Severity Distribution|severity distribution]] puts on very large losses — how slowly its survival function $S(x) = 1 - F(x)$ falls to 0. A **heavy-tailed** distribution such as the [[Pareto Distribution|Pareto]] makes extreme claims far more likely than a **light-tailed** one such as the [[Gamma|gamma]], and distributions are compared by four related measures.

> $$\lim_{x \to \infty} \frac{S_X(x)}{S_Y(x)} = \lim_{x \to \infty} \frac{f_X(x)}{f_Y(x)}$$

> $$e(d) = E[X - d \mid X > d]$$

- **Limiting ratio.** If the limit is $\infty$, $X$ has the heavier right tail; if it is a positive constant, the tails are proportionally equivalent; if it is $0$, $X$ is lighter. The density form follows from L'Hôpital's rule and helps when $S$ has no closed form.
- **Existence of moments.** The fewer positive moments $E[X^k]$ are finite, the heavier the tail. Gamma and [[Weibull Distribution|Weibull]] have all moments (light); the Pareto has $E[X^k] < \infty$ only for $k < \alpha$ (heavy, heavier as $\alpha$ falls). The [[Lognormal Distribution|lognormal]] has every moment but no moment generating function, so the moment test and the MGF test can disagree.
- **[[Hazard Rate]].** A decreasing hazard rate $h(x) = f(x)/S(x)$ signals a heavy tail and an increasing one a light tail. The Pareto's hazard decreases; the Weibull's decreases for $\tau < 1$, is constant for $\tau = 1$ (the [[Exponential Distribution|exponential]]) and increases for $\tau > 1$.
- **Mean excess loss** $e(d)$, the average amount by which losses exceeding $d$ exceed it, is constant for the exponential — by memorylessness, the excess over any $d$ is exponential with the same mean — but rises linearly in $d$ for the Pareto, $e(d) = (d + \theta)/(\alpha - 1)$ when $\alpha > 1$: the larger a Pareto loss already is, the larger its expected excess. It also prices an [[Excess of Loss|excess layer]]: the expected loss above a retention $R$ is $E[(X - R)_+] = S(R)\,e(R)$.

> [!example]- Pareto Versus Exponential at the Extreme {Example}
> Losses are modelled either as exponential with mean 1,000 or as Pareto with $\alpha = 3$, $\theta = 2{,}000$ (also mean 1,000). Compare $P(X > 10{,}000)$ under each model, decide which tail is heavier, and say which moments of the Pareto exist.
>
> > [!answer]-
> >
> > $$
> > \begin{align*}
> > S_{\text{Par}}(10{,}000) &= \left(\frac{2{,}000}{12{,}000}\right)^{3} \\
> >   &= 0.00463 \\
> > S_{\text{Exp}}(10{,}000) &= e^{-10} \\
> >   &= 0.0000454
> > \end{align*}
> > $$
> >
> > With the same mean, the Pareto makes a \$10,000 loss about 100 times as likely. In the limit, $S_{\text{Par}}(x)/S_{\text{Exp}}(x) = (2{,}000)^3 e^{x/1{,}000}/(x + 2{,}000)^3 \to \infty$, because an exponential grows faster than any polynomial, so the Pareto's tail is heavier. Its moments exist only for $k < 3$: the mean and variance are finite, $E[X^3]$ is not, while the exponential has all its moments.

> [!example]- Hazard Rate and Mean Excess Loss of a Pareto {Example}
> For the Pareto with $\alpha = 3$, $\theta = 2{,}000$, find the hazard rate and the mean excess loss at $d = 0$, $1{,}000$ and $10{,}000$.
>
> > [!answer]-
> > From $f(x) = \alpha\theta^{\alpha}/(x+\theta)^{\alpha+1}$ and $S(x) = \theta^{\alpha}/(x+\theta)^{\alpha}$:
> >
> > $$
> > \begin{align*}
> > h(x) &= \frac{f(x)}{S(x)} \\
> >   &= \frac{\alpha}{x + \theta}
> > \end{align*}
> > $$
> >
> > Losses above $d$ are again Pareto, shifted to start at $d$ with scale $d + \theta$, so
> >
> > $$
> > \begin{align*}
> > e(d) &= \frac{d + \theta}{\alpha - 1} \\
> >   &= \frac{d + 2{,}000}{2}
> > \end{align*}
> > $$
> >
> > | $d$ | $h(d)$ | $e(d)$ |
> > | :---: | :---: | :---: |
> > | 0 | 0.00150 | 1,000 |
> > | 1,000 | 0.00100 | 1,500 |
> > | 10,000 | 0.00025 | 6,000 |
> >
> > The hazard falls and the mean excess climbs linearly — both signatures of a heavy tail. An exponential with mean 1,000 would have constant $h = 0.001$ and constant $e(d) = 1{,}000$.
