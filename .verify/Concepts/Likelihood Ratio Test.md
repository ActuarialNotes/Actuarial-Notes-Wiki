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

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Lambda definition, -2 ln Lambda = 2[l(theta-hat) - l(theta-hat_0)], chi-square approximation and its degrees of freedom (r = difference in free parameters - confirmed by CMU Lec 21, NIST 8.2.3.3 and Rodriguez A.27, three independent statements; the Wilks attribution by CMU Lec 21), rejection rule, nesting requirement, Neyman-Pearson statement, Wald/score equivalence and the GLM deviance and F-form bullets checked against the sources cited. Examples recomputed in python before reading the answers: 2(-407.1 + 412.6) = 11.0 > 5.99 (p = 0.0041) -> reject; 2(-2,401.2 + 2,403.0) = 3.6 < 3.84 (p = 0.058) -> fail to reject; critical values match the CAS table. Links ([[Deviance]], [[Generalized Linear Model]], [[AIC]], [[BIC]], [[Power of a Test]], [[Parameter Estimate Tables]]) resolve exact; figure builder (log-likelihood gap 5.5 between full and reduced) matches example 1. Exam usage: Exam MAS-I (CAS).md (Domain B) and Exam MAS-II (CAS).md (comparing linear mixed models, objective 5) - same LRT sense; MAS-II's REML/boundary cases are not on this page and not checked.
- sources_checked: Balakrishnan, CMU 36-705 Intermediate Statistics (Fall 2019), Lecture 21 §21.2: generalized LRT lambda = sup_{Theta0} L / sup_{Theta} L, reject when lambda <= c; 'Wilks' phenomenon'; under H0 and conditions -2 log lambda -> chi^2_nu with nu = dim(Theta) - dim(Theta0); the Neyman-Pearson test is optimal for simple vs simple, sha256:957e7c52577a6b3f0472bbcc14611653b64b7a934f07c5270e05228561c4df21 — https://www.stat.cmu.edu/~siva/teaching/705/lec21.pdf; NIST/SEMATECH e-Handbook of Statistical Methods §8.2.3.3 Likelihood ratio tests: lambda = L0/L1 for nested restricted/unrestricted models, chi^2 = -2 ln lambda approximately chi-square with k degrees of freedom, k = number of parameters lost (e.g. exponential as a Weibull special case), sha256:b98f507c243e5f762477ab0311358633217b98a11251c19faf056044c3b4749b — https://www.itl.nist.gov/div898/handbook/apr/section2/apr233.htm; Rodriguez, Generalized Linear Models (Princeton lecture notes), Appendix A §A.2 pp.5-9: nested models omega1 in omega2, eq (A.27) -2 log lambda -> chi^2_nu with nu = dim(omega2) - dim(omega1) 'under certain regularity conditions'; Wald, score and LR tests asymptotically equivalent, sha256:bfcc766141f43095433287dcc61f127df49103be1dd31d71454c56aa6ed8f8a6 — https://grodri.github.io/glms/notes/a1.pdf; Rodriguez, Generalized Linear Models, Appendix B §B.3.2 pp.6-7, eqs (B.11)-(B.13): -2 log lambda = [D(omega1) - D(omega2)]/phi, equal to the deviance difference when phi = 1 (binomial, Poisson), F with (p2 - p1, n - p2) df under normality with phi estimated from the larger model, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Siegrist, Random, ch.8 §5 Likelihood Ratio Tests: Neyman-Pearson lemma (likelihood-ratio region most powerful among regions of no greater size, simple vs simple) and the generalized likelihood ratio for composite hypotheses, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html; CAS Exam MAS-I Tables (version 01/15/2018), chi-square lower-tail table p.20 (0.950 column: df 1 = 3.84, df 2 = 5.99), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf
- note: F-001 (major) open: 'exactly the difference in deviances' omits the dispersion - -2 ln Lambda = Delta D / phi, so it is exact only for Poisson/binomial; the F-form bullet misnames the deviance it uses. F-002 (minor) open: LRT's small-sample superiority stated more firmly than Rodriguez, the only source that addresses it. F-003 (minor) open: the Gamma example's closing sentence ('same fit difference would flip it') does not follow, since the statistic depends on the log-likelihood gap, not n. Medium: rank-3 sources; Hogg §§6.3, 6.5, 8.3 and Dobson & Barnett ch.5 (the MAS-I readings) not freely available, not read.

