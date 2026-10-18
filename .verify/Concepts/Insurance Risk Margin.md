---
target: Concepts/Insurance Risk Margin.md
created: 2026-10-18
---

## [F-001] Margin increase carried to the denominator at 1.5x; the MCT divides by 1.5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: critical
- status: open
- locus: example answer, 'An increase of $15 million in the margin' paragraph
- claim: A $15 million margin increase flows through to a $22.5 million increase in the Base Solvency Buffer (1.5x); on capital available of $400M and a buffer of $210M the ratio falls from 190% to 172%.
- evidence: OSFI MCT Guideline (2024) §1.1.1: 'The resulting MCT capital requirements are then divided by 1.5 to derive the minimum capital requirements. The MCT ratio is expressed as the capital available over the minimum capital required.' §1.1.2: minimum capital requirements are 'the sum of the capital requirements at the target level for each risk component, less the diversification credit, divided by 1.5'; §1.2.1 repeats the ratio. The target level is CTE 99% over one year including a terminal provision (§1.1.1). The 2026 edition (effective 1 January 2026) carries the same §1.1.1, §1.1.2 and §1.2.1 wording. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024 A $15M rise in a target-level requirement raises minimum capital required by 15/1.5 = $10M (ignoring the diversification credit); 400/210 = 190.5% falls to 400/220 = 181.8%, not 172%.
- source_rank: 1
- proposed_action: Restate with minimum capital required (+$10M) and recompute (190% -> 182%).
- applied: true
- fingerprint: 06d902434140

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected this run: '$10 million increase in minimum capital required ($15M / 1.5)'; ratio 190% -> 182% (recomputed in python: 190.5%, 181.8%). Status left unverified: the rest of the page was not checked; see the open findings below.

## [F-002] Claim liabilities margin computed without the guideline's 1.10 multiplier
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: major
- status: open
- locus: definition bullet 'Claim liabilities margin' and the example's margin calculations
- claim: Claim liabilities margin = factor x net claim liabilities by line (example: 0.70(500)(0.15) + 0.30(500)(0.25) = $90M).
- evidence: MCT 2024 §4.2.1: the margin for liability for incurred claims is calculated by class 'by the applicable risk factors multiplied by 1.10': 'Margin for liability for incurred claims = 1.10 x sum over class of insurance of risk factor x (best estimate LIC for insurance contracts issued less the best estimate asset for incurred claims for reinsurance contracts held)'. Unless the example's 15%/25% are meant to include the 1.10, the margins are $99M and $115.5M (+$16.5M). OSFI, Minimum Capital Test Guideline (2024), Guideline A, §4.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Add the 1.10 multiplier to the definition, or state that the example's factors already include it; if not, recompute the example. Not fixed here: whether the example's factors include it is the author's call.
- applied: false
- fingerprint: 1f28c883c7b9

## [F-003] Diversification credit said to be between insurance and market risk
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: minor
- status: open
- locus: last bullet ('It is the target of the Diversification Credit')
- claim: The Diversification Credit recognises that insurance risk and market risk do not peak together and reduces the sum of the two.
- evidence: MCT 2024 ch.8: the credit is 'between the sum of credit and market risk requirements, and the insurance risk requirement'. OSFI, Minimum Capital Test Guideline (2024), Guideline A, ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the blocks as ch.8 does: insurance risk vs credit plus market risk.
- applied: false
- fingerprint: b320a2a88112
