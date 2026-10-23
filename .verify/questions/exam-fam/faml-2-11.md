---
target: questions/exam-fam/faml-2-11.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, 'Another form' paragraph
- claim: Explanation gives mu = -ln(902/960) = 0.0095833, l81.1 = 959.08 and l81.6 = 954.496 with no marker.
- evidence: SOA FAM-L solutions p.8 (Q2.11) prints exactly these figures. They are wrong: -ln(902.4/960) = 0.06188 (and -ln(902/960) = 0.06232), so l81.1 = 960 x 0.94^0.1 = 954.08 and l81.6 = 960 x 0.94^0.6 = 925.03; with those, (954.08 - 925.03)/976 = 0.02977, the main line's 0.02978. The printed 959.08 and 954.496 follow from the wrong mu. Key C unaffected. Kept as printed and marked on all three figures.
- source_rank: 1
- proposed_action: Mark the three printed figures '(as printed)'.
- applied: true
- fingerprint: 18ff49af0909

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
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.11, p.11 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.11, p.8 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.11; key C is the SOA's (solutions p.8); the explanation follows the SOA's solution with its figures. Blind: 0.4p80.6 = 0.96/0.976 = 0.983607 (UDD); then 0.94^0.1 - 0.94^0.6 = 0.993831 - 0.963569 = 0.030262 (constant force); product 0.029766 (C). The SOA's main line (0.02978) agrees; its alternative's mu is a printed slip (below).
