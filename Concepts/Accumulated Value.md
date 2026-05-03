$$AV = PV \cdot a(t)$$

The **accumulated value** (AV) is the value at a future time $t$ of a cash flow (or series of cash flows), grown forward using the [[Accumulation Function]] $a(t)$. It is the time-$t$ analogue of [[Present Value]]: where PV discounts back to time 0, AV accumulates forward to time $t$:

$$AV = PV \cdot a(t) = PV \cdot (1+i)^t$$

For a series of cash flows $C_{t_k}$ occurring at times $t_k \leq t$, the total accumulated value at time $t$ is:

$$AV = \sum_k C_{t_k} \cdot \frac{a(t)}{a(t_k)} = \sum_k C_{t_k} \cdot (1+i)^{t - t_k}$$

The ratio $a(t)/a(s)$ for $t > s$ is the **accumulation factor** from $s$ to $t$. Under compound interest at rate $i$, this equals $(1+i)^{t-s}$.

> [!example]- Accumulated Value of a Savings Plan {💡 Example}
> An investor deposits $\$500$ today and $\$800$ two years from now into an account earning $i = 5\%$ per year effective. What is the total accumulated value at the end of 4 years?
>
> > [!answer]- Answer
> > Accumulate each deposit to time 4:
> > $$AV = 500 \times (1.05)^4 + 800 \times (1.05)^2$$
> > $$= 500 \times 1.21551 + 800 \times 1.10250$$
> > $$= 607.75 + 882.00 = \$1{,}489.75$$
