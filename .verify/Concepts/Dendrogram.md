---
target: Concepts/Dendrogram.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: fusion height = dissimilarity pp.521-522; 2^(n-1) reorderings, horizontal proximity meaningless p.522; cuts give any K from 1 to n p.523; single linkage trailing clusters, average/complete more balanced p.525 Table 12.3 and Fig.12.14; example checked
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.4, pp.516-531 (PDF 523-538), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: ISLR p.523 says people select the cut 'by eye ... based on the heights of the fusion'. The page's 'long vertical stretch' reading is a gloss on that. Printed page = PDF page - 7.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- note: Page-number correction to this run's entries: in Chapter 12 of the CAS-hosted copy, printed page = PDF page − 6, not − 7. Every printed page cited above for Ch.12 is one too low: the PDF page numbers are right. Read: Algorithm 12.2 p.519 (PDF 525); Table 12.3 p.526 (PDF 532); PVE (12.8)-(12.10) pp.505-506 (PDF 511-512); choosing the number of PCs p.509 (PDF 515); scaling for clustering pp.529-530 (PDF 535-536).
