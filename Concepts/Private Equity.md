---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7f6e7968555495ca049ad61756aa4763ccb488e2b9daa70b025be26fce310f5d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Private Equity.md
---

**Private Equity** is equity in companies that are not traded on a public exchange, bought mostly through limited partnership funds that invest for a fixed term and return the proceeds as investments are sold. Its place in a [[Portfolio|portfolio]] is a higher expected return in exchange for illiquidity, long commitments and returns that are measured with stale valuations.

The general partner (GP) manages the fund and the limited partners (LPs) supply most of the money. An LP commits an amount at the start, the GP calls it as investments are found over the first several years, and the fund then harvests and winds down, commonly over about ten years with extensions. The LP must keep enough liquidity to meet calls it does not control.

The share of paid-in capital the fund has returned in cash is the distributions to paid-in capital multiple, which is

> $$\text{DPI} = \frac{\text{Distributions}}{\text{Paid-in capital}}$$

- Paid-in capital is what the LPs have contributed through capital calls so far.
- Distributions are what the fund has returned to them.

Counting the investments the fund still holds as well, the total value to paid-in capital multiple is

> $$\text{TVPI} = \frac{\text{Distributions} + \text{NAV}}{\text{Paid-in capital}}$$

- NAV is the net asset value of the investments the fund still holds, as the GP values them.

The residual value, TVPI less DPI, is often reported as RVPI. The fund's internal rate of return to date, IRR, solves

> $$\sum_{t=0}^{T} \frac{CF_t}{(1 + \text{IRR})^t} + \frac{\text{NAV}_T}{(1 + \text{IRR})^T} = 0$$

- $CF_t$ is the net cash flow to the LPs at time $t$, negative for a call and positive for a distribution.

The [[Internal Rate of Return|IRR]] is a money-weighted return, appropriate because the GP controls the timing of the cash flows, but it rewards early distributions and can be raised by delaying calls. A quick distribution can give a high IRR on a small multiple, and a long hold a high multiple on a modest IRR. The multiples ignore time entirely, so they are read together with the IRR ([[Performance Measurement|performance measurement]]).

> [!example]- What are this fund's DPI, TVPI and IRR at time 4? {Example}
> An LP commits \$100 million to a buyout fund. The fund calls \$40 million at time 0, \$30 million at time 1 and \$20 million at time 2, and distributes \$25 million at time 3 and \$45 million at time 4. Immediately after the time-4 distribution, the LP's share of the fund's NAV is \$70 million.
>
> > [!answer]-
> > - Paid-in capital is $40 + 30 + 20 = 90$ (\$ millions) and distributions are $25 + 45 = 70$.
> > - The DPI is $70/90 = 0.78$.
> > - The TVPI is $(70 + 70)/90 = 1.56$.
> > - The IRR treats the NAV as if it were received at time 4, so the time-4 flow is $45 + 70 = 115$.
> > - The IRR $j$ solves $-40 - \dfrac{30}{1+j} - \dfrac{20}{(1+j)^2} + \dfrac{25}{(1+j)^3} + \dfrac{115}{(1+j)^4} = 0$, which gives $j = 15.4\%$ numerically.
> > - Half of the TVPI is the GP's valuation of companies not yet sold.

## The J-curve

Fees and early write-downs come before gains, so the LP's cumulative net cash flow and the fund's interim IRR are negative in the early years and turn up only as investments are sold. A negative IRR in a fund's first years is normal, so interim IRRs are compared only between funds of the same vintage year.

> [!example]- How does the LP's cumulative net cash flow move over the fund's first four years? {Example}
> The fund calls \$40 million at time 0, \$30 million at time 1 and \$20 million at time 2, and distributes \$25 million at time 3 and \$45 million at time 4.
>
> > [!answer]-
> > - The cumulative net cash flow is $-40$, $-70$, $-90$, $-65$ and $-20$ million.
> > - The LP is \$90 million out of pocket after three years and still \$20 million short in cash at time 4.
> > - The flow falls and then turns up, the shape of a J.

## Venture capital, growth equity and buyouts

Venture funds buy minority stakes in young companies, in stages, so that each round of financing depends on milestones being met. Most investments fail or return little, and a fund's result depends on a few large successes.

Growth equity buys minority stakes in established, growing companies with little debt.

A buyout buys control of a mature company financed largely with debt, the leveraged buyout. It earns its return from paying down the debt, improving operations, and selling at a higher multiple through a sale to another company, a sale to another fund, or an initial public offering.

## Fees and carried interest

The GP charges a management fee, usually a percentage of committed capital during the investment period. The fee is charged on committed capital, not on the smaller amount called so far, so as a share of invested capital it is high early in the fund's life.

The GP also takes carried interest, a share of the fund's profit. Carry is usually paid only after the LPs have received their capital back plus a preferred return, the hurdle, often followed by a catch-up that restores the GP's full share of the profit.

> [!example]- What are the GP's carry and the LP's net multiple when this fund winds up? {Example}
> A fund called \$90 million in total and returned \$160 million before carried interest. The GP's carry is $20\%$ of the profit under a whole-fund waterfall with a full catch-up, and the fund has comfortably cleared its hurdle.
>
> > [!answer]-
> > - Once the hurdle is cleared and the catch-up is complete, the GP has $20\%$ of the whole profit.
> > - The profit is $160 - 90 = 70$, so the carry is $0.20 \times 70 = 14$ (\$ millions).
> > - The gross multiple of $160/90 = 1.78$ falls to a net multiple of $(160 - 14)/90 = 1.62$ for the LP.
> > - Management fees are already inside the \$90 million paid in, which is why net returns to LPs sit well below the gross returns on the companies themselves.

## Illiquidity and stale valuations

NAVs are the GP's appraisals, updated quarterly and anchored on the last value, so reported private equity returns are smoothed in the same way as appraisal-based [[Real Estate|real estate]] returns. They understate volatility and correlation with public equity, and an allocation built on them overweights the asset class.

> [!trap] Reading TVPI as money returned
> TVPI counts the NAV as if it were cash. Only DPI measures money actually returned, and a high TVPI with a low DPI rests on the GP's valuations.
