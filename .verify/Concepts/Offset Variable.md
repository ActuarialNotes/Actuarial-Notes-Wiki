---
target: Concepts/Offset Variable.md
created: 2026-10-04
---

## [F-001] Offset formula and 'carry forward relativities' bullet omit that an offset must be on the linear-predictor scale
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: formula block (line 16) and bullet 4 (line 21)
- claim: g(mu_i) = ln(Exposure_i) + beta_0 + beta_1 x_i1 + ... ; Offsets are also used to carry forward previously-determined relativities (e.g., an established territory relativity) into a new model without re-estimating them.
- evidence: Monograph 5 sec.2.6 (printed p.17, PDF p.27): 'When including an offset in a model, it is crucial that it be on the same "scale" as the linear predictor. In the case of a log link model, this requires the offset variable to be logged prior to inclusion in the model' — deductible factors 0.95 and 0.90 enter as ln(0.95) = -0.0513 and ln(0.90) = -0.1054, and a base loss cost of 265 with factor 0.90 as ln 265 + ln 0.90 = 5.4744 (p.18, PDF p.28). Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; a PCPA syllabus reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. The page writes ln(Exposure) against a generic link g and never states the condition, so a reader carrying forward a territory relativity of, say, 1.20 has no instruction to enter ln 1.20 = 0.182 rather than 1.20. The page's own example (log link, ln 2 for 2 car-years) is correct.
- source_rank: 3
- proposed_action: Write the formula for the log link (ln mu_i = ln(Exposure_i) + ...) and transcribe the Monograph's condition: offset values must be on the linear-predictor scale (logged for a log link), including carried-forward relativities.
- applied: false
- fingerprint: 35e94cd387e4
