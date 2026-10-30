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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 4 ('Especially useful for GLMs, where raw residuals on the link scale ...') replaced by what the source says about GLMs: 'The same plot serves a GLM: the response stays on the vertical axis, the smoother is a generalized additive model with the model's own family, link and weights (the default in R's car::mmps), and the overall plot is drawn against the linear predictor.' The residual-scale rationale (no source) is gone. Support: Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026), mmps 'Marginal Model Plotting' pp.89-91: response on the vertical axis vs a linear combination u; 'fitted: ... in the direction of the fitted values for a linear model or the linear predictor of a generalized linear model'; 'For generalized linear models, the default smoother uses gamLine, fitting a generalized additive model with the same family, link and weights as the fit of the model', sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: bullet 4 now says only what car::mmps documents for a GLM (response stays on the vertical axis, GAM smoother with the model's family, link and weights, overall plot against the linear predictor) - re-read against car pp.89-91 this session. Rest of page re-read: definition and formula line (two smooths, data vs model, same axes), bullets 1-3 (car mmps), example (linear vehicle-age term missing curvature -> quadratic or banded term: Goldburd §5.4.2-5.4.3). Links resolve; figure embed Media/Figures/Marginal_Model_Plot.svg exists (generated; not re-reviewed in this phase).
- sources_checked: Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026), mmps 'Marginal Model Plotting' pp.89-91: response on the vertical axis vs a linear combination u of the regressors, with a smooth of the data and a smooth of the fitted values on u; drawn versus each term and versus the fitted values (linear predictor for a GLM); GLM smoother a GAM with the model's family, link and weights, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §5.4.1-5.4.3 pp.48-51 (non-linearity remedied by binning or polynomial terms), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: No open findings. Medium: the plot itself rests on the car reference manual (rank 3); no freely available MAS-I reading covers marginal model plots (Dobson's body not checked; Cook & Weisberg 1997 is paywalled).

## [F-002] Averaging-out claim not stated by the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-30T22:10Z/g8C-chk
- date: 2026-10-30
- severity: minor
- status: open
- locus: body, bullet 'One plot is not enough', last sentence
- claim: The plot against the linear predictor shows the mean response along that one direction, averaged over everything else, so misfits in individual terms can average out there
- evidence: Lindsey & Sheather, Stata Journal 10(2) 2010, pp.215-217 (https://ageconsearch.umn.edu/record/152305/files/sjart_st0189.pdf, sha256:72fdd15b952940164d31d7bd8fee1562d37f145642ab5d67611d493d4b3d5189) state only that fit is good if the lines match in each plot and not good if there is significant disparity in any, and that the model line estimates E_M(y|a'x) = E{E_M(y|x)|a'x}; no source read says term misfits 'average out'. Restated to what the source supports: the linear-predictor plot checks the fit along one direction only.
- source_rank: 3
- applied: true
- fingerprint: e2bfd71f9de6

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-30T22:10Z/g8C-chk
- date: 2026-10-30
- resolves: F-002
- status: resolved
- note: Restated in this run to what Lindsey & Sheather state: the linear-predictor plot's model line is the model's mean given that one combination of the predictors, averaged over everything else, so it checks the fit along one direction only; the 'average out' clause was cut.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-30T22:10Z/g8C-chk
- date: 2026-10-30
- status_set: verified
- confidence: high
- checks_run: Diff check: git diff against HEAD (last verified bytes) confined to the body, frontmatter untouched; question files read, no numbers, scenario or answer on the page; page keeps the concept-definitions shape. G8: MAS-I. Added bullet checked against Lindsey & Sheather pp.215-217; finding F-002 (averaging-out clause not in the source) restated in this run.
- sources_checked: Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026), mmps 'Marginal Model Plotting' pp.89-91: response on the vertical axis vs a linear combination u of the regressors, with a smooth of the data and a smooth of the fitted values on u; drawn versus each term and versus the fitted values (linear predictor for a GLM); GLM smoother a GAM with the model's family, link and weights, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §5.4.1-5.4.3 pp.48-51 (non-linearity remedied by binning or polynomial terms), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Lindsey & Sheather, 'Model fit assessment via marginal model plots', Stata Journal 10(2) 2010, pp.215-217 (k+1 plots, one per predictor and one for the linear form; good fit if lines match in each plot, not if significant disparity in any; model line E_M(y|a'x) = E{E_M(y|x)|a'x}), sha256:72fdd15b952940164d31d7bd8fee1562d37f145642ab5d67611d493d4b3d5189 — https://ageconsearch.umn.edu/record/152305/files/sjart_st0189.pdf
