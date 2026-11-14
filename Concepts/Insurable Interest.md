---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:6cd5aa552a51555c2a667ac25396486c3cb63d9d40b09ac769da63b013ac11c3
  sources:
    - "California Insurance Code §283 (via california.public.law), §283, sha256:333eecb69eda84e50dd65e8049caf28a18ee8ba79b6a569e18348ad5b9122aa5 — https://california.public.law/codes/insurance_code_section_283"
    - "California Insurance Code §281 (via california.public.law), §281, sha256:4849b31d0abb5c51e9c45366a046d5f54cb6e4d0ebd43fe0da2f3f29570d06c6 — https://california.public.law/codes/insurance_code_section_281"
    - "FC&S Editors, Insurable Interest in Contract to Purchase Home (PropertyCasualty360, 13 Nov 2009), on Whitten v. Cincinnati Ins. Co., 544 N.E.2d 1169 (1989), sha256:6fe87cac21370094499195e2a8b498fe8cbaca483c7bc38adda4b6ebf0f36494 — https://propertycasualty360.com/fcs/2009/11/13/insurable-interest-in-contract-to-purchase-home-422-6636"
    - "IRMI Insurance Glossary, 'insurable interest', sha256:055edc75d4b610edb423b6d984bf2fc98e723fc77336e6e5a1050f9f2bdb3b49 — https://www.irmi.com/term/insurance-definitions/insurable-interest"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurable Interest.md
---

**Insurable Interest** is a relationship to the subject of insurance, such as a property, a liability exposure or a person's life, such that the policyholder would suffer a genuine financial loss if the insured event occurred. Without it an [[Insurance Policy|insurance policy]] is a wager and unenforceable.

With an insurable interest the policy indemnifies, and in property insurance the interest also caps what the insured can recover:

