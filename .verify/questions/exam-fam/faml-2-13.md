---
target: questions/exam-fam/faml-2-13.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, 4p89 line
- claim: Explanation uses [29,183.3/45,995.6]^1.035 (0.96079) = 0.59996 with no marker.
- evidence: SOA FAM-L solutions p.9 (Q2.13) prints 29,183.3 for l93; the SOA's own FAM tables (SULT, p.21) give l93 = 29,183.8 (and the Makeham law reproduces 29,183.78). With 29,183.8 the line is 0.59998, 4q89 = 0.400; key D unaffected. Kept as printed and marked.
- source_rank: 1
- proposed_action: Mark the printed l93 value '(as printed)'.
- applied: true
- fingerprint: 0d680ed2dc0b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '(as printed)' in place; the SOA's figures are kept as printed (P1), the key is unaffected.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute from the stem before reading the key; stem, table cells, notation and options diffed against the 110-dpi booklet page image; keyed letter against the SOA key; explanation diffed line by line against the rendered SOA solution page (method, figures, arithmetic); source line placed above the options, none on option E; frontmatter (answer, type, points, topic, wiki_link targets exist)
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.13, p.12 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.13, p.9 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table, p.21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Stem and options match booklet p.12; key D is the SOA's (solutions p.9); the explanation follows the SOA's solution with its figures. Blind: 4p89 = (4p89^SULT)^{1.035} e^{-0.04}; from the SULT Makeham law (A = 0.00022, B = 2.7e-6, c = 1.124) 4p89^SULT = 29,183.8/45,995.6 = 0.63448, so 4p89 = 0.59998 and 4q89 = 0.400 (D). The FAM tables print l93 = 29,183.8; the SOA solution prints 29,183.3 (slip below; D either way).
