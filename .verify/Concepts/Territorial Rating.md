---
target: Concepts/Territorial Rating.md
created: 2026-10-17
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: in_review
- checks_run: checked against Exam 8 readings (Goldburd §9.2, Chalk Ch.8) and the 6C FSCO Technical Notes; worked example recomputed
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §9.2, PDF pp.100-101, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §8.2-8.3, §8.8.1, PDF pp.143-146, 152, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf; FSCO, Technical Notes for Automobile Insurance (Oct 2016), §16-17, PDF pp.8-9, sha256:b2ca7a6cdf4e19924f8f4dcb0e2890d723ba9ee3bcd31c31277e72a298f6d2a0 — https://www.casact.org/sites/default/files/2022-05/6C_FSCOTechNotes_102016.pdf
- note: Left in_review: the page's central claims (why territory is contested, its correlation with income and race, provincial prohibitions, public insurers' coarse territories) appear in none of the Exam 8 readings, and of the 6C material only Ontario's limits on territory definitions were confirmed (FSCO Technical Notes §17: at least 2,500 vehicles per new territory, at most 55 territories in Ontario and 10 in Toronto, contiguity, +/-10% between adjoining territories). Credibility and smoothing bullet is consistent with Goldburd §9.2 and Chalk §8.2-8.3. Example arithmetic recomputed: combined PP 583.53, raw relativity 1.56, 0.45(1.56)+0.55 = 1.25. Three findings recorded.

## [F-001] Provincial prohibition and public-insurer claims are unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: Canadian restrictions bullet
- claim: Some provinces prohibit territory in auto rating altogether, and public auto insurers generally use very coarse territories or none; Ontario has repeatedly examined postal-code rating in the GTA.
- evidence: FSCO Technical Notes (Oct 2016) §17 PDF p.8 confirm only that Ontario limits territory definitions (min 2,500 vehicles, max 55 territories in Ontario and 10 in Toronto, contiguity, +/-10% between adjoining territories). No reading checked (Goldburd, Chalk, FSCO Technical Notes, FSRA Major Filing Guidelines, Alberta Auto Reform) says any province prohibits territory outright or describes public insurers' territories. The GTA postal-code review is also unsourced.
- source_rank: 2
- proposed_action: Cite a source for each province-level claim or delete it; keep the Ontario limits with the FSCO citation.
- applied: false
- fingerprint: 74e2ab61316b

## [F-002] Worked example multiplies five-year exposures by five again
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: Example "Should These Territories Be Merged?", answer, first paragraph
- claim: 2,400 exposures over five years is 12,000 exposure-years.
- evidence: The stem gives the experience "over five years" with Territory B at 2,400 earned exposures, so B has 2,400 exposure-years in total; an earned exposure is already an exposure-year. Multiplying by five again overstates B's volume fivefold. The combined pure premium (583.53) and relativity (1.56) use 2,400 as the weight and are unaffected; only the credibility narrative is.
- source_rank: 5
- proposed_action: Either restate the stem as 2,400 earned exposures a year, or drop the "is 12,000 exposure-years" clause (author to choose).
- applied: false
- fingerprint: d15e03020045

## [F-003] Exam 8 objective A7 content is missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: whole page
- claim: The page treats territory as a credibility/smoothing and regulatory question and does not describe how territory is controlled for or integrated with a classification GLM.
- evidence: Exam 8 objective A7 ("approaches to control for and integrate rating factors using predictive models (e.g., territorial)") is taught in Goldburd §9.2 PDF p.100 (standalone spatial model entered as an offset; the territory model offset for the class plan; iterate - "a two-way street") and Chalk et al. Ch.8 §8.2-8.3 PDF pp.143-146 (fit the GLM without zip code, smooth its residuals geospatially, recombine; zip-to-area-group tables §8.9.2). Neither appears on this page, though Rating Factors and High Dimensional Variables cover it.
- source_rank: 2
- proposed_action: Add an Exam 8 section on two-stage territory modelling with an offset, citing Goldburd §9.2 and Chalk Ch.8 (new prose: for an author).
- applied: false
- fingerprint: bc2971ce1985

