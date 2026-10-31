---
target: Concepts/Claim Count Triangle.md
created: 2026-10-31
---

## [F-001] Dollar data can also split IBNR (report year analysis)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Counts split broad IBNR', line 31
- claim: Counts split broad IBNR into its two parts ... Dollar triangles alone cannot separate them.
- evidence: Friedland Ch.17 fn.92 (p.389, PDF 395): actuaries 'may rely on report year analysis, frequency-severity techniques, or other approaches to estimate the proportion of total IBNR that is pure IBNR'. Ch.3 p.42 (PDF 48): report year dollar data estimates 'the ultimate value of known claims' and tests case adequacy, which is the IBNER piece.
- source_rank: 2
- proposed_action: Remove 'Dollar triangles alone cannot separate them', or qualify it to accident-year dollar triangles.
- applied: false
- fingerprint: 79b189fe045f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Count triangle types (reported, closed with/without payment, total closed, outstanding) vs p.61; average case outstanding and closed-to-reported diagnostics vs Ch.6; disposal rate = closed / ultimate counts vs Ch.11 and p.288 (Friedland notes other authors define it differently); count consistency (CNP exclusion, reopened) vs Ch.5 p.52 and Ch.11; F-S and B-S uses vs Ch.11/13; both examples recomputed independently (1.157, 1.048, CDF 1.225, 612, 1,000, 82%; 5,000 to 4,000; 60%; 5,000 to 3,500) — agree.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.5 pp.60-62 (PDF 66-68); Ch.6 pp.69-77 (PDF 75-83); Ch.11 pp.195-212 (PDF 201-218); Ch.13 p.288 (PDF 294); Ch.17 p.389 (PDF 395), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Checks against Friedland. One minor overclaim open.
