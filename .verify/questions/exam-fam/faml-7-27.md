---
target: questions/exam-fam/faml-7-27.md
created: 2026-10-23
---

## [F-001] Explanation adds a clause the SOA does not print
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- severity: nit
- status: open
- locus: explanation, line before the 1V^e display
- claim: The page reads "Then, with P^e = G - 187," before the display.
- evidence: SOA FAM-L sample solutions p.77 (sha256:9e7f7b03…), Question 7.27: the SOA prints "Then, 1V^e = ..." with P^e shown only as the overbrace on G - 187, which the vault display already carries. The clause was deleted.
- source_rank: 1
- proposed_action: Delete "with P^e = G - 187".
- applied: true
- fingerprint: 760a3edb0ee0

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Deleted the added clause; the overbrace carries the label as in the SOA.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/8d0d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute (SULT recomputed from the Makeham law where used); answer key vs SOA; stem/options/tag diff against page image; explanation vs SOA solution; option debris; frontmatter, wiki_link targets exist
- sources_checked: SOA Exam FAM-L Sample Questions (October 2024), Q7.27, p.116, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (October 2024), Q7.27, p.77, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Recomputed blind: 212.97; SOA key B, vault key B. Stem, options and tag line diffed against the page image (130 dpi): match. Explanation follows the SOA's method and figures line by line. Added clause removed (F-001).
