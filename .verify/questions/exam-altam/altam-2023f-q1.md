---
target: questions/exam-altam/altam-2023f-q1.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every computed part from the blind stem before reading the vault's explanation or the SOA solution (SULT built from its Makeham parameters; other tables as cited); stem, table, diagram and formula diff against the 100-dpi page images of the SOA question paper; explanation diff against the solution page images (method, figures, arithmetic, align rows); examiners' comments verbatim and filed under the part they name; every part's setup under the part the SOA prints it before; Media/Attachments diagrams exist and match the page; points per part and total; type multi-part; topic and wiki_link pages exist; validate_content.py --strict and question_lint.py pass
- sources_checked: SOA Exam ALTAM Fall 2023 — exam (question paper), Q1, pp.2-3, sha256:c162b6a75c9ccaedf38fcc9f7f4debf83abcf768f1e6ee6ff0d84e89e3098bc7 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-altam-exam.pdf; SOA Exam ALTAM Fall 2023 — model solutions and examiners' comments, Q1, pp.1-3, sha256:df2ab0d9bc15ea197487448a071c8d909aa27d14841c082505cbb63358a6b93b — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/altam-fall-2023-solutions.pdf
- note: Stem matches exam pp.2-3 (the time-11 policy value sits under Part d, as printed before (d)); explanation and comments match solutions pp.1-3. Recompute: 20E 0.157727, G 4,753.04, 10V 38,247.28, gain 1,117.12, by source 21,381.33 / -19,864.11 / -400. Appendix A.7's note on (e) is not a slip: -19,864.11 is (100q - 4)(57,188.08) with the unrounded q_75:75 = 0.0365265, so no marker.
