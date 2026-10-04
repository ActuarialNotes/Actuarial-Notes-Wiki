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
