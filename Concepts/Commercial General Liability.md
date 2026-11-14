---
aliases:
  - CGL
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:515aa7ac1a7ead2b3643b76d1fbfe432daf7a7d484cc4004a9b3485fe5118bd2
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, I Cov A 1.a-b, 2.j-n; Cov B 1, Cov C 1-2; Supplementary Payments; II; III; V.13 occurrence, V.14 P&AI, V.16 PCOH, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "FC&S Editors, 'Bases of Liability Premium', PropertyCasualty360, 9 Oct 2012, entry, sha256:3098468d31acf87f67490601c66a720666953277f266b0692ff23c3d387ab3ed — https://www.propertycasualty360.com/fcs/2012/10/09/bases-of-liability-premium/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commercial General Liability.md
---
**Commercial General Liability** (CGL) insurance covers a business's [[Liability Insurance|liability]] to the public for bodily injury, property damage, and personal and advertising injury arising from its premises, its operations, and the products and work it has finished. Most U.S. insurers write it on the Insurance Services Office (ISO) Commercial General Liability Coverage Form, which pays damages the insured is legally obligated to pay, pays medical expenses without regard to fault, and defends the insured against suits.

The form has three coverages:

1. **Coverage A, bodily injury and property damage liability.** The insurer pays damages because of bodily injury or property damage caused by an "occurrence", which the form defines as an accident, including continuous or repeated exposure to substantially the same harmful conditions. The injury or damage must occur during the policy period, in the coverage territory.
2. **Coverage B, personal and advertising injury liability.** This part covers listed offenses rather than accidents. They are false arrest, malicious prosecution, wrongful eviction, libel and slander, invasion of privacy, and using another's advertising idea or infringing their copyright, trade dress or slogan in the insured's advertisement. It is triggered by an offense committed during the policy period, and an injury that isn't on the list isn't covered under Coverage B however it arose.
3. **Coverage C, medical payments.** The insurer pays medical expenses of members of the public injured by an accident on the insured's premises or because of its operations, whether or not the insured was at fault. The expenses must be incurred and reported within one year of the accident, and the coverage does not pay insureds, other than volunteer workers, or anyone hired to work for the insured.

Each part of the form has its own page: Coverage A's [[CGL Coverage A Insuring Agreement|insuring agreement]] and [[CGL Coverage A Exclusions|exclusions]], [[CGL Coverage B]], [[CGL Coverage C]], [[CGL Supplementary Payments]], [[CGL Who Is an Insured]], [[CGL Limits of Insurance]] and [[CGL Conditions]], as do the [[CGL Endorsements|endorsements]] that modify the form and the [[Specialty General Liability Forms|other ISO general liability coverage forms]].

## The two hazards

Injury at the premises or during work in progress falls under premises and operations. Injury that happens away from the insured's premises and arises from a product it sold or work it has completed falls under the products-completed operations hazard, which has its own aggregate and is often rated separately.

## Exclusions

Most exclusions move a loss to the policy designed for it. Injury to employees goes to [[Workers Compensation Insurance|workers compensation]], auto accidents go to a business auto policy, and pollution and liquor liability have their own forms. The "business risk" exclusions remove damage to the insured's own product or work and product recalls, because the CGL insures liability to others, not the quality of what the insured makes. Damage to the insured's own completed work is excluded as a business risk. The exception is work a subcontractor performed, either the damaged work or the work that caused the damage, which the standard form covers.

## Who is an insured

The named insured is covered according to its form of organization, and its employees and volunteer workers are covered while acting for it. Others, such as a project owner a contractor works for, are added as additional insureds by [[Endorsement|endorsement]]. ISO publishes the form in an [[Occurrence Coverage|occurrence]] version and a [[Claims Made Coverage|claims-made]] version, which adds a retroactive date and extended reporting periods.

## Limits of insurance

For occurrence $k$ in a policy year, the insurer pays

> $$\text{Paid}_k = \min\left(X_k,\ L,\ G_{k-1}\right)$$

- $X_k$ is what occurrence $k$ costs under the form: the Coverage A damages plus the Coverage C medical expenses it causes.
- $L$ is the each occurrence limit, or the personal and advertising injury limit for a Coverage B claim.
- $G_{k-1}$ is what remains of the aggregate that applies before the occurrence is paid: the products-completed operations aggregate for injury within that hazard, and the general aggregate for everything else.

The remaining aggregate after the occurrence is

> $$G_k = G_{k-1} - \text{Paid}_k$$

