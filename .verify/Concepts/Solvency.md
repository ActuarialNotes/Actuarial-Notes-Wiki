---
target: Concepts/Solvency.md
created: 2026-10-09
---

## [F-001] MCT denominator named 'Base Solvency Buffer', a LICAT term
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: MCT ratio formula and the worked example's inputs
- claim: MCT Ratio = Capital Available / Base Solvency Buffer; the example gives a 'Base Solvency Buffer' of $92 million.
- evidence: OSFI's MCT guideline (2024), §1.1.1: 'The resulting MCT capital requirements are then divided by 1.5 to derive the minimum capital requirements. The MCT ratio is expressed as the capital available over the minimum capital required.' §1.1.5 repeats it. The phrase 'base solvency buffer' occurs nowhere in the guideline; it is LICAT's term (the life insurers' test). OSFI Minimum Capital Test guideline (2024), §1.1.1 and §1.1.5, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the denominator as the guideline does — minimum capital required — and check the example's figures on that basis.
- applied: false
- fingerprint: 78023915bad1
