---
target: Concepts/Calendar Year.md
created: 2026-09-13
---

## [F-001] Schedule P Part 1 cited as calendar-year reporting; it is an accident-year schedule
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: minor
- status: open
- locus: bullet 2, 'CY is the financial reporting basis'
- claim: Calendar year 'is what the income statement, the combined ratio and Schedule P Part 1 report'.
- evidence: Friedland, Estimating Unpaid Claims (3rd ed. 2010), Ch. 3 printed p.36 fn.17 (PDF p.42): 'the incurred loss triangles in Schedule P of the U.S. statutory annual statement include IBNR'; and Ch. 5 printed p.79 fn.33 (PDF p.85) describes Schedule P as 'a claim development schedule of the U.S. annual statement' and sources from it 'paid, case outstanding, and IBNR for accident years 2006 and 2007'. Schedule P is therefore an accident-year presentation of claims; only its premiums-earned column is a calendar-year figure. The income statement and the combined ratio are correctly calendar year, so the error is confined to the Schedule P clause.
- source_rank: 2
- proposed_action: Drop 'and Schedule P Part 1' from the bullet, or restate it as 'Schedule P Part 1 pairs calendar-year earned premium with accident-year losses'.
- applied: false
- fingerprint: 945f35d69210

## [F-002] Only the IBNR-inclusive calendar-year loss formula is given; the syllabus definition is paid + change in case
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: minor
- status: open
- locus: second display formula, 'CY Incurred Losses = Paid + dCase + dIBNR'
- claim: The page's only calendar-year loss formula is Paid + change in case reserves + change in IBNR.
- evidence: Both syllabus texts define the calendar-year loss statistic without IBNR. Werner & Modlin, Basic Ratemaking (5th ed. 2016), Ch. 3 printed p.43 (PDF p.55): 'Reported losses for the calendar year are equal to paid losses plus the change in case reserves during that twelve-month calendar year.' Friedland Ch. 3 printed p.39 (PDF p.45): 'calendar year 2008 reported claims are the 2008 payments plus the change in case outstanding'. The page's formula is the financial-statement 'incurred' figure and is not wrong (Friedland p.36 fn.17 notes Schedule P incurred triangles do include IBNR), but a candidate asked for calendar-year reported losses would add IBNR that neither text includes. The worked example's arithmetic is unaffected: 7,200,000 + 1,100,000 + 400,000 = 8,700,000 and 8,700,000/12,000,000 = 72.5% both reproduce.
- source_rank: 2
- proposed_action: Add the reported-losses form (CY Reported = Paid + change in case reserves) alongside the incurred form and label which text uses which.
- applied: false
- fingerprint: 86900bb5ae57

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Definition diffed against Werner p.42 ('considers all premium and loss transactions that occur during the twelve-month calendar year without regard to the date of policy issuance, the accident date, or the report date') and Friedland p.39; CY earned premium formula matches Friedland p.40 verbatim (WP + beginning UEP - ending UEP); 'never develops' matches Friedland p.40 and Werner p.43; both worked examples recomputed independently before reading the answers - 5,000,000 - (2,400,000 - 1,800,000) = 4,400,000, and 7,200,000 + 1,100,000 + 400,000 = 8,700,000 with 8,700,000/12,000,000 = 72.5% and 7,800,000/12,000,000 = 65.0%, a 7.5 point gap, all as printed; wiki-links and LaTeX delimiters checked. Two minor findings open (F-001 Schedule P attribution, F-002 the reported-vs-incurred loss formula).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-43 (PDF pp.54-55), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.39-40 (PDF pp.45-46), and p.36 fn.17 (PDF p.42), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Re-read Friedland Ch.3 p.36 fn.17 (PDF p.42: 'the incurred loss triangles in Schedule P of the U.S. statutory annual statement include IBNR') and Werner Ch.3 p.43 (PDF p.55); Schedule P is not mentioned in Werner at all (full-text search: zero hits). The Schedule P, income statement and combined ratio clause is deleted; the bullet now says what the sources say: most insurers report financially by calendar year (Friedland p.40, PDF p.46), so the data is available quickly once the year ends and costs nothing extra to aggregate for ratemaking (Werner p.43, PDF p.55).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Werner Ch.3 p.43 (PDF p.55): 'Reported losses for the calendar year are equal to paid losses plus the change in case reserves'; Friedland Ch.3 p.39 (PDF p.45) the same. Added the display formula CY Reported Losses = Paid + dCase Reserves, relabelled the IBNR form 'CY Incurred Losses (finance)', and added a bullet saying both texts define CY reported losses without IBNR and that the IBNR-inclusive form is the finance department's 'incurred' (Friedland p.36, PDF p.42: 'finance departments usually include IBNR in their definition of incurred loss'). Example 2's arithmetic (finance incurred 8,700,000; 72.5%; 65.0%) is unchanged and still reproduces.

