---
target: Concepts/Employment Practices Liability Insurance.md
created: 2026-10-10
---

## [F-001] Third-party EPL presented as always needing an endorsement
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: major
- status: open
- locus: 'Third-party EPL' bullet and the trap 'Third-party claims need the endorsement'
- claim: An endorsement extends the policy to discrimination or harassment against customers; harassment of a customer is covered only if third-party EPL has been added.
- evidence: Chubb's ForeFront Portfolio EPL coverage part PF-55505 (07/21) carries third-party cover in the base form: 'Insuring Clause (B): Third Party Liability Coverage - The Company shall pay ... Loss on account of a Third Party Claim first made against the Insured during the Policy Period' (p.73), with Third Party Wrongful Act defined as discrimination against or harassment of a Third Party (p.79), and the specimen Declarations list a separate line for 'Each Third Party Claim' (pp.5, 16) (sha256:a97417e8...). Some forms do add it by endorsement, but the page states the endorsement route as the rule and the trap tells candidates to mark a third-party claim uncovered without one.
- source_rank: 2
- proposed_action: Say that third-party EPL is included in some forms and added by endorsement in others, and soften the trap. Authoring; not applied.
- applied: false
- fingerprint: 0c1850f4a111

## [F-002] Base CGL form has no employment-related practices exclusion
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: lead ('It fills a gap left by the CGL, which excludes employment-related practices')
- claim: The CGL excludes employment-related practices.
- evidence: ISO CG 00 01 04 13 (sha256:78739f04...) has exclusion e. Employer's Liability (bodily injury to an employee arising out of employment) but no employment-related practices exclusion; a word search of the 16-page form finds no 'Employment-Related'. The ISO employment-related practices exclusion is an endorsement, not read this run.
- source_rank: 2
- proposed_action: Say the CGL is usually endorsed with an employment-related practices exclusion (citing the endorsement once read), rather than that the form excludes them.
- applied: false
- fingerprint: d8bceae316b1

## [F-003] Coinsurance, hammer and market claims not in the specimen read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: formula block (coinsurance c), 'Duty to defend' (hammer clause), 'Why the line is volatile', and the trap 'Coinsurance on defense too'
- claim: EPLI commonly carries coinsurance above the retention applying to defense costs too; a hammer clause may apply; losses track employment law, juries and layoffs; large employers buy over large retentions.
- evidence: Chubb PF-55505 (07/21) (sha256:a97417e8...) confirms the claims-made trigger, applicants as claimants, the administrative charge, defense inside the limit (advancement reduces the limit, VI(B)(3)), duty-to-defend or reimbursement election with panel counsel, and the BI, workers compensation/benefits, wage-and-hour and accommodation/reinstatement-cost exclusions, but has no coinsurance and no hammer clause; nothing read addresses the market claims.
- source_rank: 3
- proposed_action: Cite a specimen with EPLI coinsurance and a hammer clause, or mark them as features of some forms.
- applied: false
- fingerprint: 57a6dddf476c

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: in_review
- checks_run: Against Chubb PF-55505 (07/21): claims-made, applicants and administrative charges, covered practices (discrimination on protected status, harassment, retaliation incl. whistleblowing, wrongful termination, wrongful discipline, failure to promote, negligent evaluation), duty to defend or reimbursement with approved panel counsel, defense inside the limit, exclusions for workers comp/unemployment/disability, benefit plans, wage and hour, BI other than emotional distress, accommodation and reinstatement costs. Against CG 00 01 04 13 for the CGL statement. Examples recomputed: 500,000 -> paid 405,000, borne 95,000, limit left 595,000; wage example 290,000 -> 265,000 paid, 85,000 borne.
- sources_checked: Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf; ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: In review: F-001 (major) — the page states third-party EPL always needs an endorsement, while Chubb's base EPL form includes a Third Party Liability insuring clause; F-002 and F-003 (minor) open. Re-verify after the third-party bullet and trap are revised.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): third-party bullet now says cover for discrimination against or harassment of third parties 'is part of some base EPL forms (Chubb's includes a Third Party Liability insuring clause) and is added by endorsement to others'; the trap now reads 'Read the form for third-party cover ... covered only if the policy has third-party cover, in its base form or by endorsement'.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): lead restated to CG 00 01 04 13: the CGL 'whose Coverage A covers bodily injury and property damage and excludes bodily injury to an employee arising out of employment' (exclusion e.); the unread ISO endorsement is not mentioned.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-003
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): hammer-clause sentence and the 'Why the line is volatile' bullet deleted; duty-to-defend bullet restated to Chubb PF-55505 VI(A)-(B) (duty to defend with approved employment defense firms, or reimbursement, selected in the declarations). Coinsurance remains only as a stated term of the worked examples' hypothetical policies; the trap on coinsurance and defense is conditional and consistent with Loss including Defense Costs in PF-55505.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the clean-up edits: third-party bullet and trap, duty-to-defend bullet against Chubb PF-55505 I(B), VI(A)-(B); CGL sentence against CG 00 01 04 13 Coverage A and exclusion e.; deleted claims gone; examples unchanged (405,000 / 95,000 / 595,000; 265,000 / 85,000).
- sources_checked: Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf; ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: F-001 (major), F-002 and F-003 resolved. Medium: one carrier specimen for EPLI.
