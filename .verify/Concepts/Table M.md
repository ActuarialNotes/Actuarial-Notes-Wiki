---
target: Concepts/Table M.md
created: 2026-10-31
---

## [F-001] ELG-based 1998 table conflated with the new countrywide table
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'Expected loss groups.' bullet and 'Table M compared with Table L' first bullet
- claim: 'The NCCI's Table M has been published by ELG rather than by expected claim count' and 'Table M (the NCCI's countrywide Table of Aggregate Loss Factors) ... is updated for inflation by updating its ELG table'.
- evidence: Fisher p.89: 'the 1998 NCCI Table M was published by Expected Loss Group (ELG) rather than by expected number of claims'; p.90 fn50: 'The Table of Expected Loss Groups changed over time, with inflation'; p.96-97: the NCCI's new countrywide Table of Aggregate Loss Factors is entered by expected claim count, the state/hazard group severity relativity adjusting the expected number of claims; p.66 fn31: claim-count grouping is less subject to inflation. So the ELG table, and its updating for inflation, belongs to the 1998 table, not the countrywide one.
- source_rank: 2
- proposed_action: Say the 1998 Table M was published by ELG, and that when Table M was entered by ELG it was kept current for inflation by updating the ELG table.
- applied: true
- fingerprint: 70ad6e083e62

## [F-002] ELG 31 lower bound differs from Exhibit 3.28
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- severity: nit
- status: open
- locus: example 'Choosing the Expected Loss Group'
- claim: '$630,001–$720,000 is ELG 31'
- evidence: Fisher p.90 Exhibit 3.28 prints ELG 31 as '630,000-720,000' (ELG 30 '720,001-830,000'). The example's own figures (684,000 -> ELG 31) are unaffected.
- source_rank: 2
- proposed_action: 630,001 -> 630,000.
- applied: true
- fingerprint: a77f55687316

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Fixed in this pass: '1998 Table M was published by ELG'; 'When it was entered by ELG, it was kept current for inflation by updating the ELG table'.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Fixed in this pass: 630,001 -> 630,000, as Exhibit 3.28 prints it.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:20Z/be9b
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: every claim read against the reading; worked examples recomputed (horizontal slicing of Exhibits 3.12-3.20 reproduces phi(0.2..3.0) and psi(1.0)=0.25, vertical check phi(1.2)=0.21; ELG example 760,000x0.9=684,000 -> ELG 31, 0.19x760,000=144,400); numbers compared with cas8-2013-q12, 2014-q13, 2014-q15, 2015-q16, 2017-q16, 2018-q14, 2019-q12 (none on the page); named terms searched in the source
- sources_checked: Fisher et al., Individual Risk Rating (CAS Exam 8 study note, 2019), Ch.3 PDF pp.45-49, 58, 66-75, 78-79, 89-90, 94-97, 115, 119, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: New page, checked whole against Fisher et al. ch.3. Kept as a plain derivation from p.66 fn31 and p.90 fn50: an un-updated ELG table puts an inflated expected loss in a larger ELG than its claim count warrants (the writer's own sentence). 'Model ... plausible, precise and misleading charges' is p.115 (Q8 answer). The ELG example's phi(1.5)=0.19 is labelled illustrative. F-001, F-002 fixed in this pass.
