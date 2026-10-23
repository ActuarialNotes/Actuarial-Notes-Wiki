---
target: questions/exam-fam/faml-6-33.md
created: 2026-10-23
---

## [F-001] SOA printed slip in the stem's numbering kept unmarked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- severity: minor
- status: open
- locus: stem, item (i)
- claim: Stem item (i) reads 'You are given:' and the givens are numbered (ii)-(iv), with no marker.
- evidence: SOA FAM-L sample questions Q6.33, p.76 prints exactly this: '(i) You are given:' then (ii) i = 0.03, (iii) mu_x(t) = 0.02t, (iv) 0L is the aggregate loss. The lead-in line was numbered as a given by the SOA. The vault transcribes it faithfully; marked (as printed) so a reader knows it is the publisher's layout.
- source_rank: 1
- proposed_action: Append (as printed) to item (i).
- applied: true
- fingerprint: 6eea3782e75c

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
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.33, p.76, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.33, p.51, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.76; explanation matches the SOA solution p.51 in method and figures, arithmetic resolves; answer B equals the SOA key. Recompute: 15p = e^-2.25 = 0.105399; Var(0L) = 500(10,000v^15)^2 p(1-p) = 1.9423e9; z = 50,000/44,071 = 1.13; Pr = 0.128 (B). One SOA printed slip marked (as printed) this run (F-001).
