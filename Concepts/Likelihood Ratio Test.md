---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:135dc9b6c6960374d483c63c64911851dcd326c9b007af184f06e1fb08285144
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Likelihood Ratio Test.md
---

A **Likelihood Ratio Test** (LRT) compares two nested models by how much better the larger one fits: it takes the ratio of maximized likelihoods and rejects the restricted model when the ratio is too small. It is the general-purpose test behind the analysis of [[Deviance]] used to compare [[Generalized Linear Model]]s.

> $$\Lambda = \frac{\sup_{\theta \in \Theta_0} L(\theta)}{\sup_{\theta \in \Theta} L(\theta)}$$

> $$-2\ln\Lambda = 2\left[\ell(\hat\theta) - \ell(\hat\theta_0)\right] \ \dot\sim\ \chi^2_{r}$$

- $r$ is the number of **restrictions** — the difference in free parameters between the full and reduced models — and the $\chi^2$ approximation is asymptotic (Wilks' theorem)
- Reject $H_0$ (the reduced model) when $-2\ln\Lambda$ exceeds the $\chi^2_r$ critical value: a large value means the extra parameters bought a real improvement in fit
- For a GLM this statistic is exactly the **difference in deviances**, $\Delta D = D_{\text{reduced}} - D_{\text{full}}$, which is why the analysis of deviance table is an LRT in disguise
- Models must be **nested** and fitted to the *same* data; comparing non-nested models needs [[AIC]] or [[BIC]] instead
- By the **Neyman–Pearson lemma** the LRT is the most powerful test of a simple null against a simple alternative — it maximizes the [[Power of a Test|power]] at any given level $\alpha$
- The Wald test (coefficient over its standard error, as printed in [[Parameter Estimate Tables]]) and the score test are asymptotically equivalent to the LRT, but the LRT is generally the most reliable in small samples
- For a scaled deviance with unknown dispersion, use the $F$ form $\frac{\Delta D / r}{\hat\phi}$ rather than $\chi^2$

![[Media/Figures/Likelihood_Ratio_Test.svg|340]]

> [!example]- Testing a Group of Predictors {Example}
> A Poisson GLM with $4$ parameters has log-likelihood $\ell = -412.6$. Adding a 3-level territory variable (2 extra parameters) gives $\ell = -407.1$. Test at $\alpha = 0.05$ whether territory belongs in the model, given $\chi^2_{0.05, 2} = 5.99$.
>
> > [!answer]-
> > $$-2\ln\Lambda = 2\left[-407.1 - (-412.6)\right] = 2(5.5) = 11.0$$
> > Since $11.0 > 5.99$, **reject** the reduced model — territory significantly improves the fit. Equivalently, the deviance drops by $11.0$ on $2$ degrees of freedom.

> [!example]- Comparing an Exponential to a Gamma Fit {Example}
> A Gamma model fitted to $n = 300$ claim sizes has $\ell = -2{,}401.2$; the exponential special case ($\alpha = 1$) has $\ell = -2{,}403.0$. Does the extra shape parameter earn its place at $\alpha = 0.05$?
>
> > [!answer]-
> > One restriction, so compare with $\chi^2_{0.05,1} = 3.84$:
> > $$-2\ln\Lambda = 2\left[-2{,}401.2 + 2{,}403.0\right] = 3.6$$
> > $3.6 < 3.84$, so **fail to reject** — the exponential is an adequate simplification of the Gamma here. Note how close the call is: a slightly larger sample with the same fit difference would flip it.
