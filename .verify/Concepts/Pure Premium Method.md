---
target: Concepts/Pure Premium Method.md
created: 2026-09-12
---

## [F-001] Exposure-trend aside restated a +6.2% indication as +6.3%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: minor
- status: open
- locus: Example 'Pure Premium Indication', closing note after the answer
- claim: Omitting exposure trend (dividing by 5,000 instead of 5,126) gives a pure premium of $304.43 and 'an indication of +6.3%'.
- evidence: Recomputed from the page's own figures: 1,522,167/5,000 = 304.43; (304.43+25)/0.73 = 451.28; 451.28/425 - 1 = +6.18%, i.e. +6.2%, not +6.3%. The main indication on the same page (+3.8%) reproduces exactly, so this is an isolated slip in the aside. Formula itself matches Werner Ch. 8 p.141-142 (PDF pp.153-154): Indicated Avg Rate = (Pure Premium incl LAE + Fixed UW Expense per Exposure)/(1.0 - Variable Expense % - Target UW Profit %).
- source_rank: 5
- proposed_action: Change +6.3% to +6.2%.
- applied: true
- fingerprint: 1bdc779307f2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- resolves: F-001
- status: resolved
- note: Corrected in this PR: the no-exposure-trend aside now reads +6.2%, which is what 451.28/425 - 1 gives.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Indicated rate formula diffed word-for-word against Werner's pure premium indication formula and its derivation from the fundamental insurance equation; full worked example recomputed from scratch before reading the answer (1.15 CDF, 1.04^2.5 = 1.10302, 1.01^2.5 = 1.02519, PP $296.95, rate $441.03, +3.77%); the pure-premium/loss-ratio equivalence example re-derived independently (LR 69.87%, factor 1.0352; F% = 25/425 = 5.88% forces exact agreement at +3.77%); new-line-only and no-on-levelling claims checked against Werner pp.143,146; advisory loss-cost claim checked against Werner p.29; wiki-links, embed and $$ balance checked.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.141-142 and 145-147 (PDF pp.153-154, 157-159), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 2 p.29 (PDF p.41) — NCCI loss costs adjusted by each insurer for its own expenses, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: One arithmetic slip found and fixed (F-001, +6.3% -> +6.2%); formulas and the main indication reproduce exactly.
