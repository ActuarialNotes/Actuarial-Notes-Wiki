---
target: questions/exam-mas-ii/masii-an-024.md
created: 2026-10-18
---

## [F-001] Statement III's truth depends on a probability level the stem does not give
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:25Z/7ded
- date: 2026-10-18
- severity: minor
- status: open
- locus: stem, statement III
- claim: Statement III says halving k from 5% to 2.5% 'with the probability level unchanged' halves Z for a class with 400 claims, without stating the probability level; the explanation assumes p = 90% (z = 1.645).
- evidence: Loss Data Analytics Ch.9 §9.2.1/§9.2.4: n_0 = (y_p/k)^2 and Z = sqrt(n/n_0), with Z = 1 once n >= n_0. Halving k quadruples n_0, so Z halves only if the class is partially credible at k = 5%, i.e. 400 < (y_p/0.05)^2, i.e. y_p > 1 (p > about 68.3%). Recomputed: at p = 90%, n_0 = 1,082 -> 4,329 and Z = 0.608 -> 0.304 (halves, as keyed); at p = 50% (y_p = 0.674), n_0 = 182 -> 727 and Z = 1.000 -> 0.742 (does not halve). Every conventional level (90%, 95%, 99%) gives partial credibility, so the key C stands, but a careful candidate can argue III is not necessarily true and pick A.
- source_rank: 3
- proposed_action: State the probability level in statement III (e.g. 'at a 90% probability level'), matching the explanation's 1.645; this adds stem prose, so left to the author.
- applied: false
- fingerprint: 4728c98246c3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:25Z/7ded
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation of I-III before reading the key (I: 380 true; II: Z = n/(n+K) rises with VHM, false; III: n_0 x4, Z halves, true -> C); every number in the explanation recomputed (K 625->312.5, Z 0.390->0.561; n_0 1,082->4,329, Z 0.608->0.304; A's 0.430; D's 420); option rationales; wiki links resolve; validate_content; ontology topic/objective; outline task A2 and reading coverage
- sources_checked: Chapter 9 Experience Rating Using Credibility Theory | Loss Data Analytics, Ch.9 §9.1 (Z X̄ + (1−Z)M), §9.2.1 (λ_kp = (y_p/k)^2), §9.2.4 (Z = sqrt(n/n_0)), §9.3.1 (Z = n/(n+K), K = EPV/VHM; 'If the VHM increases then Z increases'), sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.12 Credibility, printed pp.217-221 (PDF 229-233): 1,082 claims at p=90%, k=5% (z=1.645); square-root rule; Z = N/(N+K), K = EVPV/VHM, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CAS Exam MAS-II Content Outline 2026, pp.2-4: Domain A tasks A1-A2, reading Tse Chs 6.1-6.3, 7.1-7.4, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Vault-authored question (no official key); key C agrees with independent recomputation and with the formulas as stated in Loss Data Analytics and Werner & Modlin. Tse is commercial, so confidence is held at medium per roadmap D7; the method is Tse 6.1-6.3 (limited fluctuation) and 7.1-7.4 (Bühlmann) per the 2026 outline. One minor finding left open: statement III omits the probability level.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Statement III now names the level: '(at a 90% probability level throughout)', the checker's proposed action; the explanation already worked III at p = 90% (z = 1.645).
