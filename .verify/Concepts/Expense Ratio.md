---
target: Concepts/Expense Ratio.md
created: 2026-09-12
---

## [F-001] Operating expense ratio formula uses ULAE where Werner uses total LAE
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: critical
- status: open
- locus: second display formula and bullet 2; Example 1 answer block
- claim: 'Operating Expense Ratio = UW Expense Ratio + ULAE / Earned Premium', glossed as 'The operating expense ratio adds ULAE', and computed in Example 1 as 27.0% + (1,600,000/40,000,000 = 4.0% ULAE) = 31.0%.
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p. 10 (PDF p. 22), section 'Operating Expense Ratio': 'The operating expense ratio (OER) is a measure of the portion of each premium dollar used to pay for loss adjustment and underwriting expenses and is calculated as: OER = UW Expense Ratio + LAE / Earned Premium.' The numerator is total LAE (ALAE + ULAE), not ULAE alone. Werner Ch. 8 p. 144 (PDF p. 156) uses the same definition when rewriting the fundamental insurance equation as 'Profit % at Current Rates = 1.0 - Loss Ratio - OER = 1.0 - Combined Ratio'. Werner's own LAE definitions are at Ch. 1 p. 4 (PDF p. 16): ALAE is directly assignable to a claim, ULAE is not; both are LAE. The page's Example 1 lumps ALAE into the loss ratio ($27.6M 'losses and ALAE'), so its 31.0% is not Werner's OER and no ALAE figure is supplied from which the correct one could be computed. A candidate asked to compute the operating expense ratio on Exam 5 and following this page would answer wrongly.
- source_rank: 2
- proposed_action: Change the formula to OER = UW Expense Ratio + LAE / Earned Premium, fix the bullet, and rework Example 1 so ALAE and ULAE are given separately (or state explicitly that the example's LAE consists only of the $1,600,000 ULAE). Do not apply mechanically — the example needs new inputs.
- applied: false
- fingerprint: 9cf826dc4f22

## [F-002] The 27.8% split total is not the ratio the financial statement reports
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: minor
- status: open
- locus: Example 2 'Splitting the Ratio for Ratemaking', closing paragraph
- claim: 'The aggregate 27.8% expense ratio is the same number the financial statement reports.'
- evidence: Recomputation from the page's own figures: V = 21.1% and F% = 6.7% sum to 27.8%, but that total mixes denominators — commissions, taxes and other acquisition on written premium ($46,000,000) and general expenses on earned premium ($40,000,000). The page's own Example 1 computes the reported statutory underwriting expense ratio as $12,420,000 / $46,000,000 = 27.0% on written premium throughout. The two differ by the 0.8 points that general expenses pick up from the smaller earned-premium denominator (2,530,000/40,000,000 = 6.325% vs 2,530,000/46,000,000 = 5.5%), so 27.8% is not a statement figure. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p. 9 (PDF p. 21) gives the mixed-denominator convention for the *ratemaking* expense ratio; the statutory ratio in Example 1 is the written-premium one.
- source_rank: 5
- proposed_action: Drop the claim that 27.8% is the reported ratio, or state that the mixed-denominator ratemaking total (27.8%) differs from the written-premium statutory ratio (27.0%) and why.
- applied: false
- fingerprint: 553a8a5e9578

## [F-003] Unsourced numeric benchmark for expense ratios by distribution channel
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: minor
- status: open
- locus: bullet 4, 'The ratio is strongly a function of distribution'
- claim: 'Direct writers run expense ratios in the low twenties or below; independent agency companies in the low thirties.'
- evidence: No such figures appear in the syllabus text. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p. 127 (PDF p. 139) makes the qualitative point only: 'a national direct writer may incur significant other acquisition costs for advertising. In contrast, an agency-based company may rely more heavily on the agents to generate new business; consequently, the other acquisition costs will be lower, but this will be at least partially offset by higher commission expenses.' It gives no ratio levels by channel, and a full-text search of the extracted PDF for 'direct writer' returns no numeric benchmark. Werner in fact notes the offset runs both ways, which the page's one-directional claim does not.
- source_rank: 2
- proposed_action: Either cite a published source for the levels (e.g. an A.M. Best or NAIC aggregate) or reduce the claim to Werner's qualitative statement that the mix between commissions and other acquisition differs by channel.
- applied: false
- fingerprint: 82e3f819ea12

## [C-001] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: disputed
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp. 9-10 (PDF pp. 21-22), Underwriting Expense Ratio, Operating Expense Ratio, Combined Ratio, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp. 126-131 (PDF pp. 138-143), expense categories and the Premium-based Projection Method, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 p. 144 (PDF p. 156), Profit % at Current Rates = 1.0 - Loss Ratio - OER = 1.0 - Combined Ratio, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Disputed because of an open critical finding (F-001): the page's operating expense ratio adds ULAE where Werner Ch. 1 p. 10 adds total LAE. The fix is not mechanical — the worked example supplies no ALAE figure separately from losses — so nothing was edited. Checks actually run: recomputed both examples from scratch before reading the answers. Example 1 — UW expenses 6,900 + 1,150 + 1,840 + 2,530 = $12,420K; /46,000 = 27.0%; ULAE 1,600/40,000 = 4.0%; loss & ALAE 27,600/40,000 = 69.0%; 69 + 4 + 27 = 100.0%. The combined ratio construction (loss ratio on earned + LAE on earned + UW expenses on written) is Werner p. 10 verbatim, so the combined-ratio arithmetic is right even though the OER label is not. Example 2 — commissions 6,900/46,000 = 15.0%, taxes 1,150/46,000 = 2.5%, other acquisition 1,840/46,000 = 4.0%, general 2,530/40,000 = 6.325%; V = 15 + 2.5 + 2.0 + 1.581 = 21.08%; F% = 2.0 + 4.744 = 6.74%; F = 0.067 x 800 = $53.60. All reproduce, and the split method matches Werner Table 7.4. Two further minor findings opened: F-002 (the 27.8% total is not the statement ratio, which the page's own Example 1 puts at 27.0%) and F-003 (unsourced expense-ratio benchmarks by distribution channel). Links, embed and LaTeX clean.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.1 p.10 (PDF p.22) re-read: 'OER = UW Expense Ratio + LAE / Earned Premium', LAE = ALAE + ULAE (p.4, PDF p.16). Display formula now has LAE; bullet 2 rewritten (OER adds all LAE, allocated and unallocated, on earned premium; LAE counted once - Werner p.10 'the loss ratio should not include LAE or it will be double counted'). Example 1 given separate inputs - losses $25.6M, ALAE $2.0M, ULAE $1.6M (sum unchanged at $29.2M) - and recomputed: UW 12.42/46 = 27.0%; LAE (2.0+1.6)/40 = 9.0%; OER 36.0%; loss ratio 25.6/40 = 64.0%; combined 64 + 9 + 27 = 100.0% = LR + OER.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Werner Ch.1 p.9 (PDF p.21): for the UW expense ratio, onset expenses are measured to written premium, general expenses to earned, and the category ratios added. The closing sentence now says 21.1% + 6.7% = 27.8% is the UW expense ratio with general on earned (2.53/40 = 6.325% vs 2.53/46 = 5.5%), which is why it differs from Example 1's all-to-written 27.0%; the 'financial statement' claim is deleted. Recomputed: V = 15 + 2.5 + 2.0 + 1.58 = 21.08%; F% = 2.0 + 4.74 = 6.74%; F = 0.067 x 800 = $53.60.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Numeric channel benchmarks deleted; bullet reduced to Werner Ch.7 p.127 (PDF p.139): a national direct writer may incur significant other acquisition costs for advertising; an agency-based company has lower other acquisition costs, at least partially offset by higher commissions.

