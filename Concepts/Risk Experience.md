---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:ec3d1a0a6a7c29c1df3276a2755a465c6bb219bb4ff2a747606e4d6b3b9d143f
  sources:
    - "Mahler, An Example of Credibility and Shifting Risk Parameters, PCAS LXXVII (1990), printed pp.225-245 (PDF pp.1-21): §4 chi-squared test on 5-year segments, 11 degrees of freedom, correlation by lag falling until about ten years; §5 linear combinations of estimators, grand mean 50%; §6.4 retrospective tests; §6.5 the fourth method, Z/N to each of the N most recent years and 1 - Z to the grand mean; §7.1-7.3 the three criteria (least squared error, Bühlmann/Bayesian as least squares; small chance of large errors; Meyers/Dorweiler); §8.3 more than one or two years did worse, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15, PDF p.302 (experience period usually two to five policy years ending with the last complete year; per-occurrence caps with expected losses on the same basis), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), PDF pp.8-9 (mod indicates expected loss relative to the class; not a charge-back), p.26 (incurred retro first evaluated 6 months after expiration, 18 months of development, then annually), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), PDF p.3 (two-fifths), sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf"
    - "CAS Exam 8 Fall 2018 — sample answers and examiner's report, Q1(a)-(b), PDF pp.37-38 (chi-square on actual vs expected counts; MSE for trial Z from the frequencies that would have been estimated historically, using the cumulative frequency available up to that point; common mistake: the overall five-year frequency as the complement), sha256:7993ff15f4c6aae538bde337a57fbbf775aab27f3a232b8a828458ac52a330c4 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_18-8.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Risk Experience.md
---

**Risk Experience** is the observed loss history of a particular risk — its claims, losses and exposures over a stated period — as distinct from the experience its class would lead one to expect. Experience rating, retrospective rating and credibility theory all turn on how much weight that record deserves.

> $$\hat{\mu}_i = Z_i\,\bar{X}_i + (1 - Z_i)\,\hat{\mu}$$

> $$Z_i = \frac{m_i}{m_i + \hat{v}/\hat{a}}$$

- $\bar X_i$ is risk $i$'s observed mean (loss per exposure, or claim frequency) over exposure $m_i$, and $\hat\mu$ is the class or collective mean. $\hat v$ is the [[Expected Value of Process Variance|expected process variance]] and $\hat a$ the [[Variance of Hypothetical Means|variance of the hypothetical means]].
- **In experience rating (Exam 8)** the risk's own experience $A$ usually covers two to five policy years, ending with the last complete year. It is capped per claim, or split into primary and excess. It has to be on the **same basis** as the expected losses $E$ — same limits, same maturity, same exposure — because the mod measures only how far the record shows the risk to differ from others in its [[Rating Class|class]]. The mod is not a charge-back for past losses ([[Experience Rating]]).
- **In retrospective and loss-sensitive rating** the "actual loss" is the current policy's own losses, limited per occurrence and bounded by the minimum and maximum. Incurred plans first value them about 18 months after inception and then annually, so the premium follows development ([[Loss Sensitive Rating]]).
- **In credibility estimation (MAS-II)** experience does double duty. It supplies each risk's own mean, and pooled across risks it is the data the structural parameters are estimated from. $\hat v$ comes from year-to-year variation within risks, and $\hat a$ from how much the risk means spread beyond what $\hat v$ explains (*non-parametric*). Alternatively, an assumed family supplies one of them — for Poisson counts $\hat v = \bar X$ (*semi-parametric*). See [[Empirical Bayes Credibility]].
- **Limits on what experience says.** Mahler showed that risk parameters shift over time, so older years predict less. Bailey and Simon found that adding a second year raised credibility by only about two-fifths, not double. A change in operations can make the record out of date, which is where [[Schedule Rating|schedule rating]] comes in. Bailey and Simon's method is on [[Merit Rating]].
- **Testing whether risk parameters shift (Mahler).** Mahler demonstrates two methods, which can be applied to insurance data as well as to his baseball data.
  - *The chi-squared test.* For each risk, average the results over separate periods (Mahler uses 5-year segments), and use the standard [[Chi-Square Goodness-of-Fit Test|chi-squared test]] of the hypothesis that every segment was drawn from a distribution with the same mean. With 12 segments the statistic has 11 degrees of freedom. A value above the critical value rejects the hypothesis that the mean is the same over time, in favour of shifting risk parameters; a value below it does not reject it.
  - *The correlation test.* Compute the [[Correlation|correlation]] between the results for all of the risks for pairs of years, then average the correlations for the pairs of years with the same difference in time (the lag: 1 year, 2 years, and so on), and examine how the average correlation depends on the lag. If the parameters were reasonably constant over time, the correlations would not depend on the length of time between the pair of years. An average correlation that decreases as the lag increases means the parameters of the risk process are shifting over time.
  - A correlation different from zero is not necessarily [[Statistical Significance|statistically significant]]; Mahler found the correlation fell with the lag until about ten years, when there was no longer a significant correlation. A significant correlation between years close in time means recent years can be usefully employed to predict the future.
