---
target: Concepts/Catastrophe Loss.md
created: 2026-09-12
---

## [F-001] Long-run cat-ratio experience period stated as 20-30 years; Werner says 10-30
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: minor
- status: open
- locus: Bullet 'Two ways to build the load' → 'Long-run historical'
- claim: 'express historical catastrophe losses as a ratio to a stable base … over 20-30 years'.
- evidence: Werner Ch. 6 p.98 (PDF p.110) describes the non-modelled cat procedure as using 'a long-term experience period (e.g., 10-30 years)', and adds the alternative of a long-term ratio of cat losses to exposure or to amount of insurance years — which the page otherwise reproduces correctly. The page's narrower 20-30 is attributed to Werner but is not what the text says. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Change 20-30 to 10-30 to match Werner p.98.
- applied: true
- fingerprint: b372daf6dace

## [F-002] Miscount of zero years and a wrong median in the ten-year cat history
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: minor
- status: open
- locus: Example 'Why Historical Averages Fail for Hurricane', first bullet of the answer
- claim: 'The median year is zero. Six of ten years had no catastrophe at all.'
- evidence: The stated history is 0, 1, 0, 4, 0, 0, 38, 2, 0, 1 ($M): five zeros, not six. Sorted, the 5th and 6th values are 0 and 1, so the median is $0.5M, not zero. The rest of the example reproduces exactly (sum 46 → mean 4.6M = 9.2% of 50M premium; dropping the 38M year gives 8/9 = 0.89M ≈ 1.8%; 4.6/0.9 ≈ a factor of five).
- source_rank: 5
- proposed_action: Correct to 'The median year is $0.5M' and 'Five of ten years'.
- applied: true
- fingerprint: 60fe16463f6a

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- resolves: F-001
- status: resolved
- note: Corrected in this PR: experience period now reads 10-30 years, matching Werner p.98.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- resolves: F-002
- status: resolved
- note: Corrected in this PR: 'median year is $0.5M' and 'Five of ten years', matching the listed history.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: The remove-and-replace principle checked against Werner p.94 ('removing extraordinary events … and replacing them with a provision more in line with long-term expectations') and the order-of-operations caveat there; the two load-building routes checked against p.98 (long-term ratio to non-cat losses or to amount of insurance years) and pp.98-99 (modelled AAL for hurricane/earthquake, 'simply added to the non-catastrophe loss amount'); both examples recomputed from scratch ($42M/50,000 = $840 non-cat PP, $600K/10,000 = $60 load, $900 total vs $1,000 unadjusted = 11% overstatement; ten-year history sum $46M, mean $4.6M = 9.2% of premium, ex-$38M mean $0.89M = 1.8%, ratio ~5x) — the median and zero-count claims failed that recomputation (F-002).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.94 and 98-99 (PDF pp.106, 110-111), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Two minor findings, both fixed: the 20-30 year window (Werner says 10-30) and the median/zero-count in example 2.
