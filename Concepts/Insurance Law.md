---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3637bae2d87c63347acfce742fce25b42e04f61c2d97a63da91cbd132345623c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Law.md
---

**Insurance Law** is the body of contract law, agency law, statute and case law that governs how an [[Insurance Policy|insurance policy]] is formed, interpreted and enforced. An insurance policy is a contract, so it needs the elements of any contract, but courts treat it as a special kind of contract with features of its own. Those features, and the doctrines built on them, decide whether a claim is paid and how much the insured can recover.

> $$\text{Enforceable contract} \iff \left\{\begin{array}{l} \text{offer and acceptance} \\ \text{consideration} \\ \text{capacity to contract} \\ \text{legal purpose} \end{array}\right.$$

> $$\text{Insurer's payment} + \text{Other recoveries} \le X$$

> $$R_{\text{insured}} = \min(S,\ d)$$

> $$R_{\text{insurer}} = S - \min(S,\ d)$$

- **Symbols:** All four elements must be present for a contract to be enforceable. In the second line, $X$ is the insured's actual loss, and the inequality is the principle of indemnity. In the last two, $S$ is a [[Salvage and Subrogation|subrogation]] recovery from a negligent third party and $d$ is the part of the loss the insured bore, such as the [[Deductible|deductible]]. They show the split under a made-whole rule, where the insured is repaid first; many states and policies split recoveries differently.
- **The elements in insurance:** The applicant's application with the premium is usually the offer, and the insurer accepts by issuing the policy or by an agent binding coverage. The premium, or the promise to pay it, is the insured's consideration, and the insurer's promise to pay covered losses is its consideration. A minor or a person without mental capacity may be able to void the contract, and a policy insuring an illegal activity, or written without an [[Insurable Interest|insurable interest]], has no legal purpose.
- **Aleatory and conditional:** The amounts exchanged depend on chance, so one party may pay far more than it receives, which is what insurance is for. The insurer's promise is conditional on the insured meeting the policy conditions, such as giving notice of a loss and cooperating in the claim.
- **Adhesion and reasonable expectations:** The insurer drafts the policy and the insured takes it or leaves it, so courts construe an ambiguity against the insurer, the drafter. Some courts go further and honour the insured's reasonable expectations of coverage, even against the wording.
- **Utmost good faith:** Each party is entitled to rely on the other's honesty, which is the [[Duty of Good Faith|duty of good faith]]. A material misrepresentation on the application, a breach of warranty, or concealment of a material fact the applicant knew the insurer would want can let the insurer rescind the policy. A fact is material when knowing the truth would have led the insurer to decline the risk or charge a different premium.
- **Indemnity and subrogation:** Property and liability policies indemnify, restoring the insured's loss without letting the insured profit from it. Once the insurer pays, it is subrogated to the insured's rights against whoever caused the loss, which stops the insured from collecting twice and keeps the cost on the wrongdoer.
- **Unilateral and personal:** Only the insurer makes legally enforceable promises; the insured can stop paying premium, and the policy simply lapses. A property policy insures a person, not a thing, so it cannot be assigned to a buyer of the property without the insurer's consent.
- **Agency, waiver and estoppel:** An [[Agent|agent]] binds the insurer within its express, implied or apparent authority. An insurer that knowingly gives up a right, or leads the insured to rely on its conduct, may be held to have waived it or be estopped from asserting it.
- **Sources of the law:** Contract doctrine is mostly common law, made by judges case by case, while statutes and insurance regulations set mandatory provisions, standard policy terms and unfair claims practices rules. In the United States both are largely state law.

> [!example]- Subrogation After a Collision Claim {Example}
> An insured's car suffers \$21,000 of damage when another driver runs a red light. The insurer pays \$20,000 under collision coverage, after a \$1,000 deductible, and then sues the other driver in subrogation, recovering \$15,000 net of its collection costs.
>
> (a) Split the recovery under a made-whole rule. (b) Split it pro rata to the shares of the loss each party bore. (c) Can the insured also sue the other driver for the \$20,000 the insurer paid?
>
> > [!answer]-
> > **(a)** The insured is repaid first, up to the deductible.
> > $$
> > \begin{align*}
> > R_{\text{insured}} &= \min(15{,}000,\ 1{,}000) \\
> > &= 1{,}000 \\
> > R_{\text{insurer}} &= 15{,}000 - 1{,}000 \\
> > &= 14{,}000
> > \end{align*}
> > $$
> > **(b)** The insured bore $1/21$ of the loss and the insurer $20/21$.
> > $$
> > \begin{align*}
> > R_{\text{insured}} &= 15{,}000 \times \frac{1{,}000}{21{,}000} \\
> > &= 714.29 \\
> > R_{\text{insurer}} &= 15{,}000 \times \frac{20{,}000}{21{,}000} \\
> > &= 14{,}285.71
> > \end{align*}
> > $$
> > **(c)** No. The insured's right to recover the \$20,000 passed to the insurer when it paid. Collecting it again would give the insured \$41,000 for a \$21,000 loss, which breaks the principle of indemnity.

> [!example]- Three Disputes, Three Doctrines {Example}
> A business owner's property policy produces three disputes. In each, decide what the insurer pays.
>
> 1. The policy has a \$250,000 limit for business personal property and a sublimit described as "\$50,000 for property away from premises". A \$180,000 loss occurs at a warehouse the insured rents next door, which the policy does not define as premises or not.
> 2. The application said the building had a sprinkler system. It never had one, the insurer's guidelines decline unsprinklered risks of that type, and a \$400,000 fire follows.
> 3. The application stated a roof age of 10 years when it was 12. The insurer's rates are the same for both ages, and a \$60,000 windstorm loss follows.
>
> > [!answer]-
> > 1. **\$180,000.** Both readings are reasonable, so the ambiguity is construed against the insurer, which drafted the wording, and the full limit applies. The insured's reading also matches its reasonable expectation that property at a location it rents for the business is covered.
> > 2. **Nothing, and the premium is returned.** The misrepresentation is material, because the insurer would have declined the risk had it known the truth, so the insurer may rescind the policy from inception. Most states require only materiality, not intent to deceive, for rescission.
> > 3. **\$60,000, less any deductible.** The misstatement is immaterial, since the truth would not have changed the insurer's decision or the premium, so it is no ground to deny the claim.

> [!tip]- How it appears on the exam
> - **GI-201:** Objective 1 asks candidates to describe and interpret the underlying principles of insurance law, read in *Business Law for Insurance Professionals*. Expect to list the elements of a contract and the special features of an insurance contract, with a sentence on why each matters.
> - **GI-201:** A fact pattern may describe an application, a binder or a claim and ask which doctrine applies: ambiguity against the drafter, material misrepresentation, concealment, waiver and estoppel, or an agent's apparent authority. The answer names the doctrine and gives its result.
> - **GI-302:** The principles reappear in the coverage objectives, where [[Insurable Interest|insurable interest]] and the principle of indemnity limit what a property policy pays.

> [!warning]- Exam traps
> - **Materiality is the test:** A false statement on the application voids the policy only if it was material. Saying any misstatement lets the insurer rescind, or that intent to deceive is always needed, misses the test most courts apply.
> - **Ambiguity is not unfavourable wording:** Courts construe against the insurer only when the wording supports two reasonable readings. Clear wording that excludes a loss is enforced, however harsh the result.
> - **Aleatory is not a wager:** An aleatory contract still needs an insurable interest and still only indemnifies. A policy written with no interest is unenforceable precisely because it would be a wager.
> - **Subrogation needs payment:** The insurer acquires the insured's rights only to the extent it has paid. Before payment the right belongs to the insured, and the insured's deductible may come first out of any recovery.
