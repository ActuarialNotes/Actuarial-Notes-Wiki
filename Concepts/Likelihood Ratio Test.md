---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:d64ddd90e13f9afe5f37ecc04387d21aa2c0364b0f5293dd03b17ee52d84356b
  sources:
    - "Rodriguez, Generalized Linear Models (Princeton lecture notes), Appendix B §B.3.2 pp.6-7, eqs (B.11)-(B.13): -2 log lambda = D/phi (scaled deviance), nested models -2 log lambda = [D(omega1) - D(omega2)]/phi, phi known or estimated from the larger model, asymptotically chi^2 with p2 - p1 df; normal linear model: exact F(p2 - p1, n - p2); binomial/Poisson phi = 1, deviance = scaled deviance, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, Generalized Linear Models, Appendix A §A.2 pp.5-9: -2 log lambda -> chi^2 with nu = dim difference under regularity conditions; Wald, score and LR tests asymptotically equivalent, 'small-sample properties are not known, but some simulation studies suggest that the likelihood ratio test may be better', sha256:bfcc766141f43095433287dcc61f127df49103be1dd31d71454c56aa6ed8f8a6 — https://grodri.github.io/glms/notes/a1.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 rev.), §6.1.3 and §6.2.1 eq.17, PDF pp.74-75: comparisons need identical data; F = (D_S - D_B)/(# added parameters x phi-hat_B) with D the unscaled deviance, F on (# added parameters, n - p_B) df, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Balakrishnan, CMU 36-705 Intermediate Statistics (Fall 2019), Lecture 21: generalized LRT, Wilks' phenomenon, -2 log lambda -> chi^2_nu with nu = dim(Theta) - dim(Theta0); Neyman-Pearson test optimal for simple vs simple, sha256:957e7c52577a6b3f0472bbcc14611653b64b7a934f07c5270e05228561c4df21 — https://www.stat.cmu.edu/~siva/teaching/705/lec21.pdf"
    - "NIST/SEMATECH e-Handbook §8.2.3.3 Likelihood ratio tests: restricted vs unrestricted (nested) models, -2 ln lambda approximately chi-square with df = number of parameters lost, sha256:b98f507c243e5f762477ab0311358633217b98a11251c19faf056044c3b4749b — https://www.itl.nist.gov/div898/handbook/apr/section2/apr233.htm"
    - "Siegrist, Random, ch.8 §5 Likelihood Ratio Tests: Neyman-Pearson lemma (most powerful, simple vs simple) and generalized likelihood ratio, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), 'Lower-tail areas for Chi-square distributions' p.20 (0.950 column: df 1 = 3.84, df 2 = 5.99), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Likelihood Ratio Test.md
---

A **Likelihood Ratio Test** (LRT) compares two nested models by how much better the larger one fits: it takes the ratio of maximized likelihoods and rejects the restricted model when the ratio is too small. It is the general-purpose test behind the analysis of [[Deviance]] used to compare [[Generalized Linear Model]]s.

> $$\Lambda = \frac{\sup_{\theta \in \Theta_0} L(\theta)}{\sup_{\theta \in \Theta} L(\theta)}$$

> $$-2\ln\Lambda = 2\left[\ell(\hat\theta) - \ell(\hat\theta_0)\right] \ \dot\sim\ \chi^2_{r}$$

- $r$ is the number of **restrictions** — the difference in free parameters between the full and reduced models — and the $\chi^2$ approximation is asymptotic (Wilks' theorem)
- Reject $H_0$ (the reduced model) when $-2\ln\Lambda$ exceeds the upper-$\alpha$ point of $\chi^2_r$ (at $\alpha = 0.05$, the $0.950$ column of the CAS MAS-I table, which gives lower-tail areas): a large value means the extra parameters bought a real improvement in fit
- For a GLM this statistic is the **difference in deviances divided by the dispersion**, $-2\ln\Lambda = (D_{\text{reduced}} - D_{\text{full}})/\phi$, with $D$ the unscaled deviance and $\phi$ the [[Dispersion Parameter]] (equivalently, the difference in scaled deviances). That is why the analysis of deviance table is an LRT in disguise. For Poisson and binomial models $\phi = 1$ and the statistic is the deviance difference $\Delta D$ itself
- Models must be **nested** and fitted to the *same* data; comparing non-nested models needs [[AIC]] or [[BIC]] instead
- By the **Neyman–Pearson lemma** the LRT is the most powerful test of a simple null against a simple alternative — it maximizes the [[Power of a Test|power]] at any given level $\alpha$
- The Wald test (coefficient over its standard error, as printed in [[Parameter Estimate Tables]]) and the score test are asymptotically equivalent to the LRT. Their small-sample properties are not known, though some simulation studies suggest the LRT may do better than the other two in small samples
- When $\phi$ is unknown, estimate it from the full model and use the $F$ form $F = \dfrac{(D_{\text{reduced}} - D_{\text{full}})/r}{\hat\phi_{\text{full}}}$, built from the *unscaled* deviances, on $(r,\ n - p_{\text{full}})$ degrees of freedom. For a normal linear model the deviances are residual sums of squares and this $F$ is exact

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
> > $3.6 < 3.84$, so **fail to reject** — the exponential is an adequate simplification of the Gamma here. The call is close: the statistic depends only on the log-likelihood gap, not on $n$, and a gap above $3.84/2 = 1.92$ would have rejected.
