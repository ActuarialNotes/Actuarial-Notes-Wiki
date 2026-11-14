---
aliases:
  - Inforce
  - Active In-Force
  - Fundamental Strategy
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:758a41277e6f146b3a152af8c84861ff5cf6a93a5300c8e13bb8825816b38e81
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/In-Force Management.md
---
**In-Force Management** is the active management of a block of life insurance or annuity policies after they are sold, to protect and add to the value it holds for the insurer. The block's value is its value of [[In-Force|in-force]] in the [[Embedded Value|embedded value]].

The fundamental strategies change that value through:

1. Non-guaranteed elements.
2. Offers made to policyholders.
3. [[Reinsurance Transaction|Reinsurance]] and capital.
4. Expenses and administration.
5. An understanding of how policyholders behave.

Each action is judged by the value it adds after its cost, and against the policyholders' reasonable expectations and the contract terms. The value an action adds is

> $$\Delta V = \text{VIF}_{\text{after}} - \text{VIF}_{\text{before}} - C$$

- $\text{VIF}_{\text{before}}$ and $\text{VIF}_{\text{after}}$ are the value of the in-force block without and with the action.
- $C$ is the one-time cost of the action, such as a campaign, a system conversion or a reinsurance fee.

The before and after values use the same assumptions and risk discount rate, apart from what the action changes. Changing the basis at the same time mixes an assumption change into the value of the action.

Fundamental strategies are documented in an in-force management framework that sets the value measure, the approval process and the policyholder-fairness checks. The aim is to manage the block deliberately rather than leave it to run off on its pricing assumptions.

## Non-guaranteed elements

Many products let the insurer change cost of insurance charges, crediting rates, expense charges or [[Policyholder Dividend|policyholder dividends]] within the guarantees. A change must follow the contract, the company's own determination policy and the regulator's rules. It is justified by a change in the anticipated experience, not by a wish to recoup past losses.

Lowering a crediting rate raises the spread but can raise [[Lapse|lapses]], so the change is tested with a dynamic lapse assumption. The policyholders who stay after a charge is raised or a rate is cut are often the less healthy or those whose guarantees are most valuable, and the value of the action includes that shift.

## Offers to policyholders

A conversion offer or buyback gives policyholders a reason to exchange or surrender a costly benefit, such as a [[Guaranteed Minimum Withdrawal Benefit|guaranteed withdrawal benefit]] or a high guaranteed rate. Acceptance is voluntary, so the policyholders who accept are the ones for whom the benefit is worth least. The value an offer adds is

> $$\Delta V_{\text{offer}} = n_{\text{acc}}\left(\bar{L}_{\text{acc}} - O\right) - C$$

- $n_{\text{acc}}$ is the number of policyholders expected to accept.
- $\bar{L}_{\text{acc}}$ is the average value to the insurer of the liability each of them gives up.
- $O$ is the amount offered for it.

> [!example]- What value does this buyout offer add? {Example}
> A block of 10,000 variable annuities carries a guaranteed withdrawal benefit. On the company's economic basis, the liability per policy, including the guarantee, averages $\$118{,}000$. The company offers each policyholder $\$106{,}000$ to surrender, and it expects 25% to accept. Policyholders whose guarantee is deep in the money tend to keep it, so the liability of those who accept is expected to average only $\$112{,}000$. The campaign costs $\$400{,}000$.
>
> > [!answer]-
> > - The number who accept is $n_{\text{acc}} = 0.25 \times 10{,}000 = 2{,}500$.
> > - The offer adds $2{,}500 \times (112{,}000 - 106{,}000) - 400{,}000 = \$14{,}600{,}000$.
> > - It also releases the capital and hedging cost of the surrendered guarantees.
> > - An offer above $\$112{,}000$ would destroy value, even though it is still below the average liability.

> [!trap] Pricing an offer on the block average
> Policyholders accept an offer when it is good for them. Valuing the buyout above on the block average of $\$118{,}000$ gives $\$29.6$ million, twice the realistic figure. Price an offer on the liability of those expected to accept.

## Reinsurance and capital

New reinsurance, the recapture of an old treaty, or the sale of a closed block can release capital, transfer a risk the company no longer wants, or move the block to a company that can run it more cheaply. The value comes through lower required capital or lower risk, and it is set against the reinsurer's margin.

## Expenses and administration

Unit costs rise as a closed block shrinks, because the fixed costs of systems and staff are spread over fewer policies. Consolidating administration systems, outsourcing to a third-party administrator and cleaning up policy data lower the maintenance expense per policy for the rest of the block's life.

> [!example]- Is this administration conversion worth doing? {Example}
> A closed block of 50,000 policies has a maintenance expense of $\$80$ per policy per year. Moving it to a new administration platform costs $\$3{,}000{,}000$ now and lowers the expense to $\$65$. At the risk discount rate, with the block's mortality and lapses, the present value of 1 a year per policy now in force is an illustrative 6.2.
>
> > [!answer]-
> > - The present value of the savings is $50{,}000 \times (80 - 65) \times 6.2 = \$4{,}650{,}000$.
> > - The conversion adds $4{,}650{,}000 - 3{,}000{,}000 = \$1{,}650{,}000$, so it is worth doing.
> > - It breaks even at an annuity factor of $3{,}000{,}000 / (50{,}000 \times 15) = 4.0$, so it fails if the block runs off much faster than assumed.

Delaying a conversion shrinks the annuity factor, which is why such conversions are worth most early in a block's run-off.

## Policyholder behaviour analytics

[[Predictive Analytics|Predictive models]] of lapse, premium payment, conversion and option use, fitted to [[Experience Study|experience studies]], identify which policyholders are likely to act and why. They let the company target retention campaigns at profitable policies at risk of lapsing, and they refine the assumptions behind every other action.
