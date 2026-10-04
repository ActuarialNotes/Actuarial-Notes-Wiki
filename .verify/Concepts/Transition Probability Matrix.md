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
