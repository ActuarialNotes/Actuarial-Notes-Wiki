The **force of interest** $\delta$ is the continuously compounded [[Interest Rate]] — the limiting case of a [[Nominal Interest Rate]] [[Convertible m-thly]] as $m \to \infty$:

$$\delta = \ln(1+i) \qquad \Longleftrightarrow \qquad i = e^\delta - 1$$

Under a constant force of interest, the [[Accumulation Function]] is:
$$a(t) = e^{\delta t}$$

For a time-varying force $\delta(t)$:
$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$

The force of interest equals the instantaneous rate of change of $\ln a(t)$: $\delta(t) = a'(t)/a(t)$.

> [!example]- Converting Force of Interest to Effective Rate {💡 Example}
> The force of interest is $\delta = 0.05$ per year. Find the equivalent effective annual rate.
>
> > [!answer]- Answer
> > $$i = e^{0.05} - 1 = 1.05127 - 1 = 5.127\%$$
