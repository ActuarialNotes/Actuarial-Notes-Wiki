---
target: questions/exam-fam/faml-4-09.md
created: 2026-10-23
---

## [F-001] SOA printed slip not marked '(as printed)'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:38Z/e971
- date: 2026-10-23
- severity: minor
- status: open
- locus: stem, item (ii)
- claim: Item (ii) reads $A^{1}_{35:\overline{15}|}\ 0.25$ with no equals sign, unmarked in the stem.
- evidence: SOA FAM-L sample questions p.30, Q4.9 (ii), prints 'A^1_{35:15|} 0.25' with no '='. The SOA solution p.21 uses A^1_{35:15|}=0.25. The vault keeps the slip as printed (correct), but the stem carried no '(as printed)' marker; the explanation's opening note already describes it.
- source_rank: 1
- proposed_action: Keep the SOA's text as printed and mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: b04a4160e78f

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
- locus: stem, source line
- claim: The source line reads '[Question 4 on the Fall 2014 exam' with no closing bracket, unmarked.
- evidence: SOA FAM-L sample questions p.30, Q4.9 prints '[Question 4 on the Fall 2014 exam' with no closing ']'. The vault keeps it as printed without a marker. No option carries the line (options A–E are clean).
- source_rank: 1
- proposed_action: Keep the SOA's text as printed and mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: e146d53e835c

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
- sources_checked: SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.9, p.30 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.9, p.21 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Stem, formulas and options match booklet p.30; explanation matches the SOA solution p.21 in method and figures, arithmetic resolves; answer D equals the SOA key. Recompute: 15E35=0.39-0.25=0.14; 0.32=0.25+0.14A50, A50=0.50 (D). SOA slip(s) marked '(as printed)': 2 (see findings). The explanation's first line ('Item (ii) is printed without its equals sign') is a vault note, not the SOA's text; it is accurate and left in place.
