---
target: questions/exam-astam/astam-006.md
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
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q6, p.11, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q6, pp.14-15, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed: alpha-hat = 97/(925.314 + 3 log 30,683 - 100 log 10,683) = 3.3836; Hessian -8.4725, 0.002113, -5.483e-7; with the SOA's rounded entries the inverse is (3.034, 11,693; 11,693, 4.689e7) (unrounded 3.029, 11,673, 4.681e7, a rounding difference the solutions' preface allows). Stem, the three given sums and every derivation row match pp.11 and 14-15, including the SOA's repeated matrix in (d). (c)'s bare 3.3836 is the SOA's whole solution, not a slip.
