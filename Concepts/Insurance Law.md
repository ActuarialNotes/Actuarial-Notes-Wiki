---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7aa814f21cb5d07cc24a4bff08ed35f8ec06d1659bed6ab09bf572d0ddc939f8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Law.md
---
**Insurance Law** is the body of contract law, agency law, statute and case law that governs how an [[Insurance Policy|insurance policy]] is formed, interpreted and enforced. Courts treat a policy as a special kind of contract, and the doctrines built on its features decide whether a claim is paid and how much the insured can recover.

An insurance policy is a contract, so it is enforceable only if all four elements of a contract are present:

1. **Offer and acceptance.** The applicant's application with the premium is usually the offer, and the insurer accepts by issuing the policy or by an agent binding coverage.
2. **Consideration.** The premium, or the promise to pay it, is the insured's consideration, and the insurer's promise to pay covered losses is its consideration.
3. **Capacity to contract.** A minor or a person without mental capacity may be able to void the contract.
4. **Legal purpose.** A policy insuring an illegal activity, or written without an [[Insurable Interest|insurable interest]], has no legal purpose.

Contract doctrine is mostly common law, made by judges case by case, while statutes and insurance regulations set mandatory provisions, standard policy terms and unfair claims practices rules. In the United States both are largely state law.

## Aleatory, conditional, unilateral and personal contracts

An insurance policy is an aleatory contract. The amounts exchanged depend on chance, so one party may pay far more than it receives, which is what insurance is for. An aleatory contract still needs an insurable interest and still only indemnifies, and a policy written with no interest is unenforceable because it would be a wager.

The insurer's promise is conditional on the insured meeting the policy conditions, such as giving notice of a loss and cooperating in the claim. The policy is also unilateral. Only the insurer makes legally enforceable promises; the insured can stop paying premium, and the policy simply lapses. A property policy insures a person, not a thing, so it is personal and cannot be assigned to a buyer of the property without the insurer's consent.

## Contracts of adhesion

An insurance policy is a contract of adhesion. The insurer drafts the policy and the insured takes it or leaves it, so courts construe an ambiguity against the insurer, the drafter. They do so only when the wording supports two reasonable readings: clear wording that excludes a loss is enforced, however harsh the result. Some courts go further and honour the insured's reasonable expectations of coverage, even against the wording.

> [!example]- How much does this property policy pay for a \$180,000 loss at a warehouse next door? {Example}
> A business owner's property policy has a \$250,000 limit for business personal property and a sublimit described as "\$50,000 for property away from premises". A \$180,000 loss occurs at a warehouse the insured rents next door, which the policy does not define as premises or not.
>
> > [!answer]-
> > - The warehouse can reasonably be read as part of the premises or as away from them.
> > - Both readings are reasonable, so the ambiguity is construed against the insurer, which drafted the wording, and the full limit applies.
> > - The insured's reading also matches its reasonable expectation that property at a location it rents for the business is covered.
> > - The policy pays \$180,000.

## Utmost good faith

Each party is entitled to rely on the other's honesty, which is the [[Duty of Good Faith|duty of good faith]]. A material misrepresentation on the application, a breach of warranty, or concealment of a material fact the applicant knew the insurer would want can let the insurer rescind the policy. A fact is material when knowing the truth would have led the insurer to decline the risk or charge a different premium. Most states require only materiality, not intent to deceive, for rescission.

> [!example]- Does the insurer pay these two claims after a misstatement on the application? {Example}
> 1. The application said the building had a sprinkler system. It never had one, the insurer's guidelines decline unsprinklered risks of that type, and a \$400,000 fire follows.
> 2. The application stated a roof age of 10 years when it was 12. The insurer's rates are the same for both ages, and a \$60,000 windstorm loss follows.
>
> > [!answer]-
> > - The sprinkler misstatement is material, because the insurer would have declined the risk had it known the truth.
> > - The insurer may rescind that policy from inception, so it pays nothing and returns the premium.
> > - The roof-age misstatement is immaterial, since the truth would not have changed the insurer's decision or the premium.
> > - It is no ground to deny the claim, so the insurer pays \$60,000, less any deductible.

## Indemnity and subrogation

Property and liability policies indemnify, restoring the insured's loss without letting the insured profit from it. For an actual loss $X$, the principle of indemnity is

> $$\text{Insurer's payment} + \text{Other recoveries} \le X$$

Once the insurer pays, it is subrogated to the insured's rights against whoever caused the loss, which stops the insured from collecting twice and keeps the cost on the wrongdoer. The insurer acquires those rights only to the extent it has paid. Under a made-whole rule, where the insured is repaid first, the insured's share of a [[Salvage and Subrogation|subrogation]] recovery $S$ from a negligent third party is

> $$R_{\text{insured}} = \min(S,\ d)$$

- $d$ is the part of the loss the insured bore, such as the [[Deductible|deductible]].

The insurer's share is

> $$R_{\text{insurer}} = S - \min(S,\ d)$$

Many states and policies split recoveries differently.

> [!example]- How is this recovery split under a made-whole rule and pro rata, and can the insured also sue the other driver? {Example}
> An insured's car suffers \$21,000 of damage when another driver runs a red light. The insurer pays \$20,000 under collision coverage, after a \$1,000 deductible, and then sues the other driver in subrogation, recovering \$15,000 net of its collection costs.
>
> > [!answer]-
> > - Under a made-whole rule, the insured is repaid first, up to the deductible: $R_{\text{insured}} = \min(15{,}000,\ 1{,}000) = \$1{,}000$ and $R_{\text{insurer}} = \$14{,}000$.
> > - Pro rata, the insured bore $1/21$ of the loss and the insurer $20/21$, so the insured gets $15{,}000 \times 1/21 = \$714.29$ and the insurer $\$14{,}285.71$.
> > - The insured cannot also sue for the \$20,000. That right passed to the insurer when it paid, and collecting it again would give the insured \$41,000 for a \$21,000 loss, which breaks the principle of indemnity.

## Agency, waiver and estoppel

An [[Agent|agent]] binds the insurer within its express, implied or apparent authority. An insurer that knowingly gives up a right, or leads the insured to rely on its conduct, may be held to have waived it or be estopped from asserting it.

> [!trap] Treating any misstatement as grounds to rescind
> A false statement on the application lets the insurer rescind only if it was material. Saying any misstatement voids the policy, or that intent to deceive is always needed, misses the test most courts apply.
