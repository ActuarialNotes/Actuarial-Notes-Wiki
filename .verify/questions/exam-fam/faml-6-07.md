---
target: questions/exam-fam/faml-6-07.md
created: 2026-10-23
---

## [F-001] SOA slip kept without its (as printed) mark
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, fourth approach, last line
- claim: The last line of the fourth approach reads {}_{20}p_{40} ä_{20|6%} π with no mark, though the question's i is 5%.
- evidence: SOA FAM-L sample solutions p.38 (Q6.7) prints the line ending '- 20p40 ä_{20|6%} π' — a slip for 5% (the first approach on p.37 writes ä_{20|5%}, and the line above is π 20p40 (1-v^20)/d at i = 5%). The vault transcribed it faithfully but unmarked.
- source_rank: 1
- proposed_action: Mark the 6% '(as printed)'.
- applied: true
- fingerprint: fef33e682fb4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked the SOA's 6% '(as printed)' in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind independent recomputation (SULT rebuilt from its Makeham law where used); key vs SOA key; stem/options diff against 110-300 dpi page renders; explanation vs SOA solution line by line; frontmatter (answer, type, points, topic, wiki_link targets exist)
- sources_checked: SOA Exam FAM-L Sample Questions (Oct 2024), Q6.7, p.54, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.7, p.37-38, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Blind recompute before reading the key: 2880.2 -> C; the vault key, the SOA's key (solutions p.37-38) and the SOA's printed solution agree. Stem, every number, symbol, subscript and all five options diffed against the booklet page image (p.54); no debris on any option, the source line sits in the stem. Explanation checked against the SOA's solution: same method, same figures, arithmetic resolves. SULT values the solution uses spot-checked against the FAM tables pp.20-21. Findings this run: SOA slip kept without its (as printed) mark — fixed and resolved.
