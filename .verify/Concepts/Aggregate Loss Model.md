---
target: Concepts/Aggregate Loss Model.md
created: 2026-10-04
---

## [F-001] Compound Poisson stated as if it required exponential severities
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullet 4 (compound Poisson / MGF), line 25
- claim: When $N \sim \text{Poi}(\lambda)$ and $X_i \sim \text{Exp}(\theta)$: $S$ has a compound Poisson distribution; the MGF is $M_S(t) = \exp(\lambda(M_X(t) - 1))$.
- evidence: Daniel (CAS study note, MAS-I reading), Definition 1.8 (PDF p.6-7): a compound Poisson process needs only a Poisson claim process and iid severities independent of it; Example 1.10 (PDF p.7) is a compound Poisson process with Binomial(8, 0.2) severities. Loss Data Analytics v1.1 §5.3.1 (ChapAggLossModels.html) derives M_S(t) = P_N[M_X(t)] and, for N ~ Poi(lambda), M_S(t) = e^{lambda(M_X(t)-1)} for a general severity X. The exponential clause adds a condition neither the definition nor the MGF needs, so a reader would not apply the compound Poisson MGF to a gamma, Pareto or discrete severity. Deleting the clause leaves the page saying exactly what both sources say.
- source_rank: 2
- proposed_action: Delete "and $X_i \sim \text{Exp}(\theta)$" so the bullet reads: when N ~ Poi(lambda), S is compound Poisson with M_S(t) = exp(lambda(M_X(t) - 1)).
- applied: true
- fingerprint: 1563341bf51e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-001
- status: resolved
- note: Clause deleted in this change (a deletion only, no new wording): the bullet now reads "When N ~ Poi(lambda): S has a compound Poisson distribution; the MGF is M_S(t) = exp(lambda(M_X(t) - 1))", which is Daniel Definition 1.8 (PDF p.6-7) and Loss Data Analytics §5.3.1 Poisson special case word for word in substance.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Definitions, E[S], Var[S], Poisson simplification and MGF against Daniel Def 1.8 / Fact 1.11 and LDA §5.1, §5.3.1; collective-risk-model name against LDA §5.1; normal approximation condition against Daniel PDF p.7. Examples recomputed in python before reading the page answers: E[S] = 50,000, Var(S) = 9,000,000 + 25,000,000 = 34,000,000; sigma = 5830.95, z = 0.8575, 1 - Phi(z) = 0.1956 (page 0.1955 with Phi(0.858) = 0.8045) - agree. Links ([[Normal Distribution]], [[Central Limit Theorem (CLT)]]) resolve exact; figure embed exists and its builder (figures_exam_mas_i.py, compound Poisson-gamma layers, gamma(n*shape) for n claims) is correct. Exam usage: MAS-I B6, MAS-II credibility for aggregate loss, Exam 8 aggregate loss distributions all use the same collective-risk sense - no CAS/SOA difference.
- sources_checked: Daniel, "Poisson processes (and mixture distributions)", CAS Study Note (June 2008), §1.2 Definition 1.8 and Examples 1.9-1.10 (PDF p.6-7), Fact 1.11 E[S] = E[N]E[X], Var[S] = E[N]Var[X] + Var[N]E[X]^2 = E[N]E[X^2] and the normal approximation when E[N] is large (PDF p.7-8), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf; Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.5 Aggregate Loss Models: §5.1 collective risk model, §5.3.1 E(S_N) = mu E(N), Var(S_N) = sigma^2 E(N) + mu^2 Var(N), M_S(t) = P_N[M_X(t)] and the Poisson case e^{lambda(M_X(t)-1)}, Var = lambda E(X^2), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 6 "Model insurance claims in aggregate" (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: F-001 (major, compound Poisson stated as requiring exponential severities) fixed in this change by deleting the clause. Medium: the MGF and the collective-risk-model name rest on a rank-3 open text; Tse §1.1 (the MAS-I reading) is not free and was not read.
