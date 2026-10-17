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
