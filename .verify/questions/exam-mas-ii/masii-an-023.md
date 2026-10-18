---
target: questions/exam-mas-ii/masii-an-023.md
created: 2026-10-18
---

## [F-001] Simple exponential smoothing is in Cowpertwait §3.4, which the MAS-II outline excludes
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- severity: major
- status: open
- locus: whole question
- claim: A MAS-II question on simple exponential smoothing forecasts, filed under 'Time Series with Constant Variance'.
- evidence: MAS-II Content Outline 2026 p.4 (https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256:babf0548…): Cowpertwait 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)'. Cowpertwait contents (https://obalkyknih.cz/file/toc/233741/pdf, sha256:64c8d1ac…, PDF p.2): '3.4 Exponential smoothing and the Holt-Winters method ... 3.4.1 Exponential smoothing'. No other MAS-II reading covers it. A candidate practising this item studies a section CAS has excluded. Same scope issue as Exam MAS-II (CAS).md F-002 (open, major) for the page's objective D5.
- source_rank: 1
- proposed_action: Mark off_syllabus: true or remove from the MAS-II bank, decided with Exam MAS-II (CAS).md F-002. Scope decision; not auto-fixed.
- applied: false
- fingerprint: ebdc1837361c

## [F-002] Stem does not state the multi-step forecast rule; NIST describes an alternative that gives no listed option
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- severity: minor
- status: open
- locus: stem, final sentence; explanation 'its forecast for every future month is the current level'
- claim: 'Calculate the forecast of the claim count for month 15, made at the end of month 12' with no rule for forecasting beyond one step.
- evidence: FPP3 §8.1 (https://otexts.com/fpp3/ses.html, read 2026-10-18, sha256:be59a506…): 'Simple exponential smoothing has a flat forecast function ... all forecasts take the same value, equal to the last level component', which gives 151.2 (C). NIST/SEMATECH §6.4.3.2 (https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc432.htm, sha256:107a4679…) describes 'bootstrapping' forecasts beyond the data as S_(t+1) = alpha y_origin + (1 - alpha) S_t; from a_12 = 151.2 with y_origin = 140 that gives 148.96 then 147.17 for month 15, which is in no option. Both rank 3; FPP3 is the standard model forecast and the key follows it, but a reader taught the NIST procedure finds no correct option.
- source_rank: 3
- proposed_action: If the question is kept, add to the stem that the forecast for every future month equals the latest smoothed level.
- applied: false
- fingerprint: 935c91914384

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: in_review
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed., §8.1 Simple exponential smoothing, 'Flat forecasts', page read 2026-10-18, sha256:be59a506b32748ede644be78b4509e9660d3920d21dea766901d5e9b3af71749 — https://otexts.com/fpp3/ses.html; NIST/SEMATECH e-Handbook of Statistical Methods, §6.4.3.2 Forecasting with Single Exponential Smoothing, sha256:107a46792d21ed5714d01205286236b5dc51f32a09838c71324e81220ac0586d — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc432.htm; Cowpertwait & Metcalfe, Introductory Time Series with R (Springer 2009), contents, library TOC scan PDF pp.1-2, sha256:64c8d1acd2d515e84acce255da1766a7b544603ad1096f40b2ed7949bc4d791c — https://obalkyknih.cz/file/toc/233741/pdf; CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), p.4 Cowpertwait chapter scope, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Recomputed: a11 = 154.0, a12 = 151.2, flat forecast 151.2, option C; swapped weights 166.0 then 145.2 (E, B); naive 140 (A); a11 154.0 (D). Arithmetic correct and the key matches FPP3, but open major F-001 (Cowpertwait §3.4 excluded from MAS-II) keeps it in_review under content-plan §1.2 rule 1. Minor F-002: multi-step rule unstated.