## [F-001/R] Deviance identity carries the dispersion; F form uses unscaled deviances
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Rewrote the GLM bullet: -2 ln Lambda = (D_reduced - D_full)/phi with D the unscaled deviance and phi the [[Dispersion Parameter]] (equivalently the difference in scaled deviances), equal to the deviance difference itself only for Poisson and binomial (phi = 1) - Rodriguez, GLM notes, Appendix B §B.3.2 eqs (B.11)-(B.13) pp.6-7, 'the deviance divided by the scale parameter phi ... is called the scaled deviance', and for phi = 1 'the deviance is the same as the scaled deviance' (sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286). Rewrote the F bullet: when phi is unknown, estimate it from the full model and use F = [(D_reduced - D_full)/r]/phi-hat_full from the UNSCALED deviances on (r, n - p_full) df, exact for a normal linear model where the deviances are RSS - Goldburd et al., CAS Monograph 5 (2025 rev.), §6.2.1 eq.17 PDF pp.74-75 ('D refers to the unscaled deviance', phi-hat_B of the big model, F on (# added parameters, n - p_B)), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757; and Rodriguez B.3.2 normal example ('dividing the criterion by p2 - p1 we obtain an F with p2 - p1 and n - p2 degrees of freedom', exact under normality). Matches the convention in Concepts/Deviance.md as it stands (D unscaled, D* = D/phi scaled; analysis of deviance (D_reduced - D_full)/phi ~ chi^2, F = (D_reduced - D_full)/(Delta p phi-hat_full) on (Delta p, n - p_full)).

## [F-002/R] Small-sample claim hedged to the source
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Replaced 'but the LRT is generally the most reliable in small samples' with 'Their small-sample properties are not known, though some simulation studies suggest the LRT may do better than the other two in small samples', which is what Rodriguez, GLM notes, Appendix A §A.2 p.9 says ('Their small-sample properties are not known, but some simulation studies suggest that the likelihood ratio test may be better that its competitors in small samples'), sha256:bfcc766141f43095433287dcc61f127df49103be1dd31d71454c56aa6ed8f8a6 — https://grodri.github.io/glms/notes/a1.pdf. The asymptotic-equivalence half is unchanged (same source).

## [F-003/R] Gamma example's closing sentence corrected
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Deleted 'a slightly larger sample with the same fit difference would flip it' and wrote instead: 'The call is close: the statistic depends only on the log-likelihood gap, not on n, and a gap above 3.84/2 = 1.92 would have rejected.' Recomputed in python: -2 ln Lambda = 2(-2,401.2 + 2,403.0) = 3.6, chi^2_1 0.95 quantile 3.8415 (CAS MAS-I tables p.20, df 1, 0.950 column = 3.84, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4), 3.84/2 = 1.92; the statistic is 2 x (log-likelihood gap) by the page's own formula, so n enters only through the log-likelihoods.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Every edit re-read against its source: GLM identity -2 ln Lambda = (D_reduced - D_full)/phi, = Delta D for Poisson/binomial (Rodriguez B.11-B.13); F form from unscaled deviances with phi-hat of the full model on (r, n - p_full) df, exact for the normal linear model (Goldburd eq.17; Rodriguez B.3.2 normal example); small-sample sentence hedged to Rodriguez A.2 p.9; rejection rule now names the CAS table's lower-tail 0.950 column (p.20). Consistent with Concepts/Deviance.md as resolved in this run (D unscaled, D* = D/phi; same analysis-of-deviance and F statistics). Recomputed in python: 2(-407.1 + 412.6) = 11.0 > 5.99 (p = 0.0041); 2(-2,401.2 + 2,403.0) = 3.6 < 3.84 (p = 0.058); 3.84/2 = 1.92; chi^2 0.95 quantiles 3.841 (df 1), 5.991 (df 2) match the table. Unchanged claims (Lambda, Wilks df, nesting, Neyman-Pearson, Wald/score equivalence) re-confirmed in CMU Lec 21, NIST 8.2.3.3, Siegrist ch.8 §5, Rodriguez A.2. All wiki-links resolve, incl. new [[Dispersion Parameter]]; figure embed exists.
- sources_checked: Rodriguez, Generalized Linear Models (Princeton lecture notes), Appendix B §B.3.2 pp.6-7, eqs (B.11)-(B.13): -2 log lambda = D/phi (scaled deviance), nested models -2 log lambda = [D(omega1) - D(omega2)]/phi, phi known or estimated from the larger model, asymptotically chi^2 with p2 - p1 df; normal linear model: exact F(p2 - p1, n - p2); binomial/Poisson phi = 1, deviance = scaled deviance, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, Generalized Linear Models, Appendix A §A.2 pp.5-9: -2 log lambda -> chi^2 with nu = dim difference under regularity conditions; Wald, score and LR tests asymptotically equivalent, 'small-sample properties are not known, but some simulation studies suggest that the likelihood ratio test may be better', sha256:bfcc766141f43095433287dcc61f127df49103be1dd31d71454c56aa6ed8f8a6 — https://grodri.github.io/glms/notes/a1.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 rev.), §6.1.3 and §6.2.1 eq.17, PDF pp.74-75: comparisons need identical data; F = (D_S - D_B)/(# added parameters x phi-hat_B) with D the unscaled deviance, F on (# added parameters, n - p_B) df, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Balakrishnan, CMU 36-705 Intermediate Statistics (Fall 2019), Lecture 21: generalized LRT, Wilks' phenomenon, -2 log lambda -> chi^2_nu with nu = dim(Theta) - dim(Theta0); Neyman-Pearson test optimal for simple vs simple, sha256:957e7c52577a6b3f0472bbcc14611653b64b7a934f07c5270e05228561c4df21 — https://www.stat.cmu.edu/~siva/teaching/705/lec21.pdf; NIST/SEMATECH e-Handbook §8.2.3.3 Likelihood ratio tests: restricted vs unrestricted (nested) models, -2 ln lambda approximately chi-square with df = number of parameters lost, sha256:b98f507c243e5f762477ab0311358633217b98a11251c19faf056044c3b4749b — https://www.itl.nist.gov/div898/handbook/apr/section2/apr233.htm; Siegrist, Random, ch.8 §5 Likelihood Ratio Tests: Neyman-Pearson lemma (most powerful, simple vs simple) and generalized likelihood ratio, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html; CAS Exam MAS-I Tables (version 01/15/2018), 'Lower-tail areas for Chi-square distributions' p.20 (0.950 column: df 1 = 3.84, df 2 = 5.99), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf
- note: F-001, F-002, F-003 resolved. Medium: rank-3 sources; Hogg §§6.3, 6.5, 8.3 and Dobson & Barnett ch.5 (MAS-I readings) not freely available.
