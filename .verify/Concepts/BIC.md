---
target: Concepts/BIC.md
created: 2026-10-04
---

## [F-001] Missing condition: BIC compares only models fitted to the same data and response
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: body, bullet 'Lower BIC ... like AIC, it does not require nested models' (line 20)
- claim: Like AIC, BIC does not require nested models - with no condition on which models may be compared.
- evidence: R Core documentation 'AIC {stats}' (covers BIC; sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html): 'When comparing models fitted by maximum likelihood to the same data, the smaller the AIC or BIC, the better the fit ... Examples of models not "fitted to the same data" are where the response is transformed ... a comparison of a Poisson and gamma GLM being meaningless'. BIC also needs the same n: 'BIC is defined as AIC(object, ..., k = log(nobs(object)))'. The non-nested half is right (CAS Monograph 5 §6.2.2, PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf); the missing condition is the same one the AIC page lacks.
- source_rank: 3
- proposed_action: Add the condition: the models must be fitted by maximum likelihood to the same observations of the same, untransformed response. Authoring - not applied.
- applied: false
- fingerprint: bc56bac954f5

## [F-002] AIC called asymptotically efficient without the setting that makes it so
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: body, bullet on consistency (line 22)
- claim: BIC is consistent: as n grows it selects the true model (if among the candidates); AIC is not consistent but is asymptotically efficient.
- evidence: Ding, Tarokh & Yang, 'Model Selection Techniques - An Overview', IEEE Signal Processing Magazine 2018, §II and §III (PDF p.10, sha256:fd9744e006712c6d59f8da05f42769eeed90244d857e031cc70ec41d139446b6 — https://arxiv.org/pdf/1810.09583v1): AIC is 'asymptotically efficient ... in a nonparametric framework'; 'AIC is known to be inconsistent in a parametric framework where there are at least two correct candidate models. As a result, AIC is not asymptotically efficient in such a framework'; BIC 'is known to be consistent in selecting the smallest true data-generating model in a parametric framework' and is asymptotically efficient there. The BIC half matches; AIC's efficiency is stated unconditionally, and the source contradicts it in exactly the setting the sentence describes (true model among the candidates). Severity kept at minor: neither property is in the MAS-I/MAS-II readings (ISLR §6.1.3, printed p.235, calls these justifications 'beyond the scope of this book').
- source_rank: 3
- proposed_action: Qualify: AIC is asymptotically efficient when the true model is not among the candidates; when it is, BIC is consistent (and efficient) and AIC is neither. Authoring - not applied.
- applied: false
- fingerprint: e400d3c73d09

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: low
- checks_run: BIC = -2*l + p ln n and 'Schwarz' vs R doc ('SBC (Schwarz's Bayesian criterion)'), Monograph 5, Ding eq (10); numeric check vs STAT 504 SAS output (923.1762 + 2 ln 173 = 933.4828, matches); ln n > 2 for n > 7 vs ISLR p.234 (e^2 = 7.39); smaller models than AIC vs ISLR p.234 and Monograph 5 p.77; consistency/efficiency vs Ding p.10 (F-002); same-data condition vs R doc (F-001); Fall 2019 Q32 recomputed, CAS key A; example recomputed (AIC 410/424, BIC 423.03/429.21); links resolve; figure checked by SVG title/labels only
- sources_checked: R Core Team, R documentation 'AIC {stats}' (R-devel manual), Description and Details, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.2 PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Ding, Tarokh & Yang, 'Model Selection Techniques - An Overview', IEEE Signal Processing Magazine 2018 (arXiv:1810.09583v1), §II-A eqs (8)-(10) PDF pp.5-6, §II-E/§III PDF p.10, sha256:fd9744e006712c6d59f8da05f42769eeed90244d857e031cc70ec41d139446b6 — https://arxiv.org/pdf/1810.09583v1; Penn State STAT 504, Lesson 9 'Poisson Regression', SAS output for the horseshoe-crab width model (Full Log Likelihood -461.5881, AIC 927.1762, AICC 927.2468, BIC 933.4828; n = 173, 2 parameters), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506 — https://online.stat.psu.edu/stat504/Lesson09; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6.1.3 (printed pp.232-235, PDF pp.240-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Fall 2019, Q32 — official exam paper (scan), PDF p.36; Final Answer Key PDF p.50 (A), sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf
- note: Verified with LOW confidence: one major (F-001 missing same-data condition) and one minor (F-002 AIC efficiency unqualified) open. Scaling: the page states the likelihood form; see the AIC page's note for ISLR's sigma-hat^2 form.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Non-nested bullet now carries the condition: the models must be fitted by maximum likelihood to the same data - the same n observations of the same, untransformed response (a model for ln Y cannot be compared with one for Y, nor a Poisson GLM with a Gamma GLM). Source: R Core documentation 'AIC {stats}', Details ('When comparing models fitted by maximum likelihood to the same data, the smaller the AIC or BIC, the better the fit ... the response is transformed ... a comparison of a Poisson and gamma GLM being meaningless'; 'BIC is defined as AIC(object, ..., k = log(nobs(object)))', so n must be the same), sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Consistency/efficiency bullet rewritten with the setting of each property: when the true model is among the candidates, BIC is consistent (selects the smallest true model with probability approaching 1 as n grows) and AIC is not consistent when a larger candidate also contains the true model; when the true model is not among the candidates, AIC is asymptotically efficient (its chosen model predicts asymptotically as well as the best candidate). Source: Ding, Tarokh & Yang 2018, §II PDF p.2 (parametric framework = the true distribution is in the model class, nonparametric = it is excluded) and PDF p.10 ('AIC ... is asymptotically efficient ... in a nonparametric framework ... the predictive performance of its selected model is asymptotically equivalent to the best offered by the candidate models'; 'BIC ... is known to be consistent in selecting the smallest true data-generating model in a parametric framework'; 'AIC is known to be inconsistent in a parametric framework where there are at least two correct candidate models'), sha256:fd9744e006712c6d59f8da05f42769eeed90244d857e031cc70ec41d139446b6 — https://arxiv.org/pdf/1810.09583v1.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: every edit re-read: same-data and same-n condition vs R AIC doc Details; consistency/efficiency settings vs Ding pp.2 and 10; BIC = -2l + p ln n vs Monograph 5 p.77 and R doc (k = log(nobs)); 'Schwarz' vs R doc ('SBC (Schwarz's Bayesian criterion)'); ln n > 2 for n > 7 and smaller models vs ISLR p.234 and Monograph 5 p.77; numeric check vs STAT 504 (923.1762 + 2 ln 173 = 933.4828, matches); example recomputed in python (AIC 410/424, BIC 423.03/429.21); links resolve; figure not re-checked (generated, out of scope)
- sources_checked: R Core Team, R documentation 'AIC {stats}' (R-devel manual, stats 4.6.0), Description and Details, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.2 PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Ding, Tarokh & Yang, 'Model Selection Techniques - An Overview', IEEE Signal Processing Magazine 2018 (arXiv:1810.09583v1), §I PDF p.2 (frameworks); eq.(10) PDF p.5; §III PDF p.10, sha256:fd9744e006712c6d59f8da05f42769eeed90244d857e031cc70ec41d139446b6 — https://arxiv.org/pdf/1810.09583v1; Penn State STAT 504, Lesson 9 'Poisson Regression', SAS output for the horseshoe-crab width model (Full Log Likelihood -461.5881, AIC 927.1762, AICC 927.2468, BIC 933.4828; deviance df 171, n = 173, 2 parameters), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506 — https://online.stat.psu.edu/stat504/Lesson09; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6.1.3 printed pp.232-235 (PDF pp.240-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Resolve run: F-001 and F-002 fixed and closed. Medium: the conditions and asymptotic properties rest on rank-3 references (R documentation, Ding et al.); ISLR (rank 2) calls these justifications beyond its scope.
