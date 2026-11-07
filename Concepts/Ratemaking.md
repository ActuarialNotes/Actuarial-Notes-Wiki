---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:1e079ebe75a660c523af62cc55da986c4f30e7287e9f11e9b81b3afd723bd3cb
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.5-6 (PDF pp.17-18); Ch. 3 p.42 (PDF p.54); Ch. 6 pp.120-121 (PDF pp.132-133); Ch. 8 pp.141-148 (PDF pp.153-160); Ch. 13 p.257 (PDF p.269), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (1988), Parts I-II, pp.1-2, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 p.39 (PDF p.45), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ratemaking.md
---

![[Media/Figures/Ratemaking.svg|340]]

**Ratemaking** is the process of setting the price of insurance, a rate per unit of [[Exposure Base|exposure]], before the costs it must pay are known. Its goal is that, over the period the rates will be in effect, the premium balances the fundamental insurance equation

> $$\text{Premium} = \text{Losses} + \text{LAE} + \text{UW Expenses} + \text{UW Profit}$$

- $\text{Losses}$ and $\text{LAE}$ are the expected losses and [[Loss and Loss Adjustment Expense|loss adjustment expense]] of the policies.
- $\text{UW Expenses}$ are the other expenses of acquiring and servicing the policies, [[Fixed Expenses|fixed]] and [[Variable Expenses|variable]].
- $\text{UW Profit}$ is the target [[Underwriting Profit|underwriting profit]].

Ratemaking is prospective. It uses historical data and actuarial projections to estimate the costs expected while the rates are in effect. Historical costs are used only as information about those future costs, and premium is not set to recoup past losses. [[Loss Reserving|Loss reserving]] is retrospective: it estimates the unpaid cost of claims that have already occurred.

> [!idea] The idea
> The equation has to balance for the book as a whole and for each individual risk, which is why an overall rate level is set first and then divided among risks by [[Classification Ratemaking|classification ratemaking]].

> [!example]- A book's current rates are expected to produce $\$1{,}000{,}000$ of premium. Its expected losses and LAE are $\$680{,}000$ and its underwriting expenses are $\$250{,}000$. What underwriting profit do the rates produce, and do they meet a 5% target? {Example}
> - The underwriting profit is what is left of the premium, $1{,}000{,}000 - 680{,}000 - 250{,}000 = \$70{,}000$.
> - As a share of premium, it is $70{,}000/1{,}000{,}000 = 7\%$.
> - The rates produce more than the 5% target, so on these estimates they are slightly excessive.

## Adjusting historical experience

Historical experience is restated to the conditions expected while the rates are in effect. Werner & Modlin list rate changes, operational changes, inflationary pressures, changes in the [[Mix of Business|mix of business]] and law changes among the items that may require it. In practice, losses are [[Loss Development|developed]] to ultimate and [[Loss Trend|trended]] to the future period, and premium is [[On-Leveling|brought to current rate level]] and trended.

> [!example]- An insurer's losses have been rising with inflation for five years. What happens if its actuary sets the new rates on the untrended historical losses? {Example}
> - The future losses will be higher than the losses of the historical period, because inflation continues.
> - Untrended losses understate the future losses.
> - The premium needed to achieve the target profit is then understated, and the rates are inadequate.

## The overall rate level indication

The [[Overall Rate Level Indication|overall indication]] rearranges the fundamental insurance equation in one of two ways. In the [[Pure Premium Method|pure premium method]], the indicated average rate per exposure is

> $$\text{Indicated Average Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $\text{Pure Premium}$ is the projected [[Pure Premium|pure premium]], losses and LAE per exposure.
- $F$ is the projected fixed expense per exposure.
- $V$ is the variable expense provision, as a share of premium.
- $Q_T$ is the target [[Profit and Contingency Provision|profit provision]], as a share of premium.

The indicated change is the indicated average rate divided by the current average rate, less 1.

> [!example]- The projected pure premium is $\$250$ and fixed expenses are $\$40$ per exposure. Variable expenses are 22% of premium, the target profit provision is 5% and the current average rate is $\$385$. What is the indicated rate change? {Example}
> - The pure premium and fixed expense together are $250 + 40 = \$290$.
> - The share of premium left after variable expenses and profit is $1 - 0.22 - 0.05 = 0.73$.
> - The indicated average rate is $290/0.73 = \$397.26$.
> - The indicated change is $397.26/385 - 1 = +3.2\%$.

In the [[Loss Ratio Method|loss ratio method]], the indicated change is

> $$\text{Indicated Change} = \frac{\text{Loss Ratio} + F\%}{1 - V - Q_T} - 1$$

- $\text{Loss Ratio}$ is the projected [[Loss Ratio|loss and LAE ratio]], with the premium at [[On Level Premium|current rate level]].
- $F\%$ is the projected fixed expense ratio, fixed expenses as a share of premium.

The two methods give the same indication on consistent inputs. The loss ratio method needs current premium, so it is used only for an existing company.

> [!example]- The projected loss and LAE ratio is 65% and the fixed expense ratio is 6.5%. Variable expenses are 25% of premium and the target profit provision is 10%. What is the indicated rate change? {Example}
> - The loss and LAE ratio and the fixed expense ratio together are $0.65 + 0.065 = 0.715$.
> - The share of premium left after variable expenses and profit is $1 - 0.25 - 0.10 = 0.65$.
> - The indicated change is $0.715/0.65 - 1 = +10\%$.

## The principles of ratemaking

The CAS [[Principles of Ratemaking|Statement of Principles]] defines an actuarially sound rate in four principles:

1. A rate is an estimate of the expected value of future costs.
2. A rate provides for all costs associated with the transfer of risk.
3. A rate provides for the costs associated with an individual risk transfer.
4. A rate is reasonable and not excessive, inadequate, or unfairly discriminatory if it is an actuarially sound estimate of the expected value of all future costs associated with an individual risk transfer.

The indicated rate need not be the rate filed. [[Ratemaking Constraints|Regulatory, operational and marketing constraints]] and [[Lifetime Value|customer lifetime value]] shape the selected [[Rate Change|rate change]].

> [!trap] Multiplying by the expense and profit loads
> Variable expenses and profit are shares of the premium, not of the costs, so the costs are divided by $1 - V - Q_T$. Multiplying the $\$290$ of costs by $1 + 0.22 + 0.05$ gives $\$368.30$, which leaves too little for expenses and profit. The indicated average rate is $290/0.73 = \$397.26$.
