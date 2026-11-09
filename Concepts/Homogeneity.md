---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:630af785e190345c7bad46fcb4f222b7ae3590e1abbbc52deb5b5061f3f5a8f1
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 pp.155-158 (PDF pp.167-170), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 pp.29-30 (PDF pp.35-36), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; reinstated May 2021), Section III p.3, Homogeneity and Credibility, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Homogeneity.md
---

![[Media/Figures/Homogeneity.svg|340]]

**Homogeneity** is the property of a group of risks with similar expected costs, so that their experience can be averaged into one rate, or projected with one development pattern, without material distortion. It is about expected costs, not actual ones: even identical risks have different loss experience in a policy period, because insured events are random. A classification aims for groups that are homogeneous within and heterogeneous between, and it is traded against [[Credibility|credibility]], because a finer group has less data.

> [!example]- Is this commercial auto class of light trucks homogeneous? {Example}
> A commercial auto class of light trucks is rated at one rate. Its experience by radius of operation is:
>
> | Radius | Exposures | Losses ($) |
> | :--- | ---: | ---: |
> | Local | 6,000 | 3,600,000 |
> | Intermediate | 2,500 | 2,125,000 |
> | Long haul | 1,500 | 2,250,000 |
>
> > [!answer]-
> > - The pure premiums are $\$600$ local, $\$850$ intermediate and $\$1{,}500$ long haul.
> > - The class pure premium is $7{,}975{,}000/10{,}000 = \$797.50$, so the relativities are $0.75$, $1.07$ and $1.88$.
> > - Long-haul risks cost more than twice as much as local ones, so the class is not homogeneous.
> > - The single rate is 33% above the local trucks' cost and 47% below the long-haul trucks'. Radius of operation should become a [[Rating Variable|rating variable]], with credibility-weighted relativities.

## Homogeneity as a criterion for a rating variable

Werner & Modlin, after Finger, group the criteria for evaluating a rating variable into four categories:

1. **Statistical**: statistical significance, homogeneity and credibility.
2. **Operational**: objective, inexpensive to administer and verifiable.
3. **Social**: affordability, causality, controllability and privacy concerns.
4. **Legal**: the variable is permitted by law.

Homogeneity is one of the statistical criteria. If a group contains materially different risks, it is subdivided with more levels of a variable or a new variable. If a level has too few risks or is unstable, similar levels are combined to make it credible, as ASOP No. 12 asks the actuary to consider. Creating more groupings can improve homogeneity and reduce discontinuities between rates, but it reduces credibility and raises expense.

## Homogeneity and adverse selection

A heterogeneous class charges its better risks more than their cost and its worse risks less. A competitor that segments more finely can quote the better risks a lower rate and take them, while the worse risks stay, so the insurer's average loss cost rises. This is [[Adverse Selection|adverse selection]]. Overly broad rating territories are an example: one average territorial relativity overcharges the better risks and undercharges the worse. An insurer that introduces a rating variable that better matches rates to risk can attract lower-risk classes with lower rates, which improves its long-run profitability.

## Homogeneity in reserving

Friedland subdivides claims into groups with similar characteristics on:

1. Consistency of the coverage triggered, so that the claims are subject to similar laws, policy terms and claims handling.
2. The volume of claim counts.
3. The time to report a claim once it has occurred.
4. The ability to set an appropriate case reserve through the life of the claim.
5. The time to settle a claim once it is reported.
6. The likelihood that a claim reopens once it is settled.
7. The average settlement value, the severity.

Development techniques assume the historical pattern applies to the immature years. Data that blends segments with different patterns, such as short-tailed and long-tailed coverages, gives development factors that describe neither, and they become biased when the mix between the segments shifts. Splitting the data restores homogeneity but reduces the volume in each segment and makes its link ratios more variable. Reinsurance data, with its varied treaties and retentions, is especially hard: split into homogeneous groups it loses credibility.

> [!example]- A commercial package book is reserved with one triangle. Property claims develop by a 12-to-24 factor of 1.05 and liability claims by 1.60, and liability is 42% of the losses at 12 months, giving a combined factor of 1.28. What happens if liability grows to 55% of the losses at 12 months? {Example}
> - The combined factor is a weighted average of the two coverages' factors, by their share of the losses at 12 months.
> - At a 55% liability share, the true combined factor is $0.45 \times 1.05 + 0.55 \times 1.60 = 1.35$.
> - The historical triangle still shows 1.28, so it understates the development on the latest years.
> - Separate property and liability triangles are each homogeneous, and the combined estimate is their sum.

> [!trap] Combining segments because their frequencies match
> Two segments with the same claim frequency can still report and settle at different speeds. Homogeneity for reserving is about development and settlement patterns, so compare the segments' development factors and diagnostics, not their frequencies.
