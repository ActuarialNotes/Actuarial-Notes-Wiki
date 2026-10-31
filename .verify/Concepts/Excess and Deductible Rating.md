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

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:18Z/81e2
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: delta of commit c7887a25 only (three new bullets and a Lee Diagram link bullet); older text verified 2026-10-17 against Bahnemann and Fisher et al., unchanged
- sources_checked: Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §5.1 eq.5.1, §5.2 eq.5.8, Examples 5.2 and 5.4, PDF pp.154-160; §6.2 franchise deductible eqs.6.35-6.36, Example 6.8, PDF pp.190-191, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §1, PDF p.48; Formula 3.8, PDF p.84; Lee diagrams PDF pp.65, 111-114, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Excess ratio: Bahnemann eq.5.1 gives E[Y]=E[X]-E[X;a] for the excess over a; dividing by E[X] gives R(L)=1-E[X;L]/E[X] (plain derivation); Fisher et al. Formula 3.8 p.84 states k=(E-E{A_D})/E word for word as the page quotes it. Franchise deductible: Bahnemann p.190 'eliminates all claims less than or equal to the deductible ... and claims in excess of d are paid in full'; the eliminated amount E[X;d]-d(1-F(d)) is the numerator of eq.6.36; p.191 'the premium credit for a franchise deductible is less than that for a straight deductible of equal size'. Pareto fit: Example 5.2 gives e(d)=(d+beta)/(alpha-1); recomputed Example 5.4 from the page's alpha=1+1/slope, theta=intercept/slope: 1+1/0.257335=4.886, 1208.50/0.257335=4696.2, matching Bahnemann's (4.88599, 4696.22); caution sentence quoted from p.160, sparse-data sentence from p.159. No exam-8 question numbers on the page (rule 10).
