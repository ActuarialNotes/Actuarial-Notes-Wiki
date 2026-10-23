---
target: questions/exam-fam/faml-5-05.md
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
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.5, p.44 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.5, p.29 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Stem, formulas and options match booklet p.44; explanation matches the SOA solution p.29 in method and figures, arithmetic resolves; answer A equals the SOA key. Recompute: p^S=p45 e^{-0.05}; 100[1+v p^S a-due46(17.6706)]=1699.6 (A).
