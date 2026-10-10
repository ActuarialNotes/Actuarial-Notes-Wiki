---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4fe6178b1efb4a9562490c601ac845647b02144822956abd0cba5f81410234d8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Inforce Reinsurance.md
---

**Inforce Reinsurance** is reinsurance of a block of policies that a ceding company has already issued and holds on its books, put in place under a new agreement after the business was written, rather than ceded automatically as the policies are issued. A cedant uses it to change the economics of business it already owns: to release reserves and capital, to exit a line, to take the block's future profits as cash today, or to hand the risk and administration to a reinsurer that can carry them more cheaply. The usual vehicles are the same [[Reinsurance Transaction|reinsurance forms]] used for new business, applied to a closed block.

> $$\text{Assets transferred} = s\,V_0 - \text{CA}$$

> $$\Delta S_{\text{cedant}} = \text{CA}$$

> $$\text{CA} = \sum_{t \ge 1} \frac{\text{DE}^{R}_t}{(1+h)^{t}}$$

- **Symbols:** $V_0$ is the cedant's statutory [[Reserve|reserve]] on the block at the effective date and $s$ is the share ceded. $\text{CA}$ is the initial ceding allowance, or ceding commission, the reinsurer pays for the block. $\text{DE}^{R}_t$ is the distributable earnings the reinsurer projects on its share in year $t$, after reserve increases and the cost of the capital it must hold, and $h$ is its hurdle rate.
- **Surplus relief:** Under coinsurance the cedant pays an initial premium equal to the ceded reserve and takes a reserve credit of the same amount, so the two cancel. What is left is the ceding allowance, which raises the cedant's statutory surplus by the same amount before tax, and the required capital on the ceded share is released as well.
- **What the allowance prices:** The reinsurer pays up front for profits it expects to earn later, so the allowance is the present value of its projected earnings at its hurdle rate. The cedant gives up those same profits, which it would value at its own discount rate, and the difference is the economic cost of the relief.
- **Coinsurance or modco:** Indemnity coinsurance moves the reserve, the assets and the investment risk, and gives the most relief. [[Reinsurance Transaction|Modified coinsurance]] and funds withheld keep the assets with the cedant, which suits an unauthorized or offshore reinsurer and avoids selling assets at a loss. Because the assets never leave, the cedant's [[Reinsurance Credit Risk|credit risk]] on the reinsurer is limited to the periodic settlements.
- **YRT on inforce:** Ceding the net amount at risk on a [[Reinsurance Transaction|YRT]] basis transfers mortality volatility only. It releases little reserve, so it is chosen when the goal is stable claims, a lower retention or the reinsurer's mortality expertise rather than capital.
- **Recapture and recede:** The cedant recaptures business ceded under older treaties and cedes it again to a new reinsurer on better terms, such as lower YRT rates or a larger allowance. It works only where the old treaty permits recapture, and it resets counterparty and administration arrangements for the whole block.
- **Block acquisition:** The block is sold outright, through assumption reinsurance or a novation that makes the acquirer directly liable to the policyholders, or through indemnity coinsurance that is economically a sale. Assumption needs regulatory approval and often policyholder consent, while indemnity reinsurance leaves the cedant liable if the reinsurer fails.
- **Reasons:** The common reasons are [[Capital|capital]] and reserve relief, exiting a product or market, monetizing the block's [[Embedded Value|embedded value]], reducing unit expenses on a shrinking block, rebalancing retention, and financing an acquisition. The [[Credit for Reinsurance|credit for reinsurance]] rules decide whether any of these gives statutory relief.
- **Disadvantages:** Inforce deals cost the future profits given up, need due diligence on data that may be old or incomplete, and can trigger realized gains or losses when assets move. They also add counterparty risk, and some leave the cedant administering a block it no longer owns the economics of.

> [!example]- Ceding Allowance and Surplus Relief on a Coinsured Term Block {Example}
> A cedant coinsures 80% of a closed term life block with a statutory reserve of \$400 million. The reinsurer projects distributable earnings on its share of \$9, 8, 7, 6, 5, 4, 3, 2 and 1 million at the ends of the next nine years, and prices at a 10% hurdle rate. Find the ceding allowance, the assets the cedant transfers and the surplus relief before tax.
>
> > [!answer]-
> > The allowance is the present value of the reinsurer's earnings at its hurdle rate. The cedant pays the ceded reserve as the initial premium and keeps the allowance.
> > $$
> > \begin{align*}
> > \text{CA} &= \frac{9}{1.10} + \frac{8}{1.10^{2}} + \cdots + \frac{1}{1.10^{9}} \\
> > &= 32.41 \\
> > s\,V_0 &= 0.80 \times 400 \\
> > &= 320.00 \\
> > \text{Assets transferred} &= 320.00 - 32.41 \\
> > &= 287.59
> > \end{align*}
> > $$
> > The reserve falls by \$320 million and the assets by \$287.59 million, so statutory surplus rises by \$32.41 million, the allowance, before tax and before the release of required capital. If assets are transferred at a market value different from their book value, the cedant also books a realized gain or loss.

> [!example]- The Cost of the Relief {Example}
> In the previous example, the cedant would have kept the same nine years of earnings on the ceded share and values them at its own discount rate of 7%. What does the transaction cost it in value?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PV}_{7\%} &= \frac{9}{1.07} + \frac{8}{1.07^{2}} + \cdots + \frac{1}{1.07^{9}} \\
> > &= 35.50 \\
> > \text{Cost} &= 35.50 - 32.41 \\
> > &= 3.09
> > \end{align*}
> > $$
> > The cedant gives up \$3.09 million of value to have \$32.41 million of surplus today. That is worth it when the freed capital earns more elsewhere, for instance in writing new business, than the cost implies, and the comparison is the usual way the deal is judged.

> [!tip]- How it appears on the exam
> - **CP-341:** Written questions give a company's situation, such as a capital shortfall, a product it wants to exit or an acquirer that needs financing, and ask which inforce approach fits and why. The answer weighs coinsurance, modco or funds withheld, YRT, recapture and recede, and a sale.
> - **Calculations:** Numerical parts ask for the ceding allowance from projected earnings, the cedant's surplus relief and the change in its balance sheet. They connect to the financial statement calculations for each [[Reinsurance Transaction|reinsurance form]].

> [!warning]- Exam traps
> - **Relief is the allowance:** The reserve credit and the initial premium cancel under coinsurance. Counting the reserve credit as surplus relief overstates the gain by the whole ceded reserve.
> - **YRT gives little relief:** YRT on an inforce block leaves the reserve with the cedant. Recommending it for capital relief misreads what it transfers.
> - **Indemnity is not a sale:** Under indemnity coinsurance the cedant stays liable to its policyholders. Only assumption reinsurance or a novation removes that liability.
> - **Recapture first:** Recapture and recede depends on the existing treaty's recapture terms. A block whose treaty bars recapture, or allows it only after a waiting period, cannot be moved on demand.
