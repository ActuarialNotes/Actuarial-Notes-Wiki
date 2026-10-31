---
target: Concepts/Insurance Charge Reflecting Loss Limitation (ICRLL).md
created: 2026-10-31
---

## [F-001] k identified with the deductible loss elimination ratio, its complement
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- severity: major
- status: open
- locus: definitions bullet, k
- claim: Says k "is the per-occurrence [[Loss Elimination Ratio|loss elimination ratio]] of the retention".
- evidence: Fisher et al. 2019 Ch.3 p.48 and p.84 (Formula 3.8) define k = (E - E{A_D})/E, the excess ratio for the per-occurrence limit, i.e. the share of expected loss ABOVE D; p.89 fn49 says it was called "ER" in the pre-2019 NCCI manual. Fisher never uses "loss elimination ratio" (full-text search: 0 hits for "elimination"). The linked page [[Loss Elimination Ratio]] (Werner & Modlin) defines LER(d) = E[X^d]/E[X], the share BELOW the deductible, which is 1 - k, so the link sends a reader to the complement of k. The examiner's reports do call k the "LER" in the loss-limitation sense (e.g. CAS Exam 8 Fall 2012 Q18 report: "LER = (1,000,000/10)/1,000,000"; 2013 Q19 "Loss Elimination Ratio = 0.21/0.75"), so the term is used both ways; the page now says which.
- source_rank: 2
- proposed_action: Replaced the clause with: exam solutions often call k the "LER", the share of loss the per-occurrence limit eliminates from the insured's losses, which is 1 - LER in the deductible sense of [[Loss Elimination Ratio]].
- applied: true
- fingerprint: c32907252428

## [F-002] Lower-charge consequence stated without the reading's conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'Why the size is adjusted upward.' bullet
- claim: 'enters Table M at a larger ELG, whose column is flatter and less skewed ... A plan with a per-occurrence limit therefore has a lower aggregate charge phi(r_G) than the unlimited Table M charge at the same entry ratio'
- evidence: Fisher p.78-79: the per-occurrence limit reduces the variance of severity and of limited aggregate loss, so 'lower deductibles usually lead to lower insurance charges for entry ratios greater than 1'; p.95: more expected claims -> lower variance of entry ratios -> smaller charge for entry ratios above 1. The reading qualifies the result ('usually', 'for entry ratios greater than 1'); 'flatter' (0 hits) is not its word.
- source_rank: 2
- proposed_action: Restate as a less variable distribution with lower charges above an entry ratio of 1, and qualify the last sentence with 'usually' and 'at entry ratios above 1'.
- applied: true
- fingerprint: 096adc3906ce
