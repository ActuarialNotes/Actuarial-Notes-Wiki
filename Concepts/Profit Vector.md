---
aliases:
  - Emerging Surplus
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:539e3456cb6b5701cf7bdc1b507224cd2cfc9f247e7bada034b4ee88f9bd7221
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Profit Vector.md
---

**The Profit Vector** $\mathrm{Pr} = (\mathrm{Pr}_0, \mathrm{Pr}_1, \dots, \mathrm{Pr}_n)$ lists the profit expected to emerge at the end of each policy year, per policy in force at the start of that year, with $\mathrm{Pr}_0$ holding the expenses paid at issue. It is the measure of **emerging surplus** in [[Profit Testing|profit testing]]: the amount the insurer can release each year after paying benefits and expenses and setting up the [[Reserve|reserves]] that the surviving policies require.

> $$\mathrm{Pr}_0 = -E_0$$

> $$\begin{aligned} \mathrm{Pr}_t = {} & \left({}_{t-1}V + P - E_t\right)(1+i) \\ & - q_{x+t-1}\,S - p_{x+t-1}\,{}_tV \end{aligned}$$

> $$\begin{aligned} \mathrm{Pr}_t = {} & \left(P - E_t - P'\right)(1+i) \\ & + \left({}_{t-1}V + P'\right)(i - i') \\ & + \left(q'_{x+t-1} - q_{x+t-1}\right)\left(S - {}_tV\right) \end{aligned}$$

- **Symbols:** In the notation of Dickson, Hardy & Waters, $E_0$ is the expense paid at issue, $E_t$ the expense paid at the start of year $t$, $i$ the rate the insurer earns, $S$ the sum insured, and ${}_tV$ the reserve per policy in force at time $t$. $\mathrm{Pr}_t$ is conditional on the policy being in force at time $t-1$; multiplying by ${}_{t-1}p_x$ turns it into the [[Profit Signature|profit signature]].
- **Sources of surplus:** The third block holds when the reserves are net premium policy values on a basis with premium $P'$, interest $i'$ and mortality $q'$. Surplus then comes from three margins: the premium loading over expenses and the valuation premium, the interest earned above the valuation rate, and the mortality assumed above the mortality expected.
- **Reserves move profit:** Holding a reserve takes $p_{x+t-1}\,{}_tV$ out of year $t$ and returns ${}_tV(1+i)$ in year $t+1$. Reserves therefore change when surplus emerges, not where it comes from, and when the risk discount rate is above $i$ the delay lowers the NPV.
- **Stress tests:** Rerunning the vector on an adverse assumption, such as heavier mortality, a lower earned rate or more [[Lapse|lapses]], shows which margin the policy's profit depends on.

> [!example]- How Reserves Shift Emerging Surplus {Example}
> A 5-year term insurance of \$100,000 on $(60)$ has a premium of \$500, expenses of 3% of each premium and initial expenses of \$250, and the insurer earns 6%. Mortality follows the SULT at 5%. With no reserves, the profit vector is $(-250,\ 174.30,\ 134.90,\ 90.70,\ 41.10,\ -14.70)$. The insurer instead holds reserves of 84, 134, 140 and 100 per policy in force at the end of years 1 to 4. Find the new profit vector by adjusting the one without reserves.
>
> > [!answer]-
> > Each year gains the reserve released from the year before, with a year's interest, and loses the cost of the year-end reserve. With $p_{60}$ to $p_{63}$ equal to $0.996602$, $0.996208$, $0.995766$ and $0.995270$:
> >
> > | $t$ | No reserves | $1.06\,{}_{t-1}V$ | $p_{59+t}\,{}_tV$ | $\mathrm{Pr}_t$ |
> > |---|---|---|---|---|
> > | 1 | 174.30 | 0 | 83.71 | 90.59 |
> > | 2 | 134.90 | 89.04 | 133.49 | 90.45 |
> > | 3 | 90.70 | 142.04 | 139.41 | 93.33 |
> > | 4 | 41.10 | 148.40 | 99.53 | 89.97 |
> > | 5 | $-14.70$ | 106.00 | 0 | 91.30 |
> >
> > The reserves take surplus from the early years and return it later with 6% interest, so the vector becomes nearly level and the loss in year 5 disappears. At a 10% risk discount rate the NPV falls from 105.99 to 93.00, because money held in reserve earns 6% while the shareholders require 10%.

> [!example]- Stress Test with Mortality 10% Heavier {Example}
> For the term insurance with reserves above, mortality turns out to be 110% of the SULT, so $q_{60}$ becomes $0.0037378$ and the death benefit cost in year 1 is \$373.78. The premium, expenses, reserves and earned rate are unchanged. Find the stressed profit vector.
>
> > [!answer]-
> > Year 1 starts with $P - E_1 = 485$, and the stressed survival probability is $p_{60} = 0.9962622$.
> > $$
> > \begin{align*}
> > \mathrm{Pr}_1 &= 485(1.06) - 373.78 - 0.9962622(84) \\
> > &= 514.10 - 373.78 - 83.69 \\
> > &= 56.63
> > \end{align*}
> > $$
> > The same steps for years 2 to 5 give the stressed vector $(-250,\ 56.63,\ 52.58,\ 51.05,\ 42.72,\ 38.42)$. Each year loses the extra 10% of deaths on the amount at risk $S - {}_tV$, about 34 in year 1 rising to 53 in year 5. The NPV at 10% falls from 93.00 to $-64.92$, so a 10% rise in deaths removes more than the policy's whole expected profit.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate the profit vector from a stated basis and to interpret it, as the objectives on profit analysis, universal life and equity-linked insurance all require.
> - **Stress tests:** A question may repeat the projection under a stress-test assumption and ask which entries change and why.
> - **Universal life:** For a [[Universal Life Insurance|universal life]] policy, the insurer earns the cost of insurance and expense charges and the spread between its earned rate and the credited rate, while it pays the death claims on its own mortality basis.

> [!warning]- Exam traps
> - **Per policy in force:** $\mathrm{Pr}_t$ is the profit for a policy that is in force at the start of year $t$. Summing or discounting the vector without the survival factor treats every policy as surviving to the end of the term.
> - **The reserve is a cost:** Premium less claims and expenses is not the year's profit. The interest on the opening reserve is income and the year-end reserve is an outgo, and leaving either out moves surplus between years.
> - **The earned rate:** Interest in the profit test is the rate the insurer earns on its assets, not the valuation rate used to calculate the reserves, even when the question gives both rates.
> - **Initial expenses:** $\mathrm{Pr}_0$ is the expense paid at issue with no premium against it, so it is negative. Leaving it out makes every profit measure look better.
