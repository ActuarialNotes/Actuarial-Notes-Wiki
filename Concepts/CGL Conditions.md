---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7bbe8581cd975ceeed4573e76aeef73a7e4d339b9a29937a530b6397ad8ebdf7
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Section IV conditions 1-9 (pp.11-13), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Conditions.md
---

**CGL Conditions** are the nine provisions in Section IV of the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition) that set the insured's and the insurer's duties after the policy is bought. They sit beside the [[Common Policy Conditions]] that apply to every coverage part of a commercial package.

The nine conditions are:

1. **Bankruptcy.** The bankruptcy or insolvency of the insured or its estate does not relieve the insurer of its obligations.
2. **Duties in the event of occurrence, offense, claim or suit.** What the insured must do after an occurrence, offense, claim or suit.
3. **Legal action against us.** When the insurer can be sued.
4. **Other insurance.** How the insurer shares a loss with other insurance.
5. **Premium audit.** How the premium is computed after the policy period.
6. **Representations.** By accepting the policy, the named insured agrees that the statements in the declarations are accurate and complete, that they are based on its representations, and that the insurer issued the policy relying on them.
7. **Separation of insureds.** How the insurance treats several insureds.
8. **Transfer of rights of recovery against others to us.** The insurer's right of [[Salvage and Subrogation|subrogation]].
9. **When we do not renew.** The insurer must mail or deliver written notice of nonrenewal to the first named insured at least 30 days before expiration. Proof of mailing is sufficient proof of notice.

## Duties in the event of occurrence, offense, claim or suit

The named insured must see that the insurer is notified as soon as practicable of an occurrence or offense that may result in a claim. Where possible the notice says how, when and where it happened, the names and addresses of injured persons and witnesses, and the nature and location of the injury. If a claim is made or a suit brought, the named insured must immediately record the specifics and the date received, notify the insurer as soon as practicable, and see that the insurer receives written notice.

The named insured and any other involved insured must immediately send copies of demands, notices, summonses and legal papers. They must authorize the insurer to obtain records, cooperate in the investigation, settlement or defense, and help the insurer enforce rights against others who may be liable to the insured.

No insured may voluntarily make a payment, assume an obligation or incur an expense, other than for first aid, without the insurer's consent, except at its own cost. Prompt notice meets the notice duty but does not turn such a payment or promise into a covered obligation.

> [!example]- Which duties did this café owner fail to meet? {Example}
> A customer falls on a wet floor in a café. The owner pays for her taxi to the hospital and, to keep her goodwill, promises to cover all her medical bills and lost wages. The owner tells no one, and three months later the customer sues. The owner sends the summons to the insurer two weeks after receiving it.
>
> > [!answer]-
> > - The owner may provide first aid without the insurer's consent.
> > - Promising to pay medical bills and wages assumes an obligation without the insurer's consent, so that promise is at the owner's own cost.
> > - The owner had to notify the insurer as soon as practicable of an occurrence that might result in a claim. Saying nothing for three months does not meet that duty.
> > - Once sued, the owner had to send copies of the summons immediately. Holding it for two weeks does not meet that duty.

## Legal action against us

No one may join the insurer in a suit seeking damages from an insured, or sue the insurer under the policy unless all its terms have been complied with. A person may sue the insurer to recover on an agreed settlement or a final judgment against an insured, but not for damages the policy doesn't cover or that exceed the limit. An agreed settlement is one signed by the insurer, the insured and the claimant or the claimant's legal representative. A claimant therefore cannot sue the insurer to establish the insured's liability.

## Other insurance

For Coverages A and B, the insurance is primary unless the excess provision applies. If other insurance is also primary, the insurers share the loss by the method of sharing.

The insurance is excess over other insurance, whether primary or not, of these kinds:

1. Fire, extended coverage, builder's risk, installation risk or similar coverage for "your work".
2. Fire insurance for premises rented to or temporarily occupied by the named insured.
3. Insurance the named insured bought to cover its liability as a tenant for damage to such premises.
4. Insurance for aircraft, autos or watercraft not excluded under Coverage A.
5. Any other primary insurance under which the named insured has been added as an additional insured.

