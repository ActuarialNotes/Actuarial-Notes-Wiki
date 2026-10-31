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
