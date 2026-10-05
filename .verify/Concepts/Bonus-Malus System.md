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

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: transition formula and notation (s_i(k), a_k, Poisson a_k) against Ross Ex. 4.7; long-run average premium formula against Ross Prop. 4.3 / Ex. 4.23; counts-not-amounts, hunger for bonus, under-reporting and weak separation against Lemaire & Zi and Charpentier et al.; examples recomputed in Python (stationary solve and a 60-year premium-difference simulation) before comparing: lambda=0.2 pi = (0.1813, 0.1484, 0.6703), 51.09; lambda=0.5 pi = (0.3935, 0.2387, 0.3679), 02.56, ratio 1.147 ('about 15% more'); reporting cost 200 + 100e^-0.2 = 81.87 (brute-force simulation agrees) - all match; links resolve; LaTeX balanced
- sources_checked: Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists, file dated 2012-09-06): Ex. 4.7 Bonus Malus system, s_i(k) and a_k notation, P_ij = sum over k with s_i(k)=j of e^-lambda lambda^k/k!, pp.188-189; Proposition 4.3 and Ex. 4.23 average annual premium = sum pi_j x premium_j, pp.215-216, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Lemaire & Zi, 'A Comparative Analysis of 30 Bonus-Malus Systems', ASTIN Bulletin 24(2), 1994 (CAS-hosted): Introduction (BMS surcharge/discount by claims; a priori classification vs. need for BMS) pp.287-288; Tool #3 efficiency = elasticity of the mean stationary premium w.r.t. claim frequency, typically far below 1 (Table 4) p.294; Tool #4 'hunger for bonus', paying small claims to avoid surcharges, pp.294-296, sha256:44976cd13085959f1c41c738cc06163b0999de01beb4411b2f6d5b33859ec181 - https://www.casact.org/sites/default/files/database/astin_vol24no2_287.pdf; Charpentier, David & Elie, 'Optimal Claiming Strategies in Bonus Malus Systems and Implied Markov Chains', Risks 5(4):58, 2017: Sec. 1 (BMS as Markov chains; hunger for bonus - small accidents not reported; zero-inflated claim data) p.1; Sec. 1.2-1.3 stationary distribution -> average premium, short-term rule 'not claim when l < P3 - P1' pp.2-3; Sec. 2.2 stationary distribution depends only on frequency, not severity p.4, sha256:7aca0a4b2950faa930301254577a315125779ee70accd96e61d57d66214ac764 - https://pdfs.semanticscholar.org/e029/9f4413e126653c375b792038ea8b6c8b21c1.pdf; Niemiec, 'Bonus-Malus Systems as Markov Set-Chains', ASTIN Bulletin 37(1), 2007 (CAS-hosted), Sec. 1 Introduction (constant individual claim frequency -> homogeneous Markov chain) p.53, sha256:5ca8e5a1c851ba2d6855f29319172d102e4eeee90c2ae1cd1d040b8ff4114fe8 - https://www.casact.org/sites/default/files/database/astin_vol37no1_53.pdf
- note: One minor finding open (F-001: the claim that a randomly chosen driver's level is not Markov has no source among those read; rank-5 check agrees with it). Confidence medium: rank-2 coverage is an older-edition course-hosted Ross chapter; the BMS-specific claims rest on rank-3 papers.

## [C-002] Dollar figures in C-001 checks_run lost to shell expansion
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: log entry C-001, checks_run
- note: Erratum to C-001 (same run): the checks_run text reads "51.09", "02.56" and "81.87" because the recorder command was double-quoted and the shell expanded "$3", "$4" and "$2". The recomputed figures, which match the page, are $351.09 (lambda = 0.2), $402.56 (lambda = 0.5) and $281.87 (expected extra premium from reporting). No change to the status or to the page.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Deleted the unsourced half of the sentence ("for a randomly chosen driver it is not, because the level history carries information about λ"): no source read in either run states it. The sourced half is kept and now names its conditions: "For one driver with a fixed λ and independent yearly claim counts, the level is a homogeneous Markov chain." Ross ch.4 Ex. 4.7 pp.188-189 (NTNU course copy, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1): if the yearly claims of a particular policyholder are Poisson(λ), the successive states form a Markov chain with P_ij = Σ_{k: s_i(k)=j} e^{-λ}λ^k/k!; Niemiec, ASTIN Bulletin 37(1) 2007, p.53 (sha256:5ca8e5a1c851ba2d6855f29319172d102e4eeee90c2ae1cd1d040b8ff4114fe8): a constant individual claim frequency "implies constant transition probabilities and makes it possible to model a BMS as a homogeneous Markov chain". Edit committed by an interrupted earlier attempt of this run (commit 9ae44d02); reviewed this session, no further change.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: All four sources re-fetched this session (hash-identical to run 8861) and the page re-read against them, with the edited sentence checked against Ross Ex. 4.7 and Niemiec p.53. Examples recomputed in Python: lambda 0.2, pi = (0.1813, 0.1484, 0.6703) by closed form and by iterating P, average premium 90.635 + 59.364 + 201.096 = 351.09; lambda 0.5, pi = (0.3935, 0.2387, 0.3679), 402.56, ratio 1.147 (about 15 percent more); expected extra premium from reporting 200 + 100e^{-0.2} = 281.87, and a 200,000-path simulation from level 2 gives 281.87. 5 links resolve (vault_links exact). verify_check clean.
- sources_checked: Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on the NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 outline lists): Ex. 4.7 Bonus Malus system, s_i(k) and Poisson a_k, P_ij = Σ_{k: s_i(k)=j} e^{-λ}λ^k/k!, pp.188-189; Proposition 4.3 and Ex. 4.23 average annual premium = Σ_j π_j × premium_j, pp.215-216, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Niemiec, 'Bonus-Malus Systems as Markov Set-Chains', ASTIN Bulletin 37(1), 2007 (CAS-hosted), §1 Introduction p.53 (constant individual claim frequency → constant transition probabilities → homogeneous Markov chain), sha256:5ca8e5a1c851ba2d6855f29319172d102e4eeee90c2ae1cd1d040b8ff4114fe8 — https://www.casact.org/sites/default/files/database/astin_vol37no1_53.pdf; Lemaire & Zi, 'A Comparative Analysis of 30 Bonus-Malus Systems', ASTIN Bulletin 24(2), 1994 (CAS-hosted): Introduction pp.287-288 (merit rating; more a priori classification decreases the need for a BMS); Tool #3 efficiency = elasticity of the mean stationary premium w.r.t. claim frequency p.294; Tool #4 hunger for bonus — policyholders pay small claims themselves to avoid surcharges, pp.294-295, sha256:44976cd13085959f1c41c738cc06163b0999de01beb4411b2f6d5b33859ec181 — https://www.casact.org/sites/default/files/database/astin_vol24no2_287.pdf; Charpentier, David & Elie, 'Optimal Claiming Strategies in Bonus Malus Systems and Implied Markov Chains', Risks 5(4):58, 2017: §1 p.1 (hunger for bonus; small accidents not reported), §1.2 p.3 (not claiming when the loss is below the premium difference), §2.1 p.4 (stationary distribution depends only on claim frequency, not on severity), sha256:7aca0a4b2950faa930301254577a315125779ee70accd96e61d57d66214ac764 — https://pdfs.semanticscholar.org/e029/9f4413e126653c375b792038ea8b6c8b21c1.pdf
- note: Resolve run: F-001 closed (unsourced half deleted). Medium: the only rank-2 coverage is an older-edition course-hosted Ross chapter; the BMS-specific claims rest on rank-3 papers. No open findings.
