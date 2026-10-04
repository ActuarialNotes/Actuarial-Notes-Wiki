---
target: Concepts/Variable Selection.md
created: 2026-10-04
---

## [F-001] Methods table omits best subset selection and the lasso
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: methods table (lines 16-21)
- claim: The variable selection methods are Forward selection, Backward elimination, Stepwise and Criterion-based.
- evidence: ISLR 2nd ed. Ch 6 (a MAS-I reading per the 2026 outline, PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf): §6.1.1 Best Subset Selection (printed pp.227-229, PDF pp.235-237, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf) fits all 2^p models, keeps the best of each size by RSS/R^2 (deviance for GLMs), then chooses among M0..Mp by CV, Cp (AIC), BIC or adjusted R^2; forward and backward stepwise each fit 1 + p(p+1)/2 models and are not guaranteed to find the best subset (printed pp.229-231). §6 intro (printed p.226): 'shrinkage methods can also perform variable selection' (the lasso, §6.2.2). Best subset and the model counts are absent from the page. CAS has examined exactly this contrast: Exam MAS-I Fall 2018 Q39 (best subset vs forward stepwise; PDF p.43, key B p.50, sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf) and Spring 2019 Q39 (best subset vs forward vs backward; PDF p.43, key A p.50, sha256:02debe7c986ee38d3f484b277d0dc4a08ec424d0bb3b868b4890e4edb9312274 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf).
- source_rank: 1
- proposed_action: Add best subset selection (2^p models; best per size, then CV/Cp/AIC/BIC/adjusted R^2 across sizes), the 1 + p(p+1)/2 count for forward/backward and their non-guarantee, and the lasso as a selection method. Requires new prose - not applied.
- applied: false
- fingerprint: 3e6b0bcebf34

## [F-002] Raw deviance listed as a direct criterion across model sizes
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: methods table, row 'Criterion-based' (line 21)
- claim: Criterion-based: compare candidate models directly via AIC, BIC, or Deviance.
- evidence: CAS Monograph 5 §6.2.2 (PDF p.76, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf): 'deviance alone can not be used, since adding parameters always reduces deviance, and so selecting on the basis of lowest deviance gives an unfair advantage to the model with more parameters'. ISLR §6.1.1 (printed p.228, PDF p.236, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf): deviance 'plays the role of RSS' when choosing the best model of a given size; §6.1.3 (printed p.232): RSS and R^2 'are not suitable for selecting the best model among a collection of models with different numbers of predictors'. Deviance works within one model size or through a nested-model deviance (LR/F) test, not as a raw value compared across sizes.
- source_rank: 2
- proposed_action: Replace 'or Deviance' with 'or a nested-model deviance test', or say raw deviance compares only models with the same number of parameters. Authoring - not applied.
- applied: false
- fingerprint: 4af21e766d63

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: low
- checks_run: forward/backward/hybrid stepwise vs ISLR Algorithms 6.2-6.3 and 'Hybrid Approaches' (p.232); best subset and lasso checked for (absent - F-001); 'deviance' as a criterion vs Monograph 5 §6.2.2 and ISLR §6.1.1/6.1.3 (F-002); BIC heavier than AIC vs ISLR p.234; under/overfitting and holdout/CV vs ISLR §2.2 and §6.1.3; example recomputed (AIC 4,090 vs 4,088); links resolve; figure checked by SVG title/labels only. Not checked: the LMM fixed-vs-random bullet (MAS-II, West et al. not available) and the regulatory-restriction remark
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6 intro and §6.1 Subset Selection (printed pp.225-235, PDF pp.233-243); §5.1 (printed pp.198-206); §6.5.1 (printed p.271, PDF p.279), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.2 PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 3, 7 and reading list, PDF pp.5-6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-I Fall 2018, Q39 — official exam paper (scan), PDF p.43; Final Answer Key PDF p.50 (B), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf; CAS Exam MAS-I Spring 2019, Q39 — official exam paper (scan), PDF p.43; Final Answer Key PDF p.50 (A), sha256:02debe7c986ee38d3f484b277d0dc4a08ec424d0bb3b868b4890e4edb9312274 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf
- note: Verified with LOW confidence: one major (F-001 omits best subset selection and the lasso) and one minor (F-002 raw deviance) open.
