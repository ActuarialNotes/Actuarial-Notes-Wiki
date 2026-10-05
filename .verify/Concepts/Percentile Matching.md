---
target: Concepts/Percentile Matching.md
created: 2026-10-05
---

## [F-001] Two-parameter Pareto percentile matching has no closed-form solution
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 2 ('Distributions with a closed-form inverse CDF ...')
- claim: Lists the Pareto, with the exponential, Weibull and loglogistic, among distributions whose percentile-matching equations 'can be solved by hand'.
- evidence: Loss Data Analytics ch.4 §4.1.3.2 Example 4.1.10 (ChapModelSelection.html, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021) fits the two-parameter Pareto to two empirical quantiles and states 'a numerical routine is required for these solutions as no analytic solution is available', even though its quantile function theta((1-q)^(-1/alpha) - 1) is closed form. Dividing the two quantile equations leaves ((1-g2)^(-1/alpha) - 1)/((1-g1)^(-1/alpha) - 1) = pi2/pi1, one equation in alpha with no closed-form root. The Weibull (log-ratio, as the page's own example shows) and the loglogistic (log-odds linear in ln x) do reduce to closed forms; the exponential has one parameter. A closed-form inverse CDF is therefore not what makes the system solvable by hand.
- source_rank: 3
- proposed_action: Drop the Pareto from the 'solved by hand' list, or qualify it (closed form only when one Pareto parameter is known).
- applied: false
- fingerprint: e1a82f91bdaa

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Both examples recomputed in python before comparing: median position 5.5, pi-hat = 485, theta-hat = 485/ln 2 = 699.71, sample mean 756; quartile positions 3 and 9 (140, 620), -ln 0.75 = 0.287682, -ln 0.25 = 1.386294, tau-hat = 1.05676, theta-hat = 455.15 from either equation. Smoothed-percentile formula and the n = 11, g = 0.4 illustration checked against LDA. Finding on the Pareto 'by hand' claim. Links resolve; LaTeX balanced.
- sources_checked: Loss Data Analytics (Frees et al., open textbook), ch.4: §4.1.1.3 smoothed empirical quantile (1-h)X_(j) + hX_(j+1), j = floor((n+1)q), h = (n+1)q - j; Example 4.1.11 n = 11, q = 0.4 gives 0.2 X_(4) + 0.8 X_(5); §4.1.3.2 percentile matching, needed when moments do not exist, estimates vary with the percentiles chosen, Pareto needs a numerical routine; MLE uses data more efficiently, moments and percentile matching are easier to explain and give starting values, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Tse §12.1, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, printed contents PDF pp.10-13: §12.1 'Methods of moments and percentile matching', §12.1.2 'Method of percentile matching' (contents only; body not freely available), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 2 rewritten: the Pareto is no longer listed among the distributions solved by hand. It now says the exponential, Weibull and loglogistic can be solved by hand (dividing one equation by the other eliminates theta for the two-parameter ones), and that a closed-form inverse CDF is not enough: the two-parameter Pareto has F^{-1}(g) = theta((1 - g)^{-1/alpha} - 1), yet its two percentile equations have no analytic solution and need a numerical solver. Source re-read this session: Loss Data Analytics ch.4 §4.1.3.2, Example 4.1.10 (Pareto quantile function; 'a numerical routine is required for these solutions as no analytic solution is available') and Example 4.1.11 (loglogistic solved by taking the ratio of the two equations), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021. Recomputed in python: LDA's Pareto fit by bisection, alpha = 0.94122, theta = 2.2056 (LDA 0.9412076, 2.205617); loglogistic gamma = 2.1407, theta = 107.80 (LDA 2.1407, 107.8).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Re-read the edited bullet and the whole page. Pareto quantile function and 'no analytic solution' re-checked against LDA Example 4.1.10, loglogistic ratio method against Example 4.1.11, smoothed percentile formula and n = 11, g = 0.4 illustration against §4.1.1.3 / Example 4.1.11; LDA's Pareto and loglogistic fits recomputed in python. Both page examples recomputed in python: median 485, theta-hat = 699.71, sample mean 756; quartiles 140 and 620, -ln 0.75 = 0.28768, -ln 0.25 = 1.38629, ratio 4.81884, tau-hat = 1.57253/1.48808 = 1.0568, theta-hat = 455.15 from either equation. Links resolve.
- sources_checked: Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation: §4.1.1.3 smoothed empirical quantile (1-h)X_(j) + hX_(j+1), j = floor((n+1)q), h = (n+1)q - j (Example 4.1.3); §4.1.3.1 moments not available when they do not exist, percentile matching as the alternative; §4.1.3.2 Example 4.1.10 Pareto quantile theta((1-q)^(-1/alpha) - 1), numerical routine required, no analytic solution; Example 4.1.11 loglogistic by ratio of the two equations, n = 11, q = 0.4 gives 0.2 X_(4) + 0.8 X_(5); estimates vary with percentiles chosen; MLE more efficient, moments/percentile matching easier to explain and give starting values, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Tse §12.1 assigned, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents (PDF pp.10-13): §12.1 Methods of moments and percentile matching (contents only), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf
- note: Resolve run: F-001 closed. Medium, not high: the assigned reading Tse §12.1 is not freely available; claims rest on Loss Data Analytics (rank 3). No open findings.
