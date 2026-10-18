---
target: Concepts/Financial Health.md
created: 2026-10-18
---

## [F-001] MCT denominator named 'Base Solvency Buffer', a LICAT term
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: major
- status: open
- locus: MCT ratio formula; example ('the change in the buffer')
- claim: MCT ratio = Capital Available / Base Solvency Buffer.
- evidence: OSFI Guideline A-4 (Dec 2017) p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' A full-text search of the MCT guideline (2024) for 'base solvency buffer' returns 0 hits; its denominator is 'minimum capital required' = target-level capital required less the diversification credit, divided by 1.5 (§1.1.1-§1.1.2). OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf; OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the MCT's denominator as the guideline does - minimum capital required (target-level capital required less the diversification credit, divided by 1.5); the ratio arithmetic is otherwise unaffected where the figure is a given input.
- applied: false
- fingerprint: 29cdef5053ac

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Applied: 'Base Solvency Buffer' renamed to the MCT's term, minimum capital required, per A-4 p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' MCT 2024 §1.1.1: 'The MCT ratio is expressed as the capital available over the minimum capital required.' Formula now Capital Available / Minimum Capital Required; the example's two 'buffer' references now say minimum capital required. 210% x 0.68 = 142.8% and 210% x 0.85 = 178.5% reproduce.

## [F-002] Direction of the omitted denominator effect reversed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- severity: minor
- status: open
- locus: example 'Two Insurers, One MCT Ratio', answer
- claim: 'Below the 150% supervisory target — and understated, since strengthening reserves also raises the buffer.'
- evidence: MCT 2024 §4.2.1: the margin for liability for incurred claims is 1.10 x risk factor x the best estimate liability for incurred claims, so strengthening reserves raises capital required and, by §1.1.2, minimum capital required. A larger denominator makes the true ratio lower than the 142.8% computed with the denominator held fixed: 142.8% is overstated, not understated. OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.2, §4.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Change 'understated' to 'overstated'.
- applied: true
- fingerprint: b1169678d1a7

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Applied: 'and overstated, since strengthening reserves also raises minimum capital required'.

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- status_set: in_review
- checks_run: denominator name against MCT 2024 §1.1.1-§1.2.1 and A-4 p.3; every changed line re-read; example ratio arithmetic recomputed in Python on the page's given inputs
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, §4.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- note: F-001 resolved (denominator renamed). F-002 found and fixed. The rest of the page was not checked in this packet; in_review until it is.
