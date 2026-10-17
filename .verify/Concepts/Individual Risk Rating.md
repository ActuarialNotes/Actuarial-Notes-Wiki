---
target: Concepts/Individual Risk Rating.md
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
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1-10, Ch.2 §1, §5, PDF pp.8-18, 21-29, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15, PDF pp.301-303, 312, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), conclusion (2), PDF p.3, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf
- note: Fisher Ch.1 §1-10: standard premium = mod x manual; M = ZA/E + (1-Z) = (A+K)/(E+K), Z = E/(E+K), K = EPV/VHM; Z in [0,1], dZ/dE >= 0, d(Z/E)/dE < 0; VHM within class; equity, safety incentive, more risks acceptable; not a charge-back; MSL, min/max, split plans (NCCI), schedule/experience overlap; quintiles and efficiency tests. Fisher Ch.2 §1, §5: retro, large deductibles, SIRs. Werner Ch.15: experience and schedule rating, loss-rated composite rating, off-balance correction. Bailey & Simon conclusion (2). Examples recomputed: 0.950 and 0.727 (Z 0.167, 0.909); average mod 0.94, off-balance 1.064.
