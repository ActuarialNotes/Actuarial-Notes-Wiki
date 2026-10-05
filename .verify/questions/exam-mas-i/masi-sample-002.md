---
target: questions/exam-mas-i/masi-sample-002.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: high
- checks_run: blind solve from the question page before reading the solution page or vault file: W U-shaped = Test MSE, Y rising = Variance, Z = Squared Bias and X = Train MSE (Var + Bias^2 + 0.1 reproduces W at 2/15/25 knots only with Z) -> D; CAS key D (PDF p.4) = vault answer D; stem and all five options diffed word for word against PDF p.3 (identical up to markup); chart embed Media/Attachments/masi-sample-q2-knots-chart.png compared with the PDF's embedded image (xref 70, 734x474): same chart, upscaled to 1300x840, mean abs pixel difference 1.9/255; file present on origin/main so the raw URL resolves; alt text checked against a pixel digitisation of the PNG (W 1.29/1.13/1.29/1.89, X 1.00/0.95/0.80/0.41, Y 0.20/0.25/0.50/1.19, Z 1.00/0.79/0.70/0.60 at 2/5/15/25 knots): every reading, line style and crossing in the alt text agrees, and it is sufficient to answer from; explanation table re-run (W - Y - Z = 0.094, 0.088, 0.094, 0.103; Y + X at 25 = 1.60); CAS quotations verbatim against PDF p.4; decomposition checked against ISLR2 eq. 2.7; validate_content.py and question_lint.py clean
- sources_checked: CAS Exam MAS-I Sample Questions (as of 11/21/2017), Q2 and official solution, PDF pp.3-4, sha256:6f146ad2b2d0fd72746c551376572045246c317ae0ca8e189e3ffeffa79670de — https://www.casact.org/sites/default/files/2021-04/MASI_Sample_Questions.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), s.2.2.2 eq. (2.7) expected test MSE = Var + Bias^2 + Var(eps), PDF p.45 (printed p.34), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), p.5 Domain C tasks 1-9 and p.6 text references (James et al. Ch 1, 2 excl. 2.2.3, 3-7 as listed), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: On the 2026 MAS-I outline, Domain C: cubic-spline knots are James Ch 7 and the bias-variance trade-off is James 2.2.2. The outline excludes only 2.2.3 of Ch 2. The x-axis tick spacing in CAS's chart is not proportional: 2-to-5 spans the same width as 5-to-10, so the curves are plotted at 2, 5, 10, 15, 20 and 25 on an index axis. The alt text names the ticks without claiming a scale, and the answer does not depend on the spacing.
