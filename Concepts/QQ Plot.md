---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:d9c6021e07b6bf6e64784be705937f59f79b30fca951a553a39e2c188740b44b
  sources:
    - "NIST/SEMATECH e-Handbook §1.3.3.24 'Quantile-Quantile Plot' (quantiles of one data set against those of another; 45-degree reference line for the two-sample plot), sha256:48fc9a7ae492519938004302aff61ba8a909b70601999f3cf244690bcb6db9dc — https://www.itl.nist.gov/div898/handbook/eda/section3/qqplot.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21 'Normal Probability Plot' (vertical axis: ordered response values; horizontal: normal order statistic medians; fitted reference line; used on model residuals), sha256:bdb6715e4dad4cf3d99e06540b85c460d925bb54af4d94d07e35e04dac6e0749 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21.2 'Data Have Short Tails' (S-like middle 'common for both short and long tails'; short tails: first few points above the fitted line, last few below), sha256:df3abf0f0812352a3a7b0465546ea8088d8a0cd4044b5b9c077bacbcdf64e071 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp2.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21.3 'Data Have Long Tails' (long tails: first few points below the fitted line, last few above), sha256:a8dfa8ebbc240f11fb2be349c17064264dc43d552673424c47180db6e1f4760d — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp3.htm"
    - "NIST/SEMATECH e-Handbook §8.2.2.1 'Probability plotting' (plotting positions: texts recommend (i - 0.5)/n or i/(n+1)), sha256:b3be0ff496cfff8d74b9f0cddf03fa6b18ed1de6bc1e769ef367050c2e482444 — https://www.itl.nist.gov/div898/handbook/apr/section2/apr221.htm"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §6.3.1 pp.68-69 (PDF 78-79: q-q plot of deviance residuals, theoretical quantiles on x, sample on y, reference line through the 25th and 75th theoretical quantiles; right-most points above the line = more skewed than assumed), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Larsen, 'Generalized Linear Models' (CAS Study Note, rev. 6/29/2016; MAS-I reading), 'QQ and Box Plots to test distribution assumptions' pp.1-2 (Dobson's normal probability plot of the residuals is a QQ plot built from order statistics) and 'Tweedie Distributions' p.2 (Var[Y] = a E(Y)^p, gamma p = 2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/QQ Plot.md
---

A **QQ Plot** (Quantile-Quantile Plot) is a graphical diagnostic that compares the **quantiles** of a dataset against the quantiles of a theoretical distribution (or another dataset) to assess goodness of fit.

> **Construction:** Plot the $i$-th order statistic $x_{(i)}$ on the vertical axis against the theoretical quantile $F^{-1}(p_i)$ on the horizontal axis, with plotting position $p_i = \frac{i}{n+1}$ (or $\frac{i-0.5}{n}$).

**Interpretation** (sample quantiles on the vertical axis):

| Pattern | Implication |
| :--- | :--- |
| Points fall on a straight line | Data fits the theoretical distribution well |
| Low end above the line, high end below it | Data has lighter (shorter) tails than the theoretical distribution |
| Low end below the line, high end above it | Data has heavier (longer) tails — fat-tailed data |
| Points above the line in the upper tail | Right tail is heavier than theoretical |
| Systematic curvature | Distribution family is wrong |

- A **Normal QQ plot** plots sample quantiles against Normal quantiles; a straight line indicates normality
- Used to assess model assumptions in [[Generalized Linear Model]]s and linear regression ([[Residual Plot]]s on a QQ scale check normality of residuals)
- Both tail cases can bend the middle of the plot into an S-like pattern, so read the direction of the departure at the two ends, not the shape of the middle

![[Media/Figures/QQ_Plot.svg|340]]

> [!example]- Interpreting a Normal QQ Plot of Residuals {Example}
> After fitting a linear regression to claim severity data, a Normal QQ plot of the residuals shows points that closely follow the reference line in the center but curve sharply upward in the upper-right tail. What does this indicate?
>
> > [!answer]-
> > The upward curve in the upper tail indicates that the **residuals have a heavier right tail** than the Normal distribution. This suggests the normality assumption for residuals may be violated — perhaps a log transformation of severity or a GLM with a Gamma distribution would be more appropriate.
