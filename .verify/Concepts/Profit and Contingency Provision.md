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
