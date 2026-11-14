---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f2006c626cdb2acebd68b1b64bc39dc6f87b8a9112a2f85efe242a1dba97a3dd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Investment Vehicle.md
---

An **Investment Vehicle** is the legal and operational structure through which a [[Retirement Plan|retirement plan's]] assets are held and invested, such as a trusteed fund, an insurance contract, a pooled or mutual fund, or a packaged option such as a target-date fund. The vehicle decides who owns the assets, who bears the investment and credit risk, what guarantees apply, how the money is valued and moved, and what it costs, so choosing it is part of plan design in its own right.

The main types of vehicle are:

1. **Trusteed pension fund.** Most large DB plans hold their assets in a trust or pension fund, with a custodian holding the securities and managers appointed under an [[Investment Policy Statement|investment policy statement]]. Several plans of one sponsor can share a master trust. The plan bears all investment risk but controls the [[Asset Allocation|asset allocation]] and can match it to the liabilities.
2. **Insurance contracts.** A deposit administration contract lets an insurer hold and invest the fund, guaranteeing the interest credited and keeping the experience. An immediate participation guarantee contract passes the experience straight through to the plan. A guaranteed investment contract pays a fixed rate for a term.
3. **Annuity buy-in.** The plan holds an insurer's contract as a plan asset that matches retiree payments, and the liability stays with the plan. A buy-out instead transfers the liability itself, a form of [[Pension Risk Transfer|pension risk transfer]].
4. **Pooled vehicles.** Pooled or commingled funds, collective investment trusts in the U.S., and mutual funds combine many investors' money in one portfolio, giving small plans diversification and access to managers at institutional scale. In Canada an insurer's segregated fund serves the same role and can carry maturity and death guarantees and creditor protection.

For a DB plan the choice turns on scale, governance capacity, liquidity, cost and how well the vehicle supports [[Asset-Liability Management|liability matching]]. For a DC menu it turns on diversification, the number and clarity of choices, fees, the default, how members move between options, and the information they receive, as CAPSA's guideline for capital accumulation plans requires. Behavioural evidence shows that too many choices lead members to spread money naively or stay in cash, which is a reason for fewer, well-designed options.

## DC menu options

A DC plan's menu usually offers target-date funds and balanced funds with a fixed mix. It also offers index and actively managed funds for each class and a capital-preservation option, such as a stable value fund in the U.S. that holds bonds wrapped by an insurer's book-value guarantee. Most members stay in the default, so the default option is the plan's most important investment decision.

A target-date fund moves from growth to safety along a glide path as the member nears the target date. On a linear glide path, the equity weight at age $x$ between the age $x_1$ at which de-risking begins and the target retirement age $x_r$ is

> $$w_E(x) = w_{\max} - \left(w_{\max} - w_{r}\right)\frac{x - x_1}{x_r - x_1}$$

- $w_{\max}$ is the equity weight before de-risking begins.
- $w_r$ is the equity weight at the target retirement age.

A *through* glide path keeps de-risking after retirement, on the view that members draw their money down gradually. A *to* glide path reaches its final mix at the target date and stays there, which suits members expected to buy an annuity or take their money at retirement.

> [!example]- What is this fund's equity weight at ages 30, 50, 60, 65 and 70? {Example}
> A 2050 target-date fund holds 90% equities until its members are 40, then reduces equities linearly to 50% at the target retirement age of 65. It continues de-risking for 10 more years to 30% at 75 and holds that mix thereafter.
>
> > [!answer]-
> > - Before 40 the weight is 90%, so it is 90% at 30.
> > - From 40 to 65 the weight falls by $0.40 / 25 = 1.6\%$ a year.
> > - At 50 it is $0.90 - 0.40 \times 10/25 = 74\%$, and at 60 it is $0.90 - 0.40 \times 20/25 = 58\%$.
> > - At 65 it is 50%.
> > - After 65 it falls by $0.20 / 10 = 2\%$ a year, so at 70 it is $0.50 - 0.20 \times 5/10 = 40\%$.
> > - This is a *through* glide path, because it keeps de-risking after 65.

## Fees

Fees come out of the return every year. With annual contributions $C$ at the end of each year, a gross return $r$ and a total annual fee rate $f$, the account after $n$ years is

> $$F_n = C\,s_{\overline{n}|j}$$

where the net return is

> $$j = r - f$$

A small difference in fees therefore compounds into a large one over a career. Institutional vehicles, such as collective trusts and pooled funds, usually cost a fraction of the retail mutual funds that hold the same assets.

> [!example]- How much does a 1.50% fee cost against a 0.30% fee over 30 years of contributions? {Example}
> A member contributes $\$6{,}000$ at the end of each year for 30 years to a fund earning 6% before fees. One option is a collective trust charging 0.30% a year, the other a retail mutual fund charging 1.50%.
>
> > [!answer]-
> > - In the trust the net return is 5.7%, and $s_{\overline{30}|0.057} = 75.0058$, so the balance is $6{,}000 \times 75.0058 = \$450{,}035$.
> > - In the mutual fund the net return is 4.5%, and $s_{\overline{30}|0.045} = 61.0071$, so the balance is $6{,}000 \times 61.0071 = \$366{,}042$.
> > - The 1.2-point fee difference costs $\$83{,}992$, or 18.7% of the lower-fee balance, out of contributions of $\$180{,}000$ in all.

> [!trap] Describing a vehicle by its asset class
> A mutual fund or a trust is a vehicle, and equities or bonds are [[Asset Class|asset classes]]. A pooled fund can hold any class, so describing a vehicle by its assets alone misses its costs, its guarantees and who bears the risk.
