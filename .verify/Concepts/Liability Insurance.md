---
target: Concepts/Liability Insurance.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: defence outside the limit and duty ending on exhaustion against CA 00 01; Pareto LEV formula against the CAS MAS-I tables; both examples recomputed blind (CSL 1,000,000/250,000; split BI min(750,000, 500,000), PD 100,000, retained 650,000, 400,000 difference; LEV 66,667 and 166,667, ILF 2.50, loss costs 3,333 and 8,333)
- sources_checked: ISO CA 00 01 10 13 Business Auto Coverage Form, II.A insuring agreement and duty to defend; supplementary payments 'will not reduce the Limit of Insurance', sha256:b8e36d4e31f05a7eaad97cba8b091f8a45cf1ea302e616bad96b4c132c1457e8 — https://assets.touchpointmarkets.com/80/d7/be854d714678be5fefc9d17cc365/ca-00-01-10-13-business-auto-coverage-form.pdf; CAS MAS-I tables (Pareto limited expected value), Pareto E[X^x], sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; LII Wex, 'independent contractor', entry, sha256:dc17e9075951c353b9492692ee72547cc0cbbe07870a3733fb30938519d41dc6 — https://www.law.cornell.edu/wex/independent_contractor
- note: Medium: the long-tail and split-limit framing is general reference material.
