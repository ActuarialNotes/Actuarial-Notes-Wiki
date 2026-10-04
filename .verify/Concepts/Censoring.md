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
