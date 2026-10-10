---
target: questions/exam-disc-ia/discia-an-218.md
created: 2026-10-10
---

## [F-001] Explanation of B refers to a local limit the stem does not give
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: explanation, option B
- claim: B subtracts a local limit that was never paid. The deduction is what the local policy pays, not its limit.
- evidence: The stem gives no local policy limit; the only figures are the master limit $10,000,000 and the $6,000,000 loss. B's $4,000,000 equals 10,000,000 - 6,000,000 (the master limit less the loss), so the explanation names a misconception the stem cannot produce. Rank 5 reading of the stem; the key C (master pays the whole $6,000,000 under DIC when the local policy excludes flood) is confirmed by Swiss Re's description of DIC (sha256:2252d939...).
- source_rank: 5
- proposed_action: Rewrite B's explanation (e.g. 'B pays the unused master limit rather than the loss') or give the local policy a limit in the stem.
- applied: false
- fingerprint: 9e4b78f7b3f0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem with key and explanation stripped, then compared with the key; every distractor's explanation checked; wiki_link and learning_objective (section title matches the DISC-IA page; question_lint clean).
- sources_checked: Swiss Re Corporate Solutions, 'The importance of DIC, DIL and Financial Interest Coverage in international programs' (CMP = master policy in home country + local admitted policies; DIC/DIL respond only where a local policy exists; FINC reimburses the parent where non-admitted cover is not permitted; admitted vs non-admitted definitions), sha256:2252d9392876610ffb97be28f59f5d0f2f21de8237a33926e1dbf0bca3977c77 — https://corporatesolutions.swissre.com/insights/knowledge/importance-difference-conditions-difference-limits-financial-interest-coverage-international-programs.html; Swiss Re Corporate Solutions, 'Understanding your insurance options as a multinational' (master policy fills gaps by DIC/DIL; FINC paid to parent), sha256:8406248fd1870138166482694739422df199a0ec1e40f1faf747cfae9ba66de2 — https://corporatesolutions.swissre.com/insights/knowledge/multinational-benefits-international-program.html; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Blind: local pays 0 (flood excluded), master pays 6,000,000 under DIC = key C. DIC fills gaps where a local policy exists (Swiss Re). F-001 (minor) open: B's explanation refers to a local limit the stem does not give.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): B's explanation now reads 'B is the master limit less the loss, 10,000,000 - 6,000,000: the limit left unused, not what the master policy pays.'

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the clean-up edits: blind recompute from the edited stem, key unchanged and confirmed, every option's explanation re-read, question_lint clean.
- sources_checked: Swiss Re Corporate Solutions, 'The importance of DIC, DIL and Financial Interest Coverage in international programs' (CMP = master policy in home country + local admitted policies; DIC/DIL respond only where a local policy exists; FINC reimburses the parent where non-admitted cover is not permitted; admitted vs non-admitted definitions), sha256:2252d9392876610ffb97be28f59f5d0f2f21de8237a33926e1dbf0bca3977c77 — https://corporatesolutions.swissre.com/insights/knowledge/importance-difference-conditions-difference-limits-financial-interest-coverage-international-programs.html; Swiss Re Corporate Solutions, 'Understanding your insurance options as a multinational' (master policy fills gaps by DIC/DIL; FINC paid to parent), sha256:8406248fd1870138166482694739422df199a0ec1e40f1faf747cfae9ba66de2 — https://corporatesolutions.swissre.com/insights/knowledge/multinational-benefits-international-program.html; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Blind 6,000,000 = key C; B now explained as 10,000,000 - 6,000,000, the unused limit. F-001 resolved.
