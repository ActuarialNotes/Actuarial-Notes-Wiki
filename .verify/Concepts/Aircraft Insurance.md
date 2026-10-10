---
target: Concepts/Aircraft Insurance.md
created: 2026-10-10
---

## [F-001] Pilot warranty stated as never needing causation; some U.S. law requires it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: major
- status: open
- locus: 'Pilot warranty' bullet ('whether or not the pilot's shortfall caused the loss') and the trap 'Warranty, not causation'
- claim: When a pilot who does not meet the warranty is flying there is no coverage, whether or not the shortfall caused the loss; arguing the loss would have happened anyway does not restore coverage.
- evidence: The New York DFS Office of General Counsel (Opinion 01-11-16, sha256:08faafc1...) confirms that New York courts require no causal connection for an exclusion triggered by an expired FAA medical certificate (Des Marais v. Thomas), but the same opinion records that the insured argued a Pennsylvania statute, 74 Pa.C.S. §5501, made a denial without a causal connection inappropriate, and that the case turned on choice of law. The QBE aviation form QBAV-AV1002 (07-17) (sha256:536a2453...) writes the pilot restriction as an exclusion with no causation language, which matches the page for the form's words; whether it is enforced without causation depends on the governing state's law. The page presents the no-causation rule as universal.
- source_rank: 2
- proposed_action: Say the rule is the majority / New York rule and that some states require a causal connection by statute or case law. Authoring; not applied.
- applied: false
- fingerprint: 6844b5a12d9f

## [F-002] Terms and coverages not found in the form read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Agreed value' (declaring a total loss), 'Liability coverages' ('smooth' limit), 'Airport liability' bullet, in-motion deductible
- claim: A smooth single limit; airport/FBO premises liability and hangarkeepers liability; a larger in-motion deductible; the insurer may declare a total loss when repairs would cost nearly as much.
- evidence: QBE QBAV-AV1002 (07-17) (sha256:536a2453...) confirms hull coverages F-H (ground and flight, not in flight, not in motion), total loss at the insured value less deductible with salvage to the insurer, total loss defined as repair cost plus salvage value at least the insured value, passenger BI only when scheduled, medical expense, a 'passenger liability limited internally' each-person cap, and use/purpose exclusions. It does not use 'smooth', and has no airport or hangarkeepers coverage or deductible schedule; these were not found in any source read.
- source_rank: 3
- proposed_action: Source these from a specimen (an airport liability or hangarkeepers form; a declarations page with split deductibles) or qualify them.
- applied: false
- fingerprint: cf624fbf4d9b

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: in_review
- checks_run: Hull options (ground and flight / not in flight / not in motion), total loss at the insured value less deductible with salvage to the insurer, partial loss at repair cost capped at the total-loss amount, passenger BI only when scheduled, medical payments, passenger each-person cap, pilot and purpose exclusions, 'pleasure and business' excluding hire: QBE QBAV-AV1002 (07-17). CGL aircraft exclusion g.: CG 00 01 04 13. Examples recomputed: 84,000 / 250,000 / 1,140,000, net 1,050,000; 810,000 vs 460,000, 350,000 uncovered.
- sources_checked: QBE Aviation Policy QBAV-AV1002 (07-17), Coverages A-E (passenger BI only if 'including passengers'; medical expense), F-H (open peril ground and flight / not in flight / not in motion), Exclusions 1(a) (in flight for purpose not designated) and 2(a) (in flight piloted by other than designated pilots), limits incl. 'passenger liability limited internally', total loss = insured value less deductible, salvage to the Company, 'pleasure and business' excludes hire, pp.1-8, sha256:536a24536fb92b4498def6223fd9a5417b61a68cbe007c29dd53d3e5c2a526c2 — https://www.qbe.com/us/-/media/north%20america/files/aviation-forms/qbav-av1002-07-17-aviation-policy.pdf; N.Y. Dept. of Financial Services, OGC Opinion No. 01-11-16 (Nov. 13, 2001), 'Causal Connection Between the Policy Exclusion and the Loss' (expired FAA medical certificate: New York courts require no causal connection; plaintiffs argued Pennsylvania statute 74 Pa.C.S. §5501 made denial without causal connection inappropriate), sha256:08faafc1159d55748fd033473a47a06591ce2d0f38a35a195a02c7a1ad69119a — https://www.dfs.ny.gov/insurance/ogco2001/rg111131.htm; ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: In review: F-001 (major) — the no-causation rule for pilot warranties is presented as universal, but NY DFS OGC 01-11-16 records a Pennsylvania statute argued to require a causal connection (New York requires none); F-002 (minor) open.
