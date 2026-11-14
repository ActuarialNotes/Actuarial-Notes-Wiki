---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:31a0f74d1984127ac055d69b1d289be182edede2ab44b7f1308253d4c78921e8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Administration.md
---
**Reinsurance Administration** is the set of records, systems and routines through which a ceding company and its reinsurers keep track of what has been ceded under each treaty, and bill, settle and report on it for as long as the policies stay in force. It decides how much of each new policy is retained or ceded, keeps each cession in step with changes to the underlying policy, and produces the premium, claim and reserve figures both companies' financial statements depend on.

Administration is what puts the treaty's terms into practice. Poor administration leaves cessions missed, premiums wrong and reserve credits unsupported.

## Methods of administration

| | Individual cession administration | Bulk or self-administration |
| :--- | :--- | :--- |
| Who keeps the cession records | The reinsurer, from a record the cedant sends for each policy ceded and each change | The cedant |
| Who calculates the premiums | The reinsurer, which bills the cedant | The cedant, which sends periodic reports, a summary statement with a detailed listing of policies |
| Suited to | Facultative business and small volumes | Automatic business, because one set of records is cheaper |
| Drawback | Records are duplicated at both companies | The burden of accuracy is on the cedant, and the reinsurer relies on audits |

The detailed listing of policies sent under self-administration is a [[Bordereau|bordereau]].

## Retention management

The cedant tracks everything it retains on each life across all its policies, so that a new policy is retained only up to the limit and the excess is ceded. For a new policy of face $F$ on a life on which the cedant already retains $I$, the amount retained is

> $$R_{\text{new}} = \min\bigl(F,\ \max(L - I,\ 0)\bigr)$$

- $L$ is the cedant's retention limit for the insured's age, rating and product.

The amount ceded is

> $$C_{\text{new}} = F - R_{\text{new}}$$

The amount ceded must fall within the treaty's automatic binding limit, and the total in force and applied for on the life within the jumbo limit, or the case goes [[Facultative Reinsurance|facultative]]. The binding limit caps what is ceded automatically on the case, while the jumbo limit caps the total on the life with all companies, so a case can be within one and outside the other. Retention and binding limits often fall for substandard ratings and older ages. Increases, reductions, conversions, reinstatements and lapses each change the cession and must flow through.

> [!example]- How much of this policy is retained and ceded if the applicant is standard, or rated table 4, and is each cession automatic? {Example}
> A cedant already retains $\$400{,}000$ on a 45-year-old applicant who now buys a $\$2{,}000{,}000$ policy. Its limits are:
>
> | Limit | Standard | Table 4 |
> | :--- | ---: | ---: |
> | Retention at issue age 45 | 1,000,000 | 500,000 |
> | Automatic binding limit, ceded | 4,000,000 | 2,000,000 |
>
> The jumbo limit is $\$20{,}000{,}000$ in force and applied for.
>
> > [!answer]-
> > - Standard: the cedant retains $\min(2{,}000{,}000,\ 1{,}000{,}000 - 400{,}000) = \$600{,}000$ and cedes $\$1{,}400{,}000$.
> > - Table 4: it retains $\min(2{,}000{,}000,\ 500{,}000 - 400{,}000) = \$100{,}000$ and cedes $\$1{,}900{,}000$.
> > - Both cessions are within their binding limits of $\$4{,}000{,}000$ and $\$2{,}000{,}000$.
> > - The $\$2{,}400{,}000$ on the life is far below the jumbo limit, so both cessions are automatic.

## Billing and settlement

Premiums, allowances, claims and experience refunds are settled monthly or quarterly on a net basis, as the treaty's offset clause allows. The settlement for a period is

> $$\text{Settlement} = \Pi - A - X$$

- $\Pi$ is the reinsurance premium due for the period.
- $A$ is the allowances the reinsurer pays back.
- $X$ is the claims and other amounts the reinsurer owes.
- A positive settlement is owed to the reinsurer.

Statements are reconciled to the inforce listing, and the reserve credit on the cedant's books must agree with what the reinsurer reports.

> [!example]- What is the net amount due for this quarter, and to whom? {Example}
> On a YRT treaty, a cedant's self-administered statement shows renewal premiums of $\$2{,}400{,}000$ and first-year premiums of $\$300{,}000$, on which the reinsurer allows 100%. Claims recoverable are $\$1{,}850{,}000$. An audit also found a policy that should have been ceded two years ago, with back premiums of $\$45{,}000$.
>
> > [!answer]-
> > - The premium due is $2{,}400{,}000 + 300{,}000 + 45{,}000 = \$2{,}745{,}000$.
> > - The allowance is 100% of the first-year premiums, $\$300{,}000$.
> > - The settlement is $2{,}745{,}000 - 300{,}000 - 1{,}850{,}000 = \$595{,}000$, which the cedant pays the reinsurer.
> > - Under the errors and omissions clause, the missed cession is covered as if it had been reported on time once the back premium is paid, so a claim on that policy would still be recoverable.

## Data quality and audits

Missed cessions, wrong rates or ages, and policies left on the books after they ended are the usual errors. The treaty's errors and omissions clause puts the parties back where they would have been, which may mean back premiums. It restores the intended position and does not let either party keep the benefit of the error. Reinsurers audit cedants' administration and claims under the treaty's access-to-records clause, and modern programs replace periodic files with standardized, more frequent data exchange.

## Managing the program

The cedant's reinsurance function reviews retention limits, keeps an inventory of treaties and their terms, and monitors exposure to each reinsurer. It also judges recapture opportunities and reports the cost and benefit of the program to management, as part of its [[Reinsurance Strategy|reinsurance strategy]].

> [!trap] Applying the retention to the new policy alone
> The retention limit applies to the total the cedant keeps on one life across all its policies. In the example, retaining $\$1{,}000{,}000$ of the new standard policy would put $\$1{,}400{,}000$ on the life, $\$400{,}000$ over the limit.
