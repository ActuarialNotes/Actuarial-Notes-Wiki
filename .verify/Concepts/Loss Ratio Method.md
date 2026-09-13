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
