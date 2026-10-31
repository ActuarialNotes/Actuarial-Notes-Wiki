---
target: Concepts/Salvage and Subrogation.md
created: 2026-10-31
---

## [F-001] 'Not scaled from losses' contradicts Friedland's ratio approach
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: major
- status: open
- locus: bullets, first bullet
- claim: Page says 'S&S must be projected on its own triangle, not scaled from losses.'
- evidence: Friedland Ch. 14 pp.329-330 (PDF 335-336): actuaries frequently use the development technique on reported or received S&S, and 'Many actuaries also use a ratio approach': develop the ratio of received S&S to paid claims to an ultimate ratio and multiply by selected ultimate claims gross of S&S, whose development factors 'tend not to be as highly leveraged'. Scaling from ultimate claims is one of the two methods Friedland presents.
- source_rank: 2
- proposed_action: Replace with the two methods Friedland presents.
- applied: true
- fingerprint: 73fcecb13550

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: bullet now names the development technique and the ratio approach, as Friedland Ch. 14 does.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definitions of salvage and subrogation vs Ch. 3 p.33 and Ch. 14 p.329; recording conventions vs Ch. 14 p.329; salvage fast/property, subrogation slow/liability, age-to-age < 1.000 at older maturities vs Ch. 14 p.329; 'Chapter 4 management interview' vs TOC (Ch. 4 Meeting with Management); examples recomputed (1,050,000; 144,000 / +6,000; ~50% step-up)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 p.33 (PDF p.39); Ch. 4 (PDF pp.50-56, chapter title); Ch. 14 pp.329-330 (PDF pp.335-336), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Definitions and recovery-pattern claims agree with Friedland. One major contradiction (no scaling from losses) corrected to Friedland's ratio approach.
