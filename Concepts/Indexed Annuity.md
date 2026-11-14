---
aliases:
  - Index-Linked Credit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bfe0de3f00b8bc0e9afdae8e1025806b83728a7a9e3fbc191cc21c2ada6a5b98
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Indexed Annuity.md
---

An **Indexed Annuity**, or fixed indexed annuity (FIA), is a [[Deferred Annuity|deferred annuity]] whose account value is credited each period with an **index-linked credit**, a formula applied to the return of an equity index. The formula typically has a participation rate, a cap or a spread on the upside and a floor of $0\%$ on the downside. The principal and past credits are guaranteed, so the policyholder never loses money to the index, and the credit formula is an [[Embedded Option|embedded option]], usually a call spread, that the insurer has sold and funds from the yield on its general account.

With no charges, the account value after the credit $c_t$ for period $t$ is

> $$AV_t = AV_{t-1}\,(1 + c_t)$$

- $c_t \geq 0$.

The account value at the end of year $n$ is therefore the single premium multiplied by $(1 + c_1)(1 + c_2)\cdots(1 + c_n)$. Credits are locked in each year, the annual reset, so a fall in one year does not have to be made back before the next credit.

## Crediting strategies

Annual point-to-point compares the index at the start and end of the year. Its return over the crediting period is $R = I_1/I_0 - 1$, the price return, which excludes dividends. With a participation rate $p$ and an annual cap $C$, the credit is

> $$c = \max\Big(0,\ \min\big(C,\ p\,R\big)\Big)$$

A participation rate gives a share of the gain, and a spread subtracts a fixed margin. With a spread $s$ and no cap, the credit is

> $$c_{\text{spread}} = \max(0,\ R - s)$$

A contract says whether the participation rate applies before the cap, $\min(C, pR)$, or after it, $p\min(C, R)$. With $p = 80\%$, a cap of $6\%$ and $R = 10\%$, the first gives $6\%$ and the second $4.8\%$.

> [!example]- What are the credits under each of these strategies, and the capped account value after four years? {Example}
> An indexed annuity with an account value of $\$100{,}000$ credits $100\%$ of the annual point-to-point index return, capped at $6\%$, with a $0\%$ floor. The index returns $+12\%$, $+4\%$, $-9\%$ and $+6.5\%$ in four successive years. The alternative strategies on the same returns are a $2\%$ spread with no cap, and a $40\%$ participation rate with no cap.
>
> > [!answer]-
> > - Under the cap the credits are $6\%$, $4\%$, $0\%$ and $6\%$.
> > - The account value is $100{,}000(1.06)(1.04)(1.00)(1.06) = \$116{,}854.40$.
> > - The spread strategy credits $\max(0, R - 0.02)$, which is $10\%$, $2\%$, $0\%$ and $4.5\%$.
> > - The participation strategy credits $0.40R$ when $R > 0$, which is $4.8\%$, $1.6\%$, $0\%$ and $2.6\%$.
> > - The capped strategy does best in moderate years and the spread in strong ones. None of them loses anything in the $-9\%$ year, which the policyholder pays for by giving up dividends and most of the upside.

## Monthly cap

A monthly cap sums the twelve monthly returns, capping each gain but not each loss, and floors the total at zero, so it is path-dependent. The credit is

> $$c_{\text{monthly}} = \max\left(0,\ \sum_{m=1}^{12}\min\left(C_m,\ R_m\right)\right)$$

- $C_m$ is the monthly cap.
- $R_m$ is the index's return in month $m$.

Only the gains are capped. Applying a floor to each month, or capping the losses, overstates the credit, because the $0\%$ floor applies only to the annual sum.

> [!example]- What does this monthly-cap strategy credit, and how does it compare with a 6% annual cap? {Example}
> A monthly-cap strategy caps each month's index return at $2.0\%$, with no limit on monthly losses, and floors the annual sum at $0\%$. In one year the monthly returns, in percent, are $3.0$, $1.5$, $-2.0$, $2.5$, $0.8$, $-5.0$, $1.2$, $2.2$, $-1.0$, $3.5$, $1.0$ and $0.5$.
>
> > [!answer]-
> > - The capped gains are $2.0$, $1.5$, $2.0$, $0.8$, $1.2$, $2.0$, $2.0$, $1.0$ and $0.5$, which sum to $13.0$.
> > - The uncapped losses sum to $-8.0$, so the credit is $\max(0, 13.0 - 8.0) = 5.0\%$.
> > - The year's return is $(1.030)(1.015)\cdots(1.005) - 1 = 8.18\%$.
> > - The point-to-point strategy credits $\min(6\%, 8.18\%) = 6\%$, more than the monthly cap's $5.0\%$.
> > - The monthly cap loses whenever a few large monthly gains are clipped while the losses count in full. It pays most in steady, low-volatility rises, which is why it is cheap.

