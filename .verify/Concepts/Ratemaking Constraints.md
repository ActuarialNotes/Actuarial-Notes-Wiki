---
target: Concepts/Ratemaking Constraints.md
created: 2026-09-12
---

## [F-001] Annual shortfall of $1.55M is not reproducible from the stated premium
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: major
- status: open
- locus: Example 'A Regulatory Cap', the shortfall calculation and the closing 'a loss of about $1.55M a year'
- claim: '$25,000,000 x 0.073/1.18 ≈ $1,550,000'.
- evidence: The residual inadequacy is correct: 1.18/1.10 - 1 = +7.27%. But the shortfall is then that 7.27% applied to premium, i.e. 25,000,000(0.0727) = $1.82M if the $25M is earned at the filed level, or 25,000,000(1.10)(0.0727) = $2.00M if the $25M is earned at current (pre-filing) rates. The page's extra division by 1.18 discounts a figure that is already expressed relative to the filed level and has no construction behind it; even the 'deficiency as a share of adequate premium' reading gives (1.18-1.10)/1.18 = 6.78% → $1.69M. The stated $1.55M understates the cost of the constraint by roughly 15-20% and is repeated in the closing sentence.
- source_rank: 5
- proposed_action: Pick and state the basis for the $25M (at current rates vs at filed rates) and use 25,000,000 x 0.0727 = $1.82M (or x1.10 x 0.0727 = $2.00M), correcting both occurrences.
- applied: false
- fingerprint: f16d7f1359ac

## [F-002] Page rules out a substitute rating variable that Werner lists as a company response
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: major
- status: open
- locus: Example 'When a Rating Variable Is Prohibited', final paragraph
- claim: 'What is not an actuarial response is proxying the prohibited variable through a correlated substitute chosen for that purpose. That is a legal question with an obvious answer…'
- evidence: Werner Ch. 13 p.241 (PDF p.253) lists four actions a company can take with respect to regulatory restrictions, the last being: 'In the case of banned or restricted usage of a particular variable (e.g., insurance credit scores), a company can use a different allowable rating variable (e.g., payment history with the company) that it believes can explain some or all of the effect associated with the restricted variable.' The other three — challenge the regulation legally, revise underwriting guidelines to limit business written at inadequate rates, change marketing directives to steer away from inadequately rated applicants — are also absent from the page, which offers only 're-fit the model without the variable' and 'monitor the mix shift'. A candidate asked to list responses to a prohibited variable would lose the syllabus's own keyed item and would be contradicting the text if they wrote the page's sentence. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: List Werner p.241's four actions, and if the professionalism caveat is kept, distinguish it from Werner's allowable-substitute-variable action rather than ruling that action out.
- applied: false
- fingerprint: 1ac199c73951

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: The four constraint categories checked against Werner Ch. 13 (regulatory pp.239-241, operational p.241, marketing p.244 heading) — caps on the overall change and on any individual insured's change, hearing/notice thresholds, prohibited variables (insurance credit score), prescribed techniques, and actuary/regulator disagreement over assumptions; the page's response list compared with Werner p.241's four actions (finding F-002); Principle 4 wording checked in the SOP; example 1 recomputed from scratch (1.18/1.10 - 1 = +7.27%; shortfall against $25M premium) — the stated $1.55M did not reproduce under any construction (F-001).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 13 pp.239-241 (PDF pp.251-253), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988), sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — p.2, Principle 4
- note: Two open major findings: an unreproducible shortfall figure, and a normative claim that contradicts Werner's listed company response.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Recomputed: 1.18/1.10 - 1 = 7.27%. Example now states its basis (the $25M is premium earned at the filed +10% level) and gives 25,000,000 x 0.0727 = $1.82M; the closing sentence now says the premium falls about $1.82M a year short of the indication. The unsourced divisor of 1.18 is gone.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Werner Ch.13 p.241 (PDF p.253), re-read: the four company actions are legal challenge; revised underwriting guidelines (where 'take all comers' does not apply); changed marketing directives; and, for a banned or restricted variable, a different allowable rating variable (e.g. payment history with the company). The sentence ruling out a substitute variable is deleted and replaced by Werner's four actions. Example 1's 're-file with better support' option, unsourced, is replaced by Werner's legal-challenge action and its non-pricing option restated as Werner's underwriting and marketing actions.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Each constraint bullet rewritten to and checked against Werner: regulatory (approval, overall/individual change limits, notice/hearing thresholds, prescribed techniques, disagreement and its cost) pp.239-241; legal (credit score limits/bans, gender, underwriting-but-not-rating) Ch.9 p.158 and Ch.13 p.240; competitive (arc-shaped profit curve, shopping on rate change, close/retention/dislocation, lifetime value and retention models) pp.243-257; operational (systems, data capture, cost-benefit) pp.241-243; capping and premium transition rules Ch.14 pp.280-284. Professional-position paragraph rewritten to the SOP's own scope statement and Principle 4. Example 1 recomputed (7.27%, $1.82M). Unsourced claims deleted: territory restrictions, occupation/education bans, 'two rate levels tracked for on-levelling', 're-deriving the indication' sentence.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.13 pp.239-246, 255-257 (PDF pp.251-258, 267-269); Ch.9 p.158 (PDF p.170); Ch.14 pp.280-284 (PDF pp.292-296), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; reinstated May 2021), Section I p.1, Section II p.2 Principle 4, Section III p.4, Section IV p.5, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf
- note: Both major findings fixed from the source. Medium: the two examples are vault-authored scenarios.