- **Choosing the credibility when parameters shift (Mahler).** Mahler's estimates are linear combinations of a risk's recent years and the grand mean. In his fourth method, each of the $N$ most recent years gets weight $Z/N$ and the grand mean weight $1 - Z$; with $N = 1$ it is the usual $Z \cdot (\text{latest year}) + (1-Z) \cdot (\text{grand mean})$. Because the parameters shift, older years predict less, and in his data using more than one or two years of data did worse.
  - *The least squared error criterion.* Calculate the mean squared error of the predictions a solution produces compared with the actual observed results; the smaller the mean squared error, the better the solution. Mahler's retrospective test asks which credibility would have optimized the criterion had it been used in the past: for a trial $Z$, predict each past period from the periods before it, square each prediction's difference from what then happened, average the squares, and choose the $Z$ with the smallest mean. Bühlmann and Bayesian credibility are least squares methods, so they aim at the same criterion. Mahler also compares solutions by the chance of a large error and by the Meyers/Dorweiler correlation.
  - *Only data available at the time.* Each retrospective prediction may use only what was known before the period it predicts. Mahler's grand mean is a fixed $50\%$; where the overall mean is estimated from the data, the complement for each prediction is the mean of the data up to that point, not the mean over every period — CAS's examiners count using the overall all-period mean there as a common mistake. For example, with $N = 3$ and $Z = 0.6$, the prediction for period 5 is $0.2\,x_4 + 0.2\,x_3 + 0.2\,x_2 + 0.4\,\bar x_{1\text{–}4}$, where $\bar x_{1\text{–}4}$ is the exposure-weighted mean of periods 1 to 4; predicting every period that has three before it this way and averaging the squared errors gives that $Z$'s mean squared error.

> [!example]- Putting Experience on the Same Basis as Expected {Example}
> A risk's policy year is valued 18 months after inception at $\$120{,}000$ of reported limited losses. Expected *ultimate* limited losses for a risk of its class and size are $\$200{,}000$, of which $55\%$ is expected to be reported by 18 months. How does its experience compare with expectation?
>
> > [!answer]-
> > Comparing immature actual losses with ultimate expected losses is wrong:
> >
> > $$\frac{120{,}000}{200{,}000} = 0.60$$
> >
> > That would suggest the risk is $40\%$ better than expected. Put both at the same maturity, or complete the actual losses with the expected unreported:
> >
> > $$
> > \begin{align*}
> > \frac{A}{E_{18}} &= \frac{120{,}000}{0.55 \times 200{,}000} \\
> > &= 1.09 \\[6pt]
> > \frac{A + E_{\text{unrep}}}{E} &= \frac{120{,}000 + 0.45 \times 200{,}000}{200{,}000} \\
> > &= 1.05
> > \end{align*}
> > $$
> >
> > Both versions show the risk running *slightly worse* than expected. The completed ratio is milder, because only the reported part is the risk's own experience. The naive ratio would have handed a large, unwarranted credit to a risk whose losses are simply still coming in.

> [!example]- Estimating Structural Parameters from Portfolio Experience {Example}
> Last year, a portfolio of $1{,}000$ policies had $700$ with no claims, $220$ with one, $60$ with two and $20$ with three. Each policy's count is assumed Poisson given its own mean. Estimate $\hat v$, $\hat a$ and the credibility-weighted frequency for a policy that had two claims.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{X} &= \frac{220 + 120 + 60}{1{,}000} \\
> > &= 0.40 \\[4pt]
> > s^2 &= \frac{640 - 1{,}000(0.40)^2}{999} \\
> > &= 0.4805 \\[4pt]
> > \hat{v} &= \bar{X} \\
> > &= 0.40 \\[4pt]
> > \hat{a} &= s^2 - \hat{v} \\
> > &= 0.0805 \\[4pt]
> > Z &= \frac{1}{1 + 0.40/0.0805} \\
> > &= 0.1675 \\[4pt]
> > \hat{\mu} &= 0.1675(2) + 0.8325(0.40) \\
> > &= 0.668
> > \end{align*}
> > $$
> >
> > Here $640 = \sum x^2 = 220(1) + 60(4) + 20(9)$. The portfolio's variance exceeds its mean, and that excess is the evidence that policies genuinely differ. Even so, one year of one policy's experience earns only $17\%$ weight: two claims move its estimate from $0.40$ to $0.67$, not to $2$.
