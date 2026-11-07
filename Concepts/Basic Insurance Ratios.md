---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6a8115ed6b12cdd2bf5a7f4642c199e21a2b37e54aab076fb3f96278be9a38a6
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.1 (PDF pp.20-23): frequency, severity, pure premium, loss, LAE, UW expense, OER, combined, retention, close ratios, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.7 p.129 (PDF p.148): investment income ratio, overall operating ratio, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), p.115 ROE, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s12-01 break-even combined ratio by line, sha256:7e7830b39c5a0cd17f75dbfeb2f0d2abe4e422df2b92c3f0218097ca48411d3d — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-01-insurance-market-conditions.html"
    - "Indiana Department of Insurance, Complaint Index, page text (0.50 / 1.00 / 2.00 readings), sha256:7c5ebc7e1885751fbdd07590084e1bf3098e41f2bae90ffcb5d33073a0f56914 — https://www.in.gov/idoi/consumer-services/complaint-index/"
    - "American Academy of Actuaries, statement of J. Hurley to House Energy & Commerce (10 Feb 2003), p.3 (operating ratio), sha256:44bcfc849dec23481c2e6a203d0b0da0fd5a29a8f14dabf1797c3dff33078c3c — https://actuary.org/wp-content/uploads/2017/11/medmal_10feb03.4.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Basic Insurance Ratios.md
---

The **Basic Insurance Ratios** are the set of ratios that insurers, regulators, rating agencies and investors rely on to monitor and evaluate the appropriateness of an insurer's rates. Werner & Modlin introduce them together, and the rest of [[Ratemaking|ratemaking]] is largely about projecting them:

| Ratio | Definition |
| --- | --- |
| [[Frequency]] | number of claims / number of exposures |
| [[Severity]] | losses / number of claims |
| [[Pure Premium]] | losses / number of exposures |
| Average premium | premium / number of exposures |
| [[Loss Ratio]] | losses / premium |
| LAE ratio | LAE / losses |
| Underwriting [[Expense Ratio|expense ratio]] | underwriting expenses / premium |
| Operating expense ratio | underwriting expense ratio + LAE / earned premium |
| [[Combined Ratio]] | loss ratio + operating expense ratio |
| Retention ratio | policies renewed / potential renewal policies |
| Close ratio | accepted quotes / quotes |

Each ratio has variants: reported or paid, with or without ALAE, written or earned. Its inputs are always documented. Average premium is computed with the premium and the exposures on the same basis, written, earned or in-force. Adjusted for rate changes, a moving average premium signals a shift in the [[Mix of Business|mix of business]].

> [!example]- A personal lines book has $40{,}000$ earned exposures, $2{,}400$ reported claims, $\$18{,}000{,}000$ of reported losses and $\$28{,}000{,}000$ of earned premium. What are its frequency, severity, pure premium, average premium and loss ratio? {Example}
> - The frequency is $2{,}400/40{,}000 = 6.0\%$.
> - The severity is $18{,}000{,}000/2{,}400 = \$7{,}500$.
> - The pure premium is $0.060 \times 7{,}500 = \$450$ per exposure.
> - The average earned premium is $28{,}000{,}000/40{,}000 = \$700$.
> - The loss ratio is $450/700 = 64.29\%$.

## The LAE ratio

The LAE ratio divides allocated and unallocated loss adjustment expense by losses, not by premium. The loss and LAE ratio is therefore

> $$\text{Loss and LAE Ratio} = \text{Loss Ratio} \times (1 + \text{LAE Ratio})$$

- $\text{Loss Ratio}$ excludes LAE.
- $\text{LAE Ratio}$ is $\text{LAE}/\text{Losses}$.

The loss and LAE ratio is not the sum of the loss ratio and the LAE ratio.

> [!example]- A book's combined ratio is 100% and its underwriting expense ratio is 28%. Its LAE is 12% of losses. What are its loss ratio and its LAE as a share of premium? {Example}
> - The loss and LAE ratio is the combined ratio less the expense ratio, $100\% - 28\% = 72\%$.
> - The loss ratio excluding LAE is $0.72/1.12 = 64.29\%$.
> - The LAE as a share of premium is the loss ratio times the LAE ratio, $0.6429 \times 0.12 = 7.71\%$.

