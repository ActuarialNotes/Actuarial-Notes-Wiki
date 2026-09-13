---
target: Concepts/Generalized Linear Model.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: medium
- checks_run: Werner p.177 confirms the three-component definition the page gives: GLMs remove the normality and constant-variance restrictions, a link function relates the expected response to the linear combination of predictors, the modeller specifies a distribution 'typically a member of the exponential family (e.g., normal, Poisson, gamma, binomial, inverse Gaussian)' by its mean and its variance as a function of the mean, and 'the maximum likelihood approach then maximizes the logarithm of the likelihood function' -- so exponential family, link, linear predictor and MLE-not-OLS are all sourced. Also confirmed there: the log link makes the rating variables multiplicative and GLM output is 'a series of multipliers' usable directly in a rating algorithm (p.176); modelling frequency and severity separately rather than loss ratios, with reasons (p.177); Tweedie as 'a special extension of the exponential family' (p.177 fn.33); results are 'net of' the other variables and only valid with them in the model (p.179); diagnostics -- standard errors, deviance for nested models, AIC and BIC for non-nested, consistency over time, hold-out validation (pp.179-181). Recomputed both examples independently: ln(mu) = -2.1 + 0.04(30) = -0.9, e^-0.9 = 0.4066 -> 0.407 claims/yr; e^0.1823 = 1.2000, e^0.0488 = 1.0500, product 1.2600; e^0.4055 = 1.5000, e^0.1310 = 1.1400, product 1.7100; and e^(0.4055+0.1310) = e^0.5365 = 1.7100 -- every figure on the page reproduces, including the +50%/+14% split. Medium rather than high because two page claims sit outside this source: the canonical-link table (identity/log/logit/reciprocal -- standard GLM theory, but Werner names only the log link) and the exposure offset / claim-count weights, which Werner explicitly puts 'beyond the scope of this text' (p.177). Both are correct as stated; they are simply not confirmable here. LaTeX balanced, links and embed resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.10 'Multivariate Classification', printed pp.176-181 (PDF pp.188-193), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
