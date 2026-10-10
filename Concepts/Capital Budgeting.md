---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:09085a78c498c09805f9732e1a95dd22e790c6560318f07f63e8df6f9440d233
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital Budgeting.md
---

**Capital Budgeting** is the process by which a firm evaluates investment projects and decides which to undertake, and how to allocate a limited supply of capital among them. The governing rule is to accept the projects whose [[Net Present Value|net present value]], discounted at a rate reflecting each project's risk, is positive, and to choose the set with the largest total NPV when projects compete for the same capital.

> $$\text{NPV} = -I_0 + \sum_{t=1}^{n} \frac{C_t}{(1+k)^t}$$

> $$0 = -I_0 + \sum_{t=1}^{n} \frac{C_t}{(1+\text{IRR})^t}$$

> $$\text{PI} = \frac{1}{I_0}\sum_{t=1}^{n} \frac{C_t}{(1+k)^t}$$

> $$\text{Expanded NPV} = \text{Static NPV} + \text{Value of real options}$$

- **Symbols:** $I_0$ is the initial investment, $C_t$ the project's incremental after-tax cash flow in year $t$, and $k$ the project's hurdle rate, the [[Cost of Capital|cost of capital]] for its risk. The IRR is the rate at which the NPV is zero, and the profitability index (PI) is the present value of the future cash flows per dollar invested, so $\text{PI} > 1$ exactly when $\text{NPV} > 0$.
- **Incremental cash flows:** Only cash flows that change because the project is undertaken count. These include the opportunity cost of resources the firm already owns, working capital and the effect on existing products. Sunk costs and allocated overhead that would be incurred anyway are left out.
- **Internal rate of return:** The [[Internal Rate of Return|IRR]] is intuitive because it is a return, but it measures neither size nor timing. Mutually exclusive projects can be ranked differently by IRR and NPV, and a project whose cash flows change sign more than once can have several IRRs or none.
- **Payback:** The payback period is the time until the cash flows repay the investment, and the [[Discounted Payback Period|discounted payback period]] does the same with discounted flows. Both ignore everything after the cut-off, so they are measures of liquidity and risk, not of value.
- **Capital rationing:** When the budget is fixed, the firm should maximise the total NPV of the projects it can afford. Ranking by PI and taking projects down the list works when projects are divisible or fill the budget closely. Otherwise, the candidate combinations must be compared directly.
- **Real options:** A static NPV assumes the plan is fixed at the start. Management can usually expand, defer, stage or abandon a project as information arrives, and the value of that flexibility is added to give the expanded NPV. It can turn a project with a negative static NPV into one worth doing.
- **Non-financial factors:** Strategic fit, regulatory and rating agency capital, reputation, risk appetite and the reliability of the forecast all affect the final choice. For an [[Insurer|insurer]], launching a product is a capital budgeting decision in which the capital it requires is the investment, and [[Profit Testing|profit testing]] applies the same rules to the product's profit signature.

> [!example]- Mutually Exclusive Projects Where NPV and IRR Disagree {Example}
> An insurer can build one of two claims systems. System A costs \$1,000,000 and saves \$500,000 a year for three years. System B costs \$3,000,000 and saves \$1,350,000 a year for three years. The hurdle rate is 10%. Rank the systems by NPV, IRR and PI, and decide.
>
> > [!answer]-
> > The three-year annuity factor at 10% is $2.486852$.
> > $$
> > \begin{align*}
> > \text{NPV}_A &= 500{,}000(2.486852) - 1{,}000{,}000 \\
> > &= 243{,}426 \\
> > \text{NPV}_B &= 1{,}350{,}000(2.486852) - 3{,}000{,}000 \\
> > &= 357{,}250 \\
> > \text{NPV}_{B-A} &= 850{,}000(2.486852) - 2{,}000{,}000 \\
> > &= 113{,}824
> > \end{align*}
> > $$
> > Solving for the IRRs gives 23.4% for A, 16.6% for B and 13.2% for the increment $B - A$. The PIs are 1.243 and 1.119. IRR and PI favour A because it earns more per dollar, but B adds \$113,824 more value. The increment needs \$2,000,000 more and returns 13.2%, above the 10% hurdle, so it is worth doing. The insurer should build B, unless capital is rationed and the extra \$2,000,000 has a better use.

