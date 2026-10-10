---
target: questions/exam-disc-da/discda-an-019.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem (key and explanation hidden) gave the keyed answer. Ages 15 and NULL match no WHEN branch -> null band, 2 drivers — key C; 17 -> '16-24', 30 and 64 -> '25-64', 70 -> '65+'. learning_objective matches the DISC-DA page's numbered section title (DISC DA syllabus PDF pp.2-3); wiki_link tags resolve and are U.S./generic pages tested by the stem. Options distinct; explanation arithmetic resolves.
- sources_checked: PostgreSQL 17 Documentation, §9.18 CASE: ELSE omitted and no condition true -> null, sha256:30ef51aafd582617bbc6b538f21fb77149001f937cc795e23f54b4501db45146 — https://www.postgresql.org/docs/17/functions-conditional.html; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Vault-written question (no publisher key): medium per the MAS-I / Exam P precedent.