## The combined ratio

The underwriting expense ratio measures expenses incurred at the onset of the policy (commissions, other acquisition, taxes, licenses and fees) against written premium, and expenses incurred throughout the policy (general expenses) against earned premium, then adds them. The operating expense ratio adds LAE to it, and the combined ratio is

> $$\text{Combined Ratio} = \text{Loss Ratio} + \frac{\text{LAE}}{\text{Earned Premium}} + \frac{\text{UW Expenses}}{\text{Written Premium}}$$

- $\text{Loss Ratio}$ excludes LAE, or LAE would be counted twice.
- $\text{UW Expenses}$ are the underwriting expenses.

The combined ratio is a primary measure of the profitability of the book. When general expenses are measured against earned premium, the combined ratio is the loss ratio plus the operating expense ratio.

> [!example]- The book also has $\$2{,}160{,}000$ of LAE, $\$30{,}000{,}000$ of written premium, $\$5{,}400{,}000$ of commissions, other acquisition, taxes, licenses and fees, and $\$1{,}680{,}000$ of general expenses. What are its operating expense ratio and combined ratio? {Example}
> - The underwriting expense ratio is $5.40/30.0 + 1.68/28.0 = 18.0\% + 6.0\% = 24.0\%$.
> - The operating expense ratio adds LAE over earned premium, $24.0\% + 2.16/28.0 = 31.71\%$.
> - The combined ratio is the loss ratio plus the operating expense ratio, $64.29\% + 31.71\% = 96.0\%$.

## Retention and close ratios

Two ratios measure the competitiveness of rates rather than their cost. The rate at which existing insureds renew is

> $$\text{Retention Ratio} = \frac{\text{Policies Renewed}}{\text{Potential Renewal Policies}}$$

- $\text{Potential Renewal Policies}$ are the policies invited to renew, not all policies written.

The close ratio, also called the hit ratio or conversion rate, is the number of accepted new business quotes divided by the number of quotes. Both are watched closely after a [[Rate Change|rate change]].

> [!example]- In a month, 100,000 policies are invited to renew and 85,000 renew. The insurer writes 400,000 policies in all. What is the retention ratio? {Example}
> - The denominator is the policies invited to renew, not the policies written.
> - The retention ratio is $85{,}000/100{,}000 = 85\%$.

## Measuring the insurer as a whole

For the company as a whole, the *investment income ratio* is investment income ÷ earned premium. The operating ratio brings investment income into the combined ratio:

> $$\text{Operating Ratio} = \text{Combined Ratio} - \text{Investment Income Ratio}$$

An operating ratio below 100% means the insurer is profitable after investment income, so a combined ratio above 100% can still leave an operating ratio below it. Return on equity, net income ÷ net worth, measures the return to owners.

An insurer's goals also include meeting customer needs ([[Insurer Goals and Constraints]]). A state *complaint index* divides the insurer's share of the state's complaints in a line by its share of the line's premium. An index of 1.00 means complaints in proportion to its business, and 2.00 twice as many as its share. The index adjusts for the insurer's size, so a large insurer with many complaints can still have an index below 1.00.

> [!example]- With figures in \$ millions, an insurer has earned premium of 500, incurred losses and LAE of 340, underwriting expenses of 150 and investment income of 45. Its net income is 60 and its policyholders' surplus 400. In one state it received 30 of the 1,200 complaints filed in personal auto, where it writes 2% of the premium. What are its combined ratio, operating ratio, return on equity and complaint index? {Example}
> - For simplicity every ratio uses earned premium.
> - The combined ratio is $(340 + 150)/500 = 98\%$.
> - The investment income ratio is $45/500 = 9\%$, so the operating ratio is $98\% - 9\% = 89\%$.
> - The return on equity is $60/400 = 15\%$.
> - The insurer's share of complaints is $30/1{,}200 = 2.5\%$, so its complaint index is $0.025/0.02 = 1.25$.
> - It draws 25% more complaints than its share of the market would suggest.

> [!trap] Adding the LAE ratio to the loss ratio
> The LAE ratio is a share of losses, so it multiplies the loss ratio. On the book above, adding a 12% LAE ratio to the 64.29% loss ratio gives 76.29%, against the correct $0.6429 \times 1.12 = 72.0\%$.
