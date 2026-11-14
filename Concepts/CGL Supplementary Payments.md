---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3004e96a9ff3661a6e195bfa7e6782ed991a1c3afd380d463fadec4d2b79a987
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Supplementary Payments — Coverages A and B, para 1 a-g and para 2 a-f with closing paragraphs (pp.8-9); Coverage A exclusion b(2) (p.2), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "IRMI glossary, 'supplementary payments', definition (supplementary payments reduce the limit under most professional liability policies), sha256:c92a78b38fd66ecb1c07cba19b0645c8dea320c74f369a3f7fb543dd8cad8320 — https://www.irmi.com/term/insurance-definitions/supplementary-payments"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Supplementary Payments.md
---

A **CGL Supplementary Payment** is a cost the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition) pays in addition to its limits when the insurer investigates or settles a claim or defends a suit under Coverages A and B. Supplementary payments do not reduce the limits of insurance, so for one claim the insurer pays

> $$C_{\text{insurer}} = \min\left(D,\ L\right) + S$$

- $D$ is the damages.
- $L$ is the applicable limit.
- $S$ is the supplementary payments.

The supplementary payments are:

- (a) All expenses the insurer incurs, such as the defense attorneys, investigators and experts it engages, paid in full and without a cap. This is why [[Duty to Defend|defense]] costs on a CGL don't erode the limit.
- (b) Up to $\$250$ for the cost of bail bonds required because of accidents or traffic law violations arising out of the use of any vehicle to which the bodily injury liability coverage applies. The insurer does not have to furnish the bonds.
- (c) The cost of bonds to release attachments, but only for bond amounts within the applicable limit of insurance. The insurer does not have to furnish the bonds.
- (d) All reasonable expenses the insured incurs at the insurer's request to assist in investigating or defending the claim or suit, including actual loss of earnings up to $\$250$ a day because of time off from work.
- (e) All court costs taxed against the insured in the suit, but not attorneys' fees or attorneys' expenses taxed against the insured.
- (f) Prejudgment interest awarded against the insured on the part of the judgment the insurer pays. If the insurer offers to pay the applicable limit, it pays no prejudgment interest for the period after the offer.
- (g) All interest on the full amount of any judgment that accrues after the judgment is entered and before the insurer has paid, offered to pay or deposited in court the part of the judgment within the applicable limit.

The section is titled Supplementary Payments, Coverages A and B. [[CGL Coverage C|Coverage C]], which pays medical expenses regardless of fault, has no supplementary payments. Under many professional liability policies, defense costs reduce the limit ([[Professional Liability Insurance]]). Under the CGL they don't, though the duty to defend still ends once the limit is used up in judgments or settlements ([[CGL Coverage A Insuring Agreement]]).

## Prejudgment and post-judgment interest

Prejudgment interest is paid only on the part of the judgment the insurer pays, so its share is

> $$I_{\text{pre}} = I \times \frac{\min(D,\ L)}{D}$$

- $I$ is the prejudgment interest awarded on the full judgment $D$.

Post-judgment interest runs on the whole judgment, including the part above the limit, but only until the insurer pays, offers or deposits its part. An insurer that pays its limit as soon as the judgment is entered owes none.

> [!example]- What does the insurer pay on this judgment above the limit, and what does the contractor bear? {Example}
> A contractor's CGL has a $\$1{,}000{,}000$ each occurrence limit. After a trial, the court enters a $\$1{,}300{,}000$ bodily injury judgment against the contractor, with:
>
> | Item | Amount ($) |
> | :--- | ---: |
> | Prejudgment interest, on the full judgment | 130,000 |
> | Court costs | 6,000 |
> | Plaintiff's attorneys' fees taxed against the contractor | 20,000 |
> | Insurer's defense counsel | 85,000 |
> | Owner's travel at the insurer's request | 400 |
>
> The owner also missed 4 days of work worth $\$300$ a day at the insurer's request. The insurer deposits its $\$1{,}000{,}000$ in court 73 days after the judgment is entered, and post-judgment interest runs at 6% a year, simple.
>
> > [!answer]-
> > - The damages are capped at the $\$1{,}000{,}000$ limit.
> > - Prejudgment interest is paid on the insurer's share: $130{,}000 \times 1{,}000{,}000 / 1{,}300{,}000 = \$100{,}000$.
> > - Post-judgment interest runs on the full judgment until the deposit: $1{,}300{,}000 \times 0.06 \times 73/365 = \$15{,}600$.
> > - The owner's expenses are $400 + 4 \times 250 = \$1{,}400$, with lost earnings capped at $\$250$ a day.
> > - The supplementary payments are $85{,}000 + 1{,}400 + 6{,}000 + 100{,}000 + 15{,}600 = \$208{,}000$.
> > - The insurer pays $1{,}000{,}000 + 208{,}000 = \$1{,}208{,}000$.
> > - The contractor bears the $\$300{,}000$ of the judgment above the limit, the $\$30{,}000$ of prejudgment interest on that excess, and the $\$20{,}000$ of attorneys' fees, which item (e) does not cover.

## Defending an indemnitee

When the insurer defends an insured and an indemnitee of the insured is named in the same suit, the insurer defends the indemnitee too if all of these hold:

1. The suit seeks damages for which the insured assumed the indemnitee's liability in an "insured contract".
2. The insurance applies to that assumed liability.
3. The insured also assumed the indemnitee's defense, or its cost, in the same insured contract.
4. No conflict appears between the interests of the insured and the indemnitee.
5. Both ask the insurer to conduct and control the indemnitee's defense and agree to the same counsel.
6. The indemnitee agrees in writing to cooperate, send copies of legal papers, notify its other insurers and coordinate them, and authorizes the insurer to obtain records and control the defense.

None of the conditions requires the indemnitee to be an insured. While they are met, the attorneys' fees and necessary litigation expenses are paid as supplementary payments. They are not damages and don't reduce the limits, even though Coverage A's contractual liability exclusion would otherwise treat an indemnitee's defense costs as damages ([[CGL Coverage A Exclusions]]). The obligation ends when the limit is used up in judgments or settlements, or when the conditions or the indemnitee's written agreement are no longer met.

> [!example]- In which of these three cases must the subcontractor's insurer also defend the project owner? {Example}
> A subcontractor agreed in a written construction contract to assume the project owner's tort liability for injuries arising from the subcontractor's work, and to pay for the owner's defense. A worker employed by another trade is injured and sues both. The subcontractor's CGL insurer is defending the subcontractor.
>
> - (a) Every condition is met.
> - (b) The owner's lawyer insists on separate counsel of the owner's choosing.
> - (c) The suit alleges that the owner alone was at fault, while the subcontractor argues the owner's own conduct caused the injury.
>
> > [!answer]-
> > - In case (a) it must. The contract is an insured contract, the insurance applies and the defense was also assumed, so the owner's defense costs are supplementary payments and don't reduce the limits.
> > - In case (b) it need not, because the indemnitee and the insured must agree to the same counsel.
> > - In case (c) it need not, because no conflict may appear between the interests of the insured and the indemnitee, and here they are blaming each other.

> [!trap] Subtracting defense costs from the limit
> Supplementary payments never reduce the limits. With a $\$1{,}000{,}000$ limit, $\$85{,}000$ of defense costs and a $\$1{,}300{,}000$ judgment, the insurer still pays the full $\$1{,}000{,}000$ of damages, not $\$915{,}000$.
