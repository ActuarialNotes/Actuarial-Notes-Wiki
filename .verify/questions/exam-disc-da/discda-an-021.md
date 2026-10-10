---
target: questions/exam-disc-da/discda-an-021.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem (key and explanation hidden) gave the keyed answer. Key B: independent marts are fed directly from operational sources and do their own ETL; dependent marts draw clean data from the warehouse (Oracle A.3); A, C, D unsupported (grain limits detail, not totals; a star schema does not shrink totals). learning_objective matches the DISC-DA page's numbered section title (DISC DA syllabus PDF pp.2-3); wiki_link tags resolve and are U.S./generic pages tested by the stem. Options distinct; explanation arithmetic resolves.
- sources_checked: Oracle Business Intelligence Standard Edition One Tutorial 10.1.3, Data Mart Concepts, Appendix A, A.1-A.3 (data mart = single subject, often one department; data warehouse = multiple subjects; dependent marts draw from a central warehouse, independent marts directly from operational or external sources; ETL), sha256:2cdad56cd480d46df69d46bddc08c7cc0c7790ddc43a03622ff2fb2d0e667575 — https://docs.oracle.com/cd/E10352_01/doc/bi.1013/e10312/dm_concepts.htm; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Vault-written question (no publisher key): medium per the MAS-I / Exam P precedent.
