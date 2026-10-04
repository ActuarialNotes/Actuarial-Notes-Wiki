---
target: Concepts/QQ Plot.md
created: 2026-10-04
---

## [F-001] S-shape vs reverse-S labels do not identify the tail case
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: 'Interpretation' table, rows 2 and 3
- claim: 'S-shaped curve | Data has lighter tails than the theoretical distribution' and 'Reverse S-shape | Data has heavier tails (fat-tailed data)'.
- evidence: NIST e-Handbook §1.3.3.21.2 and §1.3.3.21.3: 'the middle of the data shows an S-like pattern. This is common for both short and long tails.' What separates them is the direction of the departure at the ends: short tails - 'the first few points show increasing departure from the fitted line above the line and last few points ... below the line'; long tails - 'this pattern is reversed' (first few below, last few above). Whether a given curve looks like an 'S' or a 'reverse S' depends on which axis carries the sample, and NIST calls both shapes S-like, so the label alone can send a reader to the wrong tail. The page's own row 4 (upper-tail points above the line = heavier right tail) states the rule correctly. sha256:df3abf0f0812352a3a7b0465546ea8088d8a0cd4044b5b9c077bacbcdf64e071 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp2.htm; sha256:a8dfa8ebbc240f11fb2be349c17064264dc43d552673424c47180db6e1f4760d — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp3.htm
- source_rank: 3
- proposed_action: Replace the S / reverse-S rows with the tail-direction rule, sample quantiles on the vertical axis: lighter tails = low end above and high end below the line; heavier tails = low end below and high end above.
- applied: false
- fingerprint: a72affd3f4d6

## [F-002] Unsourced claim that a QQ plot beats a histogram on tails
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 3
- claim: 'More informative than a histogram for comparing distributional tails'
- evidence: Not stated in the sources read for this page: NIST §1.3.3.24 compares the q-q plot with the chi-square and Kolmogorov-Smirnov tests, not with histograms; NIST §1.3.3.21 lists the histogram as a related technique without ranking it; Larsen pp.1-2 is silent; Goldburd et al. §6.3.1 pp.67-69 shows a histogram and a q-q plot of deviance residuals side by side as two ways to assess normality, without ranking them. Stated as fact with no source. sha256:48fc9a7ae492519938004302aff61ba8a909b70601999f3cf244690bcb6db9dc — https://www.itl.nist.gov/div898/handbook/eda/section3/qqplot.htm
- source_rank: 3
- proposed_action: Cite a source for the comparison or drop the bullet.
- applied: false
- fingerprint: 25e50aa35bb1

