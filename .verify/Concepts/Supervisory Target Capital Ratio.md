---
target: Concepts/Supervisory Target Capital Ratio.md
created: 2026-10-09
---

## [F-001] MCT denominator named 'Base Solvency Buffer', a LICAT term
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: 'What a breach brings' bullet and the worked example ('a base solvency buffer of $150 million')
- claim: Growth raises the Base Solvency Buffer; an insurer holds a 158% MCT ratio with capital available of $237 million and a base solvency buffer of $150 million.
- evidence: OSFI's MCT guideline (2024), §1.1.1: 'The resulting MCT capital requirements are then divided by 1.5 to derive the minimum capital requirements. The MCT ratio is expressed as the capital available over the minimum capital required.' §1.1.5 repeats it. The phrase 'base solvency buffer' occurs nowhere in the guideline; it is LICAT's term (the life insurers' test). OSFI Minimum Capital Test guideline (2024), §1.1.1 and §1.1.5, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Use the guideline's term, minimum capital required, throughout; the 150% target arithmetic is otherwise on the right basis.
- applied: false
- fingerprint: 029812012d47

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected this run: the bullets and the example use 'minimum capital required' (A-4 p.3; MCT §1.1.1). Example arithmetic unchanged and rechecked in python: 237/150 = 158.0%; 191/150 = 127.3%; 1.5 x 150 + 46 = 271; 271/150 = 180.7%.

## [F-002] Supervisory target stated as uniform; the guideline lets the Superintendent set an alternative
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: major
- status: open
- locus: last bullet ('The target is uniform; the internal target is not')
- claim: OSFI applies 150% to all.
- evidence: MCT 2024 §1.2.1: OSFI has an 'industry-wide supervisory target ... of 150%', but 'the Superintendent may, on a case-by-case basis, establish an alternative supervisory target (in consultation with an insurer) based upon the insurer's individual risk profile.' OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Restate as industry-wide, with the case-by-case alternative.
- applied: true
- fingerprint: 61e5c5c89b01

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Restated this run from §1.2.1: OSFI sets 150% for the industry, but the Superintendent may, case by case and in consultation with an insurer, establish an alternative supervisory target based on its risk profile.

## [F-003] Consequences of a breach not in the assigned sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: minor
- status: open
- locus: 'What a breach brings' bullet, 'Not a minimum, and not optional' bullet, 'three-level ladder' and the example's escalation sentence
- claim: A breach brings a capital restoration plan with dates, restrictions on dividends, increased reporting frequency, likely limits on growth, and escalation through OSFI's intervention stages; below 150% the insurer has not breached a legal requirement; each breach triggers a stronger response.
- evidence: Neither the MCT guideline nor Guideline A-4 lists those measures. A-4 p.4 says: failure to maintain capital above the Supervisory Targets 'is indicative of material safety and soundness concerns'; an insurer approaching or below them 'will attract increased supervisory attention, which would generally include an early warning intervention status (i.e. stage 1). The intensity and nature of supervisory intervention would depend on the circumstances'; near the Minimums OSFI 'would be very concerned about the ongoing viability of the insurer'. MCT §1.2.1: below the internal target, inform OSFI immediately with plans to return. OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.4, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf; OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Restate to A-4 p.4 and MCT §1.2.1; delete the unsourced list.
- applied: true
- fingerprint: 633c3b921391

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Restated this run: 'Below it' bullet and the example's consequence sentence now say what A-4 p.4 says (material safety and soundness concerns; increased supervisory attention, generally stage 1; intensity depends on circumstances); the ladder bullet gives MCT §1.2.1's internal-target duty and A-4's 'very concerned about ongoing viability' at the minimum; the unsourced list and the 'trend beats level' / 'reduced access to capital markets' commentary were deleted, the trend bullet restated to A-4's 'approach or fall below'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: MCT 2024 §1.1.1, §1.2.1 read; A-4 pp.3-6 read; every bullet mapped to a sentence of one or the other; example recomputed in python (158.0%, 127.3%, 271, 180.7%); Supervisory_Target_Capital_Ratio.svg regenerated (running insurer 235.4%, green band); wiki links resolve.
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), pp.3-5 (Minimums and Supervisory Targets defined; 100%/150% for MCT/BAAT; stage 1; Internal Targets from the ORSA, set above Supervisory Targets; industry-wide simplifying assumptions), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- note: Medium: the earthquake example and its internal-target derivation are vault-authored (recomputed); A-4 requires only that internal targets come from the ORSA and sit above the supervisory target.
