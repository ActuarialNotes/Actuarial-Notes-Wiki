---
target: Concepts/Truncation.md
created: 2026-10-04
---

## [F-001] Upward bias from ignoring truncation stated as universal; it is not for a parametric fit
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: 2nd bullet (bias from not adjusting)
- claim: Failing to adjust for truncation leads to upward bias in estimated means (only the larger claims are seen).
- evidence: True of the sample mean (the reported losses estimate E[X | X > d] >= E[X]) and of the exponential (the naive MLE is x-bar, which estimates d + theta). Not true of every model fitted by MLE while ignoring truncation. Luo, Shevchenko & Donnelly (J. Operational Risk 2(4) 2007; arXiv:0904.2910) PDF p.3 and p.12: the 'naive model' that fits an untruncated lognormal to truncated data always overestimates mu and underestimates sigma, and 'it is not obvious whether the naive model will over-predict or under-predict the quantiles of severity'. Recomputation (rank 5, python, truncated-normal moments on the log scale) with X ~ LN(0, 2^2), true mean e^2 = 7.389: truncating at the 10th percentile and fitting the lognormal by naive MLE gives mu-hat 0.390, sigma-hat^2 2.848, fitted mean 6.136; at the 30th percentile, fitted mean 7.236. Both are below the true mean. The bias is upward only from the 50th-percentile truncation on (fitted mean 10.20).
- source_rank: 3
- proposed_action: Restrict the bullet to the sample mean (the average of reported losses estimates E[X | X > d], not E[X]) or to the exponential case, or drop the direction and say only that the estimates are biased.
- applied: false
- fingerprint: 45f43a3e9a19

## [C-001] F-001 evidence: crossover point
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: 2nd bullet (bias from not adjusting)
- note: Correction to the last sentence of F-001 evidence, which overstated where the bias turns upward: for X ~ LN(0, 2^2) the naive lognormal fit has fitted mean below the true mean 7.389 for truncation below about the 31.5th percentile (bisection on the same truncated-normal moments) and above it beyond that; the 50th-percentile figure (10.20) was just the next grid point checked. F-001 itself stands: the direction depends on the model and the truncation level.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Definition, left truncation at a deductible, contribution f(x)/S(d), conditional distribution X | X > d, right truncation, and the truncation-vs-censoring contrast against LDA §4.3.1.3-4.3.1.4 and §3.5.2.3. Bias bullet tested against Luo et al. and a rank-5 lognormal counterexample - F-001 minor (not universal). Example recomputed before reading the answer: each claim contributes theta^-1 e^(-(x-1)/theta), L = theta^-2 e^(-3/theta), theta-hat = 1.5 = mean excess 2.5 - 1; LDA exponential special case gives the same - agrees. [[Censoring]] resolves; figure (gamma density cut at d, the rest rescaled by S(3) = 2.5 e^-1.5) is correct. Only Exam MAS-I links the page.
- sources_checked: Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.4 §4.3.1.3 truncated data (left truncation at a deductible: losses at or below C_L are not observed; right truncation; truncated outcomes are missing data, censored ones are recorded in limited form), §4.3.1.4 contribution f(x)/(1 - F(C_L)) and exponential special case, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Frees & Johnson (eds.), Loss Data Analytics, Version 1.1, Ch.3 §3.5.2.3 MLE for truncated data, L = prod f(x_i)/S(d), "we would not have been aware of the existence of these values had they not exceeded d", sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Luo, Shevchenko & Donnelly, "Addressing the Impact of Data Truncation and Parameter Uncertainty on Operational Risk Estimates", J. Operational Risk 2(4), 2007 (arXiv:0904.2910 preprint), PDF p.3 and p.12, sha256:a91ad1b0e1bc8a2ec69e9c7f614faf8db2e6f4ca02e879a2ef3a598ecd39cf9b — https://arxiv.org/pdf/0904.2910; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 8 and 9 (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: One open minor (F-001: upward bias from ignoring truncation stated as universal). Medium: rank-3 sources; Tse §§10.2.3, 12.3.2 not readable.
