---
target: Concepts/Paid Losses.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Reported = paid + case vs p.15; paid CL ultimate = paid x CDF vs Ch.7; paid data unaffected by case adequacy but sensitive to settlement rate, and the Berquist-Sherman disposal-rate adjustment, vs Ch.13; paid-to-reported diagnostic vs Ch.6; both examples recomputed independently (4,300,000; 4,920,000; 5,504,000; 12%; 1.818; 5.000; 181,800; 500,000) — agree.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.1 p.15 (PDF 21); Ch.3 data types (PDF 37-44); Ch.6 pp.68-69 (PDF 74-75); Ch.7 pp.98-104 (PDF 104-110); Ch.13 pp.283-288 (PDF 289-294), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Checks against Friedland. Medium: the float/profit-provision point is ratemaking context, not checked here. No findings.
