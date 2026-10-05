---
target: Concepts/Chapman-Kolmogorov Equations.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both displayed formulas, Ross's P^n_ij notation, the law-of-total-probability reading, the row-by-row shortcut, the 'ever entered = make absorbing' technique, the non-homogeneous and continuous-time forms - each matched to Ross Ch.4 (older edition), Siegrist and Daniel; examples recomputed in Python before comparing: row O of P^2 = (0.36, 0.60, 0.04), P^3_OC = 0.704, P^3_OR = 0.08, with R absorbing P(reopened by month 3) = 0.10, gap 0.02 = (0.4)(0.1)(0.5) - all match; links resolve; LaTeX balanced
- sources_checked: Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists, file dated 2012-09-06): Sec. 4.2 n-step notation P^n_ij = P{X_{n+k}=j | X_k=i}, Chapman-Kolmogorov eq. (4.2) with derivation, P(n+m) = P(n)P(m), P(n) = P^n pp.189-190; unconditional P{X_n=j} = sum_i P^n_ij alpha_i p.191; absorbing-set technique for 'enters A by time n' and Ex. 4.10 pp.192-193, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Siegrist, Random, 'Discrete-Time Markov Chains' (Chapman-Kolmogorov P_m P_n = P_{m+n} and conditioning proof; P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html; Siegrist, Random, 'Transition Matrices and Generators' (continuous time: P_s P_t = P_{s+t}, P_{s+t}(x,z) = sum_y P_s(x,y) P_t(y,z)), sha256:5c059429b24a6c2c05ff35d4e72c1eb7153e9b5e3cc93e68bdf191309cbf9597 - https://www.randomservices.org/random/markov/Transition.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed.), Ch. 11 Sec. 11.1: p(2)_ij = sum_k p_ik p_kj and Thm 11.1, PDF pp.414-415, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf; Daniel, 'Multi-state transition models with actuarial applications' (2004; CAS/SOA reprint), Thm 1.18 non-homogeneous kQ_n = Q_n x ... x Q_{n+k-1} and the 'Warning on interpretation' (in a state at time n vs. having arrived/stayed), PDF p.7, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 - https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf
- note: No findings. Confidence medium: rank-2 coverage is an older-edition course-hosted Ross chapter; the rest is rank 3.
