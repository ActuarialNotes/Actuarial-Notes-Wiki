---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e2f39341cec296b4c0be73969f42284378abacb3c2f25182d8178b44c1b7e99c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expected Value of Process Variance.md
---

The **expected value of the process variance (EPV)**, written $v$, is the average within-risk variance in a [[Bühlmann Credibility]] model — how noisy a single risk's own experience is, averaged over the population of risks.

> $$v = \mathrm{EPV} = E_\Theta\!\left[\mathrm{Var}(X \mid \Theta)\right]$$

- $\Theta$ is the unobserved **risk parameter**; conditioning on it removes the between-risk differences and leaves only process noise
- Together with the [[Variance of Hypothetical Means]] $a$ it fixes the Bühlmann constant $k = v/a$ and hence $Z = n/(n+k)$
- **Large $v$** means one risk's own data is unreliable, so $Z$ falls and the estimate leans on the manual rate
- The total variance splits into the two pieces: $\mathrm{Var}(X) = v + a$ — the conditional-variance decomposition
- Estimated from data by [[Empirical Bayes Credibility|empirical Bayes]] as the pooled within-risk sample variance

![[Media/Figures/Expected_Value_of_Process_Variance.svg|340]]

> [!example]- EPV from a Two-Type Portfolio {Example}
> Half the policyholders are **good** drivers with Poisson claim frequency $\lambda = 0.10$; half are **bad** with $\lambda = 0.40$. Find the EPV.
>
> > [!answer]-
> > For a Poisson risk, $\mathrm{Var}(X \mid \Theta) = \lambda$, so
> > $$v = E[\lambda] = 0.5(0.10) + 0.5(0.40) = 0.25$$
> > Note $a = \mathrm{Var}(\lambda) = 0.5(0.10 - 0.25)^2 + 0.5(0.40 - 0.25)^2 = 0.0225$, so $k = v/a = 0.25/0.0225 = 11.1$ — it takes about 11 years of experience for a driver to earn 50% credibility.
