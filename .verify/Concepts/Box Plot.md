---
target: Concepts/Box Plot.md
created: 2026-10-04
---

## [F-001] Worked example gives the upper whisker end as the five-number summary's maximum
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: example 'Building a Box Plot from a Sample', answer, last sentence
- claim: The five-number summary is (2, 4, 7, 11, 14) with 40 plotted separately.
- evidence: The five-number summary is (x_(1), q1, q2, q3, x_(n)) — the sample minimum and maximum, outliers included: Siegrist, Random, Ch.6 §6 'Order Statistics' ('The five statistics (x_(1), q1, q2, q3, x_(n)) are often referred to as the five-number summary'; the boxplot line runs to the largest value that is not an outlier, which 'may be the maximum'), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html; R stats::fivenum 'Tukey's five number summary (minimum, lower-hinge, median, upper-hinge, maximum)', and grDevices::boxplot.stats, whose plotted 'stats' vector holds the whisker extremes and equals fivenum only when coef = 0. The page's own lead also lists the five numbers as min, Q1, Q2, Q3, max. For the page's data x_(n) = 40, so with the page's quartiles the summary is (2, 4, 7, 11, 40); 14 is the end of the upper whisker (largest value inside the 21.5 fence), which the preceding sentence already states. Recomputed: n=11, Q1=4, Q2=7, Q3=11 under the page's halves method (= NIST (N+1)p method), IQR 7, fences -6.5 / 21.5, 40 outside, whisker to 14.
- source_rank: 3
- proposed_action: Change the summary to (2, 4, 7, 11, 40); the whisker end of 14 is already stated in the preceding sentence.
- applied: true
- fingerprint: e0b6f8e8d37c

