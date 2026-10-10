---
id: "masi-an-046"
exam: "Exam MAS-I"
topic: "Percentile Matching"
learning_objective: "Statistics"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Percentile+Matching
  - Concepts/Method+of+Moments
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Pareto+Distribution
  - Concepts/Tail+Weight
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e92e17316437532e425a48ce9dabfae213b99780f38088229b73528d364bd832
  sources:
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.2.4.1 Pareto E[X^k] finite only for -1 < k < alpha, PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Frees et al., Loss Data Analytics (open text), ch.4 Model Selection and Estimation, 4.1.3.2 percentile matching; method of moments, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-046.md
---

An actuary will fit a two-parameter Pareto distribution to 40 liability claims by maximum likelihood, using a numerical search. She first needs starting values for both parameters. A few very large claims dominate the data, and prior studies of this line put $\alpha$ near 1.5. The method that supplies the starting values must:

1. estimate both parameters from the data;
2. not rely on a moment of the Pareto that is infinite, or that the sample estimates erratically, when $\alpha$ is near 1.5;
3. not be driven by the one or two largest or smallest claims.

Which method best meets all three requirements?

- A) Method of moments, matching the sample mean and sample variance
- B) Matching the sample mean and the smoothed empirical median
- C) Percentile matching at the smoothed 5th and 95th percentiles
- D) Percentile matching at the smoothed 25th and 75th percentiles
- E) Percentile matching at the smoothed median, with $\alpha$ set to 1.5

## Explanation

Weigh each method against the three stated requirements.

- A Pareto's $k$th moment exists only for $k < \alpha$. With $\alpha$ near 1.5 the variance is infinite; the mean is finite, but the sample mean has infinite variance, so a sample mean computed from a few dominant claims is erratic.
- Percentiles always exist, so percentile matching does not depend on any moment.
- With $n = 40$, the smoothed 25th and 75th percentiles sit at positions $(n+1)g = 41(0.25) = 10.25$ and $(n+1)g = 41(0.75) = 30.75$ — in the body of the data, far from the extreme claims.

Percentile matching at the quartiles estimates both parameters, uses no moment and is driven by the middle of the sample, so it meets all three requirements. The answer is **D**. Its estimates are only starting values — maximum likelihood, which uses every claim, is still the final fit.

**Why not the others**

- **A** — fails requirement 2: the Pareto variance is infinite for $\alpha \le 2$, so the sample variance estimates nothing finite. Any solution of the two moment equations has $\hat\alpha > 2$, because the model's ratio $E[X^2]/E[X]^2 = 2(\alpha - 1)/(\alpha - 2)$ exists only for $\alpha > 2$ — the method cannot even return a value near 1.5.
- **B** — fails requirement 2: with $\alpha$ near 1.5 the sample mean is dominated by the largest claims and is unstable, even though the median half of the method is sound.
- **C** — fails requirement 3: positions $(n+1)g = 41(0.05) = 2.05$ and $(n+1)g = 41(0.95) = 38.95$ land almost exactly on the second-smallest and the second-largest claims, so the fit hinges on two extreme observations.
- **E** — fails requirement 1: fixing $\alpha$ at a prior guess leaves only $\theta$ estimated from the data.
