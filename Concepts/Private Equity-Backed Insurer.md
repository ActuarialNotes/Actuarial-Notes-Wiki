---
aliases:
  - Private Equity Backed Reinsurer
  - Private Equity Involvement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5d8cdaa8236e131995eb053cf11f5a6548fab636a96015c5ad3b927de14f1566
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Private Equity-Backed Insurer.md
---
A **Private Equity-Backed Insurer** is a life or annuity insurer or reinsurer that is owned, controlled or materially financed by a [[Private Equity|private equity]] firm or alternative asset manager, usually with that manager running its investments. It gathers long-dated liabilities, mostly fixed and indexed annuities written directly, bought as blocks or assumed through [[Inforce Reinsurance|inforce reinsurance]], and invests the premiums in higher-yielding private credit and structured assets the affiliated manager originates.

Its profit is a spread. With $y$ the gross yield on the portfolio, $d$ the expected annual default loss, $f$ the investment management fee and $c$ the rate credited to policyholders, all as percentages of assets, the spread is

> $$\text{Spread} = y - d - f - c$$

On assets $A$ backed by capital $K$, the return on capital is

> $$\text{ROE} = \frac{(1-\tau)\times\text{Spread}\times A}{K}$$

- $\tau$ is the tax rate.
- Operating expenses are left out for simplicity.

> [!example]- What are the spread and the return on capital for each of these portfolios? {Example}
> An insurer holds a $\$10$ billion fixed annuity block crediting 4.50%, and the tax rate is 21%. The figures are illustrative:
>
> | Portfolio | Yield | Expected defaults | Fee | Capital, % of assets |
> | :--- | ---: | ---: | ---: | ---: |
> | Public investment grade, outside manager | 5.40% | 0.15% | 0.10% | 4% |
> | Private credit, affiliated manager | 6.60% | 0.60% | 0.40% | 5% |
>
> > [!answer]-
> > - The public spread is $5.40 - 0.15 - 0.10 - 4.50 = 0.65\%$, or $\$65$ million a year.
> > - The private spread is $6.60 - 0.60 - 0.40 - 4.50 = 1.10\%$, or $\$110$ million a year.
> > - Capital is $0.04 \times 10{,}000 = \$400$ million for the public portfolio and $0.05 \times 10{,}000 = \$500$ million for the private one.
> > - The public return on capital is $0.79 \times 65 / 400 = 12.8\%$.
> > - The private return on capital is $0.79 \times 110 / 500 = 17.4\%$.
> > - The affiliated manager also collects $\$40$ million of fees, so the group earns $\$150$ million on the private portfolio against $\$65$ million on the public one, whose $\$10$ million fee goes to an outside manager.

## Defaults and the asset engine

The manager's edge is origination of private credit, asset-backed finance, commercial mortgages and collateralized loan obligations. These pay an illiquidity and complexity premium over public bonds of similar rating. Annuity liabilities with surrender charges are long and fairly predictable, so the insurer can hold assets it cannot sell quickly.

The extra yield pays for default risk. The expected annual default loss is

> $$d = \text{PD} \times \text{LGD}$$

- $\text{PD}$ is the annual probability of default.
- $\text{LGD}$ is the loss given default.

> [!example]- If defaults on the private portfolio above rise to 2.00% for a year, what is its spread? {Example}
> - The yield, fee and crediting rate are unchanged.
> - The spread is $6.60 - 2.00 - 0.40 - 4.50 = -0.30\%$.
> - The block loses $\$30$ million before tax and the capital absorbs it, while the affiliated manager still collects its $\$40$ million fee.
> - The illiquidity of the assets also means they cannot be sold quickly to meet a wave of surrenders.

## Fees and affiliation

The insurer pays the affiliated manager investment management fees, and often origination or advisory fees on the assets as well. The group earns those fees whether or not the insurance spread holds up, which is why regulators look at whether they are at arm's length. Fees reduce the insurer's spread even though the group keeps them, and policyholders are protected by the insurer's capital, not the group's.

## Offshore affiliates

Many groups cede part of the business to an affiliated [[Offshore Reinsurance|offshore reinsurer]] in Bermuda or the Cayman Islands, sometimes alongside a sidecar funded by outside investors. The offshore regime's reserve basis and investment rules can lower the capital the block needs.

## What private equity brings

Private equity owners have brought new capital to a capital-hungry industry, bought blocks that traditional insurers wanted to exit, and kept annuity crediting rates competitive. They also bring investment origination skills that most insurers lack.

## Regulator concerns

U.S. regulators worry about control exercised without a holding of 10% or more, through investment management agreements, board seats and affiliated reinsurance. They also cite the fees paid to affiliates, the concentration in complex, illiquid and privately rated assets, and offshore affiliated reinsurance. Privately rated or structured assets may carry an RBC charge that understates their risk. A further concern is an ownership horizon shorter than the liabilities, and how the owner would act in a crisis.

The NAIC drew up a list of regulatory considerations that apply to, but are not limited to, private equity-owned insurers, covering control, affiliated fees, complex assets and offshore reinsurance. Its work since includes asset adequacy testing of reinsured asset-intensive business, closer review of private letter ratings and CLO charges, and the principles-based definition of a bond, which narrowed what may be reported as a bond.

The BMA applies enhanced supervision to PE-owned (re)insurers. It looks at the owner's fitness and governance, affiliated assets and investment management agreements, liquidity, and the use of its scenario-based approach for discount rates.

> [!trap] Comparing yields instead of spreads
> A higher gross yield means little until defaults, fees and the crediting rate are taken off. The private portfolio above yields 1.20% more than the public one, but its spread is only 0.45% wider once its 0.60% default allowance and 0.40% fee come off.
