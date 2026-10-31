---
target: Concepts/Policy Provision Changes.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: policy-year substitution vs Ch. 13 p. 283; restatement of each claim to new benefit levels vs W&M p. 100; AY phase-in (50% / 100%) vs W&M parallelogram for a change on policies written after the date; benefit changes kept separate from trend vs W&M p. 110; restatement example recomputed (3.4M eliminated, 42.5% LER, severity 11,500 vs 8,000); links resolve
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 p. 44 (policy limits and deductibles); Ch. 6 p. 76 (deductibles and retentions distort averages); Ch. 7 p. 96; Ch. 13 p. 283 (policy year instead of accident year after a change in limits or deductibles), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 100-104 (benefit changes, direct/indirect effects, restating claims, parallelogram for policies written after the change); Ch. 6 p. 110 (adjust trend data for benefit changes); Ch. 11 p. 199 (deductibles), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: No discrepancy found.

## [F-001] Indirect effects stated as certain where Werner says 'may'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- severity: minor
- status: open
- locus: ## Benefit changes in workers compensation, bullet 'Indirect effects'
- claim: A benefit that replaces more of the wage makes workers more inclined to file claims and gives claimants less incentive to return to work promptly, so claim frequency and duration rise.
- evidence: Werner Ch.6 p.101 (PDF p.113): 'There may also be an indirect benefit as workers may be more inclined to file claims and claimants may have less incentive to return to work in a timely manner. This is difficult to quantify accurately'; p.103 (PDF p.115): a decreased maximum 'may also' have an indirect effect whose strength depends on the economic environment and insured population. The page dropped every hedge and asserted the direction as fact.
- source_rank: 2
- proposed_action: Restore Werner's hedges: 'may make ... may rise ... may work the other way'.
- applied: true
- fingerprint: 99da91da34fa

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: sentence now reads 'may make workers more inclined to file claims and give claimants less incentive to return to work in a timely manner, so claim frequency and duration may rise; a benefit that replaces less may work the other way, and only on the workers whose benefit it changes.' The last clause is the formula's consequence (p.102: a lower maximum leaves the min-bound and between-limits workers' benefits unchanged).

## [F-002] App. D restatement: 'the latest year's own change' and the wage-inflation component
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- severity: minor
- status: open
- locus: ## Benefit changes in workers compensation, bullet 'Putting history on current benefit level'
- claim: Each accident year's indemnity losses are multiplied by the cumulative product of the annual benefit-level changes in the years after it, so the latest year's own change is not applied to it.
- evidence: Werner App. D Indemnity-2 (p.D-8, PDF p.401): col.(4) = [1.0 + (3 next row)] x (4 next row), Projected row = 1.000, so every year (not just the latest) excludes its own change: AY2014's factor 1.044 = 1.015 x 1.009 x 1.020 omits its own -28.6%, AY2013's 0.745 = 1.044 x 0.714 includes it. Col.(3) is the combined impact of col.(1) benefit level change and col.(2) wage inflation on benefits (p.D-2, PDF p.395: 'As indemnity benefits are tied to wage levels, the indemnity benefits change as wages change'), which the page did not say. Recomputed 1.029 x 1.015 = 1.044, 1.044 x 0.714 = 0.745.
- source_rank: 2
- proposed_action: 'so a year's own change is not applied to it'; add that Werner's annual figures combine the benefit-level change with the wage-inflation impact on benefits.
- applied: true
- fingerprint: 6c1b60f74727

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Applied in this run as proposed. The CAS Spring 2014 Q2 examiner's solution (benefit factor for 2011 = 1.015 x 1.005, the later years only) is consistent.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Whole page re-read; the new WC section diffed sentence by sentence against W&M Ch.6 pp.100-103 and App. D: compensation rate and min/max as % of SAWW (Table 6.5 assumptions); benefit = rate x wage floored/capped (Table 6.6 col.4-5 notes); direct effect = total after / total before - 1 (Table 6.6, -4.1%, recomputed 66,007/68,854 - 1 = -4.13%; 0.667 x 23,950 + 0.667 x 23,048 = 31,348; 23 x 833 = 19,159); max cut reaches only the 125%+ bands (p.102); indirect effects (p.101, p.103); App. D col.(4) cumulative factors recomputed. Unchanged sections stand on this morning's pass (same sources, same hash). Links resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 100-104 (PDF pp. 112-116), Tables 6.4-6.6; App. D pp. D-1-D-3, D-8 (PDF pp. 394-396, 401), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 p. 44; Ch. 6 p. 76; Ch. 7 p. 96; Ch. 13 p. 283, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Two minor findings opened and applied (indirect-effect hedges; App. D wording). 'A change in the minimum likewise reaches only the low-wage workers it binds' is not in Werner but follows from the Table 6.6 formula. Medium: vault-authored examples.
