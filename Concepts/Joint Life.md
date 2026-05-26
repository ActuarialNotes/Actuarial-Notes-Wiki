**Joint Life** models describe the survival of two (or more) lives simultaneously, focusing on the time until the **first** death. Given two independent lives aged $x$ and $y$ with future lifetimes $T_x$ and $T_y$, the joint-life future lifetime is $T_{xy} = \min(T_x, T_y)$.

> $$_{t}p_{xy} = P(T_{xy} > t) = {_t}p_x \cdot {_t}p_y \quad \text{(independence)}$$
>
> $$_{t}q_{xy} = 1 - {_t}p_{xy} = 1 - {_t}p_x \cdot {_t}p_y$$

- The **last survivor** status $T_{\overline{xy}} = \max(T_x, T_y)$ is complementary to the joint-life status
- Relationship: $T_{xy} + T_{\overline{xy}} = T_x + T_y$, so $\mathring{e}_{xy} + \mathring{e}_{\overline{xy}} = \mathring{e}_x + \mathring{e}_y$
- The **complete joint-life expectancy**: $\mathring{e}_{xy} = \int_0^\infty {_t}p_{xy}\,dt$
- Under independence, the joint survival function factors into the product of the individual survival functions

> [!example]- Probability Both Lives Survive 10 Years {Example}
> Two independent lives, aged 40 and 50, have $_{10}p_{40} = 0.95$ and $_{10}p_{50} = 0.88$. Find the probability that both survive 10 years.
>
> > [!answer]-
> > $$_{10}p_{40:50} = {_{10}p_{40}} \cdot {_{10}p_{50}} = 0.95 \times 0.88 = 0.836$$

> [!example]- Probability That the Joint Life Status Fails Within 5 Years {Example}
> Under a constant force of mortality, $\mu_x = 0.04$ and $\mu_y = 0.03$. Find $_{5}q_{xy}$, the probability that the joint-life fails within 5 years.
>
> > [!answer]-
> > With constant forces, ${_t}p_x = e^{-0.04t}$ and ${_t}p_y = e^{-0.03t}$.
> > $$_{5}p_{xy} = e^{-0.04(5)} \cdot e^{-0.03(5)} = e^{-0.20} \cdot e^{-0.15} = e^{-0.35} \approx 0.7047$$
> > $$_{5}q_{xy} = 1 - 0.7047 = 0.2953$$
