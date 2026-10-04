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
