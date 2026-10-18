---
target: Concepts/Scree Plot.md
created: 2026-10-18
---

## [F-001] Overreach: 'a vague elbow means no low-dimensional structure'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 4, last sentence
- claim: A vague elbow means the data have no low-dimensional structure.
- evidence: ISLR p.508 (PDF 515) says only that the visual analysis 'is inherently ad hoc' and the question 'is inherently ill-defined'. It does not conclude anything about structure from a vague elbow. Deleted the sentence.
- source_rank: 2
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: 8ecf1ea49294

## [F-002] Kaiser rule (λ>1) is not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 3; example answer
- claim: 'Keep λ_m > 1 on standardized data' is offered as a companion rule, and the example applies 'Kaiser'.
- evidence: ISLR 2nd ed. full-text: 'Kaiser' occurs 0 times. ISLR p.508 (PDF 515): 'there is no well-accepted objective way to decide how many principal components are enough.' No source read this session states the rule.
- source_rank: 2
- proposed_action: Cite an open source for the Kaiser criterion. Deleting it would mean rewriting the example, so it needs a writer.
- applied: false
- fingerprint: 48757c7c8c9b

## [F-003] Etymology unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- severity: nit
- status: open
- locus: bullet 1
- claim: 'The name is geological: the steep face ... the rubble at the base is noise.'
- evidence: ISLR full-text: 'geolog' occurs 0 times. It is harmless and almost certainly true (scree = talus slope), but no source read this session states it.
- source_rank: 2
- proposed_action: Cite or delete.
- applied: false
- fingerprint: 14fb2f1e1d97

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: definition vs Fig.12.3 caption and pp.505-508 (scree plot = PVE per component; elbow by eye; ad hoc); recomputed example (drops 1.3, 0.9, 0.3, 0.1, 0.2; total 6.0; 75%)
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §12.2.3-12.2.4, pp.504-508 (PDF 511-515), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Medium: F-002 (Kaiser rule) and F-003 (etymology) are open. ISLR plots PVE; the page also allows eigenvalues, which are proportional to PVE. Printed page = PDF page - 7.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:07Z/e-nn
- date: 2026-10-18
- note: Page-number correction to this run's entries: in Chapter 12 of the CAS-hosted copy, printed page = PDF page − 6, not − 7. Every printed page cited above for Ch.12 is one too low: the PDF page numbers are right. Read: Algorithm 12.2 p.519 (PDF 525); Table 12.3 p.526 (PDF 532); PVE (12.8)-(12.10) pp.505-506 (PDF 511-512); choosing the number of PCs p.509 (PDF 515); scaling for clustering pp.529-530 (PDF 535-536).
