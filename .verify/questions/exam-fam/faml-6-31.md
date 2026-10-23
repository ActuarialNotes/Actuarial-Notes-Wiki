---
target: questions/exam-fam/faml-6-31.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute before the key; stem, every formula, subscript, table cell and option diffed against the rendered booklet page; explanation diffed line by line against the rendered SOA solution page; answer = SOA key; options distinct, no source-line debris on option E; wiki_link targets and topic page exist; validate_content.py clean
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.31, p.75, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.31, p.50, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.75; explanation matches the SOA solution p.50 in method and figures, arithmetic resolves; answer D equals the SOA key. Recompute: constant force 0.01 from 35 to 70: Abar35 = (0.01/0.06)(1-e^-2.1) + e^-2.1(0.51791) = 0.209679; abar=15.8064; 100,000 x 0.209679/15.8064 = 1326.5 (D). The SOA prints the two terms of Abar35 in the opposite order to its formula (0.063421 + 0.146257); the sum is right and the vault keeps the order as printed.
