---
target: Concepts/Capital Required.md
created: 2026-10-09
---

## [F-001] Effective requirement stated as 1.5 x capital required; the MCT divides by 1.5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: critical
- status: open
- locus: bullet 'The Base Solvency Buffer is 1.5 x capital required'; both worked examples' BSB lines and the funding paragraph
- claim: The Base Solvency Buffer is 1.5 x capital required and the denominator of the MCT ratio, so capital available must exceed 1.5 times capital required (BSB = 1.5 x $140M = $210M; 1.5 x $154.6M = $231.9M; $364M needed).
- evidence: OSFI's MCT guideline (2024), §1.1.1: 'The resulting MCT capital requirements are then divided by 1.5 to derive the minimum capital requirements. The MCT ratio is expressed as the capital available over the minimum capital required.' §1.1.5 repeats it. The phrase 'base solvency buffer' occurs nowhere in the guideline; it is LICAT's term (the life insurers' test). OSFI Minimum Capital Test guideline (2024), §1.1.1 and §1.1.5, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Restate the denominator as minimum capital required = capital required ÷ 1.5 (§1.1.1) and recompute both examples and the capital-needed figure.
- applied: false
- fingerprint: df876888be6a

## [C-001] Open critical — held for the Exam 6C campaign
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: disputed
- note: F-001 (critical) is open: the page multiplies capital required by 1.5 where OSFI's MCT guideline divides. Found while resolving Base Solvency Buffer in Wave 1; the page itself was outside that run's files, so it is recorded here for the Exam 6C campaign rather than fixed.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected this run against MCT 2024 §1.1.1-§1.1.2, §1.2.1. The 'Base Solvency Buffer is 1.5 x capital required' bullet is restated as 'minimum capital required is capital required divided by 1.5', the denominator of the MCT ratio, so at 100% capital available is two-thirds of capital required and at 150% it equals it; a note says Base Solvency Buffer is LICAT's name (A-4 p.3). Lead gives the CTE 99% target level; formula block adds MCR = CR / 1.5. Example recomputed in python: MCR 140/1.5 = 93.33, ratio 330/93.33 = 353.6% (was 157%); after growth CR = 140+17.6-3 = 154.6, MCR = 103.07, ratio 320.2% (was 142%); fall 33.4 points, still above 150% (the 'breaches the supervisory target' claim no longer follows and was removed); capital to hold the ratio 330 x 154.6/140 = 364.4, $34M more (unchanged, since the ratio is scale-free).

## [F-002] Operational risk margin described as a charge on liabilities
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: minor
- status: open
- locus: 'The four risk margins' bullet, operational risk
- claim: Operational risk - a formula-based charge on premium, liabilities and growth.
- evidence: MCT 2024 §7.1: 'The two risk drivers used to determine the operational risk margin are capital required and premiums, subject to a cap' (8.50% of CR0, premium factors, 2.50% on growth above 20%, capped at 30% of CR0). Liabilities are not a driver. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §7.1, §7.2.3, §7.2.4, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Restate from §7.1.
- applied: true
- fingerprint: 6c132e975a59

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated this run from §7.1-§7.2.4: a charge on capital required and on premiums, including premium growth above a 20% threshold, capped at 30% of capital required before the operational risk margin and diversification credit.

## [F-003] Diversification credit described as insurance vs market risk only
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: minor
- status: open
- locus: 'The Diversification Credit' bullet
- claim: The Diversification Credit recognises that insurance risk and market risk are not perfectly correlated.
- evidence: MCT 2024 ch.8: the credit is 'between the sum of credit and market risk requirements, and the insurance risk requirement'. OSFI, Minimum Capital Test Guideline (2024), Guideline A, ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the two blocks as ch.8 does.
- applied: true
- fingerprint: f35e604efb87

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Restated this run from ch.8: allowed between the insurance risk requirement and the sum of the credit and market risk requirements, because losses across those categories are not perfectly correlated.

## [F-004] Unsourced claims on the margins and PACICC
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: minor
- status: open
- locus: insurance risk sub-bullet ('Usually the largest component'); market risk ('on the asset side'); example's last paragraph (PACICC)
- claim: Insurance risk is usually the largest component; market risk covers exposures on the asset side; PACICC's failure research describes insurers that grew fast at inadequate rates.
- evidence: MCT 2024 ch.4 and ch.5 do not rank the components; §5.1 applies the interest rate shock to interest rate sensitive assets *and liabilities*, so market risk is not asset-side only; the PACICC claim needs the KPMG PACICC reading, not in this packet. OSFI, Minimum Capital Test Guideline (2024), Guideline A, ch.4 intro, ch.5 intro, §5.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Delete the unsourced clauses; restate market risk from §1.1.2.
- applied: true
- fingerprint: 0e6b580ff67c

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-004
- status: resolved
- note: Deleted 'usually the largest component', replaced the market risk line with §1.1.2's list (interest rate, foreign exchange, equity, real estate, right-of-use assets, other), and deleted the PACICC paragraph. Insurance and credit risk lines restated from ch.4 intro / §4.2.1 and §1.1.2; growth and reinsurance bullets restated from §4.2, §7.2.2, §7.2.3, §4.3.2.2, §4.3.3.1-§4.3.3.2.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: MCT 2024 read at the sections cited; every bullet mapped to a section; example recomputed in python before restating (93.33, 353.6%, 154.6, 103.07, 320.2%, 33.4 points, 364.4); Capital_Required.svg (waterfall to 158) consistent; wiki links resolve.
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.1.5, §1.2.1; ch.4 intro, §4.2.1; §4.3.2.2, §4.3.3.1, §4.3.3.2; ch.5 intro, §5.1; ch.6 intro; §7.1, §7.2.2, §7.2.3, §7.2.4; ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), pp.3, 5 (MCT capital requirement = minimum capital required; ORSA and internal targets), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- note: Medium: the growth example and its funding paragraph are vault-authored (recomputed); the 'other margins unchanged' premise is the example's own simplification (the operational risk margin moves with premiums under §7.1).
