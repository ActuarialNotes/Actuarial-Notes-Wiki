---
target: Concepts/Bonus-Malus System.md
created: 2026-10-04
---

## [F-001] Unsourced claim: a randomly chosen driver's level is not Markov
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: body, bullet 2 ('A BMS is a coarse form of Experience Rating ...'), last sentence
- claim: For one driver with a fixed lambda the level is Markov; for a randomly chosen driver it is not, because the level history carries information about lambda.
- evidence: First half is sourced: Ross Ch.4 Ex. 4.7 (course-hosted older-edition copy, p.188) - 'the number of yearly claims made by a particular policyholder is a Poisson random variable with parameter lambda, then the successive states of this policyholder will constitute a Markov chain'; Niemiec, ASTIN Bull. 37(1) 2007, p.53 - constant individual claim frequency 'implies constant transition probabilities and makes it possible to model a BMS as a homogeneous Markov chain'. The second half (non-Markov for a driver drawn from a heterogeneous portfolio) appears in none of the sources read this session (Ross Ch.4 copy, Lemaire & Zi 1994, Niemiec 2007, Charpentier-David-Elie 2017). Rank-5 recomputation agrees with the page (it cannot confirm): with lambda in {0.1, 0.5} equally likely in the page's 3-level system, P(X3=1 | X2=0, X1=0) = 0.6230 but P(X3=1 | X2=0, X1=1) = 0.6856, so the level alone is not a sufficient state. The statement is very likely true; it is filed only because it is stated as fact with no cited source.
- source_rank: 5
- proposed_action: Cite a source for the mixture claim (e.g. Denuit, Marechal, Pitrebois & Walhin, Actuarial Modelling of Claim Counts, 2007, ch. 4, if it states it) or have a human decide whether to keep the sentence. Not auto-fixed.
- applied: false
- fingerprint: fc1d011cde04
