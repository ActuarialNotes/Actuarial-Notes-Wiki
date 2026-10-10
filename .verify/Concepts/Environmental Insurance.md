---
target: Concepts/Environmental Insurance.md
created: 2026-10-10
---

## [F-001] Three details not in the sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'The CGL pollution exclusion' ('Since the mid-1980s'), 'Contractor's pollution liability' (follows the contractor's work; often occurrence basis)
- claim: The CGL has excluded pollution since the mid-1980s; CPL follows a contractor's work rather than a location and is often written on an occurrence basis.
- evidence: ISO CG 00 01 04 13 exclusion f. (sha256:78739f04...) confirms the current exclusion and its heating-equipment and hostile-fire exceptions but carries no history. The EPA-funded 2006 study (sha256:7b8050d3...) covers PL and cost cap policies (terms, SIR, coinsurance) and owner-controlled programs, not CPL's trigger. Nothing read dates the exclusion or describes CPL.
- source_rank: 3
- proposed_action: Cite a source for the exclusion's history and for CPL's site-free, occurrence-basis form, or qualify them.
- applied: false
- fingerprint: 203bb81b9a25

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: CGL pollution exclusion and its heating-equipment and hostile-fire exceptions and clean-up costs against CG 00 01 04 13 f.; property pollutant clean-up only for a covered cause and a small ($10,000) amount against CP 00 10 10 12; gradual release not a covered cause against CP 10 30 exclusion l.; PL scope (third-party BI/PD, on- and off-site cleanup, defense, pre-existing unknown conditions, multi-year terms, claims-made with ERPs) and cost cap (above the estimated cleanup, SIR, coinsurance, known contamination) against the EPA-funded 2006 study; strict, joint and several and retroactive CERCLA liability against EPA's Superfund liability page; UST financial responsibility against 40 C.F.R. 280.93/280.97. Examples recomputed: A = 4,400,000, paid 1,620,000, developer 4,580,000; tank 950,000 paid, 1,050,000 without PLL.
- sources_checked: ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; ISO CP 00 10 10 12 Building and Personal Property Coverage Form, Additional Coverage d. Pollutant Clean-up and Removal ($10,000; only if release caused by a Covered Cause of Loss), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO CP 10 30 10 12 Causes of Loss - Special Form, exclusion l. (release of pollutants unless caused by a specified cause of loss), sha256:119fcd978212db836e1084ca8ca90c0fdacb60d157caf4867bbc7b4e02f498e3 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2018/09/CP.10.30.10.12-1-1.pdf; Northern Kentucky University for U.S. EPA, Environmental Insurance Products Available for Brownfields Redevelopment (2006), Executive Summary pp.1-2 (PL: third-party cleanup, BI/PD, defense, on-site cleanup; 1-10 year terms; ERPs) and ch.3 p.28 (cost cap: costs above estimated cleanup per remediation plan; SIR 10-30%; co-insurance 10-30%), sha256:7b8050d35d9a7e61d642e75339446ea3d81912fdcb8a221b83640ff83a2b5178 — https://www.clu-in.org/download/btsc/enviro_insurance_2006.pdf; U.S. EPA, Superfund Liability page (strict, joint and several, retroactive), read 2026-10-10, sha256:134a0cd82aaeec64157164312a766363c67b6be1c2a20e45cada6a39a770cd4f — https://www.epa.gov/enforcement/superfund-liability; 40 C.F.R. part 280 subpart H, §280.93 (petroleum UST owners must demonstrate financial responsibility for corrective action and third-party BI/PD) and §280.97 (insurance), eCFR read 2026-10-10, sha256:37e032194b8ed36fbcc4c38f53f962a257ba51448ebbffbb6db37cef1dcdd0a4 — https://www.ecfr.gov/current/title-40/part-280; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Verified medium: core claims against ISO forms, federal regulation and an EPA-funded market study (rank 3); F-001 (minor) open for the exclusion's history and the CPL description.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): 'Since the mid-1980s' deleted; CPL bullet restated to the EPA-funded study p.44 (a contractor's own policy covers its projects, so its aggregate can be used up by other jobs; a developer can buy one owner-controlled policy); 'often written on an occurrence basis' deleted; the trap's history of the 'sudden and accidental' exception restated to what CG 00 01 04 13 shows (no sudden-or-accidental exception).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the clean-up edits: CGL exclusion wording and the trap against CG 00 01 04 13 f.; CPL sentence against the EPA-funded study p.44; examples unchanged (1,620,000 / 4,580,000; 950,000).
- sources_checked: ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; ISO CP 00 10 10 12 Building and Personal Property Coverage Form, Additional Coverage d. Pollutant Clean-up and Removal ($10,000; only if release caused by a Covered Cause of Loss), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO CP 10 30 10 12 Causes of Loss - Special Form, exclusion l. (release of pollutants unless caused by a specified cause of loss), sha256:119fcd978212db836e1084ca8ca90c0fdacb60d157caf4867bbc7b4e02f498e3 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2018/09/CP.10.30.10.12-1-1.pdf; Northern Kentucky University for U.S. EPA, Environmental Insurance Products Available for Brownfields Redevelopment (2006), Executive Summary pp.1-2 (PL: third-party cleanup, BI/PD, defense, on-site cleanup; 1-10 year terms; ERPs) and ch.3 p.28 (cost cap: costs above estimated cleanup per remediation plan; SIR 10-30%; co-insurance 10-30%), sha256:7b8050d35d9a7e61d642e75339446ea3d81912fdcb8a221b83640ff83a2b5178 — https://www.clu-in.org/download/btsc/enviro_insurance_2006.pdf; U.S. EPA, Superfund Liability page (strict, joint and several, retroactive), read 2026-10-10, sha256:134a0cd82aaeec64157164312a766363c67b6be1c2a20e45cada6a39a770cd4f — https://www.epa.gov/enforcement/superfund-liability; 40 C.F.R. part 280 subpart H, §280.93 (petroleum UST owners must demonstrate financial responsibility for corrective action and third-party BI/PD) and §280.97 (insurance), eCFR read 2026-10-10, sha256:37e032194b8ed36fbcc4c38f53f962a257ba51448ebbffbb6db37cef1dcdd0a4 — https://www.ecfr.gov/current/title-40/part-280; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: F-001 resolved. Medium: PL/cost cap/CPL rest on an EPA-funded market study (rank 3).
