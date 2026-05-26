A **Life Annuity** pays periodic benefits contingent on the survival of one or more lives. The **whole life annuity** pays 1 continuously per unit time for as long as the insured lives. Its expected present value (EPV) for a life aged $x$ is $\bar{a}_x$.

> $$\bar{a}_x = E\!\left[\bar{a}_{\overline{T_x}|}\right] = \int_0^\infty e^{-\delta t}\,{_t}p_x\,dt$$
>
> $$\bar{a}_x = \frac{1 - \bar{A}_x}{\delta}$$

- The **life annuity-due** $\ddot{a}_x$ pays 1 at the beginning of each year the insured is alive: $\ddot{a}_x = \dfrac{1 - A_x}{d}$, where $d = 1 - v$ is the effective discount rate
- **Temporary life annuity** $\bar{a}_{x:\overline{n}|}$ pays for at most $n$ years: $\bar{a}_{x:\overline{n}|} = \int_0^n e^{-\delta t}\,{_t}p_x\,dt$
- Under **constant force of mortality** $\mu$: $\bar{a}_x = \dfrac{1}{\mu + \delta}$
- Relationship to whole life insurance: $\bar{A}_x + \delta\,\bar{a}_x = 1$

> [!example]- EPV of a Whole Life Annuity Under Constant Force of Mortality {Example}
> A life has constant force of mortality $\mu = 0.03$ and the force of interest is $\delta = 0.05$. Calculate $\bar{a}_x$.
>
> > [!answer]-
> > $$\bar{a}_x = \frac{1}{\mu + \delta} = \frac{1}{0.03 + 0.05} = \frac{1}{0.08} = 12.5$$

> [!example]- Using the Annuity-Insurance Relationship {Example}
> For a life aged $x$, $\bar{A}_x = 0.25$ and $\delta = 0.06$. Find $\bar{a}_x$.
>
> > [!answer]-
> > Using the fundamental relationship $\bar{A}_x + \delta\,\bar{a}_x = 1$:
> > $$\bar{a}_x = \frac{1 - \bar{A}_x}{\delta} = \frac{1 - 0.25}{0.06} = \frac{0.75}{0.06} = 12.5$$
