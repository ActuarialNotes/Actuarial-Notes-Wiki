---
target: Concepts/Unregistered Reinsurance.md
created: 2026-10-18
---

## [F-001] Unregistered-reinsurance treatment and denominator misnamed against the MCT
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: major
- status: open
- locus: example stem and answer ('Capital released by the collateralised option')
- claim: Ceded liabilities reduce the Base Solvency Buffer by 18% of the amount credited; the collateralised option releases 0.18 x $50M = $9M of capital.
- evidence: OSFI Guideline A-4 (Dec 2017) p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' A full-text search of the MCT guideline (2024) for 'base solvency buffer' returns 0 hits; its denominator is 'minimum capital required' = target-level capital required less the diversification credit, divided by 1.5 (§1.1.1-§1.1.2). OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf; OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024 MCT 2024 §4.3.3.2 and §2.3.1: amounts receivable and recoverable from an unregistered reinsurer, to the extent not covered by amounts payable or acceptable collateral, 'are deducted from capital available' - so an unsecured unregistered cession reduces the ratio's numerator, which is more than 'no capital relief'; §4.3.3.1 gives credit for unregistered reinsurance secured under an RSA or by acceptable letters of credit. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.3.3.1, §4.3.3.2, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the denominator minimum capital required and restate the unsecured case from §4.3.3.2 (deduction from capital available); recompute the example on that basis.
- applied: false
- fingerprint: b62fd8d06e9a

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Applied. The stem's '18% of the amount credited' premise is deleted (§4.2.1 nets all reinsurance held, so neither option changes the incurred-claims margin) and restated to §4.3.3.2/§2.3.1: the recoverable not covered by acceptable collateral is deducted from capital available. The stem now states the simplifications (the letter of credit acceptable and within §4.3.3.4's 30% aggregate limit; the capital requirement on the collateral ignored). Recomputed: capital released $50M (was $9M); value at 10% = $5.0M (was $0.9M); collateral cost 19.1 - 18 = $1.1M. On these numbers the collateralised treaty is cheaper, so the two sentences of arithmetic conclusion are restated to the recomputed figures; the 'MCT position' bullet now says $50M. The 20% unregistered margin of §4.3.3.3 is the same under both options (collateral equal to the exposure is not in excess of it), so it does not move the comparison.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- status_set: in_review
- checks_run: §2.3.1, §4.2.1, §4.3.3.1-§4.3.3.4 against the example; example recomputed in Python
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.2.1, §4.3.2.2, §4.3.3.1, §4.3.3.2, §4.3.3.3, §4.3.3.4, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- note: F-001 resolved; the example's conclusion moved with the recomputation (collateral now worth $5.0M a year against $1.1M). Lead, formula and the other bullets not checked. The rest of the page was not checked in this packet; in_review until it is.
