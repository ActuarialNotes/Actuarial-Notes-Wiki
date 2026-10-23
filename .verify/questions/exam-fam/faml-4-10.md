---
target: questions/exam-fam/faml-4-10.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute before the key; stem, every formula, subscript, table cell and option diffed against the rendered booklet page (130 dpi); explanation diffed line by line against the rendered SOA solution page; answer = SOA key; no option carries source-line debris; wiki_link targets and topic page exist; validate_content.py clean
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.10, p.31 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.10, p.22 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem, formulas and options match booklet p.31; explanation matches the SOA solution p.22 in method and figures, arithmetic resolves; answer D equals the SOA key. Recompute: Z = v^T 1(T>10) + v^T 1(T>20) - 2v^T 1(T>30), so E[Z]=10E A(x+10)+20E A(x+20)-2 30E A(x+30) (D); E lacks the 2 and uses 10E(x+20) for the last term. The SOA's lead-in 'Drawing the benefit payment pattern:' is paraphrased as a sentence describing the cropped diagram (Media/Attachments/fam-l-q4-10-benefit-pattern.png, present); same content.
