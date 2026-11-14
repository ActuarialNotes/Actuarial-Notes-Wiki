---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0ee021de67a52666e1fb879720b91d21da63e3bffee38c8a912f63b3d4a45cca
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Specialty Insurance Coverage.md
---
**Specialty Insurance Coverage** is the group of commercial coverages written outside the standard property, general liability, auto and workers compensation forms, for exposures those forms exclude, limit or were never designed for. They share a profile of low claim frequency, high severity and specialised wording, and many are written on a [[Claims Made Coverage|claims-made]] basis or in the [[Excess and Surplus Lines|excess and surplus lines]] market.

The SOA's *General Insurance: U.S. Policies and Coverages* treats six of them together:

1. Excess liability.
2. Umbrella liability.
3. Professional liability.
4. Cyber.
5. Surety.
6. Terrorism.

Each exposure is excluded, sublimited or poorly defined in the standard forms, because it is hard to price, highly correlated across insureds or needs its own wording. Pricing relies heavily on underwriting judgment, [[Increased Limits|increased limits factors]] and exposure-based layer pricing, because experience is thin and long-tailed.

## Excess and umbrella liability

An excess liability policy adds limits above one or more underlying policies, usually following their form, so it covers a claim only if the underlying policy does. An [[Umbrella Liability Insurance|umbrella policy]] does that above several primary policies at once, and it also drops down to cover some claims the primary policies don't, above a retention, and over aggregates the primary claims have used up. An excess policy that follows form covers nothing the underlying policy excludes.

On a loss $X$, an excess or umbrella layer pays

> $$\text{Paid} = \min\big((X - A)^+,\ L\big)$$

- $A$ is the attachment point, the underlying limit or a [[Self-Insured Retention|self-insured retention]].
- $L$ is the layer's limit.
- $(X - A)^+$ is $X - A$ when it is positive, and $0$ otherwise.

> [!example]- How much does each layer of this trucking company's tower pay on a $\$7{,}500{,}000$ judgment? {Example}
> The company carries $\$1{,}000{,}000$ of primary auto liability, a first excess layer of $\$4{,}000{,}000$ xs $\$1{,}000{,}000$ and a second excess layer of $\$5{,}000{,}000$ xs $\$5{,}000{,}000$, all following form.
>
> > [!answer]-
> > - The primary policy pays $\min(7{,}500{,}000,\ 1{,}000{,}000) = \$1{,}000{,}000$.
> > - The first excess layer pays $\min(6{,}500{,}000,\ 4{,}000{,}000) = \$4{,}000{,}000$.
> > - The second excess layer pays $\min(2{,}500{,}000,\ 5{,}000{,}000) = \$2{,}500{,}000$.
> > - The layers pay $\$7{,}500{,}000$ together, and the insured bears nothing.
> > - A trend in judgments raises the cost of a high layer proportionally more than the primary layer, which is why the upper layers of such towers have seen the largest rate increases.

## Professional liability

[[Professional Liability Insurance|Professional liability]] covers liability for errors and omissions in professional services. It is called malpractice insurance for physicians and errors and omissions (E&O) insurance for lawyers, accountants, agents and other services. [[Directors and Officers Liability Insurance|Directors and officers liability]] covers managers' wrongful acts, and its relatives are [[Employment Practices Liability Insurance|employment practices]] and [[Fiduciary Liability Insurance|fiduciary liability]]. These forms are usually claims-made, often with defense costs inside the limit and a consent-to-settle clause. Unlike the CGL, a form that pays defense within the limit pays no more than the limit for judgment and defense together.

## Cyber

[[Cyber Insurance|Cyber insurance]] combines first-party cover for the insured's own costs, such as breach response, data restoration, extortion and business interruption, with third-party cover for liability to others whose data or systems were affected. Each insuring agreement usually has its own sublimit, and accumulation across many insureds from one event is the insurer's main concern.

## Surety

A surety bond has three parties: the principal, who owes an obligation, the obligee, to whom it is owed, and the surety, which guarantees it. The bond protects the obligee. Contract bonds, such as bid, performance and payment bonds, guarantee construction contracts. Commercial bonds include license and permit bonds, public official bonds and court bonds. The principal signs an indemnity agreement to repay the surety for any loss, so the surety underwrites the principal's character, capacity and capital as a lender would, and expects few losses. The premium is largely a fee for the service of lending the surety's credit, not a charge for expected losses.

When a principal defaults on a performance bond, the surety pays

> $$S = \min\big((C - B)^+,\ P\big)$$

- $C$ is the cost to complete the defaulted contract.
- $B$ is the contract balance the owner has not yet paid.
- $P$ is the bond's penal sum.

The surety's net loss is

> $$\text{Net surety loss} = S + E - R$$

- $E$ is the surety's expense.
- $R$ is what it recovers from the principal and its indemnitors.

> [!example]- What are the surety's payment, net loss and loss ratio on this performance bond? {Example}
> A surety writes a $\$5{,}000{,}000$ performance bond, with a penal sum equal to the contract price, for a contractor building a school, for a premium of 1.5% of the contract price. The contractor defaults with $\$2{,}000{,}000$ of the contract price still unpaid by the school board. The surety hires a completion contractor for $\$3{,}100{,}000$ and spends $\$150{,}000$ on investigation and legal costs. Under the indemnity agreement it recovers $\$400{,}000$ from the contractor's equipment and its owners' personal guarantees.
>
> > [!answer]-
> > - The owner's unpaid balance goes toward finishing the job, so the surety pays $\min(3{,}100{,}000 - 2{,}000{,}000,\ 5{,}000{,}000) = \$1{,}100{,}000$.
> > - Its net loss is $1{,}100{,}000 + 150{,}000 - 400{,}000 = \$850{,}000$.
> > - The premium is $0.015 \times 5{,}000{,}000 = \$75{,}000$.
> > - The loss ratio is $850{,}000/75{,}000 = 11.3$, so the single bond lost more than eleven times its premium.
> > - That is why a surety prices like a lender, with careful prequalification of the principal and the indemnity agreement behind it.

> [!trap] Charging the whole completion cost to the surety
> In a performance bond default the owner's unpaid contract balance pays for completion first, and the surety pays only the excess cost to complete, up to the penal sum. In the example, charging the whole $\$3{,}100{,}000$ to the surety overstates its payment by $\$2{,}000{,}000$.

## Terrorism

[[Terrorism Insurance|Terrorism insurance]] covers losses from terrorist acts under commercial property, liability and workers compensation policies. In the United States the [[Terrorism Risk Insurance Program|Terrorism Risk Insurance Program]] created by [[TRIA|TRIA]] requires insurers to make the coverage available and shares losses above each insurer's deductible, once industry losses from a certified act pass the program trigger.
