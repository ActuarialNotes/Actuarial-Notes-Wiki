---
target: Concepts/Sampling Distribution.md
created: 2026-10-05
---

## [F-001] t and F rows state exact distributions without the normal-population and independent-samples conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: table 'Key sampling distributions used in hypothesis testing', rows T and F, lines 25 and 27
- claim: T = (X-bar - mu)/(S/sqrt n) ~ t_{n-1} and F = (S_1^2/sigma_1^2)/(S_2^2/sigma_2^2) ~ F_{n1-1, n2-1}, listed with no condition; nothing on the page says the two samples of the F row are normal or independent.
- evidence: Siegrist, Random §5.8 'Special Properties of Normal Samples' (sample/Normal.html) derives T ~ t_{n-1} for a random sample from a normal distribution (it uses the independence of M and S^2, a property of normal samples) and the F result under 'The Two Sample Model', which assumes X and Y are random samples from normal distributions and that X and Y are independent. The page states normality for the X-bar and chi-square displays only; the table drops it, and the F row's independence requirement appears nowhere. For a non-normal population the variance ratio is not F-distributed and T is t-distributed only approximately. (The Z row is exact for a normal population and approximate by the CLT otherwise, which the page's CLT bullet covers.)
- source_rank: 3
- proposed_action: Add the conditions to the table or its heading: normal populations, and for the F row two independent samples. Not applied - the fix is new wording.
- applied: false
- fingerprint: 85b16c9e98ed
