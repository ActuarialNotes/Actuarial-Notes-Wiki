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

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: definition vs Monograph sec.2.6; exposure offset converting counts to a rate vs Monograph sec.2.6 and Rodriguez sec.4.3; contrast with control variables vs Monograph secs.2.6/5.1.3; F-001 re-confirmed (Monograph: offset must be on the linear-predictor scale, logged for a log link); example recomputed (ln mu = -1.407, mu = 0.245, frequency 0.122); figure read; links resolve
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.6 Offsets (formal definition: 'a predictor whose coefficient is constrained to be 1'; linear-predictor scale; deductible and base-loss-cost examples; exposure offsets vs weights) printed pp.17-19, PDF pp.27-29; sec.5.1.3 control variable (PDF p.56); Rodriguez, GLM lecture notes (Princeton), ch.4 sec.4.3 offset log(n) for group totals (PDF p.10), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), task C6 'Understand and apply control and offset variables in GLMs', PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: F-001 (major) confirmed and left open. Exam pages linking it: MAS-I, PCPA.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Formula block now gives the general form g(mu_i) = beta_0 + ... + offset_i (Monograph eq. in sec.2.6) and, separately, the log-link exposure form ln mu_i = ln(Exposure_i) + ...; new bullet: the offset must be on the same scale as the linear predictor, logged for a log link, several offsets added after each is transformed; carry-forward bullet now says relativities enter on the linear-predictor scale with the Monograph's own numbers (ln 0.90 = -0.1054; ln 265 + ln 0.90 = 5.4744, recomputed). Source: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.6 Offsets (printed pp.17-19, PDF pp.27-29), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf ('it is crucial that it be on the same "scale" as the linear predictor. In the case of a log link model, this requires the offset variable to be logged').

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: every edit re-read against Monograph sec.2.6 (general offset form, linear-predictor scale, adding offsets, deductible and base-loss-cost examples recomputed: ln 0.90 = -0.1054, ln 265 = 5.5797, sum 5.4744); exposure offset converting counts to a rate vs Monograph 2.6 and Rodriguez 4.3; example recomputed (ln mu = -1.407, mu = 0.245, frequency 0.122); links resolve
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.6 Offsets (printed pp.17-19, PDF pp.27-29), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Rodriguez, GLM lecture notes (Princeton), ch.4 sec.4.3 offset log(n) for group totals (PDF p.10), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 6 'Understand and apply control and offset variables in GLMs' (PDF p.5), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Resolve run: F-001 (major) resolved. Medium: the page rests on the rank-3 Monograph.
