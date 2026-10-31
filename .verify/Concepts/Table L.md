---
target: Concepts/Table L.md
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
- claim: Says k "is the per-occurrence [[Loss Elimination Ratio|loss elimination ratio]] of the insured's retention".
- evidence: Fisher et al. 2019 Ch.3 p.48 and p.84 (Formula 3.8) define k = (E - E{A_D})/E, the excess ratio for the per-occurrence limit, i.e. the share of expected loss ABOVE D; p.89 fn49 says it was called "ER" in the pre-2019 NCCI manual. Fisher never uses "loss elimination ratio" (full-text search: 0 hits for "elimination"). The linked page [[Loss Elimination Ratio]] (Werner & Modlin) defines LER(d) = E[X^d]/E[X], the share BELOW the deductible, which is 1 - k, so the link sends a reader to the complement of k. The examiner's reports do call k the "LER" in the loss-limitation sense (e.g. CAS Exam 8 Fall 2012 Q18 report: "LER = (1,000,000/10)/1,000,000"; 2013 Q19 "Loss Elimination Ratio = 0.21/0.75"), so the term is used both ways; the page now says which.
- source_rank: 2
- proposed_action: Replaced the clause with: exam solutions often call k the "LER", the share of loss the per-occurrence limit eliminates from the insured's losses, which is 1 - LER in the deductible sense of [[Loss Elimination Ratio]].
- applied: true
- fingerprint: e709c66967ac

## [F-002] Table M_D to Table L conversion stated without the aggregate limit it holds at
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'From a limited table.' bullet
- claim: phi_lim from a Table M_D converts to phi* = phi_lim(1-k)+k (the writer's derivation; Fisher does not print it).
- evidence: Derivation checked from Fisher p.48 and Formulas 3.6/3.8 (p.84): with A_D/E{A_D} = r' and rE = r'E{A_D}, E[(A_D/E - r)+] = (E{A_D}/E) * phi_lim(r') = (1-k) phi_lim(r'), so phi*(r) = phi_lim(r')(1-k) + k, where r' = r/(1-k) — the two charges are read at the same aggregate limit, not the same entry ratio. The page left that condition out. Recomputation (rank 5) confirms the identity; Fisher's Q17 solution (p.119) uses the same split in dollars: 0.2(750,000) + 0.242(600,000).
- source_rank: 2
- proposed_action: Add 'for the same aggregate limit' to the conversion.
- applied: true
- fingerprint: 5dea3f3e1c61

## [F-003] Idea callout says the insurer 'keeps' the charge
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- severity: nit
- status: open
- locus: [!idea] callout
- claim: 'of every dollar of expected loss, how much does the insurer keep after both limits act?'
- evidence: The Table L charge is the loss removed from the insured's share by the two limits (Fisher p.84: 'Both the per-occurrence limit and the aggregate limit remove losses from the portion the insured owes'), i.e. what the insurer bears; 'keep' reads as retained premium.
- source_rank: 2
- proposed_action: 'keep' -> 'falls to the insurer'.
- applied: true
- fingerprint: 50925c829655
