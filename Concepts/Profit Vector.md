---
aliases:
  - Emerging Surplus
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ada60a018a8dc69ad36ab6178389556e6186cc3955d4afc25c591d79b25cd2ef
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Vector.md
---

The **Profit Vector** $\mathrm{Pr} = (\mathrm{Pr}_0, \mathrm{Pr}_1, \dots, \mathrm{Pr}_n)$ lists the profit expected to emerge at the end of each policy year, per policy in force at the start of that year, with $\mathrm{Pr}_0$ holding the expenses paid at issue. It is the measure of emerging surplus in [[Profit Testing|profit testing]]: the amount the insurer can release each year after paying benefits and expenses and setting up the [[Reserve|reserves]] that the surviving policies require.

For a policy issued at age $x$ with sum insured $S$ payable at the end of the year of death, the entries are

> $$\mathrm{Pr}_0 = -E_0$$

> $$\begin{aligned} \mathrm{Pr}_t = {} & \left({}_{t-1}V + P - E_t\right)(1+i) \\ & - q_{x+t-1}\,S - p_{x+t-1}\,{}_tV \end{aligned}$$

- $E_0$ is the expense paid at issue, and $E_t$ the expense paid at the start of year $t$.
- $P$ is the premium.
- ${}_tV$ is the reserve per policy in force at time $t$.
- $i$ is the rate the insurer earns on its assets, not the valuation rate of the reserves.

$\mathrm{Pr}_t$ is conditional on the policy being in force at time $t-1$. Multiplying it by ${}_{t-1}p_x$ turns it into the [[Profit Signature|profit signature]].

## Sources of surplus

When the reserves are net premium policy values on a basis with premium $P'$, interest $i'$ and mortality $q'$, the profit splits into three margins:

> $$\begin{aligned} \mathrm{Pr}_t = {} & \left(P - E_t - P'\right)(1+i) \\ & + \left({}_{t-1}V + P'\right)(i - i') \\ & + \left(q'_{x+t-1} - q_{x+t-1}\right)\left(S - {}_tV\right) \end{aligned}$$

- The first line is the premium loading over expenses and the valuation premium.
- The second line is the interest earned above the valuation rate.
- The third line is the mortality assumed above the mortality expected, on the amount at risk $S - {}_tV$.

## Reserves and the timing of surplus

Holding a reserve takes $p_{x+t-1}\,{}_tV$ out of year $t$ and returns ${}_tV(1+i)$ in year $t+1$. Reserves therefore change when surplus emerges, not where it comes from. When the risk discount rate is above $i$, the delay lowers the NPV.

> [!example]- What is the profit vector of this term insurance once reserves are held? {Example}
> A 5-year term insurance of $\$100{,}000$ on $(60)$ has a premium of $\$500$, expenses of $3\%$ of each premium and initial expenses of $\$250$, and the insurer earns $6\%$. With no reserves, the profit vector is $(-250,\ 174.30,\ 134.90,\ 90.70,\ 41.10,\ -14.70)$. The insurer instead holds reserves of 84, 134, 140 and 100 per policy in force at the end of years 1 to 4. The survival probabilities $p_{60}$ to $p_{63}$ are $0.996602$, $0.996208$, $0.995766$ and $0.995270$.
>
> > [!answer]-
> > - Each year gains the reserve released from the year before with a year's interest, $1.06\,{}_{t-1}V$, and loses the cost of the year-end reserve, $p_{59+t}\,{}_tV$.
> >
> > | $t$ | No reserves | $1.06\,{}_{t-1}V$ | $p_{59+t}\,{}_tV$ | $\mathrm{Pr}_t$ |
> > | ---: | ---: | ---: | ---: | ---: |
> > | 1 | 174.30 | 0 | 83.71 | 90.59 |
> > | 2 | 134.90 | 89.04 | 133.49 | 90.45 |
> > | 3 | 90.70 | 142.04 | 139.41 | 93.33 |
> > | 4 | 41.10 | 148.40 | 99.53 | 89.97 |
> > | 5 | $-14.70$ | 106.00 | 0 | 91.30 |
> >
> > - The profit vector is $(-250,\ 90.59,\ 90.45,\ 93.33,\ 89.97,\ 91.30)$, nearly level, and the loss in year 5 is gone.
> > - At a $10\%$ risk discount rate the NPV falls from $105.99$ to $93.00$, because money held in reserve earns $6\%$ while the shareholders require $10\%$.

## Stress tests

Rerunning the vector on an adverse assumption, such as heavier mortality, a lower earned rate or more [[Lapse|lapses]], shows which margin the policy's profit depends on.

> [!example]- If mortality on the term insurance with reserves is 110% of the SULT, what is the profit vector? {Example}
> - The stressed $q_{60}$ is $0.0037378$, so the year 1 death benefit cost is $373.78$ and $p_{60} = 0.9962622$.
> - The year 1 reserve cost is $0.9962622(84) = 83.69$, and $485(1.06) = 514.10$.
> - $\mathrm{Pr}_1 = 514.10 - 373.78 - 83.69 = 56.63$.
> - The same steps for years 2 to 5 give $(-250,\ 56.63,\ 52.58,\ 51.05,\ 42.72,\ 38.42)$.
> - Each year loses the extra $10\%$ of deaths on the amount at risk $S - {}_tV$, about 34 in year 1 rising to 53 in year 5.
> - The NPV at $10\%$ falls from $93.00$ to $-64.92$, so a $10\%$ rise in deaths removes more than the whole expected profit.

> [!trap] Charging the full year-end reserve
> The cost of the year-end reserve is $p_{x+t-1}\,{}_tV$, because only the policies still in force need one. Charging the full ${}_tV$ treats the policies that ended in a death as if they still needed a reserve.
