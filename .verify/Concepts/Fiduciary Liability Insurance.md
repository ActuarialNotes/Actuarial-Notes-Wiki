---
target: Concepts/Fiduciary Liability Insurance.md
created: 2026-10-10
---

## [F-001] ERISA bond cap omits the $1,000,000 maximum
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: major
- status: open
- locus: third formula block (B_bond = min(max(0.10F, 1,000), 500,000)), 'Not the ERISA bond' bullet, and the example 'Theft From the Plan: Bond or Fiduciary Policy?'
- claim: The minimum ERISA bond is 10% of funds handled, at least $1,000 and at most $500,000.
- evidence: 29 U.S.C. 1112(a) (LII, sha256:46564def...): 'not less than 10 per centum of the amount of funds handled. In no case shall such bond be less than $1,000 nor more than $500,000 ...', and 'In the case of a plan that holds employer securities (within the meaning of section 1107(d)(1) of this title) or in the case of a pooled employer plan ..., this subsection shall be applied by substituting $1,000,000 for $500,000' (added by Pub. L. 109-280 §622(a)). The page states the $500,000 cap without the condition, and its example (a company 401(k) with $8,000,000 of funds handled) gives $500,000 without saying the plan holds no employer securities; if it did, the answer is $800,000.
- source_rank: 1
- proposed_action: Add the $1,000,000 cap for plans holding employer securities and pooled employer plans to the formula's description, and state in the example that the plan holds no employer securities. Authoring; not applied.
- applied: false
- fingerprint: 2b9f25bb866e

## [F-002] Some exclusions and market statements not in the sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Recourse' ('waiver of recourse endorsement'), 'Exclusions' ('contractual liability'), 'Why the line moved'
- claim: Fiduciaries remove recourse by buying a waiver of recourse endorsement; contractual liability is excluded; 401(k) fee class actions raised frequency and insurers responded with separate retentions.
- evidence: 29 U.S.C. 1110(b) (sha256:8fd31d55...) supports the recourse rule and the fiduciary's or employer's right to buy cover; Chubb PF-55501 VIII(D) notes no plan paid so recourse does not apply. Chubb PF-55506 (07/21) (sha256:a97417e8...) excludes benefits due and contributions from Loss and has prior notice, pending/prior, BI/PD, workers comp and conduct exclusions (final adjudication) but no contract exclusion. 'Waiver of recourse endorsement' and the 401(k)-litigation market history appear in nothing read.
- source_rank: 3
- proposed_action: Source the endorsement name, the contract exclusion and the market history, or qualify them.
- applied: false
- fingerprint: 3030ddc0f5a9

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: in_review
- checks_run: Fiduciary duties against 29 U.S.C. 1104(a); personal liability 1109(a); recourse 1110(b); bond 1112(a); settlor acts against Lockheed v. Spink; claims-made, defense in loss, benefits-due and contribution Loss exclusions, BI exclusion, conduct exclusion on final adjudication, D&O ERISA exclusion against Chubb PF-55506 and PF-55502. Example recomputed: 8,000,000 x 1.04^3 = 8,998,912, x 1.06^3 = 9,528,128, difference 529,216; paid 480,000; bond min(max(800,000, 1,000), 500,000) = 500,000.
- sources_checked: ERISA, 29 U.S.C. §1104(a) (exclusive purpose, prudent man, diversification, plan documents) sha256:c41884f90446e9f75256cf0b89d094130d745a69718827c1cdebb573bdbe3e6a; §1109(a) (personal liability to make good plan losses) sha256:0367782c69cbbc2522e78bb6f9699475ab7dd26386d5c0a047a5d1072df8b410; §1110(b) (plan-bought insurance must permit recourse; fiduciary or employer may buy) sha256:8fd31d55e8d7c5cbd6a3054619da077efbf22e71872d71c7ec8ae69f635f3b22; §1112(a) (bond against fraud or dishonesty, not less than 10% of funds handled, $1,000 minimum, $500,000 maximum, $1,000,000 for a plan holding employer securities or a pooled employer plan) sha256:46564def7660b50c21b4f9862e85aa6d4c4b6c10bccd00758d508007cc08308b — https://www.law.cornell.edu/uscode/text/29/; Lockheed Corp. v. Spink, 517 U.S. 882 (1996) (LII): employers adopting, modifying or terminating plans do not act as fiduciaries but are analogous to settlors, sha256:fb391df8395fadd874d411aa4f5ded665b149a6c8883d095a994a03bb5c220db — https://www.law.cornell.edu/supremecourt/text/517/882; Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: In review: F-001 (major) — the ERISA bond formula omits the $1,000,000 maximum for plans holding employer securities and pooled employer plans (29 U.S.C. 1112(a)); F-002 (minor) open.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): symbols bullet now adds 'For a plan that holds employer securities, or a pooled employer plan, the $500,000 cap becomes $1,000,000 (29 U.S.C. 1112(a))'; the theft example now states 'The plan holds no employer securities', so its $500,000 answer stands.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): recourse bullet and trap restated to 29 U.S.C. 1110(b) (plan-bought cover must permit recourse; a fiduciary may buy for his own account and the employer for its fiduciaries); 'waiver of recourse endorsement', 'contractual liability' and the 'Why the line moved' bullet deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the clean-up edits: the $1,000,000 cap and the example's 'no employer securities' against 29 U.S.C. 1112(a); recourse against 1110(b); deleted claims gone; examples unchanged (529,216; 480,000; 500,000).
- sources_checked: ERISA, 29 U.S.C. §1104(a) (exclusive purpose, prudent man, diversification, plan documents) sha256:c41884f90446e9f75256cf0b89d094130d745a69718827c1cdebb573bdbe3e6a; §1109(a) (personal liability to make good plan losses) sha256:0367782c69cbbc2522e78bb6f9699475ab7dd26386d5c0a047a5d1072df8b410; §1110(b) (plan-bought insurance must permit recourse; fiduciary or employer may buy) sha256:8fd31d55e8d7c5cbd6a3054619da077efbf22e71872d71c7ec8ae69f635f3b22; §1112(a) (bond against fraud or dishonesty, not less than 10% of funds handled, $1,000 minimum, $500,000 maximum, $1,000,000 for a plan holding employer securities or a pooled employer plan) sha256:46564def7660b50c21b4f9862e85aa6d4c4b6c10bccd00758d508007cc08308b — https://www.law.cornell.edu/uscode/text/29/; Lockheed Corp. v. Spink, 517 U.S. 882 (1996) (LII): employers adopting, modifying or terminating plans do not act as fiduciaries but are analogous to settlors, sha256:fb391df8395fadd874d411aa4f5ded665b149a6c8883d095a994a03bb5c220db — https://www.law.cornell.edu/supremecourt/text/517/882; Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: F-001 (major) and F-002 resolved. Medium: exclusions rest on one carrier specimen.
