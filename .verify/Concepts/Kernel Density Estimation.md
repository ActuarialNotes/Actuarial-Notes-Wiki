---
target: Concepts/Kernel Density Estimation.md
created: 2026-10-05
---

## [F-001] Edge-convention bullet over-reads what the Spring 2019 Q20 key implies
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'An observation exactly b from x'
- claim: The CAS answer key to MAS-I Spring 2019 Q20 counts such an observation, treating the window as the closed interval [y - b, y + b]; some texts write the uniform kernel on a half-open interval.
- evidence: CAS Exam MAS-I Spring 2019 Q20 (PDF p.24; sample 400, 600, 900, 1100, 1200; x = 800; b = 300) with Final Answer Key PDF p.50: key D (z in [0.0003, 0.0004)). Recomputed: triangular estimate = (100 + 200 + 0)/(5 x 300^2) = 0.000667; rectangular counting 1100 (= x + b) = 3/(5 x 600) = 0.001, z = 0.000333 -> D; rectangular excluding 1100 = 2/3000, z = 0 -> A. So the key requires counting an observation lying exactly b ABOVE x (x_i = x + b, i.e. x at the lower edge of that observation's window). The paper has no observation at x - b (400 is 400 away), so the key is silent on the other edge: it is equally consistent with the half-open window (x - b, x + b] that Loss Data Analytics writes in its eq. (4.2), I(x - b < X_i <= x + b) (§4.1.1.4). The convention the key rules out is LDA's Table 4.1 / eq. (4.3) form w(u) = 1/2 I(-1 < u <= 1) with u = (x - X_i)/b, which drops x_i = x + b and gives A — LDA's two forms disagree at exactly this edge (a conflict inside that source, noted, not a vault error). The page's practical guidance (count it) matches the key for the case tested, and the page's own example (x = 600, edge observation 800 = x + b) is the same side; the over-reach is only in saying the key implies the full closed interval. Tse §11.1.2 (the assigned reading) was not reachable to see its own kernel definition.
- source_rank: 1
- proposed_action: Narrow the attribution: say the key (D) requires counting an observation exactly b above x (x_i = x + b), and that a convention excluding it gives z = 0 (option A); do not attribute the full closed interval to the key unless Tse §11.1.2 is checked and defines the kernel on -1 <= u <= 1.
- applied: false
- fingerprint: 829b859d2793

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: estimator, kernel shapes and kernel CDF checked against LDA §4.1.1.4; triangular W(u) derived by integrating w (rank 5); Spring 2019 Q20 recomputed blind (counting 1100 = x+b: z = 0.000333 -> D; excluding it: z = 0 -> A) and compared with key D; example 1 recomputed in python before comparing (rectangular 0.0020, triangular 0.00125, Gaussian phi values 0.1295/0.3011/0.3521/0.3521/0.2420, sum 1.3768, estimate 0.00138); example 2 (uniform contributions 1/0.875/0.625 -> 0.5000; triangular 1/0.96875/0.71875 -> 0.5375; empirical 0.6); links resolve exactly
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch 4 'Model Selection and Estimation', §4.1.1.4 Density Estimators: eq. (4.2) f_n(x) = (1/2nb) sum I(x-b < X_i <= x+b), eq. (4.3) f_n(x) = (1/nb) sum w((x-X_i)/b), Table 4.1 kernels (uniform 1/2 I(-1<x<=1), triangle (1-|x|) I(|x|<=1), Gaussian phi), kernel CDF estimator F~_n(x) = (1/n) sum W((x-X_i)/b) with uniform W(y) = (y+1)/2 on [-1,1), bandwidth trade-off (smaller b more volatile, larger b smoother), Example 4.1.5 triangular kernel, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; CAS Exam MAS-I Spring 2019, Q20 — official exam paper (scan), PDF p.24; Final Answer Key PDF p.50 (Q20 = D), sha256:02debe7c986ee38d3f484b277d0dc4a08ec424d0bb3b868b4890e4edb9312274 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents p.x (PDF p.12): §11.1.2 Kernel estimation of probability density function p.306, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Tse Section 11.1 assigned (Domain B), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Formulas and both examples check out. F-001 (minor) open: the bullet on an observation exactly b from x attributes the full closed window to the Spring 2019 Q20 key, which only requires counting an observation exactly b above x. Loss Data Analytics is internally inconsistent at that edge (eq. 4.2 vs Table 4.1 with eq. 4.3) - a conflict inside a rank-3 source, recorded in F-001's evidence, not a vault error. Tse §11.1.2's own kernel definition not reachable.
