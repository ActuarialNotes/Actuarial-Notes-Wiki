---
target: Concepts/Base Solvency Buffer.md
created: 2026-09-27
---

## [F-001] MCT minimum capital divides capital required by 1.5; the page multiplies
- entry_type: finding
- author: agent:resource-pages
- run_id: 2026-09-27T18:28Z/90df
- date: 2026-09-27
- severity: major
- status: open
- locus: definition (line 14) and formula (line 16)
- claim: The Base Solvency Buffer is the denominator of the MCT ratio: BSB = 1.5 × Capital Required.
- evidence: OSFI, Minimum Capital Test Guideline (2024), §1.1.1 (https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024, page sha256 8d6af7ef62e09320f3802e0efa768c25415005f945fca8b6ddf229e796175697): 'The resulting MCT capital requirements are then divided by 1.5 to derive the minimum capital requirements. The MCT ratio is expressed as the capital available over the minimum capital required.' The phrase 'base solvency buffer' does not occur in the MCT guideline (it is a LICAT term); found while rewriting Resources/Books/OSFI MCT.md from the guideline.
- source_rank: 1
- proposed_action: Rewrite the page from MCT §1.1.1: minimum capital required = capital required ÷ 1.5, and check whether the page should describe the LICAT base solvency buffer or be renamed for the MCT's minimum capital required; recompute the worked example.
- applied: false
- fingerprint: 68cc289b1d22
