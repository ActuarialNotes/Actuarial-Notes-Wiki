---
target: Concepts/Univariate Plot.md
created: 2026-10-04
---

## [F-001] Claims a unimodal and a bimodal symmetric sample always share the same five numbers
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: example 'When the Histogram and the Box Plot Disagree', answer
- claim: The five numbers behind a box plot (min, Q1, Q2, Q3, max) are identical for a symmetric unimodal sample and a symmetric bimodal one, so a box plot simply cannot show two humps.
- evidence: The conclusion holds (a box plot draws only the five numbers and outliers — Siegrist, Random, Ch.6 §6 'Order Statistics', sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html; multiple modes are what a histogram shows — NIST §1.3.3.14, sha256:5dd49706cfe4151a32e35dcae8bf63d421ba68685abf7473588776c7830f065a). But the stated premise is universal and false: recomputed, N(0,1) has Q1, Q3 = -0.674, +0.674 while the symmetric bimodal mixture 0.5 N(-2, 0.5^2) + 0.5 N(2, 0.5^2) has Q1, Q3 = -2.000, +2.000. The five numbers can coincide for a unimodal and a bimodal sample, which is why a box plot cannot distinguish them; they are not in general identical (rank-5 recomputation falsifies the universal claim).
- source_rank: 3
- proposed_action: Say the five numbers can be identical (a unimodal and a bimodal sample can share them), rather than that they are.
- applied: false
- fingerprint: 24cec89dd030

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: one-variable display of centre/spread/shape/outliers = NIST §1.3.3.14 (histogram summarises a univariate data set: centre, spread, skewness, outliers, modes); table rows: histogram -> shape/multimodality (NIST), box plot -> five-number summary/outliers/groups (Siegrist §6.6, NIST §1.3.3.7), ECDF F(x) = (1/n)#{x_i <= x} = Siegrist §6.6 (NIST §1.3.5.16 describes the same step function rising 1/N at each ordered point), QQ plot -> distributional fit (Larsen p.1-2), bar chart of category counts (ISLR §2.3.5 summary() counts per category); ECDF needs no bin width or whisker rule = by those definitions; continuous vs count vs categorical = Siegrist §6.1; overdispersion when variance exceeds the Poisson mean = Larsen p.1; examples worked first — classification of claim count / severity / territory and the box-plot-vs-histogram point — conclusions agree, premise of example 2 overstated (F-001); links and figure embed resolve; figure builder checked (histogram + smooth CDF + box, schematic); scope = MAS-I outline task C9 ('univariate' plots).
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 'Histogram' (definition, count and density normalisations, questions answered), sha256:5dd49706cfe4151a32e35dcae8bf63d421ba68685abf7473588776c7830f065a — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 'Box Plot' (basic box plot; 'Box plots with fences'), sha256:545e917efab8aae10425dd289461c519de359120fd39d6dc94efa8c324e1f783 — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.5.16 'Kolmogorov-Smirnov Goodness-of-Fit Test' (ECDF definition), sha256:2202a8f4db6dc914c738745ac9f02af75ec55eda274db29280de5c5a5d127c0d — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35g.htm; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §6 'Order Statistics' (sample quantiles and alternatives, IQR, fences, five-number summary, boxplot, empirical CDF), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §1 'Introduction' (type and level of measurement: continuous/discrete, nominal, ordinal), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html; Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §2.3.5 lab (hist(), pairs(), summary() incl. counts per category for qualitative variables), printed pp.50-52 (PDF pp.61-63), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Medium: definitions confirmed by rank-3 references and Larsen; advice such as plotting exposure by level is practice guidance, not found in a source read. One minor finding open.
