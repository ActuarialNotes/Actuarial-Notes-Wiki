---
target: Concepts/Data Quality.md
created: 2026-10-10
---

## [F-001] Tip puts ASOP No. 23 on Exam 5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- severity: minor
- status: open
- locus: tip, second bullet
- claim: '**Exam 5** and **PCPA** use the same ASOP No. 23 framework: reconciling the data to financial records before an analysis...'
- evidence: CAS Exam 5 Content Outline Fall 2026 (sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf) lists ASOPs 12, 13 and 43 as its standards (PDF pp.2-6); ASOP 23 does not appear (search of the cached text: no 'ASOP 23'/'Data Quality'). Exam 5 task A4 asks candidates to evaluate ratemaking data for errors, completeness and reasonableness, but not under ASOP 23. PCPA's outline v.8 does list ASOP 23 (domain A readings, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f). An Exam 5 reader would be sent to a standard that is not on that exam's syllabus.
- source_rank: 1
- proposed_action: Drop Exam 5 from the bullet: '**PCPA** uses the same ASOP No. 23 framework: ...'.
- applied: true
- fingerprint: 6bdfee50b68f

## [F-002] Two unsourced superlatives
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- severity: minor
- status: open
- locus: first bullet ("the most common single review check") and last bullet ("a leading source of model risk")
- claim: 'The reconciliation above is the most common single review check' and 'Poor-quality data are a leading source of [[Model Risk|model risk]]'
- evidence: Neither ranking is in the sources read: ASOP No. 23 (sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf) §3.2-3.3 lists consistency with external information and questionable values without ranking checks; Friedland ch.3 p.37 (sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464) lists consistency with financial statement data first among four components but does not call it the most common; SR 11-7 (sha256:0046c0e4eb705830d43312da000271655000beb2a349e1cc3802815638c62cc0) says data quality and relevance are 'of critical importance' to a model, not that it is a leading source of model risk. The substance (reconcile; poor data undermine a model) is supported; the superlatives are not.
- source_rank: 3
- proposed_action: Soften to what the sources say, e.g. 'a standard review check' (Friedland lists consistency with financial statement data among four verification components) and 'Data quality is of critical importance to a model (SR 11-7)'; needs an author's wording.
- applied: false
- fingerprint: ea64214a795a

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: the tip's second bullet now reads '**PCPA** uses the same ASOP No. 23 framework: ...' (Exam 5 dropped, verb agreement only). Checked against the Exam 5 Fall 2026 outline (no ASOP 23) and the PCPA outline v.8 (ASOP 23 a domain A reading).

## [C-001] Validation pass
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Definition: appropriate (suitable for intended purpose, relevant), sufficient (enough data elements or records) = ASOP 23 §2.1, §2.6; reasonable = §3.2(b)(2)-(3). Selection = §3.2(a)-(b)(1)-(7); review (definition of each data element, questionable values / inconsistent relationships; not an audit) = §2.5, §3.3, §3.8(c); use (acceptable, enhancement, judgmental adjustments incl. widening the range, further review, too inadequate -> other data / partial with principal's consent / decline) = §3.4(a)-(e); reliance on data supplied by others and on other information, disclosed = §3.5-3.6. PCPA objective A1 (stakeholders) = outline v.8. Example 1 recomputed first: 41.6M - 43.2M = -1.6M; -1.6M + 1.5M = -0.1M unexplained; 0.1/43.2 = 0.23% ('about 0.2%') — matches. Example 2 (age 0 / >110) follows §3.3(b) and §3.4, and Friedland's note on default values standing in for missing information. Traps = §2.5, §3.3(b), §3.4. Tip corrected this run (F-001: ASOP 23 is not on the Exam 5 outline). Links resolve.
- sources_checked: ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §2.1 appropriate data, §2.2 audit, §2.5 review, §2.6 sufficient, §3.1-3.6, §3.8(c), §4.1, PDF pp.6-11, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.3 "Verification of the Data", printed p.37 (PDF p.43), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS PCPA Exam & Project Content Outline v.8 (updated 9.9.2026), Domain A 'Dealing with Data' tasks A1-A4 and readings (ASOP 23, ASOP 56, Grolemund and Wickham), PDF pp.3-4, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf; CAS Exam 5 Content Outline, Fall 2026, Domain A task 4 and the reading list (ASOPs 12, 13 and 43 only), PDF pp.2-6, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf; Board of Governors of the Federal Reserve / OCC, SR 11-7 Supervisory Guidance on Model Risk Management (2011), Section IV/V: 'rigorous assessment of data quality and relevance, and appropriate documentation'; Section VII: documentation 'sufficiently detailed so that parties unfamiliar with a model can understand how the model operates, its limitations, and its key assumptions', sha256:0046c0e4eb705830d43312da000271655000beb2a349e1cc3802815638c62cc0 — https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107a1.pdf
- note: Medium because F-002 (two unsourced superlatives, minor) is open; every other claim checks against ASOP 23 and Friedland (rank 2). The tip's description of DISC-DA question shapes is study guidance (the only public statement of question form is CAS's 'application-based multiple-choice'); its topic placement was checked against the DISC DA syllabus.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Applied at the lead's direction: 'the most common single review check' -> 'a standard review check' (Friedland ch.3 p.37 lists consistency with financial statement data among its four verification components); 'a leading source of model risk' -> 'a source of model risk' (SR 11-7: data quality and relevance are of critical importance to a model). No other change.

