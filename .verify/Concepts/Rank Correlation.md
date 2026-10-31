---
target: Concepts/Rank Correlation.md
created: 2026-10-31
---

## [F-001] Idea callout carried the question's setup
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T14:06Z/a5e7
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'The idea' callout, second sentence
- claim: So one pair that is the largest in *both* series — a catastrophe year in two states — adds a huge product of deviations to Pearson's numerator
- evidence: Rule 10 (content plan §1.2): CAS Exam 7 Spring 2015 Q23 gives one line's ultimate losses in two states, with the last accident year the largest in both (booklet p.27; report pp.87-88, 'the large values in 2014'). 'A catastrophe year in two states' restates that setup. CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q21 PDF pp.82-83 (copula benefits incl. joining any distributions without disclosing them, tail correlation; HRT or Gumbel over normal; Frank not fatter-tailed than normal), Q23 PDF pp.87-88 (Spearman by ranks, 1 - S/[n(n^2-1)/6]; Pearson cardinal and outlier-sensitive, Spearman ordinal, the outlier year), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf
- source_rank: 1
- proposed_action: Delete the aside '— a catastrophe year in two states —'; the general statement stands.
- applied: true
- fingerprint: 686c19977f89

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T14:06Z/a5e7
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted this run; the sentence now reads 'So one pair that is the largest in *both* series adds a huge product of deviations to Pearson's numerator, but only a rank difference of zero to Spearman's.'

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T14:06Z/a5e7
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole new page: Spearman formula and ranking procedure (Mack App. G (G4)); Kendall definition, Spearman as Pearson of the percentiles, range, independence, invariance, = 1 iff increasing function, zero without independence, not moment-based (Embrechts Def. 6, Thm 3, pp.16-17); sample tau as average sign over pairs (Venter 2002 p.94); rank measures depend only on the copula (Venter p.69); cardinal/ordinal and outlier pair (2015 Q23c report); example recomputed before reading the page's answer: means 8.5, 12.5; products 2.25, 6.75, 5.25, -1.75, 6.25, 143.75, sum 162.5; Sxx 173.5, Syy 197.5, r = 0.878; ranks 1,4,2,5,3,6 and 5,1,4,2,3,6, sum d^2 = 38, rho_S = -0.086; 6 concordant, 9 discordant, tau = -0.20; rule 10: example shares no figures with 2015 Q23 (5 years, states A/B), and the idea callout's setup aside deleted (F-001); links resolve
- sources_checked: Embrechts, McNeil & Straumann, Correlation and Dependency in Risk Management: Properties and Pitfalls (ETH preprint), §4.3 Definition 6 and Theorem 3 pp.16-17 (Spearman = linear correlation of F1(X), F2(Y); Kendall's tau = P[concordant] - P[discordant]; monotonic vs linear dependence; range -1 to 1, 0 under independence, invariant under strictly monotonic transforms, = 1 iff Y an increasing function of X; zero rank correlation despite dependence; not moment-based, no variance-covariance manipulation), Fallacy 3 pp.25-26 (worst-case VaR of X+Y not in general at comonotonicity), sha256:2705fc20f5bad0de8bf45ab6325cee27fe86f119b9919438a455c3393e6653cd — https://people.math.ethz.ch/~embrecht/ftp/pitfalls.pdf; Mack, Measuring the Variability of Chain Ladder Reserve Estimates (CAS Forum Spring 1994), Appendix G pp.156-157 (Spearman's test, distribution-free; rank by size, smallest rank one; T_k = 1 - 6 sum (r-s)^2 / ((I-k)^3 - (I-k)); -1 <= T_k <= 1), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf; Venter, Tails of Copulas, PCAS LXXXIX (2002), pp.68-75 (copula definition and separation of marginals; any joint distribution; C(u,v) = Pr(U<=u,V<=v); simulation by inverting marginals; Kendall tau = 4E[C]-1, constant of the copula, Pearson not; Frank, Gumbel (tau 1-1/a, asymmetric, more right-tail weight than Frank), HRT (formula, tau 1/(2a+1)), normal (tau 2arcsin(a)/pi, easy simulation, multi-dimensional, lighter right tail than Gumbel/HRT, heavier than Frank)), p.77 and p.69 (Kreps's partial perfect copulas), pp.83-86 (L(z), R(z) and their conditional forms, R(1) and L(0) as tail dependence; LR function L below 1/2, R above; Gumbel, HRT, PP have R > 0; HRT heavier than Gumbel; normal and Frank no tail dependence in the limit, normal more concentration away from it; R values 2-2^(1/a), 2^(-a); target (tau, R); R hard to estimate, fit R(z) not just R), p.90 (HRT is the flipped Clayton), p.94 (sample Kendall tau as average sign over pairs), pp.100-101 (only normal and partial perfect copulas fully generalise to multivariate with all pairwise correlations), sha256:fd0251da893a2eddee0e67a44fe11fca86636686a81b3c14bac1815a4956dc06 — https://www.casact.org/sites/default/files/database/proceed_proceed02_02068.pdf; CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q21 PDF pp.82-83 (copula benefits incl. joining any distributions without disclosing them, tail correlation; HRT or Gumbel over normal; Frank not fatter-tailed than normal), Q23 PDF pp.87-88 (Spearman by ranks, 1 - S/[n(n^2-1)/6]; Pearson cardinal and outlier-sensitive, Spearman ordinal, the outlier year), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf
- note: New page, verified at medium (Embrechts et al. and Mack are open texts; Brehm not read, D22). Not verified for any other exam.
