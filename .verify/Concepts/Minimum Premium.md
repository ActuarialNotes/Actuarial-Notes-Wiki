---
target: Concepts/Minimum Premium.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Werner Ch.2 confirms the concept and its placement: the rules of a rating manual 'outline various premium determination considerations (e.g., minimum premium, down payments, refunds)' (printed p.13); a rating algorithm specifies 'the existence of maximum and minimum premiums' and the rounding that takes place (p.16); and both worked algorithms apply it as a floor -- medical malpractice, 'Total Premium per Professional = Higher of (Base Rate x relativities x ...) and Minimum Premium specified in the rating manual ($100 for WGIC)', the minimum applying 'after the application of all discounts' (pp.27-28), and workers compensation, 'Total Premium = Higher of [sum over classes ... + Expense Constant] and Minimum Premium ($1,500)' (p.32). That is exactly the page's Premium = max(Rate x Exposure, Minimum Premium), and it also supports the page's point that where the floor sits in the sequence changes the answer. The expense rationale is consistent with Werner's expense constant, which 'covers expenses that are not included in the manual rate' and does not vary with size (p.31), and with the premium discount that exists because administrative expenses do not scale with premium (p.31). Recomputed both examples from scratch: $4.00 x (150,000/1,000) = $600 < $750 so the floor binds; crossover (750/4.00) x 1,000 = $187,500 of receipts; effective rate at $100,000 of receipts = 750/100 = $7.50 per $1,000 falling to $4.00 at crossover. Second example: (110+95)/(1-0.23-0.05) = 205/0.72 = $284.72; at a $200 floor, 200 x 0.77 = $154 against 110+95 = $205, a $51 shortfall per policy with no profit provision -- every figure checks. LaTeX balanced; links and embed resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.2 'Rating Manuals', printed pp.13, 16, 27-28 and 31-32 (PDF pp.25, 28, 39-40, 43-44), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
