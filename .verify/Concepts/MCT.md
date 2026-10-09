---
target: Concepts/MCT.md
created: 2026-10-09
---

## [F-001] MCT denominator multiplied by 1.5; the guideline divides
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: critical
- status: open
- locus: definition, formula block and 'The build-up' bullet; the worked example's BSB line
- claim: MCT Ratio = Capital Available / Base Solvency Buffer, where 'the Base Solvency Buffer is then 1.5 times capital required' (example: BSB = 1.5 x $158M).
- evidence: OSFI's MCT guideline (2024), §1.1.1: 'The resulting MCT capital requirements are then divided by 1.5 to derive the minimum capital requirements. The MCT ratio is expressed as the capital available over the minimum capital required.' §1.1.5 repeats it. The phrase 'base solvency buffer' occurs nowhere in the guideline; it is LICAT's term (the life insurers' test). OSFI Minimum Capital Test guideline (2024), §1.1.1 and §1.1.5, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024 With the page's own example the ratio is understated by a factor of 2.25 against CA / (CR / 1.5).
- source_rank: 1
- proposed_action: Restate from §1.1.1: minimum capital required = (capital required at target level − diversification credit) ÷ 1.5; MCT ratio = capital available ÷ minimum capital required. Rename 'Base Solvency Buffer' to minimum capital required on this page and recompute the example. The generated figure (scripts/figures_exam_6c.py, BSB = 1.5 * CAP_REQ) draws the same error and needs its builder fixed before any re-embed.
- applied: false
- fingerprint: de8b65f16b1e

## [C-001] Open critical — held for the Exam 6C campaign
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: disputed
- note: F-001 (critical) is open: the page multiplies capital required by 1.5 where OSFI's MCT guideline divides. Found while resolving Base Solvency Buffer in Wave 1; the page itself was outside that run's files, so it is recorded here for the Exam 6C campaign rather than fixed.
