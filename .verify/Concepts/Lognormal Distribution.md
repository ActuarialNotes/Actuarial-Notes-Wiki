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

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-masi-check-A1-2026-10-30
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: diff check: LEV block, tail-mean derivation, tail-mean block and mean excess bullet added, frontmatter untouched; LEV is the k = 1 case of SOA table A.5.1.1; derivation E[X 1{X>d}] = E[X] - E[X ^ d] + d S(d) = e^{mu+sigma^2/2}[1 - Phi(z - sigma)] checked algebraically; numerically recomputed (mu = 7, sigma = 1.2, d = 2000): LEV 1162.209 formula vs 1162.209 by integration, tail mean 5538.263 formula vs 5538.263 by integration; e(d) = tail mean - d = (E[X] - E[X ^ d])/S(d) checked. The tail-mean formula is general; masi-2019f-023's parameters and answer are not on the page. G8: MAS-I.
- sources_checked: SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.5.1.1 Lognormal, printed p.6 (PDF p.11); SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table and selected-percentile row, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 Exercise 37 p.224 (PDF p.232), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma M(t) = (1 - theta t)^-alpha, t < 1/theta (PDF p.9); A.3.3.1 Exponential M(t) = (1 - theta t)^-1 and A.5.1.1 Lognormal E[(X ^ x)^k] = exp(k mu + k^2 sigma^2/2) Phi((ln x - mu - k sigma^2)/sigma) + x^k[1 - F(x)] (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Siegrist / standard normal symmetry 1 - Phi(x) = Phi(-x) as in SOA, Exam P normal distribution table (rev. 4/29/21), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf
