---
target: questions/exam-altam/altam-2023s-q3.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation (i), AV_9 fraction
- claim: The first-pass AV_9 line gives the numerator as 72636 - 0.002 v(150,000) with no marker.
- evidence: SOA ALTAM Spring 2023 solutions p.6 prints (72636 - 0.002v_5%(150,000))/(1 - 0.002v_5%(1.06)) = 72333/0.99798. The printed 72333 needs the (1.06) on the COI term: 72636 - 0.002(150,000)(1.06)/1.05 = 72333.1; without it the numerator is 72350.3. Result 72480 is right (recomputed 72,479.98). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 366fceeb114c

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
- locus: Part a, explanation (ii), (COI)_10 max expression
- claim: The year-10 COI is written max(0.0022(F - AV_10)v, 0.0022(0.97)AV_10 v) with no marker.
- evidence: SOA ALTAM Spring 2023 solutions p.6 prints 0.0022(0.97)AV_10; the year-10 corridor factor is 1.91 (exam p.6 table), so the corridor term is 0.0022(0.91)AV_10 v, which is what the SOA's own redo on p.7 uses. AV_10 = 83,576 recomputed. Kept as printed; "(as printed)" added. Listed in content-plan Appendix A.7.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: d002a61370cc

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-002
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
- sources_checked: SOA Exam ALTAM Spring 2023 — exam (question paper), Q3, pp.6-7, sha256:22d9ab9530cb311d979dada69c2af9c6f87cba7fd854e2da29793aa3d2715095 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-altam.pdf; SOA Exam ALTAM Spring 2023 — model solutions and examiners' comments, Q3, pp.6-8, sha256:7808fbbb76bc8d54d394976603e8123a3fdb44a6020cfd126cc95f3c6814b512 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-altam.pdf
- note: Stem and table match exam pp.6-7; the profit-test assumptions sit under Part b, as printed before (b). Explanation and comments match solutions pp.6-8. Recompute: AV_9 72,479.98, AV_10 83,576.37 (corridor applies), EDB 175.8, Pr_10 1,566, Pi_10 1,297. Two SOA slips marked (as printed). 2 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
