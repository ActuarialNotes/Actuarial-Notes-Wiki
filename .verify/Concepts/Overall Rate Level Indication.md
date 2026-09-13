---
target: Concepts/Overall Rate Level Indication.md
created: 2026-09-12
---

## [F-001] Displayed rounding chain does not reproduce the stated indicated factor
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: minor
- status: open
- locus: Example 1 'Full Overall Indication', indicated-factor display
- claim: The page shows (0.794 + 0.06)/(1 - 0.23 - 0.05) = 0.854/0.72 = 1.1854, an indication of +18.5%.
- evidence: Recomputation: 0.854/0.72 = 1.186111, i.e. +18.6%, not 1.1854. The 1.1854 is right but comes from the unrounded loss ratio: total trended losses $21,365K / on-level premium $26,925K = 0.793500, and (0.7935 + 0.06)/0.72 = 1.185417. The page rounds the loss ratio to 79.4% one line earlier and then carries 0.854 into a division that yields a different answer. Every other figure in the example reproduces exactly: 7,100 x 1.16 x 1.06^3 x 1.10 = 10,790K; 6,200 x 1.38 x 1.06^2 x 1.10 = 10,575K; 12,000 x 1.085 = 13,020K; 13,500 x 1.030 = 13,905K; credibility 0.80 x 18.5% + 0.20 x 2.0% = 15.2%; and all three sensitivity rows (+13.4%, +15.4%, +15.3%). The formula itself matches Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp. 143-145 (PDF pp. 155-157): Indicated Change Factor = (Loss & LAE Ratio + Fixed Expense Ratio)/(1.0 - Variable Expense % - Target UW Profit %), with Werner's own check (0.65 + 0.065)/(1.0 - 0.25 - 0.10) = 1.10.
- source_rank: 5
- proposed_action: Show the unrounded loss ratio in the division — (0.7935 + 0.06)/0.72 = 1.1854 — rather than 0.854/0.72. Not applied here: the alternative repair (keeping 0.854 and restating the indication as +18.6%, which would move the credibility-weighted answer to +15.3%) is an equally defensible reading, so the choice is the author's.
- applied: false
- fingerprint: 55eca7cee320

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Recomputed the whole indication from scratch before reading any stated figure. Losses: 7,100 x 1.16 x 1.06^3 x 1.10 = $10,790.1K; 6,200 x 1.38 x 1.06^2 x 1.10 = $10,574.9K. On-level premium: $13,020K and $13,905K. Loss ratios 82.87% and 76.05%; combined 21,365/26,925 = 79.35%. Indicated factor (0.7935 + 0.06)/0.72 = 1.18542 = +18.5%; credibility 0.80(18.5) + 0.20(2.0) = +15.2%. Re-derived all three sensitivity rows independently: loss trend 4% -> 20,370K losses, LR 75.66%, +13.42%; AY 2024 CDF 1.30 -> 20,752K, LR 77.07%, +15.38%; profit 3% -> 0.8535/0.74 = +15.34%. Every one matches the table. The headline formula matches Werner Ch. 8 p. 143 (PDF p. 155) exactly, and the ordering of the build-up (premium to current rate level and trended; losses developed, trended, adjusted for benefit/coverage change, loaded for ALAE and ULAE; fixed in the numerator and variable in the denominator; profit; credibility; selection) tracks Werner Chs. 5-8. One minor finding on a displayed rounding chain (F-001, open): 0.854/0.72 = 1.1861, not the stated 1.1854, which comes from the unrounded 0.7935. Links, embed and LaTeX clean.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp. 141-146 (PDF pp. 153-158), Overall Indication: Pure Premium Method, Loss Ratio Method, derivation of the indicated rate change formula, and Werner-s check (0.65 + 0.065)/(1.0 - 0.25 - 0.10) = 1.10, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
