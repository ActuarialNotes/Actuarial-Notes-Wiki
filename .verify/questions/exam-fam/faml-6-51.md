---
target: questions/exam-fam/faml-6-51.md
created: 2026-10-23
---

## [F-001] SOA printed slip (missing bracket) kept unmarked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- severity: minor
- status: open
- locus: stem, source line
- claim: The source line reads '[A modified version of Question 14 on the Fall 2013 exam' with no closing bracket.
- evidence: SOA FAM-L sample questions Q6.51, p.90 prints the line without its closing ']'. Kept as printed; marked (as printed).
- source_rank: 1
- proposed_action: Append (as printed).
- applied: true
- fingerprint: e091396b4d27

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked (as printed) in this run; the SOA's printed text is kept verbatim and no figure or key changed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute before the key; stem, every formula, subscript, table cell and option diffed against the rendered booklet page; explanation diffed line by line against the rendered SOA solution page; answer = SOA key; options distinct, no source-line debris on option E; wiki_link targets and topic page exist; validate_content.py clean
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.51, p.90, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.51, p.60, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.90; explanation matches the SOA solution p.60 in method and figures, arithmetic resolves; answer D equals the SOA key. Recompute: (IA)1 = 11A1 - sum A1 = 0.5119; P = 50,000(12.2758-7.4574)/(7.4574-0.5119) = 34,687 (D). One SOA printed slip marked (as printed) this run (F-001).
