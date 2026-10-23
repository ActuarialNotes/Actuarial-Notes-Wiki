---
target: questions/exam-fam/faml-6-38.md
created: 2026-10-23
---

## [F-001] SOA printed slip (A for A-bar) kept unmarked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, the line A_{x:n} = (i/delta)A1 + nEx
- claim: The explanation writes A_{x:n} = (i/delta)(A1_{x:n}) + nE_x, without a bar on the left side, unmarked.
- evidence: SOA FAM-L sample solutions Q6.38, p.53 (rendered at 400 dpi) prints A_{x:n} with no bar; the identity holds for the continuous endowment insurance A-bar_{x:n} (the next line sets it equal to the given 0.192 = A-bar). The vault keeps it as printed; marked (as printed). Figures and key B unaffected.
- source_rank: 1
- proposed_action: Append \text{ (as printed)} after the left-hand A_{x:n}.
- applied: true
- fingerprint: dfdf4f268746

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
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.38, p.79, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.38, p.53, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.79; explanation matches the SOA solution p.53 in method and figures, arithmetic resolves; answer B equals the SOA key. Recompute: A1(discrete) = (0.192-0.172)/(i/delta) = 0.019516; ä = (1-0.191516)/d = 16.978; 192/16.978 = 11.31 (B). One SOA printed slip marked (as printed) this run (F-001).
