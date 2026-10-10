---
aliases:
  - Private Equity Backed Reinsurer
  - Private Equity Involvement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:083e731314867987e54b214075b37d2f53477eb42b25c6acbf783c036a3d12d5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Private Equity-Backed Insurer.md
---
A **Private Equity-Backed Insurer** is a life or annuity insurer or reinsurer that is owned, controlled or materially financed by a [[Private Equity|private equity]] firm or alternative asset manager, usually with that manager running its investments. Its business model is a spread business: it gathers long-dated liabilities, mostly fixed and indexed annuities written directly, bought as blocks or assumed through [[Inforce Reinsurance|inforce reinsurance]], and invests the premiums in higher-yielding private credit and structured assets the affiliated manager originates. The profit is the margin between what those assets earn, after defaults and fees, and what the annuities credit.

> $$\text{Spread} = y - d - f - c$$

> $$d = \text{PD} \times \text{LGD}$$

> $$\text{ROE} = \frac{(1-\tau)\times\text{Spread}\times A}{K}$$

- **Symbols:** $y$ is the gross yield on the portfolio, $d$ the expected annual default loss, $f$ the investment management fee and $c$ the rate credited to policyholders, all as percentages of assets $A$. $\text{PD}$ is the annual probability of default and $\text{LGD}$ the loss given default. $K$ is the capital held against the block and $\tau$ the tax rate, and operating expenses are left out of the return for simplicity.
- **The asset engine:** The manager's edge is origination of private credit, asset-backed finance, commercial mortgages and collateralized loan obligations, which pay an illiquidity and complexity premium over public bonds of similar rating. Annuity liabilities with surrender charges are long and fairly predictable, so the insurer can hold assets it cannot sell quickly.
- **Fees and affiliation:** The insurer pays the affiliated manager investment management fees, and often origination or advisory fees on the assets as well. The group earns those fees whether or not the insurance spread holds up, which is why regulators look at whether they are at arm's length.
- **Offshore affiliates:** Many groups cede part of the business to an affiliated [[Offshore Reinsurance|offshore reinsurer]] in Bermuda or the Cayman Islands, sometimes alongside a sidecar funded by outside investors. The offshore regime's reserve basis and investment rules can lower the capital the block needs.
- **What it brings:** Private equity owners have brought new capital to a capital-hungry industry, bought blocks that traditional insurers wanted to exit, and kept annuity crediting rates competitive. They also bring investment origination skills that most insurers lack.
- **Regulator concerns:** U.S. regulators worry about control that is exercised without a holding of 10% or more, and about the fees paid to affiliates. They also cite the concentration in complex, illiquid and privately rated assets, and offshore affiliated reinsurance. A further concern is an ownership horizon shorter than the liabilities, and how the owner would act in a crisis.
- **NAIC response:** The NAIC drew up a list of regulatory considerations that apply to, but are not limited to, private equity-owned insurers, covering control, affiliated fees, complex assets and offshore reinsurance. Its work since includes asset adequacy testing of reinsured asset-intensive business, closer review of private letter ratings and CLO charges, and the principles-based definition of a bond, which narrowed what may be reported as a bond.
- **Bermuda response:** The BMA applies enhanced supervision to PE-owned (re)insurers. It looks at the owner's fitness and governance, affiliated assets and investment management agreements, liquidity, and the use of its scenario-based approach for discount rates.

> [!example]- Spread on a Fixed Annuity Block Under Two Portfolios {Example}
> An insurer holds a \$10 billion fixed annuity block crediting 4.50%. With illustrative figures, a public investment-grade bond portfolio yields 5.40% with expected defaults of 0.15% and a manager's fee of 0.10%. A private credit portfolio yields 6.60% with expected defaults of 0.60% and a fee of 0.40%, paid to an affiliated manager. Capital is 4% of assets for the public portfolio and 5% for the private one, and the tax rate is 21%. Find each spread, its dollar amount and the return on capital.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Spread}_{\text{pub}} &= 5.40 - 0.15 - 0.10 - 4.50 \\
> > &= 0.65\% \\
> > \text{Spread}_{\text{priv}} &= 6.60 - 0.60 - 0.40 - 4.50 \\
> > &= 1.10\% \\
> > \text{ROE}_{\text{pub}} &= \frac{0.79 \times 0.0065 \times 10{,}000}{400} \\
> > &= 12.8\% \\
> > \text{ROE}_{\text{priv}} &= \frac{0.79 \times 0.0110 \times 10{,}000}{500} \\
> > &= 17.4\%
> > \end{align*}
> > $$
> > The spreads are \$65 million and \$110 million a year. The affiliated manager also collects \$40 million of fees, so the group as a whole earns \$150 million on the private portfolio against \$65 million on the public one, whose \$10 million fee goes to an outside manager.

> [!example]- When Defaults Rise {Example}
> In the previous example, a credit downturn raises annual defaults on the private credit portfolio to 2.00% for a year, while the crediting rate and fee stay the same. Find the spread.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Spread}_{\text{priv}} &= 6.60 - 2.00 - 0.40 - 4.50 \\
> > &= -0.30\%
> > \end{align*}
> > $$
> > The block loses \$30 million before tax, and the capital absorbs it, while the affiliated manager still collects its \$40 million fee. The extra yield was payment for exactly this risk, and the illiquidity of the assets means they cannot be sold quickly to meet a wave of surrenders.

> [!tip]- How it appears on the exam
> - **CP-341:** Written questions ask how private equity firms take part in the life and annuity reinsurance market, why the spread model attracts them, and how they use offshore reinsurance. They also ask what concerns the NAIC and the BMA have and how each has responded.
> - **Evaluations:** A case may describe a proposed cession to a PE-backed reinsurer. The candidate evaluates the asset portfolio, the collateral, the fees and the recapture terms from the cedant's side.

> [!warning]- Exam traps
> - **Yield is not spread:** A higher gross yield means little until defaults, fees and the crediting rate are taken off. The comparison in the first example turns on the 0.60% default allowance and the 0.40% fee.
> - **Fees leave the insurer:** Fees paid to an affiliated manager reduce the insurer's spread even though the group keeps them. Policyholders are protected by the insurer's capital, not the group's.
> - **Capital reflects ratings:** Privately rated or structured assets may carry an RBC charge that understates their risk. A capital requirement based on the rating is only as good as the rating.
> - **Not all PE involvement is ownership:** Regulators look at control through investment management agreements, board seats and affiliated reinsurance, not just at who holds the shares.
