---
target: Concepts/Activation Function.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: ReLU, sigmoid vs (10.4)-(10.5); collapse without nonlinearity p.406; softmax output (10.13); tanh, saturation, ReLU gradients and its zero-gradient drawback, ReLU as default vs Goodfellow §6.3.1-6.3.2; recomputed example (z=1.1, ReLU 1.1, sigmoid 0.7503; z=-1.1 gives 0.2497)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, pp.404-410 (PDF 411-417); §10.7, pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 Deep Feedforward Networks, Ch.6 §6.3.1 ReLU, §6.3.2 logistic sigmoid and tanh, §6.2.2 output units, sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html
- note: Tanh, saturation and 'dying' ReLU are not in ISLR; Goodfellow (rank 3, author-hosted) supports them: tanh(z)=2σ(2z)−1, sigmoid saturates and gradients become too small, ReLU 'cannot learn via gradient-based methods on examples for which their activation is zero'. ISLR gives efficiency as ReLU's advantage, Goodfellow large consistent gradients; the page's reason is Goodfellow's, not a contradiction. Printed page = PDF page - 7.
