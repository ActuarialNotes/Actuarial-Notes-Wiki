---
target: questions/exam-fam/faml-6-21.md
created: 2026-10-23
---

## [F-001] Pure-endowment symbol set so its 1 sits over the age (term-insurance position)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- severity: major
- status: open
- locus: stem (v), line 37; explanation lines 51 and 54
- claim: Item (v) and the explanation write the pure endowment as A_{75:\overline{15}|}^{\ \ 1}: a superscript 1 preceded by two spaces, which starts at the same x as the subscript and so lands over the '75', where the term-insurance A^1_{75:15} puts its 1.
- evidence: SOA FAM-L sample questions p.66 (Q6.21), read at 300 dpi: item (v) prints A with subscript 75:15| and the 1 directly over the '15' — the pure endowment A_{75:15}^{ 1}, distinct from the term insurance A^1_{75:15} (1 over the age) that the solution p.44 derives as 0.7 - 0.11 = 0.59. Read as a term insurance, (v) = 0.11 gives a negative premium (110/(7.5 - 15*0.59)); read as the pure endowment, P = 590/(7.5 - 1.65) = 100.85, the SOA's C. The vault's own convention elsewhere (Concepts/Pure Endowment.md, faml-4-11) is A_{x:\overline{n}|}^{\phantom{x:}1}, which places the 1 over the n.
- source_rank: 1
- proposed_action: Write the pure endowment as A_{75:\overline{15}|}^{\phantom{75:}1} in the stem and the explanation (4 places).
- applied: true
- fingerprint: c4bb9b938aca

## [F-002] Transcriber corrected an SOA slip in the solution's first equation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, line 51
- claim: P × ä_{75:15} = 1000 A^1_{75:15} + 15 × P × A_{75:15}^{1} — the factor 1000 applied to the term insurance only.
- evidence: SOA FAM-L sample solutions p.44 (Q6.21), read at 250 dpi, prints 'P×ä_{75:15|} = 1000(A^1_{75:15|} + 15×P×A_{75:15|}^{1}) → P = 1000A^1/(ä - 15×A^{1})': the bracket wraps both terms, so 1000 multiplies the premium refund too — a slip, since the next expression (and the answer 100.85) applies 1000 to the term insurance alone. The conversion's rule is to keep the SOA's slips as printed with a mark, not to correct them.
- source_rank: 1
- proposed_action: Restore the SOA's bracket and mark it '(as printed)'.
- applied: true
- fingerprint: 5f90e15b53b4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Rewritten as A_{75:\overline{15}|}^{\phantom{75:}1} in the stem and explanation (4 places), placing the 1 over the 15 as the SOA's page does.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Restored the SOA's 1000( ... ) bracket and marked it '(as printed)'; the second half of the line (P = 1000A^1/(ä - 15A^{1})) and the result 100.85 are unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:39Z/40bb
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind independent recomputation (SULT rebuilt from its Makeham law where used); key vs SOA key; stem/options diff against 110-300 dpi page renders; explanation vs SOA solution line by line; frontmatter (answer, type, points, topic, wiki_link targets exist)
- sources_checked: SOA Exam FAM-L Sample Questions (Oct 2024), Q6.21, p.66, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.21, p.44, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf
- note: Blind recompute before reading the key: 100.85 (reading (v) as the pure endowment, as the SOA's page sets it) -> C; the vault key, the SOA's key (solutions p.44) and the SOA's printed solution agree. Stem, every number, symbol, subscript and all five options diffed against the booklet page image (p.66); no debris on any option, the source line sits in the stem. Explanation checked against the SOA's solution: same method, same figures, arithmetic resolves. Findings this run: Pure-endowment symbol set so its 1 sits over the age (term-insurance position); Transcriber corrected an SOA slip in the solution's first equation — fixed and resolved.