When it is excess, it has no duty to defend if another insurer has that duty. If none defends, it will, taking over the insured's rights against the others. It pays only its share of the loss above what all the other insurance would pay plus their deductibles and self-insured amounts.

If all the other primary insurance permits contribution by equal shares, this policy does too: each insurer contributes equal amounts until it has paid its limit or none of the loss remains. For two insurers with limits $L_1 \le L_2$ sharing a loss $X \le L_1 + L_2$, the first insurer's share is

> $$\text{Share}_1 = \min\left(\frac{X}{2},\ L_1\right)$$

and the second insurer pays the rest:

> $$\text{Share}_2 = X - \text{Share}_1$$

If any of the other insurance does not permit equal shares, the insurers contribute by limits. Each pays the ratio of its limit to all insurers' limits:

> $$\text{Share}_j = X \times \frac{L_j}{\sum_i L_i}$$

- $L_j$ is insurer $j$'s applicable limit.

> [!example]- How do these two primary policies share a loss, by equal shares and by limits? {Example}
> A contractor is an insured under its own CGL with a $\$1{,}000{,}000$ limit and, for one project, under another primary policy with a $\$2{,}000{,}000$ limit. Neither policy is excess over the other. Find each insurer's share of a $\$1{,}800{,}000$ loss and of a $\$2{,}500{,}000$ loss.
>
> > [!answer]-
> > - By equal shares, a $\$1{,}800{,}000$ loss is split evenly, $\$900{,}000$ each, because neither limit is reached.
> > - By equal shares, a $\$2{,}500{,}000$ loss would give each $\$1{,}250{,}000$, more than the first limit. The first insurer pays its $\$1{,}000{,}000$ limit and the second pays $\$1{,}500{,}000$.
> > - By limits, the first insurer pays one-third and the second two-thirds.
> > - Of the $\$1{,}800{,}000$ loss, that is $\$600{,}000$ and $\$1{,}200{,}000$.
> > - Of the $\$2{,}500{,}000$ loss, that is $\$833{,}333.33$ and $\$1{,}666{,}666.67$.

## Premium audit

The insurer computes all premiums by its rules and rates. The advance premium is only a deposit. At the end of each audit period the insurer computes the earned premium and notifies the first named insured, and returns any excess of advance and audit premiums paid over the earned premium. The first named insured must keep the records needed and send copies on request ([[Premium Audit|premium audit]]).

> [!example]- A café paid a $\$12{,}000$ advance premium, and at audit its sales give an earned premium of $\$10{,}800$. What happens? {Example}
> - The $\$12{,}000$ advance premium was a deposit.
> - The premium paid exceeds the earned premium by $12{,}000 - 10{,}800 = \$1{,}200$.
> - The insurer returns $\$1{,}200$ to the first named insured.

## Separation of insureds and transfer of rights

Except for the limits of insurance and any rights or duties given specifically to the first named insured, the insurance applies as if each named insured were the only named insured, and separately to each insured against whom a claim is made or suit brought. One insured can therefore be covered for a claim brought by another, but the [[CGL Limits of Insurance|limits]] apply once for all of them.

If the insured has rights to recover any payment the insurer has made, those rights pass to the insurer. The insured must do nothing after a loss to impair them, and at the insurer's request must bring suit or transfer the rights and help enforce them. A waiver of subrogation endorsement gives up this right against a named party ([[CGL Endorsements]]).

> [!trap] Dividing an equal-shares loss in proportion to the limits
> Under equal shares, a loss is split evenly until the smaller limit is reached, whatever the limits are. Only contribution by limits divides in proportion to the limits. A $\$1{,}800{,}000$ loss under $\$1{,}000{,}000$ and $\$2{,}000{,}000$ limits is $\$900{,}000$ each by equal shares, not $\$600{,}000$ and $\$1{,}200{,}000$.
