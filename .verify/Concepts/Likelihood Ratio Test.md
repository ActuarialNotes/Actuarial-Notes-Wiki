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

## [F-002] Small-sample superiority of the LRT stated more firmly than the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet line 25 (Wald and score tests)
- claim: '... the LRT is generally the most reliable in small samples'.
- evidence: Rodriguez, Generalized Linear Models, Appendix A §A.2, p.9 (grodri.github.io/glms/notes/a1.pdf, sha256:bfcc766141f43095433287dcc61f127df49103be1dd31d71454c56aa6ed8f8a6): the Wald, score and likelihood ratio tests 'are asymptotically equivalent ... Their small-sample properties are not known, but some simulation studies suggest that the likelihood ratio test may be better that its competitors in small samples.' The asymptotic-equivalence half of the bullet is confirmed; the small-sample half is a tentative empirical suggestion in the only source read, not an established general result. No other source read this session makes the claim.
- source_rank: 3
- proposed_action: Hedge to match the source (e.g. 'simulation studies suggest the LRT may do better in small samples') or drop the clause. Not applied: needs new wording.
- applied: false
- fingerprint: a644be5936fa

## [F-003] Gamma example: 'same fit difference would flip it' does not follow
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: example 'Comparing an Exponential to a Gamma Fit', answer, line 43
- claim: 'Note how close the call is: a slightly larger sample with the same fit difference would flip it.'
- evidence: Recomputation (rank 5, falsifies only): the statistic is -2 ln Lambda = 2[l_full - l_reduced] = 2(1.8) = 3.6, which depends on the log-likelihood gap alone, not on n. If 'the same fit difference' means the same log-likelihood gap of 1.8, a larger sample gives the same 3.6 < 3.84 and nothing flips. The sentence is only true if it means the same per-observation improvement (0.006 per claim), in which case n of about 300 x 3.84/3.6 = 320 would give 3.84; the page does not say that. The other numbers in the example are right: 2(-2,401.2 + 2,403.0) = 3.6 and chi^2_{0.05,1} = 3.84 (CAS Exam MAS-I tables p.20, df 1, 0.950 column, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4).
- source_rank: 5
- proposed_action: Delete the sentence, or say 'the same improvement per claim' so the dependence on n is explicit. Not applied: the sentence is ambiguous rather than contradicted by a source.
- applied: false
- fingerprint: e1851e7890fc
