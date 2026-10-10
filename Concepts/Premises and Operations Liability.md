---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:b0883a531b4c5bbccee6ef9945fb0719c2a0d0d8276f10b8cfd2bfa151241e6e
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, Cov A 2.b insured contract; Cov C; III; V.16 PCOH; V.9 insured contract, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "FC&S Editors, 'Bases of Liability Premium', PropertyCasualty360, 9 Oct 2012, payroll, gross sales, area, total cost, sha256:3098468d31acf87f67490601c66a720666953277f266b0692ff23c3d387ab3ed — https://www.propertycasualty360.com/fcs/2012/10/09/bases-of-liability-premium/"
    - "LII Wex, 'independent contractor', entry, sha256:dc17e9075951c353b9492692ee72547cc0cbbe07870a3733fb30938519d41dc6 — https://www.law.cornell.edu/wex/independent_contractor"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Premises and Operations Liability.md
---

**Premises and Operations Liability** is a business's liability for bodily injury and property damage arising from the condition of the premises it owns, rents or controls, or from its ongoing operations, whether on those premises or at a job site away from them. Under the [[Commercial General Liability|commercial general liability]] form it is everything in Coverage A outside the products-completed operations hazard, and it is paid out of the general aggregate. Underwriters treat it as a separate hazard because it is driven by what happens while the business is operating, while the [[Products and Completed Operations Liability|products-completed operations]] hazard is driven by what the business has already sold or finished.

> $$P = \left(\sum_j r_j \times \frac{E_j}{u_j}\right) \times \text{ILF}(L) \times (1 + m)$$

- **Symbols:** $r_j$ is the premises and operations rate for classification $j$, $E_j$ is its exposure on the classification's [[Exposure Base|premium base]], and $u_j$ is the unit the rate is quoted per, such as \$1,000 of payroll. The rates are for a basic limit, so $\text{ILF}(L)$ is the [[Increased Limits|increased limits factor]] for the limit $L$ the insured buys, and $m$ is a [[Schedule Rating|schedule rating]] credit or debit, negative for a credit.
- **The premises hazard:** It depends on the physical condition and maintenance of the premises, how many members of the public come onto them, and what they do there. A store with heavy foot traffic, wet floors and stairs has a larger exposure than an office with few visitors. Housekeeping, lighting, snow and ice removal, security and the condition of parking areas are the usual points of inspection. See [[Premises Liability]].
- **The operations hazard:** It depends on what the insured does and where. A contractor's exposure is mostly away from its own premises, at job sites where its work can injure the public, damage a neighbor's property or damage the property it is working on. Excavation, demolition, roofing and work at heights carry far more hazard than interior finishing.
- **Contractors and subcontractors:** A general contractor is liable for injuries caused by its subcontractors' work. An underwriter therefore asks how much work is subcontracted, whether each subcontractor carries its own liability insurance with adequate limits, and whether the subcontracts transfer liability back to the subcontractor and add the general contractor as an additional insured ([[Endorsement]]). Certificates of insurance collected before the work starts are the evidence.
- **Contractual liability:** The CGL covers liability the insured assumes under an "insured contract", such as a lease or a hold-harmless agreement in a construction contract. The underwriter reviews the contracts the insured signs, because a broad indemnity clause can make it responsible for losses caused by others' negligence.
- **Exposure bases:** ISO rates each classification on the base that best tracks its exposure. Contractors are rated on payroll, because payroll measures the amount of work done; stores and restaurants on gross sales; building owners on area; and work let to subcontractors on its total cost. Because the exposure is estimated at inception, the premium is a deposit settled by a [[Premium Audit|premium audit]] after the policy ends.
- **Medical payments:** Coverage C pays medical expenses for members of the public injured on the premises or by the operations, regardless of fault. It belongs to the premises and operations hazard, and frequent small medical payment claims often signal poor housekeeping ([[Medical Payments Coverage]]).
- **What is excluded:** Injury to the insured's own employees goes to [[Workers Compensation Insurance|workers compensation]] and [[Employers Liability Insurance|employers liability]], and accidents involving autos go to [[Business Auto Coverage|business auto]]. A premises and operations underwriter must still consider them, because an account written for general liability is often written for those lines as well.

