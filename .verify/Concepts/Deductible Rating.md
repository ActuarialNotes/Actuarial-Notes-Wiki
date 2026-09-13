---
target: Concepts/Deductible Rating.md
created: 2026-09-13
---

## [F-001] Attributes to Werner a loss-cost-only application of the LER that Werner does not make
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: minor
- status: open
- locus: Bullet 1 ('The relativity applies to the loss portion of the rate...'), final sentence
- claim: 'Werner's formulation applies the LER to the loss cost and re-loads expenses afterwards.'
- evidence: Werner & Modlin, Basic Ratemaking Ch. 11 p.200 (PDF p.212) derives the deductible relativity as: 'Using the assumptions that all expenses are variable and that the variable expenses and profit are a constant percentage of premium, the indicated deductible relativity for deductible D is given by ... (L+E_L)_D/(L+E_L)_B', restated as 'Indicated Deductible Relativity = (1.0 - LER(D))'. That relativity is applied to the rate, under an explicit all-expenses-variable assumption; Werner nowhere re-loads fixed expenses after applying the LER. The underlying point the bullet makes is sound and is the standard objection to the all-variable assumption (Werner himself notes the consequences of the All Variable Approach for small vs large risks at Ch. 11 p.204, PDF p.216), but it is the page's argument, not Werner's formulation. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Attribute the loss-cost-only application to the page itself, and state Werner's actual assumption (all expenses variable, so the relativity applies to the whole rate) as the contrast.
- applied: false
- fingerprint: 1cc69022f17f

## [F-002] Behavioural-effects bullet attributes a caution to Werner that is not in the text
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: minor
- status: open
- locus: Bullet 4 ('Two behavioural effects...'), final sentence
- claim: 'Werner cautions that these [claims suppression and moral hazard reduction] are real but hard to quantify, and that credits set purely on LER tend to be conservative.'
- evidence: Searched the full Werner & Modlin text: 'moral hazard' occurs once, at Ch. 4 p.50 (PDF p.62), about exposure bases and self-declared mileage, never in the deductible section; 'suppress' occurs nowhere in the document. Werner's deductible discussion (Ch. 11 pp.199-202, PDF pp.211-214) lists four reasons deductibles are popular - premium reduction, elimination of small nuisance claims, incentive for loss control, control of catastrophic exposure - and under 'Other Considerations' notes only that insureds may not report claims obviously below the deductible, which is raised as a data-censoring problem, not as a reason LER credits are conservative. The two effects the bullet names are real and defensible, but the attribution and the 'conservative' conclusion are not sourced. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Drop the attribution to Werner, or replace it with what Werner does say (p.201, PDF p.213: ground-up losses may be unknown because insureds do not report claims below the deductible, leaving censored 'net' losses).
- applied: false
- fingerprint: 9503c9b02513
