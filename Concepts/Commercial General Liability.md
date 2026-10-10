---
aliases:
  - CGL
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0e5db715d46b2c0a431daac8eb4157fa4f0294b97ab72b18b5b96371d21e9160
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commercial General Liability.md
---
**Commercial General Liability** (CGL) insurance covers a business's [[Liability Insurance|liability]] to the public for bodily injury, property damage, and personal and advertising injury arising from its premises, its operations, and the products and work it has finished. Most U.S. insurers write it on the Insurance Services Office (ISO) Commercial General Liability Coverage Form. The form pays damages the insured is legally obligated to pay, pays medical expenses without regard to fault, and defends the insured against suits, all within a set of per-occurrence and aggregate limits.

> $$\text{Paid}_k = \min\left(X_k,\ L,\ G_{k-1}\right)$$

> $$G_k = G_{k-1} - \text{Paid}_k$$

> $$P = \sum_j r_j \times \frac{E_j}{u_j}$$

- **Symbols:** $X_k$ is what occurrence $k$ costs under the form: the Coverage A damages plus the Coverage C medical expenses it causes. $L$ is the each occurrence limit, or the personal and advertising injury limit for a Coverage B claim. $G_{k-1}$ is what remains of the aggregate that applies before the occurrence is paid: the products-completed operations aggregate for injury within that hazard, and the general aggregate for everything else. In the premium, $r_j$ is the rate for classification $j$, $E_j$ is its exposure on the classification's premium base, and $u_j$ is the unit the rate is quoted per, such as \$1,000 of sales.
- **Coverage A, bodily injury and property damage:** The insurer pays damages because of bodily injury or property damage caused by an "occurrence", which the form defines as an accident, including continuous or repeated exposure to substantially the same harmful conditions. The injury or damage must occur during the policy period, in the coverage territory.
- **Coverage B, personal and advertising injury:** This part covers listed offenses rather than accidents. They are false arrest, malicious prosecution, wrongful eviction, libel and slander, invasion of privacy, and using another's advertising idea or infringing their copyright, trade dress or slogan in the insured's advertisement. It is triggered by an offense committed during the policy period.
- **Coverage C, medical payments:** The insurer pays medical expenses of members of the public injured by an accident on the insured's premises or because of its operations, whether or not the insured was at fault. The expenses must be incurred and reported within one year of the accident, and the coverage does not pay insureds, other than volunteer workers, or anyone hired to work for the insured.
- **Supplementary payments:** Defense costs, the cost of bonds, and the insured's reasonable expenses in helping with the defense are paid in addition to the limits. The [[Duty to Defend|duty to defend]] ends once the applicable limit has been used up in judgments or settlements.
- **The two hazards:** Injury at the premises or during work in progress falls under premises and operations. Injury that happens away from the insured's premises and arises from a product it sold or work it has completed falls under the products-completed operations hazard, which has its own aggregate and is often rated separately.
- **Exclusions:** Most exclusions move a loss to the policy designed for it. Injury to employees goes to [[Workers Compensation Insurance|workers compensation]], auto accidents go to a business auto policy, and pollution and liquor liability have their own forms. The "business risk" exclusions remove damage to the insured's own product or work and product recalls, because the CGL insures liability to others, not the quality of what the insured makes.
- **Who is an insured:** The named insured is covered according to its form of organization, and its employees and volunteer workers are covered while acting for it. Others, such as a project owner a contractor works for, are added as additional insureds by [[Endorsement|endorsement]].
- **Occurrence and claims-made versions:** ISO publishes the form in an [[Occurrence Coverage|occurrence]] version and a [[Claims Made Coverage|claims-made]] version, which adds a retroactive date and extended reporting periods.
- **The form, part by part:** Coverage A's [[CGL Coverage A Insuring Agreement|insuring agreement]] and [[CGL Coverage A Exclusions|exclusions]], [[CGL Coverage B]], [[CGL Coverage C]], [[CGL Supplementary Payments]], [[CGL Who Is an Insured]], [[CGL Limits of Insurance]] and [[CGL Conditions]] each have their own page, as do the [[CGL Endorsements|endorsements]] that modify the form and the [[Specialty General Liability Forms|other ISO general liability coverage forms]].

