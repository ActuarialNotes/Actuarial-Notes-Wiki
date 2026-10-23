---
target: questions/exam-fam/faml-6-32.md
created: 2026-10-23
---

## [F-001] Transcriber corrected an SOA slip in the explanation (dot-a)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:37Z/b65d
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, EPV(premiums), second line
- claim: The explanation writes alpha(12) \ddot{a}_x (a double-dot annuity-due) in the UDD approximation, unmarked.
- evidence: SOA FAM-L sample solutions Q6.32, p.50 (rendered at 400 dpi) prints 12P[alpha(12) a-dot_x - beta(12)] with a single dot over the a: a slip, since the next line uses the annuity-due 9.19. The vault had silently corrected it to the double dot. Restored as printed, with an (as printed) marker; the figures (1.00020, 9.19, 0.46651, 104.7039P) are unchanged and the key C is unaffected.
- source_rank: 1
- proposed_action: Restore \dot{a}_{x} with \text{ (as printed)}.
- applied: true
- fingerprint: b33b623d7f31

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
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.32, p.75, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.32, p.50, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem and options match booklet p.75; explanation matches the SOA solution p.50 in method and figures, arithmetic resolves; answer C equals the SOA key. Recompute: Abar = (i/delta)(1-dä) = 0.576326; ä(12) = 1.00020(9.19) - 0.46651 = 8.7253; 57,632.6/(12 x 8.7253) = 550.4 (C). One SOA printed slip marked (as printed) this run (F-001).
