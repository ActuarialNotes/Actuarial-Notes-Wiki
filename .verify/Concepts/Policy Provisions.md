---
target: Concepts/Policy Provisions.md
created: 2026-10-10
---

## [F-001] Frozen-pipe exclusion described with an occupancy qualifier the 05 11 edition does not have
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: example 'Frozen Pipes in an Empty House', first paragraph of the answer
- claim: 'The HO-3 excludes freezing of the plumbing in an unoccupied dwelling unless the insured used reasonable care to maintain heat or to shut off the water and drain the system.'
- evidence: HO 00 03 05 11, Section I – Perils Insured Against A.2.c(1) (p.8, Maine Bureau copy): freezing of a plumbing system ... 'This provision does not apply if you have used reasonable care to: (a) Maintain heat in the building; or (b) Shut off the water supply and drain all systems and appliances of water.' There is no 'unoccupied' condition in this edition (Coverage C peril 14 likewise conditions only on reasonable care). The example's answer is unchanged — neither precaution was taken, so the exclusion applies; with heat kept, 14,000 + 6,000 - 1,000 = 19,000.
- source_rank: 1
- proposed_action: Delete 'in an unoccupied dwelling'.
- applied: true
- fingerprint: 7415c8432623

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: 'The HO-3 excludes freezing of the plumbing unless the insured used reasonable care ...' (HO 00 03 05 11 A.2.c(1)).

