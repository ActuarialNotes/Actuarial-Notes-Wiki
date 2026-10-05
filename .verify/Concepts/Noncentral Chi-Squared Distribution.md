---
target: Concepts/Noncentral Chi-Squared Distribution.md
created: 2026-10-05
---

## [F-001] Substitution rule for the noncentrality parameter drops the division by sigma^2
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: nit
- status: open
- locus: Quadratic forms bullet (line 31)
- claim: when Q/σ² is chi-squared for normal X_i, its noncentrality parameter is found by replacing each X_i in Q by its mean.
- evidence: Levine, STAT 517 Lecture 24 'Noncentral chi-squared and F-distributions' (Purdue, Spring 2016; the course reads Hogg, McKean & Craig), PDF p.4: 'let Q = Q(X1, ..., Xn) be a quadratic form in normally distributed variables s.t. Q/σ² ~ χ²_r(θ). Then, its noncentrality parameter is θ = Q(µ1, ..., µn)/σ²', sha256:f84259546359e3b92d9a0e6f2de41a7f4b445a3063739fdbefe1047f5a9214ae — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture24_STAT517.pdf. Substituting the means into Q alone gives Q(µ1, ..., µn) = θσ², which is θ only when σ² = 1. The page's lead formula θ = Σµi²/σ² and its ANOVA bullet θ = nΣ(µj − µ̄)²/σ² do divide by σ², and both worked examples recompute correctly (θ = 6 and θ = 6.75), so only this sentence is affected.
- source_rank: 3
- proposed_action: Reword to 'replacing each X_i in Q/σ² by its mean, i.e. θ = Q(μ_1, …, μ_n)/σ²'.
- applied: false
- fingerprint: 2fd3e1723849

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: independent python recomputation before comparing, plus Monte Carlo that does not depend on any library's noncentrality convention: example 1 theta = 6, E = 10, Var = 32, P(chi2(4,6) > 9.49) = 0.4699 (simulation of sum X_i^2/sigma^2 with the stated means: mean 9.99, var 32.08, 0.469); example 2 theta = 6.75, E[F] = 5.048 vs 15/13 = 1.154, power 0.5459 (simulation 0.546), n = 10: theta = 11.25 on (2,27), power 0.8173; convention check: the page's theta = sum mu^2/sigma^2 is Hogg's (Levine L24) and Dobson's (unit variance), and mean/variance/power all use it consistently; 2 table values diffed against the CAS tables PDF; all 7 wiki-link targets exist; 91 math spans render in KaTeX
- sources_checked: Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.4.2 items 4, 6, 7 printed pp.9-10 (PDF pp.26-27): non-central chi-squared chi2(n, lambda) with lambda = sum mu_i^2 for unit-variance normals, mean n + lambda, variance 2n + 4lambda; y'V^-1 y ~ chi2(n, mu'V^-1 mu) for y ~ MVN(mu, V); reproductive property (sum of independent chi2(n_i, lambda_i) is chi2(sum n_i, sum lambda_i)); §1.4.4 item 3 printed p.11 (PDF p.28): non-central F = ratio of non-central chi2/df to independent central chi2/df, mean larger than the central F's, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; Levine, STAT 517 Lecture 24 'Noncentral chi-squared, F, and multiple comparisons' (Purdue, Spring 2016; course reading Hogg, McKean & Craig), PDF pp.2-5: Y = (1/sigma^2) sum X_i^2 with X_i ~ N(mu_i, sigma^2) has mgf (1-2t)^(-r/2) exp(t theta/(1-2t)), t < 1/2, theta = sum mu_i^2/sigma^2; theta = 0 gives central chi2_r; theta = Q(mu_1..mu_n)/sigma^2 for a quadratic form with Q/sigma^2 ~ chi2_r(theta); noncentral F = r2 U/(r1 V) with U ~ chi2_r1(theta), V ~ chi2_r2 independent, sha256:f84259546359e3b92d9a0e6f2de41a7f4b445a3063739fdbefe1047f5a9214ae — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture24_STAT517.pdf; Levine, STAT 517 Lecture 25 'Analysis of Variance (ANOVA)', PDF pp.5, 8-9: one-way F = Q4/(b-1) over Q3/[b(a-1)]; under the alternative the noncentrality parameter is found by substituting means into the between-groups quadratic form, (a/sigma^2) sum beta_j^2, and F is noncentral F with that parameter, sha256:dcf94ad635982fc5cd206745bef2eb834f662f13ec8969e6d34e92ec51531750 — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture25_STAT517.pdf; Wikipedia, 'Noncentral chi-squared distribution' (oldid 1366665071, retrieved 2026-10-05), Definitions/Density/Properties: lambda = sum mu_i^2 for unit-variance normals, 'some references define lambda in other ways, such as half of the above sum, or its square root'; pdf = sum_i e^(-lambda/2)(lambda/2)^i/i! f_(k+2i)(x) (Poisson(lambda/2) mixture); mean k + lambda; variance 2(k + 2lambda); mgf exp(lambda t/(1-2t))/(1-2t)^(k/2) for 2t < 1; sums of independent noncentral chi-squares add k and lambda, sha256:37cf19212c3e70760508abf6874b9f4e1a55490a371581a016cbcf6e4c1cf455 — https://en.wikipedia.org/wiki/Noncentral_chi-squared_distribution; Wikipedia, 'Noncentral F-distribution' (oldid 1307839149, retrieved 2026-10-05), Moments: E[F] = nu2(nu1 + lambda)/(nu1(nu2 - 2)) for nu2 > 2, sha256:3221dec7e1010a7a57e943dfe0e0c49423dd331cefc752f6967ac1a50807fae7 — https://en.wikipedia.org/wiki/Noncentral_F-distribution; CAS Exam MAS-I Tables (version 01/15/2018): chi-square lower-tail 0.950, df 4 = 9.49 (PDF p.20); F(2,15) upper 0.05 = 3.682 (PDF p.18); the handout's statistical tables (PDF pp.16-20) are central t, F and chi-square only, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Hogg, McKean & Craig, Introduction to Mathematical Statistics, 8th ed. (Global Edition) — publisher eBook preview, Contents PDF p.9: §9.3 'Noncentral chi-square and F-Distributions' p.536 (body not in preview), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf
- note: Definition, mean, variance, MVN quadratic form, additivity and the noncentral F definition are confirmed by the syllabus reading Dobson §1.4 (rank 2); the mgf, Poisson-mixture density, noncentral-F mean and ANOVA power rest on rank-3 sources (Levine's Hogg-based lecture, Wikipedia) because Hogg §9.3's body is not freely available; hence medium. F-001 (nit) open: the substitution sentence omits the division by sigma^2. No exam page links this concept yet.

## [C-002] Inbound links added during this run
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- note: Correction to C-001's note ('No exam page links this concept yet'): while this pass ran, the working-tree Exam MAS-I (CAS).md gained [[Noncentral Chi-Squared Distribution|Noncentral chi-squared and F-distributions]] under Domain C 'Evaluating the Model' (line 194), and Concepts/Chi-Squared Distribution.md line 33 and Concepts/F-Distribution.md line 34 now link here. Their usage matches this page: Chi-Squared Distribution writes chi2(n, lambda) with lambda = sum mu_i^2 for N(mu_i, 1) variables, which is this page's theta with sigma = 1 (Dobson §1.4.2 item 4), and F-Distribution says the noncentral F's mean exceeds the central F's (Dobson §1.4.4 item 3).
