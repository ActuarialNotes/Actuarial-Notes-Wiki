---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:222d03c5e192ab2748d1366ce5db15f68eb503785f18b9618ccabf1ef94c285f
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 p. 47 (underwriting executive questions); Ch. 7 pp. 103-105 (product mix); Ch. 8 p. 137 (adjust a priori for pricing/underwriting changes); Ch. 13 pp. 283-284, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p. 82 (distributional changes, average premium); Ch. 6 p. 110 (distributional changes in loss trend), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Underwriting Changes.md
---

![[Media/Figures/Underwriting_Changes.svg|340]]

**Underwriting Changes** are changes in the guidelines an insurer uses to select, accept and place risks, such as which risks it accepts, declines or refers, which classes of business it emphasizes and which risks it declines to renew. They change which risks are in the book, so they change its claim levels and can change its development patterns.

An underwriting change reaches the data in four ways:

1. **Claim level**: tightening the guidelines, writing fewer high-risk exposures and non-renewing poorly performing risks lowers the expected loss ratio without a rate change.
2. **Frequency**: a one-time change that lowers claim counts makes a frequency trend fitted across it more negative than the underlying trend.
3. **Development**: a new emphasis on classes that develop differently changes the [[Mix of Business|mix of business]], so development factors from the old mix misstate the new one.
4. **Price adequacy**: risks the rates did not contemplate make the rates inadequate for the business actually written.

[[Policy Year|Policy year]] data match claims to the policies written under one set of guidelines, which makes them valuable after an underwriting change. When new business differs from existing business, the actuary splits the claims into homogeneous groups and develops each separately. The reported [[Chain Ladder Method|development technique]] still responds to a change in the claim ratio, provided claims handling and case adequacy are unchanged. When little experience exists under the new guidelines, the [[Expected Loss Method|expected claims]] or [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] technique, with an expected claim ratio from judgment or industry data, is preferable, because it does not rely solely on the historical development pattern.

> [!example]- An insurer stops writing contractors with more than three prior losses, and high-hazard contractors fall from $30\%$ of its premium to $5\%$. What happens to its reserving and pricing analyses? {Example}
> - The accident years after the change contain a better book, so their loss ratios fall for a reason unrelated to the adequacy of the rates.
> - Development factors from years with six times as much high-hazard business misstate the new book, so the actuary gives less weight to the years before the change or segments the data by hazard.
> - The historical experience in a rate indication describes a book the insurer no longer writes, so it is restated to the current mix before it is used.

> [!example]- Claim frequency was $0.050$ per exposure in $2020$, $2021$ and $2022$, and $0.045$ in $2023$ and $2024$, after tighter guidelines cut claim counts once. What trend does a fit from $2020$ to $2024$ imply, and what should be selected? {Example}
> - From $2020$ to $2024$ the annual trend is $(0.045/0.050)^{1/4} - 1 = -2.6\%$.
> - The underlying frequency did not change apart from the one-time drop, so the true trend is $0\%$.
> - Projected three years forward, the fitted trend understates frequency by a factor of $0.974^{3} = 0.924$.
> - The actuary selects the trend from the years after the change, or adjusts the fitted trend toward $0\%$, which raises the trended losses.
> - If the trend was already fitted only to years after the change, the estimate is unchanged.

## Underwriting and pricing

Underwriting is the function that selects and accepts risks so that the risks written stay close to the average the rates assume. Filed class rates are charged per exposure and do not adjust automatically to the quality of the risks written. A change in them requires a new rate filing, but an underwriting change reaches the losses as soon as the policies are written and earned.