## [F-001/R] Unsourced Canadian claims removed
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-17T23:41Z/5923
- date: 2026-10-17
- resolves: F-001
- status: resolved
- note: Deleted the claims that some provinces prohibit territory in auto rating, that public auto insurers use coarse territories or none, and that Ontario has examined postal-code rating in the GTA, and the unsourced income/race correlation sentence. Kept Ontario's limits, now listed in full from FSCO Technical Notes (Oct 2016) §17 (PDF p.8, sha256:b2ca7a6cdf4e19924f8f4dcb0e2890d723ba9ee3bcd31c31277e72a298f6d2a0): 3 years of insurer data and 2,500 annualized average vehicles for a new territory; max 55 in Ontario, 10 in Toronto; contiguity; +/-10% between newly formed adjoining territories; one definition for all coverages; large claims capped. Fairness now rests on the Exam 6C reading CIA, Territory Pricing Considerations in P&C Insurance (Mar 2024, doc. 224032), §1.1, §2, §4, §6, PDF pp.3-5 (https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=323292&fid=323290, sha256:c65816631dc97df85caafaf03842e29d17baf625863c0f37c6a9b805d408fa70) and Chalk et al. §8.8.3 (PDF p.152). The drivers, smoothing and cross-subsidy bullets were rewritten to Werner & Modlin, Basic Ratemaking, Ch.11 (PDF pp.200-204) and Ch.9 (PDF pp.163-164), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf. Needs re-verification.

