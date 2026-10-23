---
target: questions/exam-altam/altam-2023s-q2.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:46Z/756d
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: independent recomputation of every computed part from the blind stem before reading the vault's explanation or the SOA solution (SULT built from its Makeham parameters; other tables as cited); stem, table, diagram and formula diff against the 100-dpi page images of the SOA question paper; explanation diff against the solution page images (method, figures, arithmetic, align rows); examiners' comments verbatim and filed under the part they name; every part's setup under the part the SOA prints it before; Media/Attachments diagrams exist and match the page; points per part and total; type multi-part; topic and wiki_link pages exist; validate_content.py --strict and question_lint.py pass
- sources_checked: SOA Exam ALTAM Spring 2023 — exam (question paper), Q2, pp.4-5, sha256:22d9ab9530cb311d979dada69c2af9c6f87cba7fd854e2da29793aa3d2715095 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-altam.pdf; SOA Exam ALTAM Spring 2023 — model solutions and examiners' comments, Q2, pp.4-5, sha256:7808fbbb76bc8d54d394976603e8123a3fdb44a6020cfd126cc95f3c6814b512 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-altam.pdf
- note: Stem and state diagram match exam pp.4-5 (the (d) setup sits under Part d, as printed before (d)); explanation and comments match solutions pp.4-5. Recompute (SULT, i = 5%): P = 1217.83, 10V(1) = 29,028, 10V(0) = 15,911. Medium: most of the points (a, b, c, f) rest on prose and a derivation transcribed from the SOA.
