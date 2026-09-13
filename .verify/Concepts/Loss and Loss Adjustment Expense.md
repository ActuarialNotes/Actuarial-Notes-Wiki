---
target: Concepts/Loss and Loss Adjustment Expense.md
created: 2026-09-13
---

## [F-001] Trend factor 1.05^2.5 stated as 1.1294
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: minor
- status: open
- locus: Example 'Where Each Adjustment Belongs', step 3 and step 4
- claim: 1.05^2.5 = 1.1294, so 3,840,000 x 1.05^2.5 = 4,336,900 and 4,336,900 x 1.06 = 4,597,100.
- evidence: Independent recomputation: 1.05^2.5 = exp(2.5 x ln 1.05) = exp(0.1219754) = 1.1297263, not 1.1294; the page's factor is low by 0.0003. Carried through: 3,840,000 x 1.1297 = 4,338,048, i.e. 4,338,000 at the page's rounding, and 4,338,000 x 1.06 = 4,598,280, i.e. 4,598,300. Every other figure in the example reproduces exactly (5,000,000 - 2,000,000 = 3,000,000; 3,000,000 x 1.28 = 3,840,000). The sequence itself matches Werner & Modlin Ch. 6 printed p.94 (PDF p.106), which removes extraordinary losses first and replaces them with a long-term provision, and printed p.122 (PDF p.134), which applies the ULAE ratio last.
- source_rank: 5
- proposed_action: Use 1.1297, 4,338,000 and 4,598,300.
- applied: true
- fingerprint: 6767e43b1d2b

## [F-002] ULAE ratio denominator given as paid loss; Werner uses paid loss plus ALAE
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: minor
- status: open
- locus: bullet 2, ULAE
- claim: ULAE is 'estimated in aggregate - classically as a ratio of paid ULAE to paid loss'.
- evidence: Werner & Modlin Ch. 6 printed p.122 (PDF p.134): 'The procedure involves calculating the ratio of calendar year paid ULAE to calendar year paid loss plus ALAE over several years... This ratio is then applied to each year's reported loss plus ALAE'. The denominator includes ALAE, and the ratio is applied to loss plus ALAE that has already been adjusted for extraordinary events, development and trend. The page's own worked example does this correctly - it applies the 4% load to 650,000 + 78,000 = 728,000, giving ULAE of 29,120 - so the bullet contradicts the example three paragraphs below it. Recomputed: 757,120/1,200,000 = 63.09%, and 0.631/0.65 - 1 = -2.9%, both as printed.
- source_rank: 2
- proposed_action: Change 'a ratio of paid ULAE to paid loss' to 'a ratio of calendar-year paid ULAE to calendar-year paid loss and ALAE'.
- applied: false
- fingerprint: b48b3534e449

## [F-003] Adjustment-chain bullet puts the large-loss and catastrophe step after development and trend
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: minor
- status: open
- locus: bullet 4, 'The full ratemaking chain on the loss side'
- claim: The chain is: reported losses -> develop -> trend -> adjust for large losses and catastrophes -> adjust for benefit or coverage changes -> add LAE.
- evidence: Werner & Modlin Ch. 6 printed p.94 (PDF p.106): 'Preliminary adjustments may involve removing extraordinary events (e.g., individual shock losses and catastrophe losses) from historical losses and replacing them with a provision more in line with long-term expectations. Immature losses also need to be developed' - removal comes before development. Printed p.94 also warns that a catastrophe provision 'has already been trended and developed to ultimate', so 'if the catastrophe provision is added to non-catastrophe losses, and the sum is then trended and developed, the expected catastrophe losses will be over-adjusted'. The extraordinary-loss step is therefore two steps, one before development and one after trending, which is exactly what the page's own second example does ('Remove the shock loss before developing'). The single bullet-list step contradicts the example. Note Werner declines to prescribe a full ordering ('This text will not prescribe a specific order for the various adjustments', p.94), so only the extraordinary-loss placement is source-backed.
- source_rank: 2
- proposed_action: Split the step: remove extraordinary losses before developing, and add the expected large-loss/catastrophe provision after trending.
- applied: false
- fingerprint: 08f068a9f151

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: LAE = ALAE + ULAE diffed against Werner Ch. 1 p.4 (the identity is displayed there) and the ALAE/ULAE definitions against Werner Ch. 3 p.42 and Friedland Ch. 1 p.9; the DCC/A&O correspondence and the warning that the definitions do not match against Friedland p.9 ('the NAIC promulgated two new categorizations of adjustment expenses (effective January 1, 1998)... defense and cost containment (DCC) and adjusting and other (A&O)'); the loss & LAE ratio against Werner Ch. 6 p.94; the paid/reported/ultimate ladder against Werner Ch. 6 pp.93-94; the ULAE ratio method against Werner Ch. 6 p.122 (finding F-002); the adjustment ordering against Werner Ch. 6 pp.94-95 (finding F-003). Both examples recomputed before reading the answers: 0.04 x 728,000 = 29,120, total 757,120, 757,120/1,200,000 = 63.09%, 0.631/0.65 - 1 = -2.9%, ALAE 78,000/650,000 = 12.0%; and 5,000,000 - 2,000,000 = 3,000,000, x 1.28 = 3,840,000, x 1.05^2.5 = 4,338,048 - which is where finding F-001 (fixed in this pass) came from.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.4 (PDF p.16), Ch. 3 p.42 (PDF p.54), Ch. 6 pp.93-95 and p.122 (PDF pp.105-107, 134), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 1 p.9 (PDF p.15), Ch. 16 p.369 (PDF p.375), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
