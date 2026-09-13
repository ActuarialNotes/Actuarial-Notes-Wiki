---
target: Concepts/Increased Limits.md
created: 2026-09-13
---

## [F-001] Risk load described as part of Werner's ILF formulation; Werner treats it as a departure from the assumptions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: minor
- status: open
- locus: Bullet 2 ('Werner's fuller formulation includes more than indemnity in each layer...')
- claim: 'Werner's fuller formulation includes more than indemnity in each layer: ALAE, a risk load for the greater volatility of high layers, and sometimes ULAE.'
- evidence: Werner & Modlin Ch. 11 p.193 (PDF p.205) gives the indicated ILF as (L+E_L)_H/(L+E_L)_B - losses and LAE, so the LAE half of the claim is right. The risk load is not part of that formulation: Werner states the formula holds 'Making the assumption that all underwriting expenses are variable and that the variable expense and profit provisions do not vary by limit', and then says 'Actuaries may elect to vary the profit provision by limit, which violates the assumption in the previous paragraph', explaining it as a response to the volatility of high limits. A risk load is therefore an optional departure from Werner's stated ILF, not a component of it, and the word 'Werner's' in front of 'fuller formulation' misdescribes the source. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Say that Werner's indicated ILF is the ratio of limited losses and LAE, and that varying the profit provision by limit (a risk load) is a departure Werner notes rather than part of the formula.
- applied: false
- fingerprint: 136810b48417

## [F-002] Consistency test attributed to Lee; the attribution is not checkable in the syllabus text
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: minor
- status: open
- locus: Bullet 4, 'Consistency test (Lee).'
- claim: The marginal-cost-must-decrease test for an ILF table is attributed parenthetically to Lee.
- evidence: The regex \bLee\b returns zero hits in the full Werner & Modlin text, and the phrase 'consistency test' appears only in Appendix F (PDF pp.416-419), where it means the multivariate diagnostic that checks a rating variable's relativities across individual years - a different test entirely. Werner's ILF section (Ch. 11 pp.193-198, PDF pp.205-210) never states a consistency requirement on an ILF table. The test as the page describes it is standard and the page's own worked example applies it correctly; what is unsourced is the attribution, which a reader cannot follow up from the Exam 5 reading list as printed. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Give the actual citation for the test (e.g. the ISO increased-limits literature) or drop the parenthetical, since it is not in Werner.
- applied: false
- fingerprint: 079c8473ee0c

## [F-003] Assumption list omits Werner's expense/profit-provision assumption and restates the frequency one
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: minor
- status: open
- locus: Bullet 6 ('The assumptions behind an ILF table matter...')
- claim: 'frequency is independent of severity, the severity distribution is the same at all limits, and there is no adverse selection by limit' - three assumptions.
- evidence: Werner & Modlin Ch. 11 p.193 (PDF p.205) states the assumptions in this order: (i) 'all underwriting expenses are variable and ... the variable expense and profit provisions do not vary by limit'; (ii) 'frequency and severity are independent'; (iii) 'the frequency is the same regardless of the limit chosen', with the counter-example that personal auto insureds selecting very high limits tend to have lower accident frequencies. The page carries (ii) and paraphrases (iii) as 'no adverse selection by limit', but omits (i) entirely - the one assumption that explains why an ILF may be applied to the rate rather than only to the loss cost, and the one the page's own bullet on risk load depends on. 'The severity distribution is the same at all limits' is implied by the single-LAS-curve construction but is not one of Werner's stated assumptions. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: Add Werner's expense/profit-provision assumption to the list and align the wording of the frequency assumption with p.193.
- applied: false
- fingerprint: b75d2d8fad45