## [F-002] Six-category taxonomy and the purposes of exclusions attributed to The Institutes without a readable source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: lead ('The Institutes sort them into six categories'); bullet 'Exclusions' (six purposes); bullet 'Definitions' ('Courts give undefined words their ordinary meaning')
- claim: The Institutes sort provisions into declarations, definitions, insuring agreements, exclusions, conditions and miscellaneous provisions; exclusions serve six listed purposes; courts give undefined words their ordinary meaning.
- evidence: The Institutes' text is not public. A web search found the six-part division in university lecture notes (King Saud University 'chapter six', UNLV FIN 322 slides, both following Rejda) but both hosts reset the connection and could not be read this run. IRMI 'exclusion' (read) gives a definition, not purposes. Contra proferentem for ambiguity is supported (LII), the ordinary-meaning rule is not in any page read. The rest of the page checks against HO 00 03 05 11, CG 00 01 04 13 and IRMI (see the pass).
- source_rank: 3
- proposed_action: Cite The Institutes' (or Rejda's) text for the taxonomy and the purposes of exclusions.
- applied: false
- fingerprint: 6c6ee5e91941

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: in_review
- checks_run: CGL Coverage A insuring agreement (legally obligated to pay as damages because of BI/PD, right and duty to defend; occurrence in coverage territory during the policy period): CG 00 01 04 13 Coverage A 1.a-b. Frozen pipes: HO-3 A.2.c(1) and peril 14 — F-001 fixed; recomputed 14,000 + 6,000 - 1,000 = 19,000 (one deductible per loss, HO-3 Condition B). Contractor example: client's car within Coverage A, min(22,000, 1,000,000) = 22,000; the insured's own truck outside the agreement (damages owed to others) and excluded by 2.j; employee injury excluded by employer's liability 2.e. Declarations, insuring agreements, exclusions, conditions against IRMI. Payment-function notation is the vault's own.
- sources_checked: ISO CG 00 01 04 13, Commercial General Liability Coverage Form (Cooper & Scully copy), Coverage A 1.a-b, Exclusions 2.e and 2.j, Supplementary Payments (pp.1-2, 8-9), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Perils Insured Against A.2.c(1), Coverage C peril 14, Section I Conditions C.8 (pp.8, 12, 14), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; IRMI Insurance Glossary, 'declarations' (fetched 2026-10-10), sha256:4a5f12e7b5f4f9eabf5b519cee03f5b46cdbd6d2f69e544e4c3f89afe40db29c — https://www.irmi.com/term/insurance-definitions/declarations; IRMI Insurance Glossary, 'insuring agreement' (fetched 2026-10-10), sha256:9edf607fea438a90ad44c611deee77d7866d809a96088da7ebc810860a49975f — https://www.irmi.com/term/insurance-definitions/insuring-agreement; IRMI Insurance Glossary, 'exclusion' (fetched 2026-10-10), sha256:97f68148c1497de089ad8471d0f95ee3f74ec75db149c52761f1382183cb64e7 — https://www.irmi.com/term/insurance-definitions/exclusion; IRMI Insurance Glossary, 'policy conditions' (fetched 2026-10-10), sha256:ab5225f0b2d79a69ce4994722a3f9db6e1b18a0820b75e48ea47fa46c0bae80f — https://www.irmi.com/term/insurance-definitions/policy-conditions; Cornell LII Wex, 'contra proferentem' (fetched 2026-10-10), sha256:e17e688d536be7c5603d1061dd780ba795f218487fddb7b78bff817bb6f654f1 — https://www.law.cornell.edu/wex/contra_proferentem
- note: Left in_review: the six-category taxonomy, the six purposes of exclusions and the ordinary-meaning rule need a readable Institutes or textbook source (F-002). F-001 fixed.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Lead-authorized clean-up, applied: deleted 'The Institutes sort them into six categories ...', the six purposes of exclusions, 'Courts give undefined words their ordinary meaning' (the sentence now keeps only reading ambiguity against the drafter, LII contra proferentem), the 'morale hazard purpose of exclusions' sentence in the frozen-pipe example and the tip's 'name the six categories ... explain the purposes of exclusions'. 'Miscellaneous provisions' restated as 'Other provisions': other insurance and settling a dispute over the amount of loss, which HO 00 03 05 11 places among its Section I conditions (G, F).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the F-002 clean-up. Remaining claims: CGL Coverage A agreement (CG 00 01 04 13), HO-3 freezing exclusion and peril 14, Section I Conditions C, F, G (HO 00 03 05 11), declarations/insuring agreement/exclusion/conditions (IRMI), contra proferentem (LII); defined terms in quotation marks have special meaning (CG 00 01 preamble). Both examples recomputed earlier (19,000; 22,000).
- sources_checked: ISO CG 00 01 04 13, Commercial General Liability Coverage Form (Cooper & Scully copy), Coverage A 1.a-b, Exclusions 2.e and 2.j, Supplementary Payments (pp.1-2, 8-9), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf; ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Perils Insured Against A.2.c(1), Coverage C peril 14, Section I Conditions C.8 (pp.8, 12, 14), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; IRMI Insurance Glossary, 'declarations' (fetched 2026-10-10), sha256:4a5f12e7b5f4f9eabf5b519cee03f5b46cdbd6d2f69e544e4c3f89afe40db29c — https://www.irmi.com/term/insurance-definitions/declarations; IRMI Insurance Glossary, 'insuring agreement' (fetched 2026-10-10), sha256:9edf607fea438a90ad44c611deee77d7866d809a96088da7ebc810860a49975f — https://www.irmi.com/term/insurance-definitions/insuring-agreement; IRMI Insurance Glossary, 'exclusion' (fetched 2026-10-10), sha256:97f68148c1497de089ad8471d0f95ee3f74ec75db149c52761f1382183cb64e7 — https://www.irmi.com/term/insurance-definitions/exclusion; IRMI Insurance Glossary, 'policy conditions' (fetched 2026-10-10), sha256:ab5225f0b2d79a69ce4994722a3f9db6e1b18a0820b75e48ea47fa46c0bae80f — https://www.irmi.com/term/insurance-definitions/policy-conditions; Cornell LII Wex, 'contra proferentem' (fetched 2026-10-10), sha256:e17e688d536be7c5603d1061dd780ba795f218487fddb7b78bff817bb6f654f1 — https://www.law.cornell.edu/wex/contra_proferentem
- note: Medium: IRMI and LII (rank 3) carry the category definitions.
