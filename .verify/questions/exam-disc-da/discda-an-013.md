---
target: questions/exam-disc-da/discda-an-013.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem (key and explanation hidden) gave the keyed answer. Key D HAVING; A aggregate in WHERE is an error; B ORDER BY filters nothing; C a select-list expression filters nothing. learning_objective matches the DISC-DA page's numbered section title (DISC DA syllabus PDF pp.2-3); wiki_link tags resolve and are U.S./generic pages tested by the stem. Options distinct; explanation arithmetic resolves.
- sources_checked: PostgreSQL 17 Documentation, §2.7 WHERE before aggregates (no aggregates in WHERE), HAVING after, sha256:df158bcbc7924e1fbe49821aab78e37df53a7e14ac4cc8befdc480fee72b7e35 — https://www.postgresql.org/docs/17/tutorial-agg.html; PostgreSQL 17 Documentation, SELECT List: output column names not usable in WHERE/HAVING, sha256:16d6c1ac8132a80f1a157883d3fae1c07fca9196b44e76c4574027f13d830a7f — https://www.postgresql.org/docs/17/sql-select.html; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Vault-written question (no publisher key): medium per the MAS-I / Exam P precedent.
