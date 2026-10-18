---
target: Concepts/Registered Reinsurance.md
created: 2026-10-18
---

## [F-001] Unregistered-reinsurance treatment and denominator misnamed against the MCT
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: major
- status: open
- locus: 'The capital consequence' bullet and the example ('Compute the buffer')
- claim: Ceded liabilities reduce Capital Required and the Base Solvency Buffer only where the reinsurer is registered or collateralised; without either the cedant gets no capital relief (example: gross BSB $210M less 18% of the $105M credited = $191.1M; the $15M 'gets nothing').
- evidence: OSFI Guideline A-4 (Dec 2017) p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' A full-text search of the MCT guideline (2024) for 'base solvency buffer' returns 0 hits; its denominator is 'minimum capital required' = target-level capital required less the diversification credit, divided by 1.5 (§1.1.1-§1.1.2). OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf; OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024 MCT 2024 §4.3.3.2 and §2.3.1: amounts receivable and recoverable from an unregistered reinsurer, to the extent not covered by amounts payable or acceptable collateral, 'are deducted from capital available' - so an unsecured unregistered cession reduces the ratio's numerator, which is more than 'no capital relief'; §4.3.3.1 gives credit for unregistered reinsurance secured under an RSA or by acceptable letters of credit. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.3.3.1, §4.3.3.2, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the denominator minimum capital required and restate the unsecured case from §4.3.3.2 (deduction from capital available); recompute the example on that basis.
- applied: false
- fingerprint: efa2ebb10eb5

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Applied. 'The capital consequence' bullet is restated from §4.3.3.2/§2.3.1 (unsecured unregistered recoverables are deducted from capital available) and §4.3.3.1 (credit for unregistered reinsurance only where secured); the sentence saying ceded liabilities reduce capital required only where registered or collateralised is deleted, since §4.2.1 nets all reinsurance held. Example: denominator renamed minimum capital required, the 18% reduction is marked as the example's own premise, the question asks for the deduction too, and the answer now says the uncollateralised $15M is deducted from capital available. Recomputed: credited 80 + 25 = 105; 210 - 0.18 x 105 = $191.1M; deduction $15M. The example's premise itself is F-002.

## [F-002] Example credits a collateralised unregistered cession as if registered and omits the unregistered margin
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- severity: major
- status: open
- locus: example 'Capital Credit and the Registration Status', stem premise and 'Credited cessions'
- claim: Credited cessions = $80M registered + $25M collateralised + $0 uncollateralised; each reduces minimum capital required by 18% of the amount credited.
- evidence: MCT 2024 §4.2.1 measures the incurred-claims margin net of the asset for incurred claims on all reinsurance contracts held, so the uncollateralised $15M is netted there too, not credited at $0. §4.3.3.3 adds a margin of 20% of the unregistered exposure (A + B + C - D), reducible to zero only by collateral and premiums payable in excess of that exposure: the $25M cession secured by exactly $25M of collateral still carries 20% x 25 = $5M at the target level, and the $15M one 20% x 15 = $3M. §4.3.3.4 caps letters of credit at 30% of unregistered reinsurance assets in aggregate. So collateral equal to the exposure does not give a registered cession's treatment. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.2.1, §4.3.2.2, §4.3.3.1, §4.3.3.2, §4.3.3.3, §4.3.3.4, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: A writer rebuilds the example on §4.2.1 (net margin), §4.3.3.2 (deduction) and §4.3.3.3 (20% margin less excess collateral), and a different checker verifies it. Not fixed here: it needs new figures, not a restatement.
- applied: false
- fingerprint: abff7c08c51b

## [F-003] 'Full capital credit' for registered cessions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead sentence; figure Registered_Reinsurance.svg label 'full credit' and its alt text
- claim: 'the MCT gives full capital credit for liabilities ceded to a registered reinsurer'
- evidence: MCT 2024 §4.3.2.2: a risk factor is applied to premiums associated with unexpired coverage on reinsurance contracts held from registered reinsurers and to the asset for incurred claims recoverable from them (reference §6.1) — the credit is net of a credit-risk requirement, not 'full'. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.2.1, §4.3.2.2, §4.3.3.1, §4.3.3.2, §4.3.3.3, §4.3.3.4, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Delete 'full' from the lead and the figure label/alt text in scripts/figures_exam_6c.py (regenerate with --only 'Registered Reinsurance').
- applied: false
- fingerprint: ba18a015f18a

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- status_set: in_review
- checks_run: §2.3.1, §4.2.1, §4.3.2-§4.3.3.4 against the bullet and example; example recomputed in Python
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.2.1, §4.3.2.2, §4.3.3.1, §4.3.3.2, §4.3.3.3, §4.3.3.4, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- note: F-001 resolved. F-002 (major: the example's credit premise) and F-003 (minor: 'full capital credit', lead and figure) open; a file with an open major stays in_review. B-3 and IFRS 17 bullets not checked.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Applied: 'full' deleted from the lead ('the MCT gives capital credit for liabilities ceded to a registered reinsurer'), from the figure's arrow label ('credit') and from its alt text in scripts/figures_exam_6c.py; Registered_Reinsurance.svg regenerated with --only 'Registered Reinsurance' (2 lines changed, nothing else regenerated).

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- status_set: in_review
- checks_run: §2.3.1, §4.2.1, §4.3.2-§4.3.3.4 against the lead, bullet, example and figure; example recomputed in Python
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §2.3.1, §4.2.1, §4.3.2.2, §4.3.3.1, §4.3.3.2, §4.3.3.3, §4.3.3.4, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- note: F-001 and F-003 resolved. F-002 (major: the example's credit premise) open for a writer; a file with an open major stays in_review. B-3 and IFRS 17 bullets not checked.
