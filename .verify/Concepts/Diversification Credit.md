---
target: Concepts/Diversification Credit.md
created: 2026-10-18
---

## [F-001] Buffer computed as 1.5 x capital required; the MCT divides by 1.5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: critical
- status: open
- locus: example answer: the buffer line, the rho = 1 paragraph and 'What that means'
- claim: The Base Solvency Buffer is 1.5 x $181.7 = $272.5 million; at rho = 1 the buffer is $310.5 million, $38.0 million more; on capital available of $450M the MCT ratio falls from 165% to 145%, through the supervisory target; the credit is worth 20 points.
- evidence: OSFI MCT Guideline (2024) §1.1.1: 'The resulting MCT capital requirements are then divided by 1.5 to derive the minimum capital requirements. The MCT ratio is expressed as the capital available over the minimum capital required.' §1.1.2: minimum capital requirements are 'the sum of the capital requirements at the target level for each risk component, less the diversification credit, divided by 1.5'; §1.2.1 repeats the ratio. The target level is CTE 99% over one year including a terminal provision (§1.1.1). The 2026 edition (effective 1 January 2026) carries the same §1.1.1, §1.1.2 and §1.2.1 wording. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024 Recomputed in python: MCR = 181.7/1.5 = 121.13 and 207/1.5 = 138.0 (+16.9); 450/121.13 = 371.5% and 450/138 = 326.1%, a 45-point fall that does not cross 150%.
- source_rank: 1
- proposed_action: Restate with minimum capital required and recompute (121.1, 138.0, +16.9; 372% -> 326%; 45 points).
- applied: true
- fingerprint: d8dc19180b5b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected this run: minimum capital required $121.1M and $138.0M (+$16.9M); ratio 372% -> 326%; 'worth 45 points'; 'through the supervisory target' deleted (it no longer follows). The D formula and R = 50% on the page match §8.1. Status left unverified: the rest of the page was not checked in this packet.
