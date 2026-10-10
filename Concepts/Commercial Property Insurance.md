---
aliases:
  - ISO Commercial Property
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:9e18cf8eeeecbc6d1a1fc0b24b07119399be9782fd48cc73de650b148c40bdf6
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

> $$L = L_{\text{bldg}} + L_{\text{BPP}} + L_{\text{others}} + L_{\text{income}}$$

> $$\text{Paid}_i = \min\big((L_i - D_i)^+,\ C_i\big)$$

> $$\text{Share}_j = \frac{C_j}{\sum_k C_k}$$

- **Symbols:** $L$ is the business's total loss from one event, split into damage to its buildings, to its business personal property (BPP), to property of others in its care, and the business income lost while operations are interrupted. $L_i$ is the part of the loss that falls under item $i$ of the policy, $D_i$ is its [[Deductible|deductible]] and $C_i$ is its limit. Under the other insurance condition, $\text{Share}_j$ is the proportion of a loss that policy $j$ pays when several policies insure the same property on the same terms.
- **Categories of loss exposure:** A commercial [[Property Loss Exposure|property loss exposure]] is described by the property, the cause of loss and the financial consequences, as for any [[Loss Exposure|loss exposure]]. The property falls into buildings, personal property owned by the business (furniture, machinery, stock), and property of others it holds. The financial consequences are the reduction in the property's value and the net income lost, either as revenue that stops or as extra expense to keep operating.
- **The coverage part:** An ISO commercial property coverage part consists of the commercial property declarations, one or more coverage forms, one or more causes-of-loss forms, the commercial property conditions and any [[Endorsement|endorsements]]. A complete policy adds the common policy declarations and the common policy conditions, which apply to every coverage part in the policy.
- **Coverage forms:** The coverage form says what property or income is covered. The [[Building and Personal Property Coverage Form]] (BPP) covers direct damage to buildings and contents, and the [[Business Income Coverage|business income]] forms cover the income lost and the extra expense incurred while the property is restored.
- **Causes-of-loss forms:** The coverage form does not list perils. A separate [[Causes of Loss|causes-of-loss]] form does, either the basic or broad form, which name the perils covered, or the special form, which covers direct physical loss from any cause that is not excluded or limited.
- **Commercial property conditions:** These conditions apply to every coverage form in the part. They void coverage for concealment, misrepresentation or fraud, and they limit a suit against the insurer to two years after the direct physical loss. They provide that the insured's breach at one location does not affect coverage at others, and they set the policy territory. They also set the other insurance rule: insurance on the same plan shares a loss in proportion to its limits, and any other insurance is primary to this policy. The insurer takes over the insured's rights of recovery against others ([[Salvage and Subrogation|subrogation]]), and the insured may waive those rights in writing before a loss.
- **Common policy conditions:** These apply to the whole policy and cover cancellation, changes, inspections and audits, premium payment, and transfer of the policy, which needs the insurer's consent.
- **Provisions affecting the amount of loss:** An underwriter evaluates the provisions that set what a loss costs the insurer. These are the limits and whether they are specific to one building or blanket over several, the valuation basis ([[Replacement Cost|replacement cost]] or actual cash value), the deductible, and the coinsurance percentage with its options. A coinsurance clause or agreed value supports [[Insurance to Value|insurance to value]], and the limits are set against the [[Probable Maximum Loss|probable maximum loss]] at each location.

> [!example]- Sorting a Bakery Fire Into the Coverage Part {Example}
> A bakery owns its building and insures it under a commercial property coverage part with a BPP form (building limit \$900,000, business personal property limit \$250,000, personal property of others limit \$25,000, \$5,000 deductible per occurrence) and a business income form. A fire causes \$310,000 of damage to the building and \$140,000 to ovens and stock, destroys a \$12,000 catering order of a customer's linens and trays held at the bakery, and closes the bakery for 10 weeks, costing \$95,000 of income. Classify each part of the loss and find the BPP form's payment. Assume the coinsurance requirement is met and the loss is from a covered cause.
>
> > [!answer]-
> > The building damage is a building exposure, the ovens and stock are business personal property, the customer's items are property of others, and the closure is a net income loss.
> > $$
> > \begin{align*}
> > L &= 310{,}000 + 140{,}000 + 12{,}000 + 95{,}000 \\
> > &= 557{,}000
> > \end{align*}
> > $$
> > The BPP form covers the first three items, each under its own limit. The deductible applies once to the occurrence, here taken from the building loss.
> > $$
> > \begin{align*}
> > \text{Paid}_{\text{bldg}} &= \min(310{,}000 - 5{,}000,\ 900{,}000) \\
> > &= 305{,}000 \\
> > \text{Paid}_{\text{BPP}} &= \min(140{,}000,\ 250{,}000) \\
> > &= 140{,}000 \\
> > \text{Paid}_{\text{others}} &= \min(12{,}000,\ 25{,}000) \\
> > &= 12{,}000
> > \end{align*}
> > $$
> > The BPP form pays \$457,000, all within its limits. Without the personal property of others limit, the customer's items would fall only under a small coverage extension. The \$95,000 of lost income is not covered by the BPP at all. It is paid under the business income form, which is why a bakery without that form would bear the whole income loss after a fully insured fire.

> [!example]- Two Policies on the Same Building {Example}
> A warehouse is insured by two commercial property policies on identical forms: \$2,000,000 with insurer A and \$1,000,000 with insurer B. Both carry the agreed value option, so coinsurance does not apply. A windstorm causes a covered loss of \$750,000. Ignoring deductibles, what does each insurer pay under the other insurance condition?
>
> > [!answer]-
> > The policies are on the same plan, terms and conditions, so each pays the proportion its limit bears to the total limit.
> > $$
> > \begin{align*}
> > \text{Share}_A &= \frac{2{,}000{,}000}{3{,}000{,}000} \\
> > &= \tfrac{2}{3} \\
> > \text{Paid}_A &= \tfrac{2}{3} \times 750{,}000 \\
> > &= 500{,}000 \\
> > \text{Paid}_B &= 750{,}000 - 500{,}000 \\
> > &= 250{,}000
> > \end{align*}
> > $$
> > The insured recovers the full loss, and neither insurer pays more than its share. Had insurer B's policy been written on different terms, the condition would make insurer A's policy excess over B's, so B would pay up to its \$1,000,000 limit first.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask why the commercial property conditions matter, by applying one of them to a loss: a suit filed too late, a waiver of subrogation, two policies sharing a loss, or a breach at another location.
> - **DISC-RM:** The underwriting questions ask how the limits, valuation basis, deductible and coinsurance provisions change the amount the insurer pays on a loss, and how the underwriter uses them on an account.
> - **GI-302:** Candidates describe commercial property insurance in terms of the categories of loss exposure, and describe the contents of the ISO commercial property policy and the coverage it provides, alongside the CGL.

> [!warning]- Exam traps
> - **The coverage form names no perils:** Whether a loss is covered depends on both the coverage form, which says what property is covered, and the causes-of-loss form, which says which perils are covered. Reading only the BPP cannot answer a question about flood or theft.
> - **Income is a separate form:** The BPP pays for direct damage to property. Lost income and extra expense need a business income form, so an answer that pays lost profits under the BPP is wrong.
> - **Pro rata only on the same plan:** Proportional sharing under the other insurance condition applies only to policies written on the same terms. Against any other insurance, the commercial property policy is excess, so splitting a loss by limits there misstates both insurers' payments.
