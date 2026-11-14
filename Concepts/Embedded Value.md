---
aliases:
  - New Business
  - Insurance Enterprise
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:45667ed96a7f585337c51f04fb180e7481e343fbb95a0fa3c14142932e32ec42
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Embedded Value.md
---
**Embedded Value** (EV) is a measure of the value to shareholders of a life insurer's existing business: the net assets already held for them, plus the present value of the profits expected to emerge from the policies [[In-Force|in force]], less the cost of the capital those policies tie up and of the options and guarantees they contain. It ignores the value of business not yet written, which is a separate item in an appraisal value.

The embedded value is

> $$\text{EV} = \text{ANAV} + \text{VIF}$$

- $\text{ANAV}$ is the adjusted net asset value, the shareholders' statutory capital and surplus with adjustments such as removing intangible assets.
- $\text{VIF}$ is the value of in-force.

The adjusted net asset value splits into two parts:

> $$\text{ANAV} = \text{FS} + \text{RC}$$

- $\text{FS}$ is the free surplus.
- $\text{RC}$ is the required capital, what the regulator or the company's own target requires to be held for the in-force business. It is counted in ANAV at its face value.

The value of in-force is

> $$\text{VIF} = \text{PVFP} - \text{CoC} - \text{TVOG}$$

- $\text{PVFP}$ is the present value, at the risk discount rate $r$, of the after-tax statutory profits the in-force business is projected to release.
- $\text{CoC}$ is the cost of capital.
- $\text{TVOG}$ is the time value of options and guarantees.

A higher risk discount rate lowers the PVFP and raises the CoC, so EV falls on both counts.

## Cost of capital

Required capital is locked in until the business runs off, and it earns only $j$ while the shareholders want $r > j$. The [[Cost of Capital|cost of capital]] is the required capital today less the present value of its future release with its earnings, which is the shortfall of that return below $r$:

> $$\text{CoC} = \text{RC}_0 - \sum_{t \ge 1} \frac{\text{RC}_{t-1}(1 + j) - \text{RC}_t}{(1+r)^t}$$

- $\text{RC}_t$ is the required capital held at the end of year $t$.
- $j$ is the after-tax return earned on the required capital while it is held.

Profits less the increase in required capital, plus the earnings on that capital, are the distributable earnings, the amounts that can be paid to shareholders. Discounting them at $r$, after the initial capital strain, gives the same answer as PVFP less CoC, which is why a VNB is often computed directly from a distributable earnings [[Profit Signature|profit signature]].

> [!example]- What is the embedded value of this run-off block? {Example}
> A block of in-force business is projected to release after-tax statutory profits of 50, 45 and 40 at the ends of the next three years. It earns 3% after tax on its required capital, which runs off as follows:
>
> | End of year | 0 | 1 | 2 | 3 |
> | --- | ---: | ---: | ---: | ---: |
> | Required capital | 100 | 70 | 35 | 0 |
>
> The company also holds free surplus of 40, the TVOG is 5, and the risk discount rate is 9%.
>
> > [!answer]-
> > - The PVFP is $50/1.09 + 45/1.09^2 + 40/1.09^3 = 114.63$.
> > - Each year's release of required capital with its earnings is $\text{RC}_{t-1}(1.03) - \text{RC}_t$, which gives 33, 37.10 and 36.05.
> > - Their present value at 9% is 89.34, so the CoC is $100 - 89.34 = 10.66$.
> > - The VIF is $114.63 - 10.66 - 5 = 98.97$.
> > - The EV is $(40 + 100) + 98.97 = 238.97$.
> > - The distributable earnings $83$, $82.10$ and $76.05$ have a present value of 203.97 at 9%, and adding the free surplus of 40 and deducting the TVOG of 5 gives the same 238.97.

## Time value of options and guarantees

A deterministic projection on best-estimate assumptions misses the cost of options and guarantees that pay off only in bad scenarios, such as a guaranteed crediting rate or a guaranteed minimum benefit on a variable annuity. The TVOG is the extra cost found by valuing them stochastically, as the average over many scenarios less the cost in the central scenario.

## Value of new business

The **value of new business** (VNB) is the PVFP of the policies sold in a period, measured at the point of sale, less their cost of capital and TVOG. It includes the acquisition expenses and the initial strain. EV says what the insurance enterprise is worth today, and VNB says how much value each year's sales add to it. The new business margin is

> $$\text{Margin} = \frac{\text{VNB}}{\text{PVNBP}}$$

- $\text{PVNBP}$ is the present value of new business premiums.

Alongside the [[Internal Rate of Return|internal rate of return]], the [[Profit Margin|profit margin]] and the [[Return on Capital|return on equity]], VNB is one of the profit metrics a [[Profit Testing|profit test]] reports. The VNB is the value added in money, the margin is the value per unit of premium, which compares products of different sizes, and the IRR is the return on the capital strain.

> [!example]- What are the VNB, the new business margin and the IRR of this year's sales? {Example}
> A year's sales of a product produce distributable earnings of $-120$ at issue, from acquisition costs and the capital set up, and then 32, 34, 36, 38 and 40 at the ends of years 1 to 5. The present value of new business premiums is 1,000, and the risk discount rate is 10%. Ignore TVOG.
>
> > [!answer]-
> > - Discounted at 10%, the earnings of years 1 to 5 are 29.09, 28.10, 27.05, 25.95 and 24.84.
> > - The VNB is $-120 + 135.03 = 15.03$.
> > - The margin is $15.03/1{,}000 = 1.50\%$.
> > - The IRR is the rate $j$ at which the present value of the earnings is zero, which gives $j = 14.6\%$.
> > - The IRR is above the 10% hurdle, so the VNB is positive, and the three metrics agree that the business adds value.

## Analysis of movement

The change in EV over a year, plus dividends paid and less capital injected, is the EV profit. It is analysed into the expected return on the opening EV at $r$, the VNB, experience variances, assumption changes and economic variances. EV profit over opening EV is the return on embedded value.

## Traditional, European and market-consistent embedded value

A traditional EV uses one deterministic projection with a risk discount rate that carries every allowance for risk. The CFO Forum's European Embedded Value (EEV) principles required an explicit TVOG and a disclosed basis for $r$. Its Market Consistent Embedded Value (MCEV) principles value each cash flow consistently with market prices, with risk-free discounting, and add a cost of residual non-hedgeable risks in place of a margin in $r$. Under MCEV the allowance for risk moves into explicit deductions, so the EV and MCEV figures for the same block are not directly comparable.

> [!trap] Deducting the cost of capital from distributable earnings
> Distributable earnings already release the required capital with its earnings, so deducting the CoC from them again counts it twice. Deduct the CoC from statutory profits only.
