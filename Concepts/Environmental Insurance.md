---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:aeed1a36fcf9e454543783c1ce24c72787983590deb23055ac31c7b94a48314f
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form, Additional Coverage d. Pollutant Clean-up and Removal ($10,000; only if release caused by a Covered Cause of Loss), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO CP 10 30 10 12 Causes of Loss - Special Form, exclusion l. (release of pollutants unless caused by a specified cause of loss), sha256:119fcd978212db836e1084ca8ca90c0fdacb60d157caf4867bbc7b4e02f498e3 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2018/09/CP.10.30.10.12-1-1.pdf"
    - "Northern Kentucky University for U.S. EPA, Environmental Insurance Products Available for Brownfields Redevelopment (2006), Executive Summary pp.1-2 (PL: third-party cleanup, BI/PD, defense, on-site cleanup; 1-10 year terms; ERPs) and ch.3 p.28 (cost cap: costs above estimated cleanup per remediation plan; SIR 10-30%; co-insurance 10-30%), sha256:7b8050d35d9a7e61d642e75339446ea3d81912fdcb8a221b83640ff83a2b5178 — https://www.clu-in.org/download/btsc/enviro_insurance_2006.pdf"
    - "U.S. EPA, Superfund Liability page (strict, joint and several, retroactive), read 2026-10-10, sha256:134a0cd82aaeec64157164312a766363c67b6be1c2a20e45cada6a39a770cd4f — https://www.epa.gov/enforcement/superfund-liability"
    - "40 C.F.R. part 280 subpart H, §280.93 (petroleum UST owners must demonstrate financial responsibility for corrective action and third-party BI/PD) and §280.97 (insurance), eCFR read 2026-10-10, sha256:37e032194b8ed36fbcc4c38f53f962a257ba51448ebbffbb6db37cef1dcdd0a4 — https://www.ecfr.gov/current/title-40/part-280"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Environmental Insurance.md
---

**Environmental Insurance** is the family of policies that cover pollution losses which standard commercial policies exclude, such as a business's liability for injury or damage caused by pollutants and the cost of cleaning contamination up. Its main forms are:

1. **Pollution legal liability** (PLL), for pollution conditions at a site.
2. **Contractor's pollution liability** (CPL), for pollution a contractor's operations cause.
3. **Remediation cost cap**, for overruns on a known, planned cleanup.
4. **Storage tank policies**, for releases from scheduled tanks.

## Pollution under standard commercial policies

The standard [[Commercial General Liability|CGL]] excludes bodily injury and property damage from the actual, alleged or threatened discharge of pollutants, and the cost of testing for or cleaning them up. Narrow exceptions give back cover for a few situations, such as fumes from a hostile fire or a building's heating equipment. The current exclusion has no exception for sudden or accidental releases, so most sudden or gradual pollution from a business's premises or operations is uninsured under the CGL.

The [[Building and Personal Property Coverage Form|building and personal property form]] excludes pollution damage. It pays only a small additional amount for removing pollutants from the insured's own land, and only when a covered cause of loss released them. Gradual leakage from corroded equipment is not a covered cause of loss.

## Pollution legal liability

A site pollution legal liability policy covers third-party bodily injury and property damage, and cleanup costs on and off the site, from pollution conditions at a scheduled location. It covers pre-existing conditions the insured did not know of, as well as new releases. It is written claims-made and can run for several years, which suits a property sale or a lender's needs.

Liability for cleanup can be [[Strict Liability|strict]] and [[Joint and Several Liability|joint and several]] under federal and state environmental law, so an owner can be liable for contamination someone else caused, such as a previous owner. That is why buyers and lenders want PLL with cover for pre-existing conditions.

> [!example]- Which of this manufacturer's policies pay for its leaking tank, and how much? {Example}
> A manufacturer's solvent tank corrodes and leaks for months, contaminating the manufacturer's land and a neighbour's well. The manufacturer has a CGL with the standard pollution exclusion, a building and personal property policy, and a site PLL policy with a $\$5{,}000{,}000$ limit and a $\$100{,}000$ retention. The costs are:
>
> | Cost | Amount ($) |
> | :--- | ---: |
> | Cleanup of the manufacturer's site | 220,000 |
> | Cleanup of the contamination that migrated off the site | 480,000 |
> | Settlement of the neighbour's property damage claim | 350,000 |
>
> > [!answer]-
> > - The CGL excludes the neighbour's claim and the cleanup, because both arise from the discharge of pollutants.
> > - The property policy's pollutant cleanup coverage does not apply, because a gradual leak from corrosion is not a covered cause of loss.
> > - The PLL policy covers on-site and off-site cleanup and third-party damage from a pollution condition at the scheduled location.
> > - It pays $220{,}000 + 480{,}000 + 350{,}000 - 100{,}000 = \$950{,}000$, and the manufacturer bears the $\$100{,}000$ retention.

## Contractor's pollution liability

A contractor's pollution liability policy covers pollution a contractor causes at a job site, such as disturbing asbestos or releasing fuel. It follows the contractor's work rather than a fixed location, so a contractor that causes a release at a client's site needs CPL, since the client's PLL covers the client. Its aggregate limit can be used up by claims from the contractor's other projects. A developer can instead buy one owner-controlled policy covering every party on its project.

## Remediation cost cap

A remediation cost cap, or cleanup stop-loss, is bought once contamination is known and a cleanup plan is agreed. The risk it covers is the uncertainty in how much contamination there is and how long it takes to remove, not whether a loss occurs. It pays cost overruns above the expected cost and a self-insured buffer, usually with coinsurance, so the amount it pays is

> $$\text{Paid} = \min\left((1 - c)\,(C - E_0 - S)^+,\ L\right)$$

- $C$ is the actual cleanup cost.
- $E_0$ is the expected cleanup cost in the agreed remediation plan.
- $S$ is the insured's self-insured buffer above it, and $E_0 + S$ is the attachment point.
- $c$ is the insured's coinsurance share above the attachment point.
- $L$ is the policy limit.

> [!example]- What does this cost cap pay, and what does the developer bear? {Example}
> A developer buys a former industrial site whose agreed cleanup plan is estimated at $\$4{,}000{,}000$. Its cost cap policy attaches above the estimate plus a self-insured buffer of 10% of the estimate, and has a $\$5{,}000{,}000$ limit and 10% coinsurance. During the work more contamination is found, and the cleanup costs $\$6{,}200{,}000$.
>
> > [!answer]-
> > - The attachment point is $4{,}000{,}000 + 0.10 \times 4{,}000{,}000 = \$4{,}400{,}000$.
> > - The insurer pays $0.90 \times (6{,}200{,}000 - 4{,}400{,}000) = \$1{,}620{,}000$, which is within the limit.
> > - The developer bears $\$4{,}580{,}000$: the $\$4{,}000{,}000$ it expected to spend, the $\$400{,}000$ buffer and $\$180{,}000$ of coinsurance.

## Storage tank policies

Owners of underground storage tanks holding petroleum must show financial responsibility for cleanup and third-party claims under federal and state rules. A storage tank policy is a common way to meet the requirement, and it covers releases from the scheduled tanks.

> [!trap] Using a cost cap for unknown contamination
> A remediation cost cap covers overruns on a cleanup that is already planned. It does not pay the expected cost, and it is not liability insurance for unknown contamination, which is what PLL covers.
