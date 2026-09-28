---
target: Concepts/Lognormal Distribution.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: pdf 1/(x sigma sqrt(2 pi)) exp(-z^2/2), F = Phi((ln x - mu)/sigma), mu may be negative: tables A.5.1.1. E[X^k] = exp(k mu + k^2 sigma^2/2) gives E = e^(mu + sigma^2/2) and Var = e^(2mu + 2sigma^2) - e^(2mu + sigma^2) = e^(2mu + sigma^2)(e^(sigma^2) - 1). Y = e^X with X normal is log normal: G&S p.224. Example recomputed before reading: ln 1000 = 6.90776, z = 0.60517; SOA table Phi(0.60) = 0.7257, Phi(0.61) = 0.7291, interpolated 0.7274; P = 0.2726. Agrees. Embeds exist.
- sources_checked: SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.5.1.1 Lognormal, printed p.6 (PDF p.11); SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table and selected-percentile row, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 Exercise 37 p.224 (PDF p.232), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf
