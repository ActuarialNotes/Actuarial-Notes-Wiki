---
target: questions/exam-disc-ia/discia-an-235.md
created: 2026-10-10
---

## [F-001] Topic and tag point at the Canadian joint and several liability page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: topic: Joint and Several Liability; wiki_link: Concepts/Joint and Several Liability
- claim: A U.S. joint and several liability question is filed under topic 'Joint and Several Liability' and tags its page.
- evidence: Concepts/Joint and Several Liability.md is built on the Harris reading (IBC and the Ontario Trial Lawyers Association, Exam 6C). The doctrine's definition there is jurisdiction-neutral and correct, and the U.S. treatment is on Concepts/Tort Law.md, also tagged.
- source_rank: 3
- proposed_action: Make Tort Law the topic, or add a U.S. section to the page; maintainer decision.
- applied: false
- fingerprint: a1a3535807b0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading the key; key and every distractor explanation checked against the sources; wiki_link tags and learning_objective (exact exam section title) checked; question_lint clean
- sources_checked: Cornell LII Wex, "joint and several liability", whole entry, sha256:907bf1f785eab437a0b3da0331f065d205461aad65c49955408c9687146bdf55 — https://www.law.cornell.edu/wex/joint_and_several_liability
- note: Blind answer matched the key. Key D: each defendant liable for the full extent; contribution worthless against an insolvent co-defendant (LII example). Vault-written question with no publisher key, so medium per the MAS-I / Exam P precedent. Open: one minor finding.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: topic set to 'Tort Law' and the Joint and Several Liability tag dropped; wiki_link is Concepts/Tort Law. Stem and key D unchanged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-read the edited passages against the sources cited; links resolve; question_lint clean
- sources_checked: Cornell LII Wex, "joint and several liability", whole entry, sha256:907bf1f785eab437a0b3da0331f065d205461aad65c49955408c9687146bdf55 — https://www.law.cornell.edu/wex/joint_and_several_liability
- note: Re-verified after the clean-up edits (all open findings resolved in this run). Blind answer matched the key. Key D: each defendant liable for the full extent; contribution worthless against an insolvent co-defendant (LII example). Vault-written question with no publisher key, so medium per the MAS-I / Exam P precedent.
