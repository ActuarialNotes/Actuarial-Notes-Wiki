---
target: Concepts/Unearned Premium.md
created: 2026-09-12
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Werner footnote 12 also reviewed for the short-rate rationale.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp.68-70 (PDF pp.80-82), incl. footnote 12 on short-rate tables, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: No findings. Confidence medium rather than high for one reason: the final bullet's statutory-accounting claims (the growth penalty of paying acquisition costs up front, and the requirement to establish a premium deficiency reserve when unearned premium will not cover future losses and expenses) are outside this corpus — Werner never uses the phrase, and the only occurrence in Friedland is a passing list of loss-related balance sheet items in Appendix A's CAS Statement of Principles on reserves (PDF p.433). The claim is standard statutory accounting and I have no evidence against it, but it is unverified here. Werner's footnote 12 also gives a second reason for short-rate tables the page omits (non-uniform exposure to loss over the term, e.g. boat owners policies); too small to file.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Full check list (C-001 above recorded only the last of two --checks arguments; this entry restores it). Definition diffed against Werner Ch.5 (printed p.70 = PDF p.82): 'Unearned premium is simply the portion of the premium that has not yet been earned at a given point in time... the amount of the total premium that the company has not yet earned and the insured is entitled to get back in the event of a cancellation (subject to short rate table adjustments)' — matches, and Werner's 'Written Premium = Earned Premium + Unearned Premium' plus his calendar-year form give the page's EP = WP - delta-UEP, which I re-derived. Short rate confirmed by Werner footnote 12 (printed p.68 = PDF p.80). Both examples recomputed from scratch before reading their answers: UEP 12/31/2023 = $12M, UEP 12/31/2024 = $15M, CY2024 EP = 30M - 3M = $27M, and 15% x $30M = $4.5M of commission against $27M earned; cancellation at 25% expired gives pro rata return 2,400 x 0.75 = $1,800 with $600 earned, short rate return 2,400 x 0.70 = $1,680 with $720 earned and a $120 difference — every figure reproduces.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp.68-70 (PDF pp.80-82), incl. footnote 12 on short-rate tables, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Supersedes nothing; appends the omitted checks list for the same pass.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Delta check: diffed from commit f46336499 (run 58a9) to HEAD; additions are three bullets (statutory recording; loss reserves and the UPR; premium deficiency), the 'When the Unearned Premium Falls Short' example and tip/warning callouts. Statutory recording against SSAP 53 ¶6 (UPR established upon recording written premium) and ¶8 (daily or monthly pro rata). Full premium held despite expensed acquisition costs, 'a more conservative solvency-focused presentation because it results in lower policyholders' surplus': Odomirok PDF pp.36-37. 'Nearly 60%' (loss and LAE reserves) and 'approximately 20%' (UPR) of industry liabilities at 12/31/2011: Odomirok PDF p.34. Loss recognized when the covered event occurs, claims-made when reported; reported + IBNR + LAE: SSAP 55 ¶4, ¶6.a-c. PDR test and its elements (anticipated losses, LAE, commissions and other acquisition costs, maintenance costs vs UPR plus future installments; previously expensed acquisition costs need not be considered; grouping as marketed, serviced and measured; no offset; disclose amount and use of investment income): SSAP 53 ¶17-18 — every element matches. Example recomputed before reading the answer: 8.7M + 1.1M + 1.0M = 10.8M against UPR 10.0M, PDR 0.8M; agrees. The 'moves into the loss reserves' narrative is the vault's own synthesis of ¶4 and ¶6 and contradicts neither.
- sources_checked: NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 53 ¶6-8, 17-18 (PDF pp.348-350); SSAP No. 55 ¶4, 6 (PDF p.362), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf; Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), pp.34, 36-37 (printed 33, 35-36), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.5 pp.68-70 incl. footnote 12 (PDF pp.80-82) — prior-pass source, re-fetched this run, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Additions confirmed; the earlier medium-confidence reservation (the statutory PDR claim was unverified in run 58a9) is now resolved by SSAP 53 ¶17. Confidence stays medium: the worked examples are vault-authored.
