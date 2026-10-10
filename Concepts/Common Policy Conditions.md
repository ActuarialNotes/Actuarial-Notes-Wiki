---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:24c194e42efb4ce765da9e42c231851d92c0c167ae14709c47824ee56960fae6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Common Policy Conditions.md
---

**Common Policy Conditions** are the six conditions in the Insurance Services Office (ISO) form IL 00 17 that apply to every coverage part of a commercial package policy: cancellation, changes, examination of books and records, inspections and surveys, premiums, and transfer of rights and duties. Putting them in one form means the property, general liability, crime and other coverage parts of one policy share a single set of rules for how the contract is kept, changed and ended, and each coverage part adds only the conditions specific to its own coverage.

> $$R_{\text{pro rata}} = P \times \frac{T - t}{T}$$

> $$R_{\text{short rate}} = P \times \big(1 - s(t)\big)$$

> $$\text{Notice} \geq \begin{cases} 10 \text{ days} & \text{nonpayment of premium} \\ 30 \text{ days} & \text{any other reason} \end{cases}$$

- **Symbols:** $P$ is the policy premium for the term of $T$ days, $t$ is the number of days the policy has run when the cancellation takes effect, and $R$ is the return premium. The short-rate earned fraction $s(t)$ comes from the insurer's short-rate table or rule and is larger than $t/T$, so a short-rate refund is smaller than a pro rata one. The third block is the insurer's minimum notice before its cancellation takes effect.
- **Cancellation:** The first named insured may cancel at any time by mailing or delivering advance written notice to the insurer. The insurer may cancel by mailing or delivering written notice to the first named insured at its last known mailing address, at least 10 days before the effective date for nonpayment of premium and 30 days before for any other reason. When the insurer cancels, the refund is pro rata, and when the first named insured cancels, it may be less than pro rata. Cancellation takes effect even if the refund has not been made or offered, and proof of mailing is sufficient proof of notice. State amendatory endorsements often lengthen these periods or limit the reasons an insurer may cancel.
- **Changes:** The policy contains all the agreements between the parties. The first named insured is authorized to request changes with the insurer's consent, and the terms can be amended or waived only by an [[Endorsement|endorsement]] issued by the insurer.
- **Examination of books and records:** The insurer may examine and audit the named insured's books and records as they relate to the policy, at any time during the policy period and up to three years afterward. This supports the [[Premium Audit|premium audit]] of policies rated on payroll, sales or other exposures known only after the fact.
- **Inspections and surveys:** The insurer has the right, but not the duty, to inspect the insured's premises and operations, give reports and recommend changes. By doing so it does not undertake to make the premises safe or to certify that they comply with laws, which protects it from being sued over an inspection that missed a hazard. The same protection extends to rating and advisory organizations, but not to inspections the insurer makes to certify boilers, pressure vessels or elevators under state or municipal law.
- **Premiums:** The first named insured is responsible for paying all premiums and is the one who receives any return premium. Other named insureds are covered but do not owe the premium.
- **Transfer of rights and duties:** The insured's rights and duties under the policy cannot be transferred without the insurer's written consent, because the insurer underwrote this insured and not a buyer of its business. The exception is the death of an individual named insured, whose legal representative takes over the rights and duties while acting within that role, and until one is appointed, a person with proper temporary custody of the property has them for that property only.
- **The first named insured:** Several conditions single out the first named insured, the one listed first in the declarations, as the party who cancels, requests changes, pays premiums and receives refunds and notices. This avoids conflicting instructions when one policy names several related businesses.

> [!example]- Pro Rata and Short-Rate Return Premium {Example}
> A commercial package policy has an annual premium of \$12,000. It is cancelled after 146 days of its 365-day term. Find the return premium (a) if the insurer cancels, and (b) if the first named insured cancels and the insurer's rule earns an illustrative short-rate premium equal to the pro rata earned premium plus 10% of the pro rata unearned premium.
>
> > [!answer]-
> > When the insurer cancels, the refund is the full pro rata [[Unearned Premium|unearned premium]].
> > $$
> > \begin{align*}
> > R_{\text{pro rata}} &= 12{,}000 \times \frac{365 - 146}{365} \\
> > &= 7{,}200
> > \end{align*}
> > $$
> > Under the short-rate rule the insurer keeps 10% of that unearned premium as well as the \$4,800 earned.
> > $$
> > \begin{align*}
> > R_{\text{short rate}} &= 0.90 \times 7{,}200 \\
> > &= 6{,}480
> > \end{align*}
> > $$
> > The insured gives up \$720 by cancelling. The penalty covers the acquisition and underwriting costs the insurer spent up front and expected to recover over the full term, and it discourages buying coverage for only the riskiest part of a year.

> [!example]- Cancelling for Nonpayment {Example}
> A contractor's annual policy has a premium of \$7,300, earned at \$20 a day, and the contractor paid a \$1,800 deposit. The second installment goes unpaid, and the insurer mails a notice of cancellation for nonpayment on day 110 of the term. What is the earliest day the cancellation can take effect under IL 00 17, and what does the contractor owe or receive if it takes effect then?
>
> > [!answer]-
> > For nonpayment the insurer must give at least 10 days' notice, so the earliest effective date is day 120. The premium earned by then is set against the deposit.
> > $$
> > \begin{align*}
> > \text{Earned} &= 120 \times 20 \\
> > &= 2{,}400 \\
> > \text{Owed} &= 2{,}400 - 1{,}800 \\
> > &= 600
> > \end{align*}
> > $$
> > The contractor owes \$600 of earned premium and receives no refund. Had the insurer cancelled for another reason, such as a change in the risk, it would have needed 30 days' notice, and the earned premium would have been worked out pro rata to the later date. A state amendatory endorsement can require longer notice than the form.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is to understand the common policy conditions. Questions name a situation, such as a cancellation, a request to add a location, an audit after expiration, a loss-control visit or the sale of the insured business, and ask which condition governs it and what it requires.
> - **Return premium:** A question can give a premium and a cancellation date and ask for the refund when the insurer cancels and when the insured does, which is the pro rata against short-rate distinction.
> - **Linked pages:** The conditions specific to property coverage are on [[Commercial Property Insurance]] and the [[Building and Personal Property Coverage Form]].

> [!warning]- Exam traps
> - **Who cancels decides the refund:** The insurer's cancellation always returns pro rata premium. Only the first named insured's cancellation can produce a smaller, short-rate refund.
> - **Ten days or thirty:** Ten days' notice is for nonpayment of premium only. Any other reason needs at least thirty under the form, and state law can require more.
> - **Inspections are a right, not a duty:** The insurer may inspect and recommend, but it does not guarantee safety or legal compliance. An answer that makes the insurer liable for a hazard its inspector missed has the condition backwards.
> - **Transfer needs consent:** Selling the business does not carry the policy to the buyer without the insurer's written consent. The only automatic transfer is to the legal representative of an individual named insured who dies.
