---
target: Concepts/Loss Ratio Method.md
created: 2026-09-12
---

## [F-001] Indicated change double-rounded to +6.9% instead of +6.8%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: nit
- status: open
- locus: Example 'Straightforward Loss Ratio Indication', final line of the answer
- claim: Indicated factor 1.0685, therefore 'Indicated change = +6.9%'.
- evidence: 0.78/0.73 = 1.0684932, so the indicated change is +6.85% before rounding and +6.8% at one decimal. The stated +6.9% comes from rounding the factor to 1.0685 first and then rounding 6.85% up. Every other figure in the example reproduces (PLR 0.67; 0.72/0.67 = +7.5%; 0.78/0.67 = +16.4%).
- source_rank: 5
- proposed_action: Change +6.9% to +6.8%.
- applied: true
- fingerprint: 383498f0583c

## [F-002] Multi-year loss ratio described as 'equally weighted' when it is premium-weighted
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: minor
- status: open
- locus: Example 'A Full Indication from Raw Data', closing paragraph ('Two judgment calls…')
- claim: 'whether to weight the three years equally (as here, by premium volume) or to give more weight to the most recent'.
- evidence: The example computes 19,870/27,784 = 71.5%, i.e. it sums losses and premium across years. Werner Ch. 8 p.147 (PDF p.159) states: 'Many companies sum projected ultimate loss and LAE across all years and divide by projected earned premium at present rates… This is equivalent to weighting each year's loss and LAE ratio (pure premium) by the relevant premium (or exposure).' Premium-weighting is therefore NOT equal weighting: equal weights on 73.0/72.6/69.0 give 71.5% only by coincidence of the premium spread (71.53% both ways here), and the parenthetical contradicts the word it qualifies. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Drop 'equally' (the calculation is premium-weighted); Werner's own wording on p.147 is the model.
- applied: false
- fingerprint: 61d57edf64de

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- resolves: F-001
- status: resolved
- note: Corrected in this PR: +6.9% changed to +6.8% (0.78/0.73 - 1 = 6.849%).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Both indication forms diffed against Werner's loss ratio indication formula (numerator loss & LAE ratio + fixed expense ratio, denominator 1.0 - V - Q_T) and against his own simple example (65% + 6.5% over 1 - 25% - 10% = +10%); the no-double-counting rule checked against Werner p.139's VPLR/PLR definitions; both worked examples recomputed from scratch before reading the answers — example 1 (0.78/0.73, all-variable 0.72/0.67, and the 0.78/0.67 error case) and example 2 all three years developed, trended at 1.05^3.5/2.5/1.5, LAE-loaded at 1.11 and on-levelled (6,541/6,715/6,614K on 8,960/9,245/9,579K; 19,870/27,784 = 71.5%; 0.785/0.75 = +4.7%), plus the 20/30/50 recency claim (70.9% < 71.5%).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.143-147 (PDF pp.155-159), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Two findings: a double-rounded +6.9% (fixed, F-001) and a parenthetical that calls the premium-weighted average 'equal' weighting (F-002, open — prose, not fixed here).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Werner Ch.8 p.147 (PDF p.159) re-read: 'Many companies sum projected ultimate loss and LAE across all years and divide by projected earned premium at present rates ... This is equivalent to weighting each year's loss and LAE ratio (pure premium) by the relevant premium ... Alternatively, some companies select weights for each accident year's experience, often giving more weight to the more recent years.' The closing paragraph now says the example is premium-weighted (summing losses and premium), offers selected weights favouring recent years as the alternative, and gives the 20/30/50 result explicitly: 0.2(73.01%) + 0.3(72.64%) + 0.5(69.05%) = 70.9%, (0.709 + 0.07)/0.75 - 1 = +3.9%.

## [F-003] Unsourced practice claim and a non-Werner rationale for when the method is preferred
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullets 3-5 ('The method's advantage ...', 'It produces a change ...', 'The method is equivalent ...')
- claim: '... the practical choice where the exposure base is dollar-denominated (payroll, sales, amount of insurance) or unreliable. Its requirement is a clean rate-change history, without which on-levelling is guesswork.' '... it presumes the current rate structure is a sensible starting point.' 'Most filings use the loss ratio method for the overall indication and the pure premium method for class relativities.'
- evidence: Werner Ch.8 p.146 (PDF p.158): the loss ratio method 'is preferable if exposure data is not available or if the product being priced does not have clearly defined exposures' (example: CGL, whose sub-lines have different exposure bases) — payroll, the WC exposure base, is clearly defined, so 'dollar-denominated' is not Werner's criterion; the pure premium approach is preferable 'if it is very difficult to accurately calculate premium at current rate level', e.g. many rating-variable changes. p.143 (PDF p.155): 'The loss ratio method is the more widely used of the two'. p.148 (PDF p.160): most appropriate 'where the indicated rate change is a critically important statistic'. p.147 (PDF p.159): equivalence 'depends on consistent data and assumptions', and a parallelogram approximation can break it. 'Most filings ... pure premium for class relativities' appears nowhere in Werner Ch.8.
- source_rank: 2
- proposed_action: Restate the three bullets in Werner's terms; delete the filings claim.
- applied: true
- fingerprint: a9f89d5f5727

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullets 3-5 rewritten to Werner pp.143, 146-148 (PDF pp.155, 158-160); the 'most filings' sentence and 'presumes the current rate structure' are deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Both indication forms against Werner p.143 (rendered page: Indicated Change = [(L+E_L)/P_C + F]/[1.0 - V - Q_T] - 1.0) and the VPLR/PLR definitions p.139; Werner's own check (0.65 + 0.065)/(1 - 0.25 - 0.10) - 1 = +10% (p.145); new-line limitation against p.146; equivalence against pp.146-147. Example 1 recomputed before reading: 0.78/0.73 = 1.06849 (+6.8%), 0.72/0.67 - 1 = +7.5%, 0.78/0.67 - 1 = +16.4%. Example 2 recomputed: losses 6,541.3/6,715.1/6,613.9K, on-level premium 8,960/9,245/9,579K, LRs 73.0/72.6/69.0%, 19,870/27,784 = 71.52%, (0.715 + 0.07)/0.75 = 1.0467 (+4.7%).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.139 (PDF p.151); Ch. 8 pp.141-148 (PDF pp.153-160), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: F-002 resolved (F-001 was resolved 2026-09-12); one new minor finding fixed and resolved. Confidence medium: vault-authored worked examples.
