---
target: Concepts/Professional Liability Insurance.md
created: 2026-10-10
---

## [F-001] Several general claims rest on no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: lead ('Most policies ... include defense costs within the limit'), 'Why a separate policy', 'Consent to settle' (soft hammer), 'Pricing and reserving'
- claim: Most professional liability forms count defense against the limit; the CGL is commonly endorsed to exclude professional services; a soft hammer clause has the insurer pay a stated share of costs after refusal; claims-made rates step up over the first years; the line is long-tail, low frequency, high severity.
- evidence: The one professional liability specimen read, MLM-2000 (06-09) (sha256:f67678eb...), confirms claims-made-and-reported coverage, the prior-acts retroactive date, claim expense within the limit, the consent-to-settle provision and a full hammer (liability capped at the amount the claim could have been settled for plus claim expense to the refusal), and extended reporting options. It has no soft hammer, and one form does not establish 'most'. ISO CG 00 01 04 13 (sha256:78739f04...) has no professional services exclusion in the base form, so the exclusion is an endorsement, which was not read. Nothing read addresses claims-made step factors or the line's frequency/severity profile.
- source_rank: 3
- proposed_action: Source these (another specimen with a soft hammer; the ISO professional-services exclusion endorsement; a ratemaking text for claims-made step factors) or qualify them.
- applied: false
- fingerprint: 93c8341b0a67

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Claims-made and reported trigger, retroactive date, extended reporting, defense (claim expense) within the limit, consent to settle and the full hammer cap (settlement offer plus expense to the refusal) against the MLM-2000 (06-09) specimen; D&O sides bullet against Chubb PF-55502 Insuring Clauses A-C; CGL Coverage A is BI/PD by occurrence against CG 00 01 04 13. Examples recomputed before reading: 550,000 / 1,075,000 / 1,600,000 and the firm's 1,050,000 / 525,000 / 0; architect min(1,280,000, 1,000,000), 280,000 retained. GI-302 tip against outcome k.
- sources_checked: Minnesota Lawyers Mutual, Lawyers Professional Liability sample policy MLM-2000 (06-09), p.1 (claims-made and reported; prior acts retroactive date; claim expense within the applicable limit; insurer will not settle without insured's consent; refusal caps liability at the amount the claim could have been settled for plus claim expense to the date of refusal) and pp.3-4 (extended reporting period options), sha256:f67678eb72c0efcee1b09d1c27fc937c2a31f3b232c0411c46ac89cd395bf7eb — https://mlmins.com/SamplePolicies/MLM-06-09.pdf; ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf; SOA GI-302 Syllabus (2027-07), learning outcome k (specialty coverages incl. excess, umbrella, professional liability, cyber risk, surety, terrorism), p.2, sha256:4b007f27cdfa4e554dca8638841ef73fddfcf1d0d1e3a954be6244f334c3a284 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-302/2027-07-gi-302-syllabus.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Verified medium: the core mechanics are in a published specimen; F-001 (minor) lists the generalizations no source read supports (soft hammer, 'most forms', the CGL professional-services endorsement, claims-made step rates).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): soft hammer now sourced (CPAI: insurer pays a percentage, such as 70%, of later costs) and restated to 'a stated percentage, such as 70%'; 'Most policies/forms' restated to 'policies such as the lawyers' and accountants' forms' and 'forms such as the lawyers' form' (MLM-2000); the trap made conditional; 'commonly endorsed to exclude professional services' deleted; the 'Pricing and reserving' bullet (claims-made step rates, long-tail profile) deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the clean-up edits: soft hammer against CPAI; claims-made, retro date, claim expense within the limit, consent and full hammer against MLM-2000; CGL defense outside the limits against CG 00 01 supplementary payments ('will not reduce the limits'); examples unchanged (550,000 / 1,075,000 / 1,600,000; 1,000,000 and 280,000).
- sources_checked: Minnesota Lawyers Mutual, Lawyers Professional Liability sample policy MLM-2000 (06-09), p.1 (claims-made and reported; prior acts retroactive date; claim expense within the applicable limit; insurer will not settle without insured's consent; refusal caps liability at the amount the claim could have been settled for plus claim expense to the date of refusal) and pp.3-4 (extended reporting period options), sha256:f67678eb72c0efcee1b09d1c27fc937c2a31f3b232c0411c46ac89cd395bf7eb — https://mlmins.com/SamplePolicies/MLM-06-09.pdf; CPA Insurance (CPAI), 'What is a Hammer Clause in a Professional Liability Policy?' (hammer = consent to settle / settlement cap, found in many professional liability policies; full hammer caps at the settlement plus defense to the refusal; soft hammer pays a percentage, such as 70%, of later costs), sha256:4c2d3109cf7483540d9c3379f68eeaf7170022ea56a4811d71d73c61716e040b — https://www.cpai.com/Education-Resources/My-Firm/Firm-Administration/What-is-a-Hammer-Clause-in-a-Professional-Liability-Policy; ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf; SOA GI-302 Syllabus (2027-07), learning outcome k (specialty coverages incl. excess, umbrella, professional liability, cyber risk, surety, terrorism), p.2, sha256:4b007f27cdfa4e554dca8638841ef73fddfcf1d0d1e3a954be6244f334c3a284 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-302/2027-07-gi-302-syllabus.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: F-001 resolved. Medium: the soft hammer rests on one rank-3 insurer page.
