---
target: questions/exam-fam/faml-6-17.md
created: 2026-10-23
---

## [F-001] SOA's decimal-point thousands separators kept without (as printed) marks
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- severity: minor
- status: open
- locus: options C, D, E
- claim: Options C-E read –28.000, –27.000, –26.000, unmarked, beside A and B's –30,000 and –29,000.
- evidence: SOA FAM-L sample questions p.63 (Q6.17) prints (C) –28.000, (D) –27.000, (E) –26.000 with periods, against (A) –30,000 and (B) –29,000 with commas — a typesetting slip read as -28 etc. by a European reader. The vault transcribed them faithfully but unmarked.
- source_rank: 1
- proposed_action: Mark each '(as printed)'.
- applied: true
- fingerprint: 7cd74dc89b40

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked each of C-E '(as printed)' in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind independent recomputation (SULT rebuilt from its Makeham law where used); key vs SOA key; stem/options diff against 110-300 dpi page renders; explanation vs SOA solution line by line; frontmatter (answer, type, points, topic, wiki_link targets exist)
- sources_checked: SOA Exam FAM-L Sample Questions (Oct 2024), Q6.17, p.63, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.17, p.43, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Blind recompute before reading the key: -30,107 unrounded; the SOA's -30,017 rounds its probabilities to three places, same option -> A; the vault key, the SOA's key (solutions p.43) and the SOA's printed solution agree. Stem, every number, symbol, subscript and all five options diffed against the booklet page image (p.63); no debris on any option, the source line sits in the stem. Explanation checked against the SOA's solution: same method, same figures, arithmetic resolves. Findings this run: SOA's decimal-point thousands separators kept without (as printed) marks — fixed and resolved.
