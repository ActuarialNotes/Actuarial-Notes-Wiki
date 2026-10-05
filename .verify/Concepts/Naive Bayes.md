---
target: Concepts/Naive Bayes.md
created: 2026-10-05
---

## [F-001] Second worked example does not say whether the attorney flag stays in the model
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: example 'Mixing a Quantitative and a Qualitative Predictor' (line 56)
- claim: The prompt replaces the late-report flag with a normal report lag and keeps the soft-tissue rates and the 4% prior, but says nothing about the third predictor (attorney retained before first notice) or the new claim's attorney status. The answer silently drops it and gets 0.158.
- evidence: Recomputed in python before reading the answer: with two predictors (lag ~ N(40,15^2) vs N(10,8^2) at 25 days, soft-tissue 0.60 vs 0.25, prior 0.04): f_F(25)=0.016131, f_L(25)=0.008598, fraud 0.000387, legit 0.002064, P=0.158 - matches the page. A reader who keeps the first example's third flag and its 'no early attorney' value (0.70 vs 0.95) gets 0.000271/(0.000271+0.001960)=0.121. ISLR sec.4.4.4 eq.4.30 (printed p.155, PDF p.165) multiplies every predictor's f_kj, so the answer depends on which predictors are in the model, and the prompt does not fix that.
- source_rank: 5
- proposed_action: Say in the prompt that the model now uses two predictors (report lag and soft-tissue) - or give the claim's attorney status and include the 0.70/0.95 factor. Needs new prose, so left for an author.
- applied: false
- fingerprint: 180c4b8a5d7f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: within-class independence assumption and factorised density (4.29), posterior formula (4.30), priors as training shares, normal / histogram / kernel / proportion estimates for f_kj, bias-variance rationale and 'n not large relative to p', QDA-with-diagonal-covariance equivalence, threshold trade-off: all against ISLR 4.4.2-4.4.4; both examples recomputed in python before reading answers (0.00756/0.02280 -> 0.249; 0.158 with two predictors) - agree; 6 links resolve; LaTeX OK; no exam page links this page
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.4.4.4 Naive Bayes, eqs 4.29-4.30, estimation options for f_kj, diagonal-covariance remark (printed pp.153-156, PDF pp.163-166); sec.4.4.2 threshold trade-off (printed p.150, PDF p.160); sec.4.4 Generative Models for Classification (printed p.141, PDF p.151)
- note: Verified against ISLR (rank 2). Medium only because F-001 (minor, ambiguous second example) is open.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Example 'Mixing a Quantitative and a Qualitative Predictor': prompt now states the assumption — 'and leave the attorney flag out, so the model now has two predictors: report lag and soft-tissue' — which is what the answer's 0.158 computes. Added a closing paragraph: the answer depends on which predictors are in the model because every f_kj multiplies in (ISLR eq 4.30, printed p.155, PDF p.165); had the attorney flag stayed in, for a claim again with no early attorney, the products pick up 0.70 and 0.95: 0.000271/(0.000271 + 0.001960) = 0.121. Recomputed in python: f_F(25) = 0.016131, f_L(25) = 0.008598, products 0.000387 / 0.002064 -> 0.1580; with the attorney factor 0.000271 / 0.001960 -> 0.1215.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Edited prompt and new paragraph re-read against ISLR eq 4.30 (PDF p.165). Rest of page re-read against ISLR §4.4.4 PDF pp.164-166: eq 4.29, eq 4.30, normal / histogram / kernel / proportion estimates, bias-variance rationale and 'n not large enough relative to p', 'QDA with an additional assumption that the class-specific covariance matrix is diagonal'; priors as training proportions (PDF p.151); threshold (PDF p.160). Both examples re-run in python: 0.00756 / 0.02280 -> 0.2490 (about 6.2x the 4% prior); 0.1580 with two predictors, 0.1215 with the attorney factor. All 6 wiki-links resolve. F-001 closed; no open findings.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), §4.4.4 Naive Bayes — eq (4.29) within-class independence, eq (4.30) posterior, options for f_kj (normal / histogram / kernel density / class proportions), 'n not large enough relative to p', QDA with a diagonal class-specific covariance matrix, printed pp.154-156 (PDF pp.164-166); §4.4 priors as training proportions (PDF p.151); §4.4.2 threshold trade-off (printed p.150, PDF p.160), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list (James et al. Chapter 4, §§4.1-4.4, assigned to Section C), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: High: every substantive claim is from ISLR §4.4 (MAS-I syllabus reading, Ch 4 §§4.1-4.4 on the 2026 outline); the example data are illustrative and the arithmetic is recomputed.
