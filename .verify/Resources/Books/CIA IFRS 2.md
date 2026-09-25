---
target: Resources/Books/CIA IFRS 2.md
created: 2026-09-25
---

## [F-001] Broken nested bold around 'confidence level'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: nit
- status: open
- locus: ## What the risk adjustment is, sentence 2
- claim: '**disclose the **confidence level**** to which'
- evidence: Nested ** pairs render as bold 'disclose the ', plain 'confidence level', then four literal/empty asterisks. Pure markup defect.
- source_rank: 5
- proposed_action: Replace with '**disclose the confidence level**'.
- applied: true
- fingerprint: 30f1756bf281

## [F-002] Math written with \( \) delimiters, which the vault does not render
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: nit
- status: open
- locus: ## Contents table, row 5
- claim: '5.3 capital \(C_t\) · 5.4 the cost of capital rate \(r_t\)'
- evidence: quiz/src/lib/vaultMath.ts and remark-math handle only $…$ / $$…$$; no other vault page uses \( \). The cells render as '(C_t)' with a literal underscore. The source headings are '5.3 Capital (Ct)' and '5.4 Cost of capital rate (rt)'.
- source_rank: 5
- proposed_action: Use $C_t$ and $r_t$.
- applied: true
- fingerprint: 5909525e90fe

## [F-003] Contents omits the note's four appendices
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## Contents table (ends at row 10)
- claim: Contents table stops at §10.
- evidence: PDF bookmark outline: Appendix 1 Margins – brief summary of IFRS 4 and CIA SOP (p.30); Appendix 2 Simplified calculation of RA based on cost of capital method (p.31); Appendix 3 Quantification of the confidence level using minimum capital test (p.33); Appendix 4 Illustrative example on risk adjustment calculations (p.38). The Fall 2026 6C outline assigns the note to C1-C3 with no exclusion and makes candidates responsible for the attached Excel illustrations; Appendices 2-4 are the worked calculations.
- source_rank: 2
- proposed_action: Human to add rows for Appendices 1-4.
- applied: false
- fingerprint: 4494ca766af8

## [F-004] Named methods and claims absent from the note
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## The three families of method (Quantile, Cost of capital bullets); ## The judgements, bullet 'Diversification'
- claim: Quantile bullet names 'Mack' and 'a proportional hazard transform' and 'TVaR'; cost-of-capital bullet calls it 'the Solvency II construction'; diversification bullet says 'IFRS 17 does not permit recognising diversification the entity does not actually have'.
- evidence: Full-text search of the note: Mack 0, proportional hazard 0, hazard 0, Solvency II 0, TVaR 0 (the note uses VaR and CTE). §4.2 lists distribution-fitting (lognormal/gamma), Monte Carlo, bootstrapping and scenario modelling. §3.2 (PDF p.13-14) says diversification not reflected in pricing makes its inclusion in the RA 'more difficult' to justify and is 'a matter of judgment' — not a prohibition. The CoC formula in §5.2 is RA = Σ r_t·C_t/(1+d_t)^t, equivalent to the page's v^t notation.
- source_rank: 2
- proposed_action: Replace the named methods with the note's own list (distribution fitting, Monte Carlo, bootstrapping, scenario modelling; VaR/CTE) and soften the diversification sentence to the note's wording (human edit).
- applied: false
- fingerprint: f0fbd180e901

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-001
- status: resolved
- note: Fixed in this run: bold markup now '**disclose the confidence level**'.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-002
- status: resolved
- note: Fixed in this run: \(C_t\), \(r_t\) rewritten as $C_t$, $r_t$.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: frontmatter vs title page; contents vs PDF bookmark outline (40 entries); syllabus scope (C1-C3, Excel illustrations); proper-noun search (Mack, TVaR, CTE, proportional hazard, Solvency II, bootstrap, PfAD); §3.5 time horizon, §3.7 PAA, §5.2 CoC formula, §6 margin method vs page; LaTeX delimiters; wiki-link resolution
- sources_checked: CIA Educational Note: IFRS 17 Risk Adjustment for Non-Financial Risk for Property and Casualty Insurance Contracts, August 14 2024 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=348400&fid=348401 via https://www.cia-ica.ca/publications/224090e/ (sha256 c34ba39e72404117d9827b3a71f478242b379024de017eea798f7f0e337d9d71); CAS Exam 6C (Canada) Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf (sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1)
- note: Sections 1-10 match; time-horizon, PAA and CoC-formula claims check out. Two markup nits fixed. Held at in_review because an open major finding (appendices missing) needs human-authored content.