Coverage C payments count toward the each occurrence limit and the general aggregate, even though they are paid without regard to fault. Defense costs, the cost of bonds, and the insured's reasonable expenses in helping with the defense are paid in addition to the limits. The [[Duty to Defend|duty to defend]] ends once the applicable limit has been used up in judgments or settlements.

> [!example]- How much does the insurer pay on each of these claims in one policy year, and how much does the retailer bear? {Example}
> A retailer's CGL policy has an each occurrence limit of $\$1{,}000{,}000$, a personal and advertising injury limit of $\$1{,}000{,}000$, a general aggregate of $\$2{,}000{,}000$ and a products-completed operations aggregate of $\$2{,}000{,}000$. During the year, in this order:
>
> 1. A customer slips in the store. The insurer pays $\$4{,}000$ of her medical expenses under Coverage C, and she later wins a $\$1{,}200{,}000$ judgment under Coverage A. Defense costs are $\$90{,}000$.
> 2. A competitor's libel suit over an advertisement settles for $\$350{,}000$.
> 3. A ladder the retailer sold last year collapses in a buyer's home, and the buyer recovers $\$1{,}400{,}000$.
> 4. A visitor is injured on the premises, and the claim settles for $\$800{,}000$.
>
> > [!answer]-
> > - The slip and fall is one occurrence, so the medical payment and the judgment share the each occurrence limit: $\min(1{,}204{,}000,\ 1{,}000{,}000,\ 2{,}000{,}000) = \$1{,}000{,}000$.
> > - Of that, $\$996{,}000$ goes to the judgment, and the retailer bears $\$204{,}000$. The $\$90{,}000$ of defense costs is paid in addition to the limit.
> > - The general aggregate falls to $2{,}000{,}000 - 1{,}000{,}000 = \$1{,}000{,}000$.
> > - The $\$350{,}000$ libel settlement is a Coverage B claim within its limit, paid in full, which leaves $\$650{,}000$ of the general aggregate.
> > - The ladder claim is within the products-completed operations hazard. The each occurrence limit caps it at $\$1{,}000{,}000$, from the separate products aggregate, and the retailer bears $\$400{,}000$.
> > - The last claim is within the each occurrence limit, but only $\min(800{,}000,\ 1{,}000{,}000,\ 650{,}000) = \$650{,}000$ of the general aggregate is left.
> > - The retailer bears $\$150{,}000$ of it, and the general aggregate is exhausted for the rest of the year. An [[Umbrella Liability Insurance|umbrella policy]] would pay the amounts above the limits and drop down over the exhausted aggregate.

## Premium

General liability is rated by classification, each on its own premium base. The premium is

> $$P = \sum_j r_j \times \frac{E_j}{u_j}$$

- $r_j$ is the rate for classification $j$.
- $E_j$ is the classification's exposure on its premium base.
- $u_j$ is the unit the rate is quoted per, such as $\$1{,}000$ of sales.

The insured's estimate of the exposure sets a deposit premium, and a [[Premium Audit|premium audit]] after the year ends sets the final one. ISO's other premium bases follow the same logic: payroll for a contractor, area for a building owner, total cost for subcontracted work, and admissions for a venue.

> [!example]- What are this restaurant's deposit premium and audit adjustment? {Example}
> A restaurant's general liability is rated on gross sales. With illustrative rates, the premises and operations rate is $\$3.20$ and the products-completed operations rate is $\$0.85$, both per $\$1{,}000$ of sales. The insured estimates sales of $\$2{,}400{,}000$ for the coming year, and the premium audit finds sales of $\$2{,}750{,}000$.
>
> > [!answer]-
> > - Both rates apply to the same base, so they can be added first: $r = 3.20 + 0.85 = 4.05$.
> > - The deposit premium is $4.05 \times 2{,}400{,}000/1{,}000 = \$9{,}720.00$.
> > - The audited premium is $4.05 \times 2{,}750{,}000/1{,}000 = \$11{,}137.50$.
> > - The insured owes an additional premium of $11{,}137.50 - 9{,}720.00 = \$1{,}417.50$.
> > - Sales suit a restaurant because they grow with the number of customers, and so with the chance that one is injured or made ill.

> [!trap] Charging a products claim to the general aggregate
> A claim within the products-completed operations hazard reduces only the products aggregate, and every other claim reduces only the general aggregate. Charging a products claim to the general aggregate understates what the insurer still owes on later claims.
