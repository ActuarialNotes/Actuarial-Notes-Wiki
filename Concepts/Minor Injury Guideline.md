---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:472c223991e6eb2aaeb514746828274a15d69b44fdcedd2ab5c242189860004e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Minor Injury Guideline.md
---

![[Media/Figures/Minor_Injury_Guideline.svg|340]]

The **Minor Injury Guideline** (MIG) is the regulatory cap and treatment protocol applied to soft-tissue automobile injuries, such as sprains, strains, whiplash and contusions. It limits the [[Statutory Accident Benefits|accident benefits]] payable and prescribes a standard course of treatment.

It is the highest-volume, lowest-severity tier of the injury structure, and the most heavily litigated boundary in Canadian auto insurance. Minor injuries are numerous, hard to verify objectively, and were historically an open-ended treatment exposure. Capping them converts a diffuse severity problem into a fixed cost per claim and removes the incentive to extend treatment.

The guideline has four parts:

1. A defined list of injuries.
2. A monetary cap. Ontario's has been $\$3{,}500$ for medical and rehabilitation benefits.
3. A pre-approved treatment framework, so care starts without insurer approval.
4. An escape route for claimants with a pre-existing condition that would prevent recovery within the cap.

The MIG is a guideline issued under regulation, so it can be revised administratively. It can be tightened after cost creep, and it can be widened under political pressure.

## Escape from the cap

Falling outside the MIG multiplies the available limit, so claimants and providers have a strong incentive to establish that the injury is not minor, through a pre-existing condition, a chronic pain diagnosis or a psychological component. The observed result across reforms is that the proportion of claims held within the MIG erodes over time.

The MIG changes the claim severity distribution from continuous to nearly bimodal: a large mass at the cap and a separate, much heavier tail of claims that escaped it. Average severity is then a poor summary, and the reserving question becomes what share escapes the cap, and whether that share is drifting.

> [!example]- What has happened to this insurer's average cost per non-catastrophic claim? {Example}
> An insurer's accident benefit claims, as a percentage of claim count, are:
>
> | Tier | Year 1 | Year 4 | Average severity |
> | :--- | ---: | ---: | ---: |
> | MIG | $72\%$ | $58\%$ | $\$3{,}400$ |
> | Non-catastrophic | $27\%$ | $41\%$ | $\$48{,}000$ |
> | Catastrophic | $1\%$ | $1\%$ | |
>
> Frequency and each tier's severity are unchanged.
>
> > [!answer]-
> > - Leaving out the catastrophic tier, the MIG and non-catastrophic claims are $99\%$ of the count in both years.
> > - In Year 1 the average is $(0.72 \times \$3{,}400 + 0.27 \times \$48{,}000)/0.99 = \$15{,}564$.
> > - In Year 4 the average is $(0.58 \times \$3{,}400 + 0.41 \times \$48{,}000)/0.99 = \$21{,}871$.
> > - That is an increase of $41\%$ over three years, roughly $12\%$ a year, with no change in frequency or in either tier's severity.
> > - The entire trend is migration across the boundary, so the pricing response is to model the tier mix as its own variable, one an [[Automobile Insurance Reform|reform]] can move overnight in either direction.

> [!trap] Projecting migration as a severity trend
> A severity trend fitted to the combined data attributes the increase to inflation and projects it forward indefinitely. Migration is bounded, since no more than $100\%$ of claims can escape the cap, while inflation is not.
