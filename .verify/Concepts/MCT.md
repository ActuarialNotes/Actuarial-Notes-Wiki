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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Corrected this run against MCT 2024 §1.1.1-§1.1.2 and §1.2.1 (sha256:ec08c0d9…; same wording in the 2026 edition). Lead and formula now give MCT ratio = capital available / minimum capital required; the build-up bullet states the CTE 99% one-year target level and that target-level requirements less the diversification credit are divided by 1.5, with a second formula block for it. 'Base Solvency Buffer' is gone from the page (A-4 p.3: that is LICAT's name). Worked example recomputed in python: CR = 92+54+21+17-26 = 158; MCR = 158/1.5 = 105.33; ratio = 248/105.33 = 235.4% (was 104.6%); 1.5 x MCR = 158.0, 1.85 x MCR = 194.87, excess over the internal target 53.1. The escalation narrative (capital restoration plan, dividend prohibition, $29M/$191M shortfalls) rested on the 104.6% and was deleted. The figure builder (scripts/figures_exam_6c.py: MIN_CAP_REQ = CAP_REQ / 1.5, MCT_RATIO = CAP_AVAIL / MIN_CAP_REQ) is fixed and Media/Figures/MCT.svg regenerated, now filled to 235.4%.

## [F-002] Provincial adoption of the MCT stated without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: minor
- status: open
- locus: last bullet ('Provincially regulated insurers ...')
- claim: Provincially regulated insurers are generally subject to the same test, adopted by their provincial regulator, so the MCT is effectively the national capital standard.
- evidence: The MCT guideline (2024) applies to federally regulated P&C insurers that are not mortgage insurers (preamble, ICA s.515(1), s.608(1)); a search of it for 'provinc' finds only the registered-reinsurer list, government obligations, intra-group pooling and deferred tax assets - nothing on provincial adoption. Guideline A-4 p.3 likewise speaks only of federally regulated insurers. OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble; full-text search 'provinc', sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- source_rank: 1
- proposed_action: Delete the sentence (no source in this packet); re-add only with a provincial regulator's citation.
- applied: true
- fingerprint: abd278d5976c

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Sentence deleted this run (transcription: removing what no assigned source states).

## [F-003] Diversification credit described as insurance vs market risk only
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- severity: minor
- status: open
- locus: 'The build-up' bullet
- claim: A diversification credit recognising that insurance and market risk do not peak together.
- evidence: MCT 2024 ch.8 and §8.1: the explicit credit is 'between the sum of credit and market risk requirements, and the insurance risk requirement'; A in the formula is credit plus market risk, R = 50%. OSFI, Minimum Capital Test Guideline (2024), Guideline A, ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024
- source_rank: 1
- proposed_action: State the two blocks as the guideline does: insurance risk vs credit plus market risk.
- applied: true
- fingerprint: 1cfb37f5726b

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Restated this run: 'a Diversification Credit between the insurance risk requirement and the combined credit and market risk requirements' (MCT ch.8, §8.1).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T00:36Z/1567
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: MCT 2024 HTML fetched through verify_sources.py and read at §1.1-§1.2, ch.4 intro, §2.3.1, §4.3, ch.5 intro, ch.6 intro, ch.7, ch.8; full-text search for 'base solvency buffer' (0 hits) and 'provinc'; 2026 edition fetched and §1.1.1/§1.1.2/§1.2.1 compared (same wording); A-4 pp.3-6 read; worked example recomputed in python before restating (158, 105.33, 235.4%, 158.0, 194.87, 53.1); every remaining claim mapped to a section; figure MCT.svg regenerated from the fixed builder; wiki links resolve.
- sources_checked: OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble; §1.1.1, §1.1.2, §1.1.5, §1.2.1; ch.4 intro; §2.3.1; §4.3.2.2, §4.3.3.1, §4.3.3.2; ch.5 intro, §5.1; ch.6 intro; §7.1; ch.8, §8.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), pp.3-5 (capital requirement = minimum capital required for MCT; Internal Targets from the ORSA, set above Supervisory Targets; industry-wide simplifying assumptions), sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf
- note: Syllabus edition (Exam 6C Source Material -> OSFI MCT -> the 2024 guideline) verified; a 2026 edition is current at OSFI (effective 1 January 2026) and its §1.1.1/§1.1.2/§1.2.1 wording is unchanged. The example's inputs are the vault's own, recomputed.
