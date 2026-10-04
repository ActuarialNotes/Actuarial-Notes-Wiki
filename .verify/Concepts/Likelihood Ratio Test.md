---
target: Concepts/Likelihood Ratio Test.md
created: 2026-10-04
---

## [F-001] Deviance identity drops the dispersion parameter
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullets lines 22 and 26 (GLM deviance difference; F form)
- claim: 'For a GLM this statistic is exactly the difference in deviances, Delta D = D_reduced - D_full' and 'For a scaled deviance with unknown dispersion, use the F form (Delta D / r)/phi-hat rather than chi^2'.
- evidence: Rodriguez, Generalized Linear Models (Princeton lecture notes), Appendix B §B.3.2, eqs (B.11)-(B.13), p.6-7 (grodri.github.io/glms/notes/a2.pdf, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286): -2 log lambda = D(y, mu-hat)/phi, 'the likelihood ratio criterion is the deviance divided by the scale parameter phi, and is called the scaled deviance', and for nested models -2 log lambda = [D(omega1) - D(omega2)]/phi; only for binomial and Poisson (phi = 1) 'the deviance is the same as the scaled deviance'. With phi estimated from the larger model the criterion is approximately chi^2, and under normality dividing by p2 - p1 gives an exact F(p2 - p1, n - p2). The vault's own Concepts/Deviance.md uses the same unscaled convention (D = RSS for a normal model, scaled D* = D/phi). So the 'exactly' statement holds for the page's Poisson example but not for a gamma or normal GLM, where -2 ln Lambda = Delta D / phi; and the F form uses the unscaled deviances divided by phi-hat, which 'a scaled deviance with unknown dispersion' misdescribes (a scaled deviance cannot be computed when phi is unknown). Dobson & Barnett ch.5 (the MAS-I reading) was not read - only its preview (front matter to §2.2) is freely available - so its own deviance definition could not be checked.
- source_rank: 3
- proposed_action: Write the identity as -2 ln Lambda = (D_reduced - D_full)/phi, equal to Delta D when phi = 1 (Poisson, binomial), and describe the F form as using unscaled deviances with phi-hat from the full model, F on (r, n - p_full) df. Not applied: needs new wording.
- applied: false
- fingerprint: f0fe68c4fd27
