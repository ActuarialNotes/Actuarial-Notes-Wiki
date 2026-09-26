---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f7431ccd3b02db6065ed88e1416bc2a950382d5a1f12e29729354f931e7e377f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Incomplete Data.md
---

**Incomplete data** are observations whose values are only partly known — [[Censoring|censored]] (known only to lie in a range) or [[Truncation|truncated]] (never recorded at all outside a range). Insurance data are incomplete by design, because deductibles and policy limits decide which losses are seen and how exactly. Estimation must model this through the [[Maximum Likelihood Estimation|likelihood]] rather than treat what was recorded as a complete sample.

> $$L(\theta) = \prod_{i=1}^{n} \frac{f(x_i \mid \theta)^{\delta_i}\; S(x_i \mid \theta)^{1-\delta_i}}{S(d_i \mid \theta)}$$

- $\delta_i = 1$ if $x_i$ is an exact value and $0$ if it is right-censored at $x_i$ (the loss is known only to be at least $x_i$). $d_i$ is the left-truncation point, such as the deductible; with no truncation $S(d_i) = S(0) = 1$. $S = 1 - F$ is the survival function.
- **Right censoring.** A loss at or above the maximum covered loss is recorded only as "at least $u$", so it contributes $S(u)$. Treating it as exactly $u$ biases severity estimates *down*.
- **Left truncation.** Losses below a deductible $d$ are never reported, so each reported loss is drawn from $X \mid X > d$ and contributes $f(x)/S(d)$. Ignoring this biases estimates *up* — only the larger losses are seen.
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
