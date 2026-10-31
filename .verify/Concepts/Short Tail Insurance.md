---
target: Concepts/Short Tail Insurance.md
created: 2026-10-31
---

## [F-001] Settlement horizon tighter than Friedland's
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: lead paragraph
- claim: Page says short-tail claims are reported and settled 'typically within a year'.
- evidence: Friedland Ch. 1 p.15 (PDF 21): 'For some short-tail lines of insurance, such as some lines of property insurance and automobile physical damage, insurers generally know the value of ultimate claims within a relatively short period of time, often within one or two years after the end of the accident period.'
- source_rank: 2
- proposed_action: Transcribe Friedland's 'often within one or two years after the end of the accident period'.
- applied: true
- fingerprint: 8344b3e321b0

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: lead now transcribes Friedland's horizon.

## [F-002] Seasonality / quarterly-cohort claim in no source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, last bullet
- claim: Page says short-tail reserves are sensitive to seasonality and that quarterly rather than annual cohorts are common for that reason.
- evidence: 'seasonal' occurs nowhere in Friedland; Werner & Modlin uses it only for uneven earning patterns (p.56, PDF 68, boat owners). Friedland Ch. 7 p.85 (PDF 91) says only that the development technique is also applied to monthly, quarterly and semiannual data, with no link to seasonality or short-tail lines.
- source_rank: 2
- proposed_action: Cite a source for the claim or remove the bullet.
- applied: false
- fingerprint: fa58ed09d6a3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition and line examples vs Friedland p.15 and Part 3 intro (APD, property); small IBNR vs case at 12 months vs Friedland p.80 pie charts (APD AY2007: case 6%, IBNR 2%); investment income vs W&M Ch. 7; catastrophe example recomputed (46M/10 = 4.6M, 9.2%). Checked for Exam 5 only; ASTAM's study note not read.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 1 p.15 (PDF p.21); Part 3 intro pp.79-80 (PDF pp.85-86); Ch. 9 p.155 (PDF p.161), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.138 (PDF p.150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Agrees with Friedland and W&M after one horizon correction; one unsourced seasonality claim left open.
