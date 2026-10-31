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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Fixed in this pass, same wording as on Table L.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Fixed in this pass: 'less variable, with lower charges above an entry ratio of 1'; last sentence qualified 'usually ... at entry ratios above 1' per Fisher pp.78-79.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: every claim read against the reading; Fisher's own example re-run (1.588, 929,000 -> ELG 29, 0.1583x490,000+160,000=237,567) and the page's example recomputed (k=0.25, factor 1.60, 2,016,000, r=1.5, 108,000+300,000=408,000); (1+0.8k)/(1-k) >= 1 and increasing in k checked; numbers compared with cas8-2012-q20, 2013-q19, 2014-q17, 2017-q17, 2019-q14 (none on the page)
- sources_checked: Fisher et al., Individual Risk Rating (CAS Exam 8 study note, 2019), Ch.3 PDF pp.66, 78-79, 84, 89-90, 119, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: New page, checked whole against Fisher et al. ch.3. 'Divided by standard premium ... percent of standard premium' is arithmetic on the reading's total. 'Where ... a Table L [is] available, the adjustment is not needed' follows from p.83 (Table L prices both limits in one table) with p.89. F-001, F-002 fixed in this pass.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:58Z/2de4
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Delta only: two new bullets. E{A_D} = E(1-k) follows from the page's k = (E - E{A_D})/E (fn.49, Formula 3.10) and the entry ratio over expected limited loss (PDF p.89 example: 750,000/490,000). k as the excess/total ratio a retro plan applies to the total loss estimate: Fisher p.18 and fn.49 ('This excess ratio, k'). Writer-flagged sentence (per-occurrence charge as a ratio to standard premium, divided by the expected loss ratio, gives k): kept as plain arithmetic on the reading's definitions — the charge is kE, and E is the expected loss ratio times premium (Fisher p.21, PDF p.26: 'the expected loss ratio to be applied to guaranteed-cost premium to estimate the total expected losses', 'per-occurrence excess losses as a ratio to total losses'), so (kE/P)/(E/P) = k. No question's numbers on the page.
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §5.2 p.84-85 (PDF pp.89-90) Formula 3.10, fn.49 and worked example; Ch.2 p.18 (PDF p.23) and p.21 (PDF p.26), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Older content verified this morning (run be9b) against Fisher Ch.3; only the delta re-checked.
