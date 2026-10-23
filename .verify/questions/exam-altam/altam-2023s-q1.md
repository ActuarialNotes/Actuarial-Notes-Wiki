---
target: questions/exam-altam/altam-2023s-q1.md
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
- sources_checked: SOA Exam ALTAM Spring 2023 — exam (question paper), Q1, pp.2-3, sha256:22d9ab9530cb311d979dada69c2af9c6f87cba7fd854e2da29793aa3d2715095 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-altam.pdf; SOA Exam ALTAM Spring 2023 — model solutions and examiners' comments, Q1, pp.1-3, sha256:7808fbbb76bc8d54d394976603e8123a3fdb44a6020cfd126cc95f3c6814b512 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-altam.pdf
- note: Stem, matrices and points match exam pp.2-3; explanation and comments match solutions pp.1-3. Recompute: 2P (0.130, 0.125, 0.340, 0.490, 0.510), (b) 0.22977, (c) 2.26, (d) 469,918 and 2,236,561. Appendix A.7's note on (a) (the column vector for 2p^22) is not a slip: (0.05, 0.10, 0.70, 0) is column 2 of P, so no marker.
