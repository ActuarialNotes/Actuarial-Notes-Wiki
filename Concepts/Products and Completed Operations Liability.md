---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5ef34edb86f08910d555b83c1a508e34b41c21103f5a4009f83255372dc78e4e
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, V.16 PCOH incl. (a)-(c) completion tests; Cov A 2.k-n; III, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "LII Wex, 'products liability', entry, sha256:3932a61c3a07202fd010d53a48a95868ba5ce8965c19b11890b41f59b224daf5 — https://www.law.cornell.edu/wex/products_liability"
    - "FC&S Editors, 'Bases of Liability Premium', PropertyCasualty360, 9 Oct 2012, gross sales, sha256:3098468d31acf87f67490601c66a720666953277f266b0692ff23c3d387ab3ed — https://www.propertycasualty360.com/fcs/2012/10/09/bases-of-liability-premium/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Products and Completed Operations Liability.md
---

**Products and Completed Operations Liability** is a business's liability for bodily injury and property damage that happens away from its premises and arises from a product it made, sold or distributed, or from work it has completed. The [[Commercial General Liability|commercial general liability]] form calls this the products-completed operations hazard and gives it a separate aggregate limit, so losses from it never reduce the general aggregate that protects the [[Premises and Operations Liability|premises and operations]] exposure.

Injury or damage counts only if it occurs away from premises the insured owns or rents and arises from "your product" or "your work". Products still in the insured's physical possession and work not yet completed or abandoned are outside it, so a customer hurt by a product in the insured's showroom is a premises loss.

## When work is completed

Work is deemed completed at the earliest of three times: when all the work called for in the contract is done, when all the work at one job site is done if the contract covers several sites, or when that part of the work has been put to its intended use by anyone other than another contractor working on the same project. Work needing only service, correction or replacement is still treated as completed.

Injury while the work is in progress is a premises and operations loss. Work put to its intended use is completed even if the contract is unfinished, so a loss from a finished part of a job falls in this hazard.

## The products-completed operations aggregate

Occurrences within the hazard are paid in the order they happen. Occurrence $k$, costing $X_k$, is paid

> $$\text{Paid}_k = \min\left(X_k,\ L,\ A_{k-1}\right)$$

- $L$ is the each occurrence limit.
- $A_{k-1}$ is what remains of the products-completed operations aggregate before occurrence $k$ is paid, starting from the full aggregate $A_0$.

What remains of the aggregate after it is paid is

> $$A_k = A_{k-1} - \text{Paid}_k$$

Once the products-completed operations aggregate is exhausted, products claims are uninsured for the rest of the year, however much of the general aggregate remains.

> [!example]- How much does the insurer pay on each claim, and what is left of each aggregate? {Example}
> An appliance manufacturer's CGL has a \$1,000,000 each occurrence limit, a \$2,000,000 general aggregate and a \$2,000,000 products-completed operations aggregate. During the year, in this order:
>
> | Claim | What happened | Cost |
> | :--- | :--- | ---: |
> | 1 | A toaster fire in a customer's kitchen | \$450,000 |
> | 2 | A burn injury from a kettle | \$1,250,000 |
> | 3 | A visitor trips over a display unit in the manufacturer's showroom | \$200,000 |
> | 4 | A heater fire | \$600,000 |
> | 5 | Another toaster fire | \$300,000 |
>
> > [!answer]-
> > - Claims 1, 2, 4 and 5 arise from products away from the premises, so they draw on the products aggregate.
> > - Claim 3 involves a product still in the insured's possession on its own premises, so it is a premises loss paid in full from the general aggregate, which falls to \$1,800,000.
> > - Claim 1 is paid $\min(450{,}000,\ 1{,}000{,}000,\ 2{,}000{,}000) = \$450{,}000$, leaving \$1,550,000.
> > - Claim 2 is paid the occurrence limit of \$1,000,000, leaving \$550,000.
> > - Claim 4 is paid the remaining \$550,000, which exhausts the products aggregate.
> > - Claim 5 is paid nothing, although \$1,800,000 of the general aggregate remains.
> > - The manufacturer bears $250{,}000 + 50{,}000 + 300{,}000 = \$600{,}000$.

## Underwriting the hazard

An underwriter evaluates:

1. **Product type and use.** A ladder, a space heater or a medical device can cause severe injury, while a picture frame rarely does. The underwriter considers its intended use, the foreseeable misuse, whether it goes to consumers or to trained industrial users, and how many units are in circulation.
2. **Quality control and warnings.** A manufacturer's design review, testing, quality control records, and the clarity of its labels, instructions and warnings bear directly on the three bases of product liability: manufacturing defects, design defects and failure to warn. Many claims are brought in [[Strict Liability|strict liability]], so the insured's care in production does not defeat a claim, but it lowers how often defects occur.
3. **Distribution.** A product sold nationally through retailers creates more claims than one sold to a few industrial buyers, and exports may bring suits under foreign law. A distributor or retailer is liable for the products it sells, so an underwriter asks whether the manufacturer is solvent, insured and willing to name the seller as an additional insured under a vendors endorsement ([[Products Liability]]).
4. **Completed work.** For a contractor, the hazard is the work it has finished, such as a roof that leaks, wiring that starts a fire or a deck that collapses. The underwriter looks at the type of work, the quality of workmanship and inspection, and how long the work remains in use.

Under an [[Occurrence Coverage|occurrence]] form, the policy in force when the injury occurs pays, even if the product was sold or the work finished many years earlier. That makes this a long-tail exposure ([[Long-Tail Liability]]). A [[Claims Made Coverage|claims-made]] form shortens the tail for the insurer.

The CGL excludes damage to the insured's own product, damage to its own work, damage to impaired property that can be restored by repairing the product, and the cost of a product recall. Those losses are the insured's business risk, not liability to others.

## Rating

A manufacturer or distributor is usually rated on sales, and a contractor on payroll. On a sales base the premium is

> $$P = \sum_j r_j \times \frac{S_j}{1{,}000}$$

- $r_j$ is the products rate per \$1,000 for product classification $j$.
- $S_j$ is that classification's sales for the policy year.

The exposure in any year comes from every unit still in use, while the premium base is only the year's sales.

> [!example]- What is this manufacturer's products premium, and does its exposure fall in proportion if it stops selling heaters? {Example}
> The manufacturer expects sales of \$6,000,000 of small appliances and \$2,000,000 of replacement parts next year. Illustrative rates are \$2.35 per \$1,000 of sales for appliances and \$0.90 per \$1,000 for parts. Heaters made up \$1,500,000 of last year's appliance sales.
>
> > [!answer]-
> > - The appliances premium is $2.35 \times 6{,}000 = \$14{,}100$.
> > - The parts premium is $0.90 \times 2{,}000 = \$1{,}800$.
> > - The products premium is $14{,}100 + 1{,}800 = \$15{,}900$.
> > - The heaters already sold stay in customers' homes for years, and an injury from one next year falls under next year's occurrence policy.
> > - The sales base no longer includes them, so the exposure does not fall in proportion. Underwriters ask about discontinued products and charge for them separately.

> [!trap] Putting a product in the insured's possession in this hazard
> A product still in the insured's physical possession is not within the hazard, even if it is defective. An injury it causes on the insured's premises is a premises and operations loss charged to the general aggregate.
