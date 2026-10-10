---
target: Concepts/Specialty General Liability Forms.md
created: 2026-10-10
---

## [F-001] List of ISO GL coverage forms presented as complete
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- severity: minor
- status: open
- locus: first bullet 'The ISO coverage forms'
- claim: Page says that alongside CG 00 01 and CG 00 02 'the general liability coverage forms are' CG 00 09, 00 33, 00 34, 00 35, 00 37, 00 38, plus pollution forms CG 00 39/00 40.
- evidence: Insurance Thought Leadership (Mar 2013) lists, among the 04 13 GL program's coverage forms, also CG 00 42 Underground Storage Tank Policy Designated Tanks, CG 00 65 Electronic Data Liability Coverage Form and CG 00 66 Product Withdrawal Coverage Form. insurancexdate's 'Coverage (8 forms)' category lists only the eight the page names, so the page's list matches that site's grouping but not the full program.
- source_rank: 3
- proposed_action: Say the forms 'include' these, or add CG 00 42, CG 00 65 and CG 00 66.
- applied: false
- fingerprint: 78525ba87e80

## [F-002] Railroad carve-out from insured contract stated without its 'affecting' condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'Railroad protective, CG 00 35', last sentence; repeated in examples 1(b) and 2
- claim: Page says an agreement indemnifying a railroad for construction or demolition within 50 feet of railroad property is carved out of 'insured contract'.
- evidence: CG 00 01 04 13 p.14, def. 9 closing para (1): the carve-out from para f is for a contract that indemnifies a railroad for BI or PD arising out of construction or demolition operations within 50 feet of any railroad property AND affecting any railroad bridge or trestle, tracks, road-beds, tunnel, underpass or crossing. Para 9.c's easement/license exception needs no 'affecting' condition. The page drops that condition from the para f carve-out.
- source_rank: 1
- proposed_action: Add 'and affecting any railroad bridge or trestle, tracks, road-beds, tunnel, underpass or crossing' to the para f carve-out where it is stated.
- applied: false
- fingerprint: 1ecb5ae9c0c8

## [F-003] Railroad protective declarations form number rests on one secondary site
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'Railroad protective, CG 00 35', parenthetical '(form CG DS 04)'
- claim: Page names the railroad protective declarations as form CG DS 04.
- evidence: Only insurancexdate.com (CG 00 35 and CG DS 04 summaries, same site, secondary) names CG DS 04. Iowa DOT SP-230227 and UNCG's requirements confirm that the contractor, job location and description of operations appear on the declarations but do not name the declarations form; The Hartford and IA Magazine confirm the contractor is not covered. No ISO specimen of CG 00 35 or CG DS 04 found in two searches.
- source_rank: 3
- proposed_action: Confirm CG DS 04 against an ISO specimen or a filed copy, or drop the parenthetical.
- applied: false
- fingerprint: 56d99196f7d9

