---
target: Concepts/Transition Probability Matrix.md
created: 2026-10-04
---

## [F-001] Doubly stochastic: 'its' stationary distribution is unique only for an irreducible chain
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: body, bullet 1 ('Rows sum to one; columns need not')
- claim: A matrix whose columns also sum to one is doubly stochastic, and its stationary distribution is uniform.
- evidence: Siegrist, Random, 'Discrete-Time Markov Chains', section 'Doubly Stochastic Matrices': for a finite chain with doubly stochastic P 'the uniform distribution on S is invariant' - a uniform vector is always A stationary distribution, so the formula itself is right. Uniqueness ('its') needs irreducibility: Ross Ch.4 Exercise 20 (course-hosted older-edition copy, p.266) states pi_j = 1/(M+1) for a doubly stochastic chain 'irreducible and aperiodic' with M+1 states; Grinstead & Snell Exercise 11.3.9 (PDF p.451) proves (1/3,1/3,1/3) is 'a fixed probability vector' and asks to 'interpret these results for ergodic chains'. Rank-5 counterexample: P = I (2x2) is doubly stochastic and every (a, 1-a) is stationary; block-diagonal doubly stochastic chains have long-run proportions that depend on the start. The sibling page Stationary Distribution words it safely ('has a uniform pi'). Minor rather than major because the uniform vector is stationary in every case - only the implied uniqueness is overstated.
- source_rank: 2
- proposed_action: Qualify the clause, e.g. 'the uniform distribution is stationary - the unique one when the chain is irreducible' (Ross Ex. 4.20 / Siegrist). Needs a human to word it; not auto-fixed (new prose).
- applied: false
- fingerprint: 89ee8c478285

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: row-stochastic definition, row-vector update alpha^(n) = alpha^(0) P^n, absorbing states, state-enlargement for two-period memory, non-homogeneous products, doubly stochastic claim - each checked against Ross Ch.4 (older edition), Grinstead & Snell Ch.11, Siegrist and Daniel; examples recomputed in Python before comparing: next-year mix (0.505, 0.385, 0.110), long-run mix (0.500, 0.375, 0.125), four-state CC/NC/CN/NN matrix rebuilt from the stated claim probabilities matches the page's, P(claim in year 2 | NN) = 0.12 - all match; links resolve; LaTeX balanced
- sources_checked: Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists, file dated 2012-09-06): P_ij >= 0 and row sums p.185; Ex. 4.4 'Transforming a Process into a Markov Chain' (two-day weather -> four-state chain) pp.186-187; Sec. 4.2 Chapman-Kolmogorov and unconditional P{X_n=j} = sum_i alpha_i P^n_ij pp.189-191; Exercise 20 doubly stochastic p.266, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed.), Ch. 11: Thm 11.2 u(n) = uP^n (row vector) PDF p.417; Def 11.1 absorbing state p_ii = 1 PDF p.424; Exercise 11.3.9 column sums 1 -> uniform fixed vector PDF p.451, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Random, 'Discrete-Time Markov Chains' (stochastic matrix, f P^n is the distribution of X_n, time homogeneity, 'Doubly Stochastic Matrices' -> uniform invariant), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html; Siegrist, Random, 'General Markov Processes', section 'Enlarging the State Space' (future depends on last two states -> Y_n = (X_n, X_{n+1}) is a homogeneous Markov process), sha256:69b4f54fd8c976d8a7093b3bfb9e0b3e836aa60794d1ad262e55c9b4b27f043c - https://www.randomservices.org/random/markov/General.html; Daniel, 'Multi-state transition models with actuarial applications' (2004; CAS/SOA reprint), Def. 1.7 non-homogeneous Markov chain and Thm 1.18 kQ_n = Q_n Q_{n+1} ... Q_{n+k-1}, PDF pp.4-7, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 - https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf; CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics 2007 reprint), Sec. 6.4 'since default is an absorbing state, eventually all firms will default', PDF p.91, sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 - https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f
- note: One minor finding open (F-001: doubly stochastic -> uniform is unique only for an irreducible chain). Confidence medium: rank-2 coverage is an older-edition course-hosted Ross chapter; the rest is rank 3.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 1 now separates existence from uniqueness: 'A matrix whose columns also sum to one is doubly stochastic. For a chain with finitely many states the uniform distribution is then stationary, and it is the chain's unique stationary distribution when the chain is irreducible.' (was: '…doubly stochastic, and its stationary distribution is uniform'). Siegrist, Random, Discrete-Time Markov Chains, 'Doubly Stochastic Matrices': finite S with doubly stochastic P → 'the uniform distribution on S is invariant' (sha256:808118b1…); Siegrist, Random, Limiting Behavior: a finite irreducible set is a positive recurrent class, and an irreducible positive recurrent chain has a unique invariant pdf (sha256:d4719c5e1cb9ad3be4fbf84c8dd849390f7d1ad15ced112f6312be83e5545680 — https://www.randomservices.org/random/markov/Limiting.html); Ross ch.4 (NTNU course copy, sha256:9f01ac6c…) p.203 'in a finite-state Markov chain all recurrent states are positive recurrent' and p.205 Remark (iii): for an irreducible chain a solution of π = πP exists iff positive recurrent and is then unique. Edit committed by an interrupted earlier attempt of this run (commit 6669d816); reviewed this session, no further change.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Every bullet re-read against Ross ch.4, Siegrist, Grinstead & Snell, Daniel (multi-state) and CreditMetrics, all re-fetched this session (six hash-identical to run 8861; Siegrist 'Limiting' newly read for the uniqueness clause). Examples recomputed in Python: next-year mix (0.505, 0.385, 0.110), sums to 1; 2,000 iterations converge to (0.500, 0.375, 0.125); the four-state CC/NC/CN/NN matrix rebuilt from the stated claim probabilities equals the page's, and P^2(NN→CC) + P^2(NN→NC) = 0.12. 6 links resolve (vault_links exact). verify_check clean.
- sources_checked: Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on the NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 outline lists), p.185 (P_ij >= 0, rows sum to 1), Ex. 4.4 pp.186-187 (two-day dependence made Markov by a four-state chain), §4.2 pp.189-191 (Chapman-Kolmogorov; P{X_n = j} = Σ_i α_i P^n_ij), p.203 (finite-state: recurrent states are positive recurrent), Thm 4.1 and Remark (iii) p.205 (unique stationary solution for an irreducible positive recurrent chain), Exercise 20 p.266 (doubly stochastic), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.16 §3 Discrete-Time Markov Chains (P_n = P^n; 'Doubly Stochastic Matrices': uniform invariant on a finite S), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 — https://www.randomservices.org/random/markov/Discrete.html; Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), Discrete-Time Markov Chains, 'Limiting Behavior' (a finite irreducible set is a positive recurrent class; an irreducible positive recurrent chain has a unique invariant pdf), sha256:d4719c5e1cb9ad3be4fbf84c8dd849390f7d1ad15ced112f6312be83e5545680 — https://www.randomservices.org/random/markov/Limiting.html; Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), Introduction to General Markov Processes, 'Enlarging the State Space' (future depending on the last two states: Y_n = (X_n, X_{n+1}) is a homogeneous Markov process), sha256:69b4f54fd8c976d8a7093b3bfb9e0b3e836aa60794d1ad262e55c9b4b27f043c — https://www.randomservices.org/random/markov/General.html; Grinstead & Snell, Introduction to Probability (2nd rev. ed.), Ch. 11: Thm 11.2 u(n) = uP^n (row vector) PDF p.417; Def. 11.1 absorbing state p_ii = 1 PDF p.424, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Daniel, 'Multi-state transition models with actuarial applications' (2004; CAS study note reprint), non-homogeneous Markov chains PDF pp.4, 6 and Thm 1.18 PDF p.7 (kQ_n = Q_n Q_{n+1} … Q_{n+k-1}; Q^k when homogeneous), sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 — https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf; CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics reprint), §6.4, PDF p.91 ('since default is an absorbing state, eventually all firms will default'), sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 — https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f
- note: Resolve run: F-001 closed. Medium: the main rank-2 coverage is an older-edition course-hosted Ross chapter; the rest is rank 3. No open findings.

## [C-003] Comment
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- locus: validation pass (this run): sources_checked, Siegrist Discrete-Time Markov Chains
- note: The pass recorded just above cites Siegrist's 'Discrete-Time Markov Chains' as 'ch.16 §3'; in Random it is ch.15 (Markov Processes) §3, as the page title bar reads. The URL and sha256 (808118b1…) are right; only the chapter number in the locator is wrong. No content or status change.