## [F-003] Reference line called 45 degrees for raw residuals
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: example 'Interpreting a Normal QQ Plot of Residuals', stem
- claim: 'a Normal QQ plot of the residuals shows points that closely follow the 45° line in the center'
- evidence: NIST §1.3.3.21: on a normal probability plot the reference is a fitted straight line whose intercept and slope estimate the location and scale of the data; the 45-degree line is the two-sample q-q plot's reference (§1.3.3.24). Goldburd et al. §6.3.1 p.68 draws the line through the 25th and 75th theoretical quantiles. Raw regression residuals with sigma != 1 lie along a line of slope about sigma, not 45 degrees; only standardized residuals follow the 45-degree line. sha256:bdb6715e4dad4cf3d99e06540b85c460d925bb54af4d94d07e35e04dac6e0749 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm
- source_rank: 3
- proposed_action: Say 'the reference line', or make the residuals standardized.
- applied: false
- fingerprint: 5368595534e9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Definition (sample quantiles vs a theoretical distribution or a second data set) = NIST §1.3.3.24 and §1.3.3.21; construction x_(i) against F^-1 at i/(n+1) or (i - 0.5)/n = NIST §8.2.2.1 plotting positions (NIST's own normal plot uses Filliben medians (i - 0.3175)/(n + 0.365) - an alternative, not a contradiction); straight line = good fit and upper-tail points above the line = heavier right tail = NIST §1.3.3.21.3; systematic curvature = wrong family, e.g. right skew (NIST §1.3.3.21.4); S/reverse-S rows (F-001); normal QQ plot of model residuals = NIST §1.3.3.21, Larsen pp.1-2 (Dobson's normal probability plot is a QQ plot), Goldburd §6.3.1 for GLM deviance residuals; histogram comparison unsourced (F-002). Example: upper tail curving up = heavier right tail (NIST, Goldburd §6.3.1), remedies plausible; '45° line' (F-003). Figure (generated, qq_plot): y = q + 0.36q^3/4.4, points below the line on the left and above on the right, labelled heavy left/right tail - matches NIST's long-tail signature. Links resolve exactly.
- sources_checked: NIST/SEMATECH e-Handbook §1.3.3.24 'Quantile-Quantile Plot' (quantiles of one data set against another; 45-degree reference line; shifts in location/scale, symmetry, tails), sha256:48fc9a7ae492519938004302aff61ba8a909b70601999f3cf244690bcb6db9dc — https://www.itl.nist.gov/div898/handbook/eda/section3/qqplot.htm; NIST/SEMATECH e-Handbook §1.3.3.21 'Normal Probability Plot' (ordered response values vertical vs normal order statistic medians horizontal; fitted reference line whose intercept and slope estimate location and scale; used on model residuals), sha256:bdb6715e4dad4cf3d99e06540b85c460d925bb54af4d94d07e35e04dac6e0749 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm; NIST/SEMATECH e-Handbook §1.3.3.21.2 'Data Have Short Tails' (S-like middle common to short and long tails; short tails: first points above the line, last points below), sha256:df3abf0f0812352a3a7b0465546ea8088d8a0cd4044b5b9c077bacbcdf64e071 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp2.htm; NIST/SEMATECH e-Handbook §1.3.3.21.3 'Data Have Long Tails' (long tails: first points below the line, last points above), sha256:a8dfa8ebbc240f11fb2be349c17064264dc43d552673424c47180db6e1f4760d — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp3.htm; NIST/SEMATECH e-Handbook §1.3.3.21.4 'Data are Skewed Right' (quadratic pattern, all points below the line joining the first and last = right skew), sha256:e8109503a0fc7fe2a09f8677ad7315790fea204d990549dda509be3a1155c17c — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp4.htm; NIST/SEMATECH e-Handbook §8.2.2.1 'Probability plotting' (plotting positions: i/n biased; texts recommend (i - 0.5)/n or i/(n+1); NIST prefers median ranks), sha256:b3be0ff496cfff8d74b9f0cddf03fa6b18ed1de6bc1e769ef367050c2e482444 — https://www.itl.nist.gov/div898/handbook/apr/section2/apr221.htm; Larsen, 'Generalized Linear Models' (CAS Study Note, rev. 6/29/2016), 'QQ and Box Plots to test distribution assumptions' pp.1-2 (Dobson's normal probability plot of the residuals is a QQ plot built from order statistics) and 'Tweedie Distributions' p.2 (gamma: variance power p = 2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5): §2.4.1 logging continuous variables pp.11-12 (PDF 21-22); §2.4.3 base level p.15; §6.1.2 scaled deviance D* = 2(ll_sat - ll_model) p.63 (PDF 73); §6.2 F-test, AIC, BIC pp.64-67; §6.3.1 deviance residuals, q-q plot, discrete-distribution caveat pp.67-69 (PDF 77-79); §6.3.2 binned working residuals pp.70-73; §6.4 Cook's distance, CV, bootstrap p.74; §7.1 actual vs predicted on holdout pp.75-76; §7.2.1 quantile plots p.77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (p.7), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Open: F-001 minor (S/reverse-S labels), F-002 minor (unsourced histogram comparison), F-003 nit (45-degree line). Medium: Larsen (rank 2) confirms only that the QQ plot is how normality of residuals is checked; construction and reading rules rest on NIST (rank 3) - Hogg §4.4.1, which the CAS reading points to, is not freely available. Linked only by MAS-I C8.
