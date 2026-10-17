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
