---
target: Concepts/Neural Network.md
created: 2026-10-18
---

## [F-001] 'AUROC curve' names the area, not the curve
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: example answer, last sentence
- claim: The threshold 'is typically tuned using an [[AUROC]] curve'.
- evidence: ISLR §4.4.2 pp.152-153 (PDF 160-161): the ROC curve displays both error rates for all possible thresholds; the AUC is the area under it, a single number. A curve cannot be an AUROC. Restated to 'examined with a ROC curve', keeping the link to the AUROC page.
- source_rank: 2
- proposed_action: Restate to 'ROC curve'.
- applied: true
- fingerprint: 0ee55349071a

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to 'typically examined with a [[AUROC|ROC curve]]' in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: single-hidden-layer formula vs (10.1)-(10.2); ReLU (10.5) and sigmoid (10.4); fitting by gradient descent/backprop §10.7.1; ridge/lasso and dropout §10.7.2-10.7.3; multilayer §10.2; MLP synonym in Goodfellow Ch.6; links resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, pp.404-410 (PDF 411-417); §10.7, pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §4.4.2, pp.152-153 (PDF 160-161), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 Deep Feedforward Networks, Ch.6 intro (multilayer perceptrons), sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html
- note: Formula matches ISLR (10.1) exactly. MAS-II, SRM and PA cite this page; ISLR Ch.10 is the shared reading, so the claims hold for all three. Printed page = PDF page - 7.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- note: Page-number correction to F-001 and the pass source: in Chapter 4 of the CAS-hosted copy, printed page = PDF page − 10. The ROC-curve passage is pp.150-151 (PDF 160-161), not pp.152-153. The Ch.10 citations (PDF − 7) are correct.
