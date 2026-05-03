$$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$

The **accumulation function** $a(t)$ gives the accumulated value at time $t \geq 0$ of 1 unit invested at time 0. It must satisfy $a(0) = 1$ and be non-decreasing. Three standard forms arise from different interest assumptions:

| Regime | $a(t)$ |
|---|---|
| Compound interest (rate $i$) | $(1+i)^t$ |
| Simple interest (rate $i$) | $1 + it$ |
| Constant [[Force of Interest]] $\delta$ | $e^{\delta t}$ |
| Time-varying force $\delta(t)$ | $\exp\!\left(\displaystyle\int_0^t \delta(s)\,ds\right)$ |

The [[Force of Interest]] at any time is recovered from $a(t)$ by $\delta(t) = a'(t)/a(t) = \frac{d}{dt}\ln a(t)$. The **amount function** $A(t) = k \cdot a(t)$ gives the accumulated value of an initial investment of $k$.

> [!example]- Accumulated Value Under Simple vs. Compound Interest {💡 Example}
> An investor deposits $\$1{,}000$ at time 0. Compare the accumulated values at $t = 5$ years under (a) simple interest at $8\%$ and (b) compound interest at $8\%$.
>
> > [!answer]- Answer
> > **(a) Simple interest:** $A(5) = 1{,}000 \times (1 + 0.08 \times 5) = 1{,}000 \times 1.40 = \$1{,}400.00$
> >
> > **(b) Compound interest:** $A(5) = 1{,}000 \times (1.08)^5 = 1{,}000 \times 1.46933 \approx \$1{,}469.33$
> >
> > Compound interest produces a higher accumulated value beyond $t = 1$ because interest itself earns interest.
