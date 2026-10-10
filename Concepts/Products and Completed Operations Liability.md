---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c035671355494c80ae0c4259bc4c9af9b29334ed31e00e97a945e8456429439d
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, V.16 PCOH incl. (a)-(c) completion tests; Cov A 2.k-n; III, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "LII Wex, 'products liability', entry, sha256:3932a61c3a07202fd010d53a48a95868ba5ce8965c19b11890b41f59b224daf5 — https://www.law.cornell.edu/wex/products_liability"
    - "FC&S Editors, 'Bases of Liability Premium', PropertyCasualty360, 9 Oct 2012, gross sales, sha256:3098468d31acf87f67490601c66a720666953277f266b0692ff23c3d387ab3ed — https://www.propertycasualty360.com/fcs/2012/10/09/bases-of-liability-premium/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Products and Completed Operations Liability.md
---

**Products and Completed Operations Liability** is a business's liability for bodily injury and property damage that happens away from its premises and arises from a product it made, sold or distributed, or from work it has completed. The [[Commercial General Liability|commercial general liability]] form calls this the products-completed operations hazard and gives it a separate aggregate limit, so losses from it never reduce the general aggregate that protects the [[Premises and Operations Liability|premises and operations]] exposure. It is usually rated on sales for a manufacturer or distributor and on payroll for a contractor.

> $$\text{Paid}_k = \min\left(X_k,\ L,\ A_{k-1}\right)$$

> $$A_k = A_{k-1} - \text{Paid}_k$$

> $$P = \sum_j r_j \times \frac{S_j}{1{,}000}$$

- **Symbols:** $X_k$ is the cost of occurrence $k$ within the hazard, $L$ is the each occurrence limit, and $A_{k-1}$ is what remains of the products-completed operations aggregate before it is paid, starting from the full aggregate $A_0$. In the premium, $r_j$ is the products rate per \$1,000 for product classification $j$ and $S_j$ is that classification's sales for the policy year.
- **What the hazard includes:** Injury or damage counts only if it occurs away from premises the insured owns or rents and arises from "your product" or "your work". Products still in the insured's physical possession and work not yet completed or abandoned are outside it, so a customer hurt by a product in the insured's showroom is a premises loss.
- **When work is completed:** Work is deemed completed at the earliest of three times: when all the work called for in the contract is done, when all the work at one job site is done if the contract covers several sites, or when that part of the work has been put to its intended use by anyone other than another contractor working on the same project. Work needing only service, correction or replacement is still treated as completed.
- **Product type and use:** The inherent hazard of the product comes first: a ladder, a space heater or a medical device can cause severe injury, while a picture frame rarely does. The underwriter considers its intended use, the foreseeable misuse, whether it goes to consumers or to trained industrial users, and how many units are in circulation.
- **Quality control and warnings:** A manufacturer's design review, testing, quality control records, and the clarity of its labels, instructions and warnings bear directly on the three bases of product liability: manufacturing defects, design defects and failure to warn. Many claims are brought in [[Strict Liability|strict liability]], so the insured's care in production does not defeat a claim, but it lowers how often defects occur.
- **Distribution:** Who sells the product, and where, matters. A product sold nationally through retailers creates more claims than one sold to a few industrial buyers, and exports may bring suits under foreign law. A distributor or retailer is liable for the products it sells, so an underwriter asks whether the manufacturer is solvent, insured and willing to name the seller as an additional insured under a vendors endorsement ([[Products Liability]]).
- **Completed work for contractors:** For a contractor, the hazard is the work it has finished, such as a roof that leaks, wiring that starts a fire or a deck that collapses. The underwriter looks at the type of work, the quality of workmanship and inspection, and how long the work remains in use, because construction defect claims can surface years after completion.
- **Long tail:** Under an [[Occurrence Coverage|occurrence]] form, the policy in force when the injury occurs pays, even if the product was sold many years earlier. The exposure in any year comes from every unit still in use, while the premium base is only the year's sales, which makes products liability a long-tail line ([[Long-Tail Liability]]). A [[Claims Made Coverage|claims-made]] form shortens the tail for the insurer.
- **Excluded business risks:** The CGL excludes damage to the insured's own product, damage to its own work, damage to impaired property that can be restored by repairing the product, and the cost of a product recall. Those losses are the insured's business risk, not liability to others.