> $$\text{Recovery} \le \text{Loss to the insured's interest}$$

The bound is the **principle of indemnity**. Insurance restores the insured's loss but must not let the insured profit from the event, which would create [[Moral Hazard|moral hazard]].

## Who has an insurable interest

| Line | Who has an insurable interest |
| :--- | :--- |
| Property | Owners, co-owners, mortgage lenders (to the loan balance), tenants for improvements they made, and bailees for customers' goods in their care |
| Liability | Anyone who can be held legally liable |
| Life | Oneself, a spouse or dependant, a creditor (to the debt) and an employer in a key employee |

Several parties can hold an interest in the same property at once. A lender's interest is capped at the outstanding loan balance, not the building's value, and the loan does not remove the owner's interest.

The interest must rest on a right that the loss would impair: ownership, a contract about the property, a secured interest or a legal liability. A mere expectancy is not insurable. A hope of inheriting property, or an intention to buy it, with no right to the property and no contract for it, gives the holder nothing a loss can take away. A buyer already bound by a contract of sale has an insurable interest before the sale closes and title passes, because the contract is a right the loss would impair.

> [!example]- Which of these three people has an insurable interest in the farmhouse at the time of the fire? {Example}
> A farmhouse is destroyed by fire. Three people had bought fire insurance on it:
>
> 1. The owner's niece, named in the owner's will to inherit the farm, who owns no part of it today.
> 2. A developer who had told the owner it hoped to buy the farm and had made an offer the owner had not accepted.
> 3. A buyer who had signed a binding contract to buy the farm, with closing set for the following month, so title had not yet passed.
>
> > [!answer]-
> > - The niece has no interest. An expected inheritance is a mere expectancy, the owner can change the will, and the niece holds no right in the farm that the fire destroys.
> > - The developer has no interest. A hope or an intention to buy, with no contract, is not insurable, and the developer has lost a chance, not a right.
> > - The buyer has an interest. The signed contract gives the buyer a right in the property, and the fire impairs it.

## When the interest must exist

For property and liability cover, the interest must exist at the **time of loss**. For [[Life Insurance|life insurance]], it must exist at **inception** only, and the policy stays valid if the relationship later ends.

> [!example]- Is each of these claims payable on insurable interest grounds? {Example}
> 1. A firm buys a $\$1{,}000{,}000$ policy on its chief actuary's life. She leaves the firm and dies two years later.
> 2. A homeowner sells her house on 1 March but keeps her homeowners policy in force. The house burns on 15 April.
> 3. An investor buys life insurance on a stranger he has no financial relationship with, naming himself beneficiary.
>
> > [!answer]-
> > - The firm's claim is payable. Life insurance needs interest at inception, and the firm had a key-employee interest when it bought the policy, so her later departure does not void it.
> > - The homeowner's claim is not payable. Property insurance needs interest at the time of loss, and on 15 April she owned nothing and lost nothing.
> > - The investor's policy is void. With no interest at inception, the contract is a wager on the stranger's life, which the insurable interest requirement exists to prevent.

> [!trap] Testing life insurance interest at death
> Life insurance needs an insurable interest only at inception. Answering "void" because the relationship ended before death is the common error. A property policy is the reverse: it pays nothing once the owner has sold the property.

## Recovery limited to the insured's interest

When the insured holds a share of the property, the recovery is

> $$\text{Recovery} = \min\big(s \times \text{Loss},\ \text{Limit}\big)$$

- $s$ is the insured's share of the property's value, with $s = 1$ for full ownership and less for a co-owner or partner.

The ISO homeowners form (HO 00 03 05 11) states the cap directly: even when more than one person has an insurable interest, the insurer pays no insured more than that insured's interest at the time of loss, nor more than the limit. Insurable interest decides whose loss is covered and how much of it. The policy's valuation provisions (actual cash value or replacement cost) and its [[Coinsurance|coinsurance]] or insurance-to-value clauses decide what the loss is worth.

> [!example]- A building is owned 70% by Ana and 30% by Ben, and Ana alone insures it for $\$600{,}000$. What does Ana recover for a $\$200{,}000$ fire? {Example}
> - The policy has no coinsurance clause, and Ana's insurable interest is her $70\%$ share.
> - The loss to Ana's interest is $0.70 \times 200{,}000 = \$140{,}000$.
> - Her recovery is $\min(140{,}000,\ 600{,}000) = \$140{,}000$.
> - Ben, who is not an insured, bears his $\$60{,}000$ share. The limit does not make the whole loss collectible, because Ana cannot recover for a loss that is not hers.

## Protecting each party's interest

A policy protects other parties' interests in several ways:

- **Mortgage clause** (HO 00 03, condition L, and the BPP's mortgageholders condition). It pays a named mortgagee and the insured as interests appear, in order of precedence, and gives the mortgagee advance notice of cancellation or nonrenewal. It keeps the mortgagee's claim valid even when the insured's claim is denied, provided the mortgagee reports any change in ownership, occupancy or substantial change in risk it knows of, pays premium due if the insured has not, and submits a sworn statement of loss within 60 days of notice. The insurer that pays the mortgagee in that case takes over the mortgagee's rights.
- **Loss payable clause.** It names another party with an interest in covered property, such as a lender on a financed car or the lessor of leased equipment, to be paid as its interest may appear. Under a typical clause the insurer has no obligation to the loss payee if it can deny payment to the insured.
- **Additional insured.** A party added to a policy at the named insured's request, as when a tenant must insure a leased building and name the owner.

> [!example]- After the owner's arson, who is paid under the mortgage clause and the loss payable clause? {Example}
> A business owner's building is mortgaged to a bank with $\$150{,}000$ outstanding, and the bank is named under the mortgageholders condition of the BPP. A machine inside is leased from an equipment company, named as loss payee under a typical loss payable clause. The owner sets a fire that destroys both, a $\$200{,}000$ building loss and a $\$40{,}000$ loss to the machine. The insurer denies the owner's claim for arson. The bank has paid no premium and reported nothing, but it had no knowledge of any change in risk and files a sworn proof of loss within 60 days of the insurer's notice.
>
> > [!answer]-
> > - The bank is paid $\$150{,}000$, its interest. The denial for the owner's act does not defeat a mortgageholder that meets the clause's conditions.
> > - The insurer then takes over the bank's rights under the mortgage to the extent of its payment, and can pursue the owner.
> > - The equipment company is not paid under a typical loss payable clause, because the insurer can deny payment to the insured. It must look to the owner, or protect itself with broader wording.
> > - The owner recovers nothing, having caused the loss intentionally.