## [F-004] Growing-book bullet inverts Werner's reason for the written-premium denominator
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: bullet 5, 'In a growing book the written-premium denominator flatters the ratio'
- claim: 'In a growing book the written-premium denominator flatters the ratio, since this year's acquisition costs are spread over writings that will not be earned until next year. The distortion runs the other way in runoff.'
- evidence: Werner Ch.7 p.128 (PDF p.140): 'The choice of written or earned premium will have relatively little impact if a company's volume of business is not changing materially … if a company is growing (or shrinking) significantly, written premium will be proportionately higher (or lower) than earned premium. Similarly, during a period of growth (or decline) the acquisition costs will be higher (or lower) … Use of an appropriate premium measure provides a better match.' Werner presents written premium as the correct match for onset expenses in a growing book, not a distortion that flatters the ratio.
- source_rank: 2
- proposed_action: Restate the bullet as Werner's matching argument.
- applied: true
- fingerprint: 317a51577383

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Applied: bullet now states Werner p.128's point - little impact at stable volume; in a growing (shrinking) book written premium and acquisition costs both run proportionately higher (lower), which is why onset expenses are matched to written premium.

## [F-005] UW expense ratio stated as all-to-written ('statutory') where Werner splits denominators
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: first display formula; bullet 1
- claim: Formula 'UW Expense Ratio = Underwriting Expenses / Written Premium'; bullet 1 'The statutory underwriting expense ratio is conventionally on written premium'.
- evidence: Werner Ch.1 p.9 (PDF p.21) defines UW Expense Ratio = UW Expenses / Premium, then measures onset expenses to written and general to earned and adds the category ratios; p.10 (PDF p.22) is where 'historically' the combined ratio puts UW expenses over written premium. The word 'statutory' and the written-only formula are not Werner's.
- source_rank: 2
- proposed_action: Denominator 'Premium'; bullet 1 to Werner's split, with the historical combined ratio's all-to-written convention named as such.
- applied: true
- fingerprint: 14bdf2e10650

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Applied: formula denominator now 'Premium'; bullet 1 rewritten to Werner pp.9-10; Example 1's line labelled 'all to written'. The fixed/variable bullet softened to 'where both kinds are material' (Werner Ch.7 p.127).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: F-001 to F-003 re-checked against the cited pages and fixed; both examples rebuilt/recomputed in python (27.0%, 9.0%, 36.0%, 64.0%, 100.0%; V 21.08%, F% 6.74%, $53.60); every bullet diffed against Werner Ch.1 and Ch.7; links and LaTeX checked.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.4, 9-10 (PDF pp.16, 21-22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.126-131 (PDF pp.138-143), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 p.144 (PDF p.156), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: The critical (OER with ULAE instead of LAE) is fixed and resolved. Two more findings opened and applied (F-004 major growing-book bullet, F-005 minor denominator). Confidence medium: vault-authored examples.