## [F-002/R] Example exposure conversion fixed
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-17T23:41Z/5923
- date: 2026-10-17
- resolves: F-002
- status: resolved
- note: Dropped the '12,000 exposure-years' clause: the answer now says an earned exposure is already an exposure-year, so B has 2,400 exposure-years over five years (480 a year vs A's 3,600). Recomputed in Python: combined PP 11,904,000/20,400 = 583.53; B relativity 910/583.53 = 1.5595 -> 1.56; 0.45(1.56)+0.55 = 1.252 -> 1.25 (unchanged). Added a parenthetical comparing B's 480 earned car-years a year with FSCO §17's 2,500 annualized average vehicles for a new territory. The unsourced claim that a regulator will reject a proxy boundary was softened to the CIA §6 fairness scrutiny.

## [F-003/R] Exam 8 A7 section added
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-17T23:41Z/5923
- date: 2026-10-17
- resolves: F-003
- status: resolved
- note: New section 'Territory in a Classification Model (Exam 8)': log-link GLM formula with ln(territory loss cost) as offset; offset definition and logging from Goldburd et al. §2.6 (PDF pp.27-28); territory modelled outside the GLM, entered as an offset so class variables 'will not proxy for them', and the two-way iteration converging over years, from Goldburd §9.2 (PDF pp.100-101, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757); Chalk et al., CAS Monograph 16, §8.2-8.3 (PDF pp.143-146: GLM without zip code, geospatial smoothing of its output, GAM second stage with log stage-1 expected frequency as offset, pred2 = pred1 x geographic effect), §8.9.1 leakage (PDF pp.146, 153) and §8.9.2 zip-to-area-group tables (PDF pp.154-155), sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74; and the CIA §2 steps for 6C. New worked example 'Offsetting a Class Plan for Territory' (modelled on Goldburd §2.6's combined territory + deductible offset), recomputed in Python: ln 310 + ln 0.95 = 5.7366 - 0.0513 = 5.6853; 310 x 0.95 x 1.12 = 329.84. Added tip and exam-traps callouts.

## [F-004] FSCO vehicle minimum loses its three-year qualifier
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- severity: nit
- status: open
- locus: Ontario's limits (Exam 6C) bullet; merge example, parenthetical
- claim: A newly formed territory needs at least three years of the insurer's data and at least 2,500 annualized average vehicles; B's 480 earned car-years a year would fall short of FSCO's minimum of 2,500 annualized average vehicles.
- evidence: FSCO Technical Notes (Oct 2016) §17, PDF p.8: 'All newly formed territories are based on a minimum of three years of insurer data and at least 2,500 annualized average vehicles over the three-year period where a unique territory definition is proposed.' The page drops 'over the three-year period'. The source's phrase can be read as a per-year average or as a three-year total; the example's conclusion holds either way (480 a year < 2,500; 3 x 480 = 1,440 over three years < 2,500), so nothing a student computes from the page changes.
- source_rank: 2
- proposed_action: Restore 'over the three-year period' to the bullet (transcription).
- applied: false
- fingerprint: 84b102ac4b72

## [C-002] Re-verification after F-001/F-002/F-003 fixes
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:49Z/b2b8
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: all cached sources re-hashed against their sha256; every quote and attribution diffed against its source; independent recomputation of both worked examples before reading the page's figures; FSCO §17 list item by item; Exam 8 A7 and Exam 6C A1 against the Fall 2026 outlines; wiki-links and figure embed resolved
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 PDF pp.163-164, 175; Ch.11 PDF pp.200-204, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CIA, Territory Pricing Considerations in Property and Casualty Insurance (Mar 11 2024, doc. 224032), opening, §1, §1.1, §2, §4, §6, PDF pp.3-5, sha256:c65816631dc97df85caafaf03842e29d17baf625863c0f37c6a9b805d408fa70 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=323292&fid=323290; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.6 PDF pp.27-28, §9.2 PDF pp.100-101, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, §8.2-8.3 PDF pp.143-146, §8.8.3 PDF p.152, §8.9.1-8.9.2 PDF pp.153-155, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf; FSCO, Technical Notes for Automobile Insurance Rate and Risk Classification Filings (Oct 2016), §16-17, PDF p.8, sha256:b2ca7a6cdf4e19924f8f4dcb0e2890d723ba9ee3bcd31c31277e72a298f6d2a0 — https://www.casact.org/sites/default/files/2022-05/6C_FSCOTechNotes_102016.pdf; CAS Exam 8 Content Outline, Fall 2026 (October 2026 administration), Domain A task 7 (PDF p.3), Experience Rating and Retrospective and Loss Sensitive Rating statements (PDF p.4), sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf; CAS Exam 6C Content Outline, Fall 2026, Domain A tasks and readings (PDF p.3), reading table: CIA Territories, FSCO Tech Notes, Marshall, Landmark Legal (PDF pp.9-11), sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf
- note: Recomputed from the stems first: (18,000 x 540 + 2,400 x 910)/20,400 = 11,904,000/20,400 = 583.53; 910/583.53 = 1.5595 -> 1.56; 0.45(1.56) + 0.55 = 1.252 -> 1.25; 2,400/5 = 480 a year vs 3,600. ln 310 = 5.736572, ln 0.95 = -0.051293 (Goldburd §2.6 prints -0.0513), offset 5.685279; exp(5.685279 + ln 1.12) = 310 x 0.95 x 1.12 = 329.84. All match the page. Werner & Modlin: 'one of the primary drivers of claims experience', 'most well-established and widely used', two phases, density/weather/crime, correlation and sparsity, distance- vs adjacency-based smoothing and over/under-smoothing (Ch.11 PDF pp.200-202); relativity = territory PP / total PP (Ch.9 PDF p.175); subsidy and adverse selection (PDF pp.163-164). CIA: 'a cornerstone rating variable...' (PDF p.3), §1.1 size/credibility, §2 four steps, §4 third-party data list, §6 quotes verbatim (PDF pp.3-5). Goldburd §9.2 quotes verbatim ('hundreds or thousands or hundreds of thousands of territories', 'will not proxy for them'), two-way iteration and convergence over years (PDF pp.100-101); offset constrained to 1 and logged (§2.6, PDF pp.27-28). Chalk §8.2-8.3 two-stage model, GAM offset, pred2 = pred1 x geographic effect (PDF pp.143-146); §8.8.3 proxies (PDF p.152); §8.9.1 leakage, §8.9.2 zip-to-area-group tables, 'over 30,000 records' (PDF pp.153-155). FSCO §17 conditions all present (one nit, F-004). Exam 8 A7 and Exam 6C A1 (CIA Territories, FSCO Tech Notes) confirmed. No content edits.
