---
target: Concepts/Underwriting Profit.md
created: 2026-09-12
---

## [F-001] Two-line comparison mixes a pre-tax underwriting result with after-tax investment yields
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: minor
- status: open
- locus: Example 'Two Lines, Same Combined Ratio, Different Answers', income lines
- claim: Book A income = -0.020 + 0.04(0.35+0.50) = $0.014, compared against a required after-tax $0.060.
- evidence: The -0.020 is the underwriting result at a 102% combined ratio, which is pre-tax, while the 4% yields and the 12% ROE target are stated as after-tax. At a 21% rate the underwriting loss carries a tax shield, so the after-tax underwriting result is -0.0158 and Book A's total is $0.0182, not $0.014. The page's sibling Concepts/Profit and Contingency Provision.md does gross up for tax (0.012/(1-0.21)), so the two pages treat the same quantity differently. The conclusion (A short of $0.060, B well above) is unaffected. Underwriting profit definition itself matches Werner Ch. 7 p.138 (PDF p.150) verbatim: 'UW Profit = Premium - Losses - LAE - UW Expenses', with 'Total Profit = Investment Income + UW Profit'. Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 5
- proposed_action: State the underwriting result on the same (after-tax) basis as the yields, or label the example explicitly pre-tax throughout.
- applied: false
- fingerprint: 0806ea5cd0b8

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Definition diffed word-for-word against Werner p.138 ('UW Profit = Premium - Losses - LAE - UW Expenses' and 'Total Profit = Investment Income + UW Profit'); margin = 1 - combined ratio checked against Werner p.10's combined ratio definitions (including his trade/financial basis caveat); the long-tail float argument checked against Werner p.138; both examples recomputed from scratch ($10M - $6.8M - $3.0M = $200K, 2.0% margin, 68% + 30% = 98%; float 0.35/3.50 per premium dollar, Book A $0.014 vs Book B $0.140 against $0.060 required).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.138 (PDF p.150) and Ch. 1 p.10 (PDF p.22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: One open minor finding on the pre-tax/after-tax mixing in example 2; it does not change either conclusion.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Example 2 now states a 21% tax on underwriting results and puts the underwriting result on the after-tax basis of the yields and target: -0.02 x 0.79 = -0.0158. Recomputed: Book A -0.0158 + 0.04(0.85) = $0.0182; Book B -0.0158 + 0.04(4.00) = $0.1442; required 0.12 x 0.50 = $0.060. Conclusions unchanged.

## [F-002] Example 1 says a long-tail book needs more underwriting margin; Werner says the reverse
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: Example 'Underwriting Profit and Margin', closing paragraph
- claim: 'for a short-tail property book it is a thin but genuine profit; for a long-tail casualty book it may sit well below the target return once the cost of the capital held against those reserves is charged.'
- evidence: Werner Ch.7 p.138 (PDF p.150): 'For some long-tailed lines, the investment income may be large enough that companies can accept an underwriting loss and still achieve the target total rate of return. For short-tailed lines, the investment income potential is lower and the underwriting profit is a larger portion of the total return.' The page's own Example 2 reaches Werner's direction; Example 1's closing reverses it with a capital-charge argument the reading does not make.
- source_rank: 2
- proposed_action: Restate the closing in Werner's direction.
- applied: true
- fingerprint: 34adc7b3b790

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Applied: closing paragraph now says a short-tailed book relies on underwriting profit so 2% may be thin, and a long-tailed book needs less underwriting profit for the same total return (Werner p.138). Example recomputed: 10.0 - 6.8 - 3.0 = $0.2M; 2.0%; 68% + 30% = 98%.

## [F-003] Several bullets state things the readings do not
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullets 1, 3, 4, 5; Example 2 closing
- claim: Combined ratio basis '(trade vs. financial)'; 'Comparing combined ratios across lines without adjusting for payout duration is meaningless'; Q_T 'is a derived quantity, not a management preference'; 'a calendar-year underwriting profit can be manufactured by weakening reserves. Accident-year results … reveal the truth'; 'Book B's larger reserves also carry more risk … narrowing but not eliminating the gap'.
- evidence: Werner Ch.1 p.10 (PDF p.22) gives the two combined-ratio definitions without 'trade'/'financial' (neither term occurs in the text). Werner Ch.7's own simple example (p.125, PDF p.137) has 'Company management has determined that the target profit provision should be 5%', contradicting 'not a management preference'; p.138 says the actuary typically determines the UW profit needed for the target total return after investment income. Werner Ch.3 p.43 (PDF p.55): calendar-year losses 'may include payments and reserve changes on claims from policies issued years ago', accident year a better match - but no statement about manufacturing profit. The surplus-allocation caveat is not in Werner.
- source_rank: 2
- proposed_action: Restate to Werner and delete what no source supports.
- applied: true
- fingerprint: 6a6831a1f3d9

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Applied: bullets 1, 3, 4, 5 restated to Werner Ch.1 p.10, Ch.7 p.138, Ch.3 p.43; the total-profit bullet now notes investment income on capital and the disagreement over including it (p.138); the Example 2 surplus caveat deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: F-001 fixed and Example 2 recomputed on an after-tax basis; Example 1 recomputed; every bullet diffed against Werner Ch.1, 3, 7 and 8.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.125, 138 (PDF pp.137, 150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.10 (PDF p.22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 p.144 (PDF p.156), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 p.43 (PDF p.55), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Confidence medium (was high): vault-authored examples and a material correction to Example 1's closing (F-002).
