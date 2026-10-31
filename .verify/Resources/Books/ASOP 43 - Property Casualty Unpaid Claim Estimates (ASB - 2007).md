---
target: Resources/Books/ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007).md
created: 2026-10-31
---

## [F-001] Scope bullet drops 'or will have occurred'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: nit
- status: open
- locus: §1.2 Scope, first bullet
- claim: Applies to unpaid claim estimates for events that have occurred as of an accounting date, for all classes of entities ...
- evidence: ASOP 43 §1.2, p.1 (PDF p.6): the standard applies to 'developing unpaid claim estimates only for events that have already occurred or will have occurred, as of an accounting date, exclusive of estimates developed solely for ratemaking purposes'. Appendix 2, p.13 (PDF p.18) records that 'or will have occurred' was inserted in response to a comment on the second exposure draft, so the clause is deliberate.
- source_rank: 2
- proposed_action: Transcribe the standard's wording: 'for events that have already occurred or will have occurred as of an accounting date'.
- applied: true
- fingerprint: d79cd5143965

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Transcribed in this pass: the §1.2 bullet now reads 'for events that have already occurred or will have occurred as of an accounting date', per ASOP 43 §1.2 p.1 (PDF p.6).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Outline built from the standard's printed table of contents (pp.ii-iii) before re-reading the page, then diffed heading by heading: all 4 sections, 4+12+8(+8 subsections)+2 numbered headings and the 3 appendixes with their sub-headings match in order and wording. The PDF has no bookmark outline (pymupdf get_toc() is empty), so the printed contents is the only structure. Every outline bullet compared with the section text (§1.1, §1.2 both paragraphs, §2.1, 2.7, 2.8, 2.10, 2.11, §3.3a-f incl. the 'best estimate'/'actuarial estimate' sentence, §3.6.1 multiple methods + disclosure, §3.6.7 examples, §3.6.8 neither requires nor prohibits, §3.7.3 four presentations, §4.1a-f incl. the three dates, §4.2a-b). Lead checked against the title page (adopted June 2007, updated for deviation language effective May 1, 2011, Doc. No. 159), the transmittal ('no ASOP exists to provide guidance to actuaries developing unpaid claim estimates') and §1.4 (work products on or after September 1, 2007). Syllabus callout diffed against the Exam 5 Fall 2026 outline p.6 (ASOP 43 → A4, B2; 'adopted in 2007, updated for deviation language in 2011') and the Exam 6U Fall 2026 outline p.7 (ASOP 43 → C6). Related readings: §3.6.3 cites ASOP No. 23 for selecting, relying on, reviewing and using data; Friedland's contents list ASOP 43 as Appendix B. Available-from URL and the CAS copy both fetched: identical sha256 776302c4…, so 'byte-identical' holds; the ASB landing page returns HTTP 200. Frontmatter title/publisher/year/code match the title page.
- sources_checked: ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), title page, table of contents pp.ii-iii, transmittal memorandum pp.iv-v, §§1-4 pp.1-10, Appendixes 1-3 headings pp.11-24 (PDF pp.1-31), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf; ASOP No. 43, CAS copy, sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce (byte-identical to the ASB PDF) — https://www.casact.org/sites/default/files/2021-03/5_ASOP_43.pdf; CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf; CAS Exam 6U Content Outline, Fall 2026, p.7 (Complete Text References: ASOP 43 → C6), sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951 — https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Table of Contents / bookmark outline (Appendix B at PDF p.435), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Verified against the standard itself. One nit fixed (§1.2 'or will have occurred'). Source-internal conflict, logged and not a vault error: the printed contents lists '3.6 Unpaid Claims Estimate Analysis' while the body heading (p.5) is '3.6 Unpaid Claim Estimate Analysis'; the page follows the body.
