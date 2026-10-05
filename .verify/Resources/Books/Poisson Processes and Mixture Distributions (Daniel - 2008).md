---
target: Resources/Books/Poisson Processes and Mixture Distributions (Daniel - 2008).md
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
- claim: Sources cites CAS Exam MAS-I Content Outline (2025), https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf, for the citation, the practice-problem note, the CAS links and the assignment.
- evidence: The CAS MAS-I exam page (https://www.casact.org/exam/exam-mas-i-modern-actuarial-statistics-i, html sha256:60386e2cc573d16ac1792989fdf4d27382f0944e668a773669bb2567ca26004a) now links only the 2026 outline: CAS Exam MAS-I Content Outline 2026, version MASI_CO_2026_F v06 2026_6_29, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed, https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf. The cited file (sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610) is version MASI_CO_2025_S v04 2024_12_19. Diffed p.6 of both: the Daniel entry is identical (Daniel, J.W., Poisson processes (and mixture distributions), CAS Study Note, June 2008; Note: Practice Problems as noted in the paper's Foreword are available on the CAS website; A1-5; OP), with the same hyperlinks to MAS-I_Daniel_1.pdf and MAS-I_Daniel_2.pdf (the only change on p.6 is Ross adding a 13th edition). The callout therefore stands; only the citation is stale.
- source_rank: 1
- proposed_action: Cite the 2026 outline (label and URL); content unchanged.
- applied: true
- fingerprint: 27935b8b6b21

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-001
- status: resolved
- note: Sources now cites CAS Exam MAS-I Content Outline (2026), https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; its Daniel entry (p.6) is identical to the 2025 one, so the callout and the note are unchanged.

## [F-002] Example 1.7 (time to next event) filed under 1.1 instead of 1.1.1
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: ## 1 Poisson processes, 1.1 What's a Poisson process? (third bullet)
- claim: The bullet on T(x), the time from x to the next event, with Pr[T(x) > t] = exp(-integral of lambda) as the survival-model formula, sat directly under 1.1, ahead of the 1.1.1 Some important time intervals sub-heading.
- evidence: Daniel, Poisson processes (and mixture distributions), CAS Study Note, June 26 2008, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888, https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf. The heading 1.1.1 Some important time intervals is printed on p.5 after Example 1.3; Definition 1.4, Example 1.6 and then Example 1.7 (p.6: at a particular time x ... T(x) ... Pr[T(x) > t] = Pr[N(x+t) - N(x) = 0] = e^-integral ...; replace lambda by mu and you get tpx) follow it, and Problems 1.1 closes it before 1.2 begins. Section 1.1 proper (pp.3-5) holds only Definitions & Properties 1.1-1.2 and Example 1.3. The bullet's wording is accurate; only its section is wrong.
- source_rank: 2
- proposed_action: Move the bullet, unchanged, under 1.1.1 after the T_n bullet.
- applied: true
- fingerprint: 647baeab8892

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-002
- status: resolved
- note: Bullet moved verbatim under 1.1.1 Some important time intervals, after the T_n / V_j bullet, matching the order of Examples 1.6 and 1.7 in the note. No wording changed.

## [F-003] Outline omits the four Problems lists that close sections 1.1-1.4
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: ## 1 Poisson processes (sections 1.1-1.4)
- claim: The outline lists the numbered sections and subsections only; the Problems 1.1, 1.2, 1.3 and 1.4 blocks appear only as a phrase in the lead (each section ends with a list of practice problems).
- evidence: Daniel note (sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888): headed blocks Problems 1.1 (p.6), Problems 1.2 (p.8), Problems 1.3 (pp.12-13) and Problems 1.4 (p.15), each listing SoA Exam MLC/M/3 and CAS Exam 3 archive questions. These are what the 2026 MAS-I outline's note refers to (Practice Problems as noted in the paper's Foreword are available on the CAS website, p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed). The linked scan MAS-I_Daniel_2.pdf (sha256:ad09bca16833dd204964b40a5a4f4a14d2a84df1b71ea39f77bda804a5de9702, 13 pages, read as images) holds exactly the 13 CAS Exam 3 questions Problems 1.4 lists (Spring 2007 #1, 2; Fall 2006 #26, 27; Fall 2005 #29, 31; Spring 2005 #7, 11, 17; Fall 2004 #17; Spring 2004 #31; Fall 2003 #13, 31). The lead already tells a reader the lists exist, so the consequence is cosmetic.
- source_rank: 2
- proposed_action: Optionally add a 'Problems 1.n' bullet at the end of each of 1.1-1.4 (heading only, as printed), or leave as is; an editorial choice for the page's author.
- applied: false
- fingerprint: c54586a32ce2

## [C-001] Conflicts inside the source files (not vault errors)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: frontmatter Title/Year; PDF bookmarks
- note: (1) MAS-I_Daniel_1.pdf carries no outline of its own: its PDF bookmarks are four top-level entries from a combined CAS file (Poisson Processes and Mixture Distributions -> p.1, then An Introduction to Statistical Learning with Applications in R, Generalized Linear Models and Life Contingencies with no target page), and its metadata title is 'Casualty Actuarial Society | Exam S Text References'. There is no printed contents page either, so the outline was built from the headings in the text (Foreword; Chapter 1 Poisson processes; 1.1, 1.1.1, 1.2, 1.3, 1.3.1-1.3.3, 1.4, 1.4.1-1.4.3) — the page has every one, numbered and titled as printed. The page's Title follows the title page (Poisson processes (and mixture distributions)), not the bookmark's title case. (2) The title page dates the note June 26, 2008 but prints (c) Copyright 2007 by James W. Daniel; Year 2008 matches the date and the outline's citation (June 2008). The title page names the author's firm, Austin Actuarial Seminars; Publisher 'Casualty Actuarial Society' follows the outline's 'CAS Study Note'. (3) MAS-I_Daniel_2.pdf's bookmarks label its pages sp07-3 3, sp07-3 4, fall06 28 ... while the printed question numbers are 1, 2, 26 ... ; the page cites only the first page's printed label (Exam 3, Spring 2007, question 1), which is correct.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: outline built from the note's own headings before re-reading the page (no printed contents; bookmarks are a combined-file artefact); every heading diffed verbatim; every bullet checked against its section's text, incl. attribution to section; full-text search of named terms (Mixing Method, operational time, stationary increments, thinning, mean-value function, negative binomial, Austin Actuarial Seminars, MLC/3L) — all present; omissions walk (Problems 1.1-1.4); frontmatter vs title page and outline citation; On-the-syllabus callout diffed against 2026 outline p.6 and the 2025 outline it cited (identical) and against the exam page's Source Material (A1–A5); Available-from and practice-problem URLs fetched; resource_lint clean
- sources_checked: James W. Daniel, Poisson processes (and mixture distributions), CAS Study Note, June 26 2008 — whole note pp.1-15 (title page, Foreword, Ch.1 §§1.1-1.4.3), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026_6_29), pp.3 and 6 (Domain A readings; Daniel citation, A1-5, OP, practice-problem note and links), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Daniel practice problems (CAS scan), 13 pp. read as page images, sha256:ad09bca16833dd204964b40a5a4f4a14d2a84df1b71ea39f77bda804a5de9702 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_2.pdf
- note: Outline complete and verbatim. Fixed: stale outline citation (F-001), Example 1.7 bullet moved into 1.1.1 (F-002). Open: F-003 nit (Problems lists not in the outline). Callout matches the 2026 outline exactly.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Added the four printed Problems blocks as the last sub-bullet of their sections: 'Problems 1.1' (closing 1.1, after 1.1.1), 'Problems 1.2', 'Problems 1.3' (after 1.3.3) and 'Problems 1.4' (after 1.4.3), each with its 'From the SoA Exam MLC/M/3 archives: ...' and 'From the CAS Exam 3 archives: ...' lines transcribed mechanically (pymupdf text extraction, line breaks joined) from Daniel, Poisson processes (and mixture distributions), CAS Study Note, June 26 2008, PDF pp.6, 8, 12-13 and 15, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf. The standard (docs/resource-pages.md §2.3 item 4) prefers a division's printed sub-divisions verbatim, and these are printed headed blocks. The Sources entry for the note now says it was read with its Problems lists.
