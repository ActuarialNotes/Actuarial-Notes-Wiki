---
target: Concepts/Backpropagation.md
created: 2026-10-18
---

## [F-001] SGD 'noise helps escape poor local minima' is not what the reading says
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 4 (stochastic gradient descent)
- claim: SGD on mini-batches adds 'noise that helps escape poor local minima'.
- evidence: ISLR §10.7.2 pp.436-437 (PDF 443-444) says minibatch SGD 'is the state of the art for learning deep neural networks' and 'naturally enforces its own form of approximately quadratic regularization'; it makes no claim about escaping local minima, and footnote 22 says these properties are still being researched. Restated to the reading's two claims.
- source_rank: 2
- proposed_action: Restate to ISLR's description of SGD.
- applied: true
- fingerprint: 99969a848ff9

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated in this run to ISLR p.436-437: minibatch SGD is the state of the art and enforces approximately quadratic regularization.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: chain rule vs (10.29)-(10.30); update rule vs (10.27) (ISLR writes ρ for the learning rate, the page η); 'small enough ρ decreases the objective' p.436; non-convex, multiple solutions, random θ0 pp.434-435; ridge (10.31), early stopping p.438, dropout §10.7.3; backprop cost vs Goodfellow §6.5; recomputed example (dL/dŷ=-4, dL/dw=-8, w=0.80)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, pp.404-410 (PDF 411-417); §10.7, pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 Deep Feedforward Networks, Ch.6 §6.5 back-propagation (cost of the same order as forward propagation), sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html
- note: The example uses L=(y−ŷ)², stated on the page; ISLR's objective carries a factor 1/2 (10.25). Both are stated, so no conflict. Printed page = PDF page - 7.

## [F-002] Gradient rule stated for every weight holds only for output weights
- entry_type: finding
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'squared-error objective ... 1/2'
- claim: The squared-error objective is usually written with a 1/2 ... each weight's gradient is the residual times what feeds that weight.
- evidence: ISLR §10.7.1 p.435-436: (10.29) dR_i/dbeta_k = -(y_i - f(x_i)) g(z_ik) for an output weight, but (10.30) dR_i/dw_kj = -(y_i - f(x_i)) beta_k g'(z_ik) x_ij for a hidden-layer weight — not the residual times its input alone. 'Usually' is a claim about prevalence no source read here makes; ISLR (10.25) and (10.28) write the 1/2.
- source_rank: 2
- proposed_action: Limit the rule to an output weight, give (10.29) in the page's A_k notation, and say 'often'.
- applied: true
- fingerprint: df983507cfa0

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated in this run to (10.29): an output weight's gradient is -(y_i - f(x_i)) A_k; 'usually' -> 'often'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:checker-islr-a
- run_id: 2026-10-31T05:10Z/8e26
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page: chain rule and residual attribution vs (10.29)-(10.30); update rule vs (10.27); the 1/2 in (10.25)/(10.28) and its cancellation in (10.29); SGD state of the art and approximately quadratic regularization (p.436-437); nonconvex, multiple solutions (p.434-435); ridge, early stopping, dropout (§10.7.2-10.7.3); learning-rate behaviour vs Goodfellow §8.3.1; backprop cost vs Goodfellow §6.5; example recomputed (dL/dyhat = -4, dL/dw = -8, w = 0.80); rule 10 vs masii-an-014 (different numbers on the page)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, printed pp.404-410 (PDF 411-417); §10.7 incl. eqs. (10.23)-(10.31), printed pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 §6.5 (back-propagation cost of the same order as forward propagation), sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html; Goodfellow, Bengio & Courville, Deep Learning, author-hosted Ch.8 §8.3.1 SGD (learning rate too large: violent oscillations, cost increasing; too low: learning proceeds slowly), sha256:95f2810d0ab10e3934ad7dd858e816572b6a30893e7fca19163b211f6dfe91a1 — https://www.deeplearningbook.org/contents/optimization.html
- note: Re-verified after the MAS-II G8 edit. F-002 (gradient rule stated for every weight; holds for output weights) restated to (10.29) in the page's A_k notation; 'usually' -> 'often'.
