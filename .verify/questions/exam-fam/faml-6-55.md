---
target: questions/exam-fam/faml-6-55.md
created: 2026-10-23
---

## [F-001] SOA printed slip (17.8161 for a-due 45) kept unmarked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, EPV(premiums)
- claim: The explanation computes EPV(premiums) = P x (17.8161 - 0.35994 x 13.5498), unmarked.
- evidence: SOA FAM-L sample solutions Q6.55, p.62 prints 17.8161; the Standard Ultimate Life Table (FAM tables pp.20-21) gives ä45 = 17.8162, and 17.8161 occurs nowhere in the tables. The difference does not move 12.9391 or P = 944.17 (key D). Kept as printed; marked (as printed).
- source_rank: 1
- proposed_action: Append \text{ (as printed)} after 17.8161.
- applied: true
- fingerprint: 07169adbd9d5

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
- checks_run: blind recompute before the key; stem, every formula, subscript, table cell and option diffed against the rendered booklet page; explanation diffed line by line against the rendered SOA solution page; answer = SOA key; options distinct, no source-line debris on option E; wiki_link targets and topic page exist; validate_content.py clean; every SULT value the explanation cites found in the FAM tables
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.55, p.93, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.55, p.62, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Stem and options match booklet p.93; explanation matches the SOA solution p.62 in method and figures, arithmetic resolves; answer D equals the SOA key. Recompute: P = (1000A1_45:20 + 2500 20E45 ä65)/ä45:20 = 944.2 (D). One SOA printed slip marked (as printed) this run (F-001).
