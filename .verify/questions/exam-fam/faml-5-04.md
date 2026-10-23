---
target: questions/exam-fam/faml-5-04.md
created: 2026-10-23
---

## [F-001] SOA slip silently corrected by the transcriber
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, annuity-certain integral
- claim: The explanation wrote ∫_0^50 e^{-δt} dt; the SOA prints it without dt.
- evidence: SOA FAM-L sample solutions p.29, Q5.4 prints 'ā_50| = ∫_0^50 e^{-δt} = (1−e^{-50δ})/δ = ...' with no dt. The transcriber had silently supplied the dt; restored as printed with the '(as printed)' marker per the vault's convention. No figure or the key (A, 213.7) changes.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed and mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: 566ed7bcc1a0

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
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.4, p.43 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.4, p.29 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem, formulas and options match booklet p.43; explanation matches the SOA solution p.29 in method and figures, arithmetic resolves; answer A equals the SOA key. Recompute: e40=50; K=10,000/[(1-e^{-0.5})/0.01+e^{-1.5}/0.03]=213.75 (A). SOA slip(s) marked '(as printed)': 1 (see findings).
