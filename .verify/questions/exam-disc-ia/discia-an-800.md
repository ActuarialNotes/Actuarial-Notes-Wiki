---
target: questions/exam-disc-ia/discia-an-800.md
created: 2026-10-10
---

## [F-001] Explanation misapplies paragraph c
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- severity: minor
- status: open
- locus: ## Explanation, third sentence
- claim: Explanation says 'Paragraph c then says damage not known before the policy period includes its continuation, so the known injury condition does not bar coverage.'
- evidence: CG 00 01 04 13 p.1, Coverage A para c: BI or PD 'which occurs during the policy period' and was not known before it 'includes any continuation, change or resumption ... after the end of the policy period'. It extends a policy's response past its END; it says nothing about damage that began before inception, as here (leak began in May, policy incepts July 1), and it is not what makes b(3) inapplicable. b(3) alone answers the stem: neither employee is a para-1 insured or an authorized employee. Key C is correct.
- source_rank: 1
- proposed_action: Delete the sentence about paragraph c (or replace it with a statement that b(3) alone decides the question).
- applied: false
- fingerprint: 2eb53da2341c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading the key; key and every distractor rationale checked against the source; wiki_link tags and learning_objective (section title) checked; question_lint clean
- sources_checked: ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Coverage A para 1.b(3)-1.d (p.1); Section II para 1 (p.9), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Blind answer matched the key; key and every distractor rationale confirmed against the source named. Vault-written question, so medium per the MAS-I / Exam P precedent. One minor open finding on an explanation sentence; the key is correct.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed as proposed: the sentence about paragraph c is deleted; the explanation now rests on b(3) alone ('...does not trigger the condition, and the known injury condition does not bar coverage'). Key C unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: delta re-check of the edited passage against the cited source; lint/verify_check clean
- sources_checked: ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Coverage A para 1.b(3)-1.d (p.1); Section II para 1 (p.9), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Re-verified after the dv11 fix to the open finding (now resolved); the change restates the passage to the source already cited, and nothing else in the file changed since this run's earlier pass. No open findings.
