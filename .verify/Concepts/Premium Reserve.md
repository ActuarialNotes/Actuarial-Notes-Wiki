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
