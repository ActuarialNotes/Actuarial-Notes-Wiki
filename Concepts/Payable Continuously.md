An annuity **payable continuously** pays at a constant rate of $1$ per year, with payments flowing continuously. The present value of a continuous $n$-year annuity is denoted $\bar{a}_{\overline{n}|}$:

$$\bar{a}_{\overline{n}|} = \int_0^n v^t\,dt = \int_0^n e^{-\delta t}\,dt = \frac{1-e^{-\delta n}}{\delta} = \frac{1-v^n}{\delta}$$

where $\delta$ is the [[Force of Interest]]. This is the limiting case of a [[Payable m-thly]] annuity as $m \to \infty$.

> [!example]- Continuous Annuity Present Value {💡 Example}
> Find the present value of a 5-year continuous annuity paying at rate $1000$ per year, at $\delta = 0.07$.
>
> > [!answer]- Answer
> > $$\text{PV} = 1000 \cdot \bar{a}_{\overline{5}|} = 1000 \cdot \frac{1-e^{-0.35}}{0.07} = 1000 \cdot \frac{1-0.70469}{0.07} = 1000 \times 4.219 = 4219$$
