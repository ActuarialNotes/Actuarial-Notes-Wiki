---
target: Concepts/Close Year.md
created: 2026-09-12
---

## [F-001] Disposal rate defined against reported claims; Friedland defines it against ultimate claim counts
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: major
- status: open
- locus: third bullet, parenthetical after 'disposal rate'
- claim: 'measuring the disposal rate (claims closed as a share of claims reported)'
- evidence: Friedland, Estimating Unpaid Claims 3rd ed., Ch. 11 'Frequency-Severity Approach #3 - Disposal Rate Technique' (printed p.206 = PDF p.212): 'We define the disposal rate as the cumulative closed claim counts for each accident year-maturity age cell divided by the selected ultimate claim count for the particular accident year... Each ratio represents the percentage of ultimate claim counts that are closed at a given stage of maturity for a given accident year.' Ch. 13 (printed p.290s = PDF p.313) repeats it for the Berquist-Sherman settlement-rate adjustment: 'Berquist and Sherman use the same definition of disposal rates as that presented in the final frequency-severity approach of Chapter 11... The disposal rate is equal to the cumulative closed claim counts for each accident year-maturity age cell divided by the ultimate claim counts for the particular accident year.' The denominator matters numerically: in Friedland's Berq-Sher Auto BI exhibit (PDF p.314) the 1974 adjusted closed count of 3,379 is 0.433 x projected ultimate 7,803, not a share of reported counts. Friedland does add the caveat that 'the definition of disposal rate differs among different authors in published actuarial papers', so the page's version is not unheard of - but it is not the syllabus definition, and the page invokes it in the same breath as Berquist-Sherman, where Friedland's denominator is ultimate.
- source_rank: 2
- proposed_action: Change the parenthetical to 'cumulative closed claim counts divided by selected ultimate claim counts for the accident year', optionally noting that the definition varies by author.
- applied: false
- fingerprint: a7d4e92aa3ed

## [F-002] 'A settled claim has no further development' ignores reopened claims
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: minor
- status: open
- locus: first bullet
- claim: 'A close-year cohort is complete and fully developed the moment it closes — a settled claim has no further development — which makes closed-claim data the only loss data that needs no development at all.'
- evidence: Friedland, Estimating Unpaid Claims 3rd ed., Ch. 1 (printed p.14 = PDF p.20) lists the five components of an unpaid claim estimate and includes an explicit 'estimate for reopened claims' alongside case outstanding, future development on known claims, IBNR and claims in transit — i.e. the text treats a closed claim as capable of reopening and generating further payment, which is why a provision for it is required. The page's absolute phrasing removes that condition; the claim-count definitions in Friedland Ch. 3 make the same point by distinguishing closed counts from counts closed with and without payment and from reopened counts.
- source_rank: 2
- proposed_action: Qualify the bullet: a closed claim needs no further development except where claims reopen, for which Friedland requires a separate provision.
- applied: false
- fingerprint: 26027486e07f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Both examples recomputed from scratch before reading the stated answers: cohort assignment for a 9/1/2021 policy, 3/10/2022 accident, 4/1/2022 report and 9/14/2024 settlement gives PY 2021 / AY 2022 / RY 2022 / close year 2024, matching the page; severities 3,500,000/700 = $5,000, 4,200,000/300 = $14,000, 7,700,000/1,000 = $7,700 all reproduce, and 5,000/7,700 = 0.649 supports 'understate by roughly a third'. The selection-bias bullet is confirmed almost verbatim by Friedland PDF p.214: 'the paid severities increase as the claims mature. This is consistent with the common belief that smaller claims settle at a quicker rate than more complicated and costly claims. Such patterns are particularly common for long-tail lines of insurance such as U.S. general liability.' The Berquist-Sherman / disposal-rate bullet was checked against Friedland Ch.13 (PDF pp.313-314), which adjusts the closed claim count triangle by multiplying selected disposal rates by projected ultimate counts — the mechanic the page describes is right, the denominator in its parenthetical is not (F-001). Friedland Ch.4's management-interview material citing Berquist and Sherman (PDF p.51) supports the closing-speed bullet's attribution. Wiki links and the figure embed all resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 1 pp.14-15 (PDF pp.20-21), Ch. 3 p.31 (PDF p.37), Ch. 11 pp.206-208 (PDF pp.212-214), Ch. 13 pp.283-308 (PDF pp.289-314), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
- note: Two open findings (F-001 major on the disposal rate denominator, F-002 minor on reopened claims). All arithmetic and all cohort assignments are correct.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Stands. Re-read Friedland Ch.11 printed p.206 (PDF p.212): 'We define the disposal rate as the cumulative closed claim counts for each accident year-maturity age cell divided by the selected ultimate claim count for the particular accident year', and Ch.13 printed p.288 (PDF p.294), which applies the same definition to the Berquist-Sherman paid adjustment and notes 'the definition of disposal rate differs among different authors'. Parenthetical rewritten to Friedland's definition (closed counts / selected ultimate counts), with the note that other authors differ.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Stands. Friedland Ch.1 printed p.14 (PDF p.20) lists an 'estimate for reopened claims' as one of the five components of the unpaid claim estimate. First bullet now says a settled claim has no further development unless it reopens, reopened claims being a separate component (Friedland Ch.1), and the absolute 'the only loss data that needs no development at all' is softened to 'needs almost no development'.