## [F-003] 'That is its one advantage' — both texts list more than one advantage of calendar-year data
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'A calendar year never develops'
- claim: Calendar year never develops: 'That is its one advantage and the source of its central defect.'
- evidence: Werner Ch.3 p.43 (PDF p.55): 'The advantage of calendar year aggregation is that data is available quickly once the calendar year ends. This information is typically collected for other financial reporting so it represents no additional expense'; 'The main disadvantage ... is the mismatch in timing between premium and losses.' Friedland Ch.3 p.40 (PDF p.46) lists two advantages (no future development; readily available) and gives the inability to address development as a disadvantage. So 'one advantage' is wrong, and Werner's central defect is the timing mismatch, not the fixity.
- source_rank: 2
- proposed_action: Say Friedland counts fixity as both an advantage and a disadvantage (cannot address development).
- applied: true
- fingerprint: 1117309c534c

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullet now ends: 'Friedland counts that as an advantage and also as a disadvantage: calendar-year data cannot address development.' (Friedland p.40, PDF p.46.) Werner's two advantages are now in the financial-reporting bullet.

## [F-004] Page says a CY loss ratio is not a pricing measure; Werner names a case where CY aggregation may be most appropriate for ratemaking
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: bullet 'Because of that mixing, a CY loss ratio is a profitability measure, not a pricing measure'
- claim: 'Because of that mixing, a CY loss ratio is a profitability measure, not a pricing measure. Ratemaking uses Accident Year or Policy Year losses against on-level earned premium.'
- evidence: Werner Ch.3 p.43 (PDF p.55): 'Calendar year aggregation for ratemaking analysis may be most appropriate for lines of business or individual coverages in which losses are reported and settled relatively quickly, such as homeowners.' The page rules out what the syllabus text allows; the same error was found on Ratemaking Data Organization (its F-001).
- source_rank: 2
- proposed_action: Replace with Werner's qualification.
- applied: true
- fingerprint: 991ad516e058

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Bullet now: 'Because of that mismatch, Werner & Modlin say calendar-year aggregation for ratemaking may be most appropriate for lines or coverages whose losses are reported and settled relatively quickly, such as homeowners. Accident Year aggregation matches premium and losses better, and Policy Year best' — Werner p.43 (PDF p.55).

## [F-005] Bullet says CY earned premium is the same number under policy-year aggregation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: last bullet, 'CY premium is unambiguous and is used everywhere'
- claim: 'CY earned premium is the same number under CY, AY and (with more work) PY loss aggregation, so calendar/accident year data ... is the standard ratemaking pairing.'
- evidence: Werner Ch.3 p.43 (PDF p.55): accident year aggregation of premium follows 'the same precept as calendar year premium and exposures—and in fact, the method is often referred to as calendar-accident year', but policy year premium is 'all premium and exposures earned on policies written during the year' and is not fixed until the policies expire. Werner Ch.5 Tables 5.10 and 5.12 (PDF p.81) give the same six policies CY 2011 EP of 912.50 and PY 2011 EP of 1,300.00 — different numbers. 'The standard ratemaking pairing' is not stated in either text; Friedland p.40 (PDF p.46) says only that 'actuaries often use calendar year exposures with accident year claims'.
- source_rank: 2
- proposed_action: Restate as: AY takes CY premium (Werner's calendar-accident year; Friedland's observation); PY premium is aggregated by policy effective date.
- applied: true
- fingerprint: 59b0e77bf64f

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Bullet rewritten to Werner p.43 (PDF p.55) and Friedland p.40 (PDF p.46); the PY claim and 'standard pairing' are removed and the bullet notes PY premium is aggregated by policy effective date.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Werner Ch.3 Data Aggregation and Friedland Ch.3 calendar/accident-year sections re-read this session; definition against Werner p.42; CY EP formula against Friedland p.40 (WP + beginning UEP - ending UEP); reported-loss formula against Werner p.43 and Friedland p.39; finance incurred incl. IBNR against Friedland p.36; never-develops against Friedland p.40 and Werner pp.42-43; accident-year mixing against Werner p.43 ('Losses, however, may include payments and reserve changes on claims from policies issued years ago'); both examples recomputed before reading the answers: 5,000,000 - (2,400,000 - 1,800,000) = 4,400,000; 7,200,000 + 1,100,000 + 400,000 = 8,700,000, /12,000,000 = 72.5%, (8,700,000 - 900,000)/12,000,000 = 65.0%, gap 7.5 points. Links and LaTeX checked.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-44 (PDF pp.54-56); Ch. 5 p.69 (PDF p.81), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.36, 39-40 (PDF pp.42, 45-46), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: F-001 and F-002 resolved; three new findings (F-003 minor, F-004 major, F-005 minor) fixed and resolved. Confidence medium: the page carries vault-authored worked examples and commentary (recomputed, not sourced).
