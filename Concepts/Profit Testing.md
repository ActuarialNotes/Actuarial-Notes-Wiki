---
aliases:
  - Deterministic Profit Testing
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e7cd9fa12c2917659056e13ef60e8354809403f0965274667dd6a96ca6f49e5a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Testing.md
---

**Profit Testing** projects the cash flows of a long-term insurance or annuity policy year by year, on the insurer's best-estimate basis, to find the profit expected to emerge at the end of each year. The insurer uses it to set premiums and reserves and to see how sensitive the policy's profit is to each assumption.

Each year the insurer starts with the reserve released from the year before, receives the premium, pays the expenses and earns interest on the balance. It then pays the expected death benefit and sets up the reserve required for each policy still in force. For a policy issued at age $x$ with sum insured $S$ payable at the end of the year of death, the profit at the end of year $t$ per policy in force at its start is

> $$\begin{aligned} \mathrm{Pr}_t = {} & \left({}_{t-1}V + P - E_t\right)(1+i) \\ & - q_{x+t-1}\,S - p_{x+t-1}\,{}_tV \end{aligned}$$

- ${}_{t-1}V$ and ${}_tV$ are the [[Reserve|reserves]] per policy in force at the start and end of year $t$.
- $P$ is the premium and $E_t$ the expenses paid at the start of year $t$.
- $i$ is the rate the insurer earns on its assets.

A survival benefit $B_t$ adds $-p_{x+t-1}B_t$. The expenses paid at issue, before the policy is in force, are $\mathrm{Pr}_0$, which is negative and earns no interest. The values $\mathrm{Pr}_0, \dots, \mathrm{Pr}_n$ form the [[Profit Vector|profit vector]].

> [!example]- What are the profit vector, profit signature and NPV of this term insurance? {Example}
> A 5-year term insurance issued to $(60)$ pays $\$100{,}000$ at the end of the year of death. The premium is $\$500$ a year, paid in advance. Initial expenses of $\$250$ are paid at issue, and expenses of $3\%$ of each premium are paid with the premium. The insurer earns $6\%$, and mortality follows the SULT at $5\%$: $q_{60}$ to $q_{64}$ are $0.003398$, $0.003792$, $0.004234$, $0.004730$ and $0.005288$. Reserves of 84, 134, 140 and 100 per policy in force are held at the end of years 1 to 4. The risk discount rate is $10\%$.
>
> > [!answer]-
> > - Before the first premium, $\mathrm{Pr}_0 = -250$.
> > - Each year $P - E_t = 485$, the interest is $6\%$ of ${}_{t-1}V + 485$, the expected death benefit is $100{,}000\,q_{60+t-1}$ and the reserve cost is $p_{60+t-1}\,{}_tV$.
> >
> > | $t$ | ${}_{t-1}V$ | Interest | Death benefit | ${}_tV$ cost | $\mathrm{Pr}_t$ |
> > | ---: | ---: | ---: | ---: | ---: | ---: |
> > | 1 | 0 | 29.10 | 339.80 | 83.71 | 90.59 |
> > | 2 | 84 | 34.14 | 379.20 | 133.49 | 90.45 |
> > | 3 | 134 | 37.14 | 423.40 | 139.41 | 93.33 |
> > | 4 | 140 | 37.50 | 473.00 | 99.53 | 89.97 |
> > | 5 | 100 | 35.10 | 528.80 | 0 | 91.30 |
> >
> > - The probabilities ${}_{t-1}p_{60}$ that a policy is still in force at the start of each year are $1$, $0.996602$, $0.992823$, $0.988619$ and $0.983943$.
> > - Multiplying gives the signature $(-250,\ 90.59,\ 90.14,\ 92.66,\ 88.95,\ 89.83)$.
> > - Discounted at $10\%$, the entries after time 0 are $82.35$, $74.50$, $69.62$, $60.75$ and $55.78$.
> > - The NPV is $-250 + 343.00 = 93.00$, so the policy earns more than the $10\%$ the shareholders require.

## Profit signature and profit measures

The profit per policy issued, the [[Profit Signature|profit signature]], weights each year's profit by the probability ${}_{t-1}p_x$ that the policy is in force at the start of the year, so that

> $$\Pi_t = {}_{t-1}p_x\,\mathrm{Pr}_t$$

with $\Pi_0 = \mathrm{Pr}_0$. Its [[Net Present Value|net present value]] at the risk discount rate is

> $$\text{NPV} = \sum_{t=0}^{n} \Pi_t\,(1+r)^{-t}$$

- $r$ is the risk discount rate, the return the shareholders require.

The signature is also summarized by its [[Internal Rate of Return|internal rate of return]], [[Profit Margin|profit margin]] and [[Discounted Payback Period|discounted payback period]].

## Setting a premium

A premium meets a profit criterion when it makes the NPV at $r$ zero, which is an IRR of $r$, or when it gives a target profit margin. When the reserves do not depend on the premium, each $\mathrm{Pr}_t$ is linear in $P$, so the premium solves a linear equation.

> [!example]- What premium makes the NPV of the term insurance zero at 10%? {Example}
> - One more dollar of premium adds $0.97$ to $P - E_t$, so each $\mathrm{Pr}_t$ rises by $0.97(1.06) = 1.0282$.
> - Each $\Pi_t$ rises by $1.0282\,{}_{t-1}p_{60}$, and at $10\%$, $\ddot{a}_{60:\overline{5}|} = 4.1413$.
> - The NPV rises by $1.0282(4.1413)/1.1 = 3.8710$ for each dollar of premium.
> - Setting $93.00 + 3.8710(P - 500) = 0$ gives $P = 500 - 24.02 = \$475.98$, the premium with an IRR of exactly $10\%$.

## Zeroization

Zeroization works backward from the last year to set the smallest reserves that remove every negative profit after time 0.

> [!example]- If the insurer holds no reserves for the term insurance, what are the zeroized reserves? {Example}
> - Without reserves, $\mathrm{Pr}_t = 485(1.06) - 100{,}000\,q_{60+t-1}$, which gives $(-250,\ 174.30,\ 134.90,\ 90.70,\ 41.10,\ -14.70)$.
> - Year 5 is negative, so a reserve at time 4 must make $\mathrm{Pr}_5 = 0$: $({}_4V + 485)(1.06) = 528.80$, so ${}_4V = 13.87$.
> - Year 4 then becomes $514.10 - 473.00 - 0.995270(13.87) = 27.30$, still positive, so ${}_3V = 0$.
> - The zeroized reserves are $(0, 0, 0, 13.87, 0)$, and the profit vector becomes $(-250,\ 174.30,\ 134.90,\ 90.70,\ 27.30,\ 0)$.

## Deterministic and stochastic tests

A deterministic test uses one set of assumptions, and a stress test repeats it on an adverse set. A stochastic test simulates one or more assumptions, most often the investment return, so that the NPV becomes a random variable whose mean, spread and probability of a loss can be reported.

> [!trap] Mixing the earned rate and the risk discount rate
> Interest within the year is earned at $i$, while the NPV is taken at the risk discount rate $r$. In the term insurance, interest is at $6\%$ and the NPV at $10\%$. Swapping the two changes every answer.
