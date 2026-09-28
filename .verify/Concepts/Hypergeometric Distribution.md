---
target: Concepts/Hypergeometric Distribution.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: pmf (G&S p.193, notation N,k,n vs page N,K,n); support max(0,n+K-N)..min(n,K) (Pishro-Nik 3.1.5 with b=K, r=N-K, k=n); E=nK/N (Siegrist; Pishro-Nik 3.2.5); Var=nK(N-K)(N-n)/(N^2(N-1)) = n(K/N)(1-K/N)(N-n)/(N-1) (Siegrist); dependence of draws (Siegrist: indicators negatively correlated); example recomputed before reading: C(4,2)C(6,1)/C(10,3)=36/120=0.30 (agrees); link and media exist
- sources_checked: Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 hypergeometric h(N,k,n,x)=C(k,x)C(N-k,n-x)/C(N,n) p.193 (PDF p.201), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services, UAH), The Hypergeometric Distribution, Moments section: E(Y) = n r/m, var(Y) = n (r/m)(1 - r/m)(m - n)/(m - 1), fetched 2026-09-27, sha256:56414fcd41140fbad38e3e39034536cd06144012f8457ed797740bec97e44487 — https://www.randomservices.org/random/urn/Hypergeometric.html; H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.1.5 hypergeometric range max(0,k-r)..min(k,b), sha256:bccbfaa60f1813544eb18810fd601ea98e2e89e80c5d50f76aa6ea10a6096a72 — https://www.probabilitycourse.com/chapter3/3_1_5_special_discrete_distr.php; 3.2.5 EX=kb/(b+r), sha256:71f926e8d746785af219018a406d4b28b9aac9e283a7c501119fc6c94584f86e — https://www.probabilitycourse.com/chapter3/3_2_5_solved3_2.php
