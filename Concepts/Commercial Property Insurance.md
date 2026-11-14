---
aliases:
  - ISO Commercial Property
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d39380b81091d6119fe0da728c46b319c509eae869eb267e10e34e0ceda2db69
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form, A.1.a-c covered property; A.5 PPO extension $2,500; D deductible once per occurrence; F.1 coinsurance, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO CP 00 90 07 88 Commercial Property Conditions, A concealment; C control of property; D legal action 2 years; E other insurance; F policy period/territory; I transfer of rights, sha256:3f8eba686357a15901c6ca7fc2b6999b01ac63ae5525b60a4e9597e6f39d12d5 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+90&ed=07-88"
    - "ISO IL 00 17 11 98 Common Policy Conditions, A-F, sha256:965a8a0deb36ac7fcb29ae356d89b1ca01776dd99b1aae2a22cf46bb13611db2 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=IL+00+17&ed=11-98"
    - "ISO CP 00 30 10 12 Business Income (And Extra Expense) Coverage Form, A.1-2, sha256:4b77049e08827380f912161468b9aef9b182853f5a217f50993546366d101b98 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+30&ed=10-12"
    - "ISO CP 10 30 10 12 Causes of Loss – Special Form, A, sha256:119fcd978212db836e1084ca8ca90c0fdacb60d157caf4867bbc7b4e02f498e3 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2018/09/CP.10.30.10.12-1-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Commercial Property Insurance.md
---
**Commercial Property Insurance** covers a business's buildings, the personal property it uses in the business, property of others in its care, and the income it loses when covered property is damaged. In the United States most of it is written on the Insurance Services Office (ISO) commercial property coverage part, a form of [[Property Insurance|property insurance]] that can stand alone as a monoline policy or join the [[Commercial General Liability|general liability]] and other coverage parts in a commercial package policy.

An ISO commercial property coverage part consists of:

1. **The commercial property declarations.**
2. **One or more coverage forms**, which say what property or income is covered. The [[Building and Personal Property Coverage Form]] (BPP) covers direct damage to buildings and contents, and the [[Business Income Coverage|business income]] forms cover the income lost and the extra expense incurred while the property is restored.
3. **One or more causes-of-loss forms.** The coverage form does not list perils. A separate [[Causes of Loss|causes-of-loss]] form does, either the basic or broad form, which name the perils covered, or the special form, which covers direct physical loss from any cause that is not excluded or limited.
4. **The commercial property conditions.**
5. **Any [[Endorsement|endorsements]].**

A complete policy adds the common policy declarations and the common policy conditions, which apply to every coverage part in the policy. The common policy conditions cover cancellation, changes, inspections and audits, premium payment, and transfer of the policy, which needs the insurer's consent.

## Categories of loss exposure

A commercial [[Property Loss Exposure|property loss exposure]] is described by the property, the cause of loss and the financial consequences, as for any [[Loss Exposure|loss exposure]]. The property falls into buildings, personal property owned by the business (furniture, machinery, stock), and property of others it holds. The financial consequences are the reduction in the property's value and the net income lost, either as revenue that stops or as extra expense to keep operating. The business's total loss from one event is

> $$L = L_{\text{bldg}} + L_{\text{BPP}} + L_{\text{others}} + L_{\text{income}}$$

- $L_{\text{bldg}}$ is the damage to its buildings.
- $L_{\text{BPP}}$ is the damage to its business personal property.
- $L_{\text{others}}$ is the damage to property of others in its care.
- $L_{\text{income}}$ is the business income lost while operations are interrupted.

Each part of the loss falls under an item of the policy, and the payment on item $i$ is

> $$\text{Paid}_i = \min\big((L_i - D_i)^+,\ C_i\big)$$

- $L_i$ is the part of the loss that falls under item $i$.
- $D_i$ is the [[Deductible|deductible]] applied to it.
- $C_i$ is its limit.

