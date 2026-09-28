---
target: Concepts/Exponential Distribution.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: pdf e^(-x/theta)/theta, F = 1 - e^(-x/theta), E[X^k] = theta^k k! (so E = theta, Var = 2theta^2 - theta^2 = theta^2), E[X ∧ u] = theta(1 - e^(-u/theta)): tables A.3.3.1. E[(X-d)+] = E[X] - E[X ∧ d] = theta e^(-d/theta) from the same entry. Memoryless definition P(T > r+s | T > r) = P(T > s): G&S p.206; uniqueness among continuous densities: G&S p.68. Excess over a deductible again exponential with the same mean: SOA Q101 solution; memoryless applied: SOA Q44. Rate form lambda e^(-lambda x), F = 1 - e^(-lambda x): G&S p.206. Notation: SOA Q101 writes lambda for the mean; the page caution to check the convention covers it. Examples recomputed before reading: e^(-0.6) = 0.548812; 500e^(-0.6) = 274.41; per payment 500; 1000(e^(-0.2) - e^(-1)) = 818.731 - 367.879 = 450.85 (cross-check E[X ∧ 1000] - E[X ∧ 200] = 632.12 - 181.27). All agree. Links and embeds resolve.
- sources_checked: SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.3.3.1 Exponential, printed p.6 (PDF p.11); Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 Example 2.17 p.68 (PDF p.76) and 5.2 p.206 (PDF p.214), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Exam P Sample Solutions (Aug 2026 revision), Q44 (PDF p.16) and Q101 (PDF pp.30-31), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf
