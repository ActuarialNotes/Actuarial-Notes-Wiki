---
target: Concepts/Loss Elimination Ratio.md
created: 2026-09-13
---

## [F-001] Inflation example states the excess-layer growth as +25.0%; it is +25.1%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: minor
- status: open
- locus: Example 'Inflation Erodes the Loss Elimination Ratio', closing display equation
- claim: (2,400 x 0.812)/(2,000 x 0.779) - 1 = +25.0%, described as 'five points more than the ground-up trend'.
- evidence: Recomputed from scratch before reading the page. For an exponential, losses excess of d are theta*exp(-d/theta): before, 2,000*exp(-0.25) = 1,557.60; after 20% inflation, 2,400*exp(-500/2400) = 1,948.65; ratio 1.25106, i.e. +25.1%. Even using the page's own rounded relativities the quotient is 1,948.80/1,558.00 = 1.25084, which is +25.1% at one decimal, so +25.0% is wrong under either chain. Every other figure in the example reproduces exactly: LER 1-exp(-0.25) = 22.120% -> 22.1%, 1-exp(-0.208333) = 18.806% -> 18.8%, relativities 0.7788 -> 0.779 and 0.81194 -> 0.812. The leveraged direction itself is right: Werner & Modlin Ch. 11 p.202 (PDF p.214) says the trend and development comments made in the Increased Limit Factors section apply to deductible pricing too, and Ch. 6 p.197 (PDF p.209) gives Basic Limits Trend < Total Limits Trend < Increased Limits Trend.
- source_rank: 5
- proposed_action: Change +25.0% to +25.1%.
- applied: true
- fingerprint: b466851fc1a6
