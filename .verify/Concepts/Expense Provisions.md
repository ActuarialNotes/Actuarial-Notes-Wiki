---
target: Concepts/Expense Provisions.md
created: 2026-09-12
---

## [F-001] Other acquisition expense assigned to the earned-premium denominator; Werner uses written premium
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: major
- status: open
- locus: bullet 4, 'Premium-based ratios use different denominators'
- claim: 'Commissions and taxes are incurred when premium is written, so those ratios are calculated on Written Premium; general and other-acquisition expenses are incurred as coverage is provided, so those ratios are calculated on Earned Premium.'
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p. 9 (PDF p. 21): 'the company will subdivide the major underwriting expense categories into expenses that are generally incurred at the onset of the policy (e.g., commissions, other acquisition, taxes, licenses, and fees) and expenses that are incurred throughout the policy (e.g., general expenses). For the purpose of calculating the underwriting expense ratio, the former expenses are measured as a ratio to written premium and the latter expenses are measured as a ratio to earned premium.' Other acquisition therefore belongs with commissions and taxes on *written* premium, not with general expenses on earned. Werner Ch. 7 p. 131 (PDF p. 143) confirms by example: general expenses are divided by countrywide *earned* premium because they 'are assumed to be incurred throughout the policy period'. The page contradicts itself as well — its own worked example states 'other acquisition 4.0% of written premium'.
- source_rank: 2
- proposed_action: Move 'other-acquisition' from the earned-premium clause to the written-premium clause, so the bullet reads: commissions, taxes/licences/fees and other acquisition on written premium; general expenses on earned premium.
- applied: false
- fingerprint: df522ad6e876

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Recomputed both examples from scratch first. V = 15.0 + 2.5 + 6.0(0.25) + 4.0(0.50) = 21.0%; F% = 6.0(0.75) + 4.0(0.50) = 6.5%; F = 0.065 x $800 = $52.00; rate divisor 1 - 0.210 - 0.050 = 0.740. Second example: (150 + 52)/0.74 = $272.97 vs 150/(1 - 0.275 - 0.05) = $222.22, a $50.75 (18.6%) shortfall — the page's '$51, or 19%' rounds correctly, and the total expense ratio 15 + 2.5 + 6 + 4 = 27.5% checks. The headline formula is Werner's Ch. 8 p. 143 (PDF p. 155) with his own numbers ($300 + $25)/(1 - 0.25 - 0.10) = $500. The 75%-fixed / dollars-per-exposure mechanics are Werner Table 7.4 and p. 131 (PDF p. 143): 'the fixed expense provision can be multiplied by the projected average premium'. The all-variable distortion direction (undercharges below-average risks, overcharges above-average ones) is Werner Table 7.3 p. 130. The expense-trend bullet is Werner p. 135 (PDF p. 147): 'If the average fixed expenses and average premium are changing at the same rate, then the fixed expense ratio will be consistent and no trending is necessary.' Confidence medium because of F-001 (major, open): the page puts other acquisition on the earned-premium denominator where Werner puts it on written. Links, embed and LaTeX clean.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp. 125-139 (PDF pp. 137-151), Other Expenses and Profit: simple example, expense categories, All Variable Expense Method (Table 7.3), Premium-based Projection Method (Table 7.4), Trending Expenses, Reinsurance Costs, Permissible Loss Ratios, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p. 9 (PDF p. 21), Underwriting Expense Ratio — written vs earned premium denominators, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp. 141-145 (PDF pp. 153-157), rate = (PP + E_F)/(1.0 - V - Q_T), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
