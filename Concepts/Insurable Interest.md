---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:056484b38c33ee3e3bbb3094b6db98713becc7a79149fcce953044e2f14b7531
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurable Interest.md
---

**Insurable interest** is a relationship to the subject of insurance — a property, a liability exposure, a person's life — such that the policyholder would suffer a genuine financial loss if the insured event occurred. Without it an [[Insurance Policy|insurance policy]] is a wager and unenforceable; with it, the policy indemnifies, and in property insurance the interest also caps what the insured can recover.

> $$\text{Recovery} \le \text{Loss to the insured's interest}$$

> $$\text{Recovery} = \min\big(s \times \text{Loss},\ \text{Limit}\big)$$

- $s$ is the insured's share of the property's value — full ownership $s = 1$, a co-owner or partner less. The bound is the **principle of indemnity**: insurance restores the insured's loss but must not let them profit from the event, which would create [[Moral Hazard|moral hazard]].
- **Who has it.** Owners, co-owners, mortgage lenders (to the loan balance), tenants for improvements they made, and bailees for customers' goods in their care, in property; anyone who can be held legally liable, in liability; oneself, a spouse or dependant, a creditor (to the debt) and an employer in a key employee, in life.
- **When it must exist.** For property and liability cover, at the **time of loss**; for [[Life Insurance|life insurance]], at **inception** only — the policy stays valid if the relationship later ends.
- Insurable interest works alongside the policy's valuation provisions (actual cash value or replacement cost) and [[Coinsurance|coinsurance]]/insurance-to-value clauses: interest decides *whose* loss and how much of it, valuation decides what the loss is worth.
- **Protecting each interest.** A policy protects other parties' interests in several ways. The ISO homeowners form (HO 00 03 05 11) states the cap directly: even when more than one person has an insurable interest, the insurer pays no insured more than that insured's interest at the time of loss, nor more than the limit. A **mortgage clause** (HO 00 03, condition L; the BPP's mortgageholders condition) pays a named mortgagee and the insured as interests appear, in order of precedence, gives the mortgagee advance notice of cancellation or nonrenewal, and keeps the mortgagee's claim valid even when the insured's claim is denied, provided the mortgagee reports any change in ownership, occupancy or substantial change in risk it knows of, pays premium due if the insured has not, and submits a sworn statement of loss within 60 days of notice. The insurer that pays the mortgagee in that case takes over the mortgagee's rights. A **loss payable clause** names another party with an interest in covered property, such as a lender on a financed car or the lessor of leased equipment, to be paid as its interest may appear; under a typical clause the insurer has no obligation to the loss payee if it can deny payment to the insured. An **additional insured** is added to a policy at the named insured's request, as when a tenant must insure a leased building and name the owner.

> [!example]- A Co-Owner Insures the Whole Building {Example}
> A building is owned $70\%$ by Ana and $30\%$ by Ben. Ana alone buys a property policy on it with a $\$600{,}000$ limit and no coinsurance clause. A fire causes $\$200{,}000$ of damage. What does Ana recover, and who bears the rest?
>
> > [!answer]-
> > Ana's insurable interest is her $70\%$ share:
> >
> > $$
> > \begin{align*}
> > \text{Loss to Ana's interest} &= 0.70 \times 200{,}000 \\
> > &= 140{,}000 \\
> > \text{Recovery} &= \min(140{,}000,\ 600{,}000) \\
> > &= \$140{,}000
> > \end{align*}
> > $$
> >
> > Ben, who is not an insured, bears his $\$60{,}000$ share. The $\$600{,}000$ limit does not make the whole loss collectible: Ana cannot recover for a loss that is not hers.

> [!example]- Interest at Inception Versus at Loss {Example}
> Decide whether each claim is payable on insurable interest grounds:
>
> (a) A firm buys a $\$1{,}000{,}000$ policy on its chief actuary's life. She leaves the firm and dies two years later.
>
> (b) A homeowner sells her house on 1 March but keeps her homeowners policy in force; the house burns on 15 April.
>
> (c) An investor buys life insurance on a stranger he has no financial relationship with, naming himself beneficiary.
>
> > [!answer]-
> > (a) **Payable.** Life insurance needs interest at inception; the firm had a key-employee interest when it bought the policy, so her later departure does not void it.
> >
> > (b) **Not payable.** Property insurance needs interest at the time of loss; on 15 April she owned nothing and lost nothing.
> >
> > (c) **Void.** No interest at inception — the contract is a wager on the stranger's life, the abuse insurable-interest law exists to prevent.

> [!example]- Arson Under a Mortgage Clause and a Loss Payable Clause {Example}
> A business owner's building is mortgaged to a bank with \$150,000 outstanding, and the bank is named under the mortgageholders condition of the BPP. A machine inside is leased from an equipment company, named as loss payee under a typical loss payable clause. The owner sets a fire that destroys both, a \$200,000 building loss and a \$40,000 loss to the machine. The insurer denies the owner's claim for arson. The bank has paid no premium and reported nothing, but it had no knowledge of any change in risk and files a sworn proof of loss within 60 days of the insurer's notice. Who is paid?
>
> > [!answer]-
> > - **The bank is paid \$150,000**, its interest. The denial for the owner's act does not defeat a mortgageholder that meets the clause's conditions. The insurer then takes over the bank's rights under the mortgage to the extent of its payment, and can pursue the owner.
> > - **The equipment company is not paid** under a typical loss payable clause, because the insurer can deny payment to the insured. It must look to the owner, or protect itself with broader wording.
> > - **The owner recovers nothing**, having caused the loss intentionally.
> >
> > The mortgage clause works as a separate contract with the lender, which is why lenders rely on it to make large property loans.

> [!tip]- How it appears on the exam
> - **FAM** (*define and apply the concept of insurable interest*): a scenario — business partners, a creditor, a former spouse, a key employee — asking whether the policyholder has insurable interest, and so whether the policy is valid.
> - **GI-302** (*how insurable interest, policy provisions for valuing losses, and insurance to value affect a loss payment amount under property insurance*): a claim calculation that limits recovery to the insured's interest, then applies actual cash value or replacement cost and any coinsurance penalty.
> - **DISC-IA** (*Identifying and Protecting Insurable Interests*): identify every party with an interest in a property — owner, mortgagee, tenant, bailee — and how the policy protects each (named insureds, mortgage clause).

> [!warning]- Exam traps
> - **Testing life interest at death.** Life insurance needs interest only at inception; answering "void" because the relationship ended before death is the classic error.
> - **Testing property interest at inception.** The reverse: a property policy bought by an owner pays nothing once she has sold the property.
> - **Paying the full loss to a partial owner.** Recovery stops at the insured's share even when the limit would cover the whole loss.
> - **Treating a mortgagee's interest as the property's value.** A lender's interest is capped at the outstanding loan balance, not the building's value.
