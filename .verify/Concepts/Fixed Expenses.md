---
target: Concepts/Fixed Expenses.md
created: 2026-09-12
---

## [F-001] Minimum premium attributed to the fixed expense provision without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: minor
- status: open
- locus: bullet 5, 'The fixed provision is also where the minimum premium comes from'
- claim: 'The fixed provision is also where the minimum premium comes from: below some policy size, F plus the pure premium exceeds what any percentage-based rate would produce, and the minimum premium is what makes small policies viable.'
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016) does not derive minimum premium from the fixed expense provision. Minimum premium appears only as a rating-manual rule: Ch. 2 p. 13 (PDF p. 25), 'The rules may also outline various premium determination considerations (e.g., minimum premium, down payments, refunds in the event of cancellation)', and Ch. 2 p. 27 (PDF p. 39) in the Wicked Good medical-malpractice manual example ('the minimum premium for each nurse, after the application of all discounts, is $100'), i.e. as a max/min in the rating algorithm (Ch. 2 p. 16, PDF p. 28). Werner's actual remedies for fixed expenses under the All Variable Expense Method are stated at Ch. 7 p. 130 (PDF p. 142): 'a premium discount structure that reduces the expense loadings based on the amount of policy premium charged' and 'expense constants to cover policy issuance, auditing, and handling expenses that apply uniformly to all policies'. The expense constant, not the minimum premium, is the device Werner ties to the fixed provision.
- source_rank: 2
- proposed_action: Recast the bullet around Werner's expense constant and premium discount (Ch. 7 p. 130), or cite a source that derives minimum premium from the fixed expense load.
- applied: false
- fingerprint: 6bb926e930b9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Recomputed both examples from scratch before reading the answers. F = 500,000/10,000 = $50; rate = 250/0.75 = $333.33; decomposition re-derived independently — losses $200 (60.0%), fixed $50 (15.0%), variable 0.20 x 333.33 = $66.67 (20.0%), profit 0.05 x 333.33 = $16.67 (5.0%), shares summing to 100%. Second example: correct rates (80+50)/0.75 = $173.33 and (1,200+50)/0.75 = $1,666.67; all-variable divisor 1 - 0.20 - 0.15 - 0.05 = 0.60 giving $133.33 and $2,000.00; the stated -23% / +20% distortions check at -23.08% and +20.00%, the implied fixed loads at 0.15 x 2,000 = $300 and 0.15 x 133.33 = $20, and the competitor's $333 undercut at $2,000 - $1,666.67. Direction of the all-variable distortion matches Werner Table 7.3 p. 130 (PDF p. 142), which shows -3.2% on a $135 loss cost and +2.0% on a $225 one. The 75%-general / 50%-other-acquisition judgment split and the conversion 'Fixed Expense Per Exposure = Fixed Expense Ratio x Projected Average Premium' are Werner Table 7.4 and p. 131 (PDF p. 143). The trending bullet is Werner p. 135 (PDF p. 147). One minor finding on the unsourced minimum-premium claim (F-001, open). Links, embed and LaTeX clean.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp. 125-135 (PDF pp. 137-147), simple example, All Variable Expense Method and Table 7.3, Premium-based Projection Method and Table 7.4, Exposure/Policy-based Projection Method, Trending Expenses, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 p. 143 (PDF p. 155), indicated average rate = (PP + E_F)/(1.0 - V - Q_T), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
