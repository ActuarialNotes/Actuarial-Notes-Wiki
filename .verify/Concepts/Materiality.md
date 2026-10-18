---
target: Concepts/Materiality.md
created: 2026-10-18
---

## [F-001] MCT denominator named 'Base Solvency Buffer', a LICAT term
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: major
- status: open
- locus: example stem
- claim: An insurer has ... a Base Solvency Buffer of $150 million (so an MCT ratio of 173%).
- evidence: OSFI Guideline A-4 (Dec 2017) p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' A full-text search of the MCT guideline (2024) for 'base solvency buffer' returns 0 hits; its denominator is 'minimum capital required' = target-level capital required less the diversification credit, divided by 1.5 (§1.1.1-§1.1.2). OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf; OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the MCT's denominator as the guideline does - minimum capital required (target-level capital required less the diversification credit, divided by 1.5); the ratio arithmetic is otherwise unaffected where the figure is a given input.
- applied: false
- fingerprint: a71bca33c89b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Applied: 'Base Solvency Buffer' renamed to the MCT's term, minimum capital required, per A-4 p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' MCT 2024 §1.1.1: 'The MCT ratio is expressed as the capital available over the minimum capital required.' Stem now reads 'minimum capital required of $150 million (so an MCT ratio of 173%)'. 260/150 = 173.3%; the 170% internal-target threshold 1.70 x 150 = 255, a $5M fall, and the $9M item after tax (260 - 0.73 x 9)/150 = 169.0% all reproduce.

## [F-002] Internal-target threshold labelled pre-tax and pre-tax at once
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- severity: minor
- status: open
- locus: example answer, fourth reference point
- claim: '... so **$5 million** pre-tax (roughly $7M pre-tax at a 27% rate).'
- evidence: Recomputed on the page's figures: the MCT ratio reaches the 170% internal target when capital available falls to 1.70 x 150 = 255, a $5M fall in capital available, i.e. after tax; the pre-tax equivalent is 5/0.73 = $6.8M, the 'roughly $7M pre-tax' the sentence gives. The same sentence cannot call both figures pre-tax. The answer's own $9M check, (260 - 0.73 x 9)/150 = 169%, treats the threshold as after tax.
- source_rank: 5
- proposed_action: Change the first 'pre-tax' to 'after tax'.
- applied: true
- fingerprint: 6de55a3acbd9

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Applied: '$5 million after tax (roughly $7M pre-tax at a 27% rate)'.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- status_set: in_review
- checks_run: denominator name against MCT 2024 §1.1.1-§1.2.1 and A-4 p.3; every changed line re-read; example ratio arithmetic recomputed in Python on the page's given inputs
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- note: F-001 resolved (denominator renamed). F-002 found and fixed. The rest of the page was not checked in this packet; in_review until it is.
