---
target: questions/exam-fam/faml-4-18.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked '(as printed)'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, PV random variable
- claim: The explanation writes PV = 1,000,000e^{-0.05T} (and 1,000,000e^{-0.05p}, 1,000,000e^{-0.05×4} = 81,873.08) although the warranty pays 100,000, unmarked.
- evidence: SOA FAM-L sample questions p.38, Q4.18: the warranty 'pays 100,000'. SOA sample solutions p.26 prints 1,000,000 in all three lines yet the result 81,873.08 = 100,000e^{-0.2} (1,000,000e^{-0.2} would be 818,731). The vault kept 1,000,000 as printed without a marker; key A unaffected.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed and mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: f5e3e0fd61e8

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: '(as printed)' marker added in this run; the file now reads as the SOA printed it, marked. No figure or key changed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute before the key; stem, every formula, subscript, table cell and option diffed against the rendered booklet page (130 dpi); explanation diffed line by line against the rendered SOA solution page; answer = SOA key; no option carries source-line debris; wiki_link targets and topic page exist; validate_content.py clean
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.18, p.38 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.18, p.26 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem, formulas and options match booklet p.38; explanation matches the SOA solution p.26 in method and figures, arithmetic resolves; answer A equals the SOA key. Recompute: P(T<2)=0.2; 0.4(1/2-1/t)=0.10 gives t=4; 100,000e^{-0.2}=81,873 (A). SOA slip(s) marked '(as printed)': 1 (see findings).
