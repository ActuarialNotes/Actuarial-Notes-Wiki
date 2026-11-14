---
aliases:
  - Investment Policy
  - Plan Investment
  - Retirement Plan Investment
  - IPS
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3efa0264ffe2570ffb945fc84d119449956f2343f81bcf6f2eafcabcf857e28e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Investment Policy Statement.md
---

An **Investment Policy Statement** (IPS) is the written policy under which a [[Pension Plan|pension plan's]] assets are invested. In Canada the pension standards legislation requires a written statement of investment policies and procedures (SIP&P) for a registered plan, and in the U.S. an IPS is the usual way a fiduciary documents a prudent investment process.

An IPS states:

1. The fund's objectives and constraints.
2. The strategic [[Asset Allocation|asset allocation]], with a permitted range around each target weight.
3. The rules for [[Portfolio Rebalancing|rebalancing]].
4. Who decides, monitors and reports on what.

Liability-hedging assets, the hedge ratio and de-risking glide paths are also written into the IPS, which is where [[Asset-Liability Management|asset-liability management]] becomes policy.

## Objectives and constraints

The objectives state the return the plan needs and the risk it can bear. For a [[Defined Benefit Plan|DB plan]], that risk is measured against the liability, not against cash. The constraints are liquidity for benefit payments, the time horizon, legal limits (such as quantitative limits on holdings of one issuer), tax, and anything unique to the plan.

## Strategic asset allocation and ranges

The target mix is the decision that drives most of the fund's risk and return, so the IPS fixes it and gives managers room only within the ranges. The expected return of the policy portfolio is

> $$E[R_A] = \sum_j w_j^{*}\,E[R_j]$$

- $w_j^{*}$ is the policy (target) weight of asset class $j$.
- $E[R_j]$ is the expected return of class $j$.

The actual weight $w_j$ of each class must stay within its range, which is

> $$w_j^{*} - \delta_j \le w_j \le w_j^{*} + \delta_j$$

- $\delta_j$ is the half-width of the range the IPS allows before a rebalancing is required.

Rebalancing rules say how often weights are checked and whether a breach is corrected to the target or to the edge of the range. An IPS that sets ranges but no rebalancing rule leaves the asset mix to drift.

## Interaction with valuation

A going-concern discount rate is often built from the expected return on the policy mix, so changing the IPS changes the [[Going-Concern Valuation|going-concern liability]] and the [[Normal Cost|normal cost]]. A solvency or accounting liability is discounted at market bond yields, so there the IPS changes the volatility of the funded ratio rather than the liability itself.

> [!example]- What is the going-concern liability under the proposed IPS? {Example}
> The actuary sets the going-concern discount rate as the expected return on the policy mix less $0.30\%$ for investment expenses. The illustrative expected returns are $7.0\%$ for equities and $4.0\%$ for bonds. The current IPS holds $60\%$ equities and $40\%$ bonds, and the liability is $\$100{,}000{,}000$ with a duration of 12. The proposed IPS holds $30\%$ equities and $70\%$ bonds.
>
> > [!answer]-
> > - The current expected return is $0.6(7.0\%) + 0.4(4.0\%) = 5.8\%$, a discount rate of $5.5\%$.
> > - The proposed expected return is $0.3(7.0\%) + 0.7(4.0\%) = 4.9\%$, a discount rate of $4.6\%$.
> > - Approximating the liability's sensitivity by its duration, the new liability is $100{,}000{,}000\,(1.055/1.046)^{12} = \$110{,}827{,}950$.
> > - De-risking raises the going-concern liability by about $10.8\%$ and the normal cost with it. In return, the funded ratio moves far less with interest rates.

## Surplus risk

Measured against a market-value liability, the change in surplus as a fraction of the liability is

> $$R_S = \frac{A_0}{L_0}\,R_A - R_L$$

- $R_A$ and $R_L$ are the returns on the assets and on the liability over the period.
- $A_0/L_0$ is the funded ratio at the start of the period.

A plan with $40\%$ in bonds is not $40\%$ hedged. The hedge depends on the bonds' duration relative to the liability's, so short bonds hedge little of a long liability.

> [!example]- What are the surplus return and the new funded ratio under each policy? {Example}
> A plan has assets of $\$90{,}000{,}000$ against a liability of $\$100{,}000{,}000$ measured at market bond yields, with a duration of 14. Bond yields fall $1\%$ and equities fall $5\%$. Use durations to approximate the price changes.
>
> | Policy | Equities | Bonds | Bond duration |
> | :--- | ---: | ---: | ---: |
> | A | 60% | 40% | 6 |
> | B | 30% | 70% | 16 |
>
> > [!answer]-
> > - The liability rises by about $14 \times 1\% = 14\%$, to $\$114{,}000{,}000$.
> > - Under A, $R_A = 0.6(-5\%) + 0.4(6\%) = -0.6\%$ and $R_S = 0.9(-0.6\%) - 14\% = -14.54\%$.
> > - Under B, $R_A = 0.3(-5\%) + 0.7(16\%) = 9.7\%$ and $R_S = 0.9(9.7\%) - 14\% = -5.27\%$.
> > - Under A the assets fall to $\$89{,}460{,}000$ and the funded ratio to $78.5\%$.
> > - Under B the assets rise to $\$98{,}730{,}000$ and the funded ratio falls only to $86.6\%$.
> > - Policy B still loses surplus because it hedges less than the whole liability, but it loses about a third as much.

## Governance and monitoring

The IPS assigns roles to the board or committee, staff, managers, custodian and consultant. It sets each manager's benchmark and mandate, and says how performance is measured and how often the policy is reviewed. It also covers conflicts of interest, the voting of proxies, securities lending and the valuation of assets with no market price.

## Stakeholders and tax

In a DB plan, returns above the assumption lower the [[Plan Sponsor|sponsor's]] contributions and shortfalls raise them. Members bear the risk only if the sponsor fails or benefits can be cut. In a [[Defined Contribution Plan|DC plan]] the members bear all of it, so the IPS governs the menu of options and the default fund.

Pension trusts are generally exempt from income tax. Investments whose appeal is a tax advantage, such as U.S. municipal bonds, give up yield for a benefit the fund cannot use.

> [!trap] Adding equities to reduce the liability
> A mix with a higher expected return lowers a going-concern liability on paper, but it does nothing to reduce surplus volatility. Against a market-value liability, hedging assets are what reduce the risk.
