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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.11 p.200 (PDF p.212): the relativity (1 - LER) is derived assuming all expenses are variable and variable expense and profit are a constant percentage of premium. Bullet rewritten to say so, and the loss-portion point now rests on Werner Ch.9 p.161 (PDF p.173): where fixed expenses are material and not charged as a fee, include the fixed-expense loading, which flattens the indicated relativities. The attribution 'Werner applies the LER to the loss cost and re-loads expenses' is deleted.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Werner Ch.11 pp.202-203 (PDF pp.214-215): the LER approach assumes the same claiming behaviour at every deductible; an insured may not report a small net claim under a higher deductible for fear of a surcharge; self-selecting lower-risk insureds choose higher deductibles, so those policies may be more profitable; a Ch.9/10 analysis reflects the differences and the actuary may view both. The bullet is rewritten to that; 'claims suppression', 'moral hazard reduction' and the 'credits set purely on LER tend to be conservative' attribution are deleted.

## [F-003] Example says the profit load stops the rate falling by the full LER
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'Pricing a Deductible Option', closing note
- claim: The rate does not fall by the full LER because the $70 of fixed expense and the profit load ride on regardless.
- evidence: Recomputed: rate = (LC + 70)/0.71, so the ratio of two rates is (LC2 + 70)/(LC1 + 70); the variable expense and profit provisions (29% of premium) scale with the loss cost and cancel. Only the $70 fixed expense dampens the change: 530.10 -> 396.80 is -25.1% of loss cost, 845.21 -> 657.46 is -22.2% of rate. Werner Ch.9 p.161 (PDF p.173) makes the same point: it is the fixed expense loading that flattens relativities. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- source_rank: 2
- proposed_action: Attribute the dampening to the fixed expense only.
- applied: true
- fingerprint: 99276272cae2

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Note now reads: 'because the $70 of fixed expense rides on regardless — the variable expense and profit loads scale with the loss cost, so they fall in proportion.' Figures unchanged (25% of losses, 22% of premium).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Formulas against Werner's discrete and continuous LER (pp.200-202). Consistency bullet re-grounded on Werner's continuous eliminated-loss formula (derivative 1 - F(D)). Empirical vs fitted LERs and the net-loss data restriction (p.201). Behavioural bullet (pp.202-203). Inflation bullet against Werner p.202 (trend comments from the ILF section apply to deductibles) and Palmer's leveraged effect. Deductible recovery bullet rewritten to Werner's large-deductible considerations (p.303: reimbursement, processing cost, credit risk, rarely fully collateralized). Unsourced 'fit matters most for large deductibles' deleted. Example 1 recomputed: 530.10/480.50/396.80; 845.21/775.35/657.46; 0.140 and 0.079 per $1; Example 2: 0.53%/0.24%/0.28% per $100.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 pp.197-204 (PDF pp.209-216); Ch.9 p.161 (PDF p.173); Ch.15 p.303 (PDF p.315), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Palmer, Increased Limits Ratemaking for Liability Insurance (CAS study note, 2006), PDF pp.13-14, sha256:44fcc71dbf33647fd07be04e515239989907eb894fc8df5fb18b541ebe301cf7 — https://www.casact.org/sites/default/files/database/studynotes_palmer.pdf
- note: F-001, F-002 fixed; F-003 found and fixed. Medium: examples are vault-authored.
