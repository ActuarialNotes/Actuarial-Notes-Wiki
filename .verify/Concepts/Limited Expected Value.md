---
target: Concepts/Limited Expected Value.md
created: 2026-09-28
---

## [F-001] Pareto LEV formula omits the alpha != 1 condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: Common formulas table, Pareto row, line 30
- claim: Pareto(alpha, theta): E[X^u] = theta/(alpha-1) [1 - (theta/(theta+u))^(alpha-1)]
- evidence: SOA Tables for Exam C (Fall 2009), A.2.3.1 Pareto, PDF p.8: E[X^x] = theta/(alpha-1)[1 - (theta/(x+theta))^(alpha-1)] with the condition alpha != 1, and a separate formula E[X^x] = -theta ln(theta/(x+theta)) for alpha = 1. The page states the first formula with no parameter condition; at alpha = 1 it evaluates to 0/0 and the alpha = 1 formula is not given. The formula itself agrees with the Tables for alpha != 1.
- source_rank: 1
- proposed_action: Add the condition alpha != 1 to the Pareto row and the Tables formula -theta ln(theta/(theta+u)) for alpha = 1.
- applied: false
- fingerprint: 49963536c5e5

## [F-002] e(u) used without definition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: formula block, line 18
- claim: E[X^u] = E[X] - E[max(X-u,0)] = E[X] - e(u)[1-F(u)]
- evidence: SOA Exam C sample solution Q#101 (PDF p.37): Mean excess loss = [E(X) - E(X^100)]/[1 - F(100)], and PDF p.74: E[(X-d)_+] = E(X) - E(X^d). Both equalities hold when e(u) is the mean excess loss E[X-u | X>u], but the page never says what e(u) is, so a reader cannot use the second equality.
- source_rank: 1
- proposed_action: Define e(u) on the page as the mean excess loss E[X-u | X>u] (author wording).
- applied: false
- fingerprint: 8654e8218fd6

## [F-003] Concavity claim not found in any source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullets, line 22
- claim: E[X^u] is a non-decreasing, concave function of u
- evidence: Not stated in the SOA Tables for Exam C, the SOA Exam C sample solutions, the SOA Exam P sample solutions or Werner & Modlin ch.11 (all read this session). Rank-5 recomputation agrees for non-negative X (d/du of the integral of S from 0 to u is S(u), which is >= 0 and non-increasing), which can falsify but not confirm.
- source_rank: 5
- proposed_action: Cite a ranked source for the property (e.g. Loss Models ch.3) or drop the bullet.
- applied: false
- fingerprint: f101c3d5aef4

## [F-004] Exam 5 names this quantity limited average severity LAS(H)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: nit
- status: open
- locus: definition, line 14
- claim: The Limited Expected Value (LEV) of a random variable X at limit u ...
- evidence: Werner & Modlin, Basic Ratemaking (CAS 2016), ch.11, PDF p.205: A severity limited at H is often referred to as the limited average severity at H or LAS(H), with ILF(H) = LAS(H)/LAS(B). Exam 5 (CAS) links this page and uses that name and H for the limit; MAS-I (Loss Models tables) uses E[X^x]. Same quantity, different name: flagged, not reconciled.
- source_rank: 2
- proposed_action: Mention LAS(H) as the Exam 5 name for E[X^u].
- applied: false
- fingerprint: 9c85429b04fc

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition as the expected payment under a limit against SOA Exam P sample solution Q50 (benefit limit 10: E = int_1^10 y f dy + 10 P(Y>10) = 1.9, PDF p.17) and Werner & Modlin LAS(H) (PDF p.205); int_0^u [1-F] against Exam C sample solution Q#100 (PDF p.37); E[X] - E[(X-u)_+] and e(u)S(u) against Exam C Q#101 (PDF p.37) and PDF p.74 (e(u) undefined: F-002); limit E[X^u] -> E[X] against the Tables exponential and Pareto entries; insurer/reinsurer split against Exam C Q#119-#120 (PDF p.44); exponential LEV theta(1-e^(-x/theta)) against Tables A.3.3.1 PDF p.11; Pareto LEV against Tables A.2.3.1 PDF p.8 (alpha != 1 missing: F-001); concavity unsourced (F-003); Exam 5 naming (F-004); example recomputed before reading the answer: 1000(1 - e^-2) = 1000 x 0.864665 = 864.66, agrees with 864.7; 1 embed resolves; no wiki-links
- sources_checked: SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential (PDF p.11) and A.2.3.1 Pareto (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Exam C Sample Solutions (C-09-15), Q#28 (PDF p.10), Q#100-#101 (PDF p.37), Q#119-#120 (PDF p.44), PDF p.74, sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF p.17), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Werner & Modlin, Basic Ratemaking (CAS, 2016), ch.11 Increased Limits, LAS(H) (PDF p.205), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Confidence lowered: open major F-001 (Pareto row missing alpha != 1) is on a formula; every stated formula otherwise agrees with the SOA Tables and Exam C sample solutions.

## [F-001/R] Pareto row conditioned on alpha != 1; alpha = 1 formula added
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Pareto row now reads alpha != 1, and a row gives the Tables for Exam C formula -theta ln(theta/(theta+u)) for alpha = 1 (A.2.3.1 Pareto, PDF p.8).

## [F-002/R] e(u) defined
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Added a bullet defining e(u) as the mean excess loss at u, e(u) = (E[X] - E[X ^ u])/(1 - F(u)), the form SOA Exam C sample solution Q101 uses (PDF p.37).

## [F-003/R] Concavity bullet deleted
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-003
- status: resolved
- note: No ranked source for the non-decreasing, concave claim was found this session, so the bullet was deleted.

## [F-004/R] LAS(H) named as the Exam 5 term
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-004
- status: resolved
- note: Added a bullet: Werner & Modlin write the limit as H and call E[X ^ H] the limited average severity LAS(H); under their simplifying assumptions (all underwriting expenses variable, expense and profit provisions not varying by limit, frequency independent of severity and of the limit) ILF(H) = LAS(H)/LAS(B) (PDF p.205).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001 to F-004: table rows match the Tables for Exam C; e(u) form matches Exam C Q101; LAS(H) and its assumptions match Werner p.205. Example recomputed: 1000(1 - e^-2) = 864.66 -> 864.7. Medium: original worked example.
- sources_checked: SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential (PDF p.11) and A.2.3.1 Pareto incl. alpha = 1 (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Exam C Sample Solutions (C-09-15), Q#101 mean excess loss (PDF p.37), E[(X-d)+] = E(X) - E(X ^ d) (PDF p.74), sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF p.17), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.11 Increased Limits, LAS(H) and ILF(H) = LAS(H)/LAS(B) (PDF p.205), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
