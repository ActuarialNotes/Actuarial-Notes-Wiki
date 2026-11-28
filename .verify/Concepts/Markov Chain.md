---
target: Concepts/Markov Chain.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: definition/Markov property, row sums, n-step = P^n, stationary-distribution equations and long-run interpretation checked against Ross Ch.4 (older edition), Grinstead & Snell Ch.11 and Siegrist; actuarial-use list checked against Ross Ex.4.7 (BMS), Daniel study note (disability/driver ratings) and CreditMetrics (rating migration); both worked examples recomputed independently in Python before reading the page's figures: (P^2)_SP = 0.30, pi = (0.6, 0.4) - match; all [[links]] resolve (scripts/vault_links.Vault, exact); LaTeX delimiters/environments balanced
- sources_checked: Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 MAS-I outline lists - file dated 2012-09-06, Ch. 4 = pp.185-280): eq. (4.1) Markov property and row sums p.185; Ex. 4.7 Bonus Malus p.188; Sec. 4.2 Chapman-Kolmogorov eq. (4.2) and P(n)=P^n pp.189-190; Sec. 4.4 Theorem 4.1 and Remarks (ii)-(iii) pp.205-206, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ch. 11: Sec. 11.1 transition matrix and Thm 11.1 (n-step = P^n) PDF pp.414-415; Thms 11.7-11.12 fixed vector / long-run proportion PDF pp.441-447, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Random (randomservices.org), 'Discrete-Time Markov Chains' (Markov property, Chapman-Kolmogorov P_m P_n = P_{m+n}, P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html; Siegrist, Random, 'Stationary and Limiting Distributions' (irreducible positive recurrent chain: unique invariant f(x)=1/mu(x), long-run proportion; ergodic limit), sha256:d4719c5e1cb9ad3be4fbf84c8dd849390f7d1ad15ced112f6312be83e5545680 - https://www.randomservices.org/random/markov/Limiting.html; Daniel, 'Multi-state transition models with actuarial applications' (2004; reprinted by CAS and SOA), Sec. 1.1 Examples 1.4 disability and 1.5 driver ratings, PDF p.3, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 - https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf; CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics 2007 reprint), Sec. 1.6.1 one-year rating transition matrix PDF p.36 and Sec. 6.4.1 'transition matrix model is an example of a Markov Process' PDF p.88, sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 - https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f
- note: No findings. Notation note, not a defect: Grinstead & Snell call an irreducible chain 'ergodic'; Ross (the MAS-I reading) reserves 'ergodic' for positive recurrent + aperiodic - the page's 'irreducible aperiodic' is a sufficient condition for the long-run-fraction reading (Ross Remark (iii) needs only irreducible + positive recurrent). Confidence medium: the only rank-2 copy reachable is a course-hosted Ross chapter from an edition older than the outline lists; everything else is rank 3.

## [F-001] Does not link the related pages on Ross 4.3 and 4.5.1-4.8
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: nit
- status: open
- locus: bullet list after the n-step formula (related concepts)
- claim: The page links Stochastic Processes only; it does not link the related concept pages Recurrent and Transient States, Gambler's Ruin Problem, Mean Time Spent in Transient States, Branching Process or Time-Reversible Markov Chain, so a reader cannot reach them from the Markov-chain page.
- evidence: Ross's Markov-chain chapter continues with these topics: Ross, Introduction to Probability Models, 12th ed. (Academic Press 2019), printed Contents, library scan (TU Ilmenau via GBV), PDF p.3 (Ch 4: 4.3 Classification of States, 4.5.1 The Gambler's Ruin Problem, 4.6 Mean Time Spent in Transient States, 4.7 Branching Processes, 4.8 Time Reversible Markov Chains), sha256:0c754803d244fd8e3d9343742c99e98ded9a331894a833711e17b018622023dc - https://www.gbv.de/dms/ilmenau/toc/1665053453.PDF; and the chapter text, Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 MAS-I outline lists - file dated 2012-09-06, Ch. 4 = pp.185-280): eq. (4.1) Markov property and row sums PDF p.1 (p.185); Ex. 4.7 Bonus Malus PDF p.4; Sec. 4.2 Chapman-Kolmogorov and P(n)=P^n PDF pp.5-6; Sec. 4.3 Classification of States PDF p.9; Sec. 4.4 Theorem 4.1 and Remarks PDF p.21; 4.5.1 The Gambler's Ruin Problem PDF p.33; 4.6 Mean Time Spent in Transient States PDF p.46; 4.7 Branching Processes PDF p.49; 4.8 Time Reversible Markov Chains PDF p.52, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf. All five Concepts/ pages exist.
- source_rank: 2
- proposed_action: Add one short sourced bullet naming Ross's later Ch 4 topics, each linked to its page.
- applied: true
- fingerprint: 9a7289041edc

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Added one bullet after the stationary-distribution bullet: "Ross's Markov-chain chapter goes on to the classification of states as recurrent or transient, the Gambler's Ruin Problem, the mean time spent in transient states, branching processes and time-reversible Markov chains", each linked to its concept page. Sourced to Ross 12th ed. Contents GBV PDF p.3 (4.3, 4.5.1, 4.6, 4.7, 4.8; sha256:0c754803...) and the NTNU Ross Ch 4 text headings (PDF pp.9, 33, 46, 49, 52; sha256:9f01ac6c...). All 6 links on the page resolve exactly (vault_links.Vault).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Every claim re-read this session against the cached sources (hashes re-computed, all match): Markov property and row sums (Ross eq. 4.1), P(n)=P^n (Ross 4.2; G&S Thm 11.1; Siegrist P_n=P^n), stationary distribution and long-run reading (Ross Thm 4.1 and Remarks; G&S Thms 11.7-11.8; Siegrist invariant/limiting, 1/mu(y)), actuarial uses (Ross Ex. 4.7 Bonus Malus; Daniel multi-state Examples 1.4 disability and 1.5 driver ratings; CreditMetrics 6.4.1 'A transition matrix model is an example of a Markov Process'), new bullet (Ross 12th contents p.3 and NTNU Ch 4 section headings). Worked examples recomputed in python: (P^2)_SP = 0.8(0.2)+0.2(0.7) = 0.30; pi = (0.6, 0.4). All [[links]] resolve exactly; LaTeX balanced.
- sources_checked: Ross, Introduction to Probability Models, Ch. 4 'Markov Chains' (course-hosted copy on NTNU TMA4265 page; an edition earlier than the 11th-13th the 2026 MAS-I outline lists - file dated 2012-09-06, Ch. 4 = pp.185-280): eq. (4.1) Markov property and row sums PDF p.1 (p.185); Ex. 4.7 Bonus Malus PDF p.4; Sec. 4.2 Chapman-Kolmogorov and P(n)=P^n PDF pp.5-6; Sec. 4.3 Classification of States PDF p.9; Sec. 4.4 Theorem 4.1 and Remarks PDF p.21; 4.5.1 The Gambler's Ruin Problem PDF p.33; 4.6 Mean Time Spent in Transient States PDF p.46; 4.7 Branching Processes PDF p.49; 4.8 Time Reversible Markov Chains PDF p.52, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Ross, Introduction to Probability Models, 12th ed. (Academic Press 2019), printed Contents, library scan (TU Ilmenau via GBV), PDF p.3 (Ch 4: 4.3 Classification of States, 4.5.1 The Gambler's Ruin Problem, 4.6 Mean Time Spent in Transient States, 4.7 Branching Processes, 4.8 Time Reversible Markov Chains), sha256:0c754803d244fd8e3d9343742c99e98ded9a331894a833711e17b018622023dc - https://www.gbv.de/dms/ilmenau/toc/1665053453.PDF; Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ch. 11: Sec. 11.1 transition matrix and Thm 11.1 (n-step = P^n) PDF p.415; Thms 11.7-11.8 limiting matrix / fixed vector PDF pp.442-443, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e - https://math.dartmouth.edu/~prob/prob/prob.pdf; Siegrist, Random (randomservices.org), 'Discrete-Time Markov Chains' (Markov property, Chapman-Kolmogorov, P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 - https://www.randomservices.org/random/markov/Discrete.html; Siegrist, Random, 'Stationary and Limiting Distributions' (invariant distributions, positive recurrence, limiting distributions, 1/mu(y)), sha256:d4719c5e1cb9ad3be4fbf84c8dd849390f7d1ad15ced112f6312be83e5545680 - https://www.randomservices.org/random/markov/Limiting.html; Daniel, 'Multi-state transition models with actuarial applications' (2004; reprinted by CAS and SOA), Sec. 1.1 Examples 1.4 disability and 1.5 driver ratings, PDF p.3, sha256:0ca2c70a5c022a0032026ae139bd59e9fee3142d0455ed071e2d8698573200f8 - https://www.casact.org/sites/default/files/database/studynotes_daniel.pdf; CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics 2007 reprint), Sec. 1.6.1 one-year rating transition matrix PDF p.36 and Sec. 6.4.1 'A transition matrix model is an example of a Markov Process' PDF p.88, sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 - https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f
- note: Verified medium, as before: the definitions rest on a course-hosted Ross chapter from an edition earlier than the outline lists, plus rank-3 references. No open findings.

