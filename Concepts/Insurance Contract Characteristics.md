---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:26f772daedc3e029ce58c90d04abe1692d45c49edd216b817a74069ae638a20d
  sources:
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Conditions A, R; Sections I and II Conditions E (pp.13, 17, 23), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "ISO IL 00 17 11 98, Common Policy Conditions (RSUI copy), A.2, F, sha256:f1854d69221a8b317236ebd98e8ade32b3181dd0b4e28786526bdfef36c8029c — https://baservices.rsui.com/fs/api/docid/12603"
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form, E.7 Valuation, G.3 (pp.12, 15), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "Cornell LII Wex, 'indemnity' (fetched 2026-10-10), sha256:9f3a29d97ee6dfe0862cc0f23410d72afc714bb5807a786205c3997e1d3257b2 — https://www.law.cornell.edu/wex/indemnity"
    - "Cornell LII Wex, 'aleatory' (fetched 2026-10-10), sha256:b85e5fb892ab6e88039ef28d735867e7b8997b8f5c27ced1a03a1fdc2535a374 — https://www.law.cornell.edu/wex/aleatory"
    - "Cornell LII Wex, 'adhesion contract (contract of adhesion)' (fetched 2026-10-10), sha256:6cb7999ec8c8f828d339722af1b7e4a3944886565464c14ef86ac9571e590b6f — https://www.law.cornell.edu/wex/adhesion_contract_(contract_of_adhesion)"
    - "Cornell LII Wex, 'contra proferentem' (fetched 2026-10-10), sha256:e17e688d536be7c5603d1061dd780ba795f218487fddb7b78bff817bb6f654f1 — https://www.law.cornell.edu/wex/contra_proferentem"
    - "Cornell LII Wex, 'condition precedent' (fetched 2026-10-10), sha256:470825b2c7643254014cdaa294adcbfe97da8ae9e314ba4bf250bbdacf28dda0 — https://www.law.cornell.edu/wex/condition_precedent"
    - "Cornell LII Wex, 'concealment' (fetched 2026-10-10), sha256:dda54b398acea83570dce0eb40ea36b3c353f59cab0de997e894afc405e74c29 — https://www.law.cornell.edu/wex/concealment"
    - "IRMI Insurance Glossary, 'uberrimae fidei' (fetched 2026-10-10), sha256:b28e66a6e8e964f7e69bf096f936d3e989ee29b53e506fca7e25859426166c57 — https://www.irmi.com/term/insurance-definitions/uberrimae-fidei"
    - "IRMI Insurance Glossary, 'aleatory contract' (fetched 2026-10-10), sha256:a85361edb18a507fb12307f74ddb29cd41f2d625d7503090f00e142fd13a8aa5 — https://www.irmi.com/term/insurance-definitions/aleatory-contract"
    - "IRMI Insurance Glossary, 'contract of adhesion' (fetched 2026-10-10), sha256:64f617126822d706a84424cebea9fe563ab5dc025514a2d384cfc3ff3049cc2b — https://www.irmi.com/term/insurance-definitions/contract-of-adhesion"
    - "IRMI Insurance Glossary, 'unilateral contract' (fetched 2026-10-10), sha256:4d3ff47c332dff164e2b8ad69d448686ad51373afb5e2bb43c300ef59e503890 — https://www.irmi.com/term/insurance-definitions/unilateral-contract"
    - "Wollner, 'A Vote Against Broker-Drafted Manuscript Policies (in Most Cases)', IRMI Expert Commentary, April 2003 (fetched 2026-10-10), sha256:1f2013a05d6dce9552c6be284676609dfeb4b93f96402d918d29bc1419175407 — https://www.irmi.com/articles/expert-commentary/a-vote-against-broker-drafted-manuscript-policies-in-most-cases"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Contract Characteristics.md
---

**Insurance Contract Characteristics** are the legal features that set an [[Insurance Policy|insurance policy]] apart from an ordinary commercial contract and that courts rely on when they interpret one. A property-casualty policy is a contract of **indemnity**, made in **utmost good faith**, **conditional**, **aleatory**, a **contract of adhesion**, **nontransferable** without the insurer's consent, and **unilateral**. Each feature explains a provision found in the forms, such as the concealment or fraud condition, the assignment condition, or the limit of recovery to the insured's interest.

