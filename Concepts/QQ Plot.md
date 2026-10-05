---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:e9b9a1cef8c2dfe5dd2cdd02a69e78320da8a7e7314e6334abbcac35596d751f
  sources:
    - "NIST/SEMATECH e-Handbook §1.3.3.24 'Quantile-Quantile Plot' (quantiles of one data set against another; 45-degree reference line; shifts in location/scale, symmetry, tails), sha256:48fc9a7ae492519938004302aff61ba8a909b70601999f3cf244690bcb6db9dc — https://www.itl.nist.gov/div898/handbook/eda/section3/qqplot.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21 'Normal Probability Plot' (ordered response values vertical vs normal order statistic medians horizontal; fitted reference line whose intercept and slope estimate location and scale; used on model residuals), sha256:bdb6715e4dad4cf3d99e06540b85c460d925bb54af4d94d07e35e04dac6e0749 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21.2 'Data Have Short Tails' (S-like middle common to short and long tails; short tails: first points above the line, last points below), sha256:df3abf0f0812352a3a7b0465546ea8088d8a0cd4044b5b9c077bacbcdf64e071 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp2.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21.3 'Data Have Long Tails' (long tails: first points below the line, last points above), sha256:a8dfa8ebbc240f11fb2be349c17064264dc43d552673424c47180db6e1f4760d — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp3.htm"
    - "NIST/SEMATECH e-Handbook §1.3.3.21.4 'Data are Skewed Right' (quadratic pattern, all points below the line joining the first and last = right skew), sha256:e8109503a0fc7fe2a09f8677ad7315790fea204d990549dda509be3a1155c17c — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp4.htm"
    - "NIST/SEMATECH e-Handbook §8.2.2.1 'Probability plotting' (plotting positions: i/n biased; texts recommend (i - 0.5)/n or i/(n+1); NIST prefers median ranks), sha256:b3be0ff496cfff8d74b9f0cddf03fa6b18ed1de6bc1e769ef367050c2e482444 — https://www.itl.nist.gov/div898/handbook/apr/section2/apr221.htm"
    - "Larsen, 'Generalized Linear Models' (CAS Study Note, rev. 6/29/2016), 'QQ and Box Plots to test distribution assumptions' pp.1-2 (Dobson's normal probability plot of the residuals is a QQ plot built from order statistics) and 'Tweedie Distributions' p.2 (gamma: variance power p = 2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5): §2.4.1 logging continuous variables pp.11-12 (PDF 21-22); §2.4.3 base level p.15; §6.1.2 scaled deviance D* = 2(ll_sat - ll_model) p.63 (PDF 73); §6.2 F-test, AIC, BIC pp.64-67; §6.3.1 deviance residuals, q-q plot, discrete-distribution caveat pp.67-69 (PDF 77-79); §6.3.2 binned working residuals pp.70-73; §6.4 Cook's distance, CV, bootstrap p.74; §7.1 actual vs predicted on holdout pp.75-76; §7.2.1 quantile plots p.77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (p.7), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 3
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
