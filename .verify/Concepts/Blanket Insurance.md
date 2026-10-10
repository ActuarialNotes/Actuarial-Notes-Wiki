---
target: Concepts/Blanket Insurance.md
created: 2026-10-10
---

## [F-001] Statement of values can also cap recovery through a per-location limitation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- severity: minor
- status: open
- locus: Statement of values bullet, last sentence
- claim: The statement does not cap a location's recovery unless the policy adds a margin clause.
- evidence: IRMI's 'margin clause' entry names a second nonstandard provision, the per location limitation of liability provision, under which 'the most the insured can collect ... at a given location is the amount reported for that location on the insured's statement of values'; it is 'even more restrictive than a margin clause' and the two are often used together. The sentence presents the margin clause as the only way the statement caps recovery.
- source_rank: 3
- proposed_action: Name the per-location limitation of liability provision alongside the margin clause (authoring — left for a writer).
- applied: false
- fingerprint: 67a395081301

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blanket vs. specific limit against IRMI 'blanket limit'; coinsurance on the total value and the 90% Example 3 against CP 00 10 10 12 §F.1.b; ICC blanket cap §A.4.e(6); agreed value §G.1; '90% or more' against ISO CP 16 15 07 88 Note 5 (minimum coinsurance for a blanket average rate is 90%); statement of values filed annually and used to compute the blanket average rate from values × specific rates (CP 16 15 pp.2–3, Notes 7–8); margin clause as a cap at a percentage (e.g. 110%) of reported values and its purpose (accuracy of the SOV) against IRMI 'margin clause' and Big I VU. Examples recomputed: 450,000/990,000×800,000−10,000=353,636.36; blanket 790,000; margin 1.1×500,000=550,000; rate (6,000+6,750+4,000)/40,000=0.41875, premium 15,075.
- sources_checked: ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §F.1.b Example 3, A.4.e(6), G.1, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO CP 16 15 07 88 Statement of Values (specimen, Big I), pp.1–3, Notes 5–8, sha256:e6597a69a240b732ec8575524a4c640d76d15af8e2fb0e72fc1e2d1401dc31e2 — https://www.independentagent.com/wp-content/uploads/2024/04/CP16150788.pdf; IRMI glossary, 'blanket limit' (rank 3), definition, sha256:10e936de05e54dee3eff832fb3c8d6582234245f2d79ea9e0b96eabbb227d04d — https://www.irmi.com/term/insurance-definitions/blanket-limit; IRMI glossary, 'margin clause' (rank 3), definition, sha256:6c64d369833da5734c72797b5e5e8d857bc193011e708edd4d85da3cd98a806d — https://www.irmi.com/term/insurance-definitions/margin-clause; Big "I" Virtual University, Mike Edwards, 'Margin Clauses and Blanket Insurance' (2013; rank 3), Response, sha256:5a05d40fb33c46a533c031bf0ad1af312a83ab3b5a47beb50bad1b2632cb91ad — https://www.independentagent.com/vu_resource/margin-clauses-and-blanket-insurance/
- note: Medium: the margin clause is a nonstandard (non-ISO) provision, so the best sources are two agreeing rank-3 references. Resolves the writer's follow-up: the 90% claim is now backed by ISO CP 16 15 Note 5.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in this run. Added the per location limitation of liability provision beside the margin clause, transcribed from IRMI's 'margin clause' entry (the most collected at a location is the value reported for it on the statement of values).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv10
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Delta re-check of the edited statement-of-values sentence against IRMI 'margin clause' (per location limitation of liability provision); rest unchanged since this run's earlier pass.
- sources_checked: IRMI glossary, 'margin clause' (rank 3), per location limitation of liability provision (delta re-check), sha256:6c64d369833da5734c72797b5e5e8d857bc193011e708edd4d85da3cd98a806d — https://www.irmi.com/term/insurance-definitions/margin-clause; ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §F.1.b Example 3, A.4.e(6), G.1, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; ISO CP 16 15 07 88 Statement of Values (specimen, Big I), pp.1–3, Notes 5–8, sha256:e6597a69a240b732ec8575524a4c640d76d15af8e2fb0e72fc1e2d1401dc31e2 — https://www.independentagent.com/wp-content/uploads/2024/04/CP16150788.pdf; IRMI glossary, 'blanket limit' (rank 3), definition, sha256:10e936de05e54dee3eff832fb3c8d6582234245f2d79ea9e0b96eabbb227d04d — https://www.irmi.com/term/insurance-definitions/blanket-limit; IRMI glossary, 'margin clause' (rank 3), definition, sha256:6c64d369833da5734c72797b5e5e8d857bc193011e708edd4d85da3cd98a806d — https://www.irmi.com/term/insurance-definitions/margin-clause; Big "I" Virtual University, Mike Edwards, 'Margin Clauses and Blanket Insurance' (2013; rank 3), Response, sha256:5a05d40fb33c46a533c031bf0ad1af312a83ab3b5a47beb50bad1b2632cb91ad — https://www.independentagent.com/vu_resource/margin-clauses-and-blanket-insurance/
- note: Medium kept: the margin-clause and per-location provisions are nonstandard (non-ISO); two agreeing rank-3 sources.
