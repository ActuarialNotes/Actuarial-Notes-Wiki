---
target: Concepts/Claims Modeling Dataset.md
created: 2026-10-10
---

## [F-001] Fixed-maturity target formula is the page's own construction
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- severity: minor
- status: open
- locus: formula blocks and 'A consistent target' bullet
- claim: y_i = 1{L_i(r_i + m) > T}; row i usable iff r_i + m <= t_val; 'Measuring every claim at the same age m ... keeps the target consistent.'
- evidence: No source read this run states the fixed-age target. Goldburd et al. (CAS Monograph 5, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757) gives the binary target 'whether a newly-opened claim will wind up exceeding some specified loss amount threshold' (§2.8, PDF p.35) and says immature losses may need to be developed before modeling (§5.1.3, PDF p.55); Friedland ch.3 (sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464) defines the valuation date (PDF p.45). The construction is consistent with both and its worked example is arithmetically right, but it is a synthesis, as the writer's source note says. A web search for a published fixed-maturity claims target found only vendor pages.
- source_rank: 2
- proposed_action: Cite a published claims-analytics source for the fixed-maturity target, or label the formula as an illustration of Goldburd's maturity requirement. Not applied (needs new prose).
- applied: false
- fingerprint: a70de1c0f8fc

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: binary claim targets, unique key, out-of-time split, development of immature losses vs Goldburd; reopened claims and valuation date vs Friedland; leakage vs scikit-learn; both examples checked (24-month dates; three rows, one positive); links resolve
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.8 PDF p.35; §4.1 PDF pp.45-46; §4.3.1 PDF p.50; §5.1.3 PDF p.55, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS 2010), ch.3 PDF pp.43, 45 (reopened claims, valuation date), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; scikit-learn User Guide, Common pitfalls, §'Data leakage', definition, sha256:21fac11c181ab35624dcf8673f0475d403d4f6ecf0f9bead01a573d7642b515c — https://scikit-learn.org/stable/common_pitfalls.html
- note: Medium, with F-001 open: the fixed-maturity target formula is the page's own construction; every sourced fact checks.
