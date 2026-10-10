---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aa4b7f2c172e78efece419676d3136a0a5d801f2baa7d042a279efca41c0e33b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Administration.md
---

**Reinsurance Administration** is the set of records, systems and routines through which a ceding company and its reinsurers keep track of what has been ceded under each treaty, and bill, settle and report on it for as long as the policies stay in force. It decides how much of each new policy is retained or ceded, keeps each cession in step with changes to the underlying policy, and produces the premium, claim and reserve figures both companies' financial statements depend on. Good administration is what makes the treaty's terms happen in practice; poor administration leaves cessions missed, premiums wrong and reserve credits unsupported.

> $$R_{\text{new}} = \min\bigl(F,\ \max(L - I,\ 0)\bigr)$$

> $$C_{\text{new}} = F - R_{\text{new}}$$

> $$\text{Settlement} = \Pi - A - X$$

- **Symbols:** $F$ is the face amount of the new policy, $L$ the cedant's retention limit for the insured's age, rating and product, and $I$ the amount the cedant already retains on the same life. $R_{\text{new}}$ and $C_{\text{new}}$ are the amounts retained and ceded. In a settlement, $\Pi$ is the reinsurance premium due for the period, $A$ the allowances the reinsurer pays back, and $X$ the claims and other amounts it owes, so a positive settlement is owed to the reinsurer.
- **Individual cession administration:** The cedant sends the reinsurer a record for each policy ceded and each change to it, and the reinsurer keeps the cession records, calculates the premiums and bills the cedant. It suits facultative business and small volumes, but it duplicates records at both companies.
- **Bulk or self-administration:** The cedant keeps the cession records, calculates the premiums and sends the reinsurer periodic reports, usually a summary statement with a detailed listing of policies (a bordereau). It is the usual method for automatic business, because one set of records is cheaper, but it puts the burden of accuracy on the cedant and makes the reinsurer rely on audits.
- **Retention management:** The cedant must track everything it retains on each life across all its policies, so that a new policy is retained only up to the limit and the excess is ceded. The amount ceded must fall within the treaty's automatic binding limit, and the total in force and applied for on the life within the jumbo limit, or the case goes facultative. Changes such as increases, reductions, conversions, reinstatements and lapses each change the cession and must flow through.
- **Billing and settlement:** Premiums, allowances, claims and experience refunds are settled monthly or quarterly on a net basis, as the treaty's offset clause allows. Statements are reconciled to the inforce listing, and the reinsurer's reserve credit on the cedant's books must agree with what the reinsurer reports.
- **Data quality and audits:** Missed cessions, wrong rates or ages and policies left on the books after they ended are the usual errors. The treaty's errors and omissions clause puts the parties back where they would have been, which may mean back premiums. Reinsurers audit cedants' administration and claims under the treaty's access-to-records clause, and modern programs replace periodic files with standardized, more frequent data exchange.
- **Managing the program:** Beyond the routine, the cedant's reinsurance function reviews retention limits, keeps an inventory of treaties and their terms, and monitors exposure to each reinsurer. It also judges recapture opportunities and reports the cost and benefit of the program to management, as part of its [[Reinsurance Strategy|reinsurance strategy]].

> [!example]- Ceding a Policy Above Retention {Example}
> A cedant's retention limit is \$1,000,000 for a standard life at issue age 45 and \$500,000 for a life rated table 4. Its treaty's automatic binding limit is \$4,000,000 ceded for standard lives and \$2,000,000 for table 4, and the jumbo limit is \$20,000,000 in force and applied for. The cedant already retains \$400,000 on a 45-year-old applicant who now buys a \$2,000,000 policy. Find the retained and ceded amounts if the applicant is (a) standard or (b) rated table 4, and check that each cession is automatic.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > R_{(a)} &= \min\bigl(2{,}000{,}000,\ 1{,}000{,}000 - 400{,}000\bigr) \\
> > &= 600{,}000 \\
> > C_{(a)} &= 2{,}000{,}000 - 600{,}000 \\
> > &= 1{,}400{,}000 \\
> > R_{(b)} &= \min\bigl(2{,}000{,}000,\ 500{,}000 - 400{,}000\bigr) \\
> > &= 100{,}000 \\
> > C_{(b)} &= 2{,}000{,}000 - 100{,}000 \\
> > &= 1{,}900{,}000
> > \end{align*}
> > $$
> > Both cessions are within their binding limits, \$4,000,000 and \$2,000,000, and the \$2,400,000 on the life is far below the jumbo limit, so both are ceded automatically. Had the earlier policy used up the whole retention, the cedant would retain nothing and cede the full \$2,000,000, which in case (b) would still just fit the table 4 limit.

> [!example]- Netting a Quarterly Settlement {Example}
> For a quarter on a YRT treaty, a cedant's self-administered statement shows renewal premiums of \$2,400,000 and first-year premiums of \$300,000, on which the reinsurer allows 100%. Claims recoverable are \$1,850,000. An audit also found a policy that should have been ceded two years ago, with back premiums of \$45,000. Find the net amount due.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Pi &= 2{,}400{,}000 + 300{,}000 + 45{,}000 \\
> > &= 2{,}745{,}000 \\
> > \text{Settlement} &= 2{,}745{,}000 - 300{,}000 - 1{,}850{,}000 \\
> > &= 595{,}000
> > \end{align*}
> > $$
> > The cedant pays the reinsurer \$595,000. Under the errors and omissions clause the missed cession is covered as if it had been reported on time, provided the back premium is paid, so a claim on that policy would still be recoverable.

> [!tip]- How it appears on the exam
> - **CP-341:** Questions ask for the features of individual and bulk administration and the advantages of each, how retention is tracked and applied across a life's policies, and what can go wrong with data and how it is controlled. Questions on managing reinsurance ask how a company reviews its retention, its treaties and its reinsurers.
> - **Calculations:** A short calculation gives a retention schedule, binding limits and existing coverage, and asks how much of a new policy is ceded and whether it goes automatic or facultative.

> [!warning]- Exam traps
> - **Retention is per life:** The retention limit applies to the total the cedant keeps on one life across all its policies. Applying it to the new policy alone retains too much.
> - **Limits differ by risk class:** Retention and binding limits often fall for substandard ratings and older ages. Using the standard limit for a rated life gets both the retained amount and the automatic check wrong.
> - **Binding limit versus jumbo limit:** The binding limit caps what is ceded automatically on the case, while the jumbo limit caps the total in force and applied for on the life with all companies. A case can be within one and outside the other.
> - **Errors and omissions is not a waiver:** The clause restores the intended position, so a missed cession is ceded retroactively with its back premiums. It does not let either party keep the benefit of the error.
