---
target: questions/exam-astam/astam-011.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every computed part before reading the key and solution; stem, table and formula diff against the 130-dpi page images of the question PDF; explanation diff against the solution page images (method, figures, arithmetic, align* rows); frontmatter (type multi-part, wiki_link targets and topic page exist, validate_content.py passes)
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q11, p.16, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q11, pp.23-24, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed: lambda-hat 0.227; Poisson expected counts 1593.842, 361.802, 41.065, 3.107, 0.176, 0.008; chi-square 29.571 with 3+ pooled (29.564 unrounded); pi-hat 0.8150, geometric expected counts and chi-square 0.762. Agree. Stem matches p.16; solutions pp.23-24. The align* rows in (a)(i), once split by the linter, now read as the SOA printed them: each row a true equality (Sum k/n = k-bar, then the numeric 0.227).
