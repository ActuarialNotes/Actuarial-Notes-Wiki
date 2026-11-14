---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:192fb0bcd3e5dbb6b320d4b48e21201f34e3e3a1a4d834e980bffe2489b998af
  sources:
    - "ISO IL 00 17 11 98 Common Policy Conditions (specimen), §A–F p.1, sha256:965a8a0deb36ac7fcb29ae356d89b1ca01776dd99b1aae2a22cf46bb13611db2 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=IL+00+17&ed=11-98 (The Nationwide forms host regenerates its PDFs per request: bytes differ from the writer's copies, extracted text identical.)"
    - "New York Insurance Law §3426(b)–(c) (NY Senate official text, read via WebFetch, no digest), (b), (c) — https://www.nysenate.gov/legislation/laws/ISC/3426"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Common Policy Conditions.md
---

**Common Policy Conditions** are the six conditions in the Insurance Services Office (ISO) form IL 00 17 that apply to every coverage part of a commercial package policy. The property, general liability, crime and other coverage parts of one policy share these rules for how the contract is kept, changed and ended, and each coverage part adds only the conditions specific to its own coverage.

The six conditions are:

| Condition | What it says |
| :--- | :--- |
| Cancellation | Either party may cancel, the insurer only on written notice. |
| Changes | The policy contains all the agreements between the parties. The first named insured is authorized to request changes with the insurer's consent. |
| Examination of books and records | The insurer may examine and audit the named insured's books and records as they relate to the policy, at any time during the policy period and up to three years afterward. |
| Inspections and surveys | The insurer has the right, but not the duty, to inspect the insured's premises and operations, give reports and recommend changes. |
| Premiums | The first named insured is responsible for paying all premiums and is the one who receives any return premium. |
| Transfer of rights and duties | The rights and duties pass to another party only with the insurer's written consent. |

Several conditions single out the first named insured, the one listed first in the declarations, as the party who cancels, requests changes, pays premiums and receives refunds and notices. This avoids conflicting instructions when one policy names several related businesses. The terms can be amended or waived only by an [[Endorsement|endorsement]] issued by the insurer. Examination of books and records supports the [[Premium Audit|premium audit]] of policies rated on payroll, sales or other exposures known only after the fact. The nine conditions that apply to a whole commercial property coverage part are the [[Commercial Property Conditions]].

## Cancellation

The first named insured may cancel at any time by mailing or delivering advance written notice to the insurer. The insurer may cancel by mailing or delivering written notice to the first named insured at its last known mailing address, at least 10 days before the effective date for nonpayment of premium and 30 days before for any other reason. The insurer's minimum notice is

> $$\text{Notice} \geq \begin{cases} 10 \text{ days} & \text{nonpayment of premium} \\ 30 \text{ days} & \text{any other reason} \end{cases}$$

Cancellation takes effect even if the refund has not been made or offered, and proof of mailing is sufficient proof of notice. State amendatory endorsements often lengthen these periods or limit the reasons an insurer may cancel.

> [!example]- What is the earliest day this cancellation can take effect, and what does the contractor owe or receive then? {Example}
> A contractor's annual policy has a premium of $\$7{,}300$, earned at $\$20$ a day, and the contractor paid a $\$1{,}800$ deposit. The second installment goes unpaid, and the insurer mails a notice of cancellation for nonpayment on day 110 of the term.
>
> > [!answer]-
> > - For nonpayment the insurer must give at least 10 days' notice, so the earliest effective date is day 120.
> > - The premium earned by then is $120 \times 20 = \$2{,}400$.
> > - Set against the deposit, the contractor owes $2{,}400 - 1{,}800 = \$600$ of earned premium and receives no refund.
> > - Had the insurer cancelled for another reason, such as a change in the risk, it would have needed 30 days' notice.

## Return premium on cancellation

When the insurer cancels, the refund is pro rata, and when the first named insured cancels, it may be less than pro rata. For a premium $P$ for a term of $T$ days, cancelled after $t$ days, the pro rata return premium is

> $$R_{\text{pro rata}} = P \times \frac{T - t}{T}$$

and the short-rate return premium is

> $$R_{\text{short rate}} = P \times \big(1 - s(t)\big)$$

- $s(t)$ is the short-rate earned fraction from the insurer's short-rate table or rule.
- $s(t)$ is larger than $t/T$, so a short-rate refund is smaller than a pro rata one.

> [!example]- What is the return premium if the insurer cancels, and if the first named insured cancels? {Example}
> A commercial package policy has an annual premium of $\$12{,}000$ and is cancelled after 146 days of its 365-day term. The insurer's rule earns an illustrative short-rate premium equal to the pro rata earned premium plus 10% of the pro rata unearned premium.
>
> > [!answer]-
> > - When the insurer cancels, the refund is the full pro rata [[Unearned Premium|unearned premium]], $12{,}000 \times (365 - 146)/365 = \$7{,}200$.
> > - When the first named insured cancels, the insurer keeps 10% of that unearned premium as well as the $\$4{,}800$ earned.
> > - The short-rate refund is $0.90 \times 7{,}200 = \$6{,}480$, so the insured gives up $\$720$ by cancelling.
> > - The penalty covers the acquisition and underwriting costs the insurer spent up front and expected to recover over the full term.

## Inspections and surveys

By inspecting, the insurer does not undertake to make the premises safe or to certify that they comply with laws, which protects it from being sued over an inspection that missed a hazard. The same protection extends to rating and advisory organizations, but not to inspections the insurer makes to certify boilers, pressure vessels or elevators under state or municipal law.

## Transfer of rights and duties

The insured's rights and duties under the policy cannot be transferred without the insurer's written consent, because the insurer underwrote this insured and not a buyer of its business. The exception is the death of an individual named insured, whose legal representative takes over the rights and duties while acting within that role, and until one is appointed, a person with proper temporary custody of the property has them for that property only.

> [!trap] Using 30 days' notice for nonpayment
> Ten days' notice is for nonpayment of premium only. Any other reason needs at least thirty under the form, and state law can require more.