## [F-004] Links a Canadian-framed Vicarious Liability page for a U.S. course
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'Owners and contractors protective (OCP), CG 00 09', link [[Vicarious Liability]]
- claim: The OCP bullet links [[Vicarious Liability]] for the owner's vicarious liability.
- evidence: Concepts/Vicarious Liability.md frames the topic for Exam 6C: provincial Highway Traffic Act owner liability and the Canadian 'materially increased the risk' test. writers' followups (D2) already flag it as Canadian-framed. DISC-IA is a U.S. course; no U.S. vicarious liability page exists in Concepts/.
- source_rank: 4
- proposed_action: Write a U.S. vicarious liability (respondeat superior) page or add a U.S. section to the existing one, then relink.
- applied: false
- fingerprint: 424e3d2a0f99

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: in_review
- checks_run: every rule, definition, exclusion/exception and number against the cited form edition read this run; worked examples recomputed; [[links]] resolve; paraphrase vs form wording (copyright); full-text check of each form number and named form against the sources
- sources_checked: 'ISO Form Changes Commercial General Liability', Insurance Thought Leadership, Mar 19 2013 (list of 04 13 GL forms), 04 13 GL form list, sha256:ac38c1da66b5a9e8c5d1fade4f939dec3165f89ecbf94027fff7bcffb83ff220 — https://www.insurancethoughtleadership.com/commercial-lines/iso-form-changes-commercial-general-liability; IRMI glossary, 'protective liability insurance', definition, sha256:125ca4f6ab845cf95cf9ca80a75c602707bf7543b012b52fce0b812490defb8a — https://www.irmi.com/term/insurance-definitions/protective-liability-insurance; IRMI glossary, 'owners and contractors protective (OCP) liability coverage', definition, sha256:23f03e4cfed80ccf026d0dab18a94e9c6474f377e57126ba4f63e2b61292709b — https://www.irmi.com/term/insurance-definitions/owners-and-contractors-protective-(ocp)-liability-coverage; IRMI glossary, 'designated contractor', definition, sha256:7dc1f90691ae185072f75769dbc19acbbbf3fd6d34248621856ccbd6638e3174 — https://irmi.com/term/insurance-definitions/designated-contractor; IRMI glossary, 'railroad protective liability', definition, sha256:fd4501160ac687ce88fc5b8e15e35adac26d680a50a130e8200b84954c71e24f — https://www.irmi.com/term/insurance-definitions/railroad-protective-liability; The Hartford, 'Railroad Protective Policy' (who is covered), Who's Covered, sha256:332b92af77f0910401e4211da1f5c42507014b6fbcd6e14779fb60079621fe28 — https://www.thehartford.com/resources/construction/railroad-protective-policy; Bill Wilson / David Surles, 'CGL Contractual Liability: Railroad Protective Liability 101', IA Magazine, Q&A, sha256:8d46e1c66a7ad21bdd50c2f22d8cb0b22a4c1e981aed998d5fd6875813414763 — https://www.iamagazine.com/?p=2826; Iowa DOT Special Provision SP-230227 (2023), Railroad Protective Liability Insurance requirements incl. CG 00 35 04 13, p.2 items 3.b-g, sha256:81cf807ceae6f85e0164b0622bcdd8df23643b9fceff4e1f730604cac46e329f — https://ia.iowadot.gov/specifications/provisions/2023/SP-230227.pdf; UNCG, Railroad Protective Liability Requirements (2023), pp.1-2, sha256:d428074182ad3f355e0d0c4efd57f9fe87eb827f51bbd500ff3b2176fb6f1b51 — https://risk.uncg.edu/wp-content/uploads/2023/04/Railroad-Protective-Liability-Requirements.pdf; ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Coverage A exclusion c (p.2); def 9.c and 9.f(1) (p.14); def 16 (p.15), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; Ted Kinney, 'Liquor Liability Coverage Changes under New ISO Forms', IA Magazine, May 23 2013, CG 00 33/00 34, CG 24 06, CG 25 14, sha256:a58026708cc1e9f3a44e92763eb3f3fd58afd33720eaca1357199cf9de997431 — https://www.iamagazine.com/2013/05/23/liquor-liability-coverage-changes-under-new-iso-forms/; FC&S, 'Products-Completed Operations Coverage' (PropertyCasualty360, Jul 9 2018) on CG 00 37 04 13 / CG 00 38 04 13, CG 00 37/00 38 04 13 overview, sha256:220e0e97057debfc47aed925e94f572bdbad097c5f6ba25203dc9df1cc64562d — https://www.propertycasualty360.com/fcs/2018/07/09/products-completed-operations-coverage/; insurancexdate.com, CG 00 37 form summary (secondary), CG 21 04 pairing, sha256:e710bfe6672c2a3312d76265a923dc0dd5542a4214ce78dcb9e960334b115cba — https://insurancexdate.com/insurance-forms/CG/CG-00-37/; DASNY sample endorsements: ISO CG 20 10 04 13, CG 20 37 04 13, CG 20 01 04 13, CG 20 37 04 13 header lists Products/Completed Operations Liability Coverage Part, sha256:dcb2734e92fede914e0caaf08f46ba527e34cfde7c218b021bd970a0315ee2a1 — https://www.dasny.org/sites/default/files/rfp-documents/2024-01/5b.%20Sample%20Endorsement.pdf; ISO CG 24 04 05 09 Waiver of Transfer of Rights of Recovery Against Others to Us, header, sha256:9b2b5c2d0afcd1dfd98d7bdc7595929ba25980b93e947439f3cab050947200de — https://www.mofbinsurance.com/Content/PDFs/PolicyForms/CPP/CG24040509.pdf
- note: Nearly every claim now checks: OCP and protective liability (IRMI x3), railroad protective named insured / contractor buys / contractor not covered / railcar damage (IRMI, The Hartford, IA Magazine, Iowa DOT, UNCG), 04 13 editions incl. CG 00 39/00 40 (ITL), liquor forms, trusts, CG 24 06, CG 25 14 (Kinney + ITL), CG 00 37/00 38 standalone with a separate aggregate, used when insurers won't write products in the CGL (FC&S 2018 + insurancexdate), endorsement headings (ISO specimens). Left in_review because the CG DS 04 form number rests on a single secondary site and could not be confirmed against a specimen; plus three other minor findings (form list presented as complete, railroad carve-out missing its 'affecting' condition, Canadian-framed Vicarious Liability link). Resolve the CG DS 04 finding (confirm or drop) and this page can be verified at medium.
