---
target: Resources/Books/ASOP 12 - Risk Classification (ASB - 2005).md
created: 2026-10-17
---

## [F-001] GH-101 bullet omits the syllabus's appendix exclusion
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- severity: minor
- status: open
- locus: > [!info] On the syllabus, Exam GH-101 bullet
- claim: The GH-101 bullet read 'Outcomes 2f.' with no scope, so the whole standard including its two appendices read as assigned.
- evidence: SOA GH 101 syllabus (Nov 2026/Mar 2027/Jul 2027, sha256:fb385665…ed065806) pp.3-4 lists 'ASOP 12: Risk Classification (excluding Appendices) 2f'. The sibling ASOP 25 page already carries the same syllabus's '(excluding Appendices)'.
- source_rank: 1
- proposed_action: Add '; excluding Appendices' to the GH-101 bullet.
- applied: true
- fingerprint: b70b622f1f33

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- resolves: F-001
- status: resolved
- note: Applied in this run: the bullet now reads 'Outcomes 2f; excluding Appendices.', the syllabus's own exclusion.

## [C-001] Printed contents numbers 3.3.4 as a second 3.3.3
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- locus: ## 3, 3.3.4
- note: Inside the source, not a vault error: the ASOP's table of contents (PDF p.2) lists '3.3.3 Other Considerations' and then '3.3.3 Reasonableness of Results'; the body (PDF p.11) numbers the second one 3.3.4. The page follows the body.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:11Z/f01e
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: Title, Code, Doc. No., dates (Dec 2005 adoption, May 1 2011 deviation update, May 1 2006 effective date, 1989 original titled 'Concerning Risk Classification') against title page and transmittal memo; every section heading 1.1-4.1 and both appendix titles against the printed contents and the body; each content bullet (1.2 scope, definitions 2.2/2.3/2.5/2.10, 3.2.1, 3.2.2, 3.3.1, 3.3.2, 3.4, 4.1 a-h, appendix 1 background) against the section text; Related readings (sections 3.5 and 4.1 cite ASOP No. 23); syllabus bullets against each exam's outline: Exam 5 'A4-5', revised 2005, updated 2011; Exam 8 A2; GH-101 2f excluding Appendices (fixed, F-001); GI-301 6b, last revised 2011, excluding Appendix 2. CAS copy byte-identical (sha256 match). resource_lint clean.
- sources_checked: Actuarial Standards Board, ASOP No. 12, Risk Classification (for All Practice Areas), Revised Edition, Doc. No. 132 (adopted December 2005, updated for deviation language effective May 1, 2011), 24 pp., PDF pp.1-16 read (title, contents, transmittal memorandum, sections 1-4, appendix 1, appendix 2 opening), sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf (byte-identical to casact.org 2021-03/5_ASOP_12.pdf and 2021-03/8_ASOP12.pdf); CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf; CAS, Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15), p.6 (ASOP 12 citation, A4-5), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf; SOA, GH 101 – Benefits and Pricing syllabus, Nov 2026/Mar 2027/Jul 2027, pp.3-4 (ASOP 12 and ASOP 25, each 'excluding Appendices', outcome 2f), sha256:fb38566593b51f11720abf5149d56c97dd9fe9da3ba1b784894060c5ed065806 — https://www.soa.org/globalassets/assets/files/edu/2026/gh-101/2026-2027-gh-101-syllabus.pdf; SOA, GI 301 – Further Topics in General Insurance syllabus, Mar 2027/Jul 2027, Topic 6 resources (ASOP No. 12, Last Revised 2011, excluding Appendix 2, outcome 6b), sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf
- note: Verified high after one transcription fix (F-001). The source's contents mis-numbers 3.3.4 (comment).
