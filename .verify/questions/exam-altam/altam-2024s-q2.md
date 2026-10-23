---
target: questions/exam-altam/altam-2024s-q2.md
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
- sources_checked: SOA Exam ALTAM Spring 2024 — exam (question paper), Q2, pp.5-6, sha256:7877c415a5859ee881046def4553cc2d714688607058c1d807a069d873320ee5 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/exams/spring-2024-altam-exam.pdf; SOA Exam ALTAM Spring 2024 — model solutions and examiners' comments, Q2, pp.2-4, sha256:1ff2f7da08ae0d9bf5e542c2cbd87fa4b81ce334e1e47f8b117ecacc1103fb65 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/spring-2024-altam-solutions.pdf
- note: Stem and diagram match exam pp.5-6 ((c) setup under Part c); explanation and comments match solutions pp.2-4. Recompute (SULT, UDD): NSP 7,244.5 (SOA 7,245), 5V 8,267.7 (SOA 8,267.3). Appendix A.7's note on (d) (7171.0 against 7170.0 from the shown figures) is intermediate rounding, not a slip: unrounded 10,000(a-bar_65 - a-bar_55:65) = 7,171.4. Medium: five of nine points rest on prose and integral expressions.
