---
target: questions/exam-disc-da/discda-an-228.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading the key (agrees: aggregate then left join, COALESCE to 0); every distractor's explanation checked; wiki_link tags and learning_objective vs Exam DISC-DA (CAS).md; question_lint clean
- sources_checked: MySQL 8.0 Reference Manual, JOIN clause, LEFT JOIN null-row rule, sha256:43e50552524b2b85e91f5895f6c27240d9ca60480de24a0dfba19cbf41e1d829 — https://dev.mysql.com/doc/refman/8.0/en/join.html; MySQL 8.0 Reference Manual, Date and Time Functions, DATEDIFF, sha256:4552b2043aa78606f357e5a88a8c14c813bfbc8d1a25e8c9ef9e6bf4e44a3965 — https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html; MySQL 8.0 Reference Manual, Comparison Functions, COALESCE, LEAST, sha256:8fb9c7c63dd7dbaddb65d4f3952da94e1d49435b425d5216a5c590cb99f9ce81 — https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.1 PDF p.46, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Medium per the vault-written-question precedent: key confirmed by independent recomputation and the cited source; no publisher's key exists.