> [!example]- How does this bakery's fire loss sort into the coverage part, and what does the BPP form pay? {Example}
> A bakery owns its building and insures it with a BPP form and a business income form. The BPP form has these limits and a $\$5{,}000$ deductible per occurrence:
>
> | Item | Limit ($) | Fire loss ($) |
> | :--- | ---: | ---: |
> | Building | 900,000 | 310,000 |
> | Business personal property (ovens, stock) | 250,000 | 140,000 |
> | Personal property of others (a customer's linens and trays) | 25,000 | 12,000 |
>
> The fire also closes the bakery for 10 weeks, costing $\$95{,}000$ of income. The coinsurance requirement is met and the fire is a covered cause of loss.
>
> > [!answer]-
> > - The building damage is a building exposure, the ovens and stock are business personal property, the customer's items are property of others, and the closure is a net income loss.
> > - The total loss is $310{,}000 + 140{,}000 + 12{,}000 + 95{,}000 = \$557{,}000$.
> > - The deductible applies once to the occurrence, here taken from the building loss, so the building is paid $\min(305{,}000,\ 900{,}000) = \$305{,}000$.
> > - The business personal property and the property of others are within their limits, so they are paid $\$140{,}000$ and $\$12{,}000$.
> > - The BPP form pays $305{,}000 + 140{,}000 + 12{,}000 = \$457{,}000$. Without the personal property of others limit, the customer's items would fall only under a small coverage extension.
> > - The $\$95{,}000$ of lost income is not covered by the BPP at all. It is paid under the business income form.

## Commercial property conditions

These conditions apply to every coverage form in the part. They void coverage for concealment, misrepresentation or fraud, and they limit a suit against the insurer to two years after the direct physical loss. They provide that the insured's breach at one location does not affect coverage at others, and they set the policy territory. The insurer takes over the insured's rights of recovery against others ([[Salvage and Subrogation|subrogation]]), and the insured may waive those rights in writing before a loss.

They also set the other insurance rule: insurance on the same plan shares a loss in proportion to its limits, and any other insurance is primary to this policy. Under the other insurance condition, $\text{Share}_j$ is the proportion of a loss that policy $j$ pays when several policies insure the same property on the same terms, and it is

> $$\text{Share}_j = \frac{C_j}{\sum_k C_k}$$

- $C_j$ is the limit of policy $j$, and the sum runs over every policy on the same terms.

Proportional sharing under the other insurance condition applies only to policies written on the same terms. Against any other insurance, the commercial property policy is excess, so splitting a loss by limits there misstates both insurers' payments.

> [!example]- What does each insurer pay on this warehouse's windstorm loss under the other insurance condition? {Example}
> A warehouse is insured by two commercial property policies on identical forms: $\$2{,}000{,}000$ with insurer A and $\$1{,}000{,}000$ with insurer B. Both carry the agreed value option, so coinsurance does not apply. A windstorm causes a covered loss of $\$750{,}000$, and deductibles are ignored.
>
> > [!answer]-
> > - The policies are on the same plan, terms and conditions, so each pays the proportion its limit bears to the total limit.
> > - Insurer A's share is $2{,}000{,}000/3{,}000{,}000 = 2/3$, so it pays $\tfrac{2}{3} \times 750{,}000 = \$500{,}000$.
> > - Insurer B pays $750{,}000 - 500{,}000 = \$250{,}000$, and the insured recovers the full loss.

## Provisions affecting the amount of loss

An underwriter evaluates the provisions that set what a loss costs the insurer. These are the limits and whether they are specific to one building or blanket over several, the valuation basis ([[Replacement Cost|replacement cost]] or actual cash value), the deductible, and the coinsurance percentage with its options. A coinsurance clause or agreed value supports [[Insurance to Value|insurance to value]], and the limits are set against the [[Probable Maximum Loss|probable maximum loss]] at each location.

> [!trap] Paying lost income under the BPP form
> The BPP form pays for direct damage to property. Lost income and extra expense need a business income form, so an answer that pays lost profits under the BPP is wrong.
