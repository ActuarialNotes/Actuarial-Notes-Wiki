---
target: Concepts/Model Benchmarking.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), Ch.7 intro, §7.2-7.2.4, §3.9, PDF pp.44, 85-90, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §3.6-3.7.1, PDF pp.32-33, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf
- note: Goldburd Ch.7 intro: final-model selection techniques need only scored records, so a proprietary or non-GLM plan can be compared, and they are accessible to non-modellers (unlike Ch.6 deviance/AIC). §7.2: lift is a model's ability to prevent adverse selection, relative, measured on holdout data. §7.2.1 three quantile-plot criteria; §7.2.2 sort ratio, quantiles, first/last quantiles where the models disagree most, percent-error form with the flatter line centred at 0 winning; §7.2.3 loss ratio chart (perfect plan = equal loss ratios; accessible to all stakeholders); §7.2.4 Gini. §3.9 refresh between rebuilds. Chalk §3.7.1: the existing model is the benchmark to beat. Examples recomputed: model errors -4.9, -1.1, +1.0, +1.9, +1.7%; plan +19.5, +9.9, +1.0, -6.5, -15.8%; loss ratio chart -25% and +28%.

## [F-001] Loss ratio chart advantage overstated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- severity: nit
- status: open
- locus: What each plot cannot show, double lift sub-bullet
- claim: they are simple to understand and explain, which the quantile plots and double lift charts are not.
- evidence: Goldburd §7.2.3 p.80 (PDF 90): 'The advantage of loss ratio charts over quantile plots and double lift charts is that they are simple to understand and explain.' The monograph makes a comparison, not the claim that the other plots are not simple. Restated as 'simpler to understand and explain than'.
- source_rank: 2
- proposed_action: Restate as a comparison.
- applied: true
- fingerprint: f5bcd9566944

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated in this change as the monograph's comparison: 'simpler to understand and explain than quantile plots and double lift charts'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: delta check of the on-level sentence and the 'What each plot cannot show' bullet against Goldburd §5.1 and §7.2.1-7.2.4, read this session; no numbers added
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §5.1 p.46 (PDF 56, on-level premium for a loss ratio target); §7.2-7.2.4 pp.76-81 (PDF 86-91), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Delta pass; the rest of the page is as verified against Goldburd ch.7 and Chalk et al. Simple quantile plot: steps 1-6 p.77 sort on each model's own prediction and give two plots. Double lift: step 4 p.78 divides each quantity by its overall average (axis 'Relative Loss Cost'). Loss ratio chart: steps 1-3 p.79 plot the actual loss ratio only; p.80 its advantage is simplicity (restated under F-001). Gini: p.81 does not quantify profitability, only ability to differentiate best and worst risks. On-level: p.46 'it may be necessary to on-level the premium' for a loss ratio target.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: source list restated
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §5.1 p.46 (PDF 56, on-level premium for a loss ratio target); §7.2-7.2.4 pp.76-81 (PDF 86-91), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), Ch.7 intro, §7.2-7.2.4, §3.9, PDF pp.44, 85-90, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §3.6-3.7.1, PDF pp.32-33, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf
- note: Same run, same content: restates the block's sources as this run's delta sources plus the prior pass's sources, which still cover the page's unchanged content. No new checks.