## [F-003] Close-year basis and its uses appear in no syllabus reading read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: opening definition; third bullet ('rarely a ratemaking basis', claim-department throughput)
- claim: Close Year groups claims by the calendar year in which they were settled and closed; close year is rarely a ratemaking basis and its real work is operational (disposal rate, claim-department throughput, average cost of a closed claim).
- evidence: Full-text search this session: 'close year' occurs zero times in Friedland, Estimating Unpaid Claims (451 pp., sha256:5e9830…) and zero times in Werner & Modlin, Basic Ratemaking (423 pp., sha256:6b214d…); neither defines a close-year cohort. The CAS Exam 5 Content Outline, Fall 2025 (p.3, task A3, sha256:bbb074…) lists 'close year' among the ways to aggregate ratemaking data but does not define it, and the Fall 2026 outline (p.3, task A3, sha256:fd8373…) lists only 'calendar year, policy year, accident year, report year, and in-force' — close year and net of reinsurance are gone. So the definition and the operational-use bullet rest on no source read; the disposal-rate, selection-bias and Berquist-Sherman bullets are Friedland's (Ch.11 p.208, Ch.13 p.288).
- source_rank: 1
- proposed_action: Source the close-year definition from a CAS reading (or reduce the page to what Friedland supports about closed-claim data), and have the maintainer decide whether the page still belongs to Exam 5 now that the Fall 2026 outline has dropped 'close year'.
- applied: false
- fingerprint: 9fa4738d4c13

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: in_review
- checks_run: F-001/F-002 re-read against Friedland and fixed; both examples recomputed (3,500,000/700 = 5,000; 4,200,000/300 = 14,000; 7,700,000/1,000 = 7,700; 5,000/7,700 = 0.649); full-text search of Friedland and Werner for 'close year'; Exam 5 content outlines Fall 2025 and Fall 2026 diffed for the term.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 p.14 (PDF p.20), Ch.4 p.44 (PDF p.50), Ch.6 p.71 (PDF p.77), Ch.11 pp.206-208 (PDF pp.212-214), Ch.13 p.288 (PDF p.294), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS Exam 5 Content Outline, Fall 2025, p.3 task A3, sha256:bbb07433732f1d2f097db74e69ed263771dd512ce3e14229384b6df5654ebfc7 — https://www.casact.org/sites/default/files/2025-05/Exam_5_ContentOutline_2025_F.pdf; CAS Exam 5 Content Outline, Fall 2026, p.3 task A3, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: F-001 and F-002 fixed from Friedland. Left in_review on F-003: the close-year definition and its operational-use bullet are in no reading read this session ('close year' occurs zero times in Friedland and Werner), and the Fall 2026 Exam 5 outline no longer lists close year.

## [C-003] Still present: Close-year basis and its uses appear in no syllabus reading read
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- reaffirms: F-003
- note: Re-checked 2026-10-31 against both Exam 5 reserving readings and the A3 line. ASOP 43 (sha256:776302c4…): 'close year', 'closed year', 'year of closing', 'settlement year', 'closed claim', 'disposal rate' — zero hits. Friedland (sha256:5e983082…): 'close year', 'closed year', 'year of closing', 'settlement year', 'year of settlement' — zero hits; the one 'year closed' hit (printed p.198, PDF p.204) is 'half-year closing date' in the disposal-rate discussion. CAS Exam 5 Content Outline Fall 2026 (sha256:fd8373ae…) p.3 task A3 lists 'calendar year, policy year, accident year, report year, and in-force' — 'close year' zero hits in the document. The Exam 5 page carries Close Year only as an editorial *Key concepts* entry under A3. Finding stands; the maintainer has to decide whether the page stays on Exam 5 and from what source its definition is written.

## [C-004] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- status_set: in_review
- checks_run: Full-text search for 'close year' and synonyms in ASOP 43 and Friedland; Fall 2026 Exam 5 outline task A3 re-read and searched; Exam 5 page A3 line read (Close Year is an editorial key concept there). Earlier-fixed F-001/F-002 text unchanged since the 2026-10-09 pass.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), full-text search; Ch.11 p.198 (PDF p.204), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), full-text search, sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf; CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Left in_review on F-003 (reaffirmed): neither ASOP 43 nor Friedland names a close-year aggregation basis, and the Fall 2026 Exam 5 outline's A3 no longer lists it. Not verified; maintainer decision needed on whether the page belongs to Exam 5 and what source should define it.

