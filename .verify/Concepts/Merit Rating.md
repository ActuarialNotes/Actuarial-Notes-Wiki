---
target: Concepts/Merit Rating.md
created: 2026-10-31
---

## [F-001] Lead's characterisation of merit rating not in Bailey & Simon
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- severity: minor
- status: open
- locus: lead sentence
- claim: Merit Rating is experience rating 'for a risk too small for its own losses to be weighed directly — a single private passenger car'.
- evidence: Bailey & Simon p.159 (PDF p.1) say only that the Canadian merit rating plan 'provides a means of evaluating the experience rating credibility of the experience of one car', and that ratings depend on full years since the most recent accident. Nothing says the risk is too small for its losses to be weighed; the plan does use the car's own record. Clause is unsourced.
- source_rank: 2
- proposed_action: Delete the clause; keep 'experience rating of a single private passenger car by placing it in a class…'.
- applied: true
- fingerprint: c1549c6b6ab3

## [F-002] Conditions for premium as base and territory check are not in Bailey & Simon
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'When premium corrects the maldistribution'
- claim: Premium fails to correct the maldistribution if high-frequency territories are not high-premium ones 'or if the territorial rate differentials do not reflect the territories' differences in claim frequency', so premium 'is not necessarily a better exposure base than car years'; and the premise 'can be checked territory by territory' by comparing relative frequency with relative average premium.
- evidence: Bailey & Simon p.159 (PDF p.1) give one sentence: premium 'avoids the maldistribution created by having higher claim frequency territories produce more X, Y, and B risks and also produce higher territorial premiums.' The reliance on high-frequency territories having higher premiums follows from that sentence; the improper-differentials condition, the 'not necessarily a better base' conclusion and the territory-by-territory check are not in the paper (the writer flagged them as inference; the explicit conditions are Hazam's, which is not a cached reading). Full-text search of the cached copy for 'differential' and 'average premium' finds nothing on this.
- source_rank: 2
- proposed_action: Restate to what Bailey & Simon support (premium's correction rests on the high-frequency territories also producing the higher premiums; where they do not it would not remove the distortion) and delete the rest until a page is written from Hazam.
- applied: true
- fingerprint: 4e712a6b438a

## [F-003] Idea callout gives one cause where Bailey & Simon give three
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- severity: minor
- status: open
- locus: [!idea] The idea, last sentence
- claim: The record adds less than proportionally with each extra year 'because drivers' accident chances themselves change over time'.
- evidence: Bailey & Simon p.160 (PDF p.2): relative credibilities well below 2.00 and 3.00 are 'partially caused by risks entering and leaving the class. But it can be fully accounted for only if an individual insured's chance for an accident changes from time to time … or if the risk distribution of individual insureds has a marked skewness reflecting varying degrees of accident proneness.'
- source_rank: 2
- proposed_action: Restate with all three explanations as the paper gives them.
- applied: true
- fingerprint: 52ac49239e22

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Clause deleted; lead now reads 'experience rating of a single private passenger car by placing it in a class according to the number of full years since its most recent accident', as Bailey & Simon p.159.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Bullet restated as 'What the premium base assumes': premium's correction rests on the higher claim frequency territories also producing the higher territorial premiums, and where they do not it would not remove the distortion (Bailey & Simon p.159). The improper-differentials condition, the 'not necessarily a better base' conclusion and the territory-by-territory check are deleted; items needing them (Hazam's conditions) stay open.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Restated with the paper's three explanations: risks entering and leaving the class, accident chances changing over time, or marked skewness in accident proneness (Bailey & Simon p.160).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: every claim read against Bailey & Simon pp.159-164 incl. Tables 1-3 and Appendices I-II; both worked examples recomputed from scratch (Z1=0.158, Z2=0.224, Z3=0.273, relative 1.42/1.73; R=13.007, Z=0.0375); numbers compared with cas8-2012-q6, 2014-q5, 2015-q1, 2016-q1, 2017-q3, 2018-q3, 2019-q3 (none reused); links resolve
- sources_checked: AN ACTUARIAL NOTE ON THE CREDIBILITY OF EXPERIENCE OF A SINGLE PRIVATE PASSENGER CAR, Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS 1959), pp.159-164 (PDF pp.1-6): Table 1-3, Appendix I-II, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf
- note: New page. R = 1/(1 - Pr(N=0)) kept as a plain generalisation of Appendix II's m/(1-e^-m). Premium-as-base bullet restated (F-002) to what the paper says; Hazam's conditions are not on the page. Bonus-malus comparison bullet checked for consistency against the verified Bonus-Malus System page (rank 4) only.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:57Z/ad84
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: delta check of the added Hazam bullet sentence by sentence against Hazam's discussion; older text not re-checked (verified against Bailey & Simon, C-001)
- sources_checked: W. J. Hazam, Discussion of Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car, PCAS XLVII (1960), pp.150-152, PDF pp.1-3, sha256:48b8d420ffd358904509532447e15d50df0d5b1756c2026f81e8d058a02f09e4 — https://www.casact.org/sites/default/files/database/proceed_proceed60_60150.pdf
- note: Hazam PCAS XLVII p.151: 'a premium base eliminates maldistribution only if (1) high frequency territories are also high premium territories and (2) if territorial differentials are proper. However, premium, although not perfect, is an improvement over exposure as a base for this type of study. The fact that either or both of these inherent assumptions may not always exist does not detract from the qualitative nature of the conclusions but may alter somewhat the basic relative frequencies of Table 1 and the consequent values in Tables 2 and 3.' The bullet states both conditions, the improper-differentials consequence (the contrapositive of 'only if'), the improvement-over-exposure judgment and the qualitative-conclusions caveat (Tables 2 and 3 are the credibilities and relative credibilities). No numbers added.
