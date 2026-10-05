---
target: Resources/Books/Generalized Linear Models (Larsen - 2015).md
created: 2026-10-04
---

## [F-001] Syllabus citation names the superseded 2025 MAS-I outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: ## Sources, content outline entry
- claim: Sources cites CAS Exam MAS-I Content Outline (2025), https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf, for the citation (December 2015, revised June 2016), the link to the CAS copy and the assignment.
- evidence: The CAS MAS-I exam page (https://www.casact.org/exam/exam-mas-i-modern-actuarial-statistics-i, html sha256:60386e2cc573d16ac1792989fdf4d27382f0944e668a773669bb2567ca26004a) now links only CAS Exam MAS-I Content Outline 2026, version MASI_CO_2026_F v06 2026_6_29, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed, https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf. The cited file (sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610) is version MASI_CO_2025_S v04 2024_12_19. p.6 of both carries the identical Larsen entry (Larsen, M., Generalized Linear Models, CAS Study Note, December 2015, revised June 2016; C1-C9; OP; hyperlink MAS-I_Larsen.pdf), and both list Larsen among the Domain C readings (p.5). The callout stands; only the citation is stale.
- source_rank: 1
- proposed_action: Cite the 2026 outline (label and URL); content unchanged.
- applied: true
- fingerprint: dac9b46a35c4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-001
- status: resolved
- note: Sources now cites CAS Exam MAS-I Content Outline (2026), https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; its Larsen entry (p.6) is identical to the 2025 one, so the callout is unchanged.

## [C-001] Notes on the source (not vault errors)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: frontmatter Year; ## Canonical Link Function
- note: (1) The PDF has no bookmarks and no contents page; its six headed sections (Quasi-Likelihood; Regression Through the Origin; QQ and Box Plots to test distribution assumptions; Tweedie Distributions; Canonical Link Function; Exponential Family Formulas) were read off pp.1-3 before re-reading the page, which has all six verbatim and in order. (2) The note prints only 'Revised 6/29/2016' (PDF metadata title says 06_26_2016); the December 2015 date in Year comes from the outline's citation. (3) The note's own wording has two slips the page handles correctly: the canonical link 'varies by the distribution selected to model the explanatory variable' (the page drops the last four words), and its claim that a canonical link makes GLM estimates unbiased while a non-canonical one does not is attributed on the page ('The note states ...') rather than asserted. Whether that claim is right in general is a question for the concept pages, not this one. (4) The Exponential Family table (p.3) was read from a 200-dpi render because the text layer garbles the math; the page lists its seven rows (binomial, Normal, Poisson, exponential, gamma, inverse Gaussian, negative binomial) and the form f(y;theta) = exp[a(y)b(theta) + c(theta) + d(y)] exactly.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: high
- checks_run: outline built from the note's six headings before re-reading the page; headings diffed verbatim; every bullet checked against its section (Dobson & Barnett §§3.2, 7.7, 9.8; Hogg 7th ed. §4.4.1; Tweedie powers 0/1/(1,2)/2/3; canonical links identity/logit/log/inverse; exponential-family form and the seven table rows read from a 200-dpi render); full-text search of named terms (over dispersion, Normal probability plot, order statistic, compound Poisson-gamma, Tweedie, betas, general linear model) — all present; omissions walk (none: all six sections present); frontmatter vs title page and outline citation; callout diffed against 2026 outline p.6 and the 2025 outline it cited (identical) and against the exam page's Source Material (C1–C9); related readings vs the note's citations; resource_lint clean
- sources_checked: Michael Larsen, Generalized Linear Models Study Note for Exam S (Revised 6/29/2016) — whole note pp.1-3 (six sections, link table, exponential-family table), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026_6_29), pp.5-6 (Domain C readings; Larsen citation, C1-C9, OP, link), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Outline complete and verbatim; every bullet says what its section says. Fixed: stale outline citation (F-001). No open findings.
