---
target: Concepts/Categorical Predictor.md
created: 2026-10-04
---

## [F-001] 'Categorical' restricted to unordered levels; Dobson & Barnett use it for nominal and ordinal
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: lead definition (line 14); table row 'Categorical (nominal)' (line 18)
- claim: A Categorical Predictor is an explanatory variable whose values fall into a finite set of unordered groups, contrasted with an ordinal predictor.
- evidence: Dobson & Barnett, An Introduction to GLMs 4th ed., §1.2 (printed p.2, PDF p.19 of the publisher preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf): 'Nominal and ordinal data are sometimes called categorical or discrete variables'; a qualitative explanatory variable 'is called a factor and its categories are called the levels'. The CAS MAS-I 2026 outline Task C5 (PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf) lists 'categorical, ordinal, and continuous predictors' as three kinds, which is the page's usage. The two syllabus sources use the word in different senses; the page gives the outline's as the only one. A terminology difference to flag, not an error to reconcile.
- source_rank: 2
- proposed_action: Add a note that Dobson & Barnett call both nominal and ordinal variables categorical, while the CAS outline lists categorical and ordinal separately; keep the page's working definition. Authoring - not applied.
- applied: false
- fingerprint: e427205fe0fc

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: k-1 dummies and baseline vs ISLR p.86 ('always one fewer dummy variable than the number of levels'; baseline); reference level in the intercept vs ISLR (3.30); nominal/ordinal/continuous terminology vs Dobson §1.2 and outline C5 (F-001); banding trade-off vs Monograph 5 §5.4.2; example recomputed (e^0.20 = 1.2214, e^-0.10 = 0.9048); links resolve; figure checked by SVG title/labels only
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 Qualitative Predictors (printed pp.83-87, PDF pp.93-97), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, §1.2 Scope (printed p.2, PDF p.19), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 5, PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.4 categorical variables and base level PDF pp.22-26; §5.4.2 binning continuous predictors PDF pp.59-60, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Verified, medium: one minor terminology finding open (F-001).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Added a terminology bullet, keeping the page's working definition: the CAS outline lists categorical, ordinal and continuous predictors as three kinds (the sense the page uses), while Dobson & Barnett call nominal and ordinal variables alike categorical, and call a qualitative explanatory variable a factor and its categories its levels. Sources: Dobson & Barnett 4th ed. §1.2, printed p.2 (PDF p.19 of the publisher preview: 'Nominal and ordinal data are sometimes called categorical or discrete variables'; 'A qualitative, explanatory variable is called a factor and its categories are called the levels for the factor'), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; CAS MAS-I Content Outline 2026 Task C5, PDF p.5 ('Distinguish among categorical, ordinal, and continuous predictors and their interactions'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: new terminology bullet re-read against Dobson p.2 and outline C5; k-1 dummies and baseline vs ISLR p.86 ('always one fewer dummy variable than the number of levels'; 'known as the baseline'); reference level absorbed into the intercept vs ISLR (3.30); interaction lets one effect differ by the other's level vs ISLR (3.35); banding trade-off (freedom vs parameters) vs Monograph 5 §5.4.2; log-link relativity e^beta vs Monograph 5 PDF p.21; example recomputed (e^0.20 = 1.2214, e^-0.10 = 0.9048); links resolve; figure not re-checked (generated, out of scope)
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed p.2 (PDF p.19), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 Qualitative Predictors, printed p.86 (PDF p.96); §3.3.2 printed pp.88-90 (PDF pp.98-100), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §1.2 log-link relativities PDF p.21; §5.4.2 Binning Continuous Predictors PDF pp.59-60, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Resolve run: F-001 closed. Medium: banding and log-link relativities rest on CAS Monograph 5 (rank 3); the example is the vault's own.

## [C-003] Locator correction for the CAS Monograph 5 source in this run's pass
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- note: This run's pass cites CAS Monograph 5 '§1.2 log-link relativities PDF p.21'. The section number is wrong: PDF p.21 is in §2.4.1 'Treatment of Continuous Variables' (log-link relativity as an exponent of the coefficient), and the base-level / indicator-column treatment of a categorical variable that the check relied on is §2.4.2 'Treatment of Categorical Variables', PDF pp.22-23 (re-read this session; sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf). The verdict is unchanged.
