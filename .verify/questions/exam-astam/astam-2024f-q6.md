---
target: questions/exam-astam/astam-2024f-q6.md
created: 2026-10-23
---

## [F-001] SOA BF input mu_6 = 0.85(18,000) printed 16,200 (15,300); printed formula does not give the printed 16,799 / 7,617
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b explanation (i), mu_6 and C-tilde_{6,7} lines
- claim: The explanation reads mu_6 = 0.85(18,000) = 16,200 and C-tilde = 0.502141(18,285.7) + 0.497849(16,200) = 16,799, R-tilde = 7,617, with no note.
- evidence: Solutions PDF p.15 (rendered at 220 dpi) prints mu_6 = 0.85(18,000) = 16,200 and 0.502141(18,285.7) + 0.497849(16,200) = 16,799, R-tilde_{6,7} = 7,617. The printed line evaluates to 9,182.0 + 8,065.1 = 17,247 (reserve 8,065), so the SOA’s formula and its result conflict. Resolution of the conflict: 0.85 x 18,000 = 15,300, not 16,200, and with 15,300 the same line gives 9,182.0 + 7,617.2 = 16,799 and a reserve of 7,617 exactly as printed; the question itself (booklet p.11) says the BF reserve is 7,600 to the nearest 100, which 7,617 meets and 8,065 does not; the blind recompute (15,300 x (1 - 1/1.991473)) gives 7,617.2. So the printed result is right and the slip is the intermediate 16,200. Also 1 - 0.502141 = 0.497859, printed 0.497849. Listed in A.6, whose wording ('the printed formula gives 8,065') is true but the slip is the 16,200, not the 7,617.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 33f8079c74e0

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '16,200 (as printed; 0.85(18,000) = 15,300)' and the C-tilde line '(as printed)'. The SOA’s printed 7,617 is kept: it is the correct reserve, agreed by the question’s own '7,600 to the nearest 100' and by an independent recompute (7,617.2).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: blind recompute of every calculated part before reading the key; every number, symbol, subscript, exponent and table cell of the stem diffed against the question booklet page images (130 dpi); explanation compared line by line with the model-solution page images; examiners' comments compared verbatim and checked for filing under the part each names; points per part and total; topic and wiki_link targets exist
- sources_checked: SOA Exam ASTAM Fall 2024, question booklet, Q6, pp.11-13, sha256:c7e45ae70452fc50709e1721f3b9242de1e2af1ac0afc1cc29cf0449fb683f94 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/exams/2024-fall-astam-exam.pdf; SOA ASTAM October 2024 Model Solutions, Q6, pp.15-19, sha256:f1aa2ecb9f29f00351447712a247f5ac19c2cff2bd2d69a892e6eeb5854c9f8e — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/fall-2024-astam-solutions.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: R 9103.7, BF R 7,617 (with mu_6 = 15,300). 1 SOA printed slip(s) marked '(as printed)'. Confidence medium: the SOA’s BF line carries a wrong intermediate (16,200), and (d), (e) are judgment answers.