> $$\text{Recovery} \leq \min\big(\text{Loss to the insured's interest},\ \text{Limit}\big)$$

> $$\text{Payment} = \begin{cases} 0, & \text{no covered loss} \\ \min(L,\ C), & \text{covered loss } L \end{cases}$$

- **Symbols:** $L$ is the covered loss and $C$ the applicable limit. The first block is the indemnity principle as the ISO homeowners form (HO 00 03 05 11) states it: whoever has an insurable interest, the insurer is not liable to an insured for more than that insured's interest at the time of loss, or for more than the limit. The second block is the aleatory feature: the premium is paid either way, and the payment depends on an uncertain event.
- **Indemnity:** In an indemnity contract one party promises to compensate the other for loss or damage, and an insurance policy may pay in cash or by repair or replacement. Property insurance restores the insured's loss and no more, which is why recovery is capped by the insured's [[Insurable Interest|insurable interest]] and valued at [[Actual Cash Value|actual cash value]] unless the policy chooses another basis, such as [[Replacement Cost|replacement cost]].
- **Utmost good faith:** Insurance policies are said to be made in utmost good faith (*uberrimae fidei*) because both parties are presumed to disclose all pertinent facts. A **concealment**, failing to reveal information that should be disclosed and that would affect the terms or the making of the contract, can give grounds for avoiding it. The homeowners form gives no coverage to any insured who, before or after a loss, intentionally concealed or misrepresented a material fact, engaged in fraudulent conduct or made false statements.
- **Conditional:** The insurer's duty to pay depends on events and on the insured's compliance. The covered loss is a condition precedent, an event that must occur before the insurer is obligated to perform. The insured must also meet conditions, such as paying premium and reporting losses, to keep the policy in force and to collect. Courts prefer to read a clause as a promise rather than a condition precedent, to avoid forfeiture.
- **Aleatory:** An aleatory contract depends on an uncertain event and transfers value unequally. An insured can pay premiums for many years without a covered loss, or pay a small premium for a short time and then collect for a large one.
- **Contract of adhesion:** The insurer drafts the policy and offers it whole; the buyer accepts or rejects it without bargaining over the wording. Courts therefore construe ambiguous terms against the drafter (*contra proferentem*), and some apply the doctrine of reasonable expectations, under which a party is bound by the terms a reasonable person would expect to be in the contract. These protections weaken for a manuscript policy the insured or its broker helped draft, and some courts limit them for a sophisticated commercial insured.
- **Nontransferable:** The insured may not transfer the policy without the insurer's written consent, because the insurer chose to cover this insured. The ISO Common Policy Conditions (IL 00 17 11 98) bar transfer of the named insured's rights and duties without written consent except on the death of an individual named insured, when they pass to the legal representative. The homeowners form states that an assignment is not valid unless the insurer consents in writing. An insured who sells a building therefore cannot simply hand the policy to the buyer.
- **Unilateral:** Only the insurer makes a legally enforceable promise, to pay covered claims. The insured makes few, if any, enforceable promises; it must instead fulfil conditions, such as paying premiums and reporting accidents, to keep the coverage. When an insured stops paying, the insurer's remedy is the one the policy gives it: the Common Policy Conditions let it cancel on 10 days' written notice for nonpayment of premium.

> [!example]- Naming the Characteristic {Example}
> Name the characteristic of insurance contracts that each situation illustrates.
>
> 1. A court reads an undefined, ambiguous word in a homeowners exclusion in the way most favourable to the insured.
> 2. A homeowner sells her house and gives the buyer her homeowners policy. The insurer refuses to cover the buyer's later fire claim.
> 3. A business pays \$4,000 a year for twenty years without a claim; its neighbour pays \$4,000 once and collects \$900,000 after a fire.
> 4. An applicant for commercial property insurance does not mention that the building has stood vacant for a year, and the insurer later seeks to avoid the policy.
> 5. An insured stops paying premium, and the insurer's response is to cancel the policy on 10 days' notice.
>
> > [!answer]-
> > 1. **Contract of adhesion.** The insurer drafted the wording and the insured could not negotiate it, so ambiguity is construed against the insurer.
> > 2. **Nontransferable.** The policy cannot be assigned without the insurer's written consent. The insurer agreed to cover the seller, not whoever later owns the house.
> > 3. **Aleatory.** The values exchanged are unequal and depend on an uncertain event.
> > 4. **Utmost good faith.** Both parties are presumed to disclose all pertinent facts, and concealing a material fact can let the insurer avoid the contract.
> > 5. **Unilateral.** Only the insurer made an enforceable promise. Paying premium is a condition of keeping the coverage, so the insurer's remedy is to end the coverage.

> [!example]- Indemnity for Two Owners {Example}
> A house is owned 60% by Dana and 40% by Eli, and both are named insureds on a homeowners policy with a \$400,000 dwelling limit. A fire causes \$250,000 of covered damage. Separately, Dana's brother, who has no ownership interest, buys his own policy on the same house and claims after the fire. What does the indemnity principle allow each to recover?
>
> > [!answer]-
> > Each insured recovers no more than the loss to that insured's interest, and the insurer pays no more than the limit in total.
> > $$
> > \begin{align*}
> > \text{Dana} &= 0.60 \times 250{,}000 \\
> > &= 150{,}000 \\
> > \text{Eli} &= 0.40 \times 250{,}000 \\
> > &= 100{,}000
> > \end{align*}
> > $$
> > Together the owners recover the \$250,000 loss, within the \$400,000 limit. The brother has no insurable interest, so he suffered no loss and recovers nothing under his policy. Paying him would let the fire produce a gain, which is the result indemnity exists to prevent.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is the characteristics of insurance policies. Expect a short scenario, such as an ambiguous term, an attempted assignment, a concealed fact or a claim far larger than the premiums paid, and a question asking which characteristic it shows.
> - **Linked provisions:** Questions can tie a characteristic to the provision that carries it: the concealment or fraud condition (utmost good faith), the assignment or transfer condition (nontransferable), the limit of recovery to the insured's interest (indemnity).
> - **Paired objectives:** The characteristics sit beside [[Insurable Risk|ideally insurable loss exposures]] and [[Insurance Policy Structure|policy structure]] in the same section.

> [!warning]- Exam traps
> - **Unilateral is not one-sided in obligations:** The insured still has conditions to meet. What makes the contract unilateral is that only the insurer's promise is legally enforceable.
> - **Conditional is not aleatory:** Conditional is about what must happen before the insurer must perform; aleatory is about the unequal, chance-dependent exchange of value. A question can describe one and offer the other.
> - **Adhesion protects the non-drafter:** Ambiguity is construed against whoever drafted the wording. Where the insured or its broker wrote a manuscript policy, that protection can be lost.
> - **Transfer needs consent, with a death exception:** Under the Common Policy Conditions, rights and duties pass to the legal representative on the death of an individual named insured without the insurer's consent.
