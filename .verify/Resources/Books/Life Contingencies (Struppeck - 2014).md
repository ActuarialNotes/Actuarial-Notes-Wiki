---
target: Resources/Books/Life Contingencies (Struppeck - 2014).md
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
- claim: Sources cites CAS Exam MAS-I Content Outline (2025), https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf, for the citation (October 2014, revised September 2015), the link to the CAS copy and the assignment.
- evidence: The CAS MAS-I exam page (https://www.casact.org/exam/exam-mas-i-modern-actuarial-statistics-i, html sha256:60386e2cc573d16ac1792989fdf4d27382f0944e668a773669bb2567ca26004a) now links only CAS Exam MAS-I Content Outline 2026, version MASI_CO_2026_F v06 2026_6_29, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed, https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf. The cited file (sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610) is version MASI_CO_2025_S v04 2024_12_19. p.6 of both carries the identical Struppeck entry (Struppeck, T., Life Contingencies, CAS Study Note, October 2014, revised September 2015; A5-6; OP; hyperlink MAS-I_Struppeck.pdf), and both list Struppeck among the Domain A readings (p.3). The callout stands; only the citation is stale.
- source_rank: 1
- proposed_action: Cite the 2026 outline (label and URL); content unchanged.
- applied: true
- fingerprint: 809d8ad9bba2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-001
- status: resolved
- note: Sources now cites CAS Exam MAS-I Content Outline (2026), https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; its Struppeck entry (p.6) is identical to the 2025 one, so the callout is unchanged.

## [F-002] Joint-life bullet names a last-survivor annuity the note never names
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: ## 6 What happens mid-year?, last bullet
- claim: A joint-life annuity pays until the first of two lives dies and a last-survivor annuity until both have died: a_x + a_y = a_xy + a_{xy-bar} (annuities-due).
- evidence: Struppeck, Life Contingencies Study Note for CAS Exam S (Revised 9/19/2015), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849, https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf, pp.11-12: 'it is possible to have an annuity that pays based on the survival of more than one person (joint lives) ... The annuity may pay until one of the two dies (denoted a_xy) or it may pay until both persons have died (denoted a_xy with a bar)', followed by the arbitrage identity, which the page transcribes correctly. Full-text search of the note: 'last-survivor' / 'last survivor' 0 occurrences, 'joint-life' / 'joint life' 0, 'joint lives' 2. The concept is real and the formula right, but the page puts a name in the note's mouth that the note does not use (the outline standard: a resource page says only what its document says).
- source_rank: 2
- proposed_action: Reword the bullet in the note's own terms — an annuity on joint lives may pay until one of the two dies or until both have died — keeping the identity; the [[Joint Life]] link can stay on 'joint lives'. Rewording is authoring, so left for the page's author.
- applied: false
- fingerprint: 25c27b6aa95d

## [C-001] Conflicts inside the note (not vault errors)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: ## 1 (warranty premium); ## Appendix; frontmatter Year
- note: (1) Ch.1 (p.3) gives the level warranty subscription as $43.30/year ('amounts are rounded'); Ch.5 (p.10) calls the same first-year premium $43.29. Independent recomputation (rank 5): K takes 0,1,2,3 with probabilities 1/3,1/3,1/6,1/6; at 5% the warranty APV = 90.0893, the APV of $1 of subscription = 2.0812, ratio 43.286, so 43.29 is the unrounded-input value and 43.30 comes from dividing the rounded 90.09/2.08. The page transcribes Ch.1's $43.30, which is what the note says there. Ch.5's one-year term APV $31.75 recomputes as 31.746. (2) The appendix renumbers exercises: Chapter 3 exercises 1), 2), 4) appear as 8), 9), 4), and the single Chapter 6 exercise 1) appears as 2), under the heading 'Chapter 6) Exercise'. (3) The PDF has no bookmarks and no contents page; the outline was built from the headings in the text (Introduction; Chapter 1: ... through Chapter 7: ...; Appendix). The note prints only 'Revised 9/19/2015'; the October 2014 date in Year comes from the outline's citation (October 2014, revised September 2015), not from the document.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: outline built from the note's headings before re-reading the page (no bookmarks or contents page); every heading diffed (Chapter 6) printed with a parenthesis, page normalises to '## 6'); every bullet and formula checked against its chapter's text (A_x and annuity recursions, 1 = d*a_x + A_x, the two workers' comp replicating annuities, joint/last-survivor identity, curtate/complete expectation); worked numbers recomputed (APV 90.09, 2.08, 43.29/43.30, 31.75, 0.75/1.25); full-text search of named terms (radix, Illustrative Life Table, arbitrage, lapse, policy values, hyperbolic, force of mortality, curtate, pure endowment ...) — all present except last-survivor/joint-life (F-002); frontmatter vs title page and outline; callout diffed against 2026 outline p.6 and the 2025 outline it cited (identical) and the exam page's Source Material (A5–A6); Available-from URL is the outline's link; resource_lint clean
- sources_checked: Tom Struppeck, Life Contingencies Study Note for CAS Exam S (Revised 9/19/2015) — whole note pp.1-14 (Introduction, Chapters 1-7, Appendix), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026_6_29), pp.3 and 6 (Domain A readings; Struppeck citation, A5-6, OP, link), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Outline complete (Introduction, Chapters 1-7, Appendix). Fixed: stale outline citation (F-001). Open: F-002 minor (a term the note does not use). Callout matches the 2026 outline exactly.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Reworded the last bullet of ## 6 in the note's own terms: 'An annuity can pay based on the survival of more than one person ([[Joint Life|joint lives]]): until one of the two dies, a_xy, or until both have died, a_xy-bar; an arbitrage argument relates them to annuities on single lives, a_x + a_y = a_xy + a_xy-bar' (annuities-due as the page writes them). 'joint-life annuity' and 'last-survivor annuity' are gone. Source: Struppeck, Life Contingencies Study Note for CAS Exam S (Revised 9/19/2015), pp.11-12 ('an annuity that pays based on the survival of more than one person (joint lives) ... may pay until one of the two dies ... or it may pay until both persons have died ... There are relationships between annuities on single lives and annuities on joint lives ... an arbitrage argument'), sha256:8ea3f762df47e0c143b217219e7aa7033709e55f2a6378de25ed385673e3a849 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Struppeck.pdf
