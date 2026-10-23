---
target: questions/exam-altam/altam-2024s-q4.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation (iii), interval line
- claim: The line reads 0.133627 +/- 1.96 x sqrt(0.000043068) ~ 0.133627 + 1.96 x 0.006563 with no marker.
- evidence: SOA ALTAM Spring 2024 solutions p.11 prints "+" for "+/-" in the second expression. The interval (0.120764, 0.146490) is right (recomputed). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 386b57c0b7db

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- resolves: F-001
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
- sources_checked: SOA Exam ALTAM Spring 2024 — exam (question paper), Q4, pp.10-11, sha256:7877c415a5859ee881046def4553cc2d714688607058c1d807a069d873320ee5 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/exams/spring-2024-altam-exam.pdf; SOA Exam ALTAM Spring 2024 — model solutions and examiners' comments, Q4, pp.9-12, sha256:1ff2f7da08ae0d9bf5e542c2cbd87fa4b81ce334e1e47f8b117ecacc1103fb65 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/spring-2024-altam-solutions.pdf
- note: Stem, diagram and table match exam pp.10-11; explanation and comments match solutions pp.9-12. Recompute: exposures T70(0) 0.8, T71 (0.6, 0.3, 0.1); sum 0.133627, p 0.874916, CI (0.120764, 0.146490) and (0.863734, 0.886243). 1 minor finding(s) for SOA printed slips, marked (as printed) and resolved in this run.
