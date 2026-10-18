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

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Applied. The example's factors are the guideline's own: its stem gives personal property 15% and commercial liability 25%, which are §4.2.1's table factors for Personal property (15%) and Liability (25%), not already-multiplied inputs, so the multiplier was applied: current margin 1.10 x (52.5 + 37.5) = $99M, after the shift 1.10 x (30 + 75) = $115.5M, increase $16.5M, minimum capital required +16.5/1.5 = $11M, ratio 400/210 = 190.5% -> 400/221 = 181.0% (was 182%). Recomputed in Python. The definition bullet now states §4.2.1's measure (best estimate LIC excluding the risk adjustment, less the best estimate asset for incurred claims on reinsurance held, times the class factor, multiplied by 1.10).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Applied: the bullet now says the credit is permitted between the insurance risk requirement and the sum of the credit and market risk requirements, because losses across them are not perfectly correlated (ch.8 introduction; §8.1: A = credit + market risk, I = insurance risk, R = 50%).

## [F-004] Reinsurance said to reduce the margin only where registered or collateralised
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- severity: major
- status: open
- locus: bullet 'Reinsurance reduces it'
- claim: 'Reinsurance reduces it, but only where the reinsurer is registered or the cession collateralised.'
- evidence: MCT 2024 §4.2.1 measures the margin for liability for incurred claims on the best estimate liability 'less the best estimate asset for incurred claims for reinsurance contracts held' with no registration condition. Unregistered reinsurance is handled separately: §4.3.3.2 deducts amounts receivable and recoverable from an unregistered reinsurer, to the extent not covered by premiums payable or acceptable collateral, from capital available, and §4.3.3.3 adds a margin of 20% for reinsurance ceded to unregistered insurers. §4.3.2.2 applies a credit-risk factor to recoverables from registered reinsurers. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §4.2.1 (margin for liability for incurred claims, x 1.10, risk factor table), §4.3.2.2, §4.3.3.2, §4.3.3.3, ch.7, ch.8 §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Restate from §4.2.1 and §4.3.3.2-§4.3.3.3: the margin is net of reinsurance held; unsecured unregistered recoverables are deducted from capital available, with a margin of their own.
- applied: true
- fingerprint: 2f17b07bffd7

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-004
- status: resolved
- note: Applied: the bullet now says the claim liabilities margin is measured net of the asset for incurred claims on reinsurance contracts held; that unregistered recoverables not covered by amounts payable or acceptable collateral are deducted from Capital Available, with a margin of their own; and keeps the credit-risk substitution clause (§4.3.2.2).

## [F-005] Increase carried to minimum capital required without the operational risk margin or diversification credit
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- severity: minor
- status: open
- locus: example answer, 'An increase of ... in the margin' paragraph
- claim: The margin increase flows through to minimum capital required as increase / 1.5.
- evidence: MCT 2024 ch.7: the operational risk margin includes 8.50% of total capital required before the operational risk margin and diversification credit, so a higher insurance risk margin raises it; ch.8 §8.1: the diversification credit D = A + I - sqrt(A^2 + I^2 + 2RAI) also changes with I. The pass-through is exact only if both are held fixed, which the example did not say. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §4.2.1 (margin for liability for incurred claims, x 1.10, risk factor table), §4.3.2.2, §4.3.3.2, §4.3.3.3, ch.7, ch.8 §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: State the simplification in the question.
- applied: true
- fingerprint: a0571ccff917

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-005
- status: resolved
- note: Applied: the question now ends '(Ignore the change the shift makes to the operational risk margin and the Diversification Credit.)'.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- status_set: in_review
- checks_run: 1.10 multiplier and risk-factor table §4.2.1; reinsurance netting §4.2.1, §4.3.3.2-§4.3.3.3; ch.7 and ch.8 aggregation; example recomputed in Python
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §4.2.1 (margin for liability for incurred claims, x 1.10, risk factor table), §4.3.2.2, §4.3.3.2, §4.3.3.3, ch.7, ch.8 §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- note: F-002, F-003 resolved; F-004, F-005 found and fixed. Not checked: the lead's 'normally the largest part of Capital Required', the formula's three-part split, the premium-liabilities and catastrophe bullets, and the example's second-order effects. The rest of the page was not checked in this packet; in_review until it is.
