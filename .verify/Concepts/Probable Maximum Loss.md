---
target: Concepts/Probable Maximum Loss.md
created: 2026-10-10
---

## [F-001] Post-event MCT points protected by the top layer misstated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: minor
- status: open
- locus: example 'Sizing a Catastrophe Programme', bullet 'Buy the top layer'
- claim: '... worth the 17 points of post-event MCT ratio it protects.'
- evidence: Recomputed on the example's own figures: buying the 350M-430M layer cuts the net loss from 120M to 40M. At the example's tax ratio (88/120), the after-tax loss falls from 88.0M to 29.3M. MCT then rises from (390-88)/230 = 131.3% to (390-29.3)/230 = 156.8%, a gain of 25.5 points. 17 points matches nothing; it is close to 40/230, the pre-tax retention alone.
- source_rank: 5
- proposed_action: Change 17 to 'roughly 26' (arithmetic fix).
- applied: true
- fingerprint: 29af9a23e6d8

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied: 'the roughly 26 points'; recomputation 131.3% -> 156.8% shown in F-001.

## [F-002] Page is framed as Canadian catastrophe PML; DISC-RM's per-location sense is one bullet
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: minor
- status: open
- locus: lead and body (DISC-RM 9.5, 10.1 link this page)
- claim: Lead defines PML as 'the loss an insurer's portfolio would suffer from a catastrophe of a specified return period — commonly the 1-in-500 year event for earthquake under OSFI's requirements', and the body and example are OSFI/MCT.
- evidence: DISC-RM 9.5 'Determining Potential Loss Severity' and 10.1 'Estimating Probable Maximum Loss of Business Income' use the U.S. property-underwriting sense: IRMI 'probable maximum loss' = 'the maximum loss expected at a given location in the event of a fire ... in dollars or as a percentage of total values'. The page carries that sense in one bullet; the U.S. framing a DISC reader needs (PML vs MFL vs MPL vs NLE, protection assumptions) is otherwise absent.
- source_rank: 3
- proposed_action: Give the per-location underwriting sense its own section or page (lead decision; noted by writer C in followups).
- applied: false
- fingerprint: 8b107c6dd1c5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: 1-in-500 earthquake PML, gross vs net, modelled quantity, model uncertainty against OSFI B-9; MCT 100%/150% against OSFI MCT 2026; per-location bullet against IRMI PML/MFL/MPL; 1-0.998^30 = 5.83%; example recomputed (net 40+80 = 120M; MCT 131%; 350M-430M layer; 550M model -> 240M retained)
- sources_checked: OSFI, Guideline B-9 Earthquake Exposure Sound Practices (PML500, gross/net PML, models), definitions of PML, PML500, gross/net PML; models, sha256:e826e5e04f4c4170671288527ae7bebd0ace06ac940254e7d5ecd3adbe92f37e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/earthquake-exposure-sound-practices; OSFI, Minimum Capital Test Guideline (2026), ch.1 (100% minimum, 150% supervisory target), ch.1 100% minimum, 150% supervisory target, sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026; IRMI Glossary, 'probable maximum loss (PML)', entry, sha256:f5a52026910edc505ad6eca7e31f08994d2ab6ffd9b55e16685b3e6d2cd4e8ee — https://www.irmi.com/term/insurance-definitions/probable-maximum-loss; IRMI Glossary, 'maximum foreseeable loss (MFL)', entry, sha256:ac6a852f104fe279e0909ec10a83934963490673519be7caa5ceef6192b7151c — https://www.irmi.com/term/insurance-definitions/maximum-foreseeable-loss; IRMI Glossary, 'maximum possible loss (MPL)', entry, sha256:5216b2a4bb6e2fd2293be9003732c8549708b87e7e3be408b39de7a8a93e50e9 — https://www.irmi.com/term/insurance-definitions/maximum-possible-loss
- note: OSFI documents are primary for the Canadian content. The FCT/ORSA bullet was not checked against CIA/OSFI text. F-001 fixed; F-002 (minor, framing) open. Medium.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: No change (lead decision): the page keeps its Canadian/Exam 6C framing; DISC-RM's per-location sense is covered by the per-location bullet, which matches IRMI's PML, MFL and MPL entries (largest loss expected at a location from a fire, in dollars or as a percentage of total values; MFL worst likely from a single event; MPL worst possible).