## [C-002] Re-verification after applying the open findings
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-check after this run's fixes: only the corrected sentences changed (git diff), each re-read against the source cited in its resolution; rest of page unchanged since today's earlier pass, whose checks stand: Definition: appropriate (suitable for intended purpose, relevant), sufficient (enough data elements or records) = ASOP 23 §2.1, §2.6; reasonable = §3.2(b)(2)-(3). Selection = §3.2(a)-(b)(1)-(7); review (definition of each data element, questionable values / inconsistent relationships; not an audit) = §2.5, §3.3, §3.8(c); use (acceptable, enhancement, judgmental adjustments incl. widening the range, further review, too inadequate -> other data / partial with principal's consent / decline) = §3.4(a)-(e); reliance on data supplied by others and on other information, disclosed = §3.5-3.6. PCPA objective A1 (stakeholders) = outline v.8. Example 1 recomputed first: 41.6M - 43.2M = -1.6M; -1.6M + 1.5M = -0.1M unexplained; 0.1/43.2 = 0.23% ('about 0.2%') — matches. Example 2 (age 0 / >110) follows §3.3(b) and §3.4, and Friedland's note on default values standing in for missing information. Traps = §2.5, §3.3(b), §3.4. Tip corrected this run (F-001: ASOP 23 is not on the Exam 5 outline). Links resolve.
- sources_checked: ASB, ASOP No. 23 Data Quality (Doc. No. 185, Dec. 2016), §2.1 appropriate data, §2.2 audit, §2.5 review, §2.6 sufficient, §3.1-3.6, §3.8(c), §4.1, PDF pp.6-11, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.3 "Verification of the Data", printed p.37 (PDF p.43), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS PCPA Exam & Project Content Outline v.8 (updated 9.9.2026), Domain A 'Dealing with Data' tasks A1-A4 and readings (ASOP 23, ASOP 56, Grolemund and Wickham), PDF pp.3-4, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf; CAS Exam 5 Content Outline, Fall 2026, Domain A task 4 and the reading list (ASOPs 12, 13 and 43 only), PDF pp.2-6, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf; Board of Governors of the Federal Reserve / OCC, SR 11-7 Supervisory Guidance on Model Risk Management (2011), Section IV/V: 'rigorous assessment of data quality and relevance, and appropriate documentation'; Section VII: documentation 'sufficiently detailed so that parties unfamiliar with a model can understand how the model operates, its limitations, and its key assumptions', sha256:0046c0e4eb705830d43312da000271655000beb2a349e1cc3802815638c62cc0 — https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107a1.pdf
- note: All findings on this page now resolved. Medium: every other claim checks against ASOP 23 and Friedland (rank 2). The tip's description of DISC-DA question shapes is study guidance, per the lead's policy.
