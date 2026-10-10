---
target: questions/exam-disc-rm/discrm-an-022.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem with key and explanation withheld (matched key); key and every distractor rationale checked; arithmetic re-worked; wiki_link targets exist and fit; learning_objective equals the DISC-RM page's section title; facts checked against the sources listed
- sources_checked: CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.117-118 (PDF p.19): solvency-related measures, probability of ruin, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf
- note: Vault-written question: no publisher key, so medium per the MAS-I/Exam P precedent; sources are rank-3 references (no Institutes text is freely available).

## [F-001] Tags a Canadian-framed solvency page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: wiki_link
- claim: wiki_link includes Concepts/Solvency, which is framed around the MCT and PACICC.
- evidence: Concepts/Solvency defines solvency through the Canadian MCT ratio and PACICC research; the question tests the CAS ERM measure families, not Canadian capital rules.
- source_rank: 4
- proposed_action: Drop the Solvency tag or retag to a U.S./generic page.
- applied: false
- fingerprint: e0e2f7b5d50a

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Per lead decision: removed the Concepts/Solvency tag from wiki_link.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-check after retagging: wiki_link targets exist and fit; content unchanged since this run's verification
- sources_checked: CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.117-118 (PDF p.19), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf
- note: Re-verified after the retag that closed F-001. Vault-written question: medium.
