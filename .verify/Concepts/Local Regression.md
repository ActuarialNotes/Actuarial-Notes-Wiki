---
target: Concepts/Local Regression.md
created: 2026-10-05
---

## [F-001] Example part (a) answers 'how many get non-zero weight' with the neighbourhood size
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: nit
- status: open
- locus: example 'Span, Neighborhood and Wiggliness', part (a)
- claim: Asked how many observations get non-zero weight at each target point, the answer gives k = sn = 80 for s = 0.2 and 280 for s = 0.7. It then adds that the furthest neighbour gets weight zero, 'so slightly fewer points actually count'.
- evidence: ISLR2 Algorithm 7.1 (printed p.306, PDF p.314): step 1 gathers the fraction s = k/n of points closest to x0. Step 2 gives the furthest of them weight zero, and every point outside the k nearest also gets weight zero. So the neighbourhood is k = 80 / 280 (recomputed: 0.2 × 400 and 0.7 × 400), and at most k − 1 = 79 / 279 points get non-zero weight. The answer's caveat is right, but the numbers it leads with answer a different question from the one asked.
- source_rank: 2
- proposed_action: Either reword (a) to ask for the size of the neighbourhood (80 / 280), or answer with 'at most 79 / 279'. This is authoring, so it is not applied.
- applied: false
- fingerprint: 203f19dd48ec

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Algorithm 7.1 and eq (7.14) were rendered as an image and match the page's steps 1-4 and the weighted sum. Also checked against ISLR: new weights at every x0, memory-based like nearest neighbours, choices of K and of degree, the span as the most important choice (the role of lambda), small s wiggly and large s global, CV or direct choice, Wage spans 0.2 -> 16.4 df and 0.7 -> 5.3 df (Fig 7.10 legend), varying-coefficient models, 2-D neighbourhoods, poor beyond p of about 3-4, use in GAMs and f_jk. Example 1 recomputed in python before reading the answer: k = 0.1 x 50 = 5. The weights obey ISLR's step 2: the furthest point (45) gets 0, the closest (41) the most, and they decrease with distance. They are not tricube values, but the page does not claim tricube. Weighted LS gives sum K = 2.1, xbar_w = 40.1429, ybar_w = 5.2286, slope -1.4286/8.8571 = -0.1613, fhat(40) = 5.25: matches. Example 2: 80 / 280 neighbours, s = 0.2 wigglier with more df, increase the span: matches, with the wording nit F-001. 5 links resolve; LaTeX balanced.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.6 'Local Regression', Algorithm 7.1, eq (7.14), Figs 7.9-7.10, printed pp.304-307 (PDF pp.312-315); §7.7.1 two-dimensional smoothers for f_jk, printed p.310 (PDF p.318), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Verified against the syllabus reading. One nit is open: F-001, the example (a) count of non-zero weights.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Example 'Span, Neighborhood and Wiggliness' part (a) now answers the question asked: 'The neighborhood holds k = sn points: 0.2(400) = 80 for s = 0.2 and 0.7(400) = 280 for s = 0.7. The furthest of them gets weight zero, as does every point outside the neighborhood, so at most 79 and 279 observations get non-zero weight.' Source: ISLR2 Algorithm 7.1 step 2 (printed p.306, PDF p.314) — furthest point in the neighbourhood gets weight zero, all but the k nearest get weight zero. Recomputed 0.2*400 - 1 = 79, 0.7*400 - 1 = 279 ('at most' because ties or a zero-valued kernel could zero more).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Edited answer re-read against ISLR Algorithm 7.1 (PDF p.314). Algorithm steps, eq 7.14, memory-based, span as most important choice (PDF p.313) and Fig 7.10 df 16.4 / 5.3 (PDF p.315) re-read. Example 1 re-run in python: k = 5, sum K = 2.1, xbar_w 40.1429, ybar_w 5.2286, slope -1.4286/8.8571 = -0.1613, fhat(40) = 5.2516 (5.25). Example 2: 80/280 neighbours, at most 79/279 non-zero. All 5 wiki-links resolve. F-001 closed; no open findings.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.6 'Local Regression', Algorithm 7.1 steps 1-4 and eq (7.14) printed p.306 (PDF p.314); memory-based procedure, choice of K / degree / span printed p.305 (PDF p.313); Fig 7.10 legend (span 0.2 -> 16.4 df, 0.7 -> 5.3 df) printed p.307 (PDF p.315), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: High: every substantive claim is from ISLR §7.6-7.7, a MAS-I syllabus reading (outline 2026 assigns James Ch 7); the weights in example 1 are illustrative values that obey Algorithm 7.1's rule, not a named kernel, and the page does not claim one.
