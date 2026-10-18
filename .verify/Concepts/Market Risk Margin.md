---
target: Concepts/Market Risk Margin.md
created: 2026-10-18
---

## [F-001] New buffer computed as 1.5 x the added requirement; the MCT divides by 1.5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: critical
- status: open
- locus: example: stem's 'base solvency buffer', the 'Effect on the buffer' block, the fall and the return on capital
- claim: New BSB = $185M + 1.5($27M) = $225.5M; new MCT = 310/225.5 = 137%, a 31-point fall; return on capital = 0.73 x 3.87 / 40.5 = 7.0%.
- evidence: OSFI MCT Guideline (2024) §1.1.1: 'The resulting MCT capital requirements are then divided by 1.5 to derive the minimum capital requirements. The MCT ratio is expressed as the capital available over the minimum capital required.' §1.1.2: minimum capital requirements are 'the sum of the capital requirements at the target level for each risk component, less the diversification credit, divided by 1.5'; §1.2.1 repeats the ratio. The target level is CTE 99% over one year including a terminal provision (§1.1.1). The 2026 edition (effective 1 January 2026) carries the same §1.1.1, §1.1.2 and §1.2.1 wording. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024 The equity factor is 30% (§5.3.1, matches). Recomputed in python: MCR = 185 + 27/1.5 = 203; 310/203 = 152.7% against 310/185 = 167.6%, a 15-point fall; after-tax return on the $27M of added capital required 0.73 x 3.87 / 27 = 10.5%.
- source_rank: 1
- proposed_action: Restate with minimum capital required and recompute.
- applied: true
- fingerprint: 9e1bd5522c2e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected this run: stem input is minimum capital required $185M; New MCR = 185 + 27/1.5 = 203; ratio 168% -> 153%, a 15-point fall; return on the $27M capital required increase 10.5% (recomputed in python). The judgement that rested on 7.0% ('at or below most insurers' cost of capital', 'Conclusion: decline, on these numbers') was cut back to 'to be set against the insurer's cost of capital'; the rest of the paragraph is unchanged. Status left unverified: the rest of the page was not checked in this packet.

## [F-002] Added capital required ignores the diversification credit
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: minor
- status: open
- locus: example, 'Additional capital required' line
- claim: Additional capital required = 0.30 x $90M = $27M.
- evidence: MCT 2024 ch.8, §8.1: the diversification credit D = A + I - sqrt(A^2 + I^2 + 2RAI) with A = credit + market risk and R = 50%; raising A by $27M also raises D, so capital required rises by less than $27M unless the example states it ignores the credit. OSFI, Minimum Capital Test Guideline (2024), Guideline A, ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: State the simplification in the stem, or net the diversification credit.
- applied: false
- fingerprint: 1061de1890f7

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Applied (the finding's first option): the stem now ends '(Ignore the change the switch makes to the operational risk margin and the Diversification Credit.)' — ch.7's 8.50%-of-CR0 component moves with the market risk margin too, so both are named. Arithmetic unchanged and recomputed: 0.30 x 90 = 27; 185 + 27/1.5 = 203; 310/203 = 152.7%; 310/185 = 167.6%; 0.73 x 3.87/27 = 10.5%. The stem's 30% equity factor matches §5.3.1.

## [F-003] Diversification credit said to be between market and insurance risk
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- severity: minor
- status: open
- locus: last bullet ('It is the counterparty to the Diversification Credit')
- claim: '... which recognises that market risk and insurance risk do not crystallise together.'
- evidence: MCT 2024 ch.8: 'an explicit credit for diversification is permitted between the sum of credit and market risk requirements, and the insurance risk requirement'; §8.1 A = credit + market risk. The bullet leaves credit risk out of the block. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §5.3.1 (30% common-share factor), ch.7, ch.8 §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the blocks as ch.8 does.
- applied: true
- fingerprint: 29a42ec91b92

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Applied: the bullet now says the credit is permitted between the sum of the credit and market risk requirements and the insurance risk requirement, because losses across them are not perfectly correlated.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- status_set: in_review
- checks_run: equity factor §5.3.1; ch.7 and ch.8 aggregation; example recomputed in Python
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §5.3.1 (30% common-share factor), ch.7, ch.8 §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- note: F-002 resolved; F-003 found and fixed. Interest rate, real estate, FX and IFRS 17 bullets not checked. The rest of the page was not checked in this packet; in_review until it is.