## [F-002] 1.5 x IQR outlier rule and quartile method stated without naming the convention
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: formula block 'outlier if x < Q1 - 1.5 IQR or x > Q3 + 1.5 IQR'; whisker bullet; example quartiles
- claim: outlier if x < Q1 - 1.5 IQR or x > Q3 + 1.5 IQR (stated as the definition of an outlier, with no convention named; the example's quartiles are medians of the halves, with no note that other quartile definitions give other values).
- evidence: NIST e-Handbook §1.3.3.7 'Box Plot': the basic box plot draws the whiskers to the minimum and maximum; the 1.5-IQR version is 'a useful variation' ('Box plots with fences'), with L1/U1 = Q1 - 1.5 IQ / Q3 + 1.5 IQ and L2/U2 = Q1 - 3 IQ / Q3 + 3 IQ, points between drawn as small and beyond as large circles (sha256:545e917efab8aae10425dd289461c519de359120fd39d6dc94efa8c324e1f783 — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm). NIST §7.1.6: a point beyond an inner (1.5 IQ) fence is a 'mild outlier', beyond an outer (3 IQ) fence an 'extreme outlier'; outliers are left to the analyst's judgment; quartiles at the .25(N+1)th and .75(N+1)th ordered points (sha256:6dfe27fdc6af41afc2fc6d3ca3c1cae158bc481e2c1f5dd5bbc3f5f67c38f520 — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm). Siegrist, Random, Ch.6 §6: values beyond the 1.5-IQR fences are 'potential outliers'; his primary sample quantile uses rank (n-1)p+1 and he notes 'lots of alternatives' (…/random/sample/OrderStatistics.html, sha256:19ff485c…). R's boxplot uses Tukey hinges (boxplot.stats). Recomputed on the page's data (2,3,4,5,6,7,8,9,11,14,40): (n-1)p+1 / R hinges give Q1 = 4.5, Q3 = 10, IQR 5.5, fences -3.75 / 18.25; (N+1)p and the page's halves method give 4, 11, IQR 7, fences -6.5 / 21.5. The outlier (40) and whisker end (14) agree here, but the fence values do not, and borderline points can change class.
- source_rank: 3
- proposed_action: Name the convention: Tukey's inner fences at 1.5 IQR flag potential (mild) outliers, outer fences at 3 IQR extreme ones; and say quartile definitions differ (the example uses medians of the halves, equal here to the (n+1)p rule), so fences computed by software can differ.
- applied: false
- fingerprint: 5a348043c1ab

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: IQR definition, box Q1-Q3 holding the middle 50%, median line, whiskers to the most extreme point inside the 1.5-IQR fences = NIST §1.3.3.7 'box plots with fences' and Siegrist §6.6; side-by-side boxes by factor level = NIST 'check the significance of a factor' and ISLR §2.3.5; built from order statistics = Larsen p.2 (Hogg §4.4.1) and Siegrist §6.6 quantile definitions; resistance to one extreme value follows from those rank-based quantile definitions; example recomputed before reading the answer under three quartile conventions (halves / (n+1)p: 4, 7, 11, fences -6.5 / 21.5; (n-1)p+1 / R hinges: 4.5, 7, 10, fences -3.75 / 18.25) — outlier 40 and whisker 14 agree, stated five-number summary did not (F-001, fixed); example 2 interpretation (overlapping boxes, variance rising with median -> Gamma, log link) consistent with Larsen's Tweedie/variance-power note; links and figure embed resolve; figure builder (figures_exam_mas_i.py box_plot) draws Q1 4, median 7, Q3 11, whiskers 2/14, fence 21.5, outlier 40 = the example; scope = MAS-I outline task C9 ('box' plots).
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (basic box plot; 'Box plots with fences'), sha256:545e917efab8aae10425dd289461c519de359120fd39d6dc94efa8c324e1f783 — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?' (inner/outer fences, (N+1)p quartiles, mild/extreme outliers), sha256:6dfe27fdc6af41afc2fc6d3ca3c1cae158bc481e2c1f5dd5bbc3f5f67c38f520 — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §6 'Order Statistics' (sample quantiles and alternatives, IQR, fences, five-number summary, boxplot, empirical CDF), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html; R Documentation, stats::fivenum 'Tukey Five-Number Summaries' (minimum, lower-hinge, median, upper-hinge, maximum), sha256:4d4c9ba1a26a23b9793e1bcadf996ed096e7eb84bdca2c78d45b78ed44667719 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/fivenum.html; R Documentation, grDevices::boxplot.stats (coef = 1.5 whiskers; hinges vs quartiles), sha256:202dc113fa952aae23b87aef26e3eb28b384ae53bfa717dc3b86ef46949b78c3 — https://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/boxplot.stats.html; Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §2.3.5 lab (plot() of a qualitative x draws side-by-side boxplots), printed p.50 (PDF p.61), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Verified at medium: rank-3 references (NIST, Siegrist, R docs) plus Larsen (rank 2) only point at Hogg §4.4.1, which is not freely available, so Hogg's own quartile/fence convention was not read. F-001 fixed in this pass (one number); F-002 (unnamed convention) left open — it needs new prose.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-001
- status: resolved
- note: Corrected in this pass: the summary now reads (2, 4, 7, 11, 40), matching Siegrist's (x_(1), q1, q2, q3, x_(n)) and R's fivenum; the preceding sentence still gives the whisker end of 14.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Named the convention. Formula label now 'potential outlier' (Siegrist §6.6's term for a value beyond the 1.5-IQR fences). New bullet 'The convention varies': the 1.5 IQR limits are the inner fences; NIST calls a point beyond one a mild outlier and beyond an outer fence (Q1 - 3 IQR, Q3 + 3 IQR) an extreme one, and NIST's basic box plot runs the whiskers to the min and max (NIST §1.3.3.7 'Box plots with fences'; §7.1.6 'Outlier detection criteria'); quartiles have several definitions (Siegrist §6.6 'Alternate Definitions'): the page's medians-of-halves matches NIST's (n+1)p rule on the example, R's boxplot uses Tukey's hinges (boxplot.stats Details). Example now adds: 40 is beyond the outer fence 11 + 3(7) = 32, so extreme by NIST; R's hinges give Q1 = 4.5, Q3 = 10, fences -3.75 / 18.25, same outlier and whisker (recomputed in numpy: method='weibull' (n+1)p -> 4, 11, fences -6.5/21.5/outer 32; method='linear' = R type 7 = hinges for odd n -> 4.5, 10, fences -3.75/18.25). Also 'two clusters and one broad spread give the same five numbers' -> 'can give' (only some samples coincide).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Every edit re-read against its source: inner/outer fences and mild/extreme names = NIST §7.1.6; basic box plot whiskers to min/max and fenced variation = NIST §1.3.3.7; 'potential outliers' and alternative quantile definitions = Siegrist §6.6; hinges vs quartiles = R boxplot.stats; five-number summary (2,4,7,11,40) = Siegrist/fivenum definition. Example recomputed in python under (n+1)p (4, 11, IQR 7, fences -6.5/21.5, outer 32) and type-7/hinges (4.5, 10, IQR 5.5, fences -3.75/18.25): 40 outlier, whisker 14 under both. Unchanged claims (box = middle 50%, median line, side-by-side boxes by factor level = NIST 'check the significance of a factor') re-read. Links and figure embed resolve. F-001 and F-002 closed; no open findings.
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (basic box plot to min/max; 'Box plots with fences' L1/U1 = 1.5 IQ, L2/U2 = 3.0 IQ), fetched 2026-10-05 (page carries a per-request Cloudflare token, so its hash differs per fetch), sha256:67a9ab2a3aa2c1cb4abee07ce91609e67053ef2b835dd70ffae07e513305bbdd — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §7.1.6 'What are outliers in the data?' (inner/outer fences; mild/extreme outliers; quartiles at the .25(N+1)th/.75(N+1)th ordered points), fetched 2026-10-05, sha256:9e80560e583c4042385b7fd9ce0dff91b8b4903487d3f65db517e5e231bd66b4 — https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §6 'Order Statistics' (fences q1 - 1.5 IQR / q3 + 1.5 IQR mark 'potential outliers'; five-number summary (x_(1), q1, q2, q3, x_(n)); 'lots of alternatives' to the sample-quantile definition), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html; R Documentation, grDevices::boxplot.stats (coef = 1.5 whiskers; hinges equal the quartiles for odd n), sha256:202dc113fa952aae23b87aef26e3eb28b384ae53bfa717dc3b86ef46949b78c3 — https://stat.ethz.ch/R-manual/R-devel/library/grDevices/html/boxplot.stats.html; R Documentation, stats::fivenum 'Tukey Five-Number Summaries' (minimum, lower-hinge, median, upper-hinge, maximum), sha256:4d4c9ba1a26a23b9793e1bcadf996ed096e7eb84bdca2c78d45b78ed44667719 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/fivenum.html
- note: Medium: rank-3 references; Hogg §4.4's own quartile convention (the syllabus reading) is not freely available.
