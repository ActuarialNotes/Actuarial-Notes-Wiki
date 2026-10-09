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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.11 p.193 (PDF p.205): indicated ILF = losses and LAE at H over B, assuming all underwriting expenses variable and variable expense and profit provisions not varying by limit; varying the profit provision by limit 'violates the assumption'. Bullet rewritten to say exactly that, and the fuller formulation (indemnity + ALAE + ULAE + risk load) is now attributed to Palmer (pp.3-4), whose risk load covers process and parameter risk varying by limit (pp.27-28).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Confirmed: 'Lee' is not in Werner, and Palmer cites Lee only for a graphical presentation (p.13), not a consistency test; neither text states the test. '(Lee)' is dropped and the bullet now derives the property from Palmer's LAS(k) = integral of S(x) from 0 to k (p.13): each extra dollar of limit adds S(x), which cannot rise. The bullet's 'buyer purchases a higher limit for less than it is worth' clause, unsourced, is deleted.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Werner Ch.11 p.193 (PDF p.205) re-read: assumptions are (i) all UW expenses variable, variable expense and profit not varying by limit; (ii) frequency and severity independent; (iii) frequency the same regardless of limit, with the personal auto high-limit counter-example. Bullet rewritten to that list; 'the severity distribution is the same at all limits' removed; GLM remark tied to Werner p.198.

## [F-004] Example asks for a layer whose ILF is not given, then prices a different layer
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Example 'Pricing a Higher Limit', question and answer
- claim: Price the $300K excess of $200K layer; the answer notes the ILF at $200K is not given and prices the $300K-$500K layer instead.
- evidence: The stem gives ILFs at 100K, 300K, 500K and 1M only, so the $300K xs $200K layer cannot be priced; the answer silently substitutes the $200K xs $300K layer (800 x (1.35 - 1.25) = $80). The question as set has no answer from its own data. Recomputed with the substituted layer: $80; tower 800 / 200 / 80 for 100K / 200K / 200K — per dollar 0.008 / 0.001 / 0.0004, decreasing.
- source_rank: 5
- proposed_action: Ask for the $200K excess of $300K layer, which the given ILFs price.
- applied: true
- fingerprint: f3515bd6425e

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Question now asks for the $200K excess of $300K layer and the answer prices it directly (800 x 0.10 = $80); the 'ILF at $200K is not given' sentence is removed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: ILF definition against Werner p.193 and Palmer pp.3-4 (LAS ratio under the frequency assumptions); basic limit of $100K now attributed to ISO per Palmer p.3; estimation bullet rewritten to Werner pp.194-198 (layer-by-layer LAS under censoring, lognormal/Pareto/truncated Pareto, ISO mixed exponential, GLMs) and Palmer p.3 (ILFs from broader experience applied to detailed basic-limit loss costs) — unsourced 'usually taken from ISO' removed; leveraged inflation against Werner p.197 and Palmer p.14 (+3.5%/+16.1%/+23.3% layers); consistency derived from Palmer's LAS integral; assumptions per Werner p.193. Examples recomputed: 800 x 1.35 = 1,080; 800 x 0.10 = 80; 800 x 0.25 = 200; marginals 0.00200/0.00060/0.00060 — flat now described as possible only if S(x) is constant from 250K to 1M; closing paragraphs on fixed expense and risk load rewritten to Werner's assumption and Palmer's risk load.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 pp.192-198 (PDF pp.204-210); Ch.6 pp.116-117 (PDF pp.128-129); Ch.9 p.161 (PDF p.173), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Palmer, Increased Limits Ratemaking for Liability Insurance (CAS study note, 2006), PDF pp.3-4, 13-14, 18, 27-28, sha256:44fcc71dbf33647fd07be04e515239989907eb894fc8df5fb18b541ebe301cf7 — https://www.casact.org/sites/default/files/database/studynotes_palmer.pdf
- note: Three findings fixed, F-004 found and fixed. Medium: examples are vault-authored.
