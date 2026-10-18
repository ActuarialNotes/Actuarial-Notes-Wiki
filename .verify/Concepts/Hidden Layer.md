---
target: Concepts/Hidden Layer.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: formulas vs (10.2)-(10.3) and (10.11); collapse-to-linear and interaction example vs pp.406 (10.6)-(10.8); 'one wide layer approximates most functions, several modest layers easier' vs p.407; parameter count K(m+1) vs 785x256 count p.408; ReLU off => zero gradient from (10.30) g'(z)=0; independent recomputation of all three examples (z1=1.36, z2=-1.50, eta=1.04, p=0.7388; 208+136+9=353, 340 redundant; f=X1X2=3.0)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, pp.404-410 (PDF 411-417); §10.7, pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 Deep Feedforward Networks, Ch.6 §7 weight decay; §6.4.1 universal approximation, sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html
- note: Interaction example is ISLR's own (10.6)-(10.8) with an insurance gloss. 'Weight decay' is ISLR's ridge (10.31); Goodfellow names it weight decay. Printed page = PDF page - 7.
