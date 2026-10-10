---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:52b28e5bf5a9ba1534c8f292274e21279f5a9305e04a56a3ef56413c7957697f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Investment Vehicle.md
---

An **Investment Vehicle** is the legal and operational structure through which a [[Retirement Plan|retirement plan's]] assets are held and invested: a trusteed fund, an insurance contract, a pooled or mutual fund, or a packaged option such as a target-date fund. The vehicle is distinct from the [[Asset Class|asset classes]] held within it. It decides who owns the assets, who bears the investment and credit risk, what guarantees apply, how the money is valued and moved, and what it costs, so choosing it is part of plan design in its own right.

> $$F_n = C\,s_{\overline{n}|j}$$

> $$j = r - f$$

> $$w_E(x) = w_{\max} - \left(w_{\max} - w_{r}\right)\frac{x - x_1}{x_r - x_1}$$

- **Symbols:** $F_n$ is the account after $n$ annual contributions of $C$ at the end of each year, accumulated at the net return $j$, the gross return $r$ less the vehicle's total annual fee rate $f$. In a target-date fund's glide path, $w_E(x)$ is the equity weight at age $x$ between the age $x_1$ at which de-risking begins and the target retirement age $x_r$, falling linearly from $w_{\max}$ to $w_r$.
- **Trusteed pension fund:** Most large DB plans hold their assets in a trust or pension fund, with a custodian holding the securities and managers appointed under an [[Investment Policy Statement|investment policy statement]]. Several plans of one sponsor can share a master trust. The plan bears all investment risk but controls the [[Asset Allocation|asset allocation]] and can match it to the liabilities.
- **Insurance contracts:** A deposit administration contract or an immediate participation guarantee contract lets an insurer hold and invest the fund, with interest guarantees in the first and experience passed through in the second. A guaranteed investment contract pays a fixed rate for a term. An annuity buy-in holds an insurer's contract as a plan asset that matches retiree payments, while a buy-out transfers the liability itself, a form of [[Pension Risk Transfer|pension risk transfer]].
- **Pooled vehicles:** Pooled or commingled funds, collective investment trusts in the U.S., and mutual funds combine many investors' money in one portfolio, giving small plans diversification and access to managers at institutional scale. In Canada an insurer's segregated fund serves the same role and can carry maturity and death guarantees and creditor protection.
- **DC menu options:** A DC plan's menu usually offers target-date funds, which move from growth to safety along a glide path as the member nears the target date, and balanced funds with a fixed mix. It also offers index and actively managed funds for each class and a capital-preservation option, such as a stable value fund in the U.S. that holds bonds wrapped by an insurer's book-value guarantee. Most members stay in the default, so the default option is the plan's most important investment decision.
- **Selection criteria:** For a DB plan the choice turns on scale, governance capacity, liquidity, cost and how well the vehicle supports [[Asset-Liability Management|liability matching]]. For a DC menu it turns on diversification, the number and clarity of choices, fees, the default, how members move between options, and the information they receive, as CAPSA's guideline for capital accumulation plans requires. Behavioural evidence shows that too many choices lead members to spread money naively or stay in cash, which is a reason for fewer, well-designed options.
- **Fees:** Fees come out of the return every year, so a small difference compounds into a large one over a career. Institutional vehicles, such as collective trusts and pooled funds, usually cost a fraction of the retail mutual funds that hold the same assets.

> [!example]- A Target-Date Fund's Glide Path {Example}
> A 2050 target-date fund holds 90% equities until its members are 40, then reduces equities linearly to 50% at the target retirement age of 65. It continues de-risking for 10 more years to 30% at 75 and holds that mix thereafter. Find the equity weight for a member at ages 30, 50, 60, 65 and 70.
>
> > [!answer]-
> > Before 65 the path falls by $0.40 / 25 = 1.6\%$ a year after age 40, and after 65 it falls by $0.20 / 10 = 2\%$ a year.
> > $$
> > \begin{align*}
> > w_E(50) &= 0.90 - 0.40 \times \frac{50 - 40}{25} \\
> > &= 0.74 \\
> > w_E(60) &= 0.90 - 0.40 \times \frac{60 - 40}{25} \\
> > &= 0.58 \\
> > w_E(70) &= 0.50 - 0.20 \times \frac{70 - 65}{10} \\
> > &= 0.40
> > \end{align*}
> > $$
> > The weights are 90% at 30, 74% at 50, 58% at 60, 50% at 65 and 40% at 70. This is a *through* glide path, which keeps de-risking after retirement on the view that members draw their money down gradually. A *to* glide path would reach its final mix at 65 and stay there, which suits members expected to buy an annuity or take their money at retirement.

> [!example]- Fee Drag on a 30-Year Accumulation {Example}
> A member contributes \$6,000 at the end of each year for 30 years to a fund earning 6% before fees. Compare the balance in a collective trust charging 0.30% a year with a retail mutual fund charging 1.50%.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > F^{\text{trust}} &= 6{,}000\,s_{\overline{30}|0.057} \\
> > &= 6{,}000 \times 75.0058 \\
> > &= 450{,}035 \\
> > F^{\text{mutual}} &= 6{,}000\,s_{\overline{30}|0.045} \\
> > &= 6{,}000 \times 61.0071 \\
> > &= 366{,}042
> > \end{align*}
> > $$
> > The 1.2-point fee difference costs \$83,992, or 18.7% of the lower-fee balance, out of contributions of \$180,000 in all. Because the fee is charged on a growing balance every year, its effect on the final account is far larger than the fee rate suggests, which is why DC menus favour institutional vehicles.

> [!tip]- How it appears on the exam
> - **RET-101 (1c):** Candidates assess the types and combinations of investment vehicles used to provide retirement benefits, and distinguish the strategies used to manage retirement fund assets. The readings include the Morneau Shepell handbook ch. 7, McGill ch. 28, Allen et al. ch. 29 and the SOA paper on retirement plan investments.
> - **RET-101 (1c, 4l):** DC questions ask candidates to evaluate a menu or a default option, such as the merits of target-date funds, the choice between a *to* and a *through* glide path, or the role of a stable value fund, using the target-date fund and DC trends readings.
> - **RET-101 (4k):** A design question asks for the effects of investment choices on each stakeholder, including fees, guarantees and tax.
> - **Calculations:** Short calculations read an equity weight off a glide path or measure the drag of fees on an accumulation.

> [!warning]- Exam traps
> - **Vehicle versus asset class:** A mutual fund or a trust is a vehicle, and equities or bonds are asset classes. A pooled fund can hold any class, so describing a vehicle by its assets alone misses its costs, its guarantees and who bears the risk.
> - **Deposit administration versus IPG:** Under a deposit administration contract the insurer guarantees the interest credited and keeps the experience. Under an immediate participation guarantee contract the experience is passed straight through to the plan.
> - **Buy-in versus buy-out:** A buy-in is an asset the plan holds, and the liability stays with the plan. A buy-out discharges the liability, so treating the two alike misstates who bears the risk.
> - **Fees compound:** Subtracting the fee rate from the final balance once badly understates the drag. The fee reduces the return every year, as the net-rate accumulation shows.
