---
target: Concepts/Ratemaking.md
created: 2026-09-12
---

## [F-001] Indicated rate change formula conflates the loss ratio and pure premium methods
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- severity: major
- status: open
- locus: second bullet, 'Indicated Rate Change' display formula and its notation lines
- claim: The page gives a single formula, Indicated Rate Change = (L + E_F)/(1 - V - Q_T) / Current Avg Rate - 1, and defines L as 'proj. loss & LAE ratio (or PP)' and E_F as 'fixed expense'.
- evidence: Werner & Modlin, Basic Ratemaking 5th ed., Ch. 8. The pure premium indication (printed p.142 = PDF p.154) is an indicated *rate* in dollars per exposure: P_I = (L + E_F)/(1 - V - Q_T) with L = pure premium (losses+LAE per exposure) and E_F = fixed expense per exposure; only this form is then compared to the current average rate. The loss ratio indication (printed pp.143-145 = PDF pp.155-157) is already a *factor*: Indicated Change = (L + E_F)/(1 - V - Q_T) - 1.0 with L = projected loss & LAE ratio and E_F = projected fixed expense *ratio* - Werner's worked example on PDF p.157 uses L=65%, E_F=6.5%, V=25%, Q_T=10% and gets (0.65+0.065)/(1-0.25-0.10) - 1 = +10.0% with no division by a rate. As written on this page, reading L as a loss ratio and then dividing by the current average rate of, e.g., $385 is a dimensional error that yields a meaningless number; the page's own worked example silently uses the pure premium reading ($250 + $40)/0.73 = $397.26, $397.26/$385 - 1 = +3.18%, which I reproduced independently. E_F is also labelled 'fixed expense' with no indication that it is a ratio in one branch and dollars per exposure in the other.
- source_rank: 2
- proposed_action: Split into the two formulas Werner states separately: the loss ratio indication (ratios, minus 1.0, no division by the current rate) and the pure premium indication (dollars per exposure, then divided by the current average rate). Do not present them as one expression.
- applied: false
- fingerprint: 821ffd27faee

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Fundamental insurance equation (Premium = Losses + LAE + UW Expenses + UW Profit) confirmed verbatim in Werner Ch.8 derivation (PDF p.154) and Ch.1 summary (PDF p.4); four CAS principles checked word-by-word against the Statement of Principles; pure premium vs loss ratio equivalence confirmed against Werner PDF p.160; both worked examples recomputed from scratch before reading the stated answers (250,000/1,000 = $250; (250+40)/0.73 = 397.26, /385 - 1 = +3.18% = +3.2% as stated); indicated-change formula compared against Werner's two separate formulas — see F-001
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 overview (PDF pp.2,4) and Ch. 8 pp.142-148 (PDF pp.154-160), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (1988), Principles 1-4
- note: Definition, fundamental equation, CAS principles and both worked examples check out. One open major finding (F-001) on the composite indicated-rate-change formula; confidence held at medium for that reason.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.8 pp.141-143 (PDF pp.153-155, pages rendered and read): pure premium method — 'Indicated Average Rate = [Pure Premium (including LAE) + Fixed UW Expense Per Exposure] / [1.0 - Variable Expense % - Target UW Profit %]', an indicated rate, compared with the current rate for a change (p.146); loss ratio method — Indicated Change = [(L+E_L)/P_C + F]/[1.0 - V - Q_T] - 1.0, with no division by a rate. The single composite formula is replaced by the two, with notation lines distinguishing pure premium and fixed expense per exposure from the loss & LAE ratio and fixed expense ratio. The worked example (290/0.73 = 397.26; 397.26/385 - 1 = +3.18%) uses the pure premium form and still reproduces.

## [F-002] 'Conflating development and trend double-counts' — Werner's overlap fallacy says applying both is not a double count
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 'Historical data must be adjusted on three axes'
- claim: 'Skipping any one biases the indication; conflating development and trend double-counts.'
- evidence: Werner Ch.6 pp.120-121 (PDF pp.132-133): 'It may seem that trending and developing losses results in overlapping adjustments; however, this is not the case.'
- source_rank: 2
- proposed_action: Say applying both is not a double count.
- applied: true
- fingerprint: c8b8a91b8db1

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Bullet now ends 'applying both development and trend is not a double count (Werner & Modlin's overlap fallacy)'.

## [F-003] Unsourced framings: aggregation as a two-way trade-off, reserving as 'retrospective', indication 'rarely' the filed change
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: opening paragraph; bullets on data organization and on the filed change
- claim: 'Contrast with loss reserving, which is retrospective.'; data organizations 'each trading timeliness against how cleanly it matches premium to loss'; 'The calculated indication is rarely the filed change'.
- evidence: Werner Ch.3 p.42 (PDF p.54) sets three aggregation objectives (match losses and premium; most recent data; minimize cost of collection and retrieval), not two — the same finding as Ratemaking Data Organization F-002. Neither Werner nor Friedland calls reserving 'retrospective'; Friedland Ch.3 p.39 (PDF p.45) describes the unpaid claim estimate as providing for all claims incurred as of the accounting date. 'Rarely' is not in Werner; Ch.13 p.257 (PDF p.269) and the overview (PDF p.5) say only that regulatory, operational and market considerations and techniques such as lifetime value analysis are used along with the indications to decide the rates charged.
- source_rank: 2
- proposed_action: State the three objectives; describe reserving as estimating the unpaid cost of claims already incurred; 'need not be' for 'rarely'.
- applied: true
- fingerprint: aba35930ef7e

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: All three framings restated as described (Werner p.42; Friedland p.39; Werner p.257).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Fundamental insurance equation against Werner p.141 (rendered); ratemaking prospective against the Statement of Principles Part II and Werner p.6; four principles checked word by word against the Statement (Principle 4: 'reasonable and not excessive, inadequate, or unfairly discriminatory if it is an actuarially sound estimate of the expected value of all future costs associated with an individual risk transfer'); marketing goals, competition and legal restrictions as considerations against the Statement Part I; both indication formulas against Werner pp.141-143; equivalence against pp.146-147; lifetime value against p.257. Examples recomputed before reading: 250,000/1,000 = $250; (250 + 40)/0.73 = 397.26; 397.26/385 - 1 = +3.18%.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.5-6 (PDF pp.17-18); Ch. 3 p.42 (PDF p.54); Ch. 6 pp.120-121 (PDF pp.132-133); Ch. 8 pp.141-148 (PDF pp.153-160); Ch. 13 p.257 (PDF p.269), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (1988), Parts I-II, pp.1-2, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 p.39 (PDF p.45), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: F-001 (major) resolved; two new minor findings fixed and resolved. Confidence medium: vault-authored examples.
