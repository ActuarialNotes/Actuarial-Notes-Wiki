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
