---
target: questions/exam-disc-ia/discia-an-213.md
created: 2026-10-10
---

## [F-001] Distractor A is covered under a common base EPL form
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: major
- status: open
- locus: option A and its explanation
- claim: A hotel's EPL policy with no endorsements does not cover a guest's claim that a desk clerk sexually harassed her; third-party EPL must be added by endorsement.
- evidence: Chubb's EPL coverage part PF-55505 (07/21) includes Insuring Clause (B) Third Party Liability Coverage in the base form (p.73), Third Party Wrongful Act covering harassment, including sexual harassment, of a Third Party (p.79), and a separate Declarations line for 'Each Third Party Claim' (pp.5, 16) (sha256:a97417e8...). Under that form, with no endorsements, both A and the keyed B are covered, so the question has two defensible answers. The key B itself is right: Employment Claim includes an administrative proceeding brought by 'an applicant for employment' (p.75).
- source_rank: 2
- proposed_action: Rewrite the stem so A is clearly outside the policy (e.g. state that the policy covers employee claims only), or replace A. Question authoring; not applied.
- applied: false
- fingerprint: f81e88506f95

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: in_review
- checks_run: Blind recompute from the stem with key and explanation stripped, then compared with the key; every distractor's explanation checked; wiki_link and learning_objective (section title matches the DISC-IA page; question_lint clean).
- sources_checked: Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Blind answer B (applicant's administrative charge) = key, confirmed by PF-55505's Employment Claim definition. In review: F-001 (major) — under Chubb's base EPL form option A is also covered (Insuring Clause B, Third Party Liability), so the question has two defensible answers.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): option A is now 'A guest's claim for a broken wrist after slipping on a wet lobby floor' (premises bodily injury: not a Wrongful Act and within PF-55505 exclusion C), with its explanation restated; key B unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the clean-up edits: blind recompute from the edited stem, key unchanged and confirmed, every option's explanation re-read, question_lint clean.
- sources_checked: Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Blind answer B = key: applicant's administrative charge is an Employment Claim (PF-55505 p.75). New A is premises bodily injury, not a Wrongful Act and within exclusion C; C workers comp; D wage and hour exclusion (D)(4). F-001 resolved. Medium: one carrier form.
