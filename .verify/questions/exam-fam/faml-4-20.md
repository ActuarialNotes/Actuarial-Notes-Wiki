---
target: questions/exam-fam/faml-4-20.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked '(as printed)'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, E(Z^2) evaluation
- claim: The E(Z^2) line reads (0.03/0.04) × e^{-0.05t}|_0^∞ = 0.6, unmarked.
- evidence: SOA FAM-L sample solutions p.26, Q4.20 prints '= 0.03/0.04 × e^{-0.05t}|_0^∞ = 0.6'. The integrand 0.03e^{-0.05t} integrates to 0.03/0.05 = 0.6, so the printed denominator 0.04 is a slip (the printed result is right). Kept as printed, now marked.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed and mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: 5ae42ff3106d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: '(as printed)' marker added in this run; the file now reads as the SOA printed it, marked. No figure or key changed.

## [F-002] SOA printed slip not marked '(as printed)'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, final variance
- claim: The final line reads Var(Z) = 0.6 - 0.75^2 = 0.375, unmarked.
- evidence: SOA FAM-L sample solutions p.26, Q4.20 prints 'Var(Z) = ... = 0.6 − 0.75^2 = 0.375'; 0.6 − 0.5625 = 0.0375, which is option D and the SOA key. A decimal slip in the SOA's text, kept as printed and now marked so a reader does not take 0.375 as the result.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed and mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: e3d128fc5e8f

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- resolves: F-002
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
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.20, p.39 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.20, p.26 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem, formulas and options match booklet p.39; explanation matches the SOA solution p.26 in method and figures, arithmetic resolves; answer D equals the SOA key. Recompute: Z=e^{-0.01T}, mu=0.03: E=0.75, E2=0.6, Var=0.0375 (D). SOA slip(s) marked '(as printed)': 2 (see findings).
