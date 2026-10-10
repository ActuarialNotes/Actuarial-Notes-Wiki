---
target: questions/exam-disc-da/discda-an-017.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem (key and explanation hidden) gave the keyed answer. Key C (join key, many distinct values, secondary index since policy_id repeats); A low-selectivity column gains little (§11.13); B every index adds write overhead (§11.1); D a table has at most one primary key, which must be unique (§5.5.4). learning_objective matches the DISC-DA page's numbered section title (DISC DA syllabus PDF pp.2-3); wiki_link tags resolve and are U.S./generic pages tested by the stem. Options distinct; explanation arithmetic resolves.
- sources_checked: PostgreSQL 17 Documentation, §11.1 maintenance overhead; planner chooses index vs sequential scan, sha256:b219b13fcf65d35c8e57807d74748dc57041a7275dc7e531c82d226df937208e — https://www.postgresql.org/docs/17/indexes-intro.html; PostgreSQL 17 Documentation, §11.13 selectivity, sha256:7953c0e55f8e7fe508d28151fb30629509f288a181d642b1255370563a3f4b8e — https://www.postgresql.org/docs/17/indexes-examine.html; PostgreSQL 17 Documentation, §5.5.4 at most one primary key, unique and not null, sha256:f3797f1e000c84ee57bcb411cbffa458be90b2adb69889d243abfa090b0b8224 — https://www.postgresql.org/docs/17/ddl-constraints.html; MySQL 8.4 Reference Manual §17.6.2.1 Clustered and Secondary Indexes, clustered index stores row data, typically the primary key; all other indexes are secondary indexes, sha256:542622d6a2ee72ee2b714af2d13dac62107187c3460678191300976e6935d3e1 — https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Vault-written question (no publisher key): medium per the MAS-I / Exam P precedent.

## [C-002] Validation pass (locator corrected)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem (key and explanation hidden) gave the keyed answer. Key C (join key, many distinct values, secondary index since policy_id repeats); A low-selectivity column gains little (§11.12); B every index adds write overhead (§11.1); D a table has at most one primary key, which must be unique (§5.5.4). learning_objective matches the DISC-DA page's numbered section title (DISC DA syllabus PDF pp.2-3); wiki_link tags resolve and are U.S./generic pages tested by the stem. Options distinct; explanation arithmetic resolves.
- sources_checked: PostgreSQL 17 Documentation, §11.1 maintenance overhead; planner chooses index vs sequential scan, sha256:b219b13fcf65d35c8e57807d74748dc57041a7275dc7e531c82d226df937208e — https://www.postgresql.org/docs/17/indexes-intro.html; PostgreSQL 17 Documentation, §11.12 selectivity, sha256:7953c0e55f8e7fe508d28151fb30629509f288a181d642b1255370563a3f4b8e — https://www.postgresql.org/docs/17/indexes-examine.html; PostgreSQL 17 Documentation, §5.5.4 at most one primary key, unique and not null, sha256:f3797f1e000c84ee57bcb411cbffa458be90b2adb69889d243abfa090b0b8224 — https://www.postgresql.org/docs/17/ddl-constraints.html; MySQL 8.4 Reference Manual §17.6.2.1 Clustered and Secondary Indexes, clustered index stores row data, typically the primary key; all other indexes are secondary indexes, sha256:542622d6a2ee72ee2b714af2d13dac62107187c3460678191300976e6935d3e1 — https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Re-recorded the same day only to correct a locator: PostgreSQL 17 'Examining Index Usage' is §11.12, not §11.13 as the previous entry said. Checks and verdict unchanged. Vault-written question (no publisher key): medium per the MAS-I / Exam P precedent.