## [F-004] Werner's loss trend display cited as 'Exhibit 6.14'; Werner numbers it Table 6.14
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:42Z/4730
- date: 2026-10-31
- severity: nit
- status: open
- locus: third bullet, citation '(Ch. 6, Exhibit 6.14; Appendix A)'
- claim: Cites Werner & Modlin Ch. 6 'Exhibit 6.14' for calendar-year paid losses and closed claim counts for the 12 months ending each quarter.
- evidence: Werner & Modlin Ch.6 p.111 (PDF p.123) captions the display '6.14 Exponential Loss Trend Example' (columns Earned Exposure, Closed Claim Count, Paid Losses, 12 months ending each quarter) and p.112 (PDF p.124) refers to it as 'Table 6.14 is an example of using an exponential fit.' The text never calls it an exhibit.
- source_rank: 2
- proposed_action: Change 'Exhibit 6.14' to 'Table 6.14'.
- applied: true
- fingerprint: ff34f2fc7688

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:42Z/4730
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Applied in this run: citation now reads '(Ch. 6, Table 6.14; Appendix A)', Werner's own name for the display (p.112, PDF p.124).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:42Z/4730
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Resolved by the rewrite (maintainer's decision to keep the page as the vault's own label). The page now opens by calling Close Year 'the vault's own label' and 'not a term Exam 5's readings use', and its exam section says it is not in the Fall 2026 outline's A3 (outline p.3: 'calendar year, policy year, accident year, report year, and in-force' — re-read this run; 'close year' zero hits). Every remaining claim was traced this run to the page it cites: Werner Ch.1 p.8 (PDF p.20) paid severity = 'paid losses on closed claims divided by closed claims' and severity changes 'highlight the impact of any changes in claims handling procedures'; Ch.1 p.3 (PDF p.15) closed / re-opened; Ch.3 p.42 and Ch.6 p.91 (PDF pp.54, 103) the four aggregation methods and AY 'not closed (fixed)'; Ch.6 p.94 (PDF p.106) reported/paid/closed claims with or without CNP; Ch.6 pp.108-111 (PDF pp.120-123) short-tailed lines, CY paid 12 months ending each quarter, paid definition free of case-reserving changes, history of claims handling procedures, Table 6.14 closed counts; App. A p.A-5 (PDF p.342) closed counts, paid losses, rolling 12 months; Ch.1 p.11 (PDF p.23) close ratio = quotes to new policies. Friedland Ch.1 p.14 (PDF p.20) reopened claims component; Ch.6 pp.70-71 (PDF pp.76-77) reopened coding can decrease closed counts across a row, closed-to-reported diagnostic, footnote 29 backlog; Ch.11 p.206 (PDF p.212) disposal rate = cumulative closed / selected ultimate count; p.208 (PDF p.214) smaller claims settle quicker; Ch.13 p.284 (PDF p.290) large-claim focus, 'smaller claims may become larger claims more quickly'; p.288 (PDF p.294) disposal rate definition 'differs among different authors'. The old operational-use and 'rarely a ratemaking basis' claims are gone.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:42Z/4730
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Every sentence traced to the page it cites (each quote read in the cached source this run, not taken from the writer); chapter attribution checked (aggregation methods are Werner Ch.3 p.42 and restated Ch.6 p.91; the page's Ch.6 citation holds); A3 wording against the Fall 2026 outline; 'close year' full-text search in the outline. Examples recomputed before reading the answers: grouping PY 2022 / AY 2023 / RY 2023 / close 2025; 2024 paid 800(2,000)+200(20,000)=5,600,000 / 1,000 = 5,600; 2025 paid 1,200(2,000)+200(20,000)=6,400,000 / 1,400 = 4,571.43; 4,571.43/5,600 - 1 = -18.4%. All match. Wiki links and figure embed resolve; the page's own question (cas5-an-001) is tagged to it.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 pp.3, 8, 11 (PDF pp.15, 20, 23); Ch.3 p.42 (PDF p.54); Ch.6 pp.91, 94, 108-112 (PDF pp.103, 106, 120-124); App. A p.A-5 (PDF p.342), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 p.14 (PDF p.20); Ch.6 pp.70-71 (PDF pp.76-77); Ch.11 pp.206-208 (PDF pp.212-214); Ch.13 pp.284, 288 (PDF pp.290, 294), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02), p.3 task A3, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Verified. F-003 resolved by the rewrite's honest labelling; one nit (Exhibit vs Table 6.14) fixed. Exam 5 (CAS).md still lists Close Year as an A3 key concept (its F-009, open, maintainer's call) — outside this page.
