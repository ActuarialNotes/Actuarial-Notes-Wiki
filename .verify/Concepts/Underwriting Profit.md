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
