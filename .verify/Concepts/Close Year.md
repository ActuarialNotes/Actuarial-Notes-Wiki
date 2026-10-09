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
