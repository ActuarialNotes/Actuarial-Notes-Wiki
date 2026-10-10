---
target: Concepts/CGL Coverage A Insuring Agreement.md
created: 2026-10-10
---

## [F-001] CG 00 02 trigger called a claim-reporting requirement
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'An injury trigger', last sentences
- claim: Page says the claims-made version, CG 00 02, 'adds a retroactive date and a claim-reporting requirement'.
- evidence: FC&S (2014) reproduces CG 00 02 04 13 Coverage A para b(2)-(3) and c: the insurance applies only if a claim for damages is first MADE against any insured during the policy period or an ERP, a claim being deemed made when notice of it is received and recorded by any insured or by the insurer. FC&S adds that notice of an occurrence alone does not trigger coverage. The form is claims-made, not claims-made-and-reported; 'claim-reporting requirement' describes the latter. Stanovich (2012) p.1-2 agrees: the trigger is a claim made against an insured.
- source_rank: 3
- proposed_action: Replace 'a claim-reporting requirement' with wording saying the claim must be first made against an insured during the policy period (or an extended reporting period).
- applied: false
- fingerprint: 4309e23b369d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every rule, definition, exclusion/exception and number against the cited form edition read this run; worked examples recomputed; [[links]] resolve; paraphrase vs form wording (copyright)
- sources_checked: ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Section I Coverage A para 1.a-1.e (p.1); Section II para 1 (p.9); Section V defs 3, 4, 13, 17, 18 (pp.13-16), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; FC&S Editors, 'Claims-Made CGL Form' (PropertyCasualty360, Feb 18 2014), reproducing CG 00 02 04 13 Coverage A/B triggers, conditions and Section V Extended Reporting Periods, Coverage A trigger para b-c of CG 00 02 04 13, sha256:50deda297f1951ab725a435ed84e2aef1287e833a2365374cede46df9213a9b7 — https://www.propertycasualty360.com/fcs/2014/02/18/claims-made-cgl-form
- note: Every insuring-agreement element, condition b(1)-(3), paras c-e, the definitions and the coverage territory (incl. the suit-on-the-merits proviso) match CG 00 01 04 13. Three examples rechecked against paras b(3), def. 4.c and def. 17.b/para e. Medium, not high: the CG 00 02 sentence rests on FC&S's reproduction of the claims-made form (rank 3; no ISO specimen of CG 00 02 found), and the coverage-analysis ordering in the exam tip rests on the vault's Coverage Analysis page. One minor open finding on the CG 00 02 wording.
