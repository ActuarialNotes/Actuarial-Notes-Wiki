---
target: Concepts/Marginal Model Plot.md
created: 2026-10-04
---

## [F-001] 'Raw residuals on the link scale' misdescribes GLM residuals
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 4
- claim: 'Especially useful for GLMs, where raw residuals on the link scale can be harder to interpret directly than a comparison of fitted-vs-actual curves'
- evidence: Raw residuals are on the response scale: Goldburd et al. §6.3 p.67 defines the raw residual as 'the difference between actual and expected, or y_i - mu_i'; the residual on the link scale is the working residual, (y_i - mu_i)g'(mu_i) (§6.3.2 p.70). The car reference manual's entry for mmps (Weisberg; Cook & Weisberg 1997) describes the plot and says that for GLMs the smoother is a GAM with the model's family and link, but gives no residual-scale rationale; nothing read for this page supports the sentence as worded. sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf
- source_rank: 3
- proposed_action: Correct the scale (raw residuals are y - mu-hat on the response scale) and source the 'especially useful for GLMs' rationale, or drop it.
- applied: false
- fingerprint: 2e1ca969e6fb

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Definition vs car::mmps (Fox & Weisberg; Cook & Weisberg 1997 is cited there): response on the vertical axis against a linear combination u of the regressors, with a smooth of the data and a smooth of the fitted values on u, so both curves are on the response scale; drawn versus each term and versus the fitted values (linear predictor for a GLM); for GLMs the model smooth is a GAM with the same family and link - agrees with the lead, the formula line and bullets 1-3; disagreement of the two smooths = misspecified mean (model structure, interaction, transformation) is the plot's purpose. Bullet 4's residual-scale wording (F-001). Example (linear vehicle-age term, data smooth curving up at both ends) -> quadratic or banded term: consistent with the plot's reading. Figure (generated, marginal_model_plot): observed polyline rising and falling against a straight fitted line that misses both ends - matches alt text. Links resolve exactly.
- sources_checked: Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026): mmps 'Marginal Model Plotting' pp.89-91 (response vs a linear combination u of the regressors, with a smooth of the data and a smooth of the fitted values on u; drawn versus each term and versus the fitted values/linear predictor; GLM smoother is a GAM with the model's family and link); avPlots 'Added-Variable Plots' pp.11-14 (examples contrast 'marginal plot, ignoring other predictors' with 'AV plot, adjusting for others'); crPlots 'Component+Residual (Partial Residual) Plots' p.39, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5): §2.4.1 logging continuous variables pp.11-12 (PDF 21-22); §2.4.3 base level p.15; §6.1.2 scaled deviance D* = 2(ll_sat - ll_model) p.63 (PDF 73); §6.2 F-test, AIC, BIC pp.64-67; §6.3.1 deviance residuals, q-q plot, discrete-distribution caveat pp.67-69 (PDF 77-79); §6.3.2 binned working residuals pp.70-73; §6.4 Cook's distance, CV, bootstrap p.74; §7.1 actual vs predicted on holdout pp.75-76; §7.2.1 quantile plots p.77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (p.7), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: One minor finding open (F-001). Medium: the only source for the plot itself is the car reference manual (rank 3); no MAS-I syllabus reading that is freely available covers marginal model plots (Dobson's body not checked), and Cook & Weisberg (1997, JASA) is paywalled. Linked only by MAS-I C8.
