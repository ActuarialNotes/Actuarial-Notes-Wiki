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
