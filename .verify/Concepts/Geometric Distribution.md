---
target: Concepts/Geometric Distribution.md
created: 2026-09-28
---

## [F-001] Memorylessness example prompt admits a second reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: nit
- status: open
- locus: example Using Memorylessness After a Dry Spell, prompt, line 38
- claim: Find the probability that at least 3 more must be reviewed before the first claim appears.
- evidence: Read as at least 3 further reviews up to and including the one with the claim: P(X>10 | X>8) = P(X>2) = 0.8^2 = 0.64 (my recomputation before reading, and the page answer). Read as at least 3 further claim-free reviews before the claim: P(X>11 | X>8) = 0.8^3 = 0.512. The answer states the event explicitly (X > 8+2), so the result is not wrong for the event it names; memorylessness itself per Grinstead & Snell 5.1 p.186 (PDF p.194), P(T>r+s | T>r) = q^s.
- source_rank: 3
- proposed_action: Reword the prompt to name the event, e.g. that the first claim is on the 11th policy or later.
- applied: false
- fingerprint: 07d2dd4cb988

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: trials pmf and support (G&S p.185); E=1/p, Var=(1-p)/p^2 (G&S p.262); memoryless property and exponential link (G&S p.186); failures form Y=X-1: Exam C B.2.1.2 pk=beta^k/(1+beta)^(k+1), E=beta, Var=beta(1+beta), with beta=(1-p)/p gives (1-p)^k p, (1-p)/p, (1-p)/p^2 (same variance, as stated); survival (1-p)^n (G&S p.186 P(T>r)=q^r); page states its parameterisation explicitly; examples recomputed before reading: 0.8^2 x 0.2=0.128, E=5, P(X>2)=0.64 (all agree; wording nit F-001); links and media exist
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 geometric pmf P(T=j)=q^(j-1)p, j=1,2,... p.185 (PDF p.193); memoryless P(T>r+s|T>r)=q^s, also obeyed by the exponential, p.186 (PDF p.194); 6.2 E(T)=1/p and V(T)=q/p^2 p.262 (PDF p.270), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.2.2 geometric EX=1/p on range 1,2,3,..., sha256:cef561084124ba2a0ab25d131a56f9647e8f53a20ab41be7c4480f11fb27c5bf — https://www.probabilitycourse.com/chapter3/3_2_2_expectation.php
