---
target: Concepts/Data Preparation.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: unique key, aggregate-then-merge, Oct 1 = 25% exposure, duplicates and error flags vs Goldburd; LEFT JOIN null rows, COALESCE, LEAST, DATEDIFF vs MySQL manual; tidy-data rules; leakage; both examples recomputed (275/181/184 days, 2.7534 car-years; 9,085 valid claims, 0.09434 vs 0.09387); links resolve
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.1-4.2 PDF pp.45-48, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; MySQL 8.0 Reference Manual, JOIN clause, LEFT JOIN null-row rule, sha256:43e50552524b2b85e91f5895f6c27240d9ca60480de24a0dfba19cbf41e1d829 — https://dev.mysql.com/doc/refman/8.0/en/join.html; MySQL 8.0 Reference Manual, Date and Time Functions, DATEDIFF, sha256:4552b2043aa78606f357e5a88a8c14c813bfbc8d1a25e8c9ef9e6bf4e44a3965 — https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html; MySQL 8.0 Reference Manual, Comparison Functions, COALESCE, LEAST, sha256:8fb9c7c63dd7dbaddb65d4f3952da94e1d49435b425d5216a5c590cb99f9ce81 — https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html; Wickham et al., R for Data Science 2e, ch.5 Data tidying (tidy-data rules), sha256:623bd5d1fb571503eb6397b564e0814d779f3fc47d4c10193b9009c92b93bc11 — https://r4ds.hadley.nz/data-tidy; scikit-learn User Guide, Common pitfalls, §'Data leakage', definition, sha256:21fac11c181ab35624dcf8673f0475d403d4f6ecf0f9bead01a573d7642b515c — https://scikit-learn.org/stable/common_pitfalls.html
- note: Medium: the five-step select/clean/transform/aggregate/validate framing is general practice, not traced to one source; every specific rule in it checks.
