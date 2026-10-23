---
target: questions/exam-fam/faml-2-01.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:36Z/ef0a
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, last align block (e_106 sum)
- claim: Explanation sums e_106 = sum_{i=1}^{i=4} {}_t p_106 with no marker, beside the earlier correct sum from t = 1 to 3.
- evidence: SOA FAM-L solutions p.3 (Q2.1) prints this second sum with index i from i=1 to i=4 over tp106 — an index slip (the summand is in t; the first line sums t = 1 to 3 since 4p106 = 0). The value 2.4786 is right. Kept as printed and marked, per the brief's (as printed) convention.
- source_rank: 1
- proposed_action: Mark the printed index slip '(as printed)'.
- applied: true
- fingerprint: 5bfccacfb284

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
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.1, p.5 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.1, p.3 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.5; key B is the SOA's (solutions p.3); the explanation follows the SOA's solution with its figures. Blind: mu_65 = 1/(4(omega-65)) = 1/180 gives omega = 110; e_106 = sum_{k=1}^{3} ((4-k)/4)^{1/4} = 0.9306 + 0.8409 + 0.7071 = 2.4786 (B).
