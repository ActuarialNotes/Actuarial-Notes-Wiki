---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7c3308efb7fbf2be9c21ad30324dad34c3dc5d8798bd9208defc54570df721a7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Environmental Insurance.md
---

**Environmental Insurance** is the family of policies that cover pollution losses which standard commercial policies exclude, such as a business's liability for injury or damage caused by pollutants and the cost of cleaning contamination up. The main forms are pollution legal liability for a site, contractor's pollution liability for operations, remediation cost cap policies for known cleanups, and storage tank policies. They exist because the [[Commercial General Liability|CGL]] carries a broad pollution exclusion and property forms pay only a small amount for pollutant cleanup.

> $$A = E_0 + S$$

> $$\text{Paid} = \min\left((1 - c)\,(C - A)^+,\ L\right)$$

- **Symbols:** These describe a remediation cost cap. $E_0$ is the expected cleanup cost in the agreed remediation plan, $S$ is the insured's self-insured buffer above it, and $A$ is the attachment point. $C$ is the actual cleanup cost, $c$ is the insured's coinsurance share above the attachment and $L$ is the policy limit.
- **The CGL pollution exclusion:** Since the mid-1980s the standard CGL has excluded bodily injury and property damage from the actual, alleged or threatened discharge of pollutants, and the cost of testing for or cleaning them up. Narrow exceptions give back cover for a few situations, such as fumes from a hostile fire or a building's heating equipment. Most gradual or sudden pollution from a business's premises or operations is therefore uninsured under the CGL.
- **Property policies:** The [[Building and Personal Property Coverage Form|building and personal property form]] excludes pollution damage and pays only a small additional amount for removing pollutants from the insured's own land, and only when a covered cause of loss released them. Gradual leakage from corroded equipment is not a covered cause of loss.
- **Pollution legal liability:** A site pollution legal liability (PLL) policy covers third-party bodily injury and property damage, and cleanup costs on and off the site, from pollution conditions at a scheduled location. It covers pre-existing conditions the insured did not know of, as well as new releases, is written claims-made, and can run for several years, which suits a property sale or a lender's needs. Liability for cleanup can be strict and joint and several under federal and state environmental law ([[Strict Liability]], [[Joint and Several Liability]]), so an owner can be liable for contamination someone else caused.
- **Contractor's pollution liability:** A contractor's pollution liability (CPL) policy covers pollution a contractor causes at a job site, such as disturbing asbestos or releasing fuel. It follows the contractor's work rather than a fixed location and is often written on an occurrence basis.
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
> - **Absolute, not sudden and accidental:** The current CGL pollution exclusion removes nearly all pollution, sudden or gradual. The older "sudden and accidental" exception that once gave back abrupt releases is no longer in the standard form.
> - **Cost cap needs a known loss:** A remediation cost cap covers overruns on a cleanup that is already planned. It does not cover the expected cost, and it is not liability insurance for unknown contamination, which is what PLL does.
> - **Site versus operations:** PLL follows a location, and CPL follows a contractor's work. A contractor that causes a release at a client's site needs CPL, since the client's PLL covers the client.
> - **Strict liability:** An owner can owe cleanup costs for contamination a previous owner caused. That is why buyers and lenders want PLL with cover for pre-existing conditions.