## The option the insurer is short

With $p = 1$, the payoff $\max(0, \min(C, R))$ is a long at-the-money call less a call struck at $1 + C$, a bull call spread. A participation rate with no cap is $p$ at-the-money calls, and a spread is one call struck at $1 + s$. A monthly cap is a cliquet, an [[Exotic Option|exotic option]] priced by simulation. The policyholder is long the option and the insurer funds it from its yield, so treating the option budget as income, or the hedge payoff as profit, double counts the credit.

## The option budget

The insurer invests the premium in bonds and spends part of each year's account value on options that pay the credit. As a share of the account value, the option budget is

> $$B = y - \pi$$

- $y$ is the insurer's expected general account yield.
- $\pi$ is the pricing spread it keeps for expenses, capital and profit.

The cap, participation rate or spread is set at renewal so the option costs exactly the budget. When rates fall or [[Volatility|implied volatility]] rises, the same budget buys a lower cap, and the insurer can reset only down to the guaranteed minimum cap in the contract.

> [!example]- What cap and what uncapped participation rate does this option budget support? {Example}
> The insurer earns $5.0\%$ on its general account and prices for a spread of $2.0\%$. One-year call options on the index trade at these prices per $\$1$ of index: $0.0797$ at the money, $0.0506$ struck at $107\%$ and $0.0472$ struck at $108\%$. The cap is for annual point-to-point with $100\%$ participation.
>
> > [!answer]-
> > - The option budget is $5.0\% - 2.0\% = 3.0\%$ of the account value.
> > - A cap $C$ costs the at-the-money call less the call struck at $1 + C$.
> > - A $7\%$ cap costs $0.0797 - 0.0506 = 0.0291$ and an $8\%$ cap costs $0.0797 - 0.0472 = 0.0325$.
> > - Interpolating, $C \approx 7\% + \frac{0.0300 - 0.0291}{0.0325 - 0.0291}(1\%) = 7.26\%$, so the insurer would declare a cap of about $7.25\%$.
> > - With no cap, the budget buys $p = 0.0300/0.0797 = 37.6\%$ of an at-the-money call.
> > - On $\$100{,}000$ the insurer spends $\$3{,}000$ on options. If the index rises $10\%$, the call spread pays $\$7{,}250$, which funds the credit exactly, and the insurer's own margin is the $2\%$ it kept from the bond yield.

## Hedging

Because the option is reset each year, the insurer's main hedge is to buy the year's call spreads on the account value, a static hedge for the year. Mismatches come from lapses and deaths during the year, from [[Dynamic Policyholder Behavior|policyholder behaviour]] at renewal, from basis between the index and the hedge, and from the forward-starting options in future years, whose prices are unknown until each reset.

## Modelling index credits

In a projection model the credit can be generated from simulated index scenarios, which shows the distribution of credits and of the hedge's gains and losses. Or it can be approximated by assuming that the hedge payoff funds the credit, so the cost of crediting is the option budget. The second approach is common in deterministic profit tests and reserves. The first is needed to test the hedge, the guaranteed minimums and policyholder behaviour.

## Registered index-linked annuity

A registered index-linked annuity (RILA) gives up the $0\%$ floor for a higher cap. A buffer has the insurer absorb the first losses, such as $10\%$, and a floor limits the policyholder's loss to a set level, such as $10\%$. Because the policyholder can lose principal, it is a security registered with the SEC. Its crediting option is the call spread less a put under a buffer, or less a put spread under a floor, as described under [[Structured Product]].

> [!trap] Crediting on total return
> The index credit uses the price index, which excludes dividends. Crediting on total return overstates the credit and the option's value, and the dividend yield lowers the call's price in Black-Scholes.
