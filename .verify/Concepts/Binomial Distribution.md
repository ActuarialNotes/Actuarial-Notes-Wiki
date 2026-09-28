---
target: Concepts/Binomial Distribution.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: pmf C(n,k)p^k(1-p)^(n-k), k=0..n (Exam C B.2.1.3 with m=n, q=p); E=np (Exam C mq; G&S p.233); Var=np(1-p) (Exam C mq(1-q); G&S p.263 npq); conditions independent, two outcomes, constant p consistent with SOA Q41 usage; example recomputed before reading: C(10,4)=210, 0.3^4=0.0081, 0.7^6=0.117649, P=0.200121 -> 0.2001 (agrees); both media embeds exist
- sources_checked: SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.1 E(Sn)=np p.233 (PDF p.241); 6.2 binomial variance npq p.263 (PDF p.271), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q41 solution PDF pp.15-16 (binomial probabilities for independent months), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf
