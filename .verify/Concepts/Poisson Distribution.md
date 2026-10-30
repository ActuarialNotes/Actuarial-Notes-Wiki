---
target: Concepts/Poisson Distribution.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: pmf e^-lambda lambda^k/k!, k=0,1,... (Exam C B.2.1.1); E=Var=lambda (Exam C; G&S p.263); binomial limit np=lambda (G&S p.263); claim-count usage (14 SOA sample questions pair Poisson with claim counts; Exam C (a,b,0) frequency class); same lambda parameterisation as the Loss Models table used by Exam MAS-I, so no CAS/SOA difference; example recomputed before reading: e^-3 = 0.049787 -> 0.0498, about 5% (agrees); media embeds exist
- sources_checked: SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.2 Poisson as the limit of binomial with n to infinity, p to 0, np = lambda fixed, and variance lambda, p.263 (PDF p.271), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Questions (Aug 2026 revision), 14 questions modelling claim counts as Poisson, sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T18:36Z/5c0a
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: additions only; lambda = -ln P(X=0) from pmf and ln as inverse of exp; even/odd sums re-derived: (e^l + e^-l)/2 = cosh l, e^-l cosh l = (1+e^-2l)/2, odd = (1-e^-2l)/2, against OpenStax Maclaurin series and cosh definition; no question numbers on page (p-613/p-434 ratios not transcribed); prior sources still back unchanged content
- sources_checked: SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.2 Poisson as the limit of binomial with n to infinity, p to 0, np = lambda fixed, and variance lambda, p.263 (PDF p.271), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Questions (Aug 2026 revision), 14 questions modelling claim counts as Poisson, sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 eq. 5.2 Poisson pmf, P(X=0) ~ e^-lambda, p.189 (PDF p.197), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; OpenStax Calculus Volume 2 (HTML fetched 2026-10-30), §6.3 Taylor and Maclaurin Series, Example 6.16: Maclaurin series of e^x = sum x^n/n!, converging for all x, sha256:d31b601074d1b8cc7241191e2d4ec581e3524ae4ec5907a6c500f2ad4683f9dd — https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series; OpenStax Calculus Volume 1 (HTML fetched 2026-10-30), §1.5 Exponential and Logarithmic Functions: natural log as inverse of e^x; Hyperbolic Functions, cosh x = (e^x + e^-x)/2, sha256:bb31120fbd3eefab30afe72f26fb353e84b3d34084c59d0f8b0521d1b4703113 — https://openstax.org/books/calculus-volume-1/pages/1-5-exponential-and-logarithmic-functions
