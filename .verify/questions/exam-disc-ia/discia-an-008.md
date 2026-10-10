---
target: questions/exam-disc-ia/discia-an-008.md
created: 2026-10-10
---

## [F-001] wiki_link tags a non-U.S. page (Notes to Financial Statements) for a U.S. rule
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: frontmatter wiki_link
- claim: wiki_link includes Concepts/Notes+to+Financial+Statements
- evidence: The question tests the U.S. statutory Note 1 disclosure of SSAP No. 1 ¶7 (AP&P March 2025, PDF p.48); Concepts/Notes to Financial Statements.md opens 'Under IFRS 17' and contains no statutory notes, SSAP No. 1, Note 1, prescribed or permitted practice. Mastery recorded against that page would send the reader to the wrong framework.
- source_rank: 1
- proposed_action: Remove the tag.
- applied: true
- fingerprint: 481e619f3c71

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
- checks_run: Blind recompute from the stem with key and explanation hidden: D: prescribed; SSAP 1 ¶7 disclosure — agrees with the key. Key, every distractor's rationale and the explanation's arithmetic then checked against the cited text; learning_objective matches the DISC-IA page's section title; wiki_link targets exist and are U.S.-framed. Tag 'Concepts/Notes+to+Financial+Statements' removed (F-001): that page is IFRS 17-only.
- sources_checked: NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble Q&A Q2 (PDF p.44); SSAP No. 1 ¶7 (PDF p.48), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf
- note: Vault-written question; no publisher key, so medium per the MAS-I/Exam P precedent.
