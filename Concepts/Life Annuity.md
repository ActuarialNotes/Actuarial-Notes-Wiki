---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:edd6177e722aa444131a2d91997294392b3ff9f5ecdcbce0e2f6369458107ac9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Annuity.md
---

A **Life Annuity** pays periodic benefits contingent on the survival of one or more lives. The **whole life annuity** pays 1 continuously per unit time for as long as the insured lives. Its expected present value (EPV) for a life aged $x$ is $\bar{a}_x$.

> $$\bar{a}_x = E\!\left[\bar{a}_{\overline{T_x}|}\right]$$

> $$= \int_0^\infty e^{-\delta t}\,{_t}p_x\,dt$$

> $$\bar{a}_x = \frac{1 - \bar{A}_x}{\delta}$$

- The **life annuity-due** $\ddot{a}_x$ pays 1 at the beginning of each year the insured is alive: $\ddot{a}_x = \dfrac{1 - A_x}{d}$, where $d = 1 - v$ is the effective discount rate
- **Temporary life annuity** $\bar{a}_{x:\overline{n}|}$ pays for at most $n$ years: $\bar{a}_{x:\overline{n}|} = \int_0^n e^{-\delta t}\,{_t}p_x\,dt$
- Under **constant force of mortality** $\mu$: $\bar{a}_x = \dfrac{1}{\mu + \delta}$
- Relationship to whole life insurance: $\bar{A}_x + \delta\,\bar{a}_x = 1$
- **As a product.** An annuity liquidates a sum over the annuitant's lifetime — the mirror image of [[Whole Life Insurance|life insurance]], which creates a sum on death. Contracts are told apart by four things:
  - **When payments start** — *immediate*, or *deferred* after an accumulation phase
  - **How it is funded** — a single premium or flexible premiums
  - **How the value is credited** — *fixed* (a guaranteed rate), *variable* (the return on separate-account investments the owner chooses, and a registered security) or *indexed* (interest linked to a market index, with a floor and a cap or participation rate)
  - **The payout option** — life only, life with a period certain, installment or cash refund, or joint and survivor. Every option but life only buys a guarantee with a lower payment

![[Media/Figures/Life_Annuity.svg|340]]

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
