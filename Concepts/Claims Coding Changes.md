---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:7d010793804ace24eacc8c0a4cb5e7b3e706abdbcd2d34d5e665c424c47e9d4b
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 pp. 46 (claims Qs 7-9: claimant vs accident, per coverage, reopened claims), 48 (data-processing Q5 coding procedures, Q10 claimant vs occurrence); Ch. 6 pp. 74, 76 (reopened, CNP, consistent claim-count definitions); Ch. 13 p. 283 (exposures instead of counts after a change in claim definition), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claims Coding Changes.md
---

![[Media/Figures/Claims_Coding_Changes.svg|340]]

**Claims Coding Changes** are changes in how an insurer's systems record its claims: what counts as one claim, how a reopened claim is coded, which claims are counted at all, and the period, line and coverage a claim is recorded under. They change the claim counts and the cells of the [[Development Triangle|triangles]] without changing the cost of any claim.

The coding the actuary needs to know, and to see held constant through the experience period, is:

1. **Claimant or occurrence**: whether an accident with several claimants, or with payments under several coverages, is one claim or several.
2. **Reopened claims**: whether a reopened claim is coded as a new claim or as the original claim reopened, which can make the closed counts decrease across a row.
3. **Claims closed without payment**: whether they are in the closed counts, and whether a claim with no case outstanding and no payment is in the reported counts.
4. **Allocation**: the accident period, line and coverage a claim and its payments are recorded under, including payments not yet allocated to an accident period.

Counting claims closed without payment, or claims with no case outstanding and no payments, gives much lower average values. What matters most is that the actuary knows the definition and that it is the same throughout the experience period. A change in the definition of a claim count has a significant effect on every diagnostic and every technique that uses claim counts.

The [[Frequency-Severity Method|frequency-severity techniques]] are the most exposed, because they assume that future claim count development will be similar to past claim count development. Reopened claims can distort both the frequency and the severity, so where they are numerous the actuary may analyze them separately. Berquist and Sherman suggest earned exposures in place of claim counts when the count data are of questionable accuracy or the definition of a claim count has changed.

> [!example]- Reported counts and losses at $12$ months were $2{,}000$ and $\$9{,}000{,}000$ for accident year $2021$, $2{,}060$ and $\$9{,}500{,}000$ for $2022$, $2{,}120$ and $\$9{,}900{,}000$ for $2023$, and $2{,}950$ and $\$10{,}300{,}000$ for $2024$. What does the jump in $2024$ suggest? {Example}
> - The average reported severity is about $\$4{,}500$, $\$4{,}612$ and $\$4{,}670$ for $2021$ to $2023$, and $10{,}300{,}000/2{,}950 = \$3{,}492$ for $2024$.
> - Counts rose $39\%$ in $2024$ while losses rose $4\%$, so the extra claims cost almost nothing.
> - A frequency increase that large with no growth in losses is far more likely a change in what is counted, such as claimants instead of occurrences or claims with no payment, than a change in experience.
> - Frequency-severity projections, count development factors and the average case outstanding all use these counts, so the actuary gets counts on one definition before using any of them.

> [!example]- A workers compensation insurer starts coding a reopened claim as a new claim instead of reopening the original one. What happens to its counts and averages? {Example}
> - Every reopening now adds a reported claim, so reported counts rise from the date of the change with no new accidents.
> - Frequency rises, and the average severity per claim falls, because the reopened claims are counted twice.
> - The count development factors spanning the change mix the two definitions.
> - The actuary recodes the history on one definition, or segregates the reopened claims and analyzes them separately.
