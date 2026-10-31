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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Fixed in this pass: the clause now says exam solutions call k the 'LER' (share the per-occurrence limit eliminates), which is 1 - LER in the deductible sense of [[Loss Elimination Ratio]].

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Fixed in this pass: 'for the same aggregate limit' added; the identity itself recomputed from Formulas 3.6/3.8.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Fixed in this pass: 'keep' -> 'falls to the insurer'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: every claim read against the reading; Exhibits 3.24-3.27 recomputed (k=0.08, phi*-k = 0.13, 0.17 at r=1.2, 1.0; phi*(1.0)=0.25; phi*(2.5)=k=0.08); psi*=phi*+r-1 checked against Formula 3.9; phi_lim(1-k)+k conversion and convexity derived from Formulas 3.6/3.8 (stop-loss transform of F_D); numbers compared with cas8-2012-q18, 2013-q13, 2014-q12 (none on the page)
- sources_checked: Fisher et al., Individual Risk Rating (CAS Exam 8 study note, 2019), Ch.3 PDF pp.48-49, 78-79, 83-88, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: New page, checked whole against Fisher et al. ch.3. Kept as plain derivations: the (1-k) conversion (now stated at the same aggregate limit) and convexity of phi*_D, whose aggregate part is a Table M charge of F_D (Fisher p.58 property 4 applied to F_D). F-001..F-003 fixed in this pass.
