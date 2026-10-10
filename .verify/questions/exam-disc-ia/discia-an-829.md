---
target: questions/exam-disc-ia/discia-an-829.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading the key; key and every distractor rationale checked against the source; wiki_link tags and learning_objective (section title) checked; question_lint clean
- sources_checked: IRMI glossary, 'railroad protective liability', definition, sha256:fd4501160ac687ce88fc5b8e15e35adac26d680a50a130e8200b84954c71e24f — https://www.irmi.com/term/insurance-definitions/railroad-protective-liability; The Hartford, 'Railroad Protective Policy' (who is covered), Who's Covered, sha256:332b92af77f0910401e4211da1f5c42507014b6fbcd6e14779fb60079621fe28 — https://www.thehartford.com/resources/construction/railroad-protective-policy; Bill Wilson / David Surles, 'CGL Contractual Liability: Railroad Protective Liability 101', IA Magazine, Q&A, sha256:8d46e1c66a7ad21bdd50c2f22d8cb0b22a4c1e981aed998d5fd6875813414763 — https://www.iamagazine.com/?p=2826; ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), def 9.c and 9.f(1) (p.14), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Blind answer matched the key; key and every distractor rationale confirmed against the source named. Vault-written question, so medium per the MAS-I / Exam P precedent.

## [F-001] Railroad carve-out stated without its 'affecting' condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- severity: minor
- status: open
- locus: ## Explanation, 'Why not the others', C
- claim: Explanation said the CGL's insured contract definition carves out an indemnity of a railroad for construction or demolition within 50 feet of railroad property.
- evidence: CG 00 01 04 13 p.14, def. 9 closing para (1): the carve-out is for a contract indemnifying a railroad for BI/PD arising out of construction or demolition within 50 feet of railroad property AND affecting any railroad bridge or trestle, tracks, road-beds, tunnel, underpass or crossing. Same omission as Specialty General Liability Forms F-002. Key A unaffected.
- source_rank: 1
- proposed_action: Add the 'affecting' condition.
- applied: true
- fingerprint: 23aab01206ef

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed in this run: C's rationale now reads 'within 50 feet of railroad property and affecting its tracks, bridges, road-beds or crossings'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: delta re-check of the edited passage against the cited source; lint/verify_check clean
- sources_checked: IRMI glossary, 'railroad protective liability', definition, sha256:fd4501160ac687ce88fc5b8e15e35adac26d680a50a130e8200b84954c71e24f — https://www.irmi.com/term/insurance-definitions/railroad-protective-liability; The Hartford, 'Railroad Protective Policy' (who is covered), Who's Covered, sha256:332b92af77f0910401e4211da1f5c42507014b6fbcd6e14779fb60079621fe28 — https://www.thehartford.com/resources/construction/railroad-protective-policy; Bill Wilson / David Surles, 'CGL Contractual Liability: Railroad Protective Liability 101', IA Magazine, Q&A, sha256:8d46e1c66a7ad21bdd50c2f22d8cb0b22a4c1e981aed998d5fd6875813414763 — https://www.iamagazine.com/?p=2826; ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), def 9.c and 9.f(1) (p.14), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Re-verified after the dv11 fix to the open finding (now resolved); the change restates the passage to the source already cited, and nothing else in the file changed since this run's earlier pass. No open findings.
