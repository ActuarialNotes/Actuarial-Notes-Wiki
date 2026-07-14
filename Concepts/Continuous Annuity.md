The **continuous annuity** $\bar{a}_{\overline{n}|}$ is the [[Present Value]] of a payment stream flowing continuously at a constant rate of 1 per unit time over $[0, n]$, discounted at a constant [[Force of Interest]] $\delta$.

> $$\bar{a}_{\overline{n}|} = \int_0^n e^{-\delta t}\,dt = \frac{1 - v^n}{\delta}$$

> $$\bar{s}_{\overline{n}|} = \int_0^n e^{\delta(n-t)}\,dt = \frac{(1+i)^n - 1}{\delta}$$

- Here $v = e^{-\delta}$ is the annual discount factor and $\delta = \ln(1+i)$ links the force of interest to the effective annual rate $i$.
- Equivalent forms: $\bar{a}_{\overline{n}|} = \dfrac{1 - e^{-\delta n}}{\delta}$ and $\bar{s}_{\overline{n}|} = \dfrac{e^{\delta n} - 1}{\delta}$.
- Compared with the [[Annuity Immediate|annuity-immediate]] $a_{\overline{n}|} = (1 - v^n)/i$, the discount rate $i$ is replaced by $\delta$. Since $\delta < i$, we have $\bar{a}_{\overline{n}|} > a_{\overline{n}|}$ — continuous receipt is worth more than end-of-period receipt.
- [[Accumulated Value]] and present value are linked by $\bar{s}_{\overline{n}|} = (1+i)^n\,\bar{a}_{\overline{n}|}$.

> [!example]- Present Value of a Continuous Annuity {Example}
> Payments flow continuously at a rate of \$$1{,}000$ per year for 10 years at a force of interest $\delta = 0.06$. Find the present value.
>
> > [!answer]-
> > $$\begin{align*} \bar{a}_{\overline{10}|} &= \frac{1 - e^{-0.06 \times 10}}{0.06} \\ &= \frac{1 - e^{-0.6}}{0.06} \\ &= \frac{1 - 0.54881}{0.06} \\ &= \frac{0.45119}{0.06} \approx 7.5198 \end{align*}$$
> > $$PV = 1{,}000 \times 7.5198 \approx \$7{,}519.81$$

> [!example]- Accumulated Value of a Continuous Annuity {Example}
> A fund receives contributions continuously at \$$500$ per year for 8 years. The annual effective interest rate is $i = 5\%$. Find the accumulated value at time 8.
>
> > [!answer]-
> > First convert to the force of interest: $\delta = \ln(1.05) = 0.048790$.
> > $$\begin{align*} \bar{s}_{\overline{8}|} &= \frac{(1.05)^8 - 1}{0.048790} \\ &= \frac{1.47746 - 1}{0.048790} \\ &= \frac{0.47746}{0.048790} \approx 9.7859 \end{align*}$$
> > $$AV = 500 \times 9.7859 \approx \$4{,}892.94$$
