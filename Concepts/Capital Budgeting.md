---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:356ce5afbc01df399ab88cf844d57ca587338e942d1ef5a577e7ab8d324567e1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital Budgeting.md
---
**Capital Budgeting** is the process by which a firm evaluates investment projects, decides which to undertake and allocates a limited supply of capital among them. The governing rule is to accept the projects whose [[Net Present Value|net present value]], discounted at a rate reflecting each project's risk, is positive, and to choose the set with the largest total NPV when projects compete for the same capital.

The net present value of a project with initial investment $I_0$ is

> $$\text{NPV} = -I_0 + \sum_{t=1}^{n} \frac{C_t}{(1+k)^t}$$

- $C_t$ is the project's incremental after-tax cash flow in year $t$.
- $k$ is the project's hurdle rate, the [[Cost of Capital|cost of capital]] for its risk.

Only cash flows that change because the project is undertaken count. These include the opportunity cost of resources the firm already owns, working capital and the effect on existing products. Sunk costs and allocated overhead that would be incurred anyway are left out, and charging them to the project can reject a project that adds value.

## Internal rate of return

The [[Internal Rate of Return|internal rate of return]] is the rate at which the NPV is zero:

> $$0 = -I_0 + \sum_{t=1}^{n} \frac{C_t}{(1+\text{IRR})^t}$$

The IRR is intuitive because it is a return, but it measures neither size nor timing. Mutually exclusive projects can be ranked differently by IRR and NPV. A project whose cash flows change sign more than once can have several IRRs or none. Two projects are compared by discounting the difference of their cash flows, whose NPV is the difference of their NPVs. The increment is worth taking if its NPV is positive, or equivalently if its IRR is above the hurdle rate.

> [!example]- Which of these two claims systems should the insurer build? {Example}
> An insurer can build one of two claims systems. The hurdle rate is 10%.
>
> | System | Cost | Annual saving, years 1–3 |
> | :--- | ---: | ---: |
> | A | $\$1{,}000{,}000$ | $\$500{,}000$ |
> | B | $\$3{,}000{,}000$ | $\$1{,}350{,}000$ |
>
> > [!answer]-
> > - The three-year annuity factor at 10% is $2.486852$.
> > - $\text{NPV}_A = 500{,}000(2.486852) - 1{,}000{,}000 = 243{,}426$.
> > - $\text{NPV}_B = 1{,}350{,}000(2.486852) - 3{,}000{,}000 = 357{,}250$.
> > - The increment $B - A$ costs $\$2{,}000{,}000$ more and saves $\$850{,}000$ more a year, so $\text{NPV}_{B-A} = 850{,}000(2.486852) - 2{,}000{,}000 = 113{,}824$.
> > - Solving for the IRRs gives 23.4% for A, 16.6% for B and 13.2% for the increment.
> > - IRR favours A because it earns more per dollar, but the increment returns 13.2%, above the 10% hurdle, and adds $\$113{,}824$ of value.
> > - The insurer should build B, unless capital is rationed and the extra $\$2{,}000{,}000$ has a better use.

## Profitability index and capital rationing

The profitability index is the present value of the future cash flows per dollar invested:

> $$\text{PI} = \frac{1}{I_0}\sum_{t=1}^{n} \frac{C_t}{(1+k)^t}$$

$\text{PI} > 1$ exactly when $\text{NPV} > 0$. When the budget is fixed, the firm should maximise the total NPV of the projects it can afford. Ranking by PI and taking projects down the list works when projects are divisible or fill the budget closely. Otherwise the candidate combinations must be compared directly, because a combination with a lower average PI may have a higher total NPV.

> [!example]- With $\$1{,}000{,}000$ to spend, which of these four independent projects should be funded? {Example}
> Costs and NPVs are in thousands of dollars.
>
> | Project | Cost | NPV |
> | :--- | ---: | ---: |
> | P1 | 600 | 180 |
> | P2 | 400 | 140 |
> | P3 | 400 | 100 |
> | P4 | 300 | 60 |
>
> > [!answer]-
> > - The PIs are $1 + 140/400 = 1.35$ for P2, $1 + 180/600 = 1.30$ for P1, $1.25$ for P3 and $1.20$ for P4.
> > - Taking projects in PI order funds P2 and then P1, which uses the whole $\$1{,}000{,}000$ for a total NPV of $\$320{,}000$.
> > - The other affordable sets do worse: P1 and P3 give $\$280{,}000$, and P2 and P3 give $\$240{,}000$.
> > - Fund P2 and P1.

## Payback period

The payback period is the time until the cash flows repay the investment, and the [[Discounted Payback Period|discounted payback period]] does the same with discounted flows. Both ignore everything after the cut-off, so they are measures of liquidity and risk, not of value. A project with a long payback can have the largest NPV.

## Real options

A static NPV assumes the plan is fixed at the start. Management can usually expand, defer, stage or abandon a project as information arrives. With the value of that flexibility added, the expanded NPV is

> $$\text{Expanded NPV} = \text{Static NPV} + \text{Value of real options}$$

Flexibility can turn a project with a negative static NPV into one worth doing, so leaving it out undervalues staged investments such as a pilot of a new product.

> [!example]- What is this option to abandon a new product worth? {Example}
> An insurer can spend $\$10$ million now to launch a product. In one year it will learn whether demand is high or low, each with probability 0.5. The value of continuing then is $\$16$ million if demand is high and $\$4$ million if it is low. The platform could instead be sold for $\$8$ million at the end of the year. The hurdle rate is 10%.
>
> > [!answer]-
> > - Without the option, the insurer continues in both states, so the static NPV is $(0.5 \times 16 + 0.5 \times 4)/1.10 - 10 = -0.909$ million.
> > - With the option, it sells the platform when demand is low, since $\$8$ million is more than $\$4$ million.
> > - The expanded NPV is $(0.5 \times 16 + 0.5 \times 8)/1.10 - 10 = 0.909$ million.
> > - The option is worth $0.909 - (-0.909) = \$1.818$ million, enough to turn a rejection into an acceptance.
> > - Discounting the option's payoff at the project's hurdle rate is an approximation, because the option changes the risk of the cash flows. A [[Risk-Neutral Valuation|risk-neutral valuation]] is more exact.

## Non-financial factors

Strategic fit, regulatory and rating agency capital, reputation, risk appetite and the reliability of the forecast all affect the final choice. For an [[Insurer|insurer]], launching a product is a capital budgeting decision in which the capital it requires is the investment, and [[Profit Testing|profit testing]] applies the same rules to the product's profit signature.

> [!trap] Ranking mutually exclusive projects by IRR
> For projects of different size or timing, the higher IRR does not mean more value. System A above has the higher IRR, but System B has the higher NPV. Compare NPVs, or check the IRR of the incremental cash flows against the hurdle rate.
