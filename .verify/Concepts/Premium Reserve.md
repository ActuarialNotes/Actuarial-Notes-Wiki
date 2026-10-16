---
target: Concepts/Premium Reserve.md
created: 2026-10-11
---

## [F-001] Most of the page's scope is not in any Exam 7 reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- severity: minor
- status: open
- locus: lead; 'Sign' bullet (EBUB name); 'Where it arises' audit and reinsurance sub-bullets; 'Collectability'; both examples
- claim: A premium reserve covers audit premium (EBUB), reinstatement, swing-rated and loss-rated premiums, sliding-scale and profit commissions; positive reserves are called premium asset, accrued retrospective premium, or EBUB.
- evidence: Exam 7's reading for A5 is Teng and Perkins, which treats only retrospectively rated (and similar loss-sensitive) plans and expressly sets aside other premium assets: 'There may be a premium asset on prospectively rated polices due to changes in exposure, but this topic will not be discussed here' (PDF p.4); it names the asset EBNR, not EBUB (p.1). Friedland (2022) mentions reinstatement premium only as a premium to track separately (PDF p.22). No source read covers audit premium, swing/loss-rated premiums or commissions as a premium reserve. The formula, the retro sub-bullet, the PDLD sentence and collectibility (T&P p.18) are supported, and the reinstatement and EBUB examples' arithmetic is right (1.2 - 0.8 = 0.4; 0.04 x 30 = 1.2).
- source_rank: 2
- proposed_action: A writer should source the audit, reinsurance and commission material (or narrow the page to what the reading supports), and give the EBNR name Teng and Perkins use.
- applied: false
- fingerprint: 51f33bbd75d1

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- status_set: in_review
- checks_run: formula, retro material and collectibility against Teng and Perkins; examples recomputed
- sources_checked: Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996, pp.611-647), PDF pp.1-4, 13, 18, sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf; Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF p.22, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf
- note: in_review: the larger part of the page (audit, reinsurance, commissions) has no source among Exam 7's readings (F-001).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdc
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Fixed by the writer (fix D): the page is narrowed to Teng and Perkins plus one Friedland sentence. Gone: the EBUB name (now EBNR, T&P PDF p.1), audit premium, swing/loss-rated reinsurance premiums, sliding-scale and profit commissions, and their examples. Re-read this session: the lead and formula T&P p.1, p.3, p.13; retro formula p.4 (2.1); sign, admitted asset and Berry/Fitzgibbon retro reserve pp.1-2; CPDLD definition, >1 then <1 and its reasons pp.11-12; CPDLD x expected future loss emergence p.13; collectibility p.18 (Section 6, outside the excluded Section 5, pp.14-17); prospectively rated premium asset set aside p.4; reinstatement premium Friedland PDF p.22.

## [C-002] New CPDLD example recomputed; Feldblum's discussion not covered
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdc
- date: 2026-10-16
- locus: example; objective A5
- note: Example recomputed blind before reading the working: recent 12,000 x 1.492 = 17,904, less 18,400 = -496; older 14,200 + 2,500 x 0.556 = 15,590, less 14,200 = 1,390; total 894; 400 x 0.556 = 222.4. Agrees. 1.492 and 0.556 are T&P's first and second CPDLD ratios (PDF p.12), and the two cases follow their worked 12/31/94 computation (p.13: no prior adjustment -> expected loss x CPDLD1 is the ultimate; one adjustment -> premium booked at the first adjustment + future emergence x CPDLD2). The example uses one 'premium booked' for both the first-adjustment and current booked premium, which T&P say are 'close to but not equal' (p.13) — a simplification, not an error. The page serves Exam 7 task 5 (outline A.ii.4: 'Forecast premium reserves (e.g., reserves for retrospective premiums)'). The assigned reading also includes Feldblum's discussion, Sections 1-2 (PCAS LXXXV 1998; https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins_Discussion_of_Paper.pdf, sha256:1c572191d2239553f306dc29ba1186f3c3477e06b1652562ab55acd4c8bc04ed, PDF pp.1-3, 9 read): his comparison of the PDLD and Fitzgibbon methods and why premium is not simply chain-laddered. The page says nothing from it and nothing it contradicts; a writer may want to add it.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdc
- date: 2026-10-16
- status_set: verified
- confidence: high
- checks_run: every claim against Teng and Perkins and Friedland p.22; Section 5 exclusion respected; example recomputed blind and against T&P's own p.13 computation; links; objective A5
- sources_checked: Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996, pp.611-647), PDF pp.1-4, 11-13, 18, sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf; Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.22, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; CAS, Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16), PDF pp.3-6 (tasks A.ii.4 = 5, A.v.1-3 = 15-17; Teng and Perkins excluding Section 5 with Feldblum Sections 1-2; Friedland A.v.1-A.v.3), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: F-001 closed by the writer's narrowing; nothing on the page lacks a source.
