---
target: Concepts/Negative Binomial Distribution.md
created: 2026-09-28
---

## [F-001] Var(X) > E[X] always is false for the trials-count X the page defines
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: notes, bullet 2, line 25
- claim: Var(X) > E[X] always, so the negative binomial is the standard overdispersed alternative to the Poisson for claim counts in a heterogeneous portfolio.
- evidence: For the X defined on the page (trials until the r-th success, support r, r+1, ...), E[X]=r/p (Pishro-Nik 3.2.2, Pascal EX=m/p) and Var(X)=r(1-p)/p^2 (SOA Tables for Exam C App. B.2.1.4, PDF p.15: Var[N]=r beta(1+beta) with beta=(1-p)/p, unchanged by the shift X=N+r). Var(X)>E[X] iff (1-p)/p>1 iff p<1/2. Counterexample: r=3, p=0.75 gives E[X]=4, Var(X)=3(0.25)/0.5625=1.333, less than 4. The inequality holds always only for the failures count Y=X-r, where Var(Y)/E[Y]=1/p=1+beta>1 (Exam C Tables B.2.1.4). The heterogeneous-portfolio rationale is not stated in any source read this session.
- source_rank: 1
- proposed_action: Restrict the overdispersion statement to the failures-count form Y (Var(Y) = E[Y]/p > E[Y]), and source or drop the heterogeneous-portfolio clause.
- applied: false
- fingerprint: a1a9ebc257fa

## [F-002] CAS MAS-I context uses the Loss Models NB(r, beta) failures form; page gives no beta mapping
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: minor
- status: open
- locus: notes, bullet 1, line 24
- claim: The alternative counts failures before the r-th success, Y = X - r, with P(Y=k) = C(k+r-1,k) p^r (1-p)^k
- evidence: Exam MAS-I (CAS).md lists [[Negative Binomial Distribution]] among the distributions that arise from Poisson processes (mixed Poisson process, random rate across the portfolio). The Loss Models parameterisation (SOA Tables for Exam C App. B.2.1.4, PDF p.15) is NB(beta, r) counting failures, pk = r(r+1)...(r+k-1) beta^k / (k!(1+beta)^(r+k)), E=r beta, Var=r beta(1+beta), with r any positive real. The page gives only (r, p) forms with r = number of successes required (an integer) and never states the mapping p = 1/(1+beta). Exam P usage (SOA sample solution Q146, PDF pp.42-43: third malfunction on the fifth day, C(4,2)(0.4)^2(0.6)^2(0.4) = 0.13824) is the trials form the page leads with. Usage differs by context; flagged, not reconciled.
- source_rank: 1
- proposed_action: Add a note mapping the page parameterisation to the Loss Models NB(r, beta) form (p = 1/(1+beta), Y = failures, r not necessarily an integer) for readers arriving from Exam MAS-I.
- applied: false
- fingerprint: 98b66ac7b6b6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: trials pmf C(k-1,r-1)p^r(1-p)^(k-r), k=r,r+1,... (G&S p.187; SOA Q146 applies the same form); r=1 geometric (G&S p.187; Exam C B.2.1.2 note); E=r/p (Pishro-Nik 3.2.2); Var=r(1-p)/p^2 (sum of r independent geometrics, G&S pp.289, 262; Exam C rbeta(1+beta) with beta=(1-p)/p); failures form C(k+r-1,k)p^r(1-p)^k, E[Y]=r(1-p)/p (Exam C B.2.1.4 with beta=(1-p)/p); page states which parameterisation it uses; overdispersion claim false for trials X -> F-001; MAS-I parameterisation flag -> F-002; example recomputed before reading: C(6,2)=15 x 0.015625 x 0.31640625 = 0.074158 -> 0.0742 (agrees); links and media exist
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 negative binomial u(x,k,p)=C(x-1,k-1)p^k q^(x-k), trials until the k-th head, k=1 geometric, p.187 (PDF p.195); 7.1 convolution of k geometrics is negative binomial p.289 (PDF p.297); 6.2 geometric V=q/p^2 p.262 (PDF p.270), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.2.2 Pascal(m,p) EX=m/p, sha256:cef561084124ba2a0ab25d131a56f9647e8f53a20ab41be7c4480f11fb27c5bf — https://www.probabilitycourse.com/chapter3/3_2_2_expectation.php; SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q146 solution PDF pp.42-43 (negative binomial probability of the third success on the fifth trial), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf
- note: Formulas agree with sources; open major F-001 on the overdispersion claim and minor F-002 flagging the CAS MAS-I (Loss Models) parameterisation.
