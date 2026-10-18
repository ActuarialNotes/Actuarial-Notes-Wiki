---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:be6eb1784720a604d67df2b2449a39d849a40ba081c315df9a71d976023c1de1
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Frees et al., Loss Data Analytics (open text), Appendix B, §16.3 Conjugate Distributions, sha256:66a757e0d3dfdac6e4196cd9458ad437bb4ea690dca28797e4c1fe403c5f9e92 — https://openacttexts.github.io/Loss-Data-Analytics/CAppB.html"
    - "Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exact Credibility.md
---

**Exact credibility** is the case in which the [[Bühlmann Credibility|Bühlmann]] credibility estimate equals the [[Bayesian Credibility|Bayesian premium]] $E[\mu(\Theta) \mid \mathbf{X}]$ exactly, not approximately. It happens precisely when the Bayesian premium is itself linear in the observations, which is guaranteed when the model distribution belongs to the linear exponential family and the prior is its natural [[Conjugate Prior|conjugate prior]].

> $$E[\mu(\Theta) \mid \mathbf{X}] = Z\bar{X} + (1 - Z)\,\mu$$
>
> $$Z = \frac{n}{n + v/a}$$

- $\mu = E[\mu(\Theta)]$ is the collective mean, $v$ the [[Expected Value of Process Variance|EPV]] and $a$ the [[Variance of Hypothetical Means|VHM]], so $v/a$ is the Bühlmann $k$.
- **Why linearity is the whole story.** The Bühlmann estimate minimises $E\big[(\mu(\Theta) - \alpha_0 - \sum_j \alpha_j X_j)^2\big]$ over *linear* functions of the data. The Bayesian premium minimises the same expected squared error over *all* functions. If the Bayesian premium happens to be linear, it is in the smaller class and must be the Bühlmann optimum. Otherwise Bühlmann is the best linear approximation to it.
- **The sufficient condition.** Take a model of the form $f(x \mid \theta) = p(x)e^{r(\theta)x}/q(\theta)$. This covers the Poisson, binomial, negative binomial, normal with known variance, exponential, and gamma with known shape. Pair it with its natural conjugate prior (subject to a mild condition on the prior's tails). The posterior is then in the prior's family, its mean is linear in $\bar{X}$, and a prior parameter plays the role of $k$.
- **The pairs to know**, with $k = v/a$:
  - Poisson$(\Lambda)$ with $\Lambda \sim$ gamma($\alpha$, scale $\beta$): $k = 1/\beta$
  - Bernoulli$(Q)$ with $Q \sim$ beta$(a, b)$: $k = a + b$
  - Normal$(\Theta, \sigma^2)$ with $\Theta \sim$ normal$(\mu, \tau^2)$: $k = \sigma^2/\tau^2$
  - Exponential with mean $\Theta$, $\Theta \sim$ inverse gamma$(\alpha, \beta)$: $k = \alpha - 1$
- **How it is examined.** Recognise a conjugate pair and take the shortcut: read $k$ from the prior and skip the [[Posterior Distribution|posterior]] algebra. Or, given a discrete prior or a uniform prior on a Poisson mean, compute the two estimates separately, because they will differ.
- The normal–normal case reappears in mixed models: with known [[Variance Components|variance components]], the [[Best Linear Unbiased Predictor|BLUP]] of a normal random effect is its posterior mean, which is credibility-weighted for exactly this reason.

> [!example]- Severity Credibility with an Inverse Gamma Prior {Example}
> A risk's claim sizes are exponential with mean $\Theta$. Across the portfolio, $\Theta$ is inverse gamma with $\alpha = 3$ and $\beta = 2{,}000$, so $E[\Theta] = \beta/(\alpha - 1) = 1{,}000$. The risk has $4$ claims totalling $\$6{,}000$. Compute the Bayesian premium and the Bühlmann estimate.
>
> > [!answer]-
> > **Bayes.** The posterior is inverse gamma$(\alpha + n, \beta + \sum x_i) = (7,\ 8{,}000)$:
> > $$
> > \begin{align*}
> > E[\Theta \mid \mathbf{x}] &= \frac{8{,}000}{7 - 1} \\
> > &= 1{,}333.33
> > \end{align*}
> > $$
> > **Bühlmann.** Here $\mu(\Theta) = \Theta$ and $\sigma^2(\Theta) = \Theta^2$. For the inverse gamma, $E[\Theta^2] = \beta^2/[(\alpha-1)(\alpha-2)] = 2{,}000{,}000$:
> > $$
> > \begin{align*}
> > v &= E[\Theta^2] \\
> > &= 2{,}000{,}000 \\
> > a &= E[\Theta^2] - E[\Theta]^2 \\
> > &= 1{,}000{,}000 \\
> > Z &= \frac{4}{4 + 2} \\
> > &= \frac{2}{3} \\
> > \hat{\mu} &= \tfrac{2}{3}(1{,}500) + \tfrac{1}{3}(1{,}000) \\
> > &= 1{,}333.33
> > \end{align*}
> > $$
> > The two agree exactly, and $k = \alpha - 1 = 2$ could have been read straight off the prior.

> [!example]- When They Do Not Coincide: A Two-Point Prior {Example}
> Drivers are $75\%$ good (Poisson mean $0.2$) and $25\%$ bad (Poisson mean $0.6$). The Bayesian premiums after one year with $0$, $1$ and $2$ claims are $0.2731$, $0.3605$ and $0.4672$. Compute the Bühlmann estimates and explain the difference.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mu &= 0.75(0.2) + 0.25(0.6) \\
> > &= 0.30 \\
> > v &= E[\Lambda] \\
> > &= 0.30 \\
> > a &= 0.75(0.04) + 0.25(0.36) - 0.30^2 \\
> > &= 0.03 \\
> > Z &= \frac{1}{1 + 0.30/0.03} \\
> > &= \frac{1}{11}
> > \end{align*}
> > $$
> > The Bühlmann estimate is $\frac{1}{11}N + \frac{10}{11}(0.30)$, giving $0.2727$, $0.3636$ and $0.4545$ for $N = 0, 1, 2$.
> >
> > Bühlmann rises by the same $0.0909$ per claim. The Bayesian premium rises by about $0.087$, then by about $0.107$. It is **not linear** in $N$, because a two-point prior is not conjugate to the Poisson, so no straight line can match it. Bühlmann is the best straight-line fit to it, close but not exact.
