---
target: Concepts/Bootstrap.md
created: 2026-10-05
---

## [F-001] Percentile interval: beyond the syllabus reading and given without caveat
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 4 (Percentile confidence interval) and the example answer's last sentence
- claim: Percentile confidence interval: the 2.5th and 97.5th percentiles of the alpha-hat*r give a 95% interval (example: 'from the 25th and 975th ordered values').
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §5.2 (PDF pp.218-221), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: the bootstrap is used only to estimate SE_B (eq. 5.8); ISLR has no bootstrap confidence interval anywhere (full-text search for 'percentile' hits only spline knots and BART, PDF pp.306, 325, 358), so the interval is not MAS-I reading. Rank 3: Orloff & Bloom, MIT 18.05 Class 24 'Bootstrap confidence intervals' (prep-a) §9 (PDF p.10), sha256:b3d7018c2214a25a7090228e8e0fa8e500922d6eb3fef4e52e5f08962e1dd948 — https://math.mit.edu/~dav/05.dir/class24-prep-a.pdf, defines the percentile method exactly as the page does but heads it '(should not be used)', quoting Rice, and recommends the empirical bootstrap interval [xbar - delta*_.1, xbar - delta*_.9] instead (§7, PDF p.6). The definition and the 25th/975th order statistics (2.5% and 97.5% of B = 1,000) are right; what is missing is that it is beyond ISLR Ch 5 and one of several contested bootstrap intervals.
- source_rank: 3
- proposed_action: Mark the percentile interval as beyond the MAS-I reading (ISLR Ch 5 covers only SE_B) and note it is one of several bootstrap intervals, or remove it. Authoring - not applied.
- applied: false
- fingerprint: d566342a24de

## [F-002] Sense difference: Exam 7 ODP-bootstrap questions link this page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: lead and bullet 1 (scope of 'bootstrap')
- claim: The bootstrap resamples the observed data with replacement B times; each bootstrap sample has the same size n as the original, ~63.2% distinct observations.
- evidence: As written this is the nonparametric bootstrap of James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §5.2 (PDF pp.220-221, Fig. 5.11: 'Each bootstrap data set contains n observations, sampled with replacement from the original data set'; SE_B eq. 5.8), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf - correct for MAS-I (James Ch 5, CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06) PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf). But 14 Exam 7 questions with topic 'Bootstrap' (questions/exam-7/cas7-2013-q7 ... cas7-2019-q10) list Concepts/Bootstrap as their first wiki_link beside Concepts/ODP Bootstrap Model. The vault's ODP Bootstrap Model page (rank 4, consistency only) describes Shapland's procedure as resampling standardized Pearson residuals of a loss triangle, not observations, so this page's 'same size n' and '63.2% distinct observations' facts do not carry over and nothing here points an Exam 7 reader to the right page. No exam page links [[Bootstrap]] in the Exam 7 sense. Flagged, not reconciled.
- source_rank: 4
- proposed_action: Re-point the Exam 7 questions' primary concept to [[ODP Bootstrap Model]] (outside this file), or add a one-line pointer here for the residual (ODP) bootstrap. Not applied.
- applied: false
- fingerprint: e2a214a98b7f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: page read in full, no prior log; exam pages linking it: MAS-II only (plus 2 MAS-I, 14 Exam 7, 1 Exam 8 questions); SE_B formula diffed against ISLR eq. 5.8; same-size-n with replacement, SE use, CV-vs-bootstrap distinction against ISLR §5 intro/§5.2; (1-1/n)^n -> e^-1 against ISLR Ex 5.4.2 + §8.2.1; example recomputed (1-(1-1/250)^250 = 0.6329 -> 158.2 distinct, 92 repeats; 25th/975th of 1,000); links (4) and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §5 intro (PDF p.206), §5.2 eqs. 5.6-5.8 and Fig. 5.11 (PDF pp.218-221), Ex. 5.4.2 (PDF pp.228-229), §8.2.1 bagging/OOB 'around two-thirds' (PDF p.350), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Orloff & Bloom, MIT 18.05 Class 24 'Bootstrap confidence intervals' (prep-a), §§6-9 (PDF pp.3-6, 10), sha256:b3d7018c2214a25a7090228e8e0fa8e500922d6eb3fef4e52e5f08962e1dd948 — https://math.mit.edu/~dav/05.dir/class24-prep-a.pdf
- note: Formula and core facts match ISLR §5.2 (MAS-I sense). 'No distributional assumption' is supported for the empirical bootstrap by MIT 18.05 §6 (resampling from the empirical distribution). Bagging/random-forest/OOB bullets are MAS-II sense (ISLR §8.2), consistent. Two minor findings open: percentile interval beyond the reading; Exam 7 ODP questions link this page.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Deleted the 'Percentile confidence interval' bullet and the example answer's last sentence ('A percentile interval comes straight from the 25th and 975th ordered values'). The bootstrap's MAS-I reading uses it only to estimate SE_B: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §5.2 eq. 5.8 (PDF pp.218-221), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; no bootstrap interval appears in ISLR, so the claim had no syllabus source and is removed rather than kept.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Added one bullet distinguishing the two senses and linking [[ODP Bootstrap Model]]: Exam 7's ODP bootstrap samples with replacement from the Pearson residuals of an over-dispersed Poisson model fitted to a loss triangle and builds pseudo triangles, rather than resampling the observations. Source: Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide, CAS Monograph 4 (2016), §3.2 (PDF pp.19-20, printed pp.11-12: 'the ODP bootstrap process involves sampling with replacement from the residuals'; Pearson residuals 'the most desirable'; 'Sampling with replacement from the residuals can then be used to create new sample triangles of incremental values'), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf. ISLR's observation bootstrap: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §5.2 Fig. 5.11 (PDF p.221: 'Each bootstrap data set contains n observations, sampled with replacement from the original data set'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. The 14 Exam 7 questions were not edited (outside this file).
