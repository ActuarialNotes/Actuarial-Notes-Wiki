---
target: Concepts/Statement of Changes in Equity.md
created: 2026-10-18
---

## [F-001] MCT denominator named 'Base Solvency Buffer', a LICAT term
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: major
- status: open
- locus: example answer, 'Why this is a supervisory concern'
- claim: If the Base Solvency Buffer were $160 million, the MCT ratio fell from roughly 194% to 168%.
- evidence: OSFI Guideline A-4 (Dec 2017) p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' A full-text search of the MCT guideline (2024) for 'base solvency buffer' returns 0 hits; its denominator is 'minimum capital required' = target-level capital required less the diversification credit, divided by 1.5 (§1.1.1-§1.1.2). OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf; OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: Name the MCT's denominator as the guideline does - minimum capital required (target-level capital required less the diversification credit, divided by 1.5); the ratio arithmetic is otherwise unaffected where the figure is a given input.
- applied: false
- fingerprint: 72e76893e888

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Applied: 'Base Solvency Buffer' renamed to the MCT's term, minimum capital required, per A-4 p.3: 'For P&C insurers, the MICAT and the MCT guidelines define the capital requirement amount as the minimum capital required, while for life insurers the capital requirement amount is referred to as the Base Solvency Buffer in the LICAT.' MCT 2024 §1.1.1: 'The MCT ratio is expressed as the capital available over the minimum capital required.' Now 'If minimum capital required were $160 million'. 310/160 = 193.75% and 268/160 = 167.5% reproduce 'roughly 194% to 168%' (the example takes equity as capital available).

## [F-002] '60% of that decline' does not follow from the example's figures
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- severity: minor
- status: open
- locus: example answer, 'Why this is a supervisory concern'
- claim: '... the MCT ratio fell from roughly 194% to 168% in a single year, and 60% of that decline was a discretionary decision by the board.'
- evidence: Recomputed on the page's own figures (rank 5): the ratio falls 310/160 - 268/160 = 26.25 points; the $60M dividend alone is 60/160 = 37.5 points, 143% of the decline (net income offsets part of it). The dividend is 60/88 = 68% of the two reductions (OCI loss 28 + dividends 60) and 60/42 = 143% of the $42M net fall in equity. No reading of the figures gives 60%.
- source_rank: 5
- proposed_action: Writer to restate the share from the figures (e.g. the dividend alone, 37.5 points, exceeds the whole 26-point decline); not fixed here because the replacement sentence has to be authored.
- applied: false
- fingerprint: 961181ce0bde

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:50Z/dd77
- date: 2026-10-18
- status_set: in_review
- checks_run: denominator name against MCT 2024 §1.1.1-§1.2.1 and A-4 p.3; every changed line re-read; example ratio arithmetic recomputed in Python on the page's given inputs
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- note: F-001 resolved (denominator renamed). F-002 (minor, the '60%' share) left open for a writer. The rest of the page was not checked in this packet; in_review until it is.
