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
