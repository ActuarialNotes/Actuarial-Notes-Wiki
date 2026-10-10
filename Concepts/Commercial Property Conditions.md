---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:074a589451845fbe9622fc8961bd878264ea0c51dc0542754f24c0fc00f06a57
  sources:
    - "ISO CP 00 90 07 88 Commercial Property Conditions (specimen), Conditions A–I pp.1–2, sha256:3f8eba686357a15901c6ca7fc2b6999b01ac63ae5525b60a4e9597e6f39d12d5 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+90&ed=07-88 (The Nationwide forms host regenerates its PDFs per request: bytes differ from the writer's copies, extracted text identical.)"
    - "ISO IL 00 17 11 98 Common Policy Conditions (specimen), §A, sha256:965a8a0deb36ac7fcb29ae356d89b1ca01776dd99b1aae2a22cf46bb13611db2 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=IL+00+17&ed=11-98"
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §E.2, E.6, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "IRMI glossary, 'bailee' (rank 3), definition, sha256:05deaf62465a792bc05b1ea08e7ee790693b03bc439e2e37ed2bab9af03e4a47 — https://www.irmi.com/term/insurance-definitions/bailee"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commercial Property Conditions.md
---

**The Commercial Property Conditions** (ISO form CP 00 90) are the nine conditions that apply to every coverage form in a commercial property coverage part, such as the [[Building and Personal Property Coverage Form|BPP]] and [[Business Income Coverage|business income]] forms: concealment, misrepresentation or fraud; control of property; insurance under two or more coverages; legal action against the insurer; liberalization; no benefit to bailee; other insurance; policy period and coverage territory; and transfer of rights of recovery against others to the insurer. They sit between the [[Common Policy Conditions]], which apply to every coverage part of the policy, and the loss and additional conditions in each coverage form ([[BPP Loss Conditions and Additional Conditions]]). The description below follows the 07 88 edition.

> $$\text{Share}_i = L \times \frac{C_i}{\sum_j C_j}$$

> $$\text{Paid}_{\text{excess}} = \min\big((L - O)^+,\ C\big)$$

> $$t_{\text{suit}} - t_{\text{loss}} \leq 2 \text{ years}$$

- **Symbols:** In the first block, $L$ is the covered loss and $C_i$ is insurer $i$'s limit, when all the insurance covers on the same plan, terms, conditions and provisions. In the second, $O$ is the amount due from other insurance that is not on the same basis, whether or not the insured can collect it, and $C$ is this policy's limit. The third block is the deadline for a suit against the insurer, counted from the date the direct physical loss occurred.
- **Concealment, misrepresentation or fraud:** The coverage part is void for fraud by the named insured relating to it at any time, and void if any insured intentionally conceals or misrepresents a material fact about the coverage part, the covered property, its interest in the property or a claim.
- **Control of property:** An act or neglect of anyone other than the named insured, beyond its direction or control, does not affect the insurance. A breach of condition at one location does not affect coverage at another location where the breach does not exist at the time of the loss.
- **Insurance under two or more coverages:** When two or more of the policy's coverages apply to the same loss, the insurer pays no more than the actual amount of the loss.
- **Legal action against us:** No one may sue the insurer under the coverage part unless there has been full compliance with its terms and the action is brought within two years after the direct physical loss occurred.
- **Liberalization:** If the insurer adopts a revision that would broaden the coverage without additional premium, within 45 days before or during the policy period, the broader coverage applies immediately to this coverage part.
- **No benefit to bailee:** No person or organization other than the named insured that has custody of covered property, such as a carrier or a warehouse, benefits from the insurance. A bailee cannot use the owner's policy to escape liability for damage it causes.
- **Other insurance:** When other insurance covers on the same plan, terms, conditions and provisions, each insurer pays its pro rata share by limits. For any other insurance covering the same loss, this policy pays only the excess over the amount due from it, whether or not it is collectible, and never more than the limit.
- **Policy period, coverage territory:** The insurer covers loss or damage commencing during the policy period shown in the declarations and within the coverage territory: the United States (including its territories and possessions), Puerto Rico and Canada.
- **Transfer of rights of recovery against others to us:** When the insurer pays someone who has a right to recover from another party, that right passes to the insurer to the extent of its payment, and the insured must protect it and do nothing after the loss to impair it ([[Salvage and Subrogation|subrogation]]). The insured may waive its rights in writing before a loss against anyone, and after a loss only against someone insured by the policy, a business it owns or controls or that owns or controls it, or its tenant.