## [F-002] History-augmentation remark has no source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- severity: minor
- status: open
- locus: The last sentence of the Markov property paragraph
- claim: A process whose next-step probabilities depend on more history becomes a Markov chain once each state records that history.
- evidence: The standard idea (augmenting the state to hold the recent history) is a true textbook remark, but none of the excerpts read this session states it: Ross Chapter 4 (PDF p.1) defines the Markov chain by the present state, Siegrist's Discrete-Time Markov Chains page gives the Markov property (past and future conditionally independent given the present) without this augmentation remark, and the Grinstead & Snell and Ross excerpts do not either. The sentence is unsupported by a source in the packet.
- source_rank: 5
- applied: false
- fingerprint: 2fd5f8b9d479

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-11-28T14:55Z/e368
- date: 2026-11-28
- status_set: in_review
- checks_run: Blind (python, before the page): C8 matrix [[0.7,0.3],[0.4,0.6]] (page agrees); C13 P^2_21 = P21 P11 + P22 P21 = 0.4(0.7)+0.6(0.4) = 0.52 (page 0.52); C18 pi_1 = 0.4/(0.3+0.4) = 4/7 = 0.571 (page agrees). Claims: C1 definition (finite or countable states, next state depends only on present, independent of past): Ross eq. (4.1) PDF p.1 - confirmed; Siegrist Discrete-Time Markov Chains (Markov property) - confirmed. C2 formula: Ross eq. (4.1) conditions on X_n = i, X_{n-1} = i_{n-1}, ..., X_0 = i_0; the page's formula has X_n twice (X_n = i and X_n = i_{n-1}), so the second condition should carry index n-1 - finding. C3 (states at times 0..n-1) and C4 (P_ij fixed, not depending on n) - Ross PDF p.1 ('there is a fixed probability') - confirmed. C5 P_ij >= 0 and rows sum to 1 - Ross PDF p.1 - confirmed. C6 TPM rows = next-state distributions - Ross PDF p.1 - confirmed. C7 Markov property consequences (same present state gives same future probabilities; restart from current state): Siegrist 'past and future are conditionally independent, given the present' - confirmed; the sentence on augmenting each state with its history to make a process Markov is not in any source read this session - unsourced, filed minor. C9-C10 P^n_ij = (P^n)_ij: Ross eq. (4.2) and P(n) = P^n, PDF pp.5-6 - confirmed. C11 - confirmed. C12 Chapman-Kolmogorov and summing over intermediate paths: Ross eq. (4.2), PDF p.5 - confirmed; row i of P^n as the distribution n steps on - confirmed from the definition of P^n_ij. C13 path sums recomputed - confirmed. C14-C15 stationary equations for irreducible, aperiodic, finite chain: Ross Theorem 4.1 (irreducible ergodic: lim P^n_ij = pi_j, pi_j unique solution of pi_j = sum_i pi_i P_ij with sum pi_j = 1), PDF p.21 - confirmed (finite irreducible aperiodic is ergodic). C16 - confirmed. C17 long-run proportion of time (Ross Remark (ii)) and limit for every starting state (Theorem 4.1) - confirmed. C18 balance equation pi_1 = 0.7 pi_1 + 0.4 pi_2 and solution 4/7 recomputed - confirmed against the method in Ross Theorem 4.1. C19 trap: path arithmetic 0.28 and 0.52 - confirmed. The log's F-001 (related links) was resolved and does not appear on the current page; no open findings to confirm.
- sources_checked: https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.1 eq. (4.1) and row sums, PDF p.1 (p.185), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.2 eq. (4.2) and P(n)=P^n, PDF pp.5-6, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.4 Theorem 4.1 and Remarks (i)-(ii), PDF p.21, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf; Discrete-Time Markov Chains, Markov property, past and future conditionally independent given the present, sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 — https://www.randomservices.org/random/markov/Discrete.html
