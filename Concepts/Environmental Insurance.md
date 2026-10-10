---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:1522a9137d7cd2c80bb66f77a43473fa0344ecebb10e4dce3de540b3f8f1b4c6
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

**Environmental Insurance** is the family of policies that cover pollution losses which standard commercial policies exclude, such as a business's liability for injury or damage caused by pollutants and the cost of cleaning contamination up. The main forms are pollution legal liability for a site, contractor's pollution liability for operations, remediation cost cap policies for known cleanups, and storage tank policies. They exist because the [[Commercial General Liability|CGL]] carries a broad pollution exclusion and property forms pay only a small amount for pollutant cleanup.

> $$A = E_0 + S$$

> $$\text{Paid} = \min\left((1 - c)\,(C - A)^+,\ L\right)$$

- **Symbols:** These describe a remediation cost cap. $E_0$ is the expected cleanup cost in the agreed remediation plan, $S$ is the insured's self-insured buffer above it, and $A$ is the attachment point. $C$ is the actual cleanup cost, $c$ is the insured's coinsurance share above the attachment and $L$ is the policy limit.
- **The CGL pollution exclusion:** The standard CGL excludes bodily injury and property damage from the actual, alleged or threatened discharge of pollutants, and the cost of testing for or cleaning them up. Narrow exceptions give back cover for a few situations, such as fumes from a hostile fire or a building's heating equipment. Most gradual or sudden pollution from a business's premises or operations is therefore uninsured under the CGL.
- **Property policies:** The [[Building and Personal Property Coverage Form|building and personal property form]] excludes pollution damage and pays only a small additional amount for removing pollutants from the insured's own land, and only when a covered cause of loss released them. Gradual leakage from corroded equipment is not a covered cause of loss.
- **Pollution legal liability:** A site pollution legal liability (PLL) policy covers third-party bodily injury and property damage, and cleanup costs on and off the site, from pollution conditions at a scheduled location. It covers pre-existing conditions the insured did not know of, as well as new releases, is written claims-made, and can run for several years, which suits a property sale or a lender's needs. Liability for cleanup can be strict and joint and several under federal and state environmental law ([[Strict Liability]], [[Joint and Several Liability]]), so an owner can be liable for contamination someone else caused.
- **Contractor's pollution liability:** A contractor's pollution liability (CPL) policy covers pollution a contractor causes at a job site, such as disturbing asbestos or releasing fuel. It follows the contractor's work rather than a fixed location, so its aggregate limit can be used up by claims from the contractor's other projects; a developer can instead buy one owner-controlled policy covering every party on its project.
- **Remediation cost cap:** A cost cap, or cleanup stop-loss, is bought once contamination is known and a cleanup plan is agreed. It pays cost overruns above the expected cost and the buffer, usually with coinsurance, because the risk is the uncertainty in how much contamination there is and how long it takes to remove, not whether a loss occurs.
- **Storage tank policies:** Owners of underground storage tanks holding petroleum must show financial responsibility for cleanup and third-party claims under federal and state rules. A storage tank policy is a common way to meet the requirement, and it covers releases from the scheduled tanks.

> [!example]- Applying a Remediation Cost Cap {Example}
> A developer buys a former industrial site whose agreed cleanup plan is estimated at \$4,000,000. Its cost cap policy attaches above the estimate plus a self-insured buffer of 10% of the estimate, has a \$5,000,000 limit and 10% coinsurance. During the work, more contamination is found and the cleanup costs \$6,200,000. What does the insurer pay, and what does the developer bear?
>
> > [!answer]-
> > The attachment is the estimate plus the buffer, and the insurer pays 90% of the overrun above it.
> > $$
> > \begin{align*}
> > A &= 4{,}000{,}000 + 0.10 \times 4{,}000{,}000 \\
> > &= 4{,}400{,}000 \\
> > \text{Paid} &= 0.90\,(6{,}200{,}000 - 4{,}400{,}000) \\
> > &= 1{,}620{,}000
> > \end{align*}
> > $$
> > The payment is within the limit. The developer bears \$4,580,000: the \$4,000,000 it expected to spend, the \$400,000 buffer and \$180,000 of coinsurance. The policy turned an open-ended overrun into a known worst case, which is what a lender financing the project needs to see.

> [!example]- A Leaking Tank Under Three Policies {Example}
> A manufacturer's solvent tank corrodes and leaks for months. The leak contaminates the manufacturer's land and a neighbour's well. Costs are \$220,000 to clean up the manufacturer's site, \$480,000 to clean up the contamination that migrated off it, and \$350,000 to settle the neighbour's property damage claim. The manufacturer has a CGL with the standard pollution exclusion, a building and personal property policy, and a site PLL policy with a \$5,000,000 limit and a \$100,000 retention. Which policies pay?
>
> > [!answer]-
> > The CGL excludes the neighbour's claim and the cleanup, because both arise from the discharge of pollutants. The property policy's pollutant cleanup coverage does not apply either, because a gradual leak from corrosion is not a covered cause of loss. The PLL policy covers on-site and off-site cleanup and third-party damage from a pollution condition at the scheduled location.
> > $$
> > \begin{align*}
> > \text{Paid} &= 220{,}000 + 480{,}000 + 350{,}000 - 100{,}000 \\
> > &= 950{,}000
> > \end{align*}
> > $$
> > The manufacturer bears the \$100,000 retention. Without the PLL policy it would bear all \$1,050,000.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask why the CGL and property policies leave pollution largely uninsured, and what each environmental form covers: pollution legal liability, contractor's pollution liability, remediation cost cap and storage tank policies. The applied version describes an exposure, such as a property purchase, a contractor's job or a known cleanup, and asks which policy fits it.
> - **Liability law:** Environmental liability is a standard example of [[Strict Liability|strict liability]] in the insurance law assignments, where liability doesn't depend on fault.

> [!warning]- Exam traps
> - **Sudden or gradual alike:** The current CGL pollution exclusion has no exception for sudden or accidental releases, so apart from its narrow exceptions it removes sudden and gradual pollution alike.
> - **Cost cap needs a known loss:** A remediation cost cap covers overruns on a cleanup that is already planned. It does not cover the expected cost, and it is not liability insurance for unknown contamination, which is what PLL does.
> - **Site versus operations:** PLL follows a location, and CPL follows a contractor's work. A contractor that causes a release at a client's site needs CPL, since the client's PLL covers the client.
> - **Strict liability:** An owner can owe cleanup costs for contamination a previous owner caused. That is why buyers and lenders want PLL with cover for pre-existing conditions.
