---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1ef43febd6919abcde859dcb34e78a5bd6ae4b50717d4dd796daf33ba5999273
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Specialty Insurance Coverage.md
---

**Specialty Insurance Coverage** is the group of commercial coverages written outside the standard property, general liability, auto and workers compensation forms, for exposures those forms exclude, limit or were never designed for. The SOA's *General Insurance: U.S. Policies and Coverages* treats six of them together: excess liability, umbrella liability, professional liability, cyber, surety and terrorism. They share a profile of low claim frequency, high severity and specialised wording, and many are written on a [[Claims Made Coverage|claims-made]] basis or in the [[Excess and Surplus Lines|excess and surplus lines]] market.

> $$\text{Paid} = \min\big((X - A)^+,\ L\big)$$

> $$S = \min\big((C - B)^+,\ P\big)$$

> $$\text{Net surety loss} = S + E - R$$

- **Symbols:** In the first line, $X$ is the loss, $A$ is the attachment point (the underlying limit or a [[Self-Insured Retention|self-insured retention]]) and $L$ is the layer's limit, which is how excess and umbrella coverage pay. In the surety lines, $C$ is the cost to complete a defaulted contract, $B$ is the contract balance the owner has not yet paid, $P$ is the bond's penal sum, $E$ is the surety's expense, and $R$ is what it recovers from the principal and its indemnitors.
- **Excess and umbrella liability:** An excess liability policy adds limits above one or more underlying policies, usually following their form, so it covers a claim only if the underlying policy does. An [[Umbrella Liability Insurance|umbrella policy]] does that above several primary policies at once, and it also drops down to cover some claims the primary policies don't, above a retention, and over aggregates the primary claims have used up.
- **Professional liability:** [[Professional Liability Insurance|Professional liability]] covers liability for errors and omissions in professional services. It is called malpractice insurance for physicians and errors and omissions (E&O) insurance for lawyers, accountants, agents and other services. [[Directors and Officers Liability Insurance|Directors and officers liability]] covers managers' wrongful acts, and its relatives are [[Employment Practices Liability Insurance|employment practices]] and [[Fiduciary Liability Insurance|fiduciary liability]]. These forms are usually claims-made, often with defense costs inside the limit and a consent-to-settle clause.
- **Cyber:** [[Cyber Insurance|Cyber insurance]] combines first-party cover for the insured's own costs, such as breach response, data restoration, extortion and business interruption, with third-party cover for liability to others whose data or systems were affected. Each insuring agreement usually has its own sublimit, and accumulation across many insureds from one event is the insurer's main concern.
- **Surety:** A surety bond has three parties: the principal, who owes an obligation, the obligee, to whom it is owed, and the surety, which guarantees it. Contract bonds, such as bid, performance and payment bonds, guarantee construction contracts. Commercial bonds include license and permit bonds, public official bonds and court bonds. The principal signs an indemnity agreement to repay the surety for any loss, so the surety underwrites the principal's character, capacity and capital as a lender would, and expects few losses. The premium is largely a fee for the service of lending the surety's credit, not a charge for expected losses.
- **Terrorism:** [[Terrorism Insurance|Terrorism insurance]] covers losses from terrorist acts under commercial property, liability and workers compensation policies. In the United States the [[Terrorism Risk Insurance Program|Terrorism Risk Insurance Program]] created by [[TRIA|TRIA]] requires insurers to make the coverage available and shares losses above each insurer's deductible, once industry losses from a certified act pass the program trigger.
- **Why they are separate:** Each exposure is excluded, sublimited or poorly defined in the standard forms, because it is hard to price, highly correlated across insureds or needs its own wording. Pricing relies heavily on underwriting judgment, [[Increased Limits|increased limits factors]] and exposure-based layer pricing, because experience is thin and long-tailed.