> [!example]- Exhausting the Products-Completed Operations Aggregate {Example}
> An appliance manufacturer's CGL has a \$1,000,000 each occurrence limit, a \$2,000,000 general aggregate and a \$2,000,000 products-completed operations aggregate. During the year, in this order: (1) a toaster fire in a customer's kitchen costs \$450,000; (2) a burn injury from a kettle results in a \$1,250,000 judgment; (3) a visitor trips over a display unit in the manufacturer's showroom and recovers \$200,000; (4) a heater fire costs \$600,000; (5) another toaster fire costs \$300,000. How much does the insurer pay on each, and what is left of each aggregate?
>
> > [!answer]-
> > Claims 1, 2, 4 and 5 arise from products away from the premises, so they draw on the products aggregate. Claim 3 involves a product still in the insured's possession on its own premises, so it is a premises loss charged to the general aggregate.
> > $$
> > \begin{align*}
> > \text{Paid}_1 &= \min(450{,}000,\ 1{,}000{,}000,\ 2{,}000{,}000) \\
> > &= 450{,}000 \\
> > \text{Paid}_2 &= \min(1{,}250{,}000,\ 1{,}000{,}000,\ 1{,}550{,}000) \\
> > &= 1{,}000{,}000 \\
> > \text{Paid}_4 &= \min(600{,}000,\ 1{,}000{,}000,\ 550{,}000) \\
> > &= 550{,}000 \\
> > \text{Paid}_5 &= \min(300{,}000,\ 1{,}000{,}000,\ 0) \\
> > &= 0
> > \end{align*}
> > $$
> > The manufacturer bears \$250,000 of the burn judgment, \$50,000 of the heater fire and all \$300,000 of the last toaster fire, \$600,000 in total. The showroom claim is paid in full and leaves \$1,800,000 of the general aggregate, which the products losses cannot use. A manufacturer with this many products claims needs higher limits or an [[Umbrella Liability Insurance|umbrella]], and the underwriter's question is why the claims are so frequent.

> [!example]- Sales-Based Premium and the Exposure Behind It {Example}
> The manufacturer expects sales of \$6,000,000 of small appliances and \$2,000,000 of replacement parts next year. With illustrative rates of \$2.35 per \$1,000 of sales for appliances and \$0.90 per \$1,000 for parts, find the products premium. The manufacturer then decides to stop selling heaters, which made up \$1,500,000 of last year's appliance sales. Does its products exposure fall in proportion?
>
> > [!answer]-
> > Each product classification is rated on its own sales.
> > $$
> > \begin{align*}
> > P_{\text{appliances}} &= 2.35 \times \frac{6{,}000{,}000}{1{,}000} \\
> > &= 14{,}100 \\
> > P_{\text{parts}} &= 0.90 \times \frac{2{,}000{,}000}{1{,}000} \\
> > &= 1{,}800 \\
> > P &= 14{,}100 + 1{,}800 \\
> > &= 15{,}900
> > \end{align*}
> > $$
> > The exposure does not fall in proportion. The heaters already sold stay in customers' homes for years, and an injury from one next year falls under next year's occurrence policy, while the sales base no longer includes them. Underwriters handle this by asking about discontinued products and charging for them separately, so that the premium keeps up with the units still in use.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask what an underwriter evaluates for products and completed operations: the product's hazard and intended use, quality control, warnings and instructions, distribution, and for a contractor the type and quality of completed work. Applied questions describe a loss and ask whether it falls within the products-completed operations hazard and which aggregate it reduces, or compute a sales-based premium.

> [!warning]- Exam traps
> - **Possession matters:** A product still in the insured's physical possession is not within the hazard, even if it is defective. An injury it causes on the insured's premises is a premises and operations loss charged to the general aggregate.
> - **Two aggregates, no sharing:** Once the products-completed operations aggregate is exhausted, products claims are uninsured for the rest of the year, however much of the general aggregate remains.
> - **Completed means one of three dates:** Work put to its intended use is completed even if the contract is unfinished. Waiting for the whole contract to end misclassifies losses from finished parts of a job.
> - **The base lags the exposure:** Sales measure the products put into use this year, not all those in use. A business that has stopped selling a product still has its exposure.
> - **Recall and own product are excluded:** The CGL pays for injury to others and damage to their property. The cost of recalling or replacing the insured's own defective product needs separate coverage.
