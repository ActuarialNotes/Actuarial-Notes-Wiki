---
target: questions/exam-disc-ia/discia-an-827.md
created: 2026-10-10
---

## [F-001] Distractor A's rationale does not produce $0
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- severity: minor
- status: open
- locus: ## Explanation, 'Why not the others', A
- claim: Explanation says A ($0) 'charges the office claim to Project P's aggregate as well, exhausting it.'
- evidence: Recomputed: charging the 200,000 office claim to Project P's aggregate leaves 2,000,000 - 200,000 - 800,000 - 900,000 = 100,000, so the third occurrence would be paid 100,000 (option B), not exhausted. The same 100,000 is what B's rationale (no endorsement) gives. Under CG 25 03 05 09 para B the office claim reduces only the general aggregate, so key C (300,000) is correct; only A's rationale is wrong.
- source_rank: 5
- proposed_action: Rewrite A's rationale (e.g. a reader who thinks the endorsement's aggregate does not apply until the general aggregate is exhausted), or change option A to a value its stated error actually produces.
- applied: false
- fingerprint: 11c8974d6ec1

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading the key; key and every distractor rationale checked against the source; wiki_link tags and learning_objective (section title) checked; question_lint clean
- sources_checked: ISO CG 25 03 05 09 Designated Construction Project(s) General Aggregate Limit (NY OGS SPC Exhibit 21), paras A, B, C, sha256:509a3393d259f4582657f70278d7e328c56fcf7c1af5b0fc3fc6a091ec1bec17 — https://ogs.ny.gov/spc-exhibit-21
- note: Blind answer matched the key; key and every distractor rationale confirmed against the source named. Vault-written question, so medium per the MAS-I / Exam P precedent. One minor open finding on an explanation sentence; the key is correct.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed as proposed: A's rationale now reads 'treats Project P's aggregate as exhausted; under CG 25 03 it still has $300,000 left, because the office claim reduces only the general aggregate' (CG 25 03 05 09 para B). Key C unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv11
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: delta re-check of the edited passage against the cited source; lint/verify_check clean
- sources_checked: ISO CG 25 03 05 09 Designated Construction Project(s) General Aggregate Limit (NY OGS SPC Exhibit 21), paras A, B, C, sha256:509a3393d259f4582657f70278d7e328c56fcf7c1af5b0fc3fc6a091ec1bec17 — https://ogs.ny.gov/spc-exhibit-21
- note: Re-verified after the dv11 fix to the open finding (now resolved); the change restates the passage to the source already cited, and nothing else in the file changed since this run's earlier pass. No open findings.