> [!example]- Two Policies, Two Bases {Example}
> A warehouse suffers a \$250,000 covered fire loss. (a) It is insured by two policies on the same plan, terms and conditions, with limits of \$600,000 and \$400,000. What does each pay? (b) Instead, the first policy is the only one on that plan, and a different kind of policy that also covers the loss owes \$80,000. What does the first policy pay?
>
> > [!answer]-
> > (a) Each insurer pays in proportion to its limit.
> > $$
> > \begin{align*}
> > \text{Share}_1 &= 250{,}000 \times \frac{600{,}000}{1{,}000{,}000} \\
> > &= 150{,}000 \\
> > \text{Share}_2 &= 250{,}000 \times \frac{400{,}000}{1{,}000{,}000} \\
> > &= 100{,}000
> > \end{align*}
> > $$
> > (b) The other insurance is not on the same basis, so the commercial property policy is excess over it.
> > $$
> > \begin{align*}
> > \text{Paid} &= \min(250{,}000 - 80{,}000,\ 600{,}000) \\
> > &= 170{,}000
> > \end{align*}
> > $$
> > The answer would be the same if the other insurer were insolvent: the condition makes this policy excess over the amount due, whether or not it can be collected.

> [!example]- Which Condition Governs? {Example}
> Name the commercial property condition that settles each situation. (a) A tenant's careless smoking starts a fire in the landlord's building, and the landlord's insurer pays. (b) The landlord had agreed in the lease, signed two years earlier, not to pursue the tenant for fire damage. (c) The owner of a second location had broken a condition of the coverage part at that location when the first location burned. (d) The owner inflated the value of stock in its claim. (e) A suit against the insurer is filed 30 months after the fire.
>
> > [!answer]-
> > - **(a) Transfer of rights of recovery:** The insurer takes over the landlord's right to recover from the negligent tenant, to the extent of its payment. Control of property also applies: the tenant's neglect, beyond the landlord's control, does not affect the landlord's coverage.
> > - **(b) Transfer of rights of recovery:** A written waiver made before the loss is allowed, so the insurer has no right against the tenant to subrogate to.
> > - **(c) Control of property:** A breach at one location does not affect coverage at another location where it does not exist.
> > - **(d) Concealment, misrepresentation or fraud:** An intentional misrepresentation of a material fact about a claim voids the coverage part.
> > - **(e) Legal action against us:** The suit is outside the two-year limit in the form.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is the significance of the commercial property conditions. Questions describe a situation (a lie on the claim, a negligent tenant, two overlapping policies, a late suit, a bailee's claim, a coverage broadened mid-term) and ask which condition applies and how.
> - **Paired topics:** The conditions are read with the [[Common Policy Conditions]] (cancellation, changes, premiums) and the BPP's own loss conditions; a question can ask which of the three sets contains a given rule.

> [!warning]- Exam traps
> - **Which form holds which condition:** Cancellation is a common policy condition (IL 00 17), appraisal and vacancy are BPP loss conditions, and other insurance and subrogation are commercial property conditions (CP 00 90).
> - **Pro rata only on the same basis:** Contribution by limits applies only to other insurance on the same plan, terms, conditions and provisions; against any other insurance this policy is excess.
> - **Collectible or not:** The excess clause measures the amount due from other insurance, not the amount collected.
> - **Waivers after a loss:** After a loss, the insured may waive recovery rights only against an insured, an affiliated business or its tenant. Waiving rights against anyone else after a loss impairs the insurer's rights.
> - **Other people's acts:** Neglect by a tenant or other party outside the insured's control does not reduce coverage; the insured's own concealment or fraud voids it.
