---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:1eb4ddb699f0dd8e9d305c4392a6fe6dba21850406525ceb46dda8b448e1a517
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.1 p.14 (PDF 20); Ch.2 'Overview' p.17 (PDF 23); Part 3 intro pp.79-80 (PDF 85-86); Ch.13 pp.284-290 (PDF 290-296), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Case Reserves.md
---

**Case reserves** (also called case outstanding) are claim-specific estimates of the expected future payments on individual reported claims, established by claims adjusters based on the known facts of each loss.

> $$\text{Reported (Incurred) Losses}$$

> $$= \text{Paid Losses} + \text{Case Reserves}$$

> $$\text{IBNR} = \text{Ultimate Losses} - \text{Reported Losses}$$

- Case reserves reflect the adjuster's current best estimate and are updated as new information emerges — medical reports, legal proceedings, settlement negotiations
- Changes in case reserving adequacy over time (systematic strengthening or weakening) distort development triangle patterns; the [[Berquist-Sherman Method|Berquist-Sherman]] adjustment restates historical triangles to current reserve levels
- Total unpaid claim liability = Case Reserves + IBNR; case reserves cover known claims while IBNR covers unreported claims and development on known claims

> [!example]- Case Reserves in the Incurred Triangle {Example}
> At 12-month evaluation, AY 2023 has \$$400{,}000$ paid and \$$600{,}000$ in case reserves. The 12-to-ultimate CDF is $1.50$.
>
> > [!answer]-
> > Reported (incurred) at 12 months $= 400{,}000 + 600{,}000 = \$1{,}000{,}000$
> >
> > Chain ladder ultimate $= 1{,}000{,}000 \times 1.50 = \$1{,}500{,}000$
> >
> > IBNR $= 1{,}500{,}000 - 1{,}000{,}000 = \$500{,}000$
