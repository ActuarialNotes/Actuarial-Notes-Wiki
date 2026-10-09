---
target: Concepts/Profit and Contingency Provision.md
created: 2026-09-12
---

## [F-001] Contingency provision attributed to random tail variation rather than systematic variation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- severity: major
- status: open
- locus: Bullet 4, 'The contingency element is a provision for…'; also the lead paragraph
- claim: The contingency element is 'a provision for the difference between expected costs and the costs that actually materialize when a rate is set from a distribution with a long right tail', and the lead calls it 'a margin for the possibility that actual results fall short of expected'.
- evidence: The CAS Statement of Principles Regarding P&C Insurance Ratemaking (adopted May 1988; rescinded Dec 2020), p.4, 'Risk': 'The rate should include a charge for the risk of random variation from the expected costs. This risk charge should be reflected in the determination of the appropriate total return consistent with the cost of capital and, therefore, influences the underwriting profit provision. The rate should also include a charge for any systematic variation of the estimated costs from the expected costs. This charge should be reflected in the determination of the contingency provision.' The source therefore assigns RANDOM variation (the long right tail) to the underwriting profit provision and SYSTEMATIC variation of estimated from expected costs to the contingency provision — the opposite attribution to the page's. sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140. Everything else on the page reproduces: $250/0.65 = $384.62 with 65/30/5 decomposition, and the ROE derivation 0.12(0.50) = 0.060 required, 0.70(0.04)+0.50(0.04) = 0.048 available, 0.012/(1-0.21) = 1.52%.
- source_rank: 1
- proposed_action: Restate the contingency bullet in the SOP's terms: random variation → underwriting profit provision (cost of capital); systematic variation of estimated costs from expected costs → contingency provision.
- applied: false
- fingerprint: 5754aca710e7

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: The 'total return after investment income' framing checked against the SOP's definition ('the amounts that, when considered with net investment and other income, provide an appropriate total after-tax return') and against Werner p.138's long-tail/short-tail discussion; the contingency bullet checked against the SOP's 'Risk' consideration (finding F-001); rate formula reconciled with Werner Ch. 8; both examples recomputed from scratch ($250/0.65 = $384.62 with a 65/30/5 decomposition; ROE derivation 0.060 required, 0.048 available, 0.012/0.79 = 1.52%), including the page's 1:1 premium-to-surplus sensitivity claim (required 0.120, available 0.068, Q_T = 6.6%).
- sources_checked: CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988), sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — p.2 (definition of the underwriting profit and contingency provisions; Principle 4) and p.4 ('Risk' consideration); Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.138 (PDF p.150) — underwriting profit provision, investment income on capital and policyholder-supplied funds, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Numbers all reproduce; the open major finding is the contingency provision's attribution, where the SOP says the opposite of the page.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: CAS Statement of Principles p.4 ('Risk') re-read: random variation from expected costs → total return consistent with the cost of capital → underwriting profit provision; systematic variation of estimated from expected costs → contingency provision. Lead rewritten to the SOP p.2 definition (amounts that, with net investment and other income, provide an appropriate total after-tax return) and the random/systematic split; bullet 4 now says the contingency element is the charge for systematic variation, and the long right tail (random variation) is charged through the cost of capital. The unsourced 'not a redundancy … re-examined' sentence deleted.

## [F-002] Unsourced regulatory and benchmark claims
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 5; Example 2 closing paragraphs
- claim: 'Q_T is a regulated number. It is one of the most scrutinized components of a filing'; 'far below a typical 5%'; 'why the profit provision is contested in filings'.
- evidence: Neither the SOP nor Werner says this. The SOP's considerations (pp.3-4) are that 'the contribution of net investment and other income should be considered' and that material assumptions and judgments 'should be documented and available for disclosure'. Werner's 5% (Ch.7 p.125) is one example's management-selected target, not a typical value.
- source_rank: 1
- proposed_action: Restate bullet 5 to the SOP's two considerations; drop 'typical 5%' and 'contested in filings'.
- applied: true
- fingerprint: 6292c6aa405d

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Applied. Example 2 recomputed: required 0.12 x 0.50 = 0.060; available 0.70(0.04) + 0.50(0.04) = 0.048; Q_T = 0.012/0.79 = 1.52%; at 1:1, 0.120 required, 0.068 available, 0.052/0.79 = 6.58% (now stated). Example 1: 250/0.65 = $384.62; 115.38 (115.39 on the rounded rate) and 19.23.

## [F-003] Named derivation methods not in the readings checked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 3, 'Standard derivations'
- claim: Target return on equity, discounted cash flow / internal rate of return, and calendar-year investment income offset approaches as 'standard derivations' of Q_T.
- evidence: Neither Werner nor the SOP names these methods. Werner Ch.7 p.138 (PDF p.150): 'The projection of investment income is an advanced topic and is outside of the scope of this text'; it says only that the actuary typically determines the UW profit needed to achieve the target total return after investment income. The methods are the subject of a different reading (e.g. Robbin's CAS study note on the underwriting profit provision), which could not be reached this session: the casact.org handout URLs tried (rpm_2011_handouts_rr3-robbin.pdf, rpm_2015_handouts_paper_3899_handout_2492_0.pdf) returned an HTML block page (sha256:56b4302e…), not the document.
- source_rank: 2
- proposed_action: Check the bullet against Robbin's study note (or another reading that names the methods) and cite it, or reduce the bullet to Werner's statement.
- applied: false
- fingerprint: 9d16c9ae7ecf

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: in_review
- checks_run: F-001 re-checked against SOP p.4 and fixed; lead, bullets 1, 2, 4, 5 diffed against SOP pp.2-4 and Werner Ch.7 p.138; both examples recomputed in python including the 1:1 sensitivity.
- sources_checked: CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988), pp.2-4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.125, 138 (PDF pp.137, 150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.142-144 (PDF pp.154-156), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: In review, not verified: bullet 3's named derivation methods (F-003, open) come from a reading not checked this session - Robbin's study note on the underwriting profit provision was not reachable. Everything else on the page is now supported by the SOP or Werner.
