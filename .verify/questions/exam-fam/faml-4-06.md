---
target: questions/exam-fam/faml-4-06.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute before the key; stem, every formula, subscript, table cell and option diffed against the rendered booklet page (130 dpi); explanation diffed line by line against the rendered SOA solution page; answer = SOA key; no option carries source-line debris; wiki_link targets and topic page exist; validate_content.py clean; SULT values recomputed from the FAM tables PDF
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.6, p.29 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.6, p.20 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Stem, formulas and options match booklet p.29; explanation matches the SOA solution p.20 in method and figures, arithmetic resolves; answer B equals the SOA key. Recompute: q=(0.95)^k q^SULT: 0.010413, 0.011087, 0.011806; EPV=29.848 (B).
