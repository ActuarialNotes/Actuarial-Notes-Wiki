---
target: questions/exam-fam/faml-6-46.md
created: 2026-10-23
---

## [F-001] SOA printed slip in the explanation's wording kept unmarked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, first line
- claim: The explanation opens 'Let P be the premium per 1 of insurance.'
- evidence: SOA FAM-L sample solutions Q6.46, p.58 prints exactly this, although Q6.46 is a deferred annuity-due of 300 per year and P is the premium per 1 of annual annuity income (the solution ends 300P = 208.12). The wording was carried over from Q6.44's solution. Kept as printed; marked (as printed).
- source_rank: 1
- proposed_action: Append (as printed).
- applied: true
- fingerprint: b186cba453eb

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
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.46, p.85, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.46, p.58, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.85; explanation matches the SOA solution p.58 in method and figures, arithmetic resolves; answer E equals the SOA key. Recompute: 10E55 ä65 = 12.2758-7.4575 = 4.8183; P = 300(4.8183)/(7.4575-0.51213) = 208.1 (E). One SOA printed slip marked (as printed) this run (F-001).
