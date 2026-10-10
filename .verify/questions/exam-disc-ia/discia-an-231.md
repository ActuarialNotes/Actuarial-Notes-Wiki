---
target: questions/exam-disc-ia/discia-an-231.md
created: 2026-10-10
---

## [F-001] Tags a Canadian-framed punitive damages page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: wiki_link: Concepts/Punitive Damages
- claim: The question tags Concepts/Punitive Damages for the U.S. rule that punitive damages are not compensatory.
- evidence: Concepts/Punitive Damages.md is framed on Canadian law (Whiten v. Pilot; bad-faith claims handling). The U.S. distinction is LII Wex 'compensatory damages' / 'punitive damages'. The question itself is correct.
- source_rank: 3
- proposed_action: Keep or drop the tag once Punitive Damages has a U.S. treatment; maintainer decision.
- applied: false
- fingerprint: 4ddd3b7e37ed

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading the key; key and every distractor explanation checked against the sources; wiki_link tags and learning_objective (exact exam section title) checked; question_lint clean
- sources_checked: Cornell LII Wex, "special damages", whole entry, sha256:50a0d567faf8e938120a8709acd04442ee0437f98dc5e175332ffb6f96c4f848 — https://www.law.cornell.edu/wex/special_damages; Cornell LII Wex, "compensatory damages", whole entry, sha256:92774229ad1d9384ec8fcb5661d421edc88df5736e2e901f042c3cf93c07a4d5 — https://www.law.cornell.edu/wex/compensatory_damages
- note: Blind answer matched the key. Key C: 40,000+25,000+10,000+120,000=195,000; punitive excluded from compensatory (LII). Vault-written question with no publisher key, so medium per the MAS-I / Exam P precedent. Open: one minor finding.
