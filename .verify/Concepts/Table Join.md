---
target: Concepts/Table Join.md
created: 2026-10-10
---

## [C-001] Validation pass
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Join types and row counts (inner = matched pairs; left/right keep every row of one table with nulls; full keeps both; cross = |R| x |S|) = PostgreSQL §7.2.1.1; I = sum over keys of nR(k) nS(k) follows from the join definition; left join row = inner + unmatched left = §7.2.1.1; filter on right table in WHERE removes null-extended rows while a restriction in ON is applied before the join = §7.2.1.1 (explicit ON vs WHERE note); null keys never match = §9.2; orphan detection by anti-join and many-to-many multiplication = r4ds Ch.19; referential integrity = §5.5.5. Examples recomputed first: policy 501 2 terms x 2 claims = 4 rows, with date bounds 2 rows, half-open upper bound avoids a double match on 2025-03-01; I = 4,140, uR = 50,000 - 3,550 = 46,450, uS = 60; inner 4,140, left 50,590, right 4,200, full 50,650 — all match. Links resolve.
- sources_checked: PostgreSQL 17 Documentation, §7.2.1.1 Joined Tables: CROSS JOIN N x M rows; INNER; LEFT OUTER (inner join then a row with nulls for each unmatched T1 row); RIGHT; FULL; ON vs WHERE restriction with outer joins, sha256:69486ac181f941b65eb886f28d243b950ba891431dee9efada046a430ae2a566 — https://www.postgresql.org/docs/17/queries-table-expressions.html; PostgreSQL 17 Documentation, §9.2 null = null yields null, sha256:7c49c06dfe1ddba8fa5e113dc4f0a3541e7e9534916aa0aaffb02f5da91030b2 — https://www.postgresql.org/docs/17/functions-comparison.html; PostgreSQL 17 Documentation, §5.5.5 foreign keys and referential integrity, sha256:f3797f1e000c84ee57bcb411cbffa458be90b2adb69889d243abfa090b0b8224 — https://www.postgresql.org/docs/17/ddl-constraints.html; Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.19 Joins, §19.2 primary and foreign keys; §19.3.1 mutating joins (left_join etc.); §19.3.3 filtering joins (anti_join); §19.4 row matching (many-to-many), sha256:27708095875a55fe556f715fa31bef17d6c0bfdf5b8f6b36d1c1cafdce46dd21 — https://r4ds.hadley.nz/joins.html; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Medium: PostgreSQL documentation and r4ds (rank 3). The tip's description of DISC-DA question shapes is study guidance (the only public statement of question form is CAS's 'application-based multiple-choice'); its topic placement was checked against the DISC DA syllabus.
