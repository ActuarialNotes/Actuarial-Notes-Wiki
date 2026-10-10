---
aliases:
  - Professional Liability
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:07932fec01dc3a08d5ad0d5145d6d8aaefe6aafac5025d710d6ca197f84c03c4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Professional Liability Insurance.md
---
**Professional Liability Insurance** covers a professional's [[Liability Insurance|liability]] for injury or financial loss caused by an error, omission or negligent act in rendering, or failing to render, professional services. It is called malpractice insurance for physicians and other health care providers, and errors and omissions (E&O) insurance for lawyers, accountants, architects, engineers, insurance agents and other service businesses. Most policies are written on a [[Claims Made Coverage|claims-made]] basis, include defense costs within the limit, and give the insured a say in settlement.

> $$\text{Paid} = \min\big(I + E,\ L\big)$$

> $$\text{Paid}_{\text{hammer}} = \min\big(S + E_0 + h\,(I + E - S - E_0)^+,\ L\big)$$

- **Symbols:** $I$ is the indemnity, the damages or settlement the insured must pay, $E$ is the defense cost and $L$ is the limit of liability, which defense costs erode. Under a hammer clause, $S$ is the settlement the insurer recommended and the insured refused, $E_0$ is the defense cost incurred up to that point, and $h$ is the share of later costs the insurer still pays, which is 0 under a full hammer clause.
- **Why a separate policy:** The [[Commercial General Liability|CGL]] covers bodily injury and property damage caused by an occurrence, and it is commonly endorsed to exclude professional services. A professional's errors often cause purely financial loss, such as a missed filing deadline or a faulty audit, which is neither bodily injury nor property damage, so the professional needs coverage written for it.
- **Claims-made trigger:** The policy covers claims first made during the policy period for wrongful acts on or after the retroactive date. An extended reporting period covers claims made after the policy ends, which matters to a professional who retires or changes insurers. Claims-made coverage limits the insurer's exposure to unreported claims in a line where errors can surface years later.
- **Defense within limits:** Most professional liability forms count defense costs against the limit, unlike the CGL, which pays them in addition. A long defense can therefore leave little of the limit for the settlement or judgment.
- **Consent to settle:** Because a settlement can damage a professional's reputation, many policies require the insured's consent before the insurer settles. A hammer clause limits this right: if the insured refuses a settlement the insurer recommends, the insurer's payment is capped at that settlement plus defense costs to date. A soft hammer clause has the insurer also pay a stated share of the costs after the refusal.
- **Directors and officers liability:** D&O insurance is a related management liability coverage for claims that directors and officers made wrongful decisions in managing the organization. It pays the individuals for loss the organization does not indemnify (Side A), reimburses the organization when it indemnifies them (Side B), and often covers the organization itself for securities claims (Side C).
- **Pricing and reserving:** Professional liability is a [[Long Tail Lines|long-tail]] line with low frequency, high severity and heavy defense costs. Claims-made rates step up over the first years of a program as the policy covers more years of prior acts.

> [!example]- A Refused Settlement Under a Hammer Clause {Example}
> An accounting firm's E&O policy has a \$2,000,000 claims-made limit with defense within limits. After \$150,000 of defense costs, the client suing the firm offers to settle for \$400,000. The insurer recommends accepting, but the firm refuses. The case goes to trial, with \$350,000 more of defense costs and a judgment of \$1,100,000. What does the insurer pay under (a) a full hammer clause, (b) a soft hammer clause with the insurer paying 50% of the costs after the refusal, and (c) no hammer clause?
>
> > [!answer]-
> > The total cost is $150{,}000 + 350{,}000 + 1{,}100{,}000 = 1{,}600{,}000$, and the insurer's capped amount is the refused settlement plus defense to date.
> > $$
> > \begin{align*}
> > S + E_0 &= 400{,}000 + 150{,}000 \\
> > &= 550{,}000 \\
> > \text{Paid}_{(b)} &= 550{,}000 + 0.5\,(1{,}600{,}000 - 550{,}000) \\
> > &= 1{,}075{,}000 \\
> > \text{Paid}_{(c)} &= \min(1{,}600{,}000,\ 2{,}000{,}000) \\
> > &= 1{,}600{,}000
> > \end{align*}
> > $$
> > Under the full hammer clause the insurer pays \$550,000 and the firm \$1,050,000. Under the soft hammer the firm pays \$525,000, and with no hammer clause it pays nothing. The clause puts the cost of refusing a reasonable settlement on the insured who refuses it.

> [!example]- Defense Costs Eroding the Limit {Example}
> An architect has a professional liability policy for the year 2025 with a \$1,000,000 limit, defense within limits, and a retroactive date of January 1, 2020. In March 2025 a client sues over a design error made in 2022. Defense costs reach \$380,000 and the case settles for \$900,000. Is the claim covered, and what does the architect pay?
>
> > [!answer]-
> > The claim is first made during the 2025 policy period, for a wrongful act after the retroactive date, so the policy responds.
> > $$
> > \begin{align*}
> > \text{Paid} &= \min(900{,}000 + 380{,}000,\ 1{,}000{,}000) \\
> > &= 1{,}000{,}000 \\
> > \text{Architect} &= 1{,}280{,}000 - 1{,}000{,}000 \\
> > &= 280{,}000
> > \end{align*}
> > $$
> > Under a CGL-style form with defense outside the limits, the insurer would have paid the whole \$1,280,000. With defense inside the limit, the architect needs a higher limit, or excess coverage, to carry the same protection.

> [!tip]- How it appears on the exam
> - **GI-302:** Candidates describe professional liability among the specialty coverages, including who buys it, why the CGL does not cover the exposure, and the features that set it apart: the claims-made trigger, defense within limits and the consent to settle provision.
> - **DISC-IA:** Questions describe professional liability alongside D&O and other management liability coverages, and an applied question can ask what the insurer pays after a refused settlement or once defense costs have eroded the limit.

> [!warning]- Exam traps
> - **Defense inside the limit:** Unlike the CGL, most professional liability policies count defense costs against the limit. Adding defense on top of a full-limit payment overstates what the insurer owes.
> - **Claims-made, not occurrence:** Coverage depends on when the claim is first made and whether the wrongful act is after the retroactive date. An error made during the policy year but claimed after it ends is not covered without an extended reporting period or a renewal.
> - **The hammer caps the insurer, not the insured:** After a refused settlement, the insurer's payment is limited to the recommended settlement plus defense to date, and the insured bears everything above it. The insured does not lose the coverage already owed.
> - **Pure financial loss:** A professional's error that causes only financial loss is not bodily injury or property damage, so the CGL would not cover it even without a professional services exclusion.
