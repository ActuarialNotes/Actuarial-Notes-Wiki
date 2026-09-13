---
target: Concepts/Rating Algorithm.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Werner printed p.16 lists what a rating algorithm specifies -- the order in which rating variables are applied, 'how the effect of rating variables is applied in the calculation of premium (e.g., multiplicative, additive, or some unique mathematical expression)', the existence of maximum and minimum premiums (or maximum discount/surcharge), and 'specifics associated with any rounding that takes place' -- which is precisely the page's claim that order, rounding and capping are part of the algorithm rather than implementation detail. The WGIC examples (pp.27-28, 32) show the algorithm as an ordered chain of multiplicative relativities and credits, an additive expense constant, and a minimum-premium floor applied last, with rounding 'to the nearest penny after each step'. The multiplicative-from-log-link claim is Werner Ch.10 p.176: the output of a multiplicative GLM is 'a series of multipliers -- much like the insurance industry is accustomed to using in rating algorithms and rating manuals'. Recomputed both examples before reading the answers. Walk: 500 x 1.20 x 0.90 = 540.00; +25 = 565.00; x0.90 = 508.50; max(508.50, 400) = 508.50. Reordered: 540.00 x 0.90 = 486.00, +25 = 511.00; difference 2.50 -- as stated. Relativity change: 0.95/0.85 = 1.11765 = +11.8%; 355 x 1.11765 = 396.76, still below the 400 floor; capped policies 620 x 1.10 = 682; current 3,400x620 + 600x400 = 2,108,000 + 240,000 = 2,348,000; new 3,400x682 + 600x400 = 2,318,800 + 240,000 = 2,558,800; 2,558,800/2,348,000 - 1 = +8.98% -> +9.0%. Every figure reproduces. Noted but not filed: the header formula puts Fees outside (1-D) while the example adds a $25 policy fee inside it -- consistent if the fee is read as one of the additive terms A_j, which the example labels it. LaTeX balanced; links and embed resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.2 'Rating Manuals', printed pp.13, 16, 27-28 and 31-32 (PDF pp.25, 28, 39-40, 43-44), and Ch.10 printed p.176 (PDF p.188), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