> [!example]- Premium for a Contractor's Premises and Operations {Example}
> A plumbing contractor estimates payroll of \$850,000 for the coming year, excluding clerical staff, who are rated in a separate low-rated class with payroll of \$120,000. It also expects to let \$300,000 of work to insured subcontractors. With illustrative rates, the plumbing class is \$9.80 per \$1,000 of payroll, clerical is \$0.35 per \$1,000 of payroll, and subcontracted work is \$1.75 per \$1,000 of total cost. The insured wants a \$1,000,000 occurrence limit, whose increased limits factor is 1.60, and the underwriter gives a 10% schedule credit for a strong safety program. Find the premises and operations premium.
>
> > [!answer]-
> > Each class's rate applies to its own exposure, and the factors apply to the total.
> > $$
> > \begin{align*}
> > \text{Plumbing} &= 9.80 \times 850 \\
> > &= 8{,}330.00 \\
> > \text{Clerical} &= 0.35 \times 120 \\
> > &= 42.00 \\
> > \text{Subcontracted} &= 1.75 \times 300 \\
> > &= 525.00 \\
> > P &= 8{,}897.00 \times 1.60 \times 0.90 \\
> > &= 12{,}811.68
> > \end{align*}
> > $$
> > The subcontracted work carries a small rate because the subcontractors' own insurers bear most of its exposure. If the audit finds that a subcontractor had no insurance, its work exposes the plumbing contractor much more directly, and the insurer may rate that cost like the contractor's own payroll.

> [!example]- Who Pays for a Subcontractor's Accident {Example}
> The plumbing contractor's subcontractor drops a pipe from a scaffold, injuring a pedestrian, who sues both firms and recovers \$400,000. The subcontract contains a hold-harmless clause in the general contractor's favor, and the subcontractor's CGL has a \$1,000,000 limit and names the general contractor as an additional insured. How is the loss shared?
>
> > [!answer]-
> > The pedestrian can recover from the general contractor, which is liable for its subcontractors' operations, so the loss falls within the general contractor's premises and operations coverage.
> > $$
> > \begin{align*}
> > \text{Paid by sub's insurer} &= \min(400{,}000,\ 1{,}000{,}000) \\
> > &= 400{,}000 \\
> > \text{Left for the GC's insurer} &= 400{,}000 - 400{,}000 \\
> > &= 0
> > \end{align*}
> > $$
> > The additional insured status and the hold-harmless clause both move the loss to the subcontractor's insurer, which is why the general contractor's own policy charges only a small rate on insured subcontracted work. Had the subcontractor been uninsured, the general contractor's insurer would have paid the \$400,000 and been left with an indemnity claim against a small firm that may be unable to pay.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask what an underwriter considers in premises and operations liability: the condition and use of the premises, the nature of the operations and how much happens away from the premises, the use of subcontractors and the evidence of their insurance, and the contracts the insured signs. Others ask which premium base suits a class, or compute a premium from rates and exposures.

> [!warning]- Exam traps
> - **Away from the premises is still operations:** Injury at a job site while the work is in progress is a premises and operations loss. It becomes a completed operations loss only after the work is completed.
> - **Subcontracted work is still the insured's exposure:** The general contractor is liable for its subcontractors' operations, which is why their total cost is rated. Leaving it out understates the exposure, and assuming the subcontractors' insurance removes it entirely ignores uninsured or underinsured subcontractors.
> - **The base fits the class:** Payroll for a contractor and sales for a store are not interchangeable. A question that gives both expects the base ISO uses for that class.
> - **Factors apply to the total:** The increased limits factor and schedule rating apply to the basic limits premium for all the classes combined, not just the largest one.
