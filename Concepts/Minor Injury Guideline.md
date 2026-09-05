---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:11d576ffb7dd4cc1590035275b2f3604b5f64426ca8e866f3f8d61339d91080b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Minor Injury Guideline.md
---

**The Minor Injury Guideline** (MIG) is the regulatory cap and treatment protocol applied to soft-tissue automobile injuries — sprains, strains, whiplash, contusions — limiting the [[Statutory Accident Benefits|accident benefits]] payable and prescribing a standard course of treatment. It is the highest-volume, lowest-severity tier of the injury structure, and the most heavily litigated boundary in Canadian auto insurance.

- **Why it exists.** Minor injuries are numerous, hard to verify objectively, and were historically an open-ended treatment exposure. Capping them converts a diffuse severity problem into a fixed cost per claim and removes the incentive to extend treatment.
- **The design.** A defined list of injuries, a monetary cap (Ontario's has been $\$3{,}500$ for medical and rehabilitation), a pre-approved treatment framework so care starts without insurer approval, and an escape route for claimants with a **pre-existing condition** that would prevent recovery within the cap.
- **The escape route is where the cost goes.** Since falling outside the MIG multiplies the available limit, claimants and providers have a strong incentive to establish that the injury is not minor — through a pre-existing condition, a chronic pain diagnosis, or a psychological component. The observed result across reforms is that the *proportion* of claims held within the MIG erodes over time.
- **Actuarial consequence.** The MIG changes the claim severity distribution from continuous to nearly **bimodal**: a large mass at the cap and a separate, much heavier tail of claims that escaped it. Average severity is then a poor summary, and the reserving question becomes "what share escapes the cap, and is that share drifting?"
- The MIG is a **guideline** issued under regulation, so it can be revised administratively. That flexibility cuts both ways: it can be tightened after cost creep, and it can be widened under political pressure.

> [!example]- Cost Creep Out of the Cap {Example}
> An insurer's accident benefit claims by tier, as a percentage of claim count:
>
> - Year 1: MIG $72\%$, non-catastrophic $27\%$, catastrophic $1\%$
> - Year 4: MIG $58\%$, non-catastrophic $41\%$, catastrophic $1\%$
>
> Average severity is $\$3{,}400$ within the MIG and $\$48{,}000$ outside it (non-catastrophic). Frequency is unchanged. What has happened to loss cost per claim?
>
> > [!answer]-
> > Excluding the catastrophic tier, compute the average over the MIG and non-catastrophic claims.
> >
> > $$\begin{align*}
> > \text{Year 1} &= \frac{0.72(\$3{,}400) + 0.27(\$48{,}000)}{0.99} \\
> > &= \frac{\$2{,}448 + \$12{,}960}{0.99} \\
> > &= \$15{,}564
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Year 4} &= \frac{0.58(\$3{,}400) + 0.41(\$48{,}000)}{0.99} \\
> > &= \frac{\$1{,}972 + \$19{,}680}{0.99} \\
> > &= \$21{,}871
> > \end{align*}$$
> >
> > An increase of $41\%$ over three years — roughly $12\%$ per year — with **no change in frequency and no change in either tier's severity**. The entire trend is migration across the boundary.
> >
> > This is the single most important diagnostic in Canadian accident benefits, and it has two consequences. First, a severity trend fitted to the *combined* data will attribute the increase to inflation and project it forward indefinitely, which is wrong: migration is bounded (it cannot exceed $100\%$ escaping) while inflation is not. Second, the correct pricing response is to model the **tier mix** as its own variable, because that is where the cost actually lives — and it is a variable a [[Automobile Insurance Reform|reform]] can move overnight in either direction.
