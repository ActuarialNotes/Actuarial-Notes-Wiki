---
target: questions/exam-altam/altam-2024s-q3.md
created: 2026-10-23
---

## [F-001] SOA printed parameter error kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Stem, Standard Sickness-Death Model parameters, b_2
- claim: The stem gives b_2 = 7.85 x 10^-5 with no marker.
- evidence: SOA ALTAM Spring 2024 exam p.7 prints b_2 = 7.85 x 10^-5; the SOA's own note in the solutions (p.5) says it should have been 7.58 x 10^-5 and gives the answer both ways. Recomputed by solving the model numerically: with 7.58e-5, 10V(1) = 162,301 (the stem's 162,300 to the nearest 100); with the printed 7.85e-5, 161,467. The stem is the exam as sat, so it stays; "(as printed)" added after b_2. The explanation already carries the SOA's note.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 4f855ae012f2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-002] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation (i), 'answer using the number given in the exam' line
- claim: The alternative Thiele line substitutes 0.00229 for mu^10_65 and keeps 0.03102 for mu^12_65, giving -1878.0, with no marker.
- evidence: SOA ALTAM Spring 2024 solutions p.5. b_2 enters mu^02 and so mu^12 = 1.4 mu^02, not mu^10 = b_1 e^{c_1(110-x)}. With b_2 = 7.85e-5, mu^12_65 = 0.03210 and mu^10_65 = 0.001727 unchanged, which gives -1878.0 (recomputed). The printed substitution (0.00229, 0.03102) gives -1878.8. The result follows the right substitution; the printed line does not. Not listed in content-plan Appendix A.7. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 8d571b0c8ff5

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-003] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation (ii), first two Euler lines
- claim: The first line uses -1945.13 and the 'OR' line prints 161,810, with no markers.
- evidence: SOA ALTAM Spring 2024 solutions p.5: part (i) gives -1945.3, but (ii) uses -1945.13 (result 162,783 follows -1945.3: 162,296 + 486.3); the 'OR' line 162,296 - 0.25(-1950) = 162,783.5, printed 161,810. Kept as printed; "(as printed)" added to both. Listed in Appendix A.7.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 4ffdb48505eb

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-003
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-004] SOA printed typo kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, examiner report
- claim: The comment reads "in the Excel tables.." with no marker.
- evidence: SOA ALTAM Spring 2024 solutions p.7 prints the double full stop. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 833bb4ae6860

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-004
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every computed part from the blind stem before reading the vault's explanation or the SOA solution (SULT built from its Makeham parameters; other tables as cited); stem, table, diagram and formula diff against the 100-dpi page images of the SOA question paper; explanation diff against the solution page images (method, figures, arithmetic, align rows); examiners' comments verbatim and filed under the part they name; every part's setup under the part the SOA prints it before; Media/Attachments diagrams exist and match the page; points per part and total; type multi-part; topic and wiki_link pages exist; validate_content.py --strict and question_lint.py pass
- sources_checked: SOA Exam ALTAM Spring 2024 — exam (question paper), Q3, pp.7-9, sha256:7877c415a5859ee881046def4553cc2d714688607058c1d807a069d873320ee5 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/exams/spring-2024-altam-exam.pdf; SOA Exam ALTAM Spring 2024 — model solutions and examiners' comments, Q3, pp.5-8, sha256:1ff2f7da08ae0d9bf5e542c2cbd87fa4b81ce334e1e47f8b117ecacc1103fb65 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/spring-2024-altam-solutions.pdf
- note: Stem and tables match exam pp.7-9 (Product Q, the 64.75 table and Product Q+ under (c), (e) and (f), as printed). Explanation and comments match solutions pp.5-8. Recompute by solving the Standard Sickness-Death Model numerically with b_2 = 7.58e-5: 10V(1) 162,301, dV/dt -1,944.8, P 6,518.0, 10V(1) Q 163,455, 9.75V(1) 163,944, 9.75V(0) 42,732, 10p00 0.7408, 10p01 0.1168, a-bar^01_65 2.885, F 182,931. The stem's printed b_2 = 7.85e-5 is the SOA's own acknowledged error; with it 10V(1) = 161,467, so the stem now carries (as printed) and the explanation the SOA's note. 4 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
