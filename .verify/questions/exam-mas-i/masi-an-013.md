---
target: questions/exam-mas-i/masi-an-013.md
created: 2026-10-10
---

## [F-001] Filed under Domain A; tests Domain B material
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- severity: minor
- status: open
- locus: frontmatter learning_objective
- claim: learning_objective: "Probability Models (Stochastic Processes and Survival Models)".
- evidence: The question tests the variance and CV of a sum of correlated losses, Var(S) = n sigma^2 + n(n-1) rho sigma^2; no Poisson process or other Domain A task is involved. The 2026 MAS-I outline (PDF pp.3-4, 6) lists Domain A tasks A1-A6 (Poisson processes, LEV, survival, life contingencies; readings Daniel, Ross, Struppeck) and assigns Hogg Section 2.8 (linear combinations of random variables) to Domain B. The exam page also lists Covariance and Linear Combinations of Random Variables under B. Insurance Portfolio, the topic, is under A only as the setting for a mixed Poisson process.
- source_rank: 1
- proposed_action: Consider re-filing under "Statistics" (Domain B), keeping the topic; a maintainer's call, since the topic page sits in Domain A.
- applied: false
- fingerprint: 374c1112e31a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading answer/explanation; key compared with the blind answer; every distractor's arithmetic and rationale recomputed; option distinctness; explanation arithmetic line by line; wiki_link tags against what the question tests (all resolve; validate_content.py clean); learning_objective against the Exam MAS-I domain titles and the 2026 outline tasks; stated facts against the cited sources
- sources_checked: Siegrist, Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), ch.4 Covariance and Correlation, The Variance of a Sum (variance of a sum = sum of pairwise covariances), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html; CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Blind: current CV 10 sqrt(647,920)/8,000 = 1.0062; coastal 10 sqrt(1,009,900)/10,000 = 1.0049; inland 10 sqrt(649,920)/10,000 = 0.8062 -> E. Key E; A's 1.006 sqrt(0.8)=0.900 and B's 0.100 checked. Maths confirmed against Siegrist (rank 3); Hogg 2.8 is commercial, hence medium. See F-001: the question tests the variance of a sum of correlated losses (Domain B, Hogg 2.8), but is filed under Domain A.