> [!example]- A Performance Bond Loss and the Recovery from the Principal {Example}
> A surety writes a \$5,000,000 performance bond, with a penal sum equal to the contract price, for a contractor building a school, for a premium of $1.5\%$ of the contract price. The contractor defaults with \$2,000,000 of the contract price still unpaid by the school board. The surety hires a completion contractor for \$3,100,000 and spends \$150,000 on investigation and legal costs. Under the indemnity agreement it recovers \$400,000 from the contractor's equipment and its owners' personal guarantees.
>
> Find the surety's payment under the bond, its net loss and the bond's loss ratio.
>
> > [!answer]-
> > The owner's unpaid balance goes toward finishing the job, so the surety pays only the excess cost to complete.
> > $$
> > \begin{align*}
> > S &= \min\big((3{,}100{,}000 - 2{,}000{,}000)^+,\ 5{,}000{,}000\big) \\
> > &= 1{,}100{,}000 \\
> > \text{Net loss} &= 1{,}100{,}000 + 150{,}000 - 400{,}000 \\
> > &= 850{,}000 \\
> > \text{Premium} &= 0.015 \times 5{,}000{,}000 \\
> > &= 75{,}000 \\
> > \text{Loss ratio} &= \frac{850{,}000}{75{,}000} \\
> > &= 11.3
> > \end{align*}
> > $$
> > The single bond lost more than eleven times its premium. That is why a surety prices like a lender, with careful prequalification of the principal and the indemnity agreement behind it, rather than expecting premiums from many bonds to fund a steady flow of losses.

> [!example]- A Loss Through an Excess Tower {Example}
> A trucking company carries \$1,000,000 of primary auto liability, a first excess layer of \$4,000,000 xs \$1,000,000 and a second excess layer of \$5,000,000 xs \$5,000,000, all following form. A crash produces a \$7,500,000 judgment. How much does each layer pay?
>
> > [!answer]-
> > Apply $\min\big((X - A)^+, L\big)$ to each layer, with $X = 7{,}500{,}000$.
> > $$
> > \begin{align*}
> > \text{Primary} &= \min(7{,}500{,}000,\ 1{,}000{,}000) \\
> > &= 1{,}000{,}000 \\
> > \text{First excess} &= \min(6{,}500{,}000,\ 4{,}000{,}000) \\
> > &= 4{,}000{,}000 \\
> > \text{Second excess} &= \min(2{,}500{,}000,\ 5{,}000{,}000) \\
> > &= 2{,}500{,}000
> > \end{align*}
> > $$
> > The layers pay \$7,500,000 together, and the insured bears nothing. Large verdicts against trucking companies are why the upper layers of such towers have seen the largest rate increases, because a trend in judgments raises the cost of a high layer proportionally more than the primary layer.

> [!tip]- How it appears on the exam
> - **GI-302:** Objective 11 asks candidates to describe the specialty coverages: excess liability, umbrella liability, professional liability, cyber, surety and terrorism. Expect a written answer on what each covers, why the standard forms leave the gap, and how it is written, such as claims-made, following form or with sublimits.
> - **GI-302:** Surety questions ask for the three parties, the difference between contract and commercial bonds, and why surety premium is not priced like insurance premium. A short calculation may follow a default through to the surety's net loss.
> - **GI-302:** Excess and umbrella questions may ask how a loss is split across a tower, or how an umbrella drops down over an exhausted aggregate. Terrorism questions draw on how the TRIA backstop shares losses.

> [!warning]- Exam traps
> - **Surety is not insurance for the principal:** The bond protects the obligee, and the principal must repay the surety for any loss under the indemnity agreement. Describing the principal as the insured, or the loss as the surety's to absorb, gets the structure backwards.
> - **The contract balance first:** In a performance bond default the owner's unpaid contract balance pays for completion first, and the surety pays only the excess cost to complete, up to the penal sum. Charging the whole completion cost to the surety overstates its loss.
> - **Umbrella versus excess:** An excess policy that follows form covers nothing the underlying policy excludes, while an umbrella can drop down for some claims the primary policies don't cover, subject to a retention. Treating the two as the same misses the umbrella's broader cover.
> - **Defense inside the limits:** Many professional liability, D&O and cyber forms pay defense costs within the limit, unlike the CGL. Paying a judgment up to the full limit and defense on top overstates the insurer's payment under those forms.
