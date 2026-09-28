---
target: Concepts/Independent and Identically Distributed.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: Definition against G&S Def. 4.5 (PDF p.152) and Def. 4.8 (PDF p.176); product density against G&S Thm 4.2 (PDF p.173); E[S_n] = n mu, Var(S_n) = n sigma^2, E[Xbar] = mu, Var(Xbar) = sigma^2/n against G&S Thm 6.9 (PDF p.268), Cor. 6.1 (PDF p.283) and P-21-05 §III theorem (PDF pp.4-5); Var(2X1) = 4 sigma^2 against G&S Thm 6.7 (PDF p.267); CV of S_n = sigma/(mu sqrt n) against P-21-05 PDF pp.4-5; CLT with i.i.d. finite-variance summands against syllabus Topic 3 i (PDF p.4) and G&S §9.2 (PDF p.348); max F(x)^n against SOA sample solution Q448 (PDF p.125); min [1-F(x)]^n against SOA sample solution Q249 (PDF p.73); Bernoulli sum is binomial against G&S PDF p.192; Poisson sum is Poisson with means added against SOA sample solutions Q117 and Q124; exponential sum is gamma against G&S PDF p.215 (rate lambda = 1/theta, notation difference; matches Tables gamma scale theta); example 1 recomputed before reading: Var(S) = 8,000,000, SD 2,828.4, Var(T) = 400,000,000, SD 20,000, CV 0.0566 vs 0.40, ratio 1/sqrt(50) = 0.1414, all agree; example 2 recomputed: F(5000) = 1 - e^-2.5 = 0.917915, 0.917915^5 = 0.651648, P = 0.34835, e^-2.5 = 0.0821, all agree; 10 wiki-links resolve
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.5 (PDF p.152), Thm 4.2 (PDF p.173), Def. 4.8 (PDF p.176), p.184 (PDF p.192), p.207 (PDF p.215), Thms 6.7 and 6.9 (PDF pp.267-268), Cor. 6.1 (PDF p.283), §9.2 (PDF p.348), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §III theorem on S_n (PDF pp.4-5), §VI Deductibles (PDF p.7) and Benefit Limits (PDF pp.8-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q117, Q124, Q249 (PDF p.73), Q448 (PDF p.125), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