> [!example]- Applying the Limits Across One Policy Year {Example}
> A retailer's CGL policy has an each occurrence limit of \$1,000,000, a personal and advertising injury limit of \$1,000,000, a general aggregate of \$2,000,000 and a products-completed operations aggregate of \$2,000,000. During the year, in this order:
>
> 1. A customer slips in the store. The insurer pays \$4,000 of the customer's medical expenses under Coverage C, and the customer later wins a \$1,200,000 judgment under Coverage A. Defense costs are \$90,000.
> 2. A competitor's libel suit over an advertisement settles for \$350,000.
> 3. A ladder the retailer sold last year collapses in a buyer's home, and the buyer recovers \$1,400,000.
> 4. A visitor is injured on the premises, and the claim settles for \$800,000.
>
> How much does the insurer pay on each claim, and how much does the retailer bear?
>
> > [!answer]-
> > The slip and fall is one occurrence, so the medical payment and the judgment share the each occurrence limit, and both reduce the general aggregate.
> > $$
> > \begin{align*}
> > \text{Paid}_1 &= \min(1{,}204{,}000,\ 1{,}000{,}000,\ 2{,}000{,}000) \\
> > &= 1{,}000{,}000 \\
> > G_1 &= 2{,}000{,}000 - 1{,}000{,}000 \\
> > &= 1{,}000{,}000
> > \end{align*}
> > $$
> > Of that, \$996,000 goes to the judgment and the retailer bears \$204,000. The \$90,000 of defense costs is a supplementary payment, paid in addition to the limit. The \$350,000 libel settlement is a Coverage B claim, paid in full, which leaves \$650,000 of the general aggregate. The ladder claim is within the products-completed operations hazard. The each occurrence limit caps it at \$1,000,000, which comes out of the separate products aggregate, and the retailer bears \$400,000. The last claim is within the each occurrence limit, but little of the general aggregate is left.
> > $$
> > \begin{align*}
> > \text{Paid}_4 &= \min(800{,}000,\ 1{,}000{,}000,\ 650{,}000) \\
> > &= 650{,}000
> > \end{align*}
> > $$
> > The retailer bears \$150,000, and the general aggregate is exhausted for the rest of the year. An [[Umbrella Liability Insurance|umbrella policy]] would pay the amounts above the limits and drop down over the exhausted aggregate.

> [!example]- A Deposit Premium and Its Audit {Example}
> A restaurant's general liability is rated on gross sales. With illustrative rates, the premises and operations rate is \$3.20 and the products-completed operations rate is \$0.85, both per \$1,000 of sales. The insured estimates sales of \$2,400,000 for the coming year, and the [[Premium Audit|premium audit]] after the year ends finds sales of \$2,750,000. Find the deposit premium and the audit adjustment.
>
> > [!answer]-
> > Both parts of the rate apply to the same base, so they can be added first.
> > $$
> > \begin{align*}
> > r &= 3.20 + 0.85 \\
> > &= 4.05 \\
> > P_{\text{deposit}} &= 4.05 \times \frac{2{,}400{,}000}{1{,}000} \\
> > &= 9{,}720.00 \\
> > P_{\text{audited}} &= 4.05 \times \frac{2{,}750{,}000}{1{,}000} \\
> > &= 11{,}137.50
> > \end{align*}
> > $$
> > The insured owes an additional premium of \$1,417.50. Sales suit a restaurant because they grow with the number of customers, and so with the chance that one is injured or made ill. ISO's other premium bases follow the same logic: payroll for a contractor, area for a building owner, total cost for subcontracted work, and admissions for a venue.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions walk through the form part by part, covering the insuring agreements, the exclusions, who is an insured, the limits and the conditions. The applied version gives a loss and asks whether the CGL covers it, which is a [[Coverage Analysis|coverage analysis]] that starts with the insuring agreement and ends with the limits.
> - **DISC-RM:** The underwriting questions ask how a general liability account is classified, which premium base fits a given business, and how the premium follows from the rate and the exposure.
> - **GI-302:** Candidates describe the contents of the ISO CGL form and the coverage it provides, alongside the commercial property, personal auto and homeowners forms.

> [!warning]- Exam traps
> - **Medical payments use the limit:** Coverage C payments count toward the each occurrence limit and the general aggregate, even though they are paid without regard to fault. A medical payment and a later judgment from the same accident share one each occurrence limit.
> - **Two aggregates:** A claim within the products-completed operations hazard reduces only the products aggregate, and every other claim reduces only the general aggregate. Charging a products claim to the general aggregate understates what the insurer still owes on later claims.
> - **Defense outside the limits:** Under the CGL, defense costs are paid in addition to the limits, unlike many professional liability forms. The duty to defend still ends once the applicable limit is used up.
> - **Offense versus occurrence:** Coverage B responds to listed offenses, some of them intentional, such as libel. Its trigger is the date of the offense, not the date of an accident, and an injury that isn't on the list isn't covered under Coverage B however it arose.
> - **The insured's own work:** Damage to the insured's own completed work is excluded as a business risk. The exception is work a subcontractor performed, either the damaged work or the work that caused the damage, which the standard form covers.
