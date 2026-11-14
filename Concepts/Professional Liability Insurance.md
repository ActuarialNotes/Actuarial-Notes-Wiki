---
aliases:
  - Professional Liability
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:72be3e5183ff0d26fa81bae7bf0650d546152d1580fe6d63e53926f3df17f323
  sources:
    - "Minnesota Lawyers Mutual, Lawyers Professional Liability sample policy MLM-2000 (06-09), p.1 (claims-made and reported; prior acts retroactive date; claim expense within the applicable limit; insurer will not settle without insured's consent; refusal caps liability at the amount the claim could have been settled for plus claim expense to the date of refusal) and pp.3-4 (extended reporting period options), sha256:f67678eb72c0efcee1b09d1c27fc937c2a31f3b232c0411c46ac89cd395bf7eb — https://mlmins.com/SamplePolicies/MLM-06-09.pdf"
    - "CPA Insurance (CPAI), 'What is a Hammer Clause in a Professional Liability Policy?' (hammer = consent to settle / settlement cap, found in many professional liability policies; full hammer caps at the settlement plus defense to the refusal; soft hammer pays a percentage, such as 70%, of later costs), sha256:4c2d3109cf7483540d9c3379f68eeaf7170022ea56a4811d71d73c61716e040b — https://www.cpai.com/Education-Resources/My-Firm/Firm-Administration/What-is-a-Hammer-Clause-in-a-Professional-Liability-Policy"
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf"
    - "SOA GI-302 Syllabus (2027-07), learning outcome k (specialty coverages incl. excess, umbrella, professional liability, cyber risk, surety, terrorism), p.2, sha256:4b007f27cdfa4e554dca8638841ef73fddfcf1d0d1e3a954be6244f334c3a284 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-302/2027-07-gi-302-syllabus.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Professional Liability Insurance.md
---

**Professional Liability Insurance** covers a professional's [[Liability Insurance|liability]] for injury or financial loss caused by an error, omission or negligent act in rendering, or failing to render, professional services. It is called malpractice insurance for physicians and other health care providers, and errors and omissions (E&O) insurance for lawyers, accountants, architects, engineers, insurance agents and other service businesses.

The [[Commercial General Liability|CGL]] covers bodily injury and property damage caused by an occurrence. A professional's errors often cause purely financial loss, such as a missed filing deadline or a faulty audit, which is neither bodily injury nor property damage, so the professional needs coverage written for it.

Professional liability policies such as the lawyers' and accountants' forms differ from the CGL in three ways:

1. **Claims-made trigger.** The policy covers claims first made during the policy period, under [[Claims Made Coverage|claims-made coverage]].
2. **Defense within limits.** Defense costs count against the limit of liability.
3. **Consent to settle.** The insured has a say in whether a claim is settled.

## The claims-made trigger

The policy covers claims first made during the policy period for wrongful acts on or after the retroactive date. An extended reporting period covers claims made after the policy ends, which matters to a professional who retires or changes insurers. Claims-made coverage limits the insurer's exposure to unreported claims in a line where errors can surface years later.

An error made during the policy year but claimed after the policy ends is not covered without an extended reporting period or a renewal.

## Defense costs within the limit

Professional liability forms such as the lawyers' form count defense costs (claim expense) against the limit, unlike the CGL, which pays them in addition. With defense within the limit, the insurer pays for a claim

> $$\text{Paid} = \min\big(I + E,\ L\big)$$

- $I$ is the indemnity, the damages or settlement the insured must pay.
- $E$ is the defense cost.
- $L$ is the limit of liability.

A long defense can therefore leave little of the limit for the settlement or judgment.

> [!example]- Is this architect's claim covered, and what does the architect pay? {Example}
> An architect has a professional liability policy for the year 2025 with a \$1,000,000 limit, defense within limits, and a retroactive date of January 1, 2020. In March 2025 a client sues over a design error made in 2022. Defense costs reach \$380,000 and the case settles for \$900,000.
>
> > [!answer]-
> > - The claim is first made during the 2025 policy period, for a wrongful act after the retroactive date, so the policy responds.
> > - The indemnity plus defense is $900{,}000 + 380{,}000 = \$1{,}280{,}000$.
> > - The insurer pays $\min(1{,}280{,}000,\ 1{,}000{,}000) = \$1{,}000{,}000$.
> > - The architect pays $1{,}280{,}000 - 1{,}000{,}000 = \$280{,}000$.
> > - Under a CGL-style form with defense outside the limits, the insurer would have paid the whole \$1,280,000.

## Consent to settle and the hammer clause

Because a settlement can damage a professional's reputation, many policies require the insured's consent before the insurer settles. A hammer clause limits this right: if the insured refuses a settlement the insurer recommends, the insurer's payment is capped at that settlement plus defense costs to date. A soft hammer clause has the insurer also pay a stated percentage, such as 70%, of the costs after the refusal. After a refused settlement, the insurer's payment under a hammer clause is

> $$\text{Paid}_{\text{hammer}} = \min\big(S + E_0 + h\,(I + E - S - E_0)^+,\ L\big)$$

- $S$ is the settlement the insurer recommended and the insured refused.
- $E_0$ is the defense cost incurred up to the refusal.
- $h$ is the share of later costs the insurer still pays, which is 0 under a full hammer clause.

The insured bears everything above the insurer's payment, but does not lose the coverage already owed.

> [!example]- What does the insurer pay under a full hammer clause, a 50% soft hammer clause and no hammer clause? {Example}
> An accounting firm's E&O policy has a \$2,000,000 claims-made limit with defense within limits. After \$150,000 of defense costs, the client suing the firm offers to settle for \$400,000. The insurer recommends accepting, but the firm refuses. The case goes to trial, with \$350,000 more of defense costs and a judgment of \$1,100,000.
>
> > [!answer]-
> > - The total cost is $150{,}000 + 350{,}000 + 1{,}100{,}000 = \$1{,}600{,}000$.
> > - The refused settlement plus defense to date is $400{,}000 + 150{,}000 = \$550{,}000$.
> > - Under the full hammer clause, $h = 0$, so the insurer pays \$550,000 and the firm \$1,050,000.
> > - Under the soft hammer, the insurer pays $550{,}000 + 0.5 \times 1{,}050{,}000 = \$1{,}075{,}000$ and the firm \$525,000.
> > - With no hammer clause, the insurer pays $\min(1{,}600{,}000,\ 2{,}000{,}000) = \$1{,}600{,}000$ and the firm nothing.

## Directors and officers liability

Directors and officers (D&O) insurance is a related management liability coverage for claims that directors and officers made wrongful decisions in managing the organization. It pays the individuals for loss the organization does not indemnify (Side A), reimburses the organization when it indemnifies them (Side B), and often covers the organization itself for securities claims (Side C).

> [!trap] Adding defense on top of the limit
> Where a professional liability policy counts defense costs against the limit, the limit is the most the insurer pays for both. On a \$1,000,000 limit with \$380,000 of defense and a \$900,000 settlement, the insurer pays \$1,000,000, not \$1,280,000.
