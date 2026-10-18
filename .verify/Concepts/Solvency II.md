---
target: Concepts/Solvency II.md
created: 2026-10-18
---

## [F-001] MCT buffer stated as 1.5 x capital required; the MCT divides by 1.5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: critical
- status: open
- locus: Comparison with the MCT bullet; example answer, 'denominators' bullet
- claim: The MCT is factor-based with a 1.5 buffer multiplier; the Base Solvency Buffer is 1.5 times factor-based Capital Required, so a 195% MCT ratio means capital available is 1.95 x 1.5 = 2.9 times capital required.
- evidence: OSFI MCT Guideline (2024) §1.1.1: 'The resulting MCT capital requirements are then divided by 1.5 to derive the minimum capital requirements. The MCT ratio is expressed as the capital available over the minimum capital required.' §1.1.2: minimum capital requirements are 'the sum of the capital requirements at the target level for each risk component, less the diversification credit, divided by 1.5'; §1.2.1 repeats the ratio. The target level is CTE 99% over one year including a terminal provision (§1.1.1). The 2026 edition (effective 1 January 2026) carries the same §1.1.1, §1.1.2 and §1.2.1 wording. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024 With the guideline's denominator a 195% ratio means capital available is 1.95/1.5 = 1.3 times capital required, not 2.9.
- source_rank: 1
- proposed_action: Restate as minimum capital required = capital required / 1.5 and recompute (1.3x).
- applied: true
- fingerprint: 9f0e584f7d50

## [F-002] MCT said to state no single confidence level; it states CTE 99%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: major
- status: open
- locus: SCR bullet, last sentence; example answer, 'denominators' bullet
- claim: The MCT's factors are calibrated but its overall confidence level is not stated as a single figure; the Base Solvency Buffer has no single stated confidence level.
- evidence: MCT 2024 §1.1.1: 'regulatory capital requirements for various risks are set directly at a pre-determined target confidence level. OSFI has elected 99% of the expected shortfall (conditional tail expectation or CTE 99%) over a one-year time horizon including a terminal provision as a target confidence level' (footnote 2: VaR 99.5% or expert judgement where CTE was not practical). OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1 and footnote 2, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Restate: the MCT states its calibration as CTE 99% over one year.
- applied: true
- fingerprint: 20915a9ae037

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected this run: comparison bullet now says the MCT's target-level requirements (CTE 99%) are divided by 1.5 to give minimum capital required; example bullet restated and recomputed (1.95 / 1.5 = 1.3 times capital required at CTE 99%). Status left unverified: the rest of the page (Solvency II itself) was not checked in this packet.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Corrected this run: the SCR bullet's contrast now states the MCT's own calibration (CTE 99% over one year, including a terminal provision, divided by 1.5 for the minimum), and the example bullet says 'at a CTE 99% target level'.
