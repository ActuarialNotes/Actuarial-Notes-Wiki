---
target: Concepts/Aggregate Excess of Loss.md
created: 2026-10-18
---

## [F-001] Unsourced claims on purpose and risk transfer of aggregate covers
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets 'The expected value is not enough' (second sentence), 'Why buy it' (first two sentences) and 'Risk transfer'
- claim: Plugging in the expected loss ratio usually gives zero, because stop losses attach above it. ... Per-risk and per-occurrence covers miss a year of many medium-sized losses ... Aggregate structures are the building blocks of Finite Reinsurance. An attachment far above the expected loss ratio or a thin limit invites Risk Transfer scrutiny.
- evidence: Clark pp.33-34 and 42 (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63) define the AAD, the excess charge factor and stop loss treaties and say the collective risk model is generally the best way to price them, but say nothing about where stop losses typically attach, why a cedant buys aggregate cover, or aggregate structures in finite reinsurance (pp.46-48 define finite risk by multi-year and loss-sensitive features, not aggregate structures). The worked examples' arithmetic is independent of these clauses.
- source_rank: 2
- proposed_action: Cut these clauses back to Clark or cite a source for them.
- applied: false
- fingerprint: 734e10cda544

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: phi(A) against Clark p.34 equation; stop loss definition p.42; collective-risk 'best way' and four cautions pp.42-43; AAD net loss cost = phi x gross loss cost p.34; (1+n)L p.43; both examples recomputed
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.33-34 (AAD, phi_AAD, Table M analogy), pp.36 and 41-43 (aggregate models, collective risk cautions), p.42 (stop loss), p.43 (aggregate limit with reinstatements), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Formulas and Clark attributions match. Stop loss example: E[LR] 73.75%, 4.25 points, $4.25M resolve; AAD example: E[S] 875, E[(S-750)+] 350, phi 0.40, 3.50% resolve. Unsourced purpose/finite-risk clauses left open (F-001). Exam 9 only.
