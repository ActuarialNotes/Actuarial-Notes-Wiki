---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:135dc9b6c6960374d483c63c64911851dcd326c9b007af184f06e1fb08285144
  sources:
    - "Balakrishnan, CMU 36-705 Intermediate Statistics (Fall 2019), Lecture 21 §21.2: generalized LRT lambda = sup_{Theta0} L / sup_{Theta} L, reject when lambda <= c; 'Wilks' phenomenon'; under H0 and conditions -2 log lambda -> chi^2_nu with nu = dim(Theta) - dim(Theta0); the Neyman-Pearson test is optimal for simple vs simple, sha256:957e7c52577a6b3f0472bbcc14611653b64b7a934f07c5270e05228561c4df21 — https://www.stat.cmu.edu/~siva/teaching/705/lec21.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods §8.2.3.3 Likelihood ratio tests: lambda = L0/L1 for nested restricted/unrestricted models, chi^2 = -2 ln lambda approximately chi-square with k degrees of freedom, k = number of parameters lost (e.g. exponential as a Weibull special case), sha256:b98f507c243e5f762477ab0311358633217b98a11251c19faf056044c3b4749b — https://www.itl.nist.gov/div898/handbook/apr/section2/apr233.htm"
    - "Rodriguez, Generalized Linear Models (Princeton lecture notes), Appendix A §A.2 pp.5-9: nested models omega1 in omega2, eq (A.27) -2 log lambda -> chi^2_nu with nu = dim(omega2) - dim(omega1) 'under certain regularity conditions'; Wald, score and LR tests asymptotically equivalent, sha256:bfcc766141f43095433287dcc61f127df49103be1dd31d71454c56aa6ed8f8a6 — https://grodri.github.io/glms/notes/a1.pdf"
    - "Rodriguez, Generalized Linear Models, Appendix B §B.3.2 pp.6-7, eqs (B.11)-(B.13): -2 log lambda = [D(omega1) - D(omega2)]/phi, equal to the deviance difference when phi = 1 (binomial, Poisson), F with (p2 - p1, n - p2) df under normality with phi estimated from the larger model, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Siegrist, Random, ch.8 §5 Likelihood Ratio Tests: Neyman-Pearson lemma (likelihood-ratio region most powerful among regions of no greater size, simple vs simple) and the generalized likelihood ratio for composite hypotheses, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), chi-square lower-tail table p.20 (0.950 column: df 1 = 3.84, df 2 = 5.99), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 3
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
