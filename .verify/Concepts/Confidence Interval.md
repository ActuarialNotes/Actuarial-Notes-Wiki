---
target: Concepts/Confidence Interval.md
created: 2026-10-04
---

## [F-001] t and chi-square intervals given without the normal-sample condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: formula block line 18 (t interval) and bullets lines 23-24 (t_{n-1} rule, variance interval)
- claim: Gives the interval Xbar +/- t_{alpha/2,n-1} S/sqrt(n) for 'sigma estimated', says 'Use t_{n-1} whenever sigma is replaced by S', and gives the variance interval ((n-1)S^2/chi^2_{alpha/2}, (n-1)S^2/chi^2_{1-alpha/2}) with no distributional condition, no degrees of freedom on the chi-square points and no statement of which tail chi^2_{alpha/2} denotes.
- evidence: Siegrist, Random, ch.7 'Estimation in the Normal Model' (interval/Normal.html, sha256:21c59dd27f38c17148de5af35d53d94a01c51cd4f230c81d75e91173a9917586) derives both intervals under the stated assumption that X1..Xn 'is a random sample from the normal distribution': T = (M - mu)/(S/sqrt n) ~ t_{n-1} and V = (n-1)S^2/sigma^2 ~ chi^2_{n-1}, giving [(n-1)S^2/chi^2_{n-1}(1-alpha/2), (n-1)S^2/chi^2_{n-1}(alpha/2)] in quantile-of-order-p notation. NIST/SEMATECH e-Handbook 1.3.5.8 (eda358.htm, sha256:479a6c6d7f68671d8a61d0daa073e5884a428b477d7b0308c50863c7f164d467) writes the same interval with chi^2_{1-alpha/2,N-1} in the lower bound's denominator (lower-tail notation). The page's endpoints are therefore right only if chi^2_{alpha/2} is the UPPER alpha/2 point with n-1 df (the convention Concepts/Critical Value.md states but this page does not), and the CAS Exam MAS-I tables (masi_tables.pdf p.20, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4) tabulate LOWER-tail chi-square areas, so a candidate reading chi^2_{0.025} off the exam table gets the endpoints reversed. Neither interval is valid for skewed claim data without the normality condition (the chi-square interval is the pivot V, which is chi-square only for normal samples). The worked example ('a sample of n = 16 claims') uses the t interval with no normality assumption stated.
- source_rank: 3
- proposed_action: State that the t and chi-square intervals assume a normal population (the z interval is exact for normal data and approximate by the CLT otherwise), write the variance interval with n-1 df and say chi^2_{alpha/2,n-1} is the upper alpha/2 point (or use the quantile form), and add the normality assumption to the n = 16 example. Not applied: needs new wording.
- applied: false
- fingerprint: 7bd519dc55cc
