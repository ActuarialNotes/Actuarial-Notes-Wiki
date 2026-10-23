---
target: questions/exam-fam/faml-5-12.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked '(as printed)'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, view (ii)
- claim: View (ii) reads 'a whole life annuity-due of 0.75X plus a temporary deferred life annuity-due of 0.25X', unmarked.
- evidence: SOA FAM-L sample solutions p.32, Q5.12 (ii) prints 'A whole life annuity-due of 0.75X plus a temporary deferred life annuity-due of 0.25X'. The extra 0.25X is paid ages 55–64, i.e. a 10-year temporary (not deferred) annuity-due; 'deferred' is the SOA's slip. Kept as printed, now marked; the solution itself uses view (i) and X=17,794 (E) is unaffected.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed and mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: afcb8c3ec56c

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
- checks_run: blind recompute before the key; stem, every formula, subscript, table cell and option diffed against the rendered booklet page (130 dpi); explanation diffed line by line against the rendered SOA solution page; answer = SOA key; no option carries source-line debris; wiki_link targets and topic page exist; validate_content.py clean; SULT values recomputed from the FAM tables PDF
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.12, p.48 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.12, p.32 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Stem, formulas and options match booklet p.48; explanation matches the SOA solution p.32 in method and figures, arithmetic resolves; answer E equals the SOA key. Recompute: X[a-due55 - 0.25 10E55 a-due65]=X(16.0599-0.25(0.59342)(13.5498))=250,000, X=17,794 (E). SOA slip(s) marked '(as printed)': 1 (see findings).
