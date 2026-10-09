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
  content_hash: sha256:e0c9d919d7574f9c4c227998fbc41c4481020146425439578e8c9c3021d56587
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Investment Policy Statement.md
---
An **Investment Policy Statement** (IPS) is the written policy under which a [[Pension Plan|pension plan's]] assets are invested. It states the fund's objectives and constraints, the strategic [[Asset Allocation|asset allocation]] with a permitted range around each target weight, the rules for [[Portfolio Rebalancing|rebalancing]], and who decides, monitors and reports on what. In Canada the pension standards legislation requires a written statement of investment policies and procedures (SIP&P) for a registered plan, and in the U.S. an IPS is the usual way a fiduciary documents a prudent investment process.

> $$E[R_A] = \sum_j w_j^{*}\,E[R_j]$$

> $$w_j^{*} - \delta_j \le w_j \le w_j^{*} + \delta_j$$

> $$R_S = \frac{A_0}{L_0}\,R_A - R_L$$

- **Symbols:** $w_j^{*}$ is the policy (target) weight of asset class $j$, $E[R_j]$ is its expected return and $E[R_A]$ is the expected return of the policy portfolio. $w_j$ is the actual weight and $\delta_j$ is the half-width of the range the IPS allows before a rebalancing is required. $R_A$ and $R_L$ are the returns on the assets and on the liability over a period, and $A_0/L_0$ is the funded ratio at its start, so $R_S$ is the change in surplus as a fraction of the liability.
- **Objectives and constraints:** The objectives state the return the plan needs and the risk it can bear, which for a [[Defined Benefit Plan|DB plan]] means risk measured against the liability, not against cash. The constraints are liquidity for benefit payments, the time horizon, legal limits (such as quantitative limits on holdings of one issuer), tax, and anything unique to the plan.
- **Strategic asset allocation and ranges:** The target mix is the decision that drives most of the fund's risk and return, so the IPS fixes it and gives managers room only within the ranges. Rebalancing rules say how often weights are checked and whether a breach is corrected to the target or to the edge of the range.
- **Governance and monitoring:** The IPS assigns roles to the board or committee, staff, managers, custodian and consultant, sets each manager's benchmark and mandate, and says how performance is measured and how often the policy is reviewed. It also covers conflicts of interest, the voting of proxies, securities lending and the valuation of assets with no market price.
- **Interaction with valuation:** A going-concern discount rate is often built from the expected return on the policy mix, so changing the IPS changes the [[Going-Concern Valuation|going-concern liability]] and the [[Normal Cost|normal cost]]. A solvency or accounting liability is discounted at market bond yields, so there the IPS changes the volatility of the funded ratio rather than the liability itself.
- **Stakeholders and tax:** In a DB plan, returns above the assumption lower the [[Plan Sponsor|sponsor's]] contributions and shortfalls raise them, while members bear the risk only if the sponsor fails or benefits can be cut. In a [[Defined Contribution Plan|DC plan]] the members bear all of it, so the IPS governs the menu of options and the default fund. Pension trusts are generally exempt from income tax, so investments whose appeal is a tax advantage, such as U.S. municipal bonds, give up yield for a benefit the fund cannot use.
- **Link to risk management:** Liability-hedging assets, the hedge ratio and de-risking glide paths are written into the IPS, which is where [[Asset-Liability Management|asset-liability management]] becomes policy.

> [!example]- Changing the Asset Mix Changes the Going-Concern Liability {Example}
> A plan's actuary sets the going-concern discount rate as the expected return on the policy mix less 0.30% for investment expenses. With illustrative expected returns of 7.0% for equities and 4.0% for bonds, the current IPS holds 60% equities and 40% bonds, and the liability is \$100,000,000 with a duration of 12. The committee proposes a new IPS with 30% equities and 70% bonds. Estimate the liability under the new policy.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[R_A^{\text{old}}] &= 0.6(7.0\%) + 0.4(4.0\%) \\
> > &= 5.8\% \\
> > i^{\text{old}} &= 5.8\% - 0.3\% \\
> > &= 5.5\% \\
> > E[R_A^{\text{new}}] &= 0.3(7.0\%) + 0.7(4.0\%) \\
> > &= 4.9\% \\
> > i^{\text{new}} &= 4.9\% - 0.3\% \\
> > &= 4.6\%
> > \end{align*}
> > $$
> > Approximating the liability's sensitivity by its duration:
> > $$
> > \begin{align*}
> > L^{\text{new}} &\approx 100{,}000{,}000\left(\frac{1.055}{1.046}\right)^{12} \\
> > &= 110{,}827{,}950
> > \end{align*}
> > $$
> > De-risking raises the going-concern liability by about 10.8% and raises the normal cost with it. What the sponsor buys with that cost is a funded ratio that moves far less with interest rates, which the next example measures.

> [!example]- Surplus Risk Under Two Policies {Example}
> The plan in the previous example is 90% funded, with assets of \$90,000,000 against a liability of \$100,000,000 measured at market bond yields with a duration of 14. Under policy A (60% equities, 40% bonds of duration 6) and policy B (30% equities, 70% long bonds of duration 16), find the surplus return and the new funded ratio if bond yields fall 1% and equities fall 5%. Use durations to approximate the price changes.
>
> > [!answer]-
> > The liability rises by about $14 \times 1\% = 14\%$, to \$114,000,000.
> > $$
> > \begin{align*}
> > R_A^{A} &= 0.6(-5\%) + 0.4(+6\%) \\
> > &= -0.6\% \\
> > R_S^{A} &= 0.9(-0.6\%) - 14\% \\
> > &= -14.54\% \\
> > R_A^{B} &= 0.3(-5\%) + 0.7(+16\%) \\
> > &= 9.7\% \\
> > R_S^{B} &= 0.9(9.7\%) - 14\% \\
> > &= -5.27\%
> > \end{align*}
> > $$
> > Under policy A the assets fall to \$89,460,000 and the funded ratio to 78.5%. Under policy B they rise to \$98,730,000 and the funded ratio falls only to 86.6%. Policy B still loses surplus because it hedges less than the whole liability, but it loses about a third as much.

> [!tip]- How it appears on the exam
> - **RET-101:** Written answers assess the investment vehicles and policies a plan uses and their effects, including tax effects, on the sponsor, the members and other stakeholders. For a DC plan the question is about the investment options, the default fund and who bears the risk.
> - **RET-201:** Candidates evaluate how plan investments interact with valuation methods and assumptions, such as a discount rate tied to the asset mix or a smoothed asset value, and advise the sponsor on mitigating investment risk. Questions often give a liability profile and two candidate asset mixes and ask for the surplus effect of a market move and a recommendation.

> [!warning]- Exam traps
> - **Expected return is not the liability hedge:** A mix with a higher expected return lowers a going-concern liability on paper, but it does nothing to reduce surplus volatility. A recommendation to add equities "to reduce the liability" confuses the two measures.
> - **Asset weights are not hedge ratios:** A plan with 40% in bonds is not 40% hedged. The hedge depends on the bonds' duration relative to the liability's, so short bonds hedge little of a long liability.
> - **Surplus return uses the funded ratio:** For an underfunded plan the asset return is weighted by $A_0/L_0$ before the liability return is subtracted. Subtracting $R_L$ from $R_A$ directly overstates the surplus result of an underfunded plan.
> - **Tax-exempt investors:** Recommending a tax-advantaged investment for a pension trust is a common error, because the trust pays no income tax and so gives up yield for nothing.
> - **Ranges need rules:** An IPS that sets ranges but says nothing about when and how far to rebalance leaves the asset mix to drift. A written answer on governance should name the review frequency and the rebalancing rule.
