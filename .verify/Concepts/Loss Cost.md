---
target: Concepts/Loss Cost.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: medium
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), Ch.6, PDF pp.174-176, 181, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.1.1, PDF pp.53-54, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Clark, Basics of Reinsurance Pricing (CAS Study Note, 2014), §1-2A, PDF pp.3-4, 13-16, 20, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf
- note: Bahnemann Ch.6: pure premium = frequency x severity = expected loss per exposure unit; layer share via limited expected values (PDF pp.174-176, 181). Goldburd §5.1.1 (Tweedie vs frequency/severity), §2.3 (standard errors). Clark (Exam 9 bullets): quota share and surplus share mechanics (PDF pp.3-4), experience rating ("burn cost") with losses trended before the layer is applied, developed, over adjusted subject premium (PDF pp.14-16), credibility against exposure rating based on expected claims (PDF p.20), sliding scale, profit commission and loss corridor evaluated with an aggregate distribution (PDF p.13). Examples recomputed: (50/75)^2 = 4/9, (50/125)^2 = 0.16, layers 222.22/113.78/64.00, LER 55.6%; QS 3,250,000; burning cost 6.0%, XL 1,200,000.
