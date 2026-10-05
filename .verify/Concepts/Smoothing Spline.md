---
target: Concepts/Smoothing Spline.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Formulas (7.11), (7.13) and the unnumbered LOOCV formula were rendered from the PDF as images, because the text extract garbles them: all four displayed formulas match. Loss+penalty, meaning of g'' and of the integral, lambda = 0 interpolates, lambda -> infinity gives the least squares line, natural cubic spline with knots at the unique xi shrunk by lambda, df_lambda as the trace of S_lambda falling from n to 2, n nominal parameters heavily constrained, choosing lambda by CV, LOOCV at the cost of one fit, analogy with (5.2) leverages, Wage 6.8 vs 16 df, backfitting in GAMs, span analogy: all checked against ISLR. LOOCV example: the table was regenerated independently from an exact Reinsch-form smoothing spline (S = (I + lambda K)^-1 for RSS + lambda times the integral of g''^2, x = 1..6). At lambda = 1 it reproduces every ghat and S_ii to 3 dp; at lambda = 0.2 it gives df 3.917 and RSScv 3.782, matching the stem's 3.92 / 3.78. From the table: df = 3.03, RSScv = 2.27, ordinary RSS = 0.678; LOOCV prefers lambda = 1. All match the answer. The I-IV example (I, II, III true; IV false) matches ISLR. 8 links resolve; LaTeX balanced.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.5 'Smoothing Splines', eqs (7.11)-(7.13), the LOOCV formula and Fig 7.8, printed pp.301-304 (PDF pp.309-312); eq (5.2), printed p.202 (PDF p.211); §7.6 span vs lambda, printed p.305 (PDF p.313); §7.7.1 backfitting, printed p.309 (PDF p.317), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Tibshirani, R., 'Splines' lecture notes, Advanced Methods for Data Analysis (CMU 36-402/36-608, Spring 2014), §1.1-1.4 pp.1-3 (kth-order spline with m knots: truncated power basis g1..g_{m+k+1}; natural spline of order k with knots t1..tm spanned by m basis functions; smoothing spline = penalised regression on the natural-spline basis with knots at every xi), sha256:c13ed5ee6e5dd83ac887822c8d3382780013343effeaacf09ccdebf620b6958b — https://www.stat.cmu.edu/~ryantibs/advmethods/notes/smoothspline.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Clean pass. The worked example's data are internally consistent with an actual smoothing-spline fit.
