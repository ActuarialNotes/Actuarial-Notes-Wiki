---
target: Concepts/Excess and Deductible Rating.md
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
- sources_checked: Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §5.1, inflation section, Ch.6, PDF pp.154-155, 165-167, 174-176, 181-183, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §5, PDF pp.27-29, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §9.1, PDF pp.99-100, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Bahnemann §5.1 (excess of a limit, E[X]-E[X;a], truncated from below and shifted), §5.x inflation (a fixed underlying limit magnifies, or leverages, claim-size trend on aggregate excess loss, PDF pp.165-167), Ch.6 (ALAE in the claim amount, expense/risk loads, consistent ILFs, risk load for volatile excess layers, PDF pp.174-176, 181-183). Fisher Ch.2 §5 (large deductibles: per-occurrence limit required, aggregate optional, no minimum, reimbursements not premium so lower taxes, high-deductible premium looks large because expenses and risk load remain; WC statutory limits essentially unlimited). Goldburd §9.1 (coverage options outside the GLM). Examples recomputed: Pareto LEVs 33,333.33 -> 35,483.87 (+6.5%), layer 2,164.50 -> 2,583.15 (+19.3%); large-deductible premium 425,000/0.97 = 438,144, insured cost 978,144, GC 1,010,309, saving 32,165 = tax 17,165 + risk provision 15,000.
