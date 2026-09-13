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
