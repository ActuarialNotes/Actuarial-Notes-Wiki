---
target: Concepts/Incomplete Data.md
created: 2026-10-04
---

## [F-001] Upward bias from ignoring left truncation stated as universal; it is not for a parametric fit
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Left truncation bullet
- claim: Ignoring this biases estimates up — only the larger losses are seen.
- evidence: Same claim as Concepts/Truncation.md. True of the sample mean of reported losses (it estimates E[X | X > d] >= E[X]) and of the exponential, but not of every parametric fit. Luo, Shevchenko & Donnelly (arXiv:0904.2910) PDF p.3 and p.12: fitting an untruncated lognormal to truncated data always overestimates mu and underestimates sigma, and the direction of the bias in severity quantiles 'is not obvious'. Recomputation (rank 5): X ~ LN(0, 2^2), true mean 7.389; with truncation at the 10th percentile the naive lognormal MLE has fitted mean 6.136, below the true mean. The right-censoring bullet's 'biases severity estimates down' is supported (Dey et al., Nature Methods 2022, Fig. 3; the page's own Example 1, 2,800 vs 4,666.67).
- source_rank: 3
- proposed_action: Restrict the left-truncation bullet's direction to the sample mean or the exponential case, or say only that the estimates are biased.
- applied: false
- fingerprint: b8fcb6fd772a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: General likelihood with delta_i and S(d_i) against LDA §4.3.1.4; right censoring at u contributes S(u) and grouped data F(b) - F(a) against LDA §3.5.2; exponential shortcut against LDA §4.3.1.4 special case; Kaplan-Meier carry-over against LDA §4.3.2.2. Bias bullets: right-censoring direction supported (Dey et al. Fig. 3); left-truncation direction F-001 minor. Both examples recomputed in python before reading the answers: sum(x - d) = 14,000 over 3 exact = 4,666.67 (numerical maximisation agrees), 14,000/5 = 2,800 = 60% of 4,666.67 (40% understated); grouped: L = p^60 (1-p)^90 (1+p)^30, 3p^2 + p - 1 = 0, p = 0.434259, theta-hat = 1,198.88 (grid MLE 1,198.9) - all agree. 6 links resolve exact; no embeds. Only Exam MAS-I links the page.
- sources_checked: Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.4 §4.3.1 (grouped data = interval censored, Example 4.3.1 exponential grouped MLE with p = e^(-1000/theta); right-censored and left-truncated likelihood prod_E f/(1-F(C_L)) prod_R (1-F(C_U))/(1-F(C_L)); exponential special case theta-hat = sum of (min(x, C_U) - C_L) over the number of uncensored observations) and §4.3.2.2 Kaplan-Meier with right-censored, left-truncated risk sets, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.5.2.1-3.5.2.3 grouped likelihood prod [F(c_j) - F(c_{j-1})]^{n_j}, policy limit as right censoring S(u), deductible as left truncation f(x)/S(d), Example 3.5.7 combined deductible-and-limit likelihood, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Dey, Lipsitz, Cooper, Trinh, Krzywinski & Altman, "Survival analysis—time-to-event data and censoring", Nature Methods 19(8), 2022, Fig. 3 caption, sha256:ca9f23c68a24089908bddcad8f88975bbf7ef603a0835200bfd828849af4f28d (article page HTML) — https://www.nature.com/articles/s41592-022-01563-7; Luo, Shevchenko & Donnelly, J. Operational Risk 2(4), 2007 (arXiv:0904.2910 preprint), PDF p.3 and p.12, sha256:a91ad1b0e1bc8a2ec69e9c7f614faf8db2e6f4ca02e879a2ef3a598ecd39cf9b — https://arxiv.org/pdf/0904.2910; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 9 "Adjust calculations for the effect of missing data values, including censoring and truncation" (PDF p.4); Tse §§10.1, 10.2, 11.1, 12.1, 12.3 assigned, §11.2 (Kaplan-Meier) not (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: One open minor (F-001: upward bias from ignoring left truncation stated as universal). Not a finding: the Kaplan-Meier mention is correct, but Tse §11.2 is not on the 2026 MAS-I list (§11.1 only), and the page does not say it is examinable. Medium: rank-3 sources; Tse §§10.2.3-10.2.4 and 12.3.2 are not in the publisher preview.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: The left-truncation bullet now restricts the upward direction to the average of the reported losses and says a fitted distribution can err either way: "Ignoring this biases the average of the reported losses up, since it estimates E[X | X > d] rather than E[X] (only the larger losses are seen). A distribution fitted without the adjustment can err in either direction ([[Truncation]])." (was: "Ignoring this biases estimates up"). Sources: Loss Data Analytics v1.1 ch.3 §3.5.2.3 (reported losses above a deductible are draws of X | X > d, contribution f(x)/S(d)), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732; Luo, Shevchenko & Donnelly (arXiv:0904.2910) §5.1 PDF pp.12-14 (a lognormal fitted naively to truncated data always overestimates μ yet underestimates the high quantiles for truncation below 66%/92%), sha256:a91ad1b0e1bc8a2ec69e9c7f614faf8db2e6f4ca02e879a2ef3a598ecd39cf9b; rank-5 Python check, LN(0, 2^2): naive fitted mean 6.14 / 7.24 / 10.20 at 10/30/50 percent truncation against the true 7.39. The cross-link to [[Truncation]] resolves, and that page (re-verified this run) carries the lognormal detail. Edit committed by an interrupted earlier attempt of this run (commit 6d543ed6); reviewed this session, no further change.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: All sources re-fetched this session (LDA, Luo and the outline hash-identical to run 8861; the Nature article page re-hashed). Every bullet and the general likelihood re-read against LDA §§3.5.2, 4.3.1, 4.3.2.2; the edited left-truncation bullet against LDA §3.5.2.3 and Luo §5.1. Examples recomputed in Python: sum of (x - d) = 500 + 1,500 + 3,000 + 4,500 + 4,500 = 14,000, theta-hat = 14,000/3 = 4,666.67 (grid maximum 4,667), naive 14,000/5 = 2,800 = 40 percent below; grouped L = p^60 (1-p)^90 (1+p)^30, 3p^2 + p - 1 = 0, p = 0.43426, theta-hat = 1,198.88 (grid maximum of the interval likelihood 1,198.9). 6 links resolve (vault_links exact); no embeds. verify_check clean.
- sources_checked: Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (open textbook), Ch.4 §4.3.1 (grouped data = interval censored, Example 4.3.1 exponential grouped MLE with p = e^(-1000/θ); likelihood with exact, right-, left- and interval-censored terms; right-censored and left-truncated likelihood Π_E f/(1 - F(C_L)) Π_R (1 - F(C_U))/(1 - F(C_L)); exponential special case θ̂ = Σ (min(x, C_U) - C_L) / n_u) and §4.3.2.2 product-limit (Kaplan-Meier) estimator 'in the presence of incomplete data', HTML fetched 2026-10-05, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.4 (limited loss X ∧ u is right censored) and §3.5.2.1-3.5.2.3 (grouped likelihood Π [F(c_j) - F(c_{j-1})]^{n_j}; policy limit as right censoring S(u); deductible as left truncation f(x)/S(d)), HTML fetched 2026-10-05, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Dey, Lipsitz, Cooper, Trinh, Krzywinski & Altman, 'Survival analysis—time-to-event data and censoring', Nature Methods 19(8), 2022, Fig. 3 caption (treating censored times as observed event times underestimates survival), article HTML fetched 2026-10-05, sha256:44e0b7fe90a312e529a72b9bf7b37506acfa215cf52e88378ed80ed5448851fb — https://www.nature.com/articles/s41592-022-01563-7; Luo, Shevchenko & Donnelly, J. Operational Risk 2(4), 2007 (arXiv:0904.2910 preprint), §5.1 PDF pp.12-14 (naive lognormal fit to truncated data: μ always overestimated, σ underestimated, high quantiles underestimated for truncation below 66% / 92%), sha256:a91ad1b0e1bc8a2ec69e9c7f614faf8db2e6f4ca02e879a2ef3a598ecd39cf9b — https://arxiv.org/pdf/0904.2910; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 9 'Adjust calculations for the effect of missing data values, including censoring and truncation' (PDF p.4); Tse §§10.1, 10.2, 11.1, 12.1, 12.3 assigned (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Resolve run: F-001 closed. Medium: rank-3 sources; Tse §§10.2 and 12.3 (the MAS-I reading) are not in the free publisher preview. No open findings.
