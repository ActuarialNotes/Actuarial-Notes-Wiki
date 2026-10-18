---
target: Concepts/Workers Compensation Classification.md
created: 2026-10-17
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- status_set: verified
- confidence: medium
- checks_run: definition, formulas and every bullet checked against the routed reading pages; every worked example recomputed before comparison; [[links]] and $$ balance checked
- sources_checked: Robertson, NCCI's 2007 Hazard Group Mapping (Variance 3:2, 2009), abstract, §1, Tables 3-4, PDF pp.1-2, 7-9, sha256:458f17d0e4279114ba2c895fd4c7a5bf58de1ebf82fbd27d60ef08af120e3d4b — https://www.casact.org/sites/default/files/2021-07/NCCI-2007-Hazard-Robertson.pdf; Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), PDF pp.1-3, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf; Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §6.4.1 fn.33, PDF p.92, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf; Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), Ch.6 intro, PDF p.174, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §10.1, PDF pp.105-106, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Robertson (2009): about 800 classifications in NCCI states; seven hazard groups implemented at the beginning of 2007, replacing four; weighted k-means on credibility-weighted excess ratios at five limits (100,000 to 5,000,000); excess loss factors used in class ratemaking and in retrospectively rated policies with per-claim limits. Couret & Venter: classes by industry; serious injury types rare and correlated; multi-dimensional credibility by class; seven hazard groups the industry standard. Chalk fn.33: very small WC classes grouped for ratemaking. Bahnemann ch.6: payroll the WC exposure unit. Goldburd §10.1: GLMM shrinkage = Buhlmann-Straub. Examples recomputed: 190,000 + 750 = 190,750; 1 - 0.25/9.50 = 97%; Z 0.40 -> 2.72. Governing-class/exception rules and the Canadian boards are a finding.

## [F-001] Classification rules and Canadian boards not in any reading checked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-17T23:22Z/5d3a
- date: 2026-10-17
- severity: minor
- status: open
- locus: How employers are classified bullet; last bullet
- claim: Employers are classified by their business (the governing classification), with standard exceptions such as clerical office employees and outside salespersons rated separately; in Canada WC is run by provincial boards that assess employers by industry rate group.
- evidence: Searched Robertson (2009), Couret & Venter, Chalk et al., Fisher et al. and Bahnemann: none states the governing-classification rule, the standard exceptions, or the Canadian board structure (Robertson only says the classification is based on the type of business and operations, PDF p.2). These are NCCI Basic Manual / provincial-board facts that need their own source (DISC-RM or GI-302 reading).
- source_rank: 3
- proposed_action: Cite the NCCI Basic Manual (or the DISC-RM/GI-302 reading) for these rules in a pass for those exams.
- applied: false
- fingerprint: aa5d920afae9
