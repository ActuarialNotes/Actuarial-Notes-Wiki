---
target: Concepts/Structured Finance.md
created: 2026-10-18
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- status_set: in_review
- checks_run: definition against WP p.2; pass-through and prioritization (pp.5-6); joint distribution and correlation sensitivity (pp.9-10); amplification by CDO² (p.10); senior tranches as economic catastrophe bonds and ratings silent on the state of default (pp.18-21, 28); catastrophe bond as the opposite case (p.19); two-bond example recomputed against WP pp.6-8 and footnote 1 (1%/19% at ρ=0, 2.8%/17.2% at ρ=0.2, 10%/10% at ρ=1); ten-bond binomial example recomputed (0.59874 ... ; 40.1→65.1%, 8.6→26.4%, 0.10→1.28%); tranche-loss formula consistent with the WP's attachment-point description (p.11); wiki links resolve
- sources_checked: Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf; American Economic Association, The Economics of Structured Finance (Journal of Economic Perspectives 23(1), Winter 2009, pp.3-25, DOI 10.1257/jep.23.1.3) — article record, citation metadata and abstract, sha256:c820f5b8d1d8d1c3f3126755ace10ec043cfe3787f3deec045447d6dbc432237 — https://www.aeaweb.org/articles?id=10.1257/jep.23.1.3; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Everything drawn from Coval, Jurek & Stafford agrees with the authors' working paper, and both examples' arithmetic is right. Left in_review: the page is shared with SOA INV-101 (readings not reached), the published JEP text could not be read (see the CJS resource page's log), and two claims appear in neither Exam 9 reading — that an excess-of-loss reinsurance layer is a tranche of the cedant's loss distribution, and the ten-bond example's set-up, which is the page's own illustration.
