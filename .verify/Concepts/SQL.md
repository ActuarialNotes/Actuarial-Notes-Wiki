---
target: Concepts/SQL.md
created: 2026-10-10
---

## [F-001] Alias rule stated without its dialect
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- severity: minor
- status: open
- locus: Aliases bullet and the last exam trap
- claim: '`AS` gives an output column a name (a column alias), which can be used in `ORDER BY` but not in `WHERE` or `HAVING`' (and the trap 'can be used in ORDER BY but not in WHERE or HAVING')
- evidence: Sources disagree by system. PostgreSQL 17 SELECT reference (sha256:16d6c1ac8132a80f1a157883d3fae1c07fca9196b44e76c4574027f13d830a7f), 'SELECT List': an output column's name can be used in ORDER BY and GROUP BY 'but not in the WHERE or HAVING clauses'. MySQL 8.4 Reference Manual §15.2.13 SELECT (sha256:94ac7713ee060fc295f2258a235fc52352ae1f395f396fdd2f8853e7711ca129): the alias 'can be used in GROUP BY, ORDER BY, or HAVING clauses' and is not permissible in WHERE. The WHERE half holds in both; the HAVING half is PostgreSQL's (and standard SQL's) rule, not universal. The DISC course's SQL dialect is not public.
- source_rank: 3
- proposed_action: Say which system the rule describes, e.g. 'in PostgreSQL and standard SQL; some systems such as MySQL accept an alias in HAVING'. Left for the author: a dialect difference to flag, not reconcile.
- applied: false
- fingerprint: a9ca48828240

## [C-001] Validation pass
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Evaluation order (FROM, WHERE, GROUP BY/aggregates, HAVING, SELECT list, DISTINCT, ORDER BY) = PostgreSQL SELECT 'Description'; WHERE/HAVING roles and efficiency = tutorial §2.7; SELECT *, per-row expressions = §7.3; table alias required for a self-join = §7.2; ORDER BY rules = §7.5; COUNT(*) vs COUNT(col), aggregates over non-null values, null for no rows = §9.21; null comparisons and IS NULL = §9.2; COALESCE = §9.18. Examples recomputed first (and run mentally against the docs' rules): AY 2024 rows K1-K6; T1 avg 10,000 n=2 n_paid=2; T2 n=3 n_paid=2 avg (2,000+4,000)/2 = 3,000; T3 n=1 fails HAVING; null-as-zero would give 6,000/3 = 2,000; deductibles 500,1000,NULL,500,NULL: <>500 -> 1, =NULL -> 0, IS NULL -> 2, <>500 OR IS NULL -> 3 — all match. Links resolve.
- sources_checked: PostgreSQL 17 Documentation, Description (general processing of SELECT, steps 1-8); WHERE Clause; SELECT List (output names in ORDER BY/GROUP BY, not WHERE/HAVING), sha256:16d6c1ac8132a80f1a157883d3fae1c07fca9196b44e76c4574027f13d830a7f — https://www.postgresql.org/docs/17/sql-select.html; PostgreSQL 17 Documentation, §2.7 WHERE selects input rows before aggregates, HAVING groups after; WHERE must not contain aggregates; condition without aggregate more efficient in WHERE, sha256:df158bcbc7924e1fbe49821aab78e37df53a7e14ac4cc8befdc480fee72b7e35 — https://www.postgresql.org/docs/17/tutorial-agg.html; PostgreSQL 17 Documentation, §7.3 SELECT *, value expressions per row, column labels, sha256:253982a077881262613e8fbabcef62a96d0bb6126212348fca17e527e533f8a6 — https://www.postgresql.org/docs/17/queries-select-lists.html; PostgreSQL 17 Documentation, §7.2 table aliases, self-join, sha256:69486ac181f941b65eb886f28d243b950ba891431dee9efada046a430ae2a566 — https://www.postgresql.org/docs/17/queries-table-expressions.html; PostgreSQL 17 Documentation, §7.5 unspecified order without ORDER BY; tie-breaking; ASC default; ORDER BY x, y DESC, sha256:efe155210f5dddb504fc919b8abbfe5866e2ac22c0dab8704488c7bd64fa176d — https://www.postgresql.org/docs/17/queries-order.html; PostgreSQL 17 Documentation, §9.21 count(*) / count(expr) non-null; avg etc. of non-null inputs; null when no rows except count, sha256:42dc684319f61831aa4fbb2cec8af602a22aadb72eb92eb784bb84ed1a98c076 — https://www.postgresql.org/docs/17/functions-aggregate.html; PostgreSQL 17 Documentation, §9.2 comparison with null yields null; IS NULL, sha256:7c49c06dfe1ddba8fa5e113dc4f0a3541e7e9534916aa0aaffb02f5da91030b2 — https://www.postgresql.org/docs/17/functions-comparison.html; PostgreSQL 17 Documentation, §9.18 COALESCE, sha256:30ef51aafd582617bbc6b538f21fb77149001f937cc795e23f54b4501db45146 — https://www.postgresql.org/docs/17/functions-conditional.html; MySQL 8.4 Reference Manual §15.2.13 SELECT Statement, alias 'can be used in GROUP BY, ORDER BY, or HAVING clauses'; not permissible in WHERE, sha256:94ac7713ee060fc295f2258a235fc52352ae1f395f396fdd2f8853e7711ca129 — https://dev.mysql.com/doc/refman/8.4/en/select.html; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Medium: official PostgreSQL documentation (rank 3, primary for SQL semantics). F-001 (alias-in-HAVING is dialect-dependent) open, minor. The tip's description of DISC-DA question shapes is study guidance (the only public statement of question form is CAS's 'application-based multiple-choice'); its topic placement was checked against the DISC DA syllabus.
