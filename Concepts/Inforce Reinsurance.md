---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2032bc2039dfd9f79cdef25fb3274627beedccf7451ca57c3d2632308f67604d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Inforce Reinsurance.md
---
**Inforce Reinsurance** is reinsurance of a block of policies that a ceding company has already issued, put in place under a new agreement after the business was written rather than ceded automatically as the policies are issued. The usual vehicles are the same [[Reinsurance Transaction|reinsurance forms]] used for new business, applied to a closed block.

A cedant uses it to change the economics of business it already owns. The common reasons are:

1. [[Capital]] and reserve relief.
2. Exiting a product or market.
3. Monetizing the block's [[Embedded Value|embedded value]], taking its future profits as cash today.
4. Reducing unit expenses on a shrinking block, or handing the risk and administration to a reinsurer that can carry them more cheaply.
5. Rebalancing retention.
6. Financing an acquisition.

The [[Credit for Reinsurance|credit for reinsurance]] rules decide whether any of these gives statutory relief.

## Coinsurance

Under coinsurance the reinsurer pays the cedant an initial ceding allowance, or ceding commission, for the block. The reinsurer pays up front for profits it expects to earn later, so the allowance is the present value of its projected earnings at its hurdle rate $h$:

> $$\text{CA} = \sum_{t \ge 1} \frac{\text{DE}^{R}_t}{(1+h)^{t}}$$

- $\text{DE}^{R}_t$ is the distributable earnings the reinsurer projects on its share in year $t$, after reserve increases and the cost of the capital it must hold.

The cedant pays an initial premium equal to the ceded reserve and takes a reserve credit of the same amount, so the two cancel. When it cedes a share $s$ of a block whose statutory [[Reserve|reserve]] at the effective date is $V_0$, the assets it transfers are

> $$\text{Assets transferred} = s\,V_0 - \text{CA}$$

What is left is the allowance, so the cedant's statutory surplus rises before tax by

> $$\Delta S_{\text{cedant}} = \text{CA}$$

The required capital on the ceded share is released as well. If assets are transferred at a market value different from their book value, the cedant also books a realized gain or loss.

> [!example]- What are the ceding allowance, the assets transferred and the surplus relief on this coinsured block? {Example}
> A cedant coinsures 80% of a closed term life block with a statutory reserve of $\$400$ million. The reinsurer projects distributable earnings on its share of $\$9$, 8, 7, 6, 5, 4, 3, 2 and 1 million at the ends of the next nine years, and prices at a 10% hurdle rate.
>
> > [!answer]-
> > - The allowance is the present value of the earnings at 10%, $9/1.10 + 8/1.10^{2} + \cdots + 1/1.10^{9} = \$32.41$ million.
> > - The ceded reserve is $0.80 \times 400 = \$320$ million, which the cedant pays as the initial premium.
> > - The assets transferred are $320 - 32.41 = \$287.59$ million.
> > - The reserve falls by $\$320$ million and the assets by $\$287.59$ million, so statutory surplus rises by $\$32.41$ million before tax and before the release of required capital.

## The cost of the relief

The cedant gives up the same profits the reinsurer buys, and values them at its own discount rate. The difference between that value and the allowance is the economic cost of the relief. The deal is worth it when the freed capital earns more elsewhere, for instance in writing new business, than this cost implies.

> [!example]- If the cedant above values the ceded earnings at 7%, what does the transaction cost it in value? {Example}
> - At 7% the nine years of earnings are worth $9/1.07 + 8/1.07^{2} + \cdots + 1/1.07^{9} = \$35.50$ million.
> - The allowance is $\$32.41$ million.
> - The cedant gives up $35.50 - 32.41 = \$3.09$ million of value to have $\$32.41$ million of surplus today.

## Other approaches

| Approach | What it does | Advantage | Disadvantage |
| :--- | :--- | :--- | :--- |
| Indemnity coinsurance | Moves the reserve, the assets and the investment risk | The most relief | Assets move, which can realize gains or losses |
| Modified coinsurance or funds withheld | Keeps the assets with the cedant | Suits an unauthorized or offshore reinsurer and avoids selling assets at a loss | Less relief than coinsurance |
| YRT on the net amount at risk | Transfers mortality volatility only | Stable claims, a lower retention or the reinsurer's mortality expertise | Releases little reserve |
| Recapture and recede | Takes back business ceded under older treaties and cedes it again on better terms, such as lower YRT rates or a larger allowance | Better terms on the existing block | Works only where the old treaty permits recapture, and resets counterparty and administration arrangements |
| Block acquisition | Sells the block outright | Assumption reinsurance or a novation makes the acquirer directly liable to the policyholders | Assumption needs regulatory approval and often policyholder consent |

Under modco and funds withheld the assets never leave, so the cedant's [[Reinsurance Credit Risk|credit risk]] on the reinsurer is limited to the periodic settlements. A block can also be sold through indemnity coinsurance that is economically a sale, but the cedant then stays liable to its policyholders if the reinsurer fails. Only assumption reinsurance or a novation removes that liability.

All inforce deals cost the future profits given up and need due diligence on data that may be old or incomplete. They also add counterparty risk, and some leave the cedant administering a block whose economics it no longer owns.

> [!trap] Counting the reserve credit as surplus relief
> Under coinsurance the reserve credit and the initial premium cancel, and the relief is the ceding allowance. Counting the reserve credit as relief overstates the gain by the whole ceded reserve, $\$320$ million in the example.
