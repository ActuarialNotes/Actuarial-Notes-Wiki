---
target: questions/exam-fam/faml-6-11.md
created: 2026-10-23
---

## [F-001] SOA slip kept without its (as printed) mark
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, A'_50 line
- claim: A'_50 = v(0.048) + (1-0.048)(0.39788) = 0.41037, the second term without its v, unmarked.
- evidence: SOA FAM-L sample solutions p.39 (Q6.11) prints 'v(0.048)+(1-0.048)(0.39788) = 0.41037': the v is missing from the second term in print, and 0.41037 needs it (v(0.048) + v(0.952)(0.39788) = 0.046154 + 0.364213 = 0.41037; without v it is 0.4249). The vault transcribed it faithfully but unmarked.
- source_rank: 1
- proposed_action: Mark the line '(as printed)'.
- applied: true
- fingerprint: 97e1dbe6e931

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '(as printed)' in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind independent recomputation (SULT rebuilt from its Makeham law where used); key vs SOA key; stem/options diff against 110-300 dpi page renders; explanation vs SOA solution line by line; frontmatter (answer, type, points, topic, wiki_link targets exist)
- sources_checked: SOA Exam FAM-L Sample Questions (Oct 2024), Q6.11, p.58, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.11, p.39, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Blind recompute before reading the key: 0.0407 -> C; the vault key, the SOA's key (solutions p.39) and the SOA's printed solution agree. Stem, every number, symbol, subscript and all five options diffed against the booklet page image (p.58); no debris on any option, the source line sits in the stem. Explanation checked against the SOA's solution: same method, same figures, arithmetic resolves. Findings this run: SOA slip kept without its (as printed) mark — fixed and resolved.
