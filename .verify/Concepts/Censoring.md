---
target: Concepts/Censoring.md
created: 2026-10-04
---

## [F-001] Bias direction stated for all censoring; it is the right-censoring direction
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: 4th bullet (MLE / downward bias)
- claim: Censoring must be accounted for in Maximum Likelihood Estimation to avoid downward bias in estimated means or survival times.
- evidence: The bullet follows the left- and interval-censoring bullets and states one direction for all of them. The source for the direction is about right censoring: Dey et al., Nature Methods 19(8) 2022, Fig. 3 caption: 'Treating censored times as observed event times results in underestimates of survival'. Loss Data Analytics §4.3.1.2 defines a right-censored record as min(X, C_U) <= X (so treating it as exact pulls estimates down) but a left-censored record as max(X, C_L) >= X, so treating left-censored values as exact pulls estimates up. The bullet is right for the page's main case (right censoring) and too broad as written.
- source_rank: 3
- proposed_action: Say 'right-censoring' in this bullet (treating right-censored values as exact biases means and survival times down), or drop the direction.
- applied: false
- fingerprint: 593105ab198b

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Definition and the three censoring types against LDA §4.3.1.2 and its summary table; right-censored contribution S(c) and exact contribution f(x) against LDA §4.3.1.4 and §3.5.2.2; bias direction against Dey et al. Fig. 3 (right censoring) - F-001 nit on its scope. Example recomputed before reading the answer: L = theta^-2 e^(-9/theta), theta-hat = 4.5; LDA exponential special case (sum of x over uncensored count = 9/2) gives the same - agrees. [[Maximum Likelihood Estimation]] resolves; figure embed exists and its builder (six bars, two stopped at the policy limit u) matches right censoring. Only Exam MAS-I links the page.
- sources_checked: Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.4 Model Selection and Estimation §4.3.1.2 censored data (right-censoring most common, min(X, C_U) with policy limit example; left-censoring max(X, C_L)), §4.3.1.4 likelihood-contribution table (exact f(x), right-censored 1 - F(C_U), interval-censored F(C_U) - F(C_L)) and exponential special case, mortality-study Type A (alive at study end = right-censored), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.5.2.2 MLE for censored data, L = prod f(x_i) x S(u)^m, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Dey, Lipsitz, Cooper, Trinh, Krzywinski & Altman, "Survival analysis—time-to-event data and censoring", Nature Methods 19(8), 2022 (Points of Significance), Fig. 3 caption, sha256:ca9f23c68a24089908bddcad8f88975bbf7ef603a0835200bfd828849af4f28d (article page HTML) — https://www.nature.com/articles/s41592-022-01563-7; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 8 and 9 "accounting for censoring and truncation", "missing data values, including censoring and truncation" (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: One open nit (F-001: bias direction stated for all censoring). Medium: rank-3 sources; Tse §§10.2.3 and 12.3.2 (the MAS-I reading) are not in the publisher preview.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 4 now scopes the bias direction to right-censoring and says why: "Right-censoring must be accounted for in [[Maximum Likelihood Estimation]]: a right-censored record is min(X, c) <= X, so treating it as an exact value causes downward bias in estimated means or survival times" (was: "Censoring must be accounted for ... to avoid downward bias", following the left- and interval-censoring bullets). Loss Data Analytics v1.1 ch.4 §4.3.1.2: right-censoring records X_U* = min(X, C_U), left-censoring X_L* = max(X, C_L), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Dey et al., Nature Methods 19(8) 2022, Fig. 3 caption: "Treating censored times as observed event times results in underestimates of survival" (article HTML fetched 2026-10-05, sha256:44e0b7fe90a312e529a72b9bf7b37506acfa215cf52e88378ed80ed5448851fb). Edit committed by an interrupted earlier attempt of this run (commit 6d543ed6); reviewed this session, no further change.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: All sources re-fetched this session (LDA chapters hash-identical to run 8861; the Nature article page re-hashed). Every bullet and formula re-read against LDA §§3.5.2.2, 4.3.1.2, 4.3.1.4; the edited bullet against LDA min(X, C_U) and Dey Fig. 3. Example recomputed in Python: L = theta^-2 e^{-9/theta}, log-likelihood maximised on a 0.001 grid at theta = 4.5 (= 9/2, LDA exponential special case). Figure checked against its builder (six bars, two stopped at the policy limit u: right censoring). 1 link + 1 embed resolve (vault_links exact). verify_check clean.
- sources_checked: Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (open textbook), Ch.4 Model Selection and Estimation §4.3.1.2 (right-censoring most common, X_U* = min(X, C_U); left-censoring max(X, C_L); a reinsurer not observing small claims is censoring from the left; grouped / interval-censored data), §4.3.1.4 likelihood-contribution table (exact f(x), right-censored 1 - F(C_U), interval F(C_U) - F(C_L)) and exponential special case, HTML fetched 2026-10-05, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.5.2.2 MLE for censored data (L = Π f(x_i) × S(u)^m), HTML fetched 2026-10-05, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Dey, Lipsitz, Cooper, Trinh, Krzywinski & Altman, 'Survival analysis—time-to-event data and censoring', Nature Methods 19(8), 2022, Fig. 3 caption (treating censored times as observed event times underestimates survival), article HTML fetched 2026-10-05, sha256:44e0b7fe90a312e529a72b9bf7b37506acfa215cf52e88378ed80ed5448851fb — https://www.nature.com/articles/s41592-022-01563-7; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 8-9 (MLE 'accounting for censoring and truncation'; 'missing data values, including censoring and truncation'), PDF p.4; Tse §§10.1, 10.2, 12.3 listed for Domain B, PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Resolve run: F-001 closed. Medium: rank-3 sources; Tse §§10.2 and 12.3 (the MAS-I reading) are not in the free publisher preview. No open findings.
