---
target: Concepts/Pareto Distribution.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: every displayed formula diffed against CAS table A.2.4.1 (f, F, E[X^k], both LEV cases); variance, hazard alpha/(x+theta), excess-loss Pareto(alpha, theta+d) and inversion x = theta[(1-u)^(-1/alpha) - 1] re-derived (rank 5) and matched to LDA §3.2.2/§3.4.1; both examples recomputed in python before comparing (mean 1000, Var 3,000,000, sd 1732, P(X>1000) = 0.2963, E[X^3000] = 840 also by numerical integration of S, P(X>3000) = 0.064; per payment 1250, P(X>500) = 0.512, per loss 640, E[X^500] = 360); links resolve exactly (scripts/vault_links.py); Tse section claim vs contents
- sources_checked: CAS Exam MAS-I Tables, Appendix A.2.4.1 Pareto (alpha, theta): f(x) = alpha theta^alpha/(x+theta)^(alpha+1), F(x) = 1 - (theta/(x+theta))^alpha, E[X^k] general (-1<k<alpha) and integer-k forms, E[X^x] = theta/(alpha-1)[1 - (theta/(x+theta))^(alpha-1)] for alpha != 1 and -theta ln(theta/(x+theta)) for alpha = 1, mode 0, PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Frees et al., Loss Data Analytics (open text), Ch 3 'Modeling Loss Severity': §3.2.2 Pareto Distribution (pdf eq. 3.1, CDF, k-th moment exists iff alpha > k, integer-k moment, mean theta/(alpha-1) for alpha>1, variance alpha theta^2/((alpha-1)^2(alpha-2)) for alpha>2, decreasing hazard) and §3.4.1 Policy Deductibles (if X is Pareto(alpha, theta) then Y^P is Pareto(alpha, theta + d)), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents p.viii (PDF p.10): §2.2 Some continuous distributions for claim severity, §2.2.4 Pareto distribution p.51, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A task 3 'Calculate limited expected value' (PDF p.3); Tse Sections 2.2-2.5 assigned (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: All formulas agree with the CAS MAS-I table's two-parameter Pareto; all example numbers reproduce. Confidence medium, not high: the hazard rate, the excess-loss result and the variance rest on Loss Data Analytics (rank 3), and the inversion formula is stated by no source read (a one-line inverse of the rank-1 CDF). Tse's own notation for §2.2.4 was not readable (preview holds contents and Ch 1 only). No exam page links this page.

## [C-002] Notation slip in C-001's source and checks text
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- locus: C-001 sources_checked / checks_run
- note: In C-001 (and the block's first source line) the limited expected value is written 'E[X^x]' / 'E[(X^x)^k]' / 'E[X^<limit>]'. The '^' there stands for the minimum operator (the tables' E[X ∧ x], E[(X ∧ x)^k]), not a power: read 'E[X^3000] = 840' as E[X ∧ 3000] = 840, and so on. The numbers and the table formulas cited are unchanged.
