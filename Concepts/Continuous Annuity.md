$$\bar{a}_{\overline{n}|} = \int_0^n e^{-\delta t}\,dt = \frac{1-e^{-\delta n}}{\delta} = \frac{1-v^n}{\delta}$$

The **continuous annuity** $\bar{a}_{\overline{n}|}$ is the present value of a payment stream flowing at a constant rate of 1 per unit time continuously over $[0,n]$, discounted at constant [[Force of Interest]] $\delta$. Evaluating the integral gives:

$$\bar{a}_{\overline{n}|} = \frac{1-v^n}{\delta} = \frac{1 - e^{-\delta n}}{\delta}$$

Comparing with the [[Annuity Immediate|annuity-immediate]] $a_{\overline{n}|} = (1-v^n)/i$, the only change is that $i$ is replaced by $\delta$. Because $\delta < i$, we have $\bar{a}_{\overline{n}|} > a_{\overline{n}|}$ — continuous receipt is worth more than end-of-period receipt. The accumulated value at time $n$ is:

$$\bar{s}_{\overline{n}|} = \int_0^n e^{\delta(n-t)}\,dt = \frac{e^{\delta n}-1}{\delta} = \frac{(1+i)^n - 1}{\delta}$$

> [!example]- Present Value of a Continuous Annuity {💡 Example}
> Payments flow continuously at a rate of $\$1{,}000$ per year for 10 years. The force of interest is $\delta = 0.06$. Find the present value.
>
> > [!answer]- Answer
> > $$\bar{a}_{\overline{10}|} = \frac{1 - e^{-0.06 \times 10}}{0.06} = \frac{1 - e^{-0.6}}{0.06}$$
> > $$e^{-0.6} \approx 0.54881, \quad \bar{a}_{\overline{10}|} = \frac{0.45119}{0.06} \approx 7.5198$$
> > $$PV = 1{,}000 \times 7.5198 \approx \$7{,}519.81$$
