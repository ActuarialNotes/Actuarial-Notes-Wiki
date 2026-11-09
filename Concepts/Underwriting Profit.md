---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:60b7a309a5e5e58084ed11d63af08ba544180a6ebf6ecc368d08832018c8b2c7
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.125, 138 (PDF pp.137, 150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.10 (PDF p.22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 p.144 (PDF p.156), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 p.43 (PDF p.55), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Profit.md
---

![[Media/Figures/Underwriting_Profit.svg|340]]

**Underwriting Profit** is the income from the insurance operation alone: earned premium less incurred losses, LAE and underwriting expenses, before any credit for investment income. It is the sum of the profits of the individual policies, and it is

> $$\text{UW Profit} = \text{Earned Premium} - \text{Losses} - \text{LAE} - \text{UW Expenses}$$

- $\text{UW Expenses}$ are the [[Fixed Expenses|fixed]] and [[Variable Expenses|variable]] underwriting expenses.

Read the other way round, the equation is the fundamental insurance equation: premium equals losses, LAE, underwriting expenses and underwriting profit. A target profit without a rate change therefore needs lower expenses or lower losses. The actual profit of a policy is not known when it is sold, because its losses and its settlement and servicing costs are not yet known.

> [!example]- An insurer earns $\$10{,}000{,}000$ of premium, with incurred losses and LAE of $\$6{,}800{,}000$ and underwriting expenses of $\$3{,}000{,}000$. What are its underwriting profit and its combined ratio? {Example}
> - The underwriting profit is the premium less $\$9{,}800{,}000$ of costs, or $\$200{,}000$.
> - As a share of premium, the underwriting profit margin is $200{,}000/10{,}000{,}000 = 2.0\%$.
> - The combined ratio is $68.0\% + 30.0\% = 98.0\%$, and $1 - 0.98 = 2.0\%$ is the same margin.

## Underwriting profit by class

Where each class of risks is charged a rate and has a true expected cost, the expected underwriting profit, with no expenses or profit provision in the rates, is

> $$\text{UW Profit} = \sum_{i} \text{Exposures}_i \times (\text{Rate}_i - \text{Expected Cost}_i)$$

- $i$ runs over the classes.
- $\text{Exposures}_i$ is the number of insureds in class $i$.
- $\text{Rate}_i$ is the rate charged to class $i$ and $\text{Expected Cost}_i$ its true expected cost.

The calculation holds the number of insureds fixed. When rates change, price-sensitive insureds leave or arrive, so the profit actually earned can differ from it.

> [!example]- An insurer charges every risk $\$1{,}000$. It has 600 low-risk insureds with an expected cost of $\$800$ and 400 high-risk insureds with an expected cost of $\$1{,}300$. What is its expected underwriting profit? {Example}
> - The low-risk class contributes $600 \times (1{,}000 - 800) = \$120{,}000$.
> - The high-risk class contributes $400 \times (1{,}000 - 1{,}300) = -\$120{,}000$.
> - The expected underwriting profit is $\$0$, with the low-risk class subsidizing the high-risk class.

## Underwriting profit and total profit

The total profit of an insurer is underwriting profit plus [[Investment Income|investment income]]. An insurer holds policyholder-supplied funds, the [[Unearned Premium|unearned premium]] and the loss reserves, between collecting premium and paying claims, and the investment income on those funds is a real part of the return. Investment income also includes income on the company's own capital, although whether that income belongs in ratemaking is a matter of substantial disagreement.

A combined ratio above $100\%$ is therefore not automatically a loss. In long-tailed lines, such as personal auto bodily injury and workers compensation, years may pass between the premium and the settlement of all claims. Their investment income can be large enough to accept an underwriting loss and still achieve the target total return. In short-tailed lines, such as auto collision and homeowners, the investment income is small and underwriting profit is a larger part of the return. The target [[Profit and Contingency Provision|underwriting profit provision]] $Q_T$ is set with this in mind.

> [!example]- A workers compensation book runs a $103\%$ combined ratio, and its loss reserves earn investment income of $8\%$ of premium. Is it profitable? {Example}
> - The underwriting result is a loss of $3\%$ of premium.
> - The investment income on the policyholder-supplied funds is $8\%$ of premium.
> - The total profit is $8\% - 3\% = 5\%$ of premium, so the book is profitable despite the underwriting loss.

## Underwriting profit with reinsurance

With [[Reinsurance|reinsurance]], each term of the underwriting profit is taken net. Premium is net of ceded premium, losses are net of expected reinsurance recoveries, and expenses are net of any ceding commission. Equivalently, the net underwriting profit is the gross underwriting profit less the net cost of the reinsurance.
