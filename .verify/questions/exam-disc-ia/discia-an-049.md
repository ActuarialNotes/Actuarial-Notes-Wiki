---
target: questions/exam-disc-ia/discia-an-049.md
created: 2026-10-10
---

## [F-001] wiki_link tags a non-U.S. page (Collateral Benefits) for a U.S. rule
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: frontmatter wiki_link
- claim: wiki_link includes Concepts/Collateral+Benefits
- evidence: The question tests the U.S. collateral source rule (LII Wex: damages 'cannot be diminished by any compensation received from other sources, including health insurance'); Concepts/Collateral Benefits.md is Canadian (Statutory Accident Benefits, Employment Insurance) and says such benefits 'may be deducted from a tort award' — the opposite rule. Mastery recorded against that page would send the reader to the wrong framework.
- source_rank: 3
- proposed_action: Remove the tag.
- applied: true
- fingerprint: 6819a6ec173c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: tag removed; remaining tags checked against the question's content.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem with key and explanation hidden: specials 40,000 + 15,000 = 55,000, not reduced — agrees with the key. Key, every distractor's rationale and the explanation's arithmetic then checked against the cited text; learning_objective matches the DISC-IA page's section title; wiki_link targets exist and are U.S.-framed. Tag 'Concepts/Collateral+Benefits' removed (F-001): that page is Canadian and teaches deduction.
- sources_checked: Cornell LII Wex, 'special damages' (fetched 2026-10-10), sha256:50a0d567faf8e938120a8709acd04442ee0437f98dc5e175332ffb6f96c4f848 — https://www.law.cornell.edu/wex/special_damages; Cornell LII Wex, 'pain and suffering' (fetched 2026-10-10), sha256:8bebda58f72744ca76736c295defa015303743f52b27e54eb56af05443504a8f — https://www.law.cornell.edu/wex/pain_and_suffering; Cornell LII Wex, 'collateral source rule' (fetched 2026-10-10), sha256:68039d6a72a6692b38df2497943d4749ae907b17351045a558d3eb2577fc71c6 — https://www.law.cornell.edu/wex/collateral_source_rule
- note: Vault-written question; no publisher key, so medium per the MAS-I/Exam P precedent.