> [!example]- Choosing Projects Under a Capital Budget {Example}
> A capital budget of \$1,000,000 is available for four independent projects. Their costs and NPVs, in thousands, are P1 600 and 180, P2 400 and 140, P3 400 and 100, and P4 300 and 60. Which projects should be funded?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PI}_{P2} &= 1 + \frac{140}{400} \\
> > &= 1.35 \\
> > \text{PI}_{P1} &= 1 + \frac{180}{600} \\
> > &= 1.30
> > \end{align*}
> > $$
> > P3 and P4 have PIs of 1.25 and 1.20. Taking projects in PI order funds P2 and then P1, which uses the whole \$1,000,000 for a total NPV of \$320,000. The other affordable sets do worse: P1 and P3 give \$280,000, and P2 and P3 give \$240,000. Ranking by NPV alone happens to choose the same set here. It fails when one large project crowds out two smaller ones whose combined NPV is higher.

> [!example]- Valuing the Option to Abandon a New Product {Example}
> An insurer can spend \$10 million now to launch a product. In one year it will learn whether demand is high or low, each with probability 0.5. The value of continuing at that time is \$16 million if demand is high and \$4 million if it is low. The platform could instead be sold for \$8 million at the end of the year. The hurdle rate is 10%. Find the static NPV, the expanded NPV and the value of the abandonment option.
>
> > [!answer]-
> > Without the option, the insurer continues in both states. With it, it sells the platform when demand is low, since \$8 million is more than \$4 million.
> > $$
> > \begin{align*}
> > \text{Static NPV} &= \frac{0.5(16) + 0.5(4)}{1.10} - 10 \\
> > &= -0.909 \\
> > \text{Expanded NPV} &= \frac{0.5(16) + 0.5(8)}{1.10} - 10 \\
> > &= 0.909
> > \end{align*}
> > $$
> > The option is worth \$1.818 million, enough to turn a rejection into an acceptance. Discounting the option's payoff at the project's hurdle rate is an approximation, because the option changes the risk of the cash flows. A [[Risk-Neutral Valuation|risk-neutral valuation]] is more exact.

> [!tip]- How it appears on the exam
> - **CFE-201 learning outcome 1b:** Candidates evaluate and apply methods to value a business or project, including the impact of financial and non-financial factors on capital budgeting and allocation decisions. A typical question gives projected cash flows and asks for NPV and IRR, then asks for a recommendation that weighs strategic and non-financial factors.
> - **Flexibility:** Koller's chapter on flexibility is on the reading list for the same objective, so a question may ask for the value of an option to expand, defer or abandon, using a decision tree or an option-pricing approach.
> - **Hurdle rates:** The study note on hurdle rate definition supports questions on which rate a project should clear, and why it differs from the firm's overall cost of capital.

> [!warning]- Exam traps
> - **Ranking by IRR:** For mutually exclusive projects of different size or timing, the higher IRR does not mean more value. Compare NPVs, or check the IRR of the incremental cash flows against the hurdle rate.
> - **Sunk and allocated costs:** Money already spent and overhead that is incurred whether or not the project goes ahead are not incremental. Charging them to the project can reject a project that adds value.
> - **Greedy PI under a lumpy budget:** Taking projects in PI order can leave part of the budget unused when the next project does not fit. Then a combination with a lower average PI but a higher total NPV may be better, so check the alternatives.
> - **Payback as a value test:** A short payback says the money comes back quickly, not that the project is worth doing. A project with a long payback can have the largest NPV.
> - **Ignoring the options:** A negative static NPV is not the last word when management can abandon, defer or expand. Leaving out flexibility undervalues staged investments such as a pilot of a new product.
