---
target: Concepts/Risk Experience.md
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
- sources_checked: Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 experience rating, PDF pp.301-305, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1-5, Ch.2 §3, PDF pp.8-9, 26, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Mahler, An Example of Credibility and Shifting Risk Parameters (PCAS LXXVII, 1990), §4.2, PDF pp.10-12, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf; Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), conclusion (3), PDF p.3, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf
- note: Werner Ch.15: experience period usually two to five policy years ending with the last complete year; per-occurrence caps; actual and expected components on the same basis (losses, ALAE, maturity, exposure) (PDF pp.301-303). Fisher Ch.1: the mod measures how the risk differs from others in its class and is not a charge-back (PDF pp.8-9); Ch.2 §3: incurred retro first evaluated 6 months after expiration (18 months of development) then annually (PDF p.26). Mahler §4.2: parameters shift over time. Bailey & Simon conclusion (3): a second year raises credibility by roughly two-fifths. Examples recomputed: 0.60 naive, 1.09 and 1.05 same-basis; Xbar 0.40, sum x^2 640, s^2 0.4805, a 0.0805, Z 0.1675, estimate 0.668 (Poisson semi-parametric v = Xbar). MAS-II bullet not checked against a MAS-II reading (finding).

## [F-001] MAS-II credibility-estimation bullet not checked against a MAS-II reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: In credibility estimation (MAS-II) bullet
- claim: v-hat from within-risk variation and a-hat from the excess spread (non-parametric), or v-hat = Xbar for Poisson counts (semi-parametric).
- evidence: Not in the Exam 8 readings; the page also links Exam MAS-II, whose credibility reading was not read this run. The worked example is internally consistent (recomputed), but recomputation cannot confirm (rank 5).
- source_rank: 5
- proposed_action: Check the bullet in a MAS-II pass against its credibility reading.
- applied: false
- fingerprint: 430432c2974b

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:19Z/4af0
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: delta only: the 'Testing whether risk parameters shift (Mahler)' bullets read against Mahler pp.235-236 (Table 4, 12 five-year segments, 11 df footnote) and p.239; the added Merit Rating link
- sources_checked: Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 experience rating, PDF pp.301-305, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1-5, Ch.2 §3, PDF pp.8-9, 26, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Mahler, An Example of Credibility and Shifting Risk Parameters (PCAS LXXVII, 1990), §4.2, PDF pp.10-12, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf; Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), conclusion (3), PDF p.3, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf; AN EXAMPLE OF CREDIBILITY AND SHIFTING RISK PARAMETERS, Mahler, An Example of Credibility and Shifting Risk Parameters (PCAS 1990), pp.235-236, 239 (PDF pp.11-12, 15), Table 4, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf
- note: Only the added bullets and link were checked; the rest was verified 2026-10-17 (medium) against the sources already listed and is unchanged.

## [F-002] Experience period stated as usually three years
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'In experience rating (Exam 8)' bullet, first sentence
- claim: the risk's own experience A is usually three completed policy years, excluding the most recent immature one.
- evidence: Werner & Modlin Ch.15, PDF p.302: 'The experience period usually ranges from two to five policy years, ending with the last complete year.' Fisher et al. (the Exam 8 reading) gives no usual length: 'three years' there (PDF p.30) is the typical term of a multi-year retro plan, not an experience period.
- source_rank: 2
- proposed_action: Restate to Werner & Modlin's wording.
- applied: true
- fingerprint: c33dc26a215a

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated: 'the risk's own experience A usually covers two to five policy years, ending with the last complete year.'

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page: Mahler §4-§8 re-read for both test bullets and the new credibility bullet (Z/N, grand mean 50%, retrospective tests, the three criteria, more than one or two years worse); the 'data up to that point' sentence against the 2018 Q1(b) report; Werner p.302 and Fisher pp.8-9, 26 for the experience-rating and retro bullets; Bailey & Simon two-fifths; examples recomputed (1.09 and 1.05; Xbar 0.40, s^2 0.4805, a 0.0805, Z 0.1675, estimate 0.668); new example weights (0.2 x 3 + 0.4); rule 10: N = 3 and generic periods, not 2018 Q1's N = 2 or its figures
- sources_checked: Mahler, An Example of Credibility and Shifting Risk Parameters, PCAS LXXVII (1990), printed pp.225-245 (PDF pp.1-21): §4 chi-squared test on 5-year segments, 11 degrees of freedom, correlation by lag falling until about ten years; §5 linear combinations of estimators, grand mean 50%; §6.4 retrospective tests; §6.5 the fourth method, Z/N to each of the N most recent years and 1 - Z to the grand mean; §7.1-7.3 the three criteria (least squared error, Bühlmann/Bayesian as least squares; small chance of large errors; Meyers/Dorweiler); §8.3 more than one or two years did worse, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15, PDF p.302 (experience period usually two to five policy years ending with the last complete year; per-occurrence caps with expected losses on the same basis), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), PDF pp.8-9 (mod indicates expected loss relative to the class; not a charge-back), p.26 (incurred retro first evaluated 6 months after expiration, 18 months of development, then annually), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), PDF p.3 (two-fifths), sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf; CAS Exam 8 Fall 2018 — sample answers and examiner's report, Q1(a)-(b), PDF pp.37-38 (chi-square on actual vs expected counts; MSE for trial Z from the frequencies that would have been estimated historically, using the cumulative frequency available up to that point; common mistake: the overall five-year frequency as the complement), sha256:7993ff15f4c6aae538bde337a57fbbf775aab27f3a232b8a828458ac52a330c4 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf
- note: Whole-page check after the writer's Exam 9 G8 passage; one restatement (F-002). This is also the re-check for Exam 8 and MAS-II, which this page is verified for (rule 6). F-001 (the MAS-II credibility-estimation bullet not checked against a MAS-II reading) stays open, minor. Source hashes: every CAS and USGS PDF re-fetched from its URL this run and hashed; each matches the hash the writer cited.
