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
