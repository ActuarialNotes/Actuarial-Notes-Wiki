---
target: Concepts/Loss Development.md
created: 2026-09-13
---

## [F-001] CDF chain product stated as 2.2727
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: minor
- status: open
- locus: Example 'Developing an Immature Accident Year', CDF line and the two lines that follow
- claim: 1.650 x 1.220 x 1.080 x 1.030 x 1.015 = 2.2727, so ultimate = 4,200,000 x 2.2727 = 9,545,340 and IBNR = 5,345,340.
- evidence: Independent recomputation of the product: 1.650 x 1.220 = 2.0130; x 1.080 = 2.174040; x 1.030 = 2.2392612; x 1.015 = 2.27285012. That rounds to 2.2729, not 2.2727. Carrying 2.2729: ultimate = 4,200,000 x 2.2729 = 9,546,180 exactly, and IBNR = 9,546,180 - 4,200,000 = 5,346,180. The method is as Friedland Ch. 7 printed p.90 (PDF p.96) Step 6: 'We calculate cumulative claim development factors by successive multiplications beginning with the tail factor and the oldest age-to-age factor', then Step 7 projects ultimate claims from the CDF. The commentary ('a CDF of 2.27 means more than half the ultimate estimate is unreported' - 1/2.273 = 44% reported) is unaffected.
- source_rank: 5
- proposed_action: Use 2.2729, 9,546,180 and 5,346,180.
- applied: true
- fingerprint: 6ff931f27818

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Ultimate = claims at age n x CDF and CDF = product of age-to-age factors and the tail diffed against Friedland Ch. 7 pp.85-90, Steps 1-7, and Step 6 verbatim: 'We calculate cumulative claim development factors by successive multiplications beginning with the tail factor and the oldest age-to-age factor'; IBNR = ultimate - reported follows from the same chapter. Pure IBNR vs IBNER checked against Friedland Ch. 3 p.43 and Werner Ch. 16 p.317. The reported-develops-faster-than-paid claim is borne out by Friedland's own U.S. Industry Auto selections at p.90 (reported tail 1.000, paid tail 1.002). The paid-to-reported diagnostic and both of the page's readings of it are Friedland Ch. 6 p.68: 'It is an important tool for testing whether there might have been changes in case outstanding adequacy or in settlement patterns... we need to investigate further any changes observed to determine if the change is occurring in paid claims (i.e., the numerator) or in the case outstanding'; the Berquist-Sherman response is Friedland Ch. 13. BF using (1 - 1/CDF) against Friedland Ch. 9 p.153. Both examples recomputed before reading the answers: the factor chain multiplies to 2.27285012, which is where finding F-001 (fixed in this pass) came from, and 6,300,000/9,000,000 = 0.70 against the 0.58 benchmark.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 7 pp.85-90 (PDF pp.91-96), Ch. 6 p.68 (PDF p.74), Ch. 9 p.153 (PDF p.159), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.93-95 (PDF pp.105-107), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
