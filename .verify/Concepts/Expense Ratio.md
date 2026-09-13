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
