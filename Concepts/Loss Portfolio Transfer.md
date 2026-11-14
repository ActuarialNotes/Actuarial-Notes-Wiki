---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a264ebd8b2570625ac6468b820533d352209eff5c8839558a34fa5fdd79efa2b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Portfolio Transfer.md
---
A **Loss Portfolio Transfer** (LPT) is a form of [[Finite Reinsurance|finite risk reinsurance]] that transfers from the ceding company to a reinsurer, at a specified accounting date, all or a portion of the liability for future payments on losses already incurred. The premium is set with the time value of money considered, so it is less than the ultimate amount expected to be paid. The change in the cedant's statutory surplus is

> $$\Delta\,\text{Surplus} = R - P$$

- $R$ is the reserve the ceding company had carried for the transferred losses.
- $P$ is the premium paid to the reinsurer.

In the examples below, $P$ is the [[Present Value|present value]] of the expected payments plus a margin for the reinsurer.

> [!example]- What is the LPT premium, and how much does the cedant's statutory surplus change? {Example}
> An insurer leaving a workers' compensation book carries undiscounted reserves of 100 (millions) for it. Expected payments are 40, 30, 20 and 10 at the end of each of the next four years. A reinsurer quotes an LPT premium equal to the present value of those payments at $5\%$ plus a margin of 2.
>
> > [!answer]-
> > - The present value of the payments is $\dfrac{40}{1.05} + \dfrac{30}{1.05^2} + \dfrac{20}{1.05^3} + \dfrac{10}{1.05^4}$.
> > - That is $38.095 + 27.211 + 17.277 + 8.227 = 90.810$.
> > - The premium is $P = 90.810 + 2 = 92.81$.
> > - The change in surplus is $100 - 92.81 = 7.19$.
> > - The cedant pays 92.81 to be rid of a reserve it carried at 100, and it no longer carries the uncertainty in those reserves. The premium is below the 100 expected to be paid because the reinsurer will earn investment income while it pays the claims.

## Uses

Insurers hold large reserves for payments on past policies, and at times want relief from the uncertainty in those reserves and from the capital held for them. An insurer withdrawing from a line, such as workers' compensation in one state, can use an LPT to meet its obligations without continuing to manage the claims ([[Reserving for Reinsurance (Friedland - 2022)|Friedland]], quoting IRMI). LPTs are typical in long-tail lines such as medical malpractice, asbestos and pollution liability, where reporting is delayed and settlement takes years.

## Timing risk and the aggregate limit

Timing is the main element of risk. If claims settle earlier than expected, the reinsurer earns less investment income than it priced for and can lose money even when total losses are as expected. The ultimate total nominal losses are usually limited by the contract, so development beyond that limit stays with the ceding company.

> [!example]- What is the reinsurer's result in present-value terms if the losses are paid faster, or develop adversely? {Example}
> The reinsurer writes the LPT above for a premium of 92.81, invests at $5\%$, and caps its total nominal payments at 120. In case (a) the same 100 is paid faster, as 70, 20 and 10 over three years. In case (b) losses develop adversely to 50, 40, 30 and 20 over four years.
>
> > [!answer]-
> > - In (a), the present value of the payments is $\dfrac{70}{1.05} + \dfrac{20}{1.05^2} + \dfrac{10}{1.05^3} = 66.667 + 18.141 + 8.638 = 93.446$.
> > - The result is $92.81 - 93.446 = -0.64$. Nominal losses came in exactly as expected, but earlier, so the investment income the premium relied on was not earned.
> > - In (b), nominal losses total 140. The reinsurer's payments reach the limit of 120 after year 3, so it pays 50, 40 and 30, and the final 20 stays with the ceding company.
> > - The present value of its payments is $\dfrac{50}{1.05} + \dfrac{40}{1.05^2} + \dfrac{30}{1.05^3} = 47.619 + 36.281 + 25.915 = 109.815$.
> > - The result is $92.81 - 109.815 = -17.0$. The limit keeps the reinsurer's assumption of risk finite, and the cedant keeps the nominal development above it.

## Reserving

The liability, and the payments, move to the reinsurer. A large reinsurer may segment aggregate stop-loss and finite risk covers apart from its other business, and Patrik's segmentation list names the LPT as a type of cover of its own ([[Reinsurance Reserving|reinsurance reserving]]). An [[Adverse Development Cover|adverse development cover]], by contrast, leaves the reserves with the cedant. In a [[Commutations|commutation]], a reinsurer pays the present value of its obligations to end a contract.
