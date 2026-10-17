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
