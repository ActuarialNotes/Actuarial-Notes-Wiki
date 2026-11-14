---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7fd681aa0d1fd1df366ad9ef91d253c999619371b99446a4e351f2a6b0c14386
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Accounting.md
---

**Insurance Accounting** is the accounting a [[Reinsurance|reinsurance]] contract receives when it genuinely indemnifies the cedant against insurance risk, also called *reinsurance accounting*. Ceded premium reduces written and earned premium, ceded losses reduce losses incurred, and the cedant takes credit for the recoverable.

Under statutory accounting (SSAP No. 62R) and [[GAAP]] (ASC 944-20), a reinsurance contract qualifies only if both conditions hold:

1. **Significant insurance risk is assumed.** This means both underwriting risk (amount) and timing risk: the reinsurer's payments must depend on, and vary directly with, the cedant's claim payments. Any feature that can delay timely reimbursement, such as a payment schedule or a retention accumulating over several years, fails this condition outright.
2. **A significant loss to the reinsurer is reasonably possible.** The present value of all cash flows between the parties, in each outcome that is more than remote, is compared with the present value of the gross premium.

A contract that fails either condition receives [[Deposit Accounting|deposit accounting]].

The second test uses one constant, reasonable interest rate in every scenario. Reinsurer expenses, brokerage and taxes are excluded from the cash flows. Experience refunds, [[Loss Corridors|loss corridors]], caps, cancellation terms and any side agreement are included.

If the reinsurer assumes substantially all the insurance risk on the reinsured portion, as in a straight [[Quota Share|quota share]] with no risk-limiting features, the second condition need not be met. An inherently profitable book can therefore still be reinsured.

## Heuristics for a reasonably possible significant loss

Neither standard sets a number, so practice supplies two rules of thumb for judging the second condition. The **10-10 rule** asks for at least a $10\%$ chance of a loss of at least $10\%$ of premium. The **expected reinsurer deficit** (ERD) is

> $$\text{ERD} = \frac{E\left[\max(\text{PV payments} - \text{PV premium},\ 0)\right]}{\text{PV premium}}$$

- $\text{PV payments}$ is the present value of the reinsurer's payments to the cedant in an outcome.
- $\text{PV premium}$ is the present value of the premium.

The ERD is the probability of a present-value loss times its average severity, as a share of premium. It is conventionally passed at $\text{ERD} \geq 1\%$, to match the 10-10 rule.

> [!example]- Does this contract pass the 10-10 rule and the ERD benchmark? {Example}
> A reinsurer receives premium with present value $\$10$M. The modelled present values of its payments to the cedant, at one constant risk-free rate, are:
>
> | Probability | PV payments |
> | ---: | ---: |
> | $60\%$ | $\$4$M |
> | $25\%$ | $\$9$M |
> | $10\%$ | $\$12$M |
> | $5\%$ | $\$16$M |
>
> > [!answer]-
> > - The reinsurer's present-value result (premium less payments) is $+6$, $+1$, $-2$ and $-6$.
> > - A loss occurs with probability $10\% + 5\% = 15\%$, and each losing outcome loses $20\%$ or $60\%$ of premium, so the 10-10 rule is passed.
> > - The ERD is $(0.10 \times 2 + 0.05 \times 6)/10 = 0.50/10 = 5\%$, well above $1\%$.
> > - Both heuristics support a reasonably possible significant loss, so with the first condition also met the contract receives reinsurance accounting.

## Deposit accounting for a contract that fails

A contract that fails risk transfer is a deposit. The cedant records no ceded premium and no ceded losses, and takes no reduction of its loss and LAE reserves for expected recoveries.

> [!example]- Does the contract still pass when a loss corridor is added? {Example}
> The contract above is amended so that the cedant retains ceded losses between $\$8$M and $\$14$M. For simplicity the corridor is applied to present values, although a real test applies it to nominal losses before discounting. The reinsurer pays the first $\$8$M and anything above $\$14$M, and the premium is unchanged.
>
> > [!answer]-
> > - The reinsurer pays $\min(L, 8) + \max(L - 14, 0)$, which is $4$, $8$, $8$ and $10$ for losses $L$ of $4$, $9$, $12$ and $16$.
> > - Its results become $+6$, $+2$, $+2$ and $0$, so it loses money in no outcome.
> > - The ERD is $0$ and the 10-10 rule fails, because the corridor hands back to the cedant exactly the band in which the reinsurer would have lost.
> > - The substantially-all exception is unavailable, because the cedant retains the corridor.
> > - The contract is a deposit: no ceded premium, no ceded losses, and no reduction of net reserves.

## Documentation and classification

Contracts whose risk transfer is not reasonably self-evident need documented analysis, and the CEO and CFO attest annually that no undisclosed side agreements exist. Actuaries usually do the testing. [[Freihaut and Vendetti]] catalogue the common pitfalls, and [[Finite Reinsurance]] is where the test is hardest to pass. See also [[Risk Transfer]].

A contract that passes is then classified as prospective or retroactive. A retroactive cover, such as a loss portfolio transfer or an adverse development cover, gets special treatment: a restricted special-surplus gain under statutory accounting and a deferred gain under GAAP.

> [!trap] A loss corridor can remove the risk
> A corridor, cap or experience refund is part of the cash flows tested. A contract that passes on its own can fail once the corridor takes back the outcomes in which the reinsurer would have lost.
